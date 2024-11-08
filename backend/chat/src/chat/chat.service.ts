// chat.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { Conversation } from './schemas/conversation.schema';
import { Ticket } from './schemas/ticket.schema';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Conversation.name)
    private conversationModel: Model<Conversation>,
    @InjectModel(Ticket.name) private ticketModel: Model<Ticket>,
    private readonly authService: AuthService,
  ) {}

  async createTicket(userId: string, agentId: string): Promise<Ticket> {
    const newTicket = new this.ticketModel({
      userId,
      agentId,
      status: 'open',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return await newTicket.save();
  }

  async createMessage(
    senderId: string,
    receiverId: string,
    message: string,
    ticketId: string,
  ): Promise<Conversation> {
    const conversation = new this.conversationModel({
      ticketId,
      senderId,
      receiverId,
      message,
      isBotMessage: false,
    });

    return await conversation.save();
  }

  async handleMessage(
    senderId: string,
    receiverId: string,
    message: string,
  ): Promise<Conversation> {
    // Try to find an open ticket between the sender and receiver
    let ticket = await this.ticketModel
      .findOne({ userId: senderId, agentId: receiverId, status: 'open' });
  
    if (!ticket) {
      // If no open ticket is found, create a new one
      ticket = (await this.createTicket(senderId, receiverId)).toObject();
    }
  
    // Convert the ObjectId to string if necessary
    const ticketId = ticket._id.toString();
  
    // Now that we have the ticket, pass the ticketId to the createMessage method
    return await this.createMessage(senderId, receiverId, message, ticketId);
  }
  

  async getMessages(ticketId: string): Promise<Conversation[]> {
    return await this.conversationModel
      .find({ ticketId })
      .sort({ createdAt: 1 });
  }

  async closeTicket(ticketId: string): Promise<Ticket> {
    const ticket = await this.ticketModel.findByIdAndUpdate(
      ticketId,
      { status: 'closed', updatedAt: new Date() },
      { new: true },
    );

    return ticket;
  }
}
