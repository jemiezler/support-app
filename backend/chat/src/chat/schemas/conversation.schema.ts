import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export class Conversation extends Document {
  @Prop({required: true})
  ticketId: string | Types.ObjectId;

  @Prop({required: true})
  senderId: string | Types.ObjectId;

  @Prop({required: true})
  receiverId: string | Types.ObjectId;

  @Prop({required: true})
  message: string;

  @Prop({default: false})
  isBotMessage: boolean;

  @Prop({default: Date.now})
  createdAt: Date;
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);
