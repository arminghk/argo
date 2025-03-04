export enum StaticRoleEnum {
  admin = 'admin',
  carowner = 'fleet',
  driver = 'driver',
}

export enum ProjectNameEnum {
  nikohamrah = 'nikohamrah'
}

export enum TransactionTypeEnum {
  increase_credit_penalty = 'increase_credit_penalty',
  decrease_credit_penalty = 'decrease_credit_penalty',
  tipping = 'tipping',
  charge_credit = 'charge_credit',
  end_trip_commission = 'end_trip_commission',
  annual_award = 'annual_award',
  semester_award = 'semester_award',
  driver_penalty_accidental_passenger = 'driver_penalty_accidental_passenger',
  passenger_pays_trip_Fare = 'passenger_pays_trip_Fare',
  admin_register_transaction = 'admin_register_transaction',
  driver_application_membership = 'driver_application_membership',
  passenger_representative_bonus = 'passenger_representative_bonus'
}

export enum TransactionUserTypeEnum {
  driver = 'driver',
  passenger = 'passenger',
  carOwner = 'carOwner',
  car = 'car',
  companyAgent = 'companyAgent',
  user = 'user'
}

export enum QueuesBullEnum {
  searchAgain = 'search_again',
  endOfTravelRequestPeriod = 'end_of_travel_request_period',
  passenger = 'passenger',
  driver = 'driver',
  driverFirst = 'driverFirst'
}

export enum SafetyShieldStatusEnum {
  not_checked = 'بررسی نشده',
  pending = 'در حال بررسی',
  not_important = 'مهم نبود',
  emergency_relief = 'فوریت های امدادی',
  checked_out = 'رسیدگی شد'
}

export enum DriverTripStatusEnum {
  next = 'next',
  current = 'current',
  deactive = 'deactive',
  cancelled = 'canceled'
}

export enum StatusEnum {
  active = 'active',
  deactive = 'deactive',
  blocked = 'blocked'
}

export enum AwardHistoryTimeTypeEnum {
  annual = 'annual',
  first_semester = 'first_semester',
  second_semester = 'second_semester'
}

export enum AwardHistoryUserTypeEnum {
  passenger = 'passenger',
  driver = 'driver',
  car = 'car'
}

export enum AppLockEnum {
  none = 'none',
  end_current_trip = 'end_current_trip'
}

export enum NoteTypeEnum {
  PassengerTrip = 'PassengerTrip'
}

export enum StaticServiceNameEnum {
  riding = 'سواری',
  riding_vip = 'سواری-VIP',
  bus = 'اتوبوس',
  bus_vip = 'اتوبوس-VIP',
  van = 'ون',
  van_vip = 'ون-VIP',
  minibus = 'مینی بوس'
}

export enum FlagEnum {
  green = 'green',
  red = 'red'
}
