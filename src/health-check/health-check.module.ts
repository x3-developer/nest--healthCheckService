import { Module } from '@nestjs/common';
import { HealthCheckService } from './health-check.service';
import { HttpModule } from '@nestjs/axios';
import { NotifierModule } from '../notifier/notifier.module';
import { FileSystemModule } from '../file-system/file-system.module';

@Module({
  imports: [HttpModule, NotifierModule, FileSystemModule],
  providers: [HealthCheckService],
})
export class HealthCheckModule {}
