import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';


export type PassengerDocument = HydratedDocument<Passenger>;

@Schema({ timestamps: true, collection: 'Passenger' })
export class Passenger {
  @Prop({ trim: true, maxlength: 255, default: null })
  first_name: string;

  @Prop({ trim: true, maxlength: 255, default: null })
  last_name: string;

  @Prop({ default: null })
  mobile: string;

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
  birthday: Date;

  @Prop({ trim: true })
  referral_code: string;

  @Prop({ trim: true })
  invite_code: string;

  @Prop({ type: Boolean, default: false })
  account_information: boolean;

  // @Prop({ type: Number, default: 0 })
  // referral_count: number;

  // @Prop({ type: String, enum: ['active', 'deactive'], default: 'active' })
  // status: string;

  @Prop({ maxlength: 255, default: null })
  ID: string;

  // @Prop({ type: Number, default: 0 })
  // credit: number;

  // @Prop({ type: Number, default: 0 })
  // deposit_credit: number;

  @Prop({ type: String })
  invitation_code: string;

  // @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Passenger', default: null })
  // invitedBy: MongooseSchema.Types.ObjectId;

  // @Prop({ type: Number, default: null })
  // first_trip_date: number;

  // @Prop({ type: String, enum: ['active', 'deactive'], default: 'deactive' })
  // receive_order_receipt_email: string;

  // @Prop({ type: Number, default: 0 })
  // income: number;

  @Prop({ type: String, enum: ['yes', 'no'], default: 'no' })
  deleted: string;

  // @Prop({ type: Number, default: null })
  // lastLoginAt: number;

  // @Prop({ type: Object, maxlength: 255, default: null })
  // location: object;

  // @Prop({ type: Number, default: null })
  // locationUpdatedAt: number;

  // @Prop({
  //   type: Object,
  //   default: { model: null, ip: null },
  // })
  // phoneData: {
  //   model: string;
  //   ip: string;
  // };

  // @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'passenger_work_profile' })
  // work_profile: MongooseSchema.Types.ObjectId;

  // @Prop({ type: MongooseSchema.Types.Mixed, ref: 'users' })
  // extraData: MongooseSchema.Types.Mixed;

  // @Prop({ type: String, default: null })
  // fcmToken: string;

  // @Prop({ type: Number })
  // createdAt: number;

  // @Prop({ type: Number })
  // updatedAt: number;

  // @Prop({
  //   type: Object,
  //   default: {
  //     display_traffic: true,
  //     call_me: true,
  //     share_location: true,
  //     notifications: 'all',
  //     clear_map_cache: false,
  //   },
  // })
  // passengerSettings: {
  //   display_traffic: boolean;
  //   call_me: boolean;
  //   share_location: boolean;
  //   notifications: string;
  //   clear_map_cache: boolean;
  // };

  // @Prop({ type: String, default: null })
  // stripeCustomerId: string;

  // @Prop({ type: String, default: null })
  // google_token: string;

  // @Prop({ type: String, default: null })
  // apple_token: string;


}

export const PassengerSchema = SchemaFactory.createForClass(Passenger);


