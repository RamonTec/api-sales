import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './controllers/users/users.module';
import { DbModule } from './db/db.module';
import { AuthService } from './controllers/auth/auth.service';
import { AuthModule } from './controllers/auth/auth.module';
import { ConfigModule as Config} from './config/config.module';
import { Encrypt } from './utils/encrypt.util';
import { CategoriesModule } from './controllers/categories/categories.module';
import { ProductModule } from './controllers/products/product.module';


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
