import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategorieDocument, Categorie } from 'src/controllers/categories/schemas/categories.schemas';
import { _CreateCategorieDtoClass, _UpdateCategorieDtoClass, IntCategorie, IntPagination, PaginationDto } from './dto/categories.dto';
import { FileUploadService } from 'src/utils/file-upload.util';

@Injectable()
export class CategorieService {
  constructor(
      @InjectModel(Categorie.name) private readonly categorieModel: Model<CategorieDocument>,
      private readonly fileUploadService: FileUploadService,
  ){}

  async createCategorie(categorie: _CreateCategorieDtoClass, file: Express.Multer.File): Promise<IntCategorie> {
    try {
      const _categorie = await this.categorieModel.findOne({name: categorie.name});

      if(_categorie) throw new ConflictException('This category already exists', {
        cause: new Error(),
        description: 'This category already exists',
      });

      if (file) {
        const filePath = await this.fileUploadService.uploadFile(file);
        categorie.file = filePath;
      }

      const saveCategorie = await this.categorieModel.create({
        status: true,
        ...categorie,
      }).catch((e) => {
        if (file && categorie.file) {
          this.fileUploadService.deleteFile(categorie.file).catch(() => {});
        }
        throw new ConflictException();
      });
      
      return saveCategorie
      
    } catch (error) {
      throw error
    }
  }

  async updateCategorie(categorie: _UpdateCategorieDtoClass): Promise<IntCategorie> {
    try {
      const _categorie = await this.categorieModel.findById(categorie._id);

      if(!_categorie) throw new NotFoundException('Invalid categorie', {
        cause: new Error(),
        description: 'Invalid categorie'
      })

      const updateCategorie = await this.categorieModel.findByIdAndUpdate(_categorie._id, categorie, { new: true }).catch(e =>{
        throw new ConflictException()
      });
      
      return updateCategorie

    } catch (error) {
        throw error
    }
  }

  async getCategorie(categorieId: string): Promise<IntCategorie> {
    try {
      const _categorie = await this.categorieModel.findById(categorieId);

      if(!_categorie) throw new NotFoundException('Invalid categorie', {
        cause: new Error(),
        description: 'Invalid categorie'
      })
      
      return _categorie

    } catch (error) {
      throw error
    }
  }

  async getCategoriesByPaginate(paginationDto: PaginationDto): Promise<IntPagination<IntCategorie>> {
    try {

      const { limit = 10, page = 0 } = paginationDto;

      const skip = (page - 1) * limit;

      const _categorie = await this.categorieModel.find()
        .skip(skip)
        .limit(limit)
        .exec();

      const total = await this.categorieModel.countDocuments();
      
      return {
        data: _categorie,
        total,
        limit,
        page,
        totalPages: Math.ceil(total / limit),
      }

    } catch (error) {
      throw error
    }
  }
}
