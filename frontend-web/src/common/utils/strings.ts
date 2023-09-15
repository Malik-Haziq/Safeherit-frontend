export function isValidEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
export function isValidPhone(phone: string) {
  const phoneRegex = /^\+?\d+$/;
  return phoneRegex.test(phone);
}
export function isValidFacebook(phone: string) {
  const phoneRegex = /^(https?:\/\/)?(www\.)?facebook\.com\/[A-Za-z0-9.]+\/?$/;
  return phoneRegex.test(phone);
}