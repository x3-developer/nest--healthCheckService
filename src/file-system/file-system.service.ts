import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { ISite } from './types';

@Injectable()
export class FileSystemService {
  private readonly Logger: Logger = new Logger(FileSystemService.name);
  private readonly sitesFilePath = path.join(process.cwd(), 'sites.json');

  async getSitesData(): Promise<ISite[]> {
    try {
      const data = await fs.promises.readFile(this.sitesFilePath, 'utf-8');

      return JSON.parse(data);
    } catch (error) {
      this.Logger.error(`Ошибка при чтении файла: ${error.message}`);

      return [];
    }
  }

  async changeSiteStatus(site: ISite, isActive: boolean): Promise<void> {
    try {
      const data = await this.getSitesData();
      const updatedSites = data.map((item: ISite) => {
        if (item.url === site.url) {
          return {
            ...item,
            isActive,
          };
        }

        return item;
      });

      await fs.promises.writeFile(
        this.sitesFilePath,
        JSON.stringify(updatedSites, null, 2),
      );
    } catch (error) {
      this.Logger.error(`Ошибка при записи в файл: ${error.message}`);
    }
  }
}
