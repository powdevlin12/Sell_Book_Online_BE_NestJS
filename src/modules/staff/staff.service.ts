import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Staff } from 'src/entity/staff.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(Staff)
    private staffRepository: Repository<Staff>,
  ) {}

  async getMySelf(staffId: string) {
    const staff = await this.staffRepository.findOne({
      where: { staff_id: staffId },
    });

    return staff;
  }
}
