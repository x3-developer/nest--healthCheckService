import { Injectable, Logger } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';
import { INotifier, NotificationTypeEnum } from './types';

@Injectable()
export class TelegramNotifierService implements INotifier {
  private readonly Logger: Logger = new Logger(TelegramNotifierService.name);
  private readonly bot: TelegramBot = new TelegramBot(
    process.env.TELEGRAM_BOT_TOKEN,
  );

  async sendNotification(
    site: string,
    notificationType: NotificationTypeEnum,
  ): Promise<void> {
    let message = '';

    switch (notificationType) {
      case NotificationTypeEnum.ALERT:
        message = `⚠️ Сайт ${site} упал!`;
        break;
      case NotificationTypeEnum.CALM:
        message = `✅ Сайт ${site} поднялся!`;
        break;
    }

    try {
      await this.bot.sendMessage(process.env.TELEGRAM_CHAT_ID, message);
    } catch (error) {
      this.Logger.error(`Ошибка при отправке сообщения: ${error.message}`);
    }
  }
}
