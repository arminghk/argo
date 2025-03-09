import { Request, Response } from 'express';


import rbac from '../../../components/auth/rbac';


import { StaticRoleEnum } from '../../../../src/types/custom/enum';

export const RoleController = {
  _formatPermissions: async (rawpermissions: any, t: any) => {

      let perms: any = {};
      for (const per of rawpermissions) {
        if (perms[per[1]]) {
          perms[per[1]].push({
            act: per[2],
            title: t(per[2], { scope: 'Perm.act' })
          });
        } else {
          perms[per[1]] = [
            {
              act: per[2],
              title: t(per[2], { scope: 'Perm.act' })
            }
          ];
        }
      }
      let permissions: { obj: string; title: any; acts: any[] }[] = [];
      for (const key in perms) {
        permissions.push({
          obj: key,
          title: t(key, { scope: 'Perm.obj' }),
          acts: perms[key]
        });
      }
      return permissions;
   
  },

  // //* Get List Permissions
  // ListAllPermissions: async (req: Request, res: Response) => {

  //     let auther = await rbac();
  //     let rawpermissions = await auther
  //       .GetEnforcer()
  //       .getImplicitPermissionsForUser('user');
  //     const formatedPermissions = await RoleController._formatPermissions(
  //       rawpermissions,
  //       res.t
  //     );
  //     return 'CRUD.Success';
     
  // },

  // //* Get a Users Perticuler Data
  // ListAllRoles: async (req: Request, res: Response) => {
  //   try {
  //     let auther = await rbac();
  //     const rawRoles = await auther.GetEnforcer().getAllSubjects();

  //     const newArray = [];
  //     let index_ = rawRoles.length - 1;
  //     for (const i in rawRoles) {
  //       newArray.push(rawRoles[index_]);
  //       index_--;
  //     }
  //     const data = {
  //       count: rawRoles.length,
  //       data: [...newArray]
  //     };

  //     return response.success(res, data, res.t('CRUD.Success'));
  //   } catch (error) {
  //     return response.catchError(res, error);
  //   }
  // },

  // getAll: async (req: Request, res: Response) => {
  //   try {
  //     let auther = await rbac();
  //     const rawRoles = await auther.GetEnforcer().getAllSubjects();

  //     const newArray = [];
  //     let index_ = rawRoles.length - 1;
  //     for (const i in rawRoles) {
  //       newArray.push(rawRoles[index_]);
  //       index_--;
  //     }
  //     const data = {
  //       count: rawRoles.length,
  //       data: [...newArray]
  //     };

  //     return response.success(res, data, res.t('CRUD.Success'));
  //   } catch (error) {
  //     return response.catchError(res, error);
  //   }
  // },

  // //* Get the List of Permissions Role has
  // ListRolePermissions: async (req: Request, res: Response) => {
  //   try {
  //     const Schema = joi.object().keys({
  //       //@ts-ignore
  //       name: joi.string().trim().required()
  //     });
  //     const { error, value } = Schema.validate(req.query, {
  //       abortEarly: true
  //     });
  //     if (error) {
  //       return response.validation(res, error);
  //     }
  //     let auther = await rbac();
  //     let rawpermissions = await auther
  //       .GetEnforcer()
  //       ?.getImplicitPermissionsForUser(value.name);
  //     let roles = await auther
  //       .GetEnforcer()
  //       ?.getImplicitRolesForUser(value.name);
  //     // console.log(rawpermissions);
  //     return response.success(
  //       res,
  //       {
  //         roles,
  //         permissions: await RoleController?._formatPermissions(
  //           rawpermissions,
  //           res.t
  //         )
  //       },
  //       res.t('CRUD.Success')
  //     );
  //   } catch (error) {
  //     return response.catchError(res, error);
  //   }
  // },

  // //* Get List of Own Permissions for User
  // ListMyPermissions: async (req: Request, res: Response) => {
  //   try {
  //     let auther = await rbac();
  //     let rawpermissions = await auther
  //       .GetEnforcer()
  //       .getImplicitPermissionsForUser(req.user?.role);
  //     let roles = await auther
  //       .GetEnforcer()
  //       .getImplicitRolesForUser(req.user?.role);
  //     // console.log(rawpermissions);
  //     return response.success(
  //       res,
  //       {
  //         roles,
  //         permissions: await RoleController._formatPermissions(
  //           rawpermissions,
  //           res.t
  //         )
  //       },
  //       res.t('CRUD.Success')
  //     );
  //   } catch (error) {
  //     return response.catchError(res, error);
  //   }
  // },

  // //* Get the List of Roles a User has
  // ListMyRoles: async (req: Request, res: Response) => {
  //   try {
  //     let auther = await rbac();
  //     let rawRoles = await auther
  //       .GetEnforcer()
  //       .getImplicitRolesForUser(req.user!._id + '');
  //     return response.success(res, rawRoles, res.t('CRUD.Success'));
  //   } catch (err) {
  //     return response.catchError(res, err);
  //   }
  // },

  // //* Get the List of Permissions a User has
  // ListUserPermissions: async (req: Request, res: Response) => {
  //   try {
  //     const Schema = joi.object().keys({
  //       //@ts-ignore
  //       id: joi.string().required()
  //     });
  //     const { error, value } = Schema.validate(req.query, {
  //       abortEarly: true
  //     });
  //     if (error) {
  //       return response.validation(res, error);
  //     }
  //     let auther = await rbac();
  //     let rawpermissions = await auther
  //       .GetEnforcer()
  //       .getImplicitPermissionsForUser(value.id + '');

  //     const formatedPermissions = await RoleController._formatPermissions(
  //       rawpermissions,
  //       res.t
  //     );
  //     return response.success(res, formatedPermissions, res.t('CRUD.Success'));
  //   } catch (error) {
  //     return response.catchError(res, error);
  //   }
  // },

  // // Create a role and add permissions to the role
  // CreateRole: async (req: Request, res: Response) => {
  //   try {
  //     let auther = await rbac();
  //     let objs = await auther.GetEnforcer().getAllObjects();
  //     let acts = (await auther.GetEnforcer().getAllActions()).filter(
  //       (act: string) => act
  //     );
  //     const rawRoles = await auther.GetEnforcer().getAllSubjects();
  //     const Schema = joi.object().keys({
  //       title: joi.string().trim().max(20).required(),
  //       permissions: joi.array().items(
  //         joi.object().keys({
  //           obj: joi.string().only(),
  //           acts: joi
  //             .array()
  //             .items(
  //               joi
  //                 .string()
  //                 .only()
  //                 .valid(
  //                   'update',
  //                   'create',
  //                   'manage',
  //                   'list',
  //                   'get',
  //                   'menu',
  //                   'log',
  //                   'comment',
  //                   'delete',
  //                   'modify'
  //                 )
  //             )
  //         })
  //       )
  //     });
  //     const { error, value } = Schema.validate(req.body, { abortEarly: true });
  //     if (error) {
  //       return response.validation(res, error);
  //     }
  //     if (rawRoles.includes(value.title)) {
  //       return response.customError(
  //         res,
  //         res.t('CRUD.Already_Exist', { name: res.t('joi.field.role') }),
  //         400
  //       );
  //     }
  //     if (value.permissions) {
  //       if (value.permissions.length === 0) {
  //         return response.customError(
  //           res,
  //           res.t('CRUD.Required', { name: res.t('joi.field.permissions') }),
  //           404
  //         );
  //       } else {
  //         let objCounter = 0;
  //         let actCounter = 0;
  //         for (const perm of value.permissions) {
  //           if (perm.obj && perm.obj !== '') objCounter++;
  //           if (perm.acts && perm.acts.length > 0) actCounter++;
  //         }
  //         if (objCounter === 0 || actCounter === 0)
  //           return response.customError(
  //             res,
  //             res.t('CRUD.Required', { name: res.t('joi.field.permissions') }),
  //             404
  //           );
  //       }
  //     }

  //     await Promise.all(
  //       value.permissions.map(async (o: any) => {
  //         await Promise.all(
  //           o.acts.map(async (act: string) => {
  //             await auther.AddPermission(value.title, o.obj, act);
  //           })
  //         );
  //       })
  //     );
  //     return res.send(value);
  //   } catch (error) {
  //     console.log(error);
  //     return response.catchError(res, error);
  //   }
  // },

  // //*Add User to a Role
  // AddRoleToUser: async (req: Request, res: Response) => {
  //   try {
  //     let auther = await rbac();
  //     //FIXME only return roles
  //     let rawRoles = await auther.GetEnforcer().getAllSubjects();

  //     const Schema = joi.object().keys({
  //       user_id: joi.string().required(),
  //       role: joi
  //         .string()
  //         .only()
  //         .allow(...rawRoles)
  //     });
  //     const { error, value } = Schema.validate(req.body, { abortEarly: true });
  //     if (error) {
  //       return response.validation(res, error);
  //     }

  //     // const user = await findUser({ id: value.user_id })
  //     await findAndUpdateUser({ _id: value.user_id }, { role: value.role });

  //     let ok = await auther
  //       .GetEnforcer()
  //       .addRoleForUser(value.user_id + '', value.role);
  //     return response.success(res, ok, res.t('CRUD.Success'));
  //   } catch (error) {
  //     return response.catchError(res, error);
  //   }
  // },

  // //* Delete a Role and Permissions to the Role
  // DeleteRole: async (req: Request, res: Response) => {
  //   try {
  //     let auther = await rbac();
  //     const Schema = joi.object().keys({
  //       title: joi.string().trim().required()
  //     });
  //     const { error, value } = Schema.validate(req.query, {
  //       abortEarly: true
  //     });
  //     if (error) {
  //       return response.validation(res, error);
  //     }
  //     let deleteRoles = await auther.GetEnforcer().deleteRole(value.title);
  //     return response.success(res, deleteRoles, res.t('CRUD.Deleted'));
  //   } catch (error) {
  //     return response.catchError(res, error);
  //   }
  // },

  // DeleteAllRoles: async (req: Request, res: Response) => {
  //   try {
  //     let auther = await rbac();
  //     let rawRoles = await auther.GetEnforcer().getAllSubjects();
  //     rawRoles = rawRoles.filter((item: any) => item !== StaticRoleEnum.admin);
  //     const deletedRoles = [];
  //     for (const role of rawRoles) {
  //       const deletedRole = await auther.GetEnforcer().deleteRole(role);
  //       deletedRoles.push(deletedRole);
  //     }
  //     return response.success(res, deletedRoles, res.t('CRUD.Deleted'));
  //   } catch (error) {
  //     return response.catchError(res, error);
  //   }
  // },

  // DeletePermissions: async (req: Request, res: Response) => {
  //   try {
  //     let auther = await rbac();
  //     const Schema = joi.object().keys({
  //       permissions: joi.array().items(joi.object()).required()
  //     });
  //     const { error, value } = Schema.validate(req.body, {
  //       abortEarly: true
  //     });
  //     if (error) {
  //       return response.validation(res, error);
  //     }
  //     const permissions: any[] = value.permissions;
  //     for (const perm of permissions) {
  //       if (perm.obj && perm.act) {
  //         await auther.GetEnforcer().deletePermission(perm.obj, perm.act);
  //       } else {
  //         await auther.GetEnforcer().deletePermission(perm.obj);
  //       }
  //     }
  //     return response.success(res, {}, res.t('CRUD.Deleted'));
  //   } catch (error) {
  //     console.error('Error finding roles and removing permissions:', error);
  //     throw error;
  //   }
  // },

  // GetMangesHaveThisRole: async (title: string) => {
  //   let auther = await rbac();
  //   let ids: any[] = [];
  //   let users = await User.find({}).select('_id');
  //   await Promise.all(
  //     users.map(async (el) => {
  //       let roles = await auther
  //         .GetEnforcer()
  //         .getImplicitRolesForUser(el._id + '');
  //       roles.map((role: any) => {
  //         if (role == title) ids.push(el._id + '');
  //       });
  //     })
  //   );
  //   return ids;
  // },

  // RoleBackManges: async (ids: string[], title: string) => {
  //   let auther = await rbac();
  //   await Promise.all(
  //     ids.map(async (id) => {
  //       await auther.GetEnforcer().addRoleForUser(id, title);
  //     })
  //   );
  //   return true;
  // },

  // //* Update a Role
  // UpdateRole: async (req: Request, res: Response) => {
  //   try {
  //     let auther = await rbac();
  //     let objs = await auther.GetEnforcer().getAllObjects();
  //     let acts = await auther.GetEnforcer().getAllActions();
  //     const rawRoles = await auther.GetEnforcer().getAllSubjects();
  //     const Schema = joi.object().keys({
  //       title: joi.string().trim().max(20).required(),
  //       permissions: joi.array().items(
  //         joi.object().keys({
  //           obj: joi.string().only(),
  //           acts: joi
  //             .array()
  //             .items(
  //               joi
  //                 .string()
  //                 .only()
  //                 .valid(
  //                   'update',
  //                   'create',
  //                   'manage',
  //                   'list',
  //                   'get',
  //                   'menu',
  //                   'log',
  //                   'comment',
  //                   'delete',
  //                   'modify'
  //                 )
  //             )
  //         })
  //       )
  //     });

  //     const { error, value } = Schema.validate(req.body, { abortEarly: true });
  //     if (error) {
  //       return response.validation(res, error);
  //     }
  //     if (value.title == 'admin' && req.user?.role !== 'superadmin')
  //       return response.customError(
  //         res,
  //         res.t('text.cantModifyAdminRole'),
  //         400
  //       );
  //     if (!value.newTitle) {
  //       value.newTitle = value.title;
  //     } else {
  //       // const roles = await roleS
  //       if (rawRoles.includes(value.newTitle)) {
  //         return response.customError(
  //           res,
  //           res.t('CRUD.Already_Exist', { name: res.t('joi.field.role') }),
  //           400
  //         );
  //       }
  //     }

  //     if (value.permissions) {
  //       if (value.permissions.length === 0) {
  //         return response.customError(
  //           res,
  //           res.t('CRUD.Required', { name: res.t('joi.field.permissions') }),
  //           404
  //         );
  //       } else {
  //         let objCounter = 0;
  //         let actCounter = 0;
  //         for (const perm of value.permissions) {
  //           if (perm.obj && perm.obj !== '') objCounter++;
  //           if (perm.acts && perm.acts.length > 0) actCounter++;
  //         }
  //         if (objCounter === 0 || actCounter === 0)
  //           return response.customError(
  //             res,
  //             res.t('CRUD.Required', { name: res.t('joi.field.permissions') }),
  //             404
  //           );
  //       }
  //     }
  //     let deleteRoles = await auther.GetEnforcer().deleteRole(value.title);
  //     let ids = await RoleController.GetMangesHaveThisRole(value.title);
  //     await auther.GetEnforcer().deleteRole(value.title);
  //     // await Promise.all(
  //     // value.permissions.map(async (o: any) => {
  //     for (const o of value.permissions) {
  //       // await Promise.all(
  //       // o.acts.map(async (act: string) => {});
  //       for (const act of o.acts) {
  //         await auther.AddPermission(value.newTitle, o.obj, act);
  //       }
  //       // );
  //     }
  //     // })
  //     // );
  //     await RoleController.RoleBackManges(ids, value.newTitle);
  //     let { data } = await findUsers({ role: value.title });
  //     for (let index = 0; index < data.length; index++) {
  //       await auther
  //         .GetEnforcer()
  //         .addRoleForUser(data[index]._id + '', value.newTitle);
  //     }
  //     return response.success(res, value, res.t('CRUD.Update'));
  //   } catch (error) {
  //     return response.catchError(res, error);
  //   }
  // }
};
