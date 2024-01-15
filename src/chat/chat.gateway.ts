import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

interface Message {
  text: string;
  userName: string;
  avatarUrl?: string;
}

@WebSocketGateway({ namespace: 'chat' })
export class ChatGateway {
  @WebSocketServer()
  private server;

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, roomId: string) {
    console.log(`Client ${client.id} joined room ${roomId}`);
    client.join(roomId);
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket, roomId: string) {
    console.log(`Client ${client.id} left room ${roomId}`);
    client.leave(roomId);
  }

  @SubscribeMessage('chatToServer')
  handleChatToServer(client: Socket, [message, roomId]: [Message, string]) {
    console.log(
      `Client ${client.id} sent message "${message.text}" to room ${roomId}`,
    );
    this.server
      .to(roomId)
      .emit('chatToClient', { message, username: '123', senderId: client.id });
  }
}
