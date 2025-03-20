import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsBoolean } from "class-validator";


export interface IntCategorie {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
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

  @IsBoolean()
  @ApiProperty({
    required: false,
    example: 'Status',
    description: "Status for categorie",
    type: String
  })
  status: boolean;
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
  id: string;

  @IsBoolean()
  @ApiProperty({
    required: false,
    example: 'Status',
    description: "Status for categorie",
    type: String
  })
  status: boolean;
}