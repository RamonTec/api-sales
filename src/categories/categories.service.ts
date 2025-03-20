import { BadRequestException, ConflictException, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategorieDocument, Categorie } from 'src/categories/schemas/categories.schemas';
import { CreateCategorieDto, IntCategorie, ResponseData, UpdateCategorieDto } from './dto/categories.dto';

@Injectable()
export class CategorieService {
  constructor(
      @InjectModel(Categorie.name) private readonly categorieModel: Model<CategorieDocument>,
  ){}

  async createCategorie(categorie: CreateCategorieDto): Promise<IntCategorie | any> {
      try {
        const _categorie = await this.categorieModel.findOne({name: categorie.name});

        if(_categorie) throw new ConflictException('This category already exists', {
          cause: new Error(),
          description: 'This category already exists',
        })

        const saveCategorie = await this.categorieModel.create(categorie).catch(e =>{
          throw new ConflictException()
        });
        
        return {
            categorie: saveCategorie,
        }
      } catch (error) {
          return error
      }
  }

  async updateCategorie(categorie: UpdateCategorieDto): Promise<IntCategorie | any> {
    try {
      const _categorie = await this.categorieModel.findById(categorie.id);

      if(!_categorie) throw new NotFoundException('Invalid categorie', {
        cause: new Error(),
        description: 'Invalid categorie'
      })

      const updateCategorie = await this.categorieModel.findByIdAndUpdate(_categorie._id, categorie, { new: true }).catch(e =>{
        throw new ConflictException()
      });
      
      return {
        categorie: updateCategorie,
      }
    } catch (error) {
        return error
    }
  }

  async getCategorie(categorie: string): Promise<IntCategorie | any> {
    try {
      const _categorie = await this.categorieModel.findById(categorie);

      if(!_categorie) throw new NotFoundException('Invalid categorie', {
        cause: new Error(),
        description: 'Invalid categorie'
      })
      
      return {
        categorie: _categorie,
      }

    } catch (error) {
      return error
    }
  }
}
