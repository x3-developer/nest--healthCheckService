import { Injectable, Logger } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';

@Injectable()
export class TelegramService {
  private readonly Logger: Logger = new Logger(TelegramService.name);
  private readonly bot: TelegramBot = new TelegramBot(
    process.env.TELEGRAM_BOT_TOKEN,
  );

  async sendAlert(url: string, status: number): Promise<void> {
    const message = `⚠️ Сайт ${url} недоступен. Статус: ${status}`;

    try {
      await this.bot.sendMessage(process.env.TELEGRAM_CHAT_ID, message);
    } catch (error) {
      this.Logger.error(`Ошибка при отправке сообщения: ${error.message}`);
    }
  }
}
