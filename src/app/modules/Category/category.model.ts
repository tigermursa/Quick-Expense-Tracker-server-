import mongoose, { Schema } from 'mongoose';
import { ICategory } from './category.interface';

const CategorySchema: Schema = new Schema({
  categoryName: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
});

export const Category = mongoose.model<ICategory>('Category', CategorySchema);
