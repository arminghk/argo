import { IsString, Matches, Length } from 'class-validator';

export class SendCodeDto {
  @IsString()
  @Matches(/^[0-9]{10}$/, { message: 'Phone number must be exactly 10 digits' })
  mobile: string;
}

export class RegisterPassengerDto {
  @IsString()
  @Matches(/^[0-9]{10}$/, { message: 'Phone number must be exactly 10 digits' })
  mobile: string;

  @IsString()
  @Length(3, 8, { message: 'Code must be between 3 and 8 characters' })
  code: string;
}
