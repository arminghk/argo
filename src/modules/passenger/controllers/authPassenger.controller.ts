import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PassengerService } from './../passenger.service';
import { SendCodeDto,RegisterPassengerDto } from './../dto/passenger.dto';


@Controller('passenger')
export class AuthPassengerController {
  constructor(private readonly passengerService: PassengerService) {}

  @Post('/send-code')
  registerSendCode(@Body() mobile: SendCodeDto) {
    return this.passengerService.registerSendCode(mobile);
  }
  
  
  @Post('/register')
  registerWithMobileNumber(@Body() body: RegisterPassengerDto) {
    return this.passengerService.registerWithMobileNumber(body);
  }
  

}
