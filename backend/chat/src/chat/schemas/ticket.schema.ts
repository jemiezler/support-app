import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Ticket extends Document {
  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId; // The user initiating the conversation
  
  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  agentId: Types.ObjectId; // The agent assigned to the ticket
  
  @Prop({ default: 'open' })
  status: 'open' | 'closed'; // Status of the ticket
  
  @Prop({ default: Date.now })
  createdAt: Date;
  
  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
