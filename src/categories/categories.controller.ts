import { Body, Controller, Get, Headers, Param, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { CreateCategorieDto, IntCategorie, ResponseData, UpdateCategorieDto, _CreateCategorieDtoClass, _UpdateCategorieDtoClass } from './dto/categories.dto';
import { CategorieService } from './categories.service';
import { Response } from 'express';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiResponse, ApiOperation, ApiQuery, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthRoles } from 'src/auth/auth.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesEnum } from 'src/users/dto/users.dto';

@Controller('categories')
@ApiTags('authentication')
export class CategoriesController {
    constructor(
        private readonly categorieService: CategorieService
    ){}

    @UseGuards(AuthGuard)
    @AuthRoles(RolesEnum.ADMIN)
    @Post('create')
    @ApiOperation({
        summary: 'Register new categorie'
    })
    @ApiBody({
        type: _CreateCategorieDtoClass
    })
    @ApiResponse({
        description: 'Register new categorie success',
        status: 200,
        type: _CreateCategorieDtoClass,
    })
    @ApiBadRequestResponse({
        description: 'Invalid data',
    })
    async registerCategorie(@Body() newCategorie: _CreateCategorieDtoClass, @Res() response:Response){
        const res = await this.categorieService.createCategorie(newCategorie)
        response.status(res.status || 201)
        response.send(res)
    }

    @UseGuards(AuthGuard)
    @AuthRoles(RolesEnum.ADMIN)
    @Put('update')
    @ApiOperation({
        summary: 'Update categorie'
    })
    @ApiBody({
        type: _UpdateCategorieDtoClass
    })
    @ApiResponse({
        description: 'Update old categorie success',
        status: 200,
        type: _UpdateCategorieDtoClass,
    })
    @ApiBadRequestResponse({
        description: 'Invalid data',
    })
    async updateCategorie(@Body() oldCategorie: _UpdateCategorieDtoClass, @Res() response:Response){
        const res = await this.categorieService.updateCategorie(oldCategorie)
        response.status(res.status || 201)
        response.send(res)
    }

    @UseGuards(AuthGuard)
    @AuthRoles(RolesEnum.ADMIN)
    @Get('categorie-detail/:id')
    @ApiOperation({
        summary: 'Get categorie'
    })
    @ApiResponse({
        description: 'Get categorie detail',
        status: 200,
    })
    @ApiBadRequestResponse({
        description: 'Invalid data',
    })
    async getOneCategorie(@Param('id') id: string, @Res() response:Response){
        const res = await this.categorieService.getCategorie(id)
        response.status(res.status || 201)
        response.send(res)
    }

}
