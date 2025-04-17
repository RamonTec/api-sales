import { Body, Controller, Get, Param, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { AuthRoles } from 'src/auth/auth.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { _CreateProductDtoClass, _UpdateProductDtoClass } from './dto/product.dto';
import { ProductService } from './product.service';
import { ApiBadRequestResponse, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesEnum } from 'src/users/dto/users.dto';

@Controller('product')
@ApiTags('product flow')
export class ProductController {

  constructor(
    private readonly productService: ProductService,
  ){}

  @UseGuards(AuthGuard)
  @AuthRoles(RolesEnum.ADMIN)
  @Post('create')
  @ApiOperation({
      summary: 'Register new product'
  })
  @ApiBody({
      type: _CreateProductDtoClass
  })
  @ApiResponse({
      description: 'Register new product success',
      status: 200,
      type: _CreateProductDtoClass,
  })
  @ApiBadRequestResponse({
      description: 'Invalid data',
  })
  async create(@Body() newProduct: _CreateProductDtoClass){
    return await this.productService.createProduct(newProduct);
  }

  @UseGuards(AuthGuard)
  @AuthRoles(RolesEnum.ADMIN)
  @Put('update')
  @ApiOperation({
      summary: 'update new product'
  })
  @ApiBody({
      type: _UpdateProductDtoClass
  })
  @ApiResponse({
      description: 'update new product success',
      status: 200,
      type: _UpdateProductDtoClass,
  })
  @ApiBadRequestResponse({
      description: 'Invalid data',
  })
  async update(@Body() oldProduct: _UpdateProductDtoClass){
    return await this.productService.updateProduct(oldProduct);
  }
}
