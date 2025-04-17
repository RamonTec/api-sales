// src/common/utils/file-upload.util.ts
import * as fs from 'fs';
import * as path from 'path';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FileUploadService {
  async uploadFile(
    file: Express.Multer.File,
    uploadPath: string = 'uploads',
  ): Promise<string> {
    
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    const filename = `${uniqueSuffix}${extension}`;
    const fullPath = path.join(uploadPath, filename);

    fs.writeFileSync(fullPath, file.buffer);

    return path.join(uploadPath, filename);
  }

  async deleteFile(filePath: string): Promise<void> {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
}