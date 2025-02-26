import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { DriverService } from './../driver.service';
import { DriverAuthGuard } from '../guard/driver.guard';


@UseGuards(DriverAuthGuard)
@Controller('driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}


  @Get('/test')
  test() {
    return 'this is test'
  }
  
  
  
}
