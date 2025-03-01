import { Type } from 'class-transformer';
import { IsString, Matches, Length,IsOptional,IsBoolean, IsNumber, IsDate, ValidateNested  } from 'class-validator';

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


export class UpdateDriverProfileDTO{
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsString()
  mobile: string;

  @IsString()
  referral_code: string;

  @IsString()
  invite_code: string;

  @IsBoolean()
  account_information: boolean;

  @IsNumber()
  id_card_cumber: number;

  @IsString()
  address: string;

  @IsNumber()
  post_code: number;

  @IsDate()
  @Type(() => Date)
  birthday: Date;

  @IsString()
  email: string;

  @IsNumber()
  license_experience_duration: number;

  @IsBoolean()
  status: boolean;

  @ValidateNested()
  // @Type(() => DocumentDto)
  driver_license;

  @IsString()
  taxi_operation_license: string;

  @IsDate()
  @Type(() => Date)
  taxi_operation_expirationDate: Date;

  @ValidateNested()
  // @Type(() => DocumentDto)
  id_card;

  @IsDate()
  @Type(() => Date)
  id_card_operation_expiration_date: Date;

  @ValidateNested()
  // @Type(() => DocumentDto)
  taxi_driver_license;

  @IsDate()
  @Type(() => Date)
  taxi_driver_expiration_date: Date;

  @IsString()
  vehicle_photo: string;

  @IsString()
  profile_photo: string;

  @IsOptional()
  @IsString()
  other_documents?: string;

  @IsOptional()
  @IsString()
  taxi_point_certificate?: string;
}