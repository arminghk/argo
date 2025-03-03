import { Module } from '@nestjs/common';
import { PortalAuthService } from './portal.service';
import { PortalAuthController } from './controllers/portalAuth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PortalUser, PortalUserSchema } from './model/protalUser.schema';
@Module({
  imports:[
    MongooseModule.forFeature([
      { name: PortalUser.name, schema: PortalUserSchema },
    
    ]),
  ],
  controllers: [PortalAuthController],
  providers: [PortalAuthService],
})
export class PortalModule {}
