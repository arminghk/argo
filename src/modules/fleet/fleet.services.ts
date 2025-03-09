import { Injectable } from '@nestjs/common';
import { AuthHandler, rbac } from '../../components/auth';
import { InjectModel } from '@nestjs/mongoose';
import { Fleet } from './model/fleet.schema';
import { Model } from 'mongoose';
import { helpers } from 'src/components/helpers';
import { ChangesCollectionsStatus } from 'src/components/enums';
import { StaticRoleEnum } from 'src/types/custom/enum';

@Injectable()
export class FleetService {
  constructor(
    @InjectModel(Fleet.name) private readonly fleetModel: Model<Fleet>
  ) { }

  async register(body) {
    let auther = await rbac();

    if (body.password !== body.retype_password) {
      return 'Passwords do not match'
    }
    let user = await this.fleetModel.findOne({
      $and: [
        {
          $or: [
            { mobile: body.mobile },
            { email: body.email },
            { username: body.username }
          ]
        },
        { deleted: 'no' }
      ]
    });
    if (user) {
      return 'User.Duplicate_Username_Or_Email_Or_Mobile'
    }

    body.password = await helpers.Hash(body.password);
    body.status = 'deactive';
    body.role = 'fleet';
    body.changeable = false;
    body.limited = true;
    body.changes_status = ChangesCollectionsStatus[1];
    const userData = await this.fleetModel.create(body);
    body.userData_id = userData._id;

    // body.ID = await this.gen_id('fleet', {}, this.fleetModel);

    user = await this.fleetModel.create(body);

    await auther.GetEnforcer().deleteRoleForUser(user!._id + '', user!.role);
    await auther.GetEnforcer().addRoleForUser(user!._id + '', body.role);

    body.car_owner_id = user._id;
    return 'CRUD.Create';

  }

  login(createFleetDto) {
    return 'This action adds a new fleet';
  }

  async gen_id(userRole: any, queryOption = {}, fleetModel): Promise<string> {
    try {
      let ID: any;
      let doc
      if (
        userRole === StaticRoleEnum.admin ||
        userRole === StaticRoleEnum.carowner
      ) {
        doc = await fleetModel.findOne({ role: userRole }, null, { ...queryOption, sort: { _id: -1 } });
      } else {
        doc = await fleetModel.findOne(
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
}
