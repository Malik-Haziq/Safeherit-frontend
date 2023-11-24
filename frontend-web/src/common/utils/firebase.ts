import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import {
  MultiFactorError,
  MultiFactorResolver,
  getMultiFactorResolver,
  multiFactor,
} from "@firebase/auth";
import { auth } from '@/firebase';
import { ApplicationVerifier, PhoneAuthProvider, PhoneMultiFactorGenerator, User } from 'firebase/auth';
import { toast } from '@/components';

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
    toast("User not found", "error")
    return false
  }
}

export async function verifyUserEnrolled(
  verificationMFA: {verificationId: string, resolver: MultiFactorResolver},
  verificationCode: string
) {
  const {verificationId, resolver} = verificationMFA;
  const credentials = PhoneAuthProvider.credential(verificationId, verificationCode);
  const multiFactorAssertion = PhoneMultiFactorGenerator.assertion(credentials);
  try {
    return await resolver.resolveSignIn(multiFactorAssertion);
  }
  catch (e) {
    toastError(e)
    return false;
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
  }
  catch (e) {
    toastError(e)
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
  }
  catch (e) {
    toastError(e)
    return false;
  }
}

export async function verifyUserMFA(
  error: MultiFactorError,
  recaptchaVerifier: ApplicationVerifier,
  selectedIndex: number
): Promise<false | { verificationId: string, resolver: MultiFactorResolver} | void> {
  const resolver = getMultiFactorResolver(auth, error);

  if (resolver.hints[selectedIndex].factorId === PhoneMultiFactorGenerator.FACTOR_ID) {
    const phoneInfoOptions = {
      multiFactorHint: resolver.hints[selectedIndex],
      session: resolver.session
    }

    const phoneAuthProvider = new PhoneAuthProvider(auth);
    try {
      const verificationId = await phoneAuthProvider.verifyPhoneNumber(phoneInfoOptions, recaptchaVerifier);
      return { verificationId, resolver }
    }catch (e) {
      toastError(e)
      return false
    }
  }
}

function toastError (e: any) {
  const errorWithCode = e as { code?: string };

  if (errorWithCode && errorWithCode.code) {
    toast(errorWithCode.code, "error");
  }
}