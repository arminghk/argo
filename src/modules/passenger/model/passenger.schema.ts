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

  // @Prop({ maxlength: 255, match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, default: null })
  // email: string;

  // @Prop({ type: Date })
  // birthday: Date;

  @Prop({ trim: true })
  referral_code: string;

  // @Prop({ trim: true })
  // invite_code: string;

  // @Prop({ default: false })
  // isProfileComplete: boolean;

  // @Prop({ default: 0 })
  // referral_count: number;

  // @Prop({ enum: ['active', 'deactive'], default: 'active' })
  // status: string;

  // @Prop({ maxlength: 255, default: null })
  // nationalId: string;

  // @Prop({ default: 0 })
  // credit: number;

  // @Prop({ default: 0 })
  // deposit_credit: number;

  // @Prop()
  // invitation_code: string;

  // @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Passenger', default: null })
  // invitedBy: Types.ObjectId | Passenger;

  // @Prop({ type: Date, default: null })
  // first_trip_date: Date;

  // @Prop({ default: false })
  // receive_order_receipt_email: boolean;

  // @Prop({ default: 0 })
  // income: number;

  // @Prop({ default: false })
  // deleted: boolean;

  // @Prop({ type: Date, default: null })
  // lastLoginAt: Date;

  // @Prop({ type: Object, maxlength: 255, default: null })
  // location: any;

  // @Prop({ type: Date, default: null })
  // locationUpdatedAt: Date;

  // @Prop({
  //   type: {
  //     creator_person_id: { type: MongooseSchema.Types.ObjectId, ref: 'users' },
  //     updater_person_id: { type: MongooseSchema.Types.ObjectId, ref: 'users' },
  //     remover_person_id: { type: MongooseSchema.Types.ObjectId, ref: 'users' },
  //     status_change_date: { type: Date },
  //     deletedAt: { type: Date },
  //   },
  // })
  // extraData: {
  //   creator_person_id: Types.ObjectId | IUser;
  //   updater_person_id: Types.ObjectId | IUser;
  //   remover_person_id: Types.ObjectId | IUser;
  //   status_change_date: Date;
  //   deletedAt: Date;
  // };

  // @Prop({ default: null })
  // fcmToken: string;

  // @Prop({
  //   type: MongooseSchema.Types.ObjectId,
  //   ref: 'passenger_work_profile',
  // })
  // work_profile: Types.ObjectId | IPassengerWorkProfile;

  // @Prop({
  //   type: {
  //     display_traffic: { type: Boolean, default: true },
  //     call_me: { type: Boolean, default: true },
  //     share_location: { type: Boolean, default: true },
  //     notifications: {
  //       type: String,
  //       enum: ['promotions', 'newFeatures', 'all', 'trip'],
  //       default: 'all',
  //     },
  //     clear_map_cache: { type: Boolean, default: false },
  //   },
  // })
  // passengerSettings: any;

  // @Prop({ default: null })
  // stripeCustomerId: string;

  // @Prop({ default: null })
  // google_token: string;

  // @Prop({ default: null })
  // apple_token: string;
}

export const PassengerSchema = SchemaFactory.createForClass(Passenger);


