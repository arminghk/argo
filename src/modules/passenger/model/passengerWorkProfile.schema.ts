import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export type PassengerWorkProfileDocument = HydratedDocument<PassengerWorkProfile>;

@Schema({ timestamps: true, collection: 'passenger_work_profile' })
export class PassengerWorkProfile {
  @Prop({ type: String, maxlength: 255, default: null, unique: true })
  ID: string;

  @Prop({ type: String, enum: ['active', 'deactive'] })
  status: string;

  @Prop({ type: String, lowercase: true })
  email: string;

  @Prop({ type: String, maxlength: 255 })
  company_name: string;

  @Prop({ type: String, maxlength: 255 })
  company_address: string;

  @Prop({ type: String, maxlength: 255 })
  vat_number: string;

  @Prop({ type: String, maxlength: 255 })
  register_number: string;

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'user' }])
  reports: MongooseSchema.Types.ObjectId[];

  @Prop({ type: String, maxlength: 255 })
  payment_method_id: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Passenger' })
  passenger_id: MongooseSchema.Types.ObjectId;

  @Prop({ type: Number })
  createdAt: number;

  @Prop({ type: Number })
  updatedAt: number;

  @Prop({ type: String, enum: ['yes', 'no'], default: 'no' })
  deleted: string;

  @Prop({ type: MongooseSchema.Types.Mixed, ref: 'users' })
  extraData: MongooseSchema.Types.Mixed;
}

export const PassengerWorkProfileSchema = SchemaFactory.createForClass(PassengerWorkProfile);
