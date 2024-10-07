import { Module } from '@nestjs/common';
import { HealthCheckService } from './health-check.service';
import { HttpModule } from '@nestjs/axios';
import { NotifierModule } from '../notifier/notifier.module';

@Module({
  imports: [HttpModule, NotifierModule],
  providers: [HealthCheckService],
})
export class HealthCheckModule {}
