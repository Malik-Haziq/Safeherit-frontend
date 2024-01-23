import { getStorage, ref, getDownloadURL } from "firebase/storage"
import {
  MultiFactorError,
  MultiFactorResolver,
  getMultiFactorResolver,
  multiFactor,
  sendEmailVerification,
} from "@firebase/auth"
import { auth } from "@/firebase"
import {
  ApplicationVerifier,
  PhoneAuthProvider,
  PhoneMultiFactorGenerator,
  User,
  applyActionCode,
  confirmPasswordReset,
  verifyPasswordResetCode,
} from "firebase/auth"
import { appToast } from "@/components"
import { API } from ".."

const storage = getStorage()

export const getFileFromFirebase = async (URL: string) => {
  const fileRef = ref(storage, URL)
  return getDownloadURL(fileRef)
}

export function verifyIfUserIsEnrolled() {
  if (auth && auth.currentUser) {
    const enrolledFactors = multiFactor(auth.currentUser).enrolledFactors
    return enrolledFactors.length > 0
  } else {
    // toast("User not found", "error")
    return false
  }
}

export async function verifyUserEnrolled(
  verificationMFA: { verificationId: string; resolver: MultiFactorResolver },
  verificationCode: string,
) {
  const { verificationId, resolver } = verificationMFA
  const credentials = PhoneAuthProvider.credential(
    verificationId,
    verificationCode,
  )
  const multiFactorAssertion = PhoneMultiFactorGenerator.assertion(credentials)
  try {
    return await resolver.resolveSignIn(multiFactorAssertion)
  } catch (e) {
    toastFirebaseError(e)
    return false
  }
}

export async function verifyPhoneNumber(
  user: User,
  phoneNumber: string,
  recaptchaVerifier: ApplicationVerifier,
): Promise<false | string> {
  const session = await multiFactor(user).getSession()
  const phoneInfoOptions = {
    phoneNumber,
    session,
  }

  const phoneAuthProvider = new PhoneAuthProvider(auth)
  try {
    return await phoneAuthProvider.verifyPhoneNumber(
      phoneInfoOptions,
      recaptchaVerifier,
    )
  } catch (e) {
    toastFirebaseError(e)
    return false
  }
}

export async function enrollUser(
  user: User,
  verificationCodeId: string,
  verificationCode: string,
) {
  const phoneAuthCredential = PhoneAuthProvider.credential(
    verificationCodeId,
    verificationCode,
  )
  const multiFactorAssertion =
    PhoneMultiFactorGenerator.assertion(phoneAuthCredential)

  try {
    await multiFactor(user).enroll(
      multiFactorAssertion,
      "Personal Phone Number",
    )
    return true
  } catch (e) {
    toastFirebaseError(e)
    return false
  }
}

export async function verifyUserMFA(
  error: MultiFactorError,
  recaptchaVerifier: ApplicationVerifier,
  selectedIndex: number,
): Promise<
  false | { verificationId: string; resolver: MultiFactorResolver } | void
> {
  const resolver = getMultiFactorResolver(auth, error)

  if (
    resolver.hints[selectedIndex].factorId ===
    PhoneMultiFactorGenerator.FACTOR_ID
  ) {
    const phoneInfoOptions = {
      multiFactorHint: resolver.hints[selectedIndex],
      session: resolver.session,
    }

    const phoneAuthProvider = new PhoneAuthProvider(auth)
    try {
      const verificationId = await phoneAuthProvider.verifyPhoneNumber(
        phoneInfoOptions,
        recaptchaVerifier,
      )
      return { verificationId, resolver }
    } catch (e) {
      toastFirebaseError(e)
      return false
    }
  }
}

export async function sendEmailVerificationEmail(): Promise<boolean> {
  if (auth.currentUser) {
    try {
      await sendEmailVerification(auth.currentUser)
      return true
    } catch (e) {
      toastFirebaseError(e)
      return false
    }
  } else {
    return false
  }
}

export function isEmailVerified() {
  if (auth.currentUser) return auth.currentUser.emailVerified
}

export async function verifyEmail(
  oobCode: string,
  apiKey: string,
  mode: string,
  password?: string,
) {
  const body: {
    oobCode: string
    newPassword?: string
  } = {
    oobCode: oobCode,
  }

  if (password) {
    body["newPassword"] = password
  }

  const params = {
    ROUTE: `${
      import.meta.env.VITE_REACT_APP_GOOGLE_API_ACCOUNT_INFO
    }/${mode}?key=${apiKey}`,
    Body: body,
  }
  try {
    const response = await API.post(params.ROUTE, params.Body, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    return response
  } catch (error) {
    return false
  }
}

export const handleVerifyEmail = (actionCode: string) => {
  applyActionCode(auth, actionCode)
    .then(() => {
      appToast("Email Verified", "success")
    })
    .catch((error) => {
      toastFirebaseError(error)
    })
}

export const handleResetPassword = async (
  actionCode: string,
  newPassword: string,
) => {
  verifyPasswordResetCode(auth, actionCode)
    .then(() => {
      confirmPasswordReset(auth, actionCode, newPassword)
        .then((resp) => {
          console.log(resp)
          appToast("Password changed", "success")
        })
        .catch((error) => {
          toastFirebaseError(error)
        })
    })
    .catch((error) => {
      toastFirebaseError(error)
    })
}

export function toastFirebaseError(e: any) {
  const errorWithCode = e as { code?: string }

  if (
    errorWithCode &&
    errorWithCode.code &&
    errorWithCode.code != "auth/too-many-requests"
  ) {
    appToast(errorWithCode.code, "error")
  }
}
