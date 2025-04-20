import { Body, Controller, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthRoles } from 'src/controllers/auth/auth.decorator';
import { AuthGuard } from 'src/controllers/auth/auth.guard';
import { _CreateProductDtoClass, _FilterProductDtoClass, _UpdateProductDtoClass } from './dto/product.dto';
import { ProductService } from './product.service';
import { ApiBadRequestResponse, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesEnum } from 'src/controllers/users/dto/users.dto';

@Controller('product')
@ApiTags('product flow')
export class ProductController {

  constructor(
    private readonly productService: ProductService,
  ){}

  @UseGuards(AuthGuard)
  @AuthRoles(RolesEnum.ADMIN)
  @Post('')
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
  @Put(':_id')
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
  async update(@Body() oldProduct: _UpdateProductDtoClass, @Param('_id') _id: string){
    return await this.productService.updateProduct(oldProduct, _id);
  }

  @UseGuards(AuthGuard)
  @AuthRoles(RolesEnum.ADMIN)
  @Put(':_id')
  @ApiOperation({
      summary: 'update product'
  })
  @ApiBody({
      type: _FilterProductDtoClass
  })
  @ApiResponse({
      description: 'list products success',
      status: 200,
      type: _FilterProductDtoClass,
  })
  @ApiBadRequestResponse({
      description: 'Invalid data',
  })
  async listProducts(@Param('_id') _id: string){
    return await this.productService.getProductsList();
  }
}
