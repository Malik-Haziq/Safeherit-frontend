export const SIGN_UP = "/api-auth/signup"
export const LOGIN = "/api-auth/sessionLogin"
export const LOGIN_WITH_EMAIL_PASSWORD = "/api-auth/login"
export const LOGOUT = "/api-auth/sessionLogout"

export const VALIDATORS = "/api-validator"
export const ALL_VALIDATORS = "/api-validator/list"

export const VALIDATION = "/api-validator/as-validator"

export const BENEFICIARIES = "/api-beneficiary"
export const ALL_BENEFICIARIES = "/api-beneficiary/list"

export const BENEFICIARY_ASSETS = "/api-beneficiary/as-beneficiary/assets"
export const BENEFICIARY_ASSET_BY_ID =
  "/api-beneficiary/as-beneficiary/asset/byId"
export const TESTMENTS = "/api-beneficiary/as-beneficiary/testament"

export const ASSETS = "/api-asset"
export const ALL_ASSETS = "/api-asset/list"
export const CURRENCY_RATES = "/api-asset/currency-rates"

export const GET_DATA = "/api-dashboard/data"

export const AUTHENTICATE_SESSION = "/api-auth/sessionActive"

export const GET_USER = "/api-auth"
export const PUBLIC_KEY = "/api-auth/public-key"

export const GET_USERS = "/api-admin/users"
export const CREATE_USER = "/api-admin/create-user"
export const DELETE_USER_REQUEST = "/api-admin/delete-user-request"
export const ADMIN_DELETE_REQUEST =
  "/api-admin/delete-user-requests/byRequester"
export const USER_ACCOUNT_STATUS = "/api-admin/edit-account-status"

export const DELETE_USER = "/api-superAdmin/delete-user"
export const SUPER_ADMIN_DELETE_REQUESTS = "/api-superAdmin/delete-requests"
export const APPROVE_DELETION_REQUEST =
  "/api-superAdmin/delete-requests/approve"
export const REJECT_DELETION_REQUEST = "/api-superAdmin/delete-requests/reject"
export const RE_ADD_DELETION_REQUEST = "/api-superAdmin/delete-requests/request"

export const PULSE_CHECK = "/api-pulseCheck"

export const CREATE_PAYMENT_SESSION = "/api-payment/create-subscription-session"
export const CREATE_PAYMENT_SESSION_PORTAL =
  "/api-payment/create-portal-session"
export const OFFER_FREE_TRIAL = "/api-admin/trail"
export const ADMIN_UPDATE_PULSE_CHECK = "/api-admin/pulse-check"
