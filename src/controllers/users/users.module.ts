import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthModule } from 'src/controllers/auth/auth.module';
import { DbModule } from 'src/db/db.module';
import { AuthService } from 'src/controllers/auth/auth.service';
import { Encrypt } from 'src/utils/encrypt.util';

@Module({
  imports:[
    AuthModule,
    DbModule,
    Encrypt,
  ],
  providers: [UsersService, AuthService, Encrypt],
  controllers: [UsersController]
})
export class UsersModule {}
