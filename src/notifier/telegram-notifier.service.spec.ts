import { Test, TestingModule } from '@nestjs/testing';
import { TelegramNotifierService } from './telegram-notifier.service';

describe('TelegramNotifierService', () => {
  let service: TelegramNotifierService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TelegramNotifierService],
    }).compile();

    service = module.get<TelegramNotifierService>(TelegramNotifierService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
