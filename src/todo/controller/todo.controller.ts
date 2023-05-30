import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TodoService } from '../services/todo.service';
import { Todo } from '../interfaces/todo.interface';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async create(@Body() todo: Todo): Promise<Todo> {
    return this.todoService.create(todo);
  }

  @Get()
  async findAll(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Todo> {
    return this.todoService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() todo: Todo): Promise<Todo> {
    return this.todoService.update(id, todo);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Todo> {
    return this.todoService.delete(id);
  }
}
