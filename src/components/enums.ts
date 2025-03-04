const StaticRole = [
  'Car Owner',
  'Car Representative',
  'Car Driver',
  'Admin',
  'Company Representative'
];
const Status = ['active', 'deactive'];
const UserStatus = ['active', 'deactive', 'blocked'];
const PassengerStatus = ['active', 'deactive', 'blocked'];
const ClientStatus = ['active', 'deactive'];
const SmsTemplate = [
  'login-code-portal',
  'login-code-app',
  'login-code-app-forget',
  'register-driver',
  'age-condition',
  'update-agent',
  'update-car',
  'change-password'
];
const ServicesArray = ['Car', 'Bus'];
const CompanyServiceFeature = ['On-road Service', 'Station Service'];
const CarOperator = ['myself', 'other', 'both'];
const CarRating = ['Normal', 'Good', 'Excellent'];
const CompanyRating = ['Bad', 'Good', 'Excellent', 'Normal'];
const CarStatus = [
  'document_sended',
  'pending',
  'issue_fixed',
  'active',
  'conditional',
  'blocked_systematically',
  'blocked_by_admin',
  'blocked_by_request'
];
const CarOwnerStatus = [
  'documents_uploaded',
  'under_review',
  'issue_fixed',
  'active',
  'conditional',
  'blocked_by_admin'
];
const DriverStatus = [
  'documents_uploaded',
  'under_review',
  'issue_fixed',
  'active',
  'conditional',
  'blocked_systematically',
  'blocked_by_admin',
  'blocked_by_request',
  'age_or_license_issue'
];
const AgentStatus = [
  'active',
  'blocked_by_admin',
  'documents_uploaded',
  'under_review',
  'issue_fixed'
];
const CompanyStatus = [
  'documents_uploaded',
  'under_review',
  'issue_fixed',
  'active',
  'conditional',
  'blocked_by_admin'
];
const ChangesCollectionsStatus = [
  'unchecked',
  'approved',
  'rejected',
  'previously_approved'
];
const FeedbackCategoryTypes = [
  'Passenger',
  'Driver',
  'Travel Company',
  'Car Owner'
];
const FeedbackStatus = [
  'waiting',
  'under_review',
  'under_review_important',
  'reviewed',
  'reviewed_important'
];
const DriverTripStatus = ['next', 'current', 'deactive', 'canceled'];
const PassengerTripStatus = [
  'canceledByPassenger',
  'canceledByDriver',
  'done',
  'unpaid',
  'findForDriver',
  'waitForAcceptDriver',
  'waitForAcceptPassenger',
  'driverFounded',
  'passengerAtOrigin',
  'driverIsClose',
  'driverArrived',
  'cancelNoPassenger',
  'cancelNoDriver',
  'traveling',
  'closeToDestination',
  'cancelByAdminAtRequestOfPassenger',
  'cancelByAdminAtRequestOfDriver',
  'cancelByAdmin',
  'cancelForUnpaid',
  'cancelDriverNotFound'
];
const WithdrawalReqStatus = ['deposited', 'canceled', 'pending'];
const PassengerTripType = ['Mid-route', 'City Station'];
const TransactionType = [
  'increase_credit_penalty',
  'decrease_credit_penalty',
  'tipping',
  'charge_credit',
  'end_trip_commission',
  'annual_award',
  'semester_award',
  'driver_penalty_accidental_passenger',
  'passenger_pays_trip_Fare',
  'admin_register_transaction',
  'driver_application_membership',
  'passenger_representative_bonus'
];
const NoteType = ['PassengerTrip'];
const SafetyShieldStatus = [
  'unchecked',
  'under_review',
  'not_important',
  'emergency_services',
  'resolved'
];
const ServiceCategory = ['Bus', 'Minibus', 'Van', 'Car'];
const OfferStatus = [
  'sent',
  'expired',
  'hold',
  'acceptRequestDriver',
  'acceptCertainDriver',
  'acceptUnCertainDriver',
  'passengerConfirmation',
  'onWayPassenger',
  'rejectDriverRequest',
  'passengerCancellation',
  'driverCancellation',
  'cancelAfterHoldPassenger',
  'cancelAfterHoldDriver'
];
const AwardHistoryType = ['bronze', 'silver', 'gold'];
const AwardHistoryTimeType = ['first_semester', 'second_semester', 'annual'];
const CommentDataModels = [
  'User',
  'Car',
  'City',
  'Company',
  'Road',
  'Feedback',
  'FeedbackCategory',
  'Passenger',
  'RoadFare',
  'FareIncrease',
  'DriverTrip',
  'StopTime',
  'MotionGraphic',
  'AwardSetting',
  'Penalty',
  'Commission',
  'PassengerTrip',
  'SMS',
  'TicketCategory',
  'Ticket',
  'SecretariatCategory',
  'DepartedSecretariat',
  'IncomingSecretariat',
  'services',
  'Driver',
  'Ads',
  'Issue',
  'Discount'
];

const LogCommentPermEnum = {
  agent: ['user', 'agent-get'],
  awardSetting: ['award-setting', 'get'],
  car: ['car', 'get'],
  carOwner: ['user', 'carowner-get'],
  city: ['city', 'get'],
  commission: ['commission', 'get'],
  company: ['company', 'get'],
  departedSecretariat: ['departed-secretariat', 'get'],
  driver: ['driver', 'driver-get'],
  driverTrip: ['driver-trip', 'get'],
  passengerTrip: ['passenger-trip', 'get'],
  fareIncrease: ['fare-increase', 'get'],
  feedbackCategory: ['feedback-category', 'get'],
  feedback: ['feedback', 'get'],
  incomingSecretariat: ['incoming-secretariat', 'get'],
  motionGraphic: ['motion-graphic', 'get'],
  passenger: ['passenger', 'get'],
  penalty: ['penalty', 'get'],
  road: ['road', 'get'],
  roadFare: ['road-fare', 'get'],
  secretariatCategory: ['secretariat-category', 'get'],
  stopTime: ['stop-time', 'get'],
  ticketCategory: ['ticket-category', 'get'],
  ticket: ['ticket', 'get'],
  user: ['user', 'get'],
  service: ['services', 'get'],
  ads: ['ads', 'get'],
  trip: ['trip', 'get'],
  issue: ['issue', 'get'],
  discount: ['discount', 'get'],
};

export {
  // StaticRole,
  Status,
  UserStatus,
  CompanyStatus,
  ClientStatus,
  SmsTemplate,
  ServicesArray,
  CarOperator,
  AgentStatus,
  DriverStatus,
  CarOwnerStatus,
  CarRating,
  CompanyRating,
  CarStatus,
  ChangesCollectionsStatus,
  FeedbackCategoryTypes,
  FeedbackStatus,
  CompanyServiceFeature,
  PassengerStatus,
  DriverTripStatus,
  PassengerTripStatus,
  WithdrawalReqStatus,
  TransactionType,
  PassengerTripType,
  NoteType,
  SafetyShieldStatus,
  ServiceCategory,
  OfferStatus,
  AwardHistoryType,
  AwardHistoryTimeType,
  CommentDataModels,
  LogCommentPermEnum,
  StaticRole
};