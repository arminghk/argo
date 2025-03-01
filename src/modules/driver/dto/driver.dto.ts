import { Type } from 'class-transformer';
import { IsString, Matches, Length,IsOptional,IsBoolean, IsNumber, IsDate, ValidateNested, IsArray, IsEnum, IsMongoId  } from 'class-validator';

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

export class CarPicturesDto {
  @IsString()
  front: string;

  @IsString()
  back: string;

  @IsString()
  left: string;

  @IsString()
  right: string;

  @IsString()
  inside: string;
}

export class CreateCarDTO {
  @IsString()
  car_brand: string;

  @IsString()
  car_model: string;

  @IsString()
  plate: string;

  @IsString()
  year: string;

  @IsString()
  color: string;

  @IsString()
  vin: string;

  @IsString()
  iban: string;

  @ValidateNested()
  @Type(() => CarPicturesDto)
  car_pictures: CarPicturesDto;

  @IsString()
  taxi_transport_license: string;

  @IsString()
  vehicle_registration_certificate_front: string;

  @IsOptional()
  @IsString()
  vehicle_registration_certificate_back?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  other_documents?: string[];

  @IsBoolean()
  is_owner: boolean;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  default?: boolean;

  @IsOptional()
  @IsEnum(['active', 'deactive'])
  status?: string;

  @IsOptional()
  @IsString()
  ID?: string;

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  drivers?: string[];

  @IsOptional()
  @IsString()
  car_phone?: string;

  @IsOptional()
  @IsString()
  plaque?: string;

  @IsOptional()
  @IsString()
  car_color?: string;

  @IsOptional()
  @IsString()
  IBAN?: string;

  @IsOptional()
  @IsString()
  chassis_number?: string;

  @IsOptional()
  @IsString()
  year_construction?: string;

  @IsOptional()
  @IsEnum(['myself', 'other'])
  car_operator?: string;

  @IsOptional()
  @IsNumber()
  commission?: number;

  @IsOptional()
  @IsNumber()
  score?: number;

  @IsOptional()
  @IsNumber()
  average_score?: number;

  @IsOptional()
  @IsString()
  rating?: string;

  @IsOptional()
  @IsNumber()
  credit?: number;

  @IsOptional()
  @IsString()
  car_card_url?: string;

  @IsOptional()
  @IsString()
  car_url?: string;

  @IsOptional()
  @IsString()
  documents_url?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsNumber()
  locationUpdatedAt?: number;

  @IsOptional()
  @ValidateNested()
  // @Type(() => PhoneDataDto) // فرض می‌کنیم که PhoneDataDto در جایی تعریف شده است
  phoneData

  @IsOptional()
  @IsString()
  car_status?: string;

  @IsOptional()
  @IsEnum(['yes', 'no'])
  deleted?: string;

  @IsOptional()
  @IsNumber()
  lastLoginAt?: number;

  @IsOptional()
  @IsString()
  fcmToken?: string;

  @IsOptional()
  @IsString()
  extraData?: string;

  @IsOptional()
  @IsString()
  sessionid?: string;

  @IsOptional()
  // @IsEnum(AppLockEnum)
  app_lock;

  @IsOptional()
  @IsNumber()
  baby_seat?: number;

  @IsOptional()
  @IsNumber()
  luggage?: number;

  @IsOptional()
  @IsBoolean()
  pet?: boolean;

  @IsOptional()
  @IsNumber()
  createdAt?: number;

  @IsOptional()
  @IsNumber()
  updatedAt?: number;
}