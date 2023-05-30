import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { TodoService } from '../services/todo.service';
import { Todo } from '../interfaces/todo.interface';

@WebSocketGateway({ namespace: 'todo' })
@WebSocketGateway()
export class TodoGateway {
  constructor(private readonly todoService: TodoService) {}

  @WebSocketServer() server;

  @SubscribeMessage('createTodo')
  async onCreateTodo(client, data): Promise<WsResponse<Todo>> {
    const createdTodo = await this.todoService.create(data);
    client.broadcast.emit('newTodo', createdTodo);

    return { event: 'newTodo', data: createdTodo };
  }

  @SubscribeMessage('updateTodo')
  async onUpdateTodo(client, data): Promise<WsResponse<any>> {
    const updatedTodo = await this.todoService.update(data._id, data);
    client.broadcast.emit('updatedTodo', updatedTodo);

    return { event: 'updatedTodo', data: updatedTodo };
  }

  @SubscribeMessage('deleteTodo')
  async onDeleteTodo(client, data): Promise<WsResponse<string>> {
    await this.todoService.delete(data._id);
    client.broadcast.emit('todoDeleted', data._id);

    return { event: 'todoDeleted', data: data._id };
  }
}
