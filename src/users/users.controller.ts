import { Body, Controller, Get, Param, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { AuthRoles } from 'src/auth/auth.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateModeratorDto, RolesEnum, UserDTO } from './dto/users.dto';
import { UsersService } from './users.service';
import { Response } from 'express';
import { ApiBadRequestResponse, ApiBearerAuth, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@Controller('users')
@ApiTags('users flow')
export class UsersController {

    constructor(
        private readonly userService: UsersService
    ){}

    @UseGuards(AuthGuard)
    @AuthRoles(RolesEnum.ADMIN)
    @Get('get-moderators')
    @ApiBearerAuth('authorization')
    @ApiResponse({
        description: 'List Moderadors Success',
        status: 200,
        type: UserDTO,
    })
    @ApiBadRequestResponse({
        description: 'Invalid parameters',
    })
    @ApiUnauthorizedResponse({
        description: 'Invalid role',
    })
    async getModerators(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
        @Res() response:Response
    ){
        const res = await this.userService.getModerators(page, limit)
        response.send(res)
    }

    @UseGuards(AuthGuard)
    @AuthRoles(RolesEnum.ADMIN)
    @Get('get-moderator/:userId')
    @ApiBearerAuth('authorization')
    @ApiResponse({
        description: 'moderador info success',
        status: 200,
        type: String,
    })
    @ApiUnauthorizedResponse({
        description: 'Invalid role',
    })
    async getModerator(@Param('userId') userId: string, @Res() response:Response){
        const res = await this.userService.getModerator(userId)
        response.status(res.status || 200)
        response.send(res)
    }
    
    @UseGuards(AuthGuard)
    @AuthRoles(RolesEnum.ADMIN)
    @Put('update-moderator')
    @ApiBearerAuth('authorization')
    @ApiResponse({
        description: 'moderador info success',
        status: 200,
        type: String,
    })
    @ApiUnauthorizedResponse({
        description: 'Invalid role',
    })
    async updateInfoModerator(@Body() moderator: UserDTO, @Res() response:Response){
        const res = await this.userService.updateOneModerator(moderator);
        response.status(res.status || 200)
        response.send(res)
    }

    @UseGuards(AuthGuard)
    @AuthRoles(RolesEnum.ADMIN)
    @Post('add-moderator')
    @ApiBearerAuth('authorization')
    @ApiResponse({
        description: 'moderador info success',
        status: 200,
        type: String,
    })
    @ApiUnauthorizedResponse({
        description: 'Invalid role',
    })
    async addModerator(@Body() moderator: CreateModeratorDto, @Res() response:Response){
        const res = await this.userService.registerModerator(moderator);
        response.status(res.status || 200)
        response.send(res)
    }
}
