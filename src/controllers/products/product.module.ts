import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { AuthModule } from 'src/controllers/auth/auth.module';
import { DbModule } from 'src/db/db.module';
import { CategorieService } from 'src/controllers/categories/categories.service';
import { FileUploadService } from 'src/utils/file-upload.util';

@Module({
  imports:[
    AuthModule,
    DbModule,
  ],
  providers: [ProductService, CategorieService, FileUploadService],
  controllers: [ProductController]
})
export class ProductModule {}