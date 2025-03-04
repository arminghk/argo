import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FleetService } from '../fleet.services';


@Controller('fleet')
export class FleetController {
  constructor(private readonly fleetService: FleetService) {}

  // @Post()
  // create(@Body() createFleetDto) {
  //   return this.fleetService.create(createFleetDto);
  // }

 
}
