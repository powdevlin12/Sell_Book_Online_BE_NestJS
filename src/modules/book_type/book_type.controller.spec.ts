import { Test, TestingModule } from '@nestjs/testing';
import { BookTypeController } from './book_type.controller';

describe('BookTypeController', () => {
  let controller: BookTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookTypeController],
    }).compile();

    controller = module.get<BookTypeController>(BookTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
