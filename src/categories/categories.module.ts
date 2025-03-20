import { Module } from '@nestjs/common';
import { CategorieService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { AuthModule } from 'src/auth/auth.module';
import { DbModule } from 'src/db/db.module';

@Module({
  imports:[
    AuthModule,
    DbModule,
  ],
  providers: [CategorieService],
  controllers: [CategoriesController]
})
export class CategoriesModule {}
