import { Module } from '@nestjs/common';
import { HealthCheckModule } from './health-check/health-check.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { NotifierModule } from './notifier/notifier.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    HealthCheckModule,
    NotifierModule,
  ],
})
export class AppModule {}
