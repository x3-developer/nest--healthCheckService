import { Module } from '@nestjs/common';
import { HealthCheckModule } from './health-check/health-check.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TelegramModule } from './telegram/telegram.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    HealthCheckModule,
    TelegramModule,
  ],
})
export class AppModule {}
