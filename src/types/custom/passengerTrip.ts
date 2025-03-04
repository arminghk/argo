import { Types } from 'mongoose';
// import { ITrip } from '../../database/models/trip';

// import { IStopTime } from '../../database/models/StopTime';
// import { PassengerTripTypeEnum, IPassengerTrip } from '../../database/models/PassengerTrip';

export type RedisDataType = {
  time: number;
  expireAt: number;
  chosen_services: any;
  trip_parameters: {
    tripTime: {
      from: number;
      to: number;
    };
    tripDuration: {
      first_calculate: number;
      final_calculate: number | null;
      final_deducted_driver_stopTimes: number | null;
    };
    sourceLocation: Location_;
    destinationLocation: Location_;
    // stopTime: IStopTime;
    // extraData: IPassengerTrip['extraData'];
    max_service_finalPrice?: number;
    price: number;
    priceWithTax: number;
    totalPrice: number;
    tripDistance: number;
    pricesInServices?: any[];
  };
  // trip: ITrip;
};
