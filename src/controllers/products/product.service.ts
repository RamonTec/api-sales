import { BadRequestException, ConflictException, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from 'src/controllers/products/schemas/product.schema';
import { _CreateProductDtoClass, _UpdateProductDtoClass, IntProduct } from './dto/product.dto';
import { Categorie, CategorieDocument } from 'src/controllers/categories/schemas/categories.schemas';
import { CategorieService } from 'src/controllers/categories/categories.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<ProductDocument>,
    private readonly categorieService: CategorieService,
  ){}

  async createProduct(product: _CreateProductDtoClass): Promise<IntProduct> {
    try {

      await this.validateProductName(product);
      await this.validateProduct(product);
      
      const saveProduct = await this.productModel.create(product).catch(e =>{
        throw new ConflictException()
      });
      
      return saveProduct
    } catch (error) {
      throw error
    }
  }

  async updateProduct(product: _UpdateProductDtoClass, id: string): Promise<IntProduct> {
    try {

      await this.validateProduct(product);
      
      const updatedProduct = await this.productModel.findByIdAndUpdate(product._id, product, { new: true } );

      if (!updatedProduct) throw new NotFoundException('This product not exists', {
        cause: new Error(),
        description: 'This product not exists',
      })
      
      return updatedProduct
    } catch (error) {
      throw error
    }
  }

  async validateProduct(product: _CreateProductDtoClass): Promise<void> {
    try {
      
      const existCategorie = await this.categorieService.getCategorie(product.categorieId);
      
      if (!existCategorie) throw new NotFoundException('This categorie not exists', {
        cause: new Error(),
        description: 'This categorie not exists',
      })

      if (!existCategorie.status) throw new BadRequestException('Invalid categorie', {
        cause: new Error(),
        description: 'This categorie is invalid',
      })
      
    } catch (error) {
      throw error;
    }
  }

  async validateProductName(product: _CreateProductDtoClass): Promise<void> {
    try {
      
      const _product = await this.productModel.findOne({name: product.name});

      if(_product) throw new ConflictException('This product already exists', {
        cause: new Error(),
        description: 'This product already exists',
      })
      
    } catch (error) {
      throw error;
    }
  }

  async getProductsList (): Promise<IntProduct[]> { 
    try {
      const products = await this.productModel.find().populate('categorieId').exec();
      return products
    } catch (error) {
      throw error;
    }
  }
}
