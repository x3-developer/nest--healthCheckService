import { Inject, Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { INotifier, NotificationTypeEnum } from '../notifier/types';
import { Cron, CronExpression } from '@nestjs/schedule';
import { FileSystemService } from '../file-system/file-system.service';

@Injectable()
export class HealthCheckService {
  private readonly logger = new Logger(HealthCheckService.name);
  private readonly timeout = 30000;

  constructor(
    private readonly httpService: HttpService,
    @Inject('Notifier') private readonly notifier: INotifier,
    private readonly fileSystemService: FileSystemService,
  ) {}

  @Cron(CronExpression.EVERY_5_MINUTES)
  async checkWebsites(): Promise<void> {
    const websites = await this.fileSystemService.getSitesData();

    for (const website of websites) {
      try {
        const response = await firstValueFrom(
          this.httpService.get(website.url, {
            timeout: this.timeout,
          }),
        );
        if (response.status === 200) {
          if (!website.isActive) {
            await this.fileSystemService.changeSiteStatus(website, true);

            await this.notifier.sendNotification(
              website.url,
              NotificationTypeEnum.CALM,
            );
          }
        } else {
          if (website.isActive) {
            await this.fileSystemService.changeSiteStatus(website, false);

            await this.notifier.sendNotification(
              website.url,
              NotificationTypeEnum.ALERT,
            );
          }
        }
      } catch (error) {
        this.logger.error(`Сайт ${website} недоступен: ${error.message}`);

        if (website.isActive) {
          await this.fileSystemService.changeSiteStatus(website, false);

          await this.notifier.sendNotification(
            website.url,
            NotificationTypeEnum.ALERT,
          );
        }
      }
    }
  }
}
