import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/schemas/users.schemas';

@Module({
    imports:[ 
        MongooseModule.forRoot('mongodb+srv://ramontec:123456789_10@cluster0.slohguw.mongodb.net/gameDB'),
        MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
    ],
    exports:[MongooseModule]
})
export class DbModule {}
