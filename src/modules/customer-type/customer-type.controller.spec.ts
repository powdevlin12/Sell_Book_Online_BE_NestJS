import { Test, TestingModule } from '@nestjs/testing';
import { CustomerTypeController } from './customer-type.controller';

describe('CustomerTypeController', () => {
  let controller: CustomerTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerTypeController],
    }).compile();

    controller = module.get<CustomerTypeController>(CustomerTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
