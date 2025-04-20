import { BadRequestException, ConflictException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JsonWebTokenError, JwtService, TokenExpiredError } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, User } from 'src/controllers/users/schemas/users.schemas';
import { AuthDTO, SignUp, SingIn } from './dto/auth.dto';
import { Encrypt } from 'src/utils/encrypt.util';
import { ConfigService } from 'src/config/config.service';
import { IUserCreated, UserPayloadType } from './auth.decorator';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
        private readonly jwtService: JwtService,
        private readonly encryptUtil: Encrypt,
        private readonly config: ConfigService
    ){}

    async signIn(signIn: SingIn): Promise<AuthDTO> {
        try {
            const _user = await this.userModel.findOne({ email: signIn.email });
            if (!_user) throw new BadRequestException('User not found');
            
            const isValidPassword = this.encryptUtil.compare(_user.password, signIn.password)
            if (!isValidPassword) throw new UnauthorizedException('Invalid password');

            const userPayload = await this.generatePayload(_user);
            const authToken = await this.jwtService.signAsync(userPayload, {
                secret: this.config.jwtSecret,
                expiresIn: '24h',
            });
            
            return { user: userPayload, token: authToken };

        } catch (error) {
            throw error;
        }
    }

    async signUp(singUp: SignUp):Promise<IUserCreated>{
        try {
            singUp.password = this.encryptUtil.hash(singUp.password)
            const user = {
                ...singUp,
            }
            const saveUser = await this.userModel.create(user).catch(e =>{
                throw new ConflictException('This user already exists')
            })
            const userPayload= await this.generatePayload(saveUser)
            return {
                user: userPayload,
            }
        } catch (error) {
            return error
        }
    }

    async generatePayload(_user): Promise<UserPayloadType> {
        return {
            id: _user._id.toString(),
            fullName: `${_user.name} ${_user.lastName}`,
            email: _user.email,
            role: _user.role
        }
    }

    async verifyToken(userId: string, token: string): Promise<any> {
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: this.config.jwtSecret
            });
            if(!payload) throw new UnauthorizedException('Token inválido');
            if(payload?.id != userId) throw new UnauthorizedException('userId inválido');
            return {
                success: true,
                role: payload.role
            };
            
        } catch (error: any) {
            if (error instanceof TokenExpiredError || error.name === 'TokenExpiredError') {
                throw new UnauthorizedException({
                    message: 'Token expirado',
                    error: 'TOKEN_EXPIRED'
                });
            }else if(error instanceof JsonWebTokenError){
                throw new UnauthorizedException({
                    message: 'Token invalido',
                    error: 'INVALID_TOKEN'
                });
            }
            else{
                throw new UnauthorizedException({
                    message: 'Sin Authorizacion',
                    error: error.message
                });
            }  
        }
    }
}
