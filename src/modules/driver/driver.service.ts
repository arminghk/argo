import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { CreateCarDTO, RegisterDriverDto, SendCodeDto, UpdateDriverProfileDTO } from './dto/driver.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Driver } from './model/driver.schema';
import { Model } from 'mongoose';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import axios from 'axios';
import * as jwt from 'jsonwebtoken';
import { generateUniqueReferralCode } from './../../common/utils/generateUniqueReferralCode'
import { OAuth2Client } from 'google-auth-library';
import { Car } from './model/car.schema';
import { DriverAccessLog } from './model/driverAccessLog.schema';
@Injectable()
export class DriverService {
  constructor(
    @InjectModel(Driver.name) private driverModel: Model<Driver>,
    @InjectModel(Car.name) private carModel: Model<Car>,
    @InjectModel(DriverAccessLog.name) private driverAccessLog: Model<DriverAccessLog>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) { }

  async registerSendCode(dto: SendCodeDto) {
    const { mobile } = dto;
    const user = await this.driverModel.findOne({ mobile });
    let code = Math.floor(1000 + Math.random() * 9000);

    // const apiKey = process.env.SMS_OTP_API_KEY;
    // const secretKey = process.env.SMS_OTP_API_SECRET; 
    // const recipient = mobile;
    //const message = `Hi your Argo verification code is ${code}`;
    await this.cacheManager.set(mobile, code);
    console.log(await this.cacheManager.get(mobile));
    // if (mobile.includes('+98')) {
    //   const messageRes = await axios.post(
    //     'https://www.experttexting.com/ExptRestApi/sms/json/Message/Send',
    //     {
    //       username: 'Pikpalvelu',
    //       api_key: apiKey,
    //       api_secret: secretKey,
    //       from: 'DEFAULT',
    //       to: recipient,
    //       text: message
    //     }
    //   );
    // }
    return {
      message: 'code sent successfully',
      type: user ? 'login' : 'register',
    };

  }

  async registerWithMobileNumber(dto: RegisterDriverDto) {
    let { mobile, first_name, last_name, referral_code, code } = dto
    const user = await this.driverModel.findOne({ mobile });
    const ExistingCode = await this.cacheManager.get(mobile);
    if (!user?.account_information && user) {
      if (
        (!first_name || !last_name) &&
        (!user.first_name || !user.last_name)
      ) {
        return 'Invalid first name or last name'

      }
      if (referral_code) {
        const user = await this.checkReferralCode(referral_code);
        if (!user) {
          throw new Error('invalid referral code');
        }
      }
      await this.finddriverByIdAndUpdate(user?.id, dto);
    }
    if (ExistingCode != code) {
      return 'invalid code'
    }
    // await this.cacheManager.del(mobile);
    if (user) {
      const { token } = await this.driverGenToken(user);

      // const unpaidTrip = await findTrip({
      //   payment_status: PaymentStatus.unpaid,
      //   driver_id: user.id
      // });
      // if (unpaidTrip) {
      //   return ResponseHandler.success(
      //     res,
      //     { user, access_token: token, unpaid_trip: unpaidTrip },
      //     'user successfully logged in'
      //   );
      // }
      return {
        message: 'user successfully logged in',
        token
      }
    }
    dto.invitation_code = generateUniqueReferralCode();
    dto.ID = await this.gen_id();
    dto.deleted = 'no';
    dto.account_information = true;
    let response = await this.driverModel.create(dto)
    const { token } = await this.driverGenToken(response);
    return {
      user: response,
      access_token: token
    }




  }
  async gen_id(queryOption = {}): Promise<string> {

    let ID;
    const doc: any = await this.driverModel.findOne({}, null, {
      ...queryOption,
      sort: { _id: -1 }
    });
    if (!doc) {
      ID = 'M' + 1;
    } else {
      const number = Number(doc?.ID?.slice(1)) + 1;
      ID = 'M' + number;
    }
    return ID;

  }

