import { Module } from '@nestjs/common';
import { CustomConfigModule } from './modules/config/config.module';
import { PassengerModule } from './modules/passenger/passenger.module';

import { MongooseModule } from '@nestjs/mongoose';
import { databaseConfig } from './database/database.config';
import mongoose from 'mongoose';


@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async () => {
        const uri = databaseConfig.uri;
        try {
          const connection = await mongoose.connect(uri);
          console.log('Connected to MongoDB');
        } catch (error) {
          console.error('Error connecting to MongoDB', error);
        }
        return { uri };
      },
    }),
    CustomConfigModule,
    PassengerModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule { }
