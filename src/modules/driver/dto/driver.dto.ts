import { IsString, Matches, Length,IsOptional,IsBoolean  } from 'class-validator';

export class SendCodeDto {
  @IsString()
  @Matches(/^[0-9]{10}$/, { message: 'Phone number must be exactly 10 digits' })
  mobile: string;
}

export class RegisterDriverDto {
  @IsString()
  @Matches(/^[0-9]{10}$/, { message: 'Phone number must be exactly 10 digits' })
  mobile: string;

  @IsString()
  @Length(3, 8, { message: 'Code must be between 3 and 8 characters' })
  code: string;

  @IsOptional() 
  @IsString()
  @Length(1, 32, { message: 'First name must be between 1 and 32 characters' })
  first_name?: string;

  @IsOptional()  
  @IsString()
  @Length(1, 64, { message: 'Last name must be between 1 and 64 characters' })
  last_name?: string;

  @IsOptional()  
  @IsString()
  @Length(3, undefined, { message: 'Referral code must be at least 3 characters' })
  referral_code?: string;

  
  @IsOptional()
  @IsString()
  invitation_code?: string; 

  @IsOptional()
  @IsString()
  ID?: string; 

  @IsOptional()
  @IsString()
  deleted?: string; 

  @IsOptional()
  @IsBoolean()
  account_information?: boolean;

  
  @IsOptional()
  @IsString()
  passenger_id
}