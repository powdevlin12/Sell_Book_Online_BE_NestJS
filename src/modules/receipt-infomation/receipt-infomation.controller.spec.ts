import { Test, TestingModule } from '@nestjs/testing';
import { ReceiptInfomationController } from './receipt-infomation.controller';

describe('ReceiptInfomationController', () => {
  let controller: ReceiptInfomationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReceiptInfomationController],
    }).compile();

    controller = module.get<ReceiptInfomationController>(ReceiptInfomationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
