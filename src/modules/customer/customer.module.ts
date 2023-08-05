import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { AtStrategy, RtStrategy } from '../auth/strategies';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from 'src/entity/customer.entity';

@Module({
  imports: [JwtModule.register({}), TypeOrmModule.forFeature([Customer])],
  controllers: [CustomerController],
  providers: [CustomerService, AtStrategy, RtStrategy],
  exports: [CustomerService],
})
export class CustomerModule {}
