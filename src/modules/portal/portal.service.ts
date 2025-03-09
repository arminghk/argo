import { Injectable } from '@nestjs/common';
import { registerNewUserDTO } from './dto/portal.dto';
import { InjectModel } from '@nestjs/mongoose';
import { PortalUser } from './model/protalUser.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UserStatus } from 'src/components/enums';
import { helpers } from 'src/components/helpers';
import { UserServices } from 'src/services/user';
import { AuthHandler } from 'src/components/auth';
import rbac from '../../components/auth/rbac';
import { Fleet } from '../fleet/model/fleet.schema';
import { RoleController } from './../portal/controllers/role.controller';

@Injectable()
export class PortalAuthService {
  constructor(
    @InjectModel(PortalUser.name) private portalUserModel: Model<PortalUser>,
    @InjectModel(Fleet.name) private readonly fleetModel: Model<Fleet>
  ) { }
  async registerNewUser(body: registerNewUserDTO) {

    let user = await this.portalUserModel.findOne({ username: body.username });
    const userEmail = await this.portalUserModel.findOne({ email: body.email });
    if (user) {
      return 'User already exists'
    }
    if (userEmail) {
      return 'Email already exists'
    }
    body.password = await helpers.Hash(body.password);
    body.ID = await UserServices.gen_id('null', {}, this.portalUserModel);
    user = await this.portalUserModel.create(body);
    if (!user) {
      return 'something went wrong'
    }
    const { token } = await AuthHandler.UserGen(user);
    return {
      message: 'User created successfully',
      token
    }


  }

  async login(body) {
    const user = await this.portalUserModel.findOne({ username: body.username });
    const fleet = await this.fleetModel.findOne({ username: body.username });
    if (!user) {
      return "User doesn't exists"
    }

    const isMatch = await helpers.Compare(body.password, user.password);
    if (!isMatch) {
      return  "Incorrect password or username"
      
    }
    const token = await AuthHandler.UserGen(user);
    return { 
      user, 
      token: { access_token: token.token } 
    }


  }

  async portalUserVerify(token: string) {
    try {
      let decode = await jwt.verify(token, process.env.JWT_SECRET_KEY as string);
      let portalUser = await this.portalUserModel.findOne({ _id: decode.sub });
      if (!portalUser) {
        'Your session has expired'
      }
      return { portalUser };
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {

        return 'Invalid token signature'
      }
      return 'Internal server error'
    }
  }

  async listUser(req){
      const vfw: any = req.query;
      let users;
      let where: Record<string, any> = {};;
      if (vfw?.filter?.where) {
        const filter = vfw.filter.where;
        if (filter.mobile)
          where.mobile = { $regex: filter.mobile } as unknown as string;
        if (filter.first_name)
          where.first_name = {
            $regex: ".*" + filter.first_name + ".*",
            $options: "i",
          } as unknown as string;
        if (filter.last_name)
          where.last_name = {
            $regex: ".*" + filter.last_name + ".*",
            $options: "i",
          } as unknown as string;
        if (filter.role) where.role = filter.role;
      }
      const option = {
        skip: (vfw.page - 1) * vfw.limit,
        limit: vfw.limit,
      };

      users = await this.portalUserModel.findOne(where, null, option);
      return {
        message:  "users fetched successfully",
        users
      }
  
    }  

}
