// eslint-disable
import { PhoneNumberUtil } from "google-libphonenumber"
const phoneUtil = PhoneNumberUtil.getInstance()

export function isValidEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function isValidPhoneWithRegion(phone: string) {
  try {
    const countryCode = phoneUtil.getRegionCodeForNumber(phoneUtil.parse(phone))
    const phoneNumber = phoneUtil.parse(phone, countryCode)
    return phoneUtil.isValidNumber(phoneNumber)
  } catch (e) {
    return false
  }
}

export function isStrongPassword(password: any) {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]).{8,}$/
  return regex.test(password)
}

export function convertToCamelCase(input: string) {
  const withoutSpaces = input.replace(/\s+/g, "")
  const camelCase =
    withoutSpaces.charAt(0).toLowerCase() + withoutSpaces.slice(1)
  return camelCase
}

export function isValidFacebook(phone: string) {
  const regex = /^https?:\/\/(www\.)?facebook\.com\/.*/i
  return regex.test(phone)
}

export function isValidInstagram(phone: string) {
  const regex = /^https?:\/\/(www\.)?instagram\.com\/.*/i
  return regex.test(phone)
}

export function isValidTwitter(phone: string) {
  const regex = /^https?:\/\/(www\.)?twitter\.com\/.*/i
  return regex.test(phone)
}

export function formatCurrency(price: number) {
  const formattedValue = new Intl.NumberFormat("en-US").format(
    Math.trunc(price),
  )
  return formattedValue
}
