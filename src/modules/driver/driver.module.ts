import { Module } from '@nestjs/common';
import { DriverService } from './driver.service';
import { AuthDriverController } from './controllers/authDriver.controller';
import { DriverController } from './controllers/driver.controller';
import { CacheModule } from '@nestjs/cache-manager';
import { MongooseModule } from '@nestjs/mongoose';
import { Driver, DriverSchema } from './model/driver.schema';
import { Car, CarSchema } from './model/car.schema';
import { DriverAccessLog, DriverAccessLogSchema } from './model/driverAccessLog.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Driver.name, schema: DriverSchema },
      { name: Car.name, schema: CarSchema },
      { name: DriverAccessLog.name, schema: DriverAccessLogSchema },
    ]),
    CacheModule.register(),
  ],
  controllers: [AuthDriverController,DriverController],
  providers: [DriverService],
})
export class DriverModule { }
