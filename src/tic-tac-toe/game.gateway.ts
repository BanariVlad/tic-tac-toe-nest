import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import Minimax from 'tic-tac-toe-minimax';
import { Model } from 'mongoose';
import { Statistic, StatisticDocument } from './schemas/statistic.schema';
import { InjectModel } from '@nestjs/mongoose';

const { GameStep } = Minimax;

type GameSymbol = 'X' | 'O';

interface Move {
  playerId: string;
  moveIndex: number;
  board: Array<number | GameSymbol>;
  roomId: string;
  symbol: GameSymbol;
}

@WebSocketGateway({ namespace: 'game' })
export class GameGateway {
  @WebSocketServer()
  private readonly server;

  constructor(
    @InjectModel(Statistic.name)
    private statisticModel: Model<StatisticDocument>,
  ) {}

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, [roomId, playerId]: string[]) {
    client.join(roomId);

    this.sendWins(client, playerId);
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket, roomId: string) {
    client.leave(roomId);
  }

  @SubscribeMessage('makeMove')
  handleMakeMove(client: Socket, move: Move) {
    const symbols = {
      O: {
        huPlayer: 'O',
        aiPlayer: 'X',
      },
      X: {
        huPlayer: 'X',
        aiPlayer: 'O',
      },
    };

    const newBoard = [...move.board];
    newBoard.splice(move.moveIndex, 1, move.symbol);

    const result = GameStep(newBoard, symbols[move.symbol], 'Easy');

    this.server
      .to(move.roomId)
      .emit('move', { newBoard, move: move.symbol === 'X' ? 'O' : 'X' });

    if (result.winner) {
      this.createOrUpdateStatistic(client, move.playerId);
      this.server.to(move.roomId).emit('win', result.winner);
    }
  }

  private async createOrUpdateStatistic(client: Socket, playerId: string) {
    const player = await this.statisticModel
      .findOne({ player_id: playerId })
      .exec();

    if (!player) {
      const newStatistic = new this.statisticModel({
        player_id: playerId,
        player_name: 'Test123',
        wins: 1,
      });

      await newStatistic.save();
    } else {
      await this.statisticModel
        .updateOne({ player_id: playerId }, { $inc: { wins: 1 } })
        .exec();
    }

    await this.sendWins(client, playerId);
  }

  private async sendWins(client: Socket, playerId: string) {
    const user = await this.statisticModel
      .findOne({ player_id: playerId })
      .exec();

    client.emit('wins', user?.wins ?? 0);
  }
}
