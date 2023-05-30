import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoSchema } from './schemas/todo.schema';
import { TodoController } from './controller/todo.controller';
import { TodoGateway } from './gateways/todo.gateway';
import { TodoService } from './services/todo.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Todo', schema: TodoSchema }])],
  controllers: [TodoController],
  providers: [TodoGateway, TodoService],
})
export class TodoModule {}
