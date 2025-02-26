import { Module } from '@nestjs/common';
import { PassengerService } from './passenger.service';
import { AuthPassengerController } from './controllers/authPassenger.controller';
import {  } from './controllers/authPassenger.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Passenger, PassengerSchema } from './model/passenger.schema';
import { PassengerWorkProfile, PassengerWorkProfileSchema } from './model/passengerWorkProfile.schema';
import { CacheModule } from '@nestjs/cache-manager';
import { PassengerController } from './controllers/passenger.controller';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Passenger.name, schema: PassengerSchema },
      { name: PassengerWorkProfile.name, schema: PassengerWorkProfileSchema }
    ]),
    CacheModule.register(),
  ],
  controllers: [AuthPassengerController,PassengerController],
  providers: [PassengerService],
})
export class PassengerModule { }
