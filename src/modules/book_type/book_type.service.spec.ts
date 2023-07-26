import { Test, TestingModule } from '@nestjs/testing';
import { BookTypeService } from './book_type.service';

describe('BookTypeService', () => {
  let service: BookTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookTypeService],
    }).compile();

    service = module.get<BookTypeService>(BookTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
