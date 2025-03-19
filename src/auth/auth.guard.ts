import { CanActivate, ExecutionContext, Injectable, MethodNotAllowedException, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { Request } from 'express';
import { ConfigService } from 'src/config/config.service';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './auth.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private readonly reflector: Reflector,
    private config: ConfigService
  ) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    try {
        const request = ctx.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }
        
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
            ctx.getHandler(),
            ctx.getClass(),
        ]);

        const payload = await this.jwtService.verifyAsync(token, {
            secret: this.config.jwtSecret
        });
        
        if (!payload) throw new UnauthorizedException();
        if (!requiredRoles && payload) {
            return true;
        }
        if (!requiredRoles.includes(payload.role)) throw new MethodNotAllowedException();

        return true;
        
    } catch (error) {
        if (error instanceof TokenExpiredError || error.name === 'TokenExpiredError') {
            throw new UnauthorizedException('Token expirado');
        }
        throw new UnauthorizedException('Token inválido');
    }
}

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
