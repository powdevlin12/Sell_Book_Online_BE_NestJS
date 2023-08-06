import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from 'src/entity/status.entity';
import { Repository } from 'typeorm';
import { CreateStatusDTO } from './dto/create-status.dto';

@Injectable()
export class StatusService {
  constructor(
    @InjectRepository(Status)
    private statusRepository: Repository<Status>,
  ) {}

  async createStatus(body: CreateStatusDTO) {
    const status = await this.statusRepository.save(body);
    return status;
  }
}
