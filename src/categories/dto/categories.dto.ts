import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsBoolean, IsOptional, IsNumber, IsInt } from "class-validator";


export class IntCategorie {
  _id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  status: boolean;
}

export type CreateCategorieDto = Omit<IntCategorie, 'id' | 'createdAt' | 'updatedAt'>
export type UpdateCategorieDto = Omit<IntCategorie, 'createdAt' | 'updatedAt'>

export interface ResponseData<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export class _CreateCategorieDtoClass {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: 'Name',
    description: "Name for categorie",
    type: String
  })
  name: string;

  @ApiProperty({
    required: false,
    example: 'Cateogry image',
    description: "Image for categorie",
    type: String
  })
  file: string;

}

export class _UpdateCategorieDtoClass {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: 'Name',
    description: "Name for categorie",
    type: String
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: 'id',
    description: "id for categorie",
    type: String
  })
  _id: string;

  @IsBoolean()
  @ApiProperty({
    required: false,
    example: 'Status',
    description: "Status for categorie",
    type: Boolean
  })
  status: boolean;
}

export class PaginationDto {
  @IsOptional()
  limit: number;

  @IsOptional()
  page: number;
}

export class IntPagination<T> {
  data: T[];
  limit: number;
  total: number;
  page: number;
  totalPages: number
}