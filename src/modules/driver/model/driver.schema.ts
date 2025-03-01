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

  @Prop({ type: String })
  id_card_number: string;

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

  @Prop({ type: Date })
  license_experience_duration: Date;

  @Prop({ type: String, enum: ['active', 'deactive'], default: 'deactive' })
  status: string;

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

  @Prop({ type: [String], default: [] })
  other_documents: string[];

  @Prop({ type: String, default: null })
  taxi_point_certificate: string;

  @Prop({ type: Number, default: 100 })
  rate: number;

  @Prop({ type: Number })
  tax_number: number;

  @Prop({ type: String })
  business_identify_code: string;

  @Prop({ type: Number })
  createdAt: number;

  @Prop({ type: Number })
  updatedAt: number;

  @Prop({ type: String, default: null })
  emergency_mobile: string;

  @Prop({ type: String, maxlength: 255, default: null })
  address: string;

  @Prop({ type: String, maxlength: 255, default: null })
  role: string;

  @Prop({
    type: [MongooseSchema.Types.ObjectId],
    ref: 'cars',
    default: [],
  })
  cars_id: Types.ObjectId[];

  @Prop({
    type: [MongooseSchema.Types.ObjectId],
    ref: 'CarOwnerChange',
    default: [],
  })
  carOwnerChanges_id: Types.ObjectId[];

  @Prop({
    type: [MongooseSchema.Types.ObjectId],
    ref: 'DriverChange',
    default: [],
  })
  driverChanges_id: Types.ObjectId[];

  @Prop({ type: String, maxlength: 255, default: null })
  ip: string;

  @Prop({ type: String, maxlength: 255, default: null })
  photo_url: string;

  @Prop({ type: String, maxlength: 500, default: null })
  description: string;

  @Prop({ type: Number, default: 0 })
  credit: number;

  @Prop({ type: MongooseSchema.Types.Mixed, default: null })
  location: object;

  @Prop({ type: Number, default: 100 })
  score: number;

  @Prop({ type: Number, default: null })
  cooperation_time: number;

  @Prop({ type: String, enum: ['yes', 'no'], default: 'no' })
  deleted: string;

  @Prop({ type: MongooseSchema.Types.Mixed, ref: 'users' })
  extraData: object;

  @Prop({ type: String, enum: ['yes', 'no'], default: 'no' })
  limited_user: string;

  @Prop({ type: String, default: null })
  fcmToken: string;

  @Prop({ type: String, default: 'v1' })
  tokenVersion: string;

  @Prop({ type: Number, default: null })
  lastLoginAt: number;

  @Prop({ type: Boolean, default: false })
  isModified: boolean;

  @Prop({ type: String, unique: true })
  ID: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'UserData' })
  userData_id: Types.ObjectId;

  @Prop({ type: String, enum: ['offline', 'online'], default: 'offline' })
  workStatus: string;

  @Prop({ type: Number, default: 100 })
  activity: number;

  @Prop({ type: Boolean, default: true })
  cash: boolean;

  @Prop({ type: Boolean, default: false })
  auto_accept_offers: boolean;

  @Prop({ type: Boolean, default: false })
  navigation_auto_start: boolean;

  @Prop({ type: Boolean, default: false })
  auto_arrived_complete_trip: boolean;

  @Prop({ type: Boolean, default: false })
  real_time_traffic: boolean;

  @Prop({ type: String, maxlength: 500, default: null })
  bio: string;

  @Prop({ type: [String], default: [] })
  languages: string[];

  @Prop({ type: Boolean, default: false })
  online: boolean;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'cars' })
  active_car: Types.ObjectId;

  @Prop({ type: Number, default: 0 })
  earning: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'users', default: null })
  fleet: Types.ObjectId;

  @Prop({ type: String, default: null })
  sessionid: string;

  @Prop({ type: Number, default: 2000 }) // 2 km
  radius: number;

  @Prop({ type: Number, default: 7 })
  payout: number;

}

export const DriverSchema = SchemaFactory.createForClass(Driver);
