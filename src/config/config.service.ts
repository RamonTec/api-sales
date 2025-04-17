import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  
    get port(): number {
      return Number(process.env.PORT);
    }

    get dbUrl(): string {
        return process.env.DB_URL;
      }

    get jwtSecret(): string {
        return process.env.JWT_SECRET
    }

    get socketPort(): number {
        return Number(process.env.SOCKET_PORT);
    }

    get AWS(): any {
        return {
            region: process.env.AWS_REGION,
            accessKey: process.env.AWS_ACCESS_KEY,
            secretKey: process.env.AWS_SECRET_KEY
        }
    }

    get encyptation(): any{
        return {
            secret: process.env.ENCRYPTATION_SECRET,
            delimiter: process.env.ENCRYPTATION_DELIMITER
        }
    }
}