// import {
//   ClientSession,
//   Document,
//   FilterQuery,
//   QueryOptions,
//   Types,
// } from "mongoose";
// import User, { IUser } from "../database/models/user";
// import UserData, { IUserData } from "../database/models/userData";
import { InjectModel } from "@nestjs/mongoose";
import { StaticRoleEnum } from "../types/custom/enum";
import { PortalUser } from "src/modules/portal/model/protalUser.schema";
import { Model } from "mongoose";

export class UserServices {
  constructor(
        @InjectModel(PortalUser.name) private portalUserModel: Model<PortalUser>,
  ){}
  // export async function createUser(
//   input: Document<IUser>,
//   options: QueryOptions = {}
// ): Promise<IUser> {
//   try {
//     await User.validate(input);
//     let user: IUser;
//     if (Object.keys(options).length !== 0) {
//       const result = await User.create([input], options);
//       user = result[0];
//     } else {
//       user = await User.create(input);
//     }
//     return user;
//   } catch (e: any) {
//     throw new Error(e);
//   }
// }

// export async function findUsers(
//   query: FilterQuery<IUser> = {},
//   fields: string | object | null = null,
//   options: QueryOptions = {},
//   populateOption: Array<any> = ["", ""]
// ) {
//   try {
//     let countOptions = {} as { session: ClientSession };
//     if (options.session) countOptions.session = options.session;
//     const count = await User.countDocuments(query, countOptions);
//     const data = await User.find(query, fields, options)
//       .populate(populateOption[0])
//       .populate(populateOption[1]);
//     const result = { count, data };
//     return result;
//   } catch (e: any) {
//     throw new Error(e);
//   }
// }

// export async function findUser(
//   query: FilterQuery<IUser> = {},
//   fields: string | null | {} = null,
//   options: QueryOptions = {},
//   populateOption: Array<any> = ['', '']
// ) {
//   try {
//     return await User.findOne(query, fields, options).populate(populateOption[0]).populate(populateOption[1]);
//   } catch (e: any) {
//     throw new Error(e);
//   }
// }

// export async function findUserById(
//   id: string | Types.ObjectId,
//   fields: string | object | null = null,
//   options: QueryOptions = {},
//   populateOption: Array<any> = ["", ""]
// ) {
//   try {
//     return await User.findById(id, fields, options)
//       .populate(populateOption[0])
//       .populate(populateOption[1]);
//   } catch (e: any) {
//     throw new Error(e);
//   }
// }

// export async function findUserByIdAndUpdate(
//   id: string | Types.ObjectId,
//   update: FilterQuery<IUser>,
//   options: QueryOptions = { new: true },
//   populateOption: Array<any> = ["", ""]
// ) {
//   try {
//     await User.validate(update);
//     return await User.findByIdAndUpdate(id, update, options)
//       .populate(populateOption[0])
//       .populate(populateOption[1]);
//   } catch (e: any) {
//     throw new Error(e);
//   }
// }

// export async function findAndUpdateUser(
//   query: FilterQuery<IUser> = {},
//   update: FilterQuery<IUser>,
//   options: QueryOptions = { new: true },
//   populateOption: Array<any> = ["", ""]
// ) {
//   try {
//     await User.validate(update);
//     return await User.findOneAndUpdate(query, update, options)
//       .populate(populateOption[0])
//       .populate(populateOption[1]);
//   } catch (e: any) {
//     throw new Error(e);
//   }
// }

// export async function createUserData(
//   input: IUserData,
//   options: QueryOptions = {}
// ): Promise<IUserData> {
//   try {
//     await UserData.validate(input);
//     let ID: number;
//     const doc: IUserData | null = await UserData.findOne({}, null, { ...options, sort: { _id: -1 } });
//     if (!doc) {
//       ID = 1;
//     } else {
//       ID = Number(doc.ID) + 1;
//     }
//     input.ID = `${ID}`;

//     let userData: IUserData;
//     if (Object.keys(options).length !== 0) {
//       const result = await UserData.create([input], options);
//       userData = result[0];
//     } else {
//       userData = await UserData.create(input);
//     }
//     userData = userData.toJSON();
//     return userData;
//   } catch (e: any) {
//     throw new Error(e);
//   }
// }

