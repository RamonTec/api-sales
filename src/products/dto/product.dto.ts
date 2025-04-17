import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsBoolean, IsNumber } from "class-validator";


export interface IntProduct {
  _id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  status: boolean;
  description: string;
  categorieId: string;
  stock: number;
}

export type CreateProductDto = Omit<IntProduct, '_id' | 'createdAt' | 'updatedAt'>
export type UpdateProductDto = Omit<IntProduct, 'createdAt' | 'updatedAt'>

export class _CreateProductDtoClass {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: 'Name',
    description: "Name for product",
    type: String
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: 'Description test',
    description: "Description for product",
    type: String
  })
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: 'categorie for a product',
    description: "categorie id",
    type: String
  })
  categorieId: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: 'Product stock',
    description: "Total of the product",
    type: Number
  })
  stock: number;

  @IsBoolean()
  @ApiProperty({
    required: true,
    example: 'Status',
    description: "Status for product",
    type: Boolean
  })
  status: boolean;
}

export class _UpdateProductDtoClass extends _CreateProductDtoClass {

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: 'product id',
    description: "id for product",
    type: String
  })
  _id: string;
}