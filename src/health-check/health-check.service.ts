import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Cron, CronExpression } from '@nestjs/schedule';
import { TelegramService } from '../telegram/telegram.service';
import * as process from 'node:process';

@Injectable()
export class HealthCheckService {
  private readonly logger = new Logger(HealthCheckService.name);
  private readonly timeout = 5000;

  constructor(
    private readonly httpService: HttpService,
    private readonly telegramService: TelegramService,
  ) {}

  @Cron(CronExpression.EVERY_5_SECONDS)
  async checkWebsites(): Promise<void> {
    const websites = process.env.WEBSITES.split('|');

    for (const website of websites) {
      try {
        const response = await firstValueFrom(
          this.httpService.get(website, {
            timeout: this.timeout,
          }),
        );
        if (response.status === 200) {
          this.logger.log(`Сайт ${website} доступен`);
        } else {
          await this.telegramService.sendAlert(website, response.status);
        }
      } catch (error) {
        this.logger.error(`Сайт ${website} недоступен: ${error.message}`);
        await this.telegramService.sendAlert(website, error.response?.status);
      }
    }
  }
}
