import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { HttpService } from '@nestjs/axios';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { ChatService } from './chat.service';

@WebSocketGateway(3001, { cors: { origin: '*' } })
@Injectable()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  private activeUsers = new Map<string, { socketId: string; status: string }>();

  constructor(
    private readonly chatService: ChatService,
    private readonly httpService: HttpService, // Injecting the HttpService for API calls
    private readonly configService: ConfigService, // Inject ConfigService
  ) {}

  // Called when a user connects
  async handleConnection(socket: Socket) {
    try {
      const token = socket.handshake.query.token;
      if (Array.isArray(token)) {
        throw new UnauthorizedException('Token should be a single string');
      }

      if (!token) {
        throw new UnauthorizedException('Token not provided');
      }

      // Call the auth-backend to validate the token and get user info
      const user = await this.validateToken(token);
      if (!user) {
        throw new UnauthorizedException('Invalid token');
      }

      const userId = user.id;

      // Add the user to the active users map
      this.activeUsers.set(userId, { socketId: socket.id, status: 'online' });
      socket.data.user = user; // Store user data in the socket object

      console.log(`User ${userId} connected`);

      // Emit user status to all clients
      this.server.emit('user_status', { userId, status: 'online' });
    } catch (error) {
      throw new UnauthorizedException('Invalid token or connection error');
    }
  }

  // Called when a user disconnects
  handleDisconnect(socket: Socket) {
    const userId = socket.data.user?.id;
    if (userId) {
      this.activeUsers.delete(userId);
      console.log(`User ${userId} disconnected`);
      this.server.emit('user_status', { userId, status: 'offline' });
    }
  }

  // Listen for incoming messages from users
  @SubscribeMessage('send_message')
  async handleSendMessage(
    @MessageBody() data: { receiverId: string; message: string },
    @ConnectedSocket() socket: Socket,
  ) {
    const senderId = socket.data.user?.id;

    // Check if senderId is available in socket data
    if (!senderId) {
      throw new UnauthorizedException('Sender not authenticated');
    }

    // Validate if receiverId is provided
    if (!data.receiverId) {
      throw new UnauthorizedException('Receiver ID is required');
    }

    try {
      // Call handleMessage to either create a new ticket or use an existing one, and create the message
      const conversation = await this.chatService.handleMessage(
        senderId,
        data.receiverId,
        data.message,
      );

      // Emit the new message to all connected clients
      this.server.emit('new_message', conversation);
    } catch (error) {
      throw new UnauthorizedException(
        'Error handling message: ' + error.message,
      );
    }
  }

  // Helper function to get user status
  getUserStatus(userId: string) {
    return this.activeUsers.get(userId)?.status ?? 'offline';
  }

  // Validate the token by making an HTTP request to the auth-backend
  private async validateToken(token: string) {
    try {
      const authBackendUrl = this.configService.get<string>('AUTH_BACKEND_URL'); // Get URL from environment
      const response = await firstValueFrom(
        this.httpService.post(authBackendUrl, { token }).pipe(
          catchError((error) => {
            throw new UnauthorizedException('Failed to validate token');
          }),
        ),
      );
      return response.data; // Assuming the response returns the user data
    } catch (error) {
      throw new UnauthorizedException('Token validation failed');
    }
  }
}
