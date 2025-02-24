import { Module } from '@nestjs/common';
import { CustomConfigModule } from './modules/config/config.module';
import { PassengerModule } from './modules/passenger/passenger.module';

import { MongooseModule } from '@nestjs/mongoose';
import { databaseConfig } from './database/database.config';
import mongoose from 'mongoose';
import { ThrottlerModule,ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';


@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async () => ({ uri: databaseConfig.uri }),
    }),
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 10,
    }]),
    CustomConfigModule,
    PassengerModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})

export class AppModule { }
