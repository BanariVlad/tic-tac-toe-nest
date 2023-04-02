import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TicTacToeModule } from './tic-tac-toe/tic-tac-toe.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    ChatModule,
    TicTacToeModule,
    MongooseModule.forRoot('mongodb://localhost:2717'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}