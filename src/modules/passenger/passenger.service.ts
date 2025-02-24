import { Injectable } from '@nestjs/common';
import { SendCodeDto } from './dto/passenger.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Passenger } from './model/passenger.schema';
import { Model } from 'mongoose';


@Injectable()
export class PassengerService {
  constructor(@InjectModel(Passenger.name) private catModel: Model<Passenger>) {}
  
  sendCode(SendCodeDto: SendCodeDto) {
    return 'This action adds a new passenger';
  }

}
