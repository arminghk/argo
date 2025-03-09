import { Module } from '@nestjs/common';
import { FleetService } from './fleet.services';
import { FleetController } from './controllers/fleet.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Fleet, FleetSchema } from './model/fleet.schema';
import { FleetAuthController } from './controllers/fleetAuth.controller';

@Module({
 imports: [
    MongooseModule.forFeature([
      { name: Fleet.name, schema: FleetSchema }
    ]),
  ],
  controllers: [FleetController,FleetAuthController],
  providers: [FleetService],
  exports: [MongooseModule] 
})
export class FleetModule {}
