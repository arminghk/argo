import { IsString } from "class-validator";

export class registerNewUserDTO {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  email: string;
  
  @IsString()
  ID: string;

}
export class loginUserDTO {
  @IsString()
  username: string;

  @IsString()
  password: string;


}