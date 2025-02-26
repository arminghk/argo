import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { RegisterPassengerDto, SendCodeDto } from './dto/passenger.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Passenger } from './model/passenger.schema';
import { PassengerWorkProfile } from './model/passengerWorkProfile.schema';
import { Model } from 'mongoose';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import axios from 'axios';
import * as jwt from 'jsonwebtoken';
import { generateUniqueReferralCode } from './../../common/utils/generateUniqueReferralCode'

@Injectable()
export class PassengerService {
  constructor(
    @InjectModel(Passenger.name) private passengerModel: Model<Passenger>,
    @InjectModel(PassengerWorkProfile.name) private passengerWorkProfileModel: Model<PassengerWorkProfile>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) { }

  async registerSendCode(dto: SendCodeDto) {
    const { mobile } = dto;
    const user = await this.passengerModel.findOne({ mobile });
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

  async registerWithMobileNumber(dto: RegisterPassengerDto) {
    let { mobile, first_name, last_name, referral_code, code } = dto
    const user = await this.passengerModel.findOne({ mobile });
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
      await this.findPassengerByIdAndUpdate(user?.id, dto);
    }
    if (ExistingCode != code) {
      return 'invalid code'
    }
    // await this.cacheManager.del(mobile);
    if (user) {
      const { token } = await this.passengerGenToken(user);

      // const unpaidTrip = await findTrip({
      //   payment_status: PaymentStatus.unpaid,
      //   passenger_id: user.id
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
    let response = await this.passengerModel.create(dto)
    dto.passenger_id = response._id
    await this.passengerWorkProfileModel.create(dto);
    const { token } = await this.passengerGenToken(response);

    return {
      user: response,
      access_token: token
    }




  }
  async gen_id(queryOption = {}): Promise<string> {

    let ID;
    const doc: any = await this.passengerModel.findOne({}, null, {
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

  async passengerGenToken(passenger) {
    let token = jwt.sign({ _type: "passenger" },process.env.JWT_SECRET_KEY as string, {
      subject: passenger!._id + "",
      expiresIn: '365d',
    });
    return { token };
  }
  async PassengerVerify(token: string) {
    try {
      let decode = await jwt.verify(token, process.env.JWT_SECRET_KEY as string);
      console.log('decode----->', decode);
      let passenger = await this.passengerModel.find({ _id: decode.sub });
      if (!passenger) {
        throw new HttpException('Your session has expired', HttpStatus.UNAUTHORIZED);
      }
      return { passenger, decode };
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {

        throw new HttpException('Invalid token signature', HttpStatus.UNAUTHORIZED);
      }
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async checkReferralCode(referral_code: string) {
    return await this.passengerModel.findOne({ invite_code: referral_code });
  }
  async findPassengerByIdAndUpdate(userId, dto) {
    return await this.passengerModel.findByIdAndUpdate(userId, dto);
  }
}
