import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type CategorieDocument = HydratedDocument<Categorie>;


@Schema({ timestamps: true })
export class Categorie {
  @Prop({ type: String, default: () => crypto.randomUUID() })
  _id: string;

  @Prop({ type: String, required: true, unique: true })
  name: string;

  @Prop({ type: Boolean, required: false })
  status: boolean;

  @Prop({ type: Date, default: Date.now() })
  createdAt: Date;

  @Prop({ type: Date })
  updatedAt: Date;

  @Prop({ type: String, required: true })
  file: string;
}

export const CategorieSchema = SchemaFactory.createForClass(Categorie);
