import { Module } from '@nestjs/common';
import { NotifierService } from './notifier.service';
import { TelegramNotifierService } from './telegram-notifier.service';

@Module({
  providers: [
    TelegramNotifierService,
    {
      provide: 'Notifiers',
      useFactory: (telegramNotifier: TelegramNotifierService) => {
        return [telegramNotifier];
      },
      inject: [TelegramNotifierService],
    },
    {
      provide: 'Notifier',
      useClass: NotifierService,
    },
  ],
  exports: ['Notifier'],
})
export class NotifierModule {}
