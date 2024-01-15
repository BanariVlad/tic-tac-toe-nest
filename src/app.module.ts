import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TicTacToeModule } from './tic-tac-toe/tic-tac-toe.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatModule } from './chat/chat.module';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    ChatModule,
    // TicTacToeModule,
    // TodoModule,
    // MongooseModule.forRoot('mongodb://root:example@localhost:27017'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
