import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product {
  @Prop({ type: String, default: () => crypto.randomUUID() })
  _id: string;

  @Prop({ type: String, required: true, unique: true })
  name: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: Boolean, required: true })
  status: boolean;

  @Prop({ type: String, required: true })
  categorieId: string;

  @Prop({ type: Number, required: true })
  stock: number;

  @Prop({ type: [String], required: true })
  images: string[];

  @Prop({ type: Date, default: Date.now() })
  createdAt: Date;

  @Prop({ type: Date })
  updatedAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
