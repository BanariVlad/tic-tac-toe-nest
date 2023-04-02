import { Module } from '@nestjs/common';
import { TicTacToeService } from './tic-tac-toe.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Statistic, StatisticSchema } from './schemas/statistic.schema';
import { GameGateway } from './game.gateway';

@Module({
  providers: [TicTacToeService, GameGateway],
  imports: [
    MongooseModule.forFeature([
      { name: Statistic.name, schema: StatisticSchema },
    ]),
  ],
})
export class TicTacToeModule {}
