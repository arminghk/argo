import * as bcrypt from 'bcrypt';

import _ from 'lodash';
import mongoose, { Types } from 'mongoose';
// import { IUser } from '../database/models/user';
// import { StaticRoleEnum } from '../types/custom/enum';
// import { findDriverTrip } from '../services/driverTrip';
// import { findCar } from '../services/driver';
// import DriverTrip from '../database/models/DriverTrip';
// import { IComment } from '../database/models/Comment';
// import { ILog, DataModel as LogDataModel } from '../database/models/log';
// import { findUserById } from '../services/user';
// import { findComment } from '../services/comment';
// import { findLog } from '../services/log';
// import { rbac } from './auth';
// import { isValidPhoneNumber } from 'libphonenumber-js';
// import { findSetting } from '../services/setting';
// import { findCommission } from '../services/commission';
// import { findService } from '../services/service';
interface AnyObject {
  [key: string]: any;
}
export const helpers = {
  // JOI: (type: 'mobile' | 'national_code' | 'phone' | 'password') => {
  //   let validator;
  //   if (type === 'mobile') {
  //     validator = (value: string, helpers: any) => {
  //       const isValid = isValidPhoneNumber(value);
  //       if (!isValid) return helpers.error('any.invalid');
  //       return value;
  //     };
  //   }

  //   if (type === 'phone') {
  //     validator = (value: string, helpers: any) => {
  //       const firstDigit = value[0];
  //       if (firstDigit !== '0') return helpers.error('any.invalid');
  //       return value;
  //     };
  //   }

  //   if (type === 'password') {
  //     validator = (value: string, helpers: any) => {
  //       if (value.length < 8) return helpers.error('any.badPassword');
  //       // Check if the password contains at least one alphabetical character
  //       if (!/[a-zA-Z]/.test(value)) return helpers.error('any.badPassword');
  //       return value;
  //     };
  //   }

  //   if (type === 'national_code') {
  //     function checkNationalCode(code: string) {
  //       let L = code.length;
  //       if (L < 8 || parseInt(code, 10) == 0) return false;
  //       code = ('0000' + code).substr(L + 4 - 10);
  //       if (parseInt(code.substr(3, 6), 10) == 0) return false;
  //       let c = parseInt(code.substr(9, 1), 10);
  //       let s = 0;
  //       for (var i = 0; i < 9; i++)
  //         s += parseInt(code.substr(i, 1), 10) * (10 - i);
  //       s = s % 11;
  //       return (s < 2 && c == s) || (s >= 2 && c == 11 - s);
  //       return true;
  //     }
  //     validator = (value: string, helpers: any) => {
  //       const result = checkNationalCode(value);
  //       if (result === false) return helpers.error('any.invalid');
  //       if (
  //         value === '0000000000' ||
  //         value === '1111111111' ||
  //         value === '2222222222' ||
  //         value === '3333333333' ||
  //         value === '4444444444' ||
  //         value === '5555555555' ||
  //         value === '6666666666' ||
  //         value === '7777777777' ||
  //         value === '8888888888' ||
  //         value === '9999999999'
  //       )
  //         return helpers.error('any.invalid');
  //       return value;
  //     };
  //   }

  //   return validator;
  // },
  Hash: async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  },
  Compare: async (password: string, Hash: string): Promise<boolean> => {
    return await bcrypt.compare(password, Hash);
  },
  // JSON: <T1>(data: object): T1 => {
  //   return JSON.parse(JSON.stringify(data));
  // },
  // Date: (fromDate: any, toDate: any): { from: number; to: number } => {
  //   const from = new Date(fromDate);
  //   const to = new Date(toDate);
  //   from.setSeconds(0);
  //   from.setMinutes(0);
  //   from.setHours(0);
  //   to.setSeconds(59);
  //   to.setMinutes(59);
  //   to.setHours(23);
  //   const date = {
  //     from: new Date(from).getTime(),
  //     to: new Date(to).getTime()
  //   };
  //   return date;
  // },
  // DateToUnix: (fromDate: Date, toDate: Date) => {
  //   const from = new Date(fromDate);
  //   const to = new Date(toDate);
  //   from.setSeconds(0);
  //   from.setMinutes(0);
  //   from.setHours(0);
  //   to.setSeconds(59);
  //   to.setMinutes(59);
  //   to.setHours(23);
  //   return {
  //     from: Math.floor(new Date(from).getTime()),
  //     to: Math.floor(new Date(to).getTime())
  //   };
  // },
  // DateToUnixEqual: (fromDate: Date, toDate: Date) => {
  //   const from = new Date(new Date(fromDate).getTime());
  //   const to = new Date(new Date(toDate).getTime());
  //   return {
  //     from: Math.floor(from.getTime() / 1000),
  //     to: Math.floor(to.getTime() / 1000)
  //   };
  // },
  // DateToUnixEqualOneParameter: (fromDate: Date) => {
  //   const from = new Date(new Date(fromDate).getTime());
  //   return Math.floor(from.getTime() / 1000);
  // },
  // DateToUnixEqualCheckWithNow: (fromDate: number) => {
  //   const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
  //   const difference = Math.abs(currentTime - fromDate);

  //   return difference <= 1800;
  // },
  // NullObj: (obj: any) => {
  //   Object.keys(obj).forEach((key: any) => {
  //     if (obj[key] == null) {
  //       delete obj[key];
  //     }
  //   });
  // },
  // //* Convert Aggregate Result to Intended Format
  // Aggr_Data: (result: any): ListResult_ => {
  //   let data: ListResult_;
  //   if (result[0].totalCount[0]) {
  //     data = {
  //       count: result[0].totalCount[0].count,
  //       data: result[0].results
  //     };
  //   } else {
  //     data = {
  //       count: 0,
  //       data: []
  //     };
  //   }
  //   return data;
  // },
  // // Gen_OrderID: (): string => {
  // //   let d1: any = uuidv4();
  // //   d1 = d1.split('-');
  // //   const time = new Date().getTime();
  // //   const data = time + '-' + d1[0];
  // //   return data;
  // // },

  // // Gen_8Digit: (): string => {
  // //   let data: string | string[] = uuidv4();
  // //   data = data.split('-');
  // //   return data[0];
  // // },

  // JSON_Date: <T1>(data: object, fields: string[]): T1 => {
  //   const cloneObject = (obj: any) => {
  //     return JSON.parse(JSON.stringify(obj));
  //   };
  //   let currentData = cloneObject(data);
  //   fields.forEach((field) => {
  //     const fieldParts = field.split('.');
  //     let currentDataRef = currentData;

  //     for (const nestedField of fieldParts.slice(0, -1)) {
  //       if (currentDataRef.hasOwnProperty(nestedField)) {
  //         currentDataRef = currentDataRef[nestedField];
  //       } else {
  //         // Handle the case where a nested field doesn't exist
  //         // console.error(`Nested field '${nestedField}' not found in data.`);
  //         return;
  //       }
  //     }
  //     const finalField = fieldParts[fieldParts.length - 1];
  //     if (currentDataRef.hasOwnProperty(finalField)) {
  //       // currentDataRef[finalField] = formatDate_(new Date(currentDataRef[finalField]));
  //     } else {
  //       // Handle the case where the final field doesn't exist
  //       // console.error(`Field '${finalField}' not found in data.`);
  //     }
  //   });
  //   return currentData;
  // },
  // JSON_PDF_EXCEL: <T1>(
  //   data: object[],
  //   fields: string[],
  //   hour: boolean = true
  // ): T1 => {
  //   const newArrayData = [] as object[];
  //   for (const item of data) {
  //     const cloneObject = (obj: any) => {
  //       return JSON.parse(JSON.stringify(obj));
  //     };
  //     let currentData = cloneObject(item);
  //     fields.forEach((field) => {
  //       const fieldParts = field.split('.');
  //       let currentDataRef = currentData;

  //       for (const nestedField of fieldParts.slice(0, -1)) {
  //         if (currentDataRef.hasOwnProperty(nestedField)) {
  //           currentDataRef = currentDataRef[nestedField];
  //         } else {
  //           // Handle the case where a nested field doesn't exist
  //           // console.error(`Nested field '${nestedField}' not found in data.`);
  //           return;
  //         }
  //       }
  //       const finalField = fieldParts[fieldParts.length - 1];
  //     });
  //     newArrayData.push(currentData);
  //   }
  //   //@ts-ignore
  //   return newArrayData;
  // },
  // JSON_PDF: <T1>(data: object, fields: string[], hour: boolean = true): T1 => {
  //   const newArrayData = [] as object[];
  //   const cloneObject = (obj: any) => {
  //     return JSON.parse(JSON.stringify(obj));
  //   };
  //   let currentData = cloneObject(data);
  //   fields.forEach((field) => {
  //     const fieldParts = field.split('.');
  //     let currentDataRef = currentData;

  //     for (const nestedField of fieldParts.slice(0, -1)) {
  //       if (currentDataRef.hasOwnProperty(nestedField)) {
  //         currentDataRef = currentDataRef[nestedField];
  //       } else {
  //         // Handle the case where a nested field doesn't exist
  //         // console.error(`Nested field '${nestedField}' not found in data.`);
  //         return;
  //       }
  //     }
  //     const finalField = fieldParts[fieldParts.length - 1];
  //   });
  //   newArrayData.push(currentData);

  //   //@ts-ignore
  //   return newArrayData;
  // },
  // // Date: (fromDate: any, toDate: any): { from: number; to: number } => {
  // //   const from = new Date(fromDate);
  // //   const to = new Date(toDate);
  // //   from.setSeconds(0);
  // //   from.setMinutes(0);
  // //   from.setHours(0);
  // //   to.setSeconds(59);
  // //   to.setMinutes(59);
  // //   to.setHours(23);
  // //   const date = {
  // //     from: new Date(from).getTime(),
  // //     to: new Date(to).getTime()
  // //   };
  // //   return date;
  // // },

  // Date_: (
  //   fromDate: number | Date,
  //   toDate: number | Date
  // ): { from: number; to: number } => {
  //   const from = new Date(fromDate);
  //   const to = new Date(toDate);

  //   const currectFrom: number = Date.UTC(
  //     from.getUTCFullYear(),
  //     from.getUTCMonth(),
  //     from.getUTCDate(),
  //     0,
  //     0,
  //     0,
  //     0
  //   );
  //   const currectTo: number = Date.UTC(
  //     to.getUTCFullYear(),
  //     to.getUTCMonth(),
  //     to.getUTCDate(),
  //     23,
  //     59,
  //     59,
  //     999
  //   );

  //   return {
  //     from: new Date(currectFrom).getTime() + 12600000,
  //     to: new Date(currectTo).getTime() + 12600000
  //   };
  // },

  // //* Convert string in User extraData to mongoose ObjectId
  // ExtraData_cvt: (object: IUser['extraData']) => {
  //   if (object.creator_person_id)
  //     object.creator_person_id = new mongoose.Types.ObjectId(
  //       object.creator_person_id as unknown as string
  //     );
  //   if (object.updater_person_id)
  //     object.updater_person_id = new mongoose.Types.ObjectId(
  //       object.updater_person_id as unknown as string
  //     );
  //   if (object.remover_person_id)
  //     object.remover_person_id = new mongoose.Types.ObjectId(
  //       object.remover_person_id as unknown as string
  //     );
  // },

  // //* Convert Object to Array and Delete Null or Undefined Values
  // ObjToArr: (obj: any): Array<object> => {
  //   const array = [];
  //   for (const key in obj) {
  //     if (obj[key] != null) {
  //       const row = { [key]: obj[key] };
  //       array.push(row);
  //     }
  //   }
  //   return array;
  // },

  // //* Convert Array to Object in Result of Mongoose Aggregate
  // ArrToObj: (result: Array<any>, keys: Array<any>) => {
  //   // const array = []
  //   result.forEach((item: any) => {
  //     keys.forEach((key: any) => {
  //       if (Array.isArray(item[key])) {
  //         if (item[key].length === 0) {
  //           item[key] = {};
  //         } else {
  //           item[key] = item[key][0];
  //         }
  //       }
  //     });
  //   });
  //   return result;
  // },

  // //* Convert string to Mongoose ObjectId
  // MongoID: (id: string | Types.ObjectId): Types.ObjectId => {
  //   const _id = new mongoose.Types.ObjectId(id);
  //   return _id;
  // },

  // MongoID_Array: (array: string[] | Types.ObjectId[]): Types.ObjectId[] => {
  //   if (array.length > 0) {
  //     const newArray = array.map((id) => new mongoose.Types.ObjectId(id));
  //     return newArray;
  //   } else {
  //     return [];
  //   }
  // },

  // //* Transaction Reason
  // TransactionReason: (
  //   type: string,
  //   tripID?: string,
  //   passenger_count: number = 0
  // ): string => {
  //   let text: string = '';

  //   if (type == 'd_cancel_trip_passenger')
  //     text = `لغو سفر توسط مسافر - کد سفر راننده ${tripID}`;
  //   if (type == 'd_penalty_cancel_trip')
  //     text = `جریمه لغو سفر - کد سفر راننده ${tripID}`;
  //   if (type == 'd_cancel_trip_passenger_cancel_no_passenger')
  //     text = `لغو سفر توسط راننده به دلیل نبودن مسافر - کد سفر راننده ${tripID}`;
  //   if (type == 'd_penalty_accidental_passenger')
  //     text = `جریمه ${passenger_count} نفر مسافر اتفاقی - کد سفر راننده ${tripID}`;
  //   if (type == 'd_penalty_cancel_no_driver')
  //     text = `جریمه لغو سفر به دلیل نبودن راننده - کد سفر راننده ${tripID}`;

  //   if (type == 'p_pays_trip_fare') text = `for_trip_number ${tripID}`;
  //   if (type == 'p_penalty_cancel_trip')
  //     text = `جریمه لغو سفر - کد سفر مسافر ${tripID}`;
  //   if (type == 'p_cancel_trip_driver')
  //     text = `لغو سفر توسط راننده - کد سفر مسافر ${tripID}`;
  //   if (type == 'p_penalty_cancel_no_passenger')
  //     text = `جریمه لغو سفر بدلیل نبودن مسافر - کد سفر مسافر ${tripID}`;
  //   if (type == 'p_cancel_trip_passenger_cancel_no_driver')
  //     text = `لغو سفر توسط مسافر به دلیل نبودن راننده - کد سفر مسافر ${tripID}`;
  //   if (type == 'p_representer_commission')
  //     text = `سهم شما از سفر های ماه گذشته ${tripID} که شما معرف وی به اپ نیکو بوده اید`; // tripID == passenger fullname

  //   if (type == 'tipping') text = `passenger tip - for trip ${tripID}`;
  //   if (type == 'end_trip_commission')
  //     text = `کمیسیون کد سفر مسافر - ${tripID}`;
  //   if (type == 'half_a_year') text = `پاداش نیمسال`;
  //   if (type == 'year') text = `پاداش سالیانه`;
  //   if (type == 'application_membership') text = `حق عضویت ماهانه در اپلیکیشن`;
  //   if (type == 'passenger_representative_bonus')
  //     text = `سهم شما از سفر های ماه گذشته افرادی که شما معرف آنها به اپ نیکو بوده اید`;

  //   return text;
  // },

  // //* Ticket Description
  // TicketDescription: (type: string, data: Record<string, any>): string => {
  //   let text: string = '';

  //   if (type === 'delay_in_processing_ticket')
  //     text = `به دلیل تاخیر در رسیدگی تیکت شماره ${data.ticketID}`;
  //   if (type === 'delay_in_processing_safetyShield')
  //     text = `به دلیل تاخیر در رسیدگی شماره درخواست ${data.safetyShieldID}`;
  //   if (type === 'delay_in_processing_feedback')
  //     text = `به دلیل تاخیر در رسیدگی شماره درخواست ${data.feedbackID}`;
  //   if (type === 'incomingSecretariat_1') text = 'نامه دریافتی از دبیرخانه';

  //   return text;
  // },

  // //* Notif Text
  // NotifText: (type: string, data: Record<string, any> = {}) => {
  //   let result: { title: string; body: any } = { title: '', body: '' };

  //   if (type === 'passengerTripDone_sendToPassenger')
  //     result = {
  //       title: `پایان سفر`,
  //       body: {
  //         text: `سفر بخیر با کلیک بر روی این پیغام نظر خود را در مورد سفر انجام شده با ما با اشتراک بگذارید`,
  //         link: `${process.env.PWA_LINK}survey-form/${data.passengerTripId}`
  //       }
  //     };
  //   if (type === 'passengerTripCancelDriverNotFound_sendToPassenger')
  //     result = {
  //       title: `-`,
  //       body: `متاسفانه ماشین مورد نظر برای سفر شما در مسیر نبود ،   در صورت تمایل به عودت مانده اعتبار به حساب بانکی تان عدد 1  را بهمراه نام و شماره حساب بانکی تان (شماره شبا) ارسال کنید و یا میتوانید از اعتبار خود برای سفرهای بعدی استفاده نمایید.`
  //     };

  //   return result;
  // },

  // paginate: (array: [], page_size: number, page_number: number): Array<any> => {
  //   // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
  //   return array.slice((page_number - 1) * page_size, page_number * page_size);
  // },

  // //* remove duplicate value from Array[ObjectID] or Array[string]
  // RmvDuplicArray: (
  //   array: Array<any>,
  //   arrayType: 'objectID' | 'string'
  // ): Array<string | Types.ObjectId> => {
  //   if (arrayType == 'objectID') {
  //     array = array.map((item: any) => {
  //       return item.toString();
  //     });
  //     array = _.uniq(array);
  //     array = array.map((item: any) => {
  //       return new mongoose.Types.ObjectId(item);
  //     });
  //     return array;
  //   } else {
  //     array = _.uniq(array);
  //     return array;
  //   }
  // },
  // getDistanceFromLatLonInKm: (
  //   lat1: number,
  //   lon1: number,
  //   lat2: number,
  //   lon2: number
  // ): number => {
  //   const deg2rad = (deg: number) => {
  //     return deg * (Math.PI / 180);
  //   };

  //   var R = 6371; // Radius of the earth in km
  //   var dLat = deg2rad(lat2 - lat1); // deg2rad below
  //   var dLon = deg2rad(lon2 - lon1);
  //   var a =
  //     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
  //     Math.cos(deg2rad(lat1)) *
  //       Math.cos(deg2rad(lat2)) *
  //       Math.sin(dLon / 2) *
  //       Math.sin(dLon / 2);
  //   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  //   var d = R * c; // Distance in km
  //   return d;
  // },

  // //* Rounding a number
  // Rounder: (number: number | string) => {
  //   let number_ = Math.trunc(Number(number));
  //   const numberLength = number_.toString().length;
  //   if (numberLength < 4) {
  //     return 5000;
  //   } else {
  //     const lastFourDigits = Number(number_.toString().slice(-4));
  //     let deficit = 0;
  //     if (
  //       lastFourDigits < 5000 &&
  //       5000 - lastFourDigits > 0 &&
  //       lastFourDigits !== 0
  //     ) {
  //       deficit = 5000 - lastFourDigits;
  //     }
  //     if (lastFourDigits > 5000 && lastFourDigits < 10000) {
  //       deficit = 10000 - lastFourDigits;
  //     }
  //     number_ = Number(number_) + deficit;
  //     return number_;
  //   }
  // },

  // //* Prepare object to use in Mongo update query
  // UpdateObject_MongoDoc: (
  //   objectName: string,
  //   objectData: Record<string, any>
  // ) => {
  //   const update: { [key: string]: any } = {};
  //   for (const key in objectData) {
  //     if (objectData.hasOwnProperty(key)) {
  //       update[`${objectName}.${key}`] = objectData[key];
  //     }
  //   }
  //   return update;
  // },

  // Regex: (input: string, type: 'number' | 'string') => {
  //   if (type === 'number') {
  //     return { $regex: input };
  //   } else {
  //     return { $regex: '.*' + input + '.*', $options: 'i' };
  //   }
  // },

  // MultiSelect: (input: string[], outPutType?: 'number' | 'string') => {
  //   const myArray = input[0].split(',');
  //   if (outPutType === 'number') {
  //     const newArray = myArray.map((str) => Number(str));
  //     return newArray;
  //   } else {
  //     return myArray;
  //   }
  // },

  // // //* Remove files if register is not successful   (multer)
  // // removeFiles: async (files: any , path: string) => {
  // //   if(files.length > 0) {
  // //     files.forEach((file: any) => {
  // //       fs.unlink( path + "/" + file.filename , (err: any) => {
  // //       if (err) {
  // //           console.log(err);
  // //           // throw err;
  // //       }
  // //     })
  // //       console.log("Delete File successfully.");
  // //     });
  // //   }
  // // },

  // ScoreBagText: (type: string, data: Record<string, any>): string => {
  //   let text: string = '';

  //   if (type == 'supervisor_report')
  //     text = `گزارش توسط ناظر - کد ${data.ticket_id}`;

  //   return text;
  // },

  // MoveLastElementToStartOfArray: <T>(myArray: T[]): T[] => {
  //   const lastElement = myArray.pop();
  //   //@ts-ignore
  //   myArray.unshift(lastElement);
  //   return myArray;
  // },

  // LogCommentCheckPermission: async (
  //   type: 'comment' | 'log',
  //   data_id: string,
  //   user_id: string | Types.ObjectId
  //   // checkAccess: null | 'car' = null
  // ) => {
  //   let auther = await rbac();
  //   let data: ILog | IComment | null = null;
  //   if (type === 'comment')
  //     data = await findComment({ data_id: data_id }, null, {
  //       sort: { _id: -1 }
  //     });
  //   if (type === 'log')
  //     data = await findLog({ data_id: data_id }, null, { sort: { _id: -1 } });
  //   if (data && data.perm_) {
  //     let hasPermission = await auther
  //       .GetEnforcer()
  //       .enforce(user_id.toString(), data.perm_[0], data.perm_[1]);
  //     if (hasPermission !== true) return false;

  //     let needCheckAccess = false;
  //     if (type === 'comment')
  //       //@ts-ignore
  //       needCheckAccess = Object.values(CommentDataModel).includes(
  //         data.data_model
  //       );
  //     if (type === 'log')
  //       //@ts-ignore
  //       needCheckAccess = Object.values(LogDataModel).includes(data.data_model);
  //     if (needCheckAccess) {
  //       const model = data.data_model;
  //       const modelInfo = data.type as IComment['type'] | ILog['type'];
  //       const person = await findUserById(user_id); // Applicant person
  //       if (!person) return false;
  //       const p_role = person.role;
  //       let carOwner: null | IUser = null;
  //       let agent: null | IUser = null;
  //       if (p_role === StaticRoleEnum.carowner) {
  //         carOwner = person;
  //       }
  //       // User
  //       if (model === 'User') {
  //         if (modelInfo === 'fleet') {
  //           if (p_role === StaticRoleEnum.carowner)
  //             if (carOwner!._id.toString() !== data_id) return false;
  //         }
  //         if (modelInfo === 'driver') {
  //           if (p_role === StaticRoleEnum.carowner) {
  //             const driver_trips = await DriverTrip.aggregate([
  //               {
  //                 $match: {
  //                   car_id: { $in: carOwner!.cars_id }
  //                 }
  //               },
  //               {
  //                 $group: {
  //                   _id: null,
  //                   id_array: { $push: '$driver_id' },
  //                   count: { $sum: 1 }
  //                 }
  //               }
  //             ]);
  //             const driver_ids_array =
  //               driver_trips.length > 0 ? driver_trips[0].id_array : null;
  //             if (driver_ids_array === null) return false;
  //             const isObjectIdInArray = driver_ids_array.some(
  //               (objId: any) => objId.toString() === data_id
  //             );
  //             if (!isObjectIdInArray) return false;
  //           }
  //         }
  //       }
  //       // End User

  //       // Car
  //       if (model === 'Car') {
  //         if (p_role === StaticRoleEnum.carowner) {
  //           const car = await findCar({
  //             _id: data_id,
  //             carOwner_id: carOwner!._id
  //           });
  //           if (!car) return false;
  //         }
  //       }
  //       // End Car

  //       // DriverTrip
  //       if (model === 'DriverTrip') {
  //         if (p_role === StaticRoleEnum.carowner) {
  //           const driverTrip = await findDriverTrip({
  //             _id: data_id,
  //             car_id: { $in: carOwner!.cars_id }
  //           });
  //           if (!driverTrip) return false;
  //         }
  //       }
  //       // End DriverTrip

  //       // Feedback
  //       // if (model === 'Feedback') {
  //       //   if (p_role === StaticRoleEnum.carowner) {
  //       //     let where = {} as IFeedback | FilterQuery<IFeedback>;
  //       //     if (p_role === StaticRoleEnum.carowner) {
  //       //       if (carOwner!.agent_id) {
  //       //         where = { _id: data_id, ref_id: { $in: [carOwner!._id, carOwner!.agent_id] } };
  //       //       } else {
  //       //         where = { _id: data_id, ref_id: carOwner!._id };
  //       //       }
  //       //     }
  //       //     if (p_role === StaticRoleEnum.agent) where = { _id: data_id, ref_id: { $in: [carOwner!._id, agent!._id] } };
  //       //     const feedback = await findFeedback(where);
  //       //     if (!feedback) return false;
  //       //   }
  //       // }
  //       // End Feedback

  //       // // IncomingSecretariat
  //       // if (model === 'IncomingSecretariat') {
  //       //   if (person.limited_user === 'yes') {
  //       //     const incomingSecretariat = await findIncomingSecretariat({
  //       //       $and: [
  //       //         { _id: data_id },
  //       //         {
  //       //           $or: [
  //       //             { 'extraData.creator_person_id': person._id },
  //       //             { contact: person._id },
  //       //             { confirmerRegistSecretariat: person._id }
  //       //           ]
  //       //         }
  //       //       ]
  //       //     });
  //       //     if (!incomingSecretariat) return false;
  //       //   }
  //       // }
  //       // End IncomingSecretariat

  //       // // PassengerTrip
  //       // if (model === 'PassengerTrip') {
  //       //   if (p_role === StaticRoleEnum.carowner) {
  //       //     const passengerTrip = await findPassengerTrip({ _id: data_id });
  //       //     if (!passengerTrip || passengerTrip.driver_trip_id === null) return false;
  //       //     const driverTrip = await findDriverTrip({ _id: passengerTrip.driver_trip_id });
  //       //     if (!driverTrip) return false;
  //       //     if (p_role === StaticRoleEnum.carowner) {
  //       //       const car = await findCar({ _id: driverTrip.car_id, carOwner_id: carOwner!._id });
  //       //       if (!car) return false;
  //       //     }
  //       //     if (p_role === StaticRoleEnum.agent) {
  //       //       const car = await findCar({ _id: driverTrip.car_id, carOwner_id: carOwner!._id });
  //       //       if (!car) return false;
  //       //     }
  //       //   }
  //       // }
  //       // // End PassengerTrip
  //     }

  //     return true;
  //   } else {
  //     return false;
  //   }
  // },

  // GetLastCharacter(inputString: string): string | null {
  //   if (typeof inputString === 'string' && inputString.length > 0) {
  //     return inputString.charAt(inputString.length - 1);
  //   } else {
  //     return null;
  //   }
  // },
  // convertSecondsToHour(seconds: number): number {
  //   const hours = Math.floor(seconds / 3600);

  //   return hours;
  // },
  // calculateIncreasePercentage(
  //   originalPrice: number,
  //   percentageIncrease: number
  // ): number {
  //   const increaseAmount = originalPrice * (percentageIncrease / 100);
  //   const newPrice = originalPrice + increaseAmount;
  //   return newPrice;
  // },
  // isWithinFiftyCents(targetAmount: number, price: number) {
  //   // Parse the inputs as numbers
  //   const target = parseFloat(targetAmount.toString());
  //   const currentPrice = parseFloat(price.toString());

  //   if (isNaN(target) || isNaN(currentPrice)) {
  //     throw new Error(
  //       'Invalid input: both targetAmount and price must be numbers.'
  //     );
  //   }

  //   // Calculate the difference and check if it's within 50 cents
  //   const difference = Math.abs(currentPrice - target);
  //   return difference <= 0.5;
  // },
  // isWithinDoubleRange(targetAmount: number, price: number): boolean {
  //   // Parse the inputs as numbers
  //   const target = parseFloat(targetAmount.toString());
  //   const currentPrice = parseFloat(price.toString());

  //   if (isNaN(target) || isNaN(currentPrice)) {
  //     throw new Error(
  //       'Invalid input: both targetAmount and price must be numbers.'
  //     );
  //   }

  //   // Check if the price is within the range of 1.01 to 2 times the target
  //   return currentPrice >= target * 1 && currentPrice <= target * 2;
  // },
  // cleanObject: function (obj: any): any {
  //   if (Array.isArray(obj)) {
  //     return obj
  //       .map((item) => helpers.cleanObject(item)) // Clean each array element recursively
  //       .filter(
  //         (item) => item !== null && !(Array.isArray(item) && item.length === 0)
  //       ); // Remove null and empty arrays
  //   } else if (obj !== null && typeof obj === 'object') {
  //     return Object.entries(obj).reduce((acc: AnyObject, [key, value]) => {
  //       const cleanedValue = helpers.cleanObject(value); // Recursively clean value
  //       if (
  //         cleanedValue !== null &&
  //         !(Array.isArray(cleanedValue) && cleanedValue.length === 0)
  //       ) {
  //         acc[key] = cleanedValue; // Only include if not null or empty array
  //       }
  //       return acc;
  //     }, {});
  //   }
  //   return obj; // Return primitive values unchanged
  // },
  // getTimeDifferenceInMinutes(timestamp1: number, timestamp2: number): number {
  //   // Ensure that both timestamps are valid (non-negative).
  //   if (timestamp1 < 0 || timestamp2 < 0) {
  //     throw new Error('Timestamps must be positive numbers');
  //   }

  //   // Calculate the absolute difference in seconds
  //   const differenceInSeconds = Math.abs(timestamp1 - timestamp2);

  //   // Convert seconds to minutes
  //   const differenceInMinutes = differenceInSeconds / 60;

  //   // Return the result as a float (it can be a decimal if the difference isn't an exact number of minutes)
  //   return differenceInMinutes;
  // },
  // getNearestMondayInCurrentWeek() {
  //   // Get the current date
  //   const today = new Date();

  //   // Set the time to midnight (00:00:00.000)
  //   today.setHours(0, 0, 0, 0);

  //   // Get the current day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  //   const currentDayOfWeek = today.getDay();

  //   // Calculate the difference in days to the previous Monday
  //   let daysToSubtract;
  //   if (currentDayOfWeek === 0) {
  //     // If today is Sunday, go back 6 days to get the previous Monday
  //     daysToSubtract = 6;
  //   } else {
  //     // Otherwise, subtract (currentDayOfWeek - 1) days to get the previous Monday
  //     daysToSubtract = currentDayOfWeek - 1;
  //   }

  //   // Calculate the previous Monday
  //   const nearestMonday = new Date(today);
  //   nearestMonday.setDate(today.getDate() - daysToSubtract);

  //   return nearestMonday;
  // },
  // getLastWeekMonday() {
  //   // Get the current week's Monday
  //   const currentWeekMonday = this.getNearestMondayInCurrentWeek();

  //   // Subtract 7 days to get last week's Monday
  //   const lastWeekMonday = new Date(currentWeekMonday);
  //   lastWeekMonday.setDate(currentWeekMonday.getDate() - 7);

  //   return lastWeekMonday;
  // },
  // // Function to get the beginning of the current month
  // getCurrentMonthBeginning() {
  //   const today = new Date();
  //   const currentMonthBeginning = new Date(
  //     today.getFullYear(),
  //     today.getMonth(),
  //     1
  //   );
  //   return currentMonthBeginning;
  // },

  // // Function to get the beginning of the last month
  // getLastMonthBeginning() {
  //   const today = new Date();
  //   let lastMonthYear = today.getFullYear();
  //   let lastMonth = today.getMonth() - 1;

  //   // Handle the year change if the current month is January
  //   if (lastMonth < 0) {
  //     lastMonth = 11; // December
  //     lastMonthYear -= 1; // Previous year
  //   }

  //   const lastMonthBeginning = new Date(lastMonthYear, lastMonth, 1);
  //   return lastMonthBeginning;
  // },
  // getStartOfCurrentDay() {
  //   const now = new Date(); // Get the current date and time
  //   const startOfDay = new Date(now); // Create a copy of the current date
  //   startOfDay.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0
  //   return startOfDay;
  // },
  // getEndOfCurrentDay() {
  //   const now = new Date(); // Get the current date and time
  //   const startOfDay = new Date(now); // Create a copy of the current date
  //   startOfDay.setHours(23, 59, 59, 99); // Set hours, minutes, seconds, and milliseconds to 0
  //   return startOfDay;
  // },
  // getYesterdayDate(): Date {
  //   const now = new Date(); // Get the current date and time
  //   const yesterday = new Date(now); // Create a copy of the current date
  //   yesterday.setDate(now.getDate() - 1); // Subtract 1 day to get yesterday's date
  //   yesterday.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0
  //   return yesterday;
  // },
  // getYesterdayDateEnd(): Date {
  //   const now = new Date(); // Get the current date and time
  //   const yesterday = new Date(now); // Create a copy of the current date
  //   yesterday.setDate(now.getDate() - 1); // Subtract 1 day to get yesterday's date
  //   yesterday.setHours(23, 59, 59, 99); // Set hours, minutes, seconds, and milliseconds to 0
  //   return yesterday;
  // },
  // generateDateRange(startDateUnix: number, endDateUnix: number): string[] {
  //   const dates: string[] = [];
  //   let currentDate = new Date(startDateUnix * 1000); // Convert Unix timestamp to Date object
  //   const endDate = new Date(endDateUnix * 1000);

  //   // Normalize the time part of the dates to midnight (00:00:00) to avoid time zone issues
  //   currentDate.setHours(0, 0, 0, 0);
  //   endDate.setHours(0, 0, 0, 0);

  //   // Ensure the loop runs until currentDate is less than or equal to endDate
  //   while (currentDate <= endDate) {
  //     // Format the date as 'YYYY-MM-DD' in local time
  //     const formattedDate = currentDate.toLocaleDateString('en-CA', {
  //       year: 'numeric',
  //       month: '2-digit',
  //       day: '2-digit'
  //     });
  //     dates.push(formattedDate);

  //     // Move to the next day
  //     currentDate.setDate(currentDate.getDate() + 1);
  //   }

  //   return dates;
  // },
  // async calculateCommission(originalPrice: number): Promise<any> {
  //   const setting = await findSetting();
  //   const default_driver_commissions = setting?.default_driver_commissions
  //     ? setting?.default_driver_commissions
  //     : 0;
  //   const increaseAmount = originalPrice * (default_driver_commissions / 100);
  //   console.log(increaseAmount);
  //   return +increaseAmount.toFixed(2) > 0 ? increaseAmount.toFixed(2) : 0;
  // },
  // async calculateCommissionForFleet(
  //   originalPrice: number,
  //   service: string
  // ): Promise<any> {
  //   let fleetComissions = await findCommission({ service_type: service });
  //   if (!fleetComissions) {
  //     return 0;
  //   }
  //   const increaseAmount =
  //     originalPrice * (fleetComissions?.commission_rate / 100);
  //   return +increaseAmount.toFixed(2) > 0 ? increaseAmount.toFixed(2) : 0;
  // },
  // calculateDiscount(
  //   type: 'percentage' | 'fixed',
  //   actualPrice: number,
  //   discountValue: number
  // ): number {
  //   if (type === 'percentage') {
  //     return actualPrice - (actualPrice * discountValue) / 100;
  //   } else {
  //     const newPrice = actualPrice - discountValue;
  //     return newPrice <= 0 ? 0 : newPrice;
  //   }
  // },
  // getMultiplicationFactor(price1: number, price2: number): number {
  //   return Math.max(price1, price2) / Math.min(price1, price2);
  // }
};
