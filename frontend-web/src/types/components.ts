export interface SelectOption {
  label: string;
  value: string;
}

export interface User {
  id: string
  name: string
  image: string
  joining_date: Date
  plan: string
  payment_status: string
  account_status: string
  pulse_status: string
}