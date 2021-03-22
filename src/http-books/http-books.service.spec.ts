import { Test, TestingModule } from '@nestjs/testing';
import { HttpBooksService } from './http-books.service';

describe('HttpBooksService', () => {
  let service: HttpBooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HttpBooksService],
    }).compile();

    service = module.get<HttpBooksService>(HttpBooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
