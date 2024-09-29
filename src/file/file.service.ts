import { Injectable } from '@nestjs/common';
import { writeFile } from 'fs/promises';
import { join } from 'path';

@Injectable()
export class FileService {
  async upload(file: Express.Multer.File) {
    return await writeFile(
      join(__dirname, '..', '..', 'storage', 'photo-teste.png'),
      file.buffer,
    );
  }
}
