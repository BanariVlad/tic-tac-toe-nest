import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type StatisticDocument = HydratedDocument<Statistic>;

@Schema()
export class Statistic {
  @Prop()
  player_id: string;

  @Prop()
  player_name: string;

  @Prop()
  wins: number;
}

export const StatisticSchema = SchemaFactory.createForClass(Statistic);
