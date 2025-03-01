import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';



export enum ActionEnum {
  add = 'add',
  remove = 'remove',
}

export enum Status_ {
  active = 'active',
  deactive = 'deactive',
}

export enum YesNo_ {
  yes = 'yes',
  no = 'no',
}

@Schema({ timestamps: true, collection: 'DriverAccessLogs' })
export class DriverAccessLog {
  @Prop({ type: String, maxlength: 255, default: null })
  ID: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'cars',
    required: true,
  })
  car_id: Types.ObjectId ;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'users',
    default: null,
  })
  user_id: Types.ObjectId;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'drivers',
    required: true,
  })
  driver_id: Types.ObjectId ;

  @Prop({
    type: String,
    enum: ['add', 'remove'],
    required: true,
  })
  action: ActionEnum;

  @Prop({
    type: String,
    enum: ['active', 'deactive'],
    default: 'active',
  })
  status: Status_;

  @Prop({
    type: String,
    enum: ['yes', 'no'],
    default: 'no',
  })
  deleted: YesNo_;

  @Prop({ type: Number, default: Date.now })
  createdAt: number;

  @Prop({ type: Number, default: Date.now })
  updatedAt: number;
}

export const DriverAccessLogSchema = SchemaFactory.createForClass(DriverAccessLog);
export type DriverAccessLogDocument = HydratedDocument<DriverAccessLog>;
