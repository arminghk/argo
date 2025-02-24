import { Module } from '@nestjs/common';
import { PassengerService } from './passenger.service';
import { PassengerController } from './passenger.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Passenger, PassengerSchema } from './model/passenger.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Passenger.name, schema: PassengerSchema }])],
  controllers: [PassengerController],
  providers: [PassengerService],
})
export class PassengerModule {}
