import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/schemas/users.schemas';
import { Categorie, CategorieSchema } from 'src/categories/schemas/categories.schemas';

@Module({
    imports:[ 
        MongooseModule.forRoot('mongodb+srv://ramontec:123456789_10@cluster0.slohguw.mongodb.net/gameDB'),
        MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
        MongooseModule.forFeature([{name: Categorie.name, schema: CategorieSchema}]),
    ],
    exports:[MongooseModule]
})
export class DbModule {}
