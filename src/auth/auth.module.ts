import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from 'src/config/config.module';
import { AuthController } from './auth.controller';
import { DbModule } from 'src/db/db.module';
import { Encrypt } from 'src/utils/encrypt.util';
import { AuthService } from './auth.service';

@Module({
    imports:[
        ConfigModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (config: ConfigService) => ({
                secret: config.jwtSecret,
                signOptions: {
                    expiresIn: '300s'
                }
            })
        }),
        DbModule,
        Encrypt
    ],
    controllers: [AuthController],
    providers: [AuthService,Encrypt],
    exports: [JwtModule, ConfigModule]
})
export class AuthModule {}
