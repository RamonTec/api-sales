import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { DbModule } from './db/db.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule as Config} from './config/config.module';
import { Encrypt } from './utils/encrypt.util';
import { CategoriesModule } from './categories/categories.module';
import { ProductModule } from './products/product.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    DbModule,
    UsersModule,
    AuthModule,
    Config,
    CategoriesModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService,Encrypt],
})
export class AppModule {}
