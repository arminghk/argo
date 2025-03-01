import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';
enum AppLockEnum {
  none = 'none',
  end_current_trip = 'end_current_trip'
}

export type CarDocument = HydratedDocument<Car>;

@Schema({ timestamps: true, collection: 'cars' })
export class Car {
  @Prop({ type: String, required: true })
  car_brand: string;

  @Prop({ type: String, required: true })
  car_model: string;

  @Prop({ type: String, required: true })
  plate: string;

  @Prop({ type: String, required: true })
  year: string;

  @Prop({ type: String, required: true })
  color: string;

  @Prop({ type: String, required: true })
  vin: string;

  @Prop({ type: String, required: true })
  iban: string;

  @Prop({
    type: String,
    enum: ['active', 'deactive'],
    default: 'deactive',
  })
  status: string;

  @Prop({
    type: {
      front: String,
      back: String,
      left: String,
      right: String,
      inside: String,
    },
    default: { front: '', back: '', left: '', right: '', inside: '' },
  })
  car_pictures: {
    front: string;
    back: string;
    left: string;
    right: string;
    inside: string;
  };

  @Prop({ type: String, required: true })
  taxi_transport_license: string;

  @Prop({ type: String, required: true })
  vehicle_registration_certificate_front: string;

  @Prop({ type: String, required: true })
  vehicle_registration_certificate_back: string;

  @Prop({ type: [String], default: [] })
  other_documents: string[];

  @Prop({ type: Boolean, default: false })
  is_owner: boolean;

  @Prop({ type: String, default: null })
  description: string;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'drivers' }] })
  drivers: Types.ObjectId[];

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'services' }] })
  services: Types.ObjectId[];

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'services' }] })
  active_services: Types.ObjectId[];

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'users' })
  fleet: Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'drivers' })
  active_driver: Types.ObjectId;

  @Prop({ type: String, maxlength: 255, default: null })
  ID: string;

  @Prop({ type: String, trim: true, maxlength: 255, default: null })
  username: string;

  @Prop({ type: String, trim: true, maxlength: 255, default: null })
  password: string;

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'CarChange' }],
    default: [],
  })
  carChanges_id: Types.ObjectId[];

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'drivers' }],
    default: [],
  })
  driver_id: Types.ObjectId[];

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'users', default: null })
  carOwner_id: Types.ObjectId;

  @Prop({ type: String, default: null })
  car_phone: string;

  @Prop({ type: MongooseSchema.Types.Mixed, default: null })
  plaque: any;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'services', default: null })
  service_id: Types.ObjectId;

  @Prop({ type: String, maxlength: 50, default: null })
  car_color: string;

  @Prop({ type: String, maxlength: 255, default: null })
  IBAN: string;

  @Prop({ type: String, maxlength: 255, default: null })
  chassis_number: string;

  @Prop({ type: String, default: null })
  year_construction: string;

  @Prop({
    type: String,
    enum: ['myself', 'other'],
    required: true,
  })
  car_operator: string;

  @Prop({ type: Number, default: null })
  commission: number;

  @Prop({ type: Number, default: 10 })
  score: number;

  @Prop({ type: Number, default: 100 })
  average_score: number;

  @Prop({ type: String, maxlength: 50, default: null })
  rating: string;

  @Prop({ type: Number, default: 0 })
  credit: number;

  @Prop({ type: MongooseSchema.Types.Mixed, default: null })
  car_card_url: any;

  @Prop({ type: MongooseSchema.Types.Mixed, default: null })
  car_url: any;

  @Prop({ type: MongooseSchema.Types.Mixed, default: null })
  documents_url: any;

  @Prop({ type: String, maxlength: 255, default: null })
  location: string;

  @Prop({ type: Number, default: null })
  locationUpdatedAt: number;

  @Prop({
    type: {
      model: { type: String, default: null },
      ip: { type: String, default: null },
    },
    default: { model: null, ip: null },
  })
  phoneData: {
    model: string;
    ip: string;
  };

  @Prop({ type: String, maxlength: 50, default: null })
  car_status: string;

  @Prop({ type: String, enum: ['yes', 'no'], default: 'no' })
  deleted: string;

  @Prop({ type: Number, default: null })
  lastLoginAt: number;

  @Prop({ type: String, default: null })
  fcmToken: string;

  @Prop({ type: MongooseSchema.Types.Mixed, ref: 'users', default: null })
  extraData: any;

  @Prop({ type: String, default: null })
  sessionid: string;

  @Prop({
    type: String,
    enum: AppLockEnum,
    default: AppLockEnum.none,
  })
  app_lock: string;

  @Prop({ type: Number, default: 0 })
  baby_seat: number;

  @Prop({ type: Number, default: 0 })
  luggage: number;

  @Prop({ type: Boolean, default: true })
  pet: boolean;

  @Prop({ type: Number, default: Date.now() })
  createdAt: number;

  @Prop({ type: Number, default: Date.now() })
  updatedAt: number;
}

export const CarSchema = SchemaFactory.createForClass(Car);
