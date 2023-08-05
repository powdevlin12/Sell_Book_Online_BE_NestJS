import { Test, TestingModule } from '@nestjs/testing';
import { ReceiptInfomationService } from './receipt-infomation.service';

describe('ReceiptInfomationService', () => {
  let service: ReceiptInfomationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReceiptInfomationService],
    }).compile();

    service = module.get<ReceiptInfomationService>(ReceiptInfomationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
