import { Module } from '@nestjs/common';
import { HealthCheckModule } from './health-check/health-check.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { NotifierModule } from './notifier/notifier.module';
import { FileSystemModule } from './file-system/file-system.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    HealthCheckModule,
    NotifierModule,
    FileSystemModule,
  ],
})
export class AppModule {}
