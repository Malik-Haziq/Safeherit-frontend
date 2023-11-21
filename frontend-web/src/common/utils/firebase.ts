import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import {
  multiFactor,
} from "@firebase/auth";
import { auth } from '@/firebase';
import { ApplicationVerifier, PhoneAuthProvider, PhoneMultiFactorGenerator, User } from 'firebase/auth';

const storage = getStorage();

export const getFileFromFirebase = async (URL: string) => {
  const fileRef = ref(storage, URL);
  return getDownloadURL(fileRef)
}

export function verifyIfUserIsEnrolled() {
  if (auth && auth.currentUser) {
    const enrolledFactors = multiFactor(auth.currentUser).enrolledFactors;
    return enrolledFactors.length > 0;
  }
  else {
    alert("User not found")
    return false
  }
}

export async function verifyPhoneNumber(
  user: User,
  phoneNumber: string,
  recaptchaVerifier: ApplicationVerifier
): Promise<false | string> {
  const session = await multiFactor(user).getSession();
  const phoneInfoOptions = {
    phoneNumber,
    session
  }

  const phoneAuthProvider = new PhoneAuthProvider(auth);
  try {
    return await phoneAuthProvider.verifyPhoneNumber(phoneInfoOptions, recaptchaVerifier);
  }catch (e) {
    return false;
  }
}

export async function enrollUser(
  user: User,
  verificationCodeId: string,
  verificationCode: string
) {
  const phoneAuthCredential = PhoneAuthProvider.credential(verificationCodeId, verificationCode);
  const multiFactorAssertion = PhoneMultiFactorGenerator.assertion(phoneAuthCredential);

  try {
    await multiFactor(user).enroll(multiFactorAssertion, 'Personal Phone Number');
    return true;
  }catch (e) {
    return false;
  }
}