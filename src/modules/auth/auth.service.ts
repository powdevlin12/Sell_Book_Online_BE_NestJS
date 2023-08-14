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
import { CustomerTypeService } from '../customer-type/customer-type.service';
import { createStaffDTO } from './dto/create-staff.dto';
import { Staff } from 'src/entity/staff.entity';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    @InjectRepository(Staff)
    private staffRepository: Repository<Staff>,
    private readonly customerTypeService: CustomerTypeService,
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
          expiresIn: 60 * 60 * 24 * 7,
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

  async signupLocal(dto: createCustomerDTO) {
    const existEmailCustomer = await this.customerRepository.findOne({
      where: {
        email: dto.email,
      },
    });

    if (existEmailCustomer) {
      throw new ErrorException(
        'Email này đã được đăng ký trước đó, vui lòng đổi email khác',
        HttpStatus.BAD_REQUEST,
      );
    }

    const existPhoneCustomer = await this.customerRepository.findOne({
      where: {
        phone_number: dto.phone_number,
      },
    });

    if (existPhoneCustomer) {
      throw new ErrorException(
        'Số điện thoại này đã được đăng ký trước đó, vui lòng đổi số khác',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hash = await this.hashData(dto.password);
    const customerType = await this.customerTypeService.getCustomerTypeByName(
      dto.customer_type_name,
    );
    const newUser = this.customerRepository.create({
      ...dto,
      password: hash,
      customerType,
    });

    const result = await this.customerRepository.save(newUser);
    const tokens = await this.getTokens(
      result.customer_id,
      dto.role,
      dto.email,
    );
    await this.updateRtHash(result.customer_id, tokens.refresh_token);
    return {
      message: 'Đăng ký thành công',
    };
  }

  // sign up staff
  async signupLocalStaff(dto: createStaffDTO): Promise<Tokens> {
    const hash = await this.hashData(dto.password);
    const newStaff = this.staffRepository.create({
      ...dto,
      password: hash,
    });
    console.log(
      '🚀 ~ file: auth.service.ts:59 ~ AuthService ~ signupLocal ~ newUser:',
      newStaff,
    );
    const result = await this.staffRepository.save(newStaff);
    const tokens = await this.getTokens(result.staff_id, dto.role, dto.email);
    await this.updateRtHash(result.staff_id, tokens.refresh_token);
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
  // signin staff
  async signinStaffLocal(dto: loginDTO): Promise<Tokens> {
    const { email, password } = dto;

    const staff = await this.staffRepository
      .createQueryBuilder()
      .where('email = :email', { email })
      .getOne();

    if (!staff)
      throw new ErrorException(
        'Tài khoản hoặc mật khẩu không chính xác',
        HttpStatus.BAD_REQUEST,
      );

    const passwordMatches = await bcrypt.compare(password, staff.password);

    if (!passwordMatches)
      throw new ErrorException(
        'Tài khoản hoặc mật khẩu không chính xác',
        HttpStatus.BAD_REQUEST,
      );

    const tokens = await this.getTokens(
      staff.staff_id,
      staff.role,
      staff.email,
    );

    await this.updateRtHash(staff.staff_id, tokens.refresh_token);
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
  async refreshTokens(userId: string, rt: string) {
    const user = await this.customerRepository
      .createQueryBuilder()
      .where('customer_id = :id', { id: userId })
      .getOne();

    if (!user)
      throw new ErrorException(
        'Không tìm thấy người dùng',
        HttpStatus.BAD_REQUEST,
      );

    const isRtValid = await bcrypt.compare(rt, user.hashedRt);
    if (!isRtValid)
      throw new ErrorException(
        'Refresh token không hợp lệ',
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
}
