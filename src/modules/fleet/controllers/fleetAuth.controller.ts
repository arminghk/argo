import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FleetService } from '../fleet.services';


@Controller('fleet')
export class FleetController {
  constructor(private readonly fleetService: FleetService) {}

  @Post('/register')
  register(@Body() createFleetDto) {
    return this.fleetService.register(createFleetDto);
  }

//   @Post('/login')
//   login(@Body() createFleetDto) {
//     return this.fleetService.login(createFleetDto);
//   }

}
