import { Inject, Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import * as process from 'node:process';
import {
  INotifier,
  NotificationTypeEnum,
} from '../notifier/notifier.interface';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class HealthCheckService {
  private readonly logger = new Logger(HealthCheckService.name);
  private readonly timeout = 5000;

  constructor(
    private readonly httpService: HttpService,
    @Inject('Notifier') private readonly notifier: INotifier,
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
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
          await this.notifier.sendNotification(
            website,
            NotificationTypeEnum.ALERT,
          );
        }
      } catch (error) {
        this.logger.error(`Сайт ${website} недоступен: ${error.message}`);
        await this.notifier.sendNotification(
          website,
          NotificationTypeEnum.ALERT,
        );
      }
    }
  }
}
