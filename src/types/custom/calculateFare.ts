import { Types } from 'mongoose';
import { Request, Response } from 'express';

export type CalculateFareEndTripInput = {
  // res: Response,
  passengerTrip: Types.ObjectId;
  session?: any
};

export interface INeshanApiMatrix {
  elements: {
    status: string;
    duration: {
      value: number;
      text: string;
    };
    distance: { value: number; text: string };
  }[];
}
