import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Promotion } from 'src/entity/promotion.entity';
import { Repository } from 'typeorm';
import { CreatePromotionDTO } from './dto/create-promotion.dto';
import { StaffService } from '../staff/staff.service';

@Injectable()
export class PromotionService {
  constructor(
    @InjectRepository(Promotion)
    private promotionRepository: Repository<Promotion>,
    private readonly staffService: StaffService,
  ) {}

  async createPromotion(staff_id: string, body: CreatePromotionDTO) {
    const staff = await this.staffService.getMySelf(staff_id);

    const promotion = await this.promotionRepository.save({
      ...body,
      staff_id_create: staff,
    });

    return promotion;
  }
}
