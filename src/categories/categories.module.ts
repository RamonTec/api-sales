import { Module } from '@nestjs/common';
import { CategorieService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { AuthModule } from 'src/auth/auth.module';
import { DbModule } from 'src/db/db.module';
import { FileUploadService } from 'src/utils/file-upload.util';

@Module({
  imports:[
    AuthModule,
    DbModule,
  ],
  providers: [CategorieService, FileUploadService],
  controllers: [CategoriesController]
})
export class CategoriesModule {}
