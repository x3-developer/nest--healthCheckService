import { Inject, Injectable } from '@nestjs/common';
import { INotifier, NotificationTypeEnum } from './notifier.interface';

@Injectable()
export class NotifierService implements INotifier {
  constructor(@Inject('Notifiers') private readonly notifiers: INotifier[]) {}

  async sendNotification(
    site: string,
    notificationType: NotificationTypeEnum,
  ): Promise<void> {
    for (const notifier of this.notifiers) {
      try {
        await notifier.sendNotification(site, notificationType);
      } catch (error) {
        console.error(
          `Ошибка при отправке через ${notifier.constructor.name}:`,
          error,
        );
      }
    }
  }
}
