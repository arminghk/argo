import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';

export type PortalUserDocument = HydratedDocument<PortalUser>;

@Schema({ timestamps: true, collection: 'users' })
export class PortalUser {
  @Prop({ type: String, trim: true, maxlength: 255, default: null })
  username: string;

  @Prop({ type: String, trim: true, maxlength: 255, default: null })
  password: string;

  @Prop({ type: String, trim: true, maxlength: 255, default: null })
  first_name: string;

  @Prop({ type: String, trim: true, maxlength: 255, default: null })
  last_name: string;

  @Prop({
    type: String,
    maxlength: 255,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'wrong email format'],
    default: null,
  })
  email: string;

  @Prop({ type: String, default: null })
  mobile: string;

  @Prop({ type: String, maxlength: 255, default: null })
  role: string;

  @Prop({ type: String, maxlength: 255, default: null })
  photo_url: string;

  @Prop({ type: String, enum: ['active', 'deactive'] })
  status: string;

  @Prop({ type: Number, default: null })
  lastLoginAt: number;

  @Prop({ type: Number, default: Date.now })
  createdAt: number;

  @Prop({ type: Number, default: Date.now })
  updatedAt: number;
}

export const PortalUserSchema = SchemaFactory.createForClass(PortalUser);
