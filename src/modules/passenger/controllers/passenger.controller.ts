import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PassengerService } from './../passenger.service';
import { PassengerAuthGuard } from '../guard/passenger.guard';


@UseGuards(PassengerAuthGuard)
@Controller('passenger')
export class PassengerController {
  constructor(private readonly passengerService: PassengerService) {}


  @Get('/test')
  test() {
    return 'this is test'
  }
  
  
  
}