  async driverGenToken(driver) {
    let token = jwt.sign({ _type: "driver" }, process.env.JWT_SECRET_KEY as string, {
      subject: driver!._id + "",
      expiresIn: '365d',
    });
    return { token };
  }
  async DriverVerify(token: string) {
    try {
      let decode = await jwt.verify(token, process.env.JWT_SECRET_KEY as string);
      let driver = await this.driverModel.findOne({ _id: decode.sub });
      if (!driver) {
        throw new HttpException('Your session has expired', HttpStatus.UNAUTHORIZED);
      }
      return { driver, decode };
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {

        throw new HttpException('Invalid token signature', HttpStatus.UNAUTHORIZED);
      }
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async checkReferralCode(referral_code: string) {
    return await this.driverModel.findOne({ invite_code: referral_code });
  }
  async finddriverByIdAndUpdate(userId, dto) {
    return await this.driverModel.findByIdAndUpdate(userId, dto);
  }

  // async googleAuthLink () {
  //   const redirectURL = process.env.GOOGLE_OAUTH_REDIRECT_URL;

  //   const oAuth2Client = new OAuth2Client(
  //     process.env.GOOGLE_CLIENT_ID,
  //     process.env.GOOGLE_CLIENT_SECRET,
  //     redirectURL
  //   );

  //   // Generate the url that will be used for the consent dialog.
  //   const authorizeUrl = oAuth2Client.generateAuthUrl({
  //     access_type: "offline",
  //     scope: "https://www.googleapis.com/auth/userinfo.profile  openid ",
  //     prompt: "consent",
  //   });

  //   return { url: authorizeUrl };
  // }

  // async googleOAuthHandler(req)  {
  //   const code = req.query.code;
  //   try {
  //     const redirectURL = process.env.GOOGLE_OAUTH_REDIRECT_URL;
  //     const oAuth2Client = new OAuth2Client(
  //       process.env.GOOGLE_CLIENT_ID,
  //       process.env.GOOGLE_CLIENT_SECRET,
  //       redirectURL
  //     );
  //     const request: any = await oAuth2Client.getToken(code as string);
  //     await oAuth2Client.setCredentials(request.tokens);
  //     const user = oAuth2Client.credentials;

  //     if (oAuth2Client.credentials.access_token) {
  //       await this.getUserData(oAuth2Client.credentials.access_token);
  //     }
  //   } catch (err) {
  //     throw new Error(err)
  //   }

  //   res.redirect(303, process.env.GOOGLE_CLIENT_REDIRECT_URL + "");
  // }

  // async getUserData(access_token: string) {
  //   const response = await fetch(
  //     `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
  //   );
  //   return await response.json();
  // }

  async enterDetails(body: UpdateDriverProfileDTO) {

    const user = await this.driverModel.findOne({ mobile: body.mobile });

    if (user?.account_information) {
      return "you cannot enter profile details multiple times"
    }
    if (await this.driverModel.findOne({ mobile: body.mobile })) {
      return "phone number already exist";
    }
    if (await this.driverModel.findOne({ email: body.email })) {
      return "email already exist";
    }
    if (body?.referral_code) {
      const user = await this.checkReferralCode(body.referral_code);
      if (!user) {
        return "invalid referral code"
      }
    }
    body.account_information = true;

    // const updatedUser = await this.driverModel.findOneAndUpdate(body.mobile, body);

    // if (updatedUser) {
    //   return ResponseHandler.success(
    //     res,
    //     updatedUser,
    //     "driver successfully updated"
    //   );
    // }
    // return  "driver not found"



  }

  async createCar(body: CreateCarDTO, req) {

    if (await this.carModel.findOne({ plate: body.plate, deleted: 'no' })) {
      return 'Car.Duplicate_Plaque'

    }
    if (await this.carModel.findOne({ vin: body.vin, deleted: 'no' })) {
      return 'car vin already exist'
    }

    body.ID = await this.gen_id();
    body.status = 'deactive';
    body.drivers = req.user.driver;

    const car = await this.carModel.create(body);


    let result = await this.driverModel.updateOne({ _id: req.user.driver[0]?._id }, { cars_id: car._id });
    const driver = await this.driverModel.findOne(req.user!._id);
    let driver_id_array = [...car.driver_id, driver!._id];
    await this.carModel.findOneAndUpdate(
      { _id: car._id },
      { driver_id: driver_id_array },
      { new: true }
    );
    // // Driver Access Log
    const d_log = {
      // value to create driver access log
      car_id: car!._id,
      driver_id: driver!._id,
      action: 'add'
    };
    await this.driverAccessLog.create(d_log);
    return 'Car.CREATED_WAITING'


  }
  async findMyCars(req) {
    const currentUser = req.user;
    const user = await this.driverModel.findById(currentUser.id);
    if (!user) {
      return "driver not found"
    }
    const cars = await this.carModel.find({ drivers: user._id });

    if (!cars) {
      return "car not found"
    }

    return {
      message: "cars found successfully",
      cars
    }
  }

  async chosePlate(req) {
    const currentUser = req.user;

    const user = await this.driverModel.findById(currentUser.id);
    if (!user) {
      return "driver not found"
    }
    const car = await this.carModel.findOne({ drivers: user }, {}, { populate: "drivers" });
    if (!car) {
      return "car not found, register new one"
    }
    const activeUser = await this.driverModel.findOne({ _id: car.active_driver });
    if (activeUser?._id.toString() === user._id.toString()) {
      return "this car already is chosen by you"
    }
    if (car.active_driver) {
      return "this car used by another driver"
    }
    const updatedCar = await this.carModel.findByIdAndUpdate(car._id, {
      active_driver: user._id,
    });

    return "chose plate successfully done"



  }
  async removePlate(req) {
    const currentUser = req.user;

    const user = await this.driverModel.findById(currentUser.id);
    if (!user) {
      return "driver not found"
    }
    const car = await this.carModel.findOne({ drivers: user }, {}, { populate: "drivers" });
    if (!car) {
      return "car not found, register new one"
    }

    if (!car.active_driver) {
      return "this car not used by anyone"
    }

    const activeUser = await this.driverModel.findOne({ _id: car.active_driver });

    if (activeUser?._id.toString() !== user._id.toString()) {
      return "this car already is not chosen by you"

    }

    const updatedCar = await this.carModel.findOneAndUpdate(car._id, {
      active_driver: null,
    });
    return "remove chose plate successfully done"



  }

}
