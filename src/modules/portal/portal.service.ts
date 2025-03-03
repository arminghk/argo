import { Injectable } from '@nestjs/common';
import { registerNewUserDTO } from './dto/portal.dto';
import { InjectModel } from '@nestjs/mongoose';
import { PortalUser } from './model/protalUser.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class PortalAuthService {
  constructor(
    @InjectModel(PortalUser.name) private portalUserModel: Model<PortalUser>,
  ) { }
  async registerNewUser(body: registerNewUserDTO) {
    const user = await this.portalUserModel.findOne({ username: body.username });
    if (user) {
      return "User already exists"
    }
    body.password = await this.hash(body.password);
    const newUser = await this.portalUserModel.create(body);
    if (!newUser) {
      return  "something went wrong"
    }
    const token = await this.UserGen(newUser);
    return {
      message:"User created successfully",
      token
    }
   
  }
  // async login (req: Request, res: Response) {
  //   const body = req.body;
  //   const user = await this.portalUserModel.findOne({ email: body.email });
  //   console.log(user);
  // }

  async hash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }
  async compare(password: string, Hash: string): Promise<boolean> {
    return await bcrypt.compare(password, Hash);
  }

   async UserGen(user , type = "user") {
    try {
      let token = jwt.sign({ _type: "user" }, 'asjnqwen@!@#$', {
        subject: user!._id + "",
        expiresIn: '365d',
      });
      return { token };
    } catch (error) {
      throw error;
    }
  }
    async portalUserVerify(token: string) {
      try {
        let decode = await jwt.verify(token, process.env.JWT_SECRET_KEY as string);
        let portalUser = await this.portalUserModel.findOne({ _id: decode.sub });
        if (!portalUser) {
          'Your session has expired'
        }
        return { portalUser};
      } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
  
        return'Invalid token signature'
        }
        return 'Internal server error'
      }
    }
  
}
