// const { newEnforcer } = require('casbin');
// const { MongoAdapter } = require('casbin-mongodb-adapter');
import { newEnforcer } from 'casbin';
import { MongoAdapter } from 'casbin-mongodb-adapter';

import * as path from 'path';


// Custom type
// interface ICasbinEnforcer {
//   addRoleForUser(user: string, role: string): Promise<void>;
//   addPermissionForUser(sub: string, obj: string, act: string): Promise<void>;
//   deletePermissionForUser(sub: string, obj: string, act: string): Promise<void>;
//   getPermissionsForUser(user: string): Promise<Array<string>>;
//   getAllActions(): Promise<Array<string>>;
//   getRolesForUser(user: string): Promise<Array<string>>;
//   getAllRoles(): Promise<Array<string>>;
// }
//end

let auther: any = {};

export default async () => {
  try {
    if (auther.Enforcer) {
      return auther;
    }

    let uri: string = '';
    if (process.env.NODE_ENV == 'production') {
      uri = `${process.env.MONGO_URI_SERVER}${process.env.DB_NAME}`;
    } else if (process.env.NODE_ENV == 'development') {
      uri = `${process.env.MONGO_URI_LOCAL}${process.env.DB_NAME}`;
    }

    auther = new Authz();
    if (process.env.DB_NAME === undefined)
      throw new Error('*** ENV NOT FOUND ***');
    const adapter = await MongoAdapter.newAdapter({
      uri: uri,
      collection: 'casbin',
      database: process.env.DB_NAME
    });
    const modelPath = path.join(process.cwd(), '/src/components/auth/rbac_model.conf');
    auther.Enforcer = await newEnforcer(
      modelPath,
      adapter
    );
    console.log(auther);
    await auther?.Enforcer?.loadPolicy();
    return auther;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

class Authz {
  Enforcer: any;
  // constructor(enforcer: ICasbinEnforcer) {
  //   this.Enforcer = enforcer;
  // }

  async AddRole(user, roleName: string) {
    return await this.Enforcer.addRoleForUser(user._id + '', roleName);
  }

  async AddPermission(sub: string, obj: string, act: string) {
    return await this.Enforcer.addPermissionForUser(sub, obj, act);
  }

  async DeletePermission(sub: string, obj: string, act: string) {
    return await this.Enforcer.deletePermissionForUser(sub, obj, act);
  }

  async GetPermissions(sub: string) {
    // console.log(sub);
    if (sub) return await this.Enforcer.getPermissionsForUser(sub);

    return await this.Enforcer.getAllActions();
  }
  GetEnforcer() {
    return this.Enforcer;
  }
  async GetRoles(sub: string) {
    // console.log(sub);
    if (sub) {
      let roles = await this?.Enforcer?.getRolesForUser(sub);
      // console.log(roles);
      return roles;
    }

    return await this.Enforcer.getAllRoles();
  }
}