 static async  gen_id(userRole: any, queryOption = {}, portalUserModel): Promise<string> {
  try {
    let ID: any;
    let doc
    if (
      userRole === StaticRoleEnum.admin ||
      userRole === StaticRoleEnum.carowner
    ) {
      doc = await portalUserModel.findOne({ role: userRole }, null, { ...queryOption, sort: { _id: -1 } });
    } else {
      doc = await portalUserModel.findOne(
        {
          role: {
            $nin: [StaticRoleEnum.admin, StaticRoleEnum.carowner]
          }
        },
        null,
        { ...queryOption, sort: { _id: -1 } }
      );
    }
    if (!doc) {
      if (userRole === StaticRoleEnum.admin) ID = 'R' + 1;
      if (userRole === StaticRoleEnum.carowner) ID = 'W' + 1;
      if (userRole == 'null') ID = 1;
    } else {
      if (userRole == 'null') {
        ID = Number(doc.ID) + 1;
      } else {
        const character = doc.ID.slice(0, 1);
        const number = Number(doc.ID.slice(1)) + 1;
        ID = character + number;
      }
    }
    return ID;
  } catch (e: any) {
    throw new Error(e);
  }
}


// export async function findUserDatas(
//   query: FilterQuery<IUserData> = {},
//   fields: string | object | null = null,
//   options: QueryOptions = {},
//   populateOption: Array<any> = ['', '']
// ) {
//   try {
//     let countOptions = {} as { session: ClientSession };
//     if (options.session) countOptions.session = options.session;
//     const count = await UserData.countDocuments(query, countOptions);
//     const data = await UserData.find(query, fields, options).populate(populateOption[0]).populate(populateOption[1]);
//     const result = { count, data };
//     return result;
//   } catch (e: any) {
//     throw new Error(e);
//   }
// }

// export async function findUserData(
//   query: FilterQuery<IUserData> = {},
//   fields: string | object | null = null,
//   options: QueryOptions = {},
//   populateOption: Array<any> = ['', '']
// ) {
//   try {
//     return await UserData.findOne(query, fields, options).populate(populateOption[0]).populate(populateOption[1]);
//   } catch (e: any) {
//     throw new Error(e);
//   }
// }

// export async function findUserDataById(
//   id: string | Types.ObjectId,
//   fields: string | object | null = null,
//   options: QueryOptions = {},
//   populateOption: Array<any> = ['', '']
// ) {
//   try {
//     return await UserData.findById(id, fields, options).populate(populateOption[0]).populate(populateOption[1]);
//   } catch (e: any) {
//     throw new Error(e);
//   }
// }

// export async function findUserDataByIdAndUpdate(
//   id: string | Types.ObjectId,
//   update: FilterQuery<IUserData>,
//   options: QueryOptions = { new: true },
//   populateOption: Array<any> = ['', '']
// ) {
//   try {
//     return await UserData.findByIdAndUpdate(id, update, options)
//       .populate(populateOption[0])
//       .populate(populateOption[1]);
//   } catch (e: any) {
//     throw new Error(e);
//   }
// }

// export async function findAndUpdateUserData(
//   query: FilterQuery<IUserData>,
//   update: FilterQuery<IUserData>,
//   options: QueryOptions = { new: true },
//   populateOption: Array<any> = ['', '']
// ) {
//   try {
//     await UserData.validate(update);
//     return await UserData.findOneAndUpdate(query, update, options)
//       .populate(populateOption[0])
//       .populate(populateOption[1]);
//   } catch (e: any) {
//     throw new Error(e);
//   }
// }

}