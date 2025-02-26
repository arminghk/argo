import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';

export type DriverDocument = HydratedDocument<Driver>;

@Schema({ timestamps: true, collection: 'drivers' })
export class Driver {
  @Prop({ trim: true, maxlength: 255, default: null })
  first_name: string;

  @Prop({ trim: true, maxlength: 255, default: null })
  last_name: string;

  @Prop({ default: null })
  mobile: string;

  @Prop({ trim: true })
  referral_code: string;

  @Prop({ trim: true })
  invite_code: string;

  @Prop({ type: Boolean, default: false })
  account_information: boolean;

  @Prop({ type: Number })
  id_card_cumber: number;

  @Prop({ type: String })
  address: string;

  @Prop({ type: Number })
  post_code: number;

  @Prop({ type: Date })
  birthday: Date;

  @Prop({
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'wrong email format',
    ],
    maxlength: 255,
    default: null,
  })
  email: string;

  @Prop({ type: Number })
  license_experience_duration: number;

  @Prop({ type: Boolean })
  status: boolean;

  @Prop({
    type: { front: String, back: String },
    default: { front: null, back: null },
  })
  driver_license: { front: string; back: string };

  @Prop({ type: String })
  taxi_operation_license: string;

  @Prop({ type: Date })
  taxi_operation_expirationDate: Date;

  @Prop({
    type: { front: String, back: String },
    default: { front: null, back: null },
  })
  id_card: { front: string; back: string };

  @Prop({ type: Date })
  id_card_operation_expiration_date: Date;

  @Prop({
    type: { front: String, back: String },
    default: { front: null, back: null },
  })
  taxi_driver_license: { front: string; back: string };

  @Prop({ type: Date })
  taxi_driver_expiration_date: Date;

  @Prop({ type: String })
  vehicle_photo: string;

  @Prop({ type: String })
  profile_photo: string;

  @Prop({ type: String })
  other_documents: string;

  @Prop({ type: String })
  taxi_point_certificate: string;
}

export const DriverSchema = SchemaFactory.createForClass(Driver);
