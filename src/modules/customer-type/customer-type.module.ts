import { Module } from '@nestjs/common';
import { CustomerTypeController } from './customer-type.controller';
import { CustomerTypeService } from './customer-type.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerType } from 'src/entity/customer_type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerType])],
  controllers: [CustomerTypeController],
  providers: [CustomerTypeService],
  exports: [CustomerTypeService],
})
export class CustomerTypeModule {}
