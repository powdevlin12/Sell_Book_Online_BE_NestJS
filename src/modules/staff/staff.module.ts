import { Module } from '@nestjs/common';
import { StaffController } from './staff.controller';
import { StaffService } from './staff.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Staff } from 'src/entity/staff.entity';
import { AtStrategy, RtStrategy } from '../auth/strategies';

@Module({
  imports: [JwtModule.register({}), TypeOrmModule.forFeature([Staff])],
  controllers: [StaffController],
  providers: [StaffService, AtStrategy, RtStrategy],
  exports: [StaffService],
})
export class StaffModule {}
