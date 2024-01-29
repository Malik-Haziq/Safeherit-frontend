export interface User {
  id: string
  displayName: string
  profile_image: string
  joining_date: string
  plan: string
  payment_status: string
  account_status: string
  pulse_status: string
  email: string
}

export interface Beneficiary {
  name: string
  primary_email: string
  backup_email: string
  backup_email2: string
  phone_number: string
  backup_phone_number: string
  facebook_link: string
  instagram_username: string
  twitter_username: string
  personalized_message: string
  personalized_video: string
  profile_image: string
  public_key: string
}

export interface Request {
  id: string
  reason: string
  requestedByEmail: string
  userEmailToDelete: string
  status: string
  statusUpdates: []
  createdAt: []
}
