import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { DriverService } from './../driver.service';
import { DriverAuthGuard } from '../guard/driver.guard';
import { UpdateDriverProfileDTO } from '../dto/driver.dto';


@UseGuards(DriverAuthGuard)
@Controller('driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}


  @Post('/enter-details')
  enterDetails(@Body() body:UpdateDriverProfileDTO) {
    return this.driverService.enterDetails(body)
  }
  
  
  
}
