import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';

export enum FleetStatusEnum {
  active = 'active',
  inactive = 'inactive',
}

export type FleetDocument = HydratedDocument<Fleet>;

@Schema({ timestamps: true, collection: 'fleets' })
export class Fleet {
  @Prop({ type: String, required: true })
  username: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, required: true })
  first_name: string;

  @Prop({ type: String, required: true })
  last_name: string;

  @Prop({ type: String, required: true })
  mobile: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, required: true })
  id_card_number: string;

  @Prop({ type: Date, required: true })
  birthday: Date;

  @Prop({ type: String, required: true })
  company_address: string;

  @Prop({ type: String, required: true })
  postal_code: string;

  @Prop({ type: String, required: true })
  company_register_number: string;

  @Prop({ type: String, required: true })
  id_card_image: string;

  @Prop({ type: [String], default: [] })
  other_documents: string[];

  @Prop({ type: Boolean, default: false })
  is_owner: boolean;

  @Prop({ type: String, default: null })
  description: string;

  @Prop({
    type: String,
    enum: FleetStatusEnum,
    default: FleetStatusEnum.inactive,
  })
  status: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'users', required: true })
  fleet_owner: Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'drivers', default: null })
  drivers: Types.ObjectId[];

  @Prop({ type: Number, default: Date.now() })
  createdAt: number;

  @Prop({ type: Number, default: Date.now() })
  updatedAt: number;
}

export const FleetSchema = SchemaFactory.createForClass(Fleet);
