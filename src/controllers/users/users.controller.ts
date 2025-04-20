import { Body, Controller, Get, Param, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { AuthRoles } from 'src/controllers/auth/auth.decorator';
import { AuthGuard } from 'src/controllers/auth/auth.guard';
import { CreateUserDto, RolesEnum, UserDTO } from './dto/users.dto';
import { UsersService } from './users.service';
import { ApiBadRequestResponse, ApiBearerAuth, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@Controller('users')
@ApiTags('users flow')
export class UsersController {

    constructor(
        private readonly userService: UsersService
    ){}

    @UseGuards(AuthGuard)
    @AuthRoles(RolesEnum.ADMIN)
    @Get('')
    @ApiBearerAuth('authorization')
    @ApiResponse({
        description: 'List users Success',
        status: 200,
        type: UserDTO,
    })
    @ApiBadRequestResponse({
        description: 'Invalid parameters',
    })
    @ApiUnauthorizedResponse({
        description: 'Invalid role',
    })
    async getUsers(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
    ){
        return await this.userService.getUsers(page, limit)
    }

    @UseGuards(AuthGuard)
    @AuthRoles(RolesEnum.ADMIN)
    @Get(':userId')
    @ApiBearerAuth('authorization')
    @ApiResponse({
        description: 'user info success',
        status: 200,
        type: String,
    })
    @ApiUnauthorizedResponse({
        description: 'Invalid role',
    })
    async getUser(@Param('userId') userId: string){
        return await this.userService.getUser(userId)
    }
    
    @UseGuards(AuthGuard)
    @AuthRoles(RolesEnum.ADMIN)
    @Put(':userId')
    @ApiBearerAuth('authorization')
    @ApiResponse({
        description: 'user info updated success',
        status: 200,
        type: String,
    })
    @ApiUnauthorizedResponse({
        description: 'Invalid role',
    })
    async updateUser(@Body() user: UserDTO){
        return await this.userService.updateUser(user);
    }

    @UseGuards(AuthGuard)
    @AuthRoles(RolesEnum.ADMIN)
    @Post('')
    @ApiBearerAuth('authorization')
    @ApiResponse({
        description: 'user info success',
        status: 200,
        type: String,
    })
    @ApiUnauthorizedResponse({
        description: 'Invalid role',
    })
    async addUser(@Body() user: CreateUserDto){
        return await this.userService.registerUser(user);
    }
}
