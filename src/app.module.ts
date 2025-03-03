import { Module } from '@nestjs/common';
import { CustomConfigModule } from './modules/config/config.module';
import { PassengerModule } from './modules/passenger/passenger.module';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-ioredis';
import { MongooseModule } from '@nestjs/mongoose';
import { databaseConfig } from './database/database.config';
import mongoose from 'mongoose';
import { ThrottlerModule,ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { DriverModule } from './modules/driver/driver.module';
import { CommonModule } from './modules/common/common.module';
import { PortalModule } from './modules/portal/portal.module';



@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async () => ({ uri: databaseConfig.uri }),
    }),
    CacheModule.register({
      store: redisStore, 
      host: 'localhost',
      port: 6379, 
      ttl: 60 * 5, 
    }),
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 10,
    }]),
    CustomConfigModule,
    PassengerModule,
    DriverModule,
    CommonModule,
    PortalModule,
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
