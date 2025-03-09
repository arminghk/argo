import { Module } from '@nestjs/common';
import { PortalAuthService } from './portal.service';
import { PortalAuthController } from './controllers/portalAuth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PortalUser, PortalUserSchema } from './model/protalUser.schema';
import { FleetModule } from '../fleet/fleet.module';

@Module({
  imports:[
    MongooseModule.forFeature([
      { name: PortalUser.name, schema: PortalUserSchema },
    
    ]),
    FleetModule
  ],
  controllers: [PortalAuthController],
  providers: [PortalAuthService],
})
export class PortalModule {}
