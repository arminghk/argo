import { Controller, Get, Post, Body, Patch, Param, Delete ,Req } from '@nestjs/common';
import { DriverService } from './../driver.service';
import { SendCodeDto,RegisterDriverDto } from '../dto/driver.dto';
import { Request } from 'express';

@Controller('driver')
export class AuthDriverController {
  constructor(private readonly driverService: DriverService) {}

  @Post('/send-code')
  registerSendCode(@Body() mobile: SendCodeDto) {
    return this.driverService.registerSendCode(mobile);
  }
  
  
  @Post('/register')
  registerWithMobileNumber(@Body() body: RegisterDriverDto) {
    return this.driverService.registerWithMobileNumber(body);
  }

  // @Post('/request-google-auth')
  // googleAuthLink() {
  //   return this.passengerService.googleAuthLink();
  // }
  // @Get('/oauth')
  // googleOAuthHandler(@Req() request: Request) {
  //   return this.passengerService.googleOAuthHandler(request);
  // }
  
  

}
