import { Module } from '@nestjs/common';
import { CustomConfigModule } from './modules/config/config.module';
import { PassengerModule } from './modules/passenger/passenger.module';



@Module({
  imports: [CustomConfigModule, PassengerModule],
  controllers: [],
  providers: [],
})

export class AppModule {}
