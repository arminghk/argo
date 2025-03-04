import express, { Application, Request, Response, NextFunction } from 'express';
import { IUser } from '../database/models/user';
import { IPassenger } from '../database/models/Passenger';
import { ICar } from '../database/models/Car';

declare global {
  namespace Express {
    interface Request {
      car?: ICar;
      user?: IUser;
      passenger?: IPassenger;
    }
    interface Response {
      t(text1: string, text2?: object): string;
    }
  }
}
