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
    if (!user && !fleet) {
      return  "User doesn't exists";
    }
  
    if (user) {
      if (user.status === UserStatus[1]) {
        return 'CRUD.DeActive_User'

      }
      const isMatch = await helpers.Compare(body.password, user.password);
      if (!isMatch) {
        return 'Incorrect password or username'
      }
      const token = await AuthHandler.UserGen(user);
      let auther = await rbac();
      // if (req.limiter) {
      //   req.limiter.delete(req.body.username);
      //   req.limiter.delete(req.ip);
      // }

      const permissions = await RoleController._formatPermissions(
        await auther.GetEnforcer().getImplicitPermissionsForUser(user._id + ''),
       ' res.t'
      );

      // await createLogReport({
      //   user_id: user,
      //   time: Date.now(),
      //   type: LogReportType.LOGIN
      // });
      user.password = '';
      return {
        user,
        token,
        // permissions,
        // roles: await auther.GetEnforcer().getImplicitRolesForUser(user._id + '')
      }


    }
    // else if (fleet) {
    //   if (fleet.status === UserStatus[1]) {
    //     return ResponseHandler.customError(
    //       res,
    //       res.t('CRUD.DeActive_User'),
    //       400
    //     );
    //   }
    //   const isMatch = await helpers.Compare(body.password, fleet.password);
    //   if (!isMatch) {
    //     return ResponseHandler.customError(res, 'Incorrect password', 401);
    //   }
    //   // TODO: add login logic here
    //   const { token } = await AuthHandler.FleetGen(fleet);
    //   let auther = await rbac();
    //   // if (req.limiter) {
    //   //   req.limiter.delete(req.body.username);
    //   //   req.limiter.delete(req.ip);
    //   // }

    //   const permissions = await RoleController._formatPermissions(
    //     await auther
    //       .GetEnforcer()
    //       .getImplicitPermissionsForUser(fleet._id + ''),
    //     res.t
    //   );

    //   await createLogReport({
    //     user_id: fleet as any,
    //     time: Date.now(),
    //     type: LogReportType.LOGIN
    //   });
    //   fleet.password = '';
    //   return ResponseHandler.success(
    //     res,
    //     {
    //       fleet,
    //       token,
    //       permissions,
    //       roles: await auther
    //         .GetEnforcer()
    //         .getImplicitRolesForUser(fleet._id + '')
    //     },
    //     res.t('CRUD.Success')
    //   );
    // }
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

}
