// const _ = require('lodash');
import { InjectModel } from "@nestjs/mongoose";
import * as jwt from "jsonwebtoken";
import { Model } from "mongoose";
import { Passenger } from "src/modules/passenger/model/passenger.schema";



export default class AuthHandler {
  constructor(
    @InjectModel(Passenger.name) private passengerModel: Model<Passenger>,

  ) { }
  static userKey: string =
    "User" + (process.env.USER_APP_KEY || "secret") + "Lorem User";
  static passengerKey: string =
    "Passenger" +
    (process.env.PASSENGER_APP_KEY || "secret") +
    "Lorem Passenger";
  static driverKey: string =
    "Driver" + (process.env.DRIVER_APP_KEY || "secret") + "Lorem Driver";
  static fleetKey: string =
    "Fleet" + (process.env.DRIVER_APP_KEY || "secret") + "Lorem Fleet";

  // static async PassengerGen(passenger, type = "passenger") {
  //   try {
  //     let token = jwt.sign({ _type: "passenger" }, this.passengerKey, {
  //       subject: passenger!._id + "",
  //       expiresIn: '365d',
  //     });
  //     return { token };
  //   } catch (error) {
  //     throw error;
  //   }
  // }
  // static async DriverGen(driver, type = "driver") {
  //   try {
  //     let token = jwt.sign({ _type: "driver" }, this.driverKey, {
  //       subject: driver!._id + "",
  //       expiresIn: '365d',
  //     });
  //     return { token };
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  static async UserGen(user, type = "user") {
    try {
      let token = jwt.sign({ _type: "user" }, this.userKey, {
        subject: user!._id + "",
        expiresIn: '365d',
      });
      return { token };
    } catch (error) {
      throw error;
    }
  }
  // static async FleetGen(fleet, type = "Fleet") {
  //   try {
  //     let token = jwt.sign({ _type: "fleet" }, this.fleetKey, {
  //       subject: fleet!._id + "",
  //       expiresIn: '365d',
  //     });
  //     return { token };
  //   } catch (error) {
  //     throw error;
  //   }
  // }
  // static async PassengerVerify(token: string) {
  //   try {
  //     let decode = await jwt.verify(token, this.passengerKey);
  //     let passenger = await this.passengerModel({ _id: decode.sub });
  //     if (!passenger) {
  //       let err = new ErrorHandler(
  //         "your session has expired",
  //         401,
  //         "Session_Expired"
  //       );
  //       throw err;
  //     }
  //     return { passenger, decode };
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  // static async driverVerify(token: string) {
  //   try {
  //     let decode = await jwt.verify(token, this.driverKey);
  //     let driver = await findDriver({ _id: decode.sub });
  //     if (!driver) {
  //       let err = new ErrorHandler(
  //         "your session has expired",
  //         401,
  //         "Session_Expired"
  //       );
  //       throw err;
  //     }
  //     return { driver, decode };
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  // static async userVerify(token: string) {
  //   try {
  //     let decode = await jwt.verify(token, this.userKey);
  //     let user = await findUser({ _id: decode.sub });
  //     if (!user) {
  //       let err = new ErrorHandler(
  //         "your session has expired",
  //         401,
  //         "Session_Expired"
  //       );
  //       throw err;
  //     }
  //     return { user, decode };
  //   } catch (error) {
  //     throw error;
  //   }
  // }
}
