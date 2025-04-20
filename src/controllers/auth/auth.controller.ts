import { Body, Controller, Get, Headers, Post, Query, Res, UseGuards } from '@nestjs/common';
import { AuthDTO, SignDTO, SignUp, SingIn } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiResponse, ApiOperation, ApiQuery, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthGuard } from './auth.guard';

@Controller('auth')
@ApiTags('authentication')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ){}

    @Post('sign-in')
    @ApiOperation({
        summary: 'Login user'
    })
    @ApiBody({
        type: SingIn
    })
    @ApiResponse({
        description: 'Login success',
        status: 200,
        type: AuthDTO,
    })
    @ApiBadRequestResponse({
        description: 'Invalid email',
    })
    @ApiUnauthorizedResponse({
        description: 'Invalid user or password',
    })
    async signIn(@Body() singIn: SingIn){
        return await this.authService.signIn(singIn)
    }
    
    @Post('sign-up')
    @ApiOperation({
        summary: 'Register user'
    })
    @ApiBody({
        type: SignUp
    })
    @ApiResponse({
        description: 'Sign up success',
        status: 200,
        type: SignDTO,
    })
    @ApiBadRequestResponse({
        description: 'Invalid email',
    })
    async signUp(@Body() signUp: SignUp){
        return await this.authService.signUp(signUp)
    }

    @Get('verify-token')
    @UseGuards(AuthGuard)
    @ApiOperation({
        summary: 'verify user token'
    })
    @ApiBearerAuth('authorization')
    @ApiQuery({
        name: 'userId',
        required: true,
        type: String,
        description: 'ID del usuario a verificar'
    })
    async verifyToken(@Query('userId') userId: string, @Headers('authorization') bearer: string){
        const [type, token] = bearer?.split(' ') ?? [];
        return await this.authService.verifyToken(userId, token)
        
    }
}
