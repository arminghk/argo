import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { DriverService } from './../driver.service';
import { DriverAuthGuard } from '../guard/driver.guard';
import { CreateCarDTO, UpdateDriverProfileDTO } from '../dto/driver.dto';


@UseGuards(DriverAuthGuard)
@Controller('driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) { }


  @Post('/enter-details')
  enterDetails(@Body() body: UpdateDriverProfileDTO) {
    return this.driverService.enterDetails(body)
  }


  @Post('/create-car')
  createCar(@Body() body: CreateCarDTO, @Request() req: Request) {
    return this.driverService.createCar(body, req)
  }

  @Get('/available-cars')
  findMyCars(@Request() req: Request) {
    return this.driverService.findMyCars(req)
  }
  @Get('/chose-plate')
  chosePlate(@Request() req: Request) {
    return this.driverService.chosePlate(req)
  }
  @Get('/remove-plate')
  removePlate(@Request() req: Request) {
    return this.driverService.removePlate(req)
  }



}
