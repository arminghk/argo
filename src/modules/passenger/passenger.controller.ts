import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PassengerService } from './passenger.service';
import { SendCodeDto } from './dto/passenger.dto';


@Controller('passenger')
export class PassengerController {
  constructor(private readonly passengerService: PassengerService) {}


  @Post()
  registerWithMobileNumber(@Body() SendCodeDto: SendCodeDto) {
    return this.passengerService.sendCode(SendCodeDto);
  }

}
