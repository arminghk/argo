import { IsString } from "class-validator";

export class registerNewUserDTO {
  @IsString()
  username: string;

  @IsString()
  password: string;


}
export class loginUserDTO {
  @IsString()
  username: string;

  @IsString()
  password: string;


}