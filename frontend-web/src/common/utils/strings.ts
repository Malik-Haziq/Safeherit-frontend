import { PhoneNumberUtil } from 'google-libphonenumber';
const phoneUtil = PhoneNumberUtil.getInstance();

export function isValidEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPhoneWithRegion(phone: string) {
  try {
    const countryCode = phoneUtil.getRegionCodeForNumber(phoneUtil.parse(phone));
    const phoneNumber = phoneUtil.parse(phone, countryCode);
    return phoneUtil.isValidNumber(phoneNumber);
  } catch (e) {
    return false;
  }
}

export function isValidFacebook(phone: string) {
  const phoneRegex = /^(https?:\/\/)?(www\.)?facebook\.com\/[A-Za-z0-9.]+\/?$/;
  return phoneRegex.test(phone);
}

export function isStrongPassword (password: any) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;
  return regex.test(password);
};

export function convertToCamelCase(input: string) {
  const withoutSpaces = input.replace(/\s+/g, '');
  const camelCase = withoutSpaces.charAt(0).toLowerCase() + withoutSpaces.slice(1);
  return camelCase;
}