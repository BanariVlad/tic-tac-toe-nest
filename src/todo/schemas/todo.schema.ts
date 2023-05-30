import { Schema } from 'mongoose';

export const TodoSchema = new Schema({
  title: String,
  status: String,
  index: Number,
  previousIndex: Number || undefined,
  containerToDelete: String || undefined,
});
