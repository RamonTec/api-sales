import { Body, Controller, Get, Headers, Param, Post, Put, Query, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { IntCategorie, IntPagination, PaginationDto, _CreateCategorieDtoClass, _UpdateCategorieDtoClass } from './dto/categories.dto';
import { CategorieService } from './categories.service';
import { ApiBadRequestResponse, ApiBody, ApiResponse, ApiOperation, ApiTags, ApiConsumes } from '@nestjs/swagger';
import { AuthRoles } from 'src/controllers/auth/auth.decorator';
import { AuthGuard } from 'src/controllers/auth/auth.guard';
import { RolesEnum } from 'src/controllers/users/dto/users.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('categories')
@ApiTags('categories flow')
export class CategoriesController {
    constructor(
        private readonly categorieService: CategorieService
    ){}

    @UseGuards(AuthGuard)
    @AuthRoles(RolesEnum.ADMIN)
    @Post('')
    @UseInterceptors(FileInterceptor('file'))
    @ApiConsumes('multipart/form-data')
    @ApiOperation({
        summary: 'Register new categorie'
    })
    @ApiBody({
        description: 'Category data with file upload',
        type: _CreateCategorieDtoClass
    })
    @ApiResponse({
        description: 'Register new categorie success',
        status: 201,
        type: _CreateCategorieDtoClass,
    })
    @ApiBadRequestResponse({
        description: 'Invalid data',
    })
    async registerCategorie(@UploadedFile() file: Express.Multer.File, @Body() newCategorie: _CreateCategorieDtoClass){
        return await this.categorieService.createCategorie(newCategorie, file);
    }

    @UseGuards(AuthGuard)
    @AuthRoles(RolesEnum.ADMIN)
    @Put(':_id')
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
    async updateCategorie(@Body() oldCategorie: _UpdateCategorieDtoClass, @Param('_id') _id: string){
        return await this.categorieService.updateCategorie(oldCategorie, _id);
    }

    @UseGuards(AuthGuard)
    @AuthRoles(RolesEnum.ADMIN)
    @Get(':_id')
    @ApiOperation({
        summary: 'Get categorie'
    })
    @ApiResponse({
        description: 'Get categorie detail',
        status: 200,
        type: IntCategorie
    })
    @ApiBadRequestResponse({
        description: 'Invalid data',
    })
    async getOneCategorie(@Param('_id') _id: string){
        return await this.categorieService.getCategorie(_id);
    }

    @Get('')
    @ApiOperation({
        summary: 'Get categories list',
    })
    @ApiBody({
        description: 'Get all categories',
        type: IntPagination<IntCategorie>,
    })
    @ApiResponse({
        description: 'Get all categories',
        status: 200,
        type: IntPagination<IntCategorie>,
    })
    @ApiBadRequestResponse({
        description: 'Invalid data',
    })
    async getCategories(
        @Query() paginationDto: PaginationDto,
    ){
        return await this.categorieService.getCategoriesByPaginate(paginationDto)
    }
}
