import { HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { createCustomerDTO } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { Tokens } from './types';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/entity/customer.entity';
import { Repository } from 'typeorm';
import { loginDTO } from './dto/login.dto';
import { ErrorException } from 'src/utils/Error';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}
  hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  async getTokens(
    userId: string,
    role: string,
    email: string,
  ): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          userId,
          role,
          email,
        },
        {
          secret: 'at-secret',
          expiresIn: 60 * 15,
        },
      ),
      this.jwtService.signAsync(
        {
          userId,
          role,
          email,
        },
        {
          secret: 'rt-secret',
          expiresIn: 60 * 60 * 24 * 7,
        },
      ),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async signupLocal(dto: createCustomerDTO): Promise<Tokens> {
    const hash = await this.hashData(dto.password);
    const newUser = this.customerRepository.create({ ...dto, password: hash });
    console.log(
      '🚀 ~ file: auth.service.ts:59 ~ AuthService ~ signupLocal ~ newUser:',
      newUser,
    );
    const result = await this.customerRepository.save(newUser);
    const tokens = await this.getTokens(
      result.customer_id,
      dto.role,
      dto.email,
    );
    await this.updateRtHash(result.customer_id, tokens.refresh_token);
    return tokens;
  }

  async updateRtHash(userId: string, rt: string) {
    const hash = await this.hashData(rt);
    await this.customerRepository
      .createQueryBuilder()
      .update(Customer)
      .set({ hashedRt: hash })
      .where('customer_id = :id', { id: userId })
      .execute();
  }

  async signinLocal(dto: loginDTO): Promise<Tokens> {
    const { email, password } = dto;

    const user = await this.customerRepository
      .createQueryBuilder()
      .where('email = :email', { email })
      .getOne();

    if (!user)
      throw new ErrorException(
        'Tài khoản hoặc mật khẩu không chính xác',
        HttpStatus.BAD_REQUEST,
      );

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches)
      throw new ErrorException(
        'Tài khoản hoặc mật khẩu không chính xác',
        HttpStatus.BAD_REQUEST,
      );

    const tokens = await this.getTokens(
      user.customer_id,
      user.role,
      user.email,
    );
    await this.updateRtHash(user.customer_id, tokens.refresh_token);
    return tokens;
  }
  async logout(userId: string) {
    await this.customerRepository
      .createQueryBuilder()
      .update(Customer)
      .set({ hashedRt: null })
      .where('customer_id = :id', { id: userId })
      .execute();
  }
  refreshTokens() {}
}
