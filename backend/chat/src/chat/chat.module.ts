// chat.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { Conversation, ConversationSchema } from './schemas/conversation.schema';
import { Ticket, TicketSchema } from './schemas/ticket.schema';
import { HttpModule } from '@nestjs/axios';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Conversation.name, schema: ConversationSchema },
      { name: Ticket.name, schema: TicketSchema },
    ]),
    HttpModule, // Import HttpModule for making requests to the auth service
  ],
  providers: [ChatService, ChatGateway, AuthService],
})
export class ChatModule {}
