import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/schemas/users.schemas';
import { Categorie, CategorieSchema } from 'src/categories/schemas/categories.schemas';
import { Product, ProductSchema } from 'src/products/schemas/product.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports:[ 
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
              uri: configService.get<string>('DB_URL'),
            }),
            inject: [ConfigService],
          }),
        MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
        MongooseModule.forFeature([{name: Categorie.name, schema: CategorieSchema}]),
        MongooseModule.forFeature([{name: Product.name, schema: ProductSchema}]),
    ],
    exports:[MongooseModule]
})
export class DbModule {}
