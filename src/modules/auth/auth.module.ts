import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AtStrategy, RtStrategy } from './strategies';
import { JwtModule } from '@nestjs/jwt';
import { Customer } from 'src/entity/customer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [JwtModule.register({}), TypeOrmModule.forFeature([Customer])],
  controllers: [AuthController],
  providers: [AuthService, AtStrategy, RtStrategy],
})
export class AuthModule {}
