import { Module } from '@nestjs/common';
import { HealthCheckService } from './health-check.service';
import { HttpModule } from '@nestjs/axios';
import { TelegramModule } from '../telegram/telegram.module';

@Module({
  imports: [HttpModule, TelegramModule],
  providers: [HealthCheckService],
})
export class HealthCheckModule {}
