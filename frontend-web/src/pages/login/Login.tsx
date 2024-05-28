import React from "react"
import logo from "@images/safeherit_logo.svg"
import loginImg from "@images/login-img.png"
import star from "@images/star.svg"

import { useCallback, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { getUser, login, loginWithGoogle, resetPassword } from "@redux/actions"
import { setLoaderVisibility } from "@redux/reducers/LoaderSlice"
import { useAppDispatch, useAppSelector } from "@redux/hooks"
import {
  ForgotPasswordModal,
  toast,
  GoogleAuthButton,
  VerificationCode,
} from "@/components"
import { UserRolesModal } from "./modal_login"
import {
  resetBeneficiaryOf,
  resetMapper,
  resetValidatorOf,
  setCredentials,
  updateRole,
  updateRoleUser,
} from "@/redux/reducers/UserSlice"
import { SelectOption } from "@/types"
import {
  handleResetPassword,
  handleVerifyEmail,
  isEmailVerified,
  sendEmailVerificationEmail,
  useRecaptcha,
  verifyUserEnrolled,
  verifyUserMFA,
} from "@/common"
import { MultiFactorResolver } from "@firebase/auth"
import { auth } from "@/firebase"

export function Login() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const USER_ROLES = [
    "owner",
    "super-admin",
    "admin",
    "beneficiary",
    "validator",
  ]
  const queryParams = new URLSearchParams(location.search)

  const recaptcha = useRecaptcha("authenticate")

  const user = useAppSelector((state) => state.user)

  const startLoader = () => dispatch<any>(setLoaderVisibility(true))
  const stopLoader = () => dispatch<any>(setLoaderVisibility(false))

  const [formControl, setFormControl] = useState({
    email: "",
    password: "",
  })
  const [rememberMe, setRememberMe] = useState(false)
  const [modalVisibility, setModalVisibility] = useState("none")
  const [selectedBeneficiary, setSelectedBeneficiary] = useState<SelectOption>()
  const [selectedValidator, setSelectedValidator] = useState<SelectOption>()
  const [resetEmail, setResetEmail] = useState("")
  const [verificationId, setVerificationId] = useState<string>()
  const [resolver, setResolver] = useState<MultiFactorResolver | null>()
  const [logingin, setLogingin] = useState(false)
  const code = new Array<string>(6).fill("")

  // verify email
  useEffect(() => {
    const verifyOrUpdateUser = async () => {
      if (queryParams.size) {
        startLoader()
        const mode = queryParams.get("mode")
        const oobCode = queryParams.get("oobCode") || ""
        if (mode == "verifyEmail") {
          toast("Verifying Email", "info")
          handleVerifyEmail(oobCode)
        } else if (mode == "resetPassword") {
          let newPassword: string | null = ""
          newPassword = prompt("Enter new password")
          if (newPassword) {
            handleResetPassword(oobCode, newPassword)
          }
        }
        navigate("/login")
        stopLoader()
      }
    }
    verifyOrUpdateUser()
  }, [])

  async function getCode(code: string) {
    if (verificationId && resolver) {
      try {
        const response = await verifyUserEnrolled(
          {
            verificationId,
            resolver,
          },
          code,
        )
        if (response) {
          const currentUser = auth.currentUser
          if (currentUser) {
            currentUser
              .getIdToken()
              .then((idToken) => {
                dispatch<any>(
                  setCredentials({
                    token: idToken,
                    displayName: currentUser.displayName,
                    phone: currentUser.phoneNumber,
                    photo: currentUser.photoURL,
                    email: currentUser.email,
                  }),
                )
                getUserDetails()
              })
              .catch(() => {
                toast(
                  "Unable to obtain token from server, Please login again.",
                  "error",
                )
              })
          } else {
            toast(
              "Unable to obtain token from server, Please login again.",
              "error",
            )
          }
        } else {
          toast("Something went wrong while verifing code.", "error")
        }
      } catch (err) {
        const errorWithCode = err as { code?: string }
        if (errorWithCode && errorWithCode.code) {
          toast(errorWithCode.code, "error")
        } else {
          toast("Something went wrong while verifing code.", "error")
        }
      }
    } else {
      toast("Something went wrong. Please try again.", "error")
    }
    setVerificationId("")
    setResolver(null)
  }

  const closeModal = useCallback(() => {
    setModalVisibility("none")
    setResetEmail("")
    localStorage.clear()
  }, [])

  const _handleChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target
    setFormControl({ ...formControl, [name]: value })
  }

  const _setRememberMe = (event: { target: { checked: boolean } }) => {
    setRememberMe(event.target.checked)
  }

  const getUserDetails = () => {
    dispatch<any>(getUser({}))
      .unwrap()
      .catch()
      .then(
        (res: {
          data: {
            data: {
              isOwner: any
              isBeneficiary: any
              isValidator: any
              isAdmin: any
              isSuperAdmin: any
              paymentStatus: string
            }
          }
        }) => {
          if (
            res.data.data.isOwner &&
            !res.data.data.isBeneficiary &&
            !res.data.data.isValidator &&
            !res.data.data.isAdmin &&
            !res.data.data.isSuperAdmin
          ) {
            setModalVisibility("none")
            dispatch<any>(updateRole("owner"))
            if (res.data.data.paymentStatus != "Pending") {
              navigate("/register")
            } else {
              navigate("/pricing")
            }
          } else {
            setModalVisibility("user-roles")
          }
        },
      )
  }

  const _handleSubmit = () => {
    toast("logging in", "info")
    if (formControl.email && formControl.password) {
      setLogingin(true)
      dispatch<any>(
        login({
          email: formControl.email,
          password: formControl.password,
          rememberMe: rememberMe,
        }),
      )
        .unwrap()
        .then(async () => {
          getUserDetails()
          // const verifiedEmail = isEmailVerified()
          // if (verifiedEmail) {
          // } else {
          //   toast("Please verify your email", "error")
          //   const emailSent = await sendEmailVerificationEmail()
          //   if (emailSent) {
          //     toast("Verification Email Sent", "info")
          //   }
          // }
        })
        .catch((err: any) => {
          _handleMFA(err)
        })
        .finally(() => {
          setLogingin(false)
        })
    }
  }

  const _handleMFA = async (response: any) => {
    if (response.code === "auth/multi-factor-auth-required" && recaptcha) {
      const data = await verifyUserMFA(response, recaptcha, 0)

      if (data) {
        const { verificationId, resolver } = data
        setVerificationId(verificationId)
        setResolver(resolver)
      }
    } else {
      toast(response?.code, "error")
    }
    stopLoader()
  }

  const _handleMFASubmit = () => {
    const finalCode = code.reduce((previousValue, currentValue) => {
      return previousValue.concat(currentValue)
    })
    getCode(finalCode)
  }

  const _handleMFACancel = () => {
    setVerificationId("")
    setResolver(null)
  }

  const _loginWithGoogle = () => {
    dispatch<any>(loginWithGoogle({}))
      .unwrap()
      .then(() => {
        getUserDetails()
      })
      .catch((err: any) => {
        _handleMFA(err)
      })
  }

  const _handleUserRolesSubmit = (selectedRole: string) => {
    if (
      USER_ROLES.includes(selectedRole) ||
      (selectedRole == "beneficiary" && selectedBeneficiary) ||
      (selectedRole == "validator" && selectedValidator)
    ) {
      if (selectedRole == "beneficiary") {
        dispatch<any>(
          updateRoleUser(user.userMap[selectedBeneficiary?.value || 0]),
        )
      } else if (selectedRole == "validator") {
        dispatch<any>(
          updateRoleUser(user.userMap[selectedValidator?.value || 0]),
        )
      }
      setModalVisibility("none")
      dispatch<any>(updateRole(selectedRole))
      dispatch<any>(resetMapper())
      dispatch<any>(resetValidatorOf())
      dispatch<any>(resetBeneficiaryOf())
      if (user.paymentStatus != "Pending") {
        navigate("/register")
      } else {
        navigate("/pricing")
      }
    }
  }

  const _handleForgotPassword = () => {
    if (resetEmail) {
      startLoader()
      dispatch<any>(resetPassword({ email: resetEmail }))
        .unwrap()
        .catch()
        .then(() => {
          toast("Email Sent", "info")
        })
        .finally(() => {
          closeModal()
          stopLoader()
        })
    }
  }

  return (
    <main className="flex flex-row justify-center lg:justify-between font-safe-font-default w-screen h-screen">
      {verificationId && resolver && (
        <VerificationCode
          _handleMFASubmit={_handleMFASubmit}
          _handleMFACancel={_handleMFACancel}
          code={code}
        />
      )}
      {!verificationId && !resolver && (
        <>
          <UserRolesModal
            openModal={modalVisibility == "user-roles"}
            closeModal={closeModal}
            closeModalOnOverlayClick={false}
            closeIconVisibility={true}
            isBeneficiary={user.isBeneficiary}
            isOwner={user.isOwner}
            isSuperAdmin={user.isSuperAdmin}
            isAdmin={user.isAdmin}
            isValidator={user.isValidator}
            userName={user.displayName}
            _beneficiaryOf={user._beneficiaryOf}
            _validatorOf={user._validatorOf}
            selectedBeneficiary={selectedBeneficiary}
            setSelectedBeneficiary={setSelectedBeneficiary}
            selectedValidator={selectedValidator}
            setSelectedValidator={setSelectedValidator}
            _handleUserRolesSubmit={_handleUserRolesSubmit}
          />
          <ForgotPasswordModal
            openModal={modalVisibility == "forgot-password"}
            closeModal={closeModal}
            closeModalOnOverlayClick={true}
            resetEmail={resetEmail}
            setResetEmail={setResetEmail}
            sendEmail={_handleForgotPassword}
          />
          <section className="pt-10 pb-1.5 px-10 basis-2/5 flex flex-col justify-between">
            <img src={logo} alt="safeherit logo" className="h-8 w-40" />
            <div className="mx-auto">
              <h2 className="text-3xl mb-2 font-semibold font-monstrate text-safe-text-black">
                Login
              </h2>
              <p className="text-safe-text-black text-base mb-8 font-medium opacity-80">
                Login with your credential information
              </p>
              <form
                className="flex flex-col gap-5 mb-6"
                onSubmit={(e) => {
                  e.preventDefault()
                  _handleSubmit()
                }}
              >
                <InputField
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formControl.email}
                  _handleChange={_handleChange}
                  inputLable="Email"
                />

                <InputField
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formControl.password}
                  _handleChange={_handleChange}
                  inputLable="password"
                />

                <div className="flex justify-between items-center ">
                  <div className="flex gap-2 text-safe-text-gray items-center justify-center  ">
                    <input
                      data-cy="remember-user-credentials-input"
                      type="checkbox"
                      className="mr-2 block h-5 w-5"
                      checked={rememberMe}
                      onChange={_setRememberMe}
                    />
                    <small className="text-base text-safe-text-black font-medium">
                      Remember Me
                    </small>
                  </div>
                  <p
                    data-cy="forgot-password-button"
                    className={
                      "text-safe-text-blue-shade font-medium cursor-pointer"
                    }
                    onClick={() => {
                      !logingin && setModalVisibility("forgot-password")
                    }}
                  >
                    Forgot Password?
                  </p>
                </div>
                <button
                  data-cy="login-button"
                  className={
                    logingin
                      ? "primary-btn rounded-md bg-safe-gray-shade-1 text-safe-gray-shade px-40"
                      : "primary-btn rounded-md bg-safe-blue-shade px-40"
                  }
                  disabled={logingin}
                >
                  Login
                </button>
                <small className="text-sm text-safe-text-black font-medium mx-auto">
                  Don&apos;t have an account?&nbsp;
                  <a
                    href="/signup"
                    className="text-safe-text-dark-link-blue font-bold"
                  >
                    Sign up
                  </a>
                </small>
              </form>
              <GoogleAuthButton
                handleClick={_loginWithGoogle}
                type={"login"}
                buttonText={"Login with Google"}
                logingin={logingin}
              />
              <div className="z-10" id="authenticate"></div>
            </div>
            <footer className="flex justify-between">
              <small>© 2023 SafeHerit.com</small>
              <small>help@safeherit.com</small>
            </footer>
          </section>
          <section className="hidden lg:block basis-3/5 bg-safe-white-shade relative">
            <div className="pt-16 xl:pt-20 px-12 xl:px-20">
              <p className="font-medium text-3xl mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore
              </p>
              <div className="flex justify-between">
                <span className="font-semibold text-safe-text-black flex justify-center items-center gap-2 ">
                  <div className=" w-5 h-[1px] bg-safe-black"></div>
                  Rayan Adlardard
                </span>
                <div className="flex">
                  <img src={star} alt="star icon" />
                  <img src={star} alt="star icon" />
                  <img src={star} alt="star icon" />
                  <img src={star} alt="star icon" />
                  <img src={star} alt="star icon" />
                </div>
              </div>
              <small>Founder, Safeherit</small>
            </div>
            <img
              src={loginImg}
              alt="dashboard image"
              className="absolute -bottom-10 xl:bottom-0 -right-10 xl:right-0 w-[500] h-[523] xl:max-w-[700px] xl:max-h-[623px]"
            />
          </section>
        </>
      )}
    </main>
  )
}

function InputField(_props: {
  type: string
  name: string
  placeholder: string
  value: string
  _handleChange: any
  inputLable: string
}) {
  const { type, name, placeholder, value, _handleChange, inputLable } = _props
  return (
    <div className="relative">
      <label className="text-safe-text-black font-semibold text-sm">
        {inputLable}*
        <input
          data-cy={`${_props.type}-input-field`}
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={_handleChange}
          required
          className="bg-safe-white py-4 px-4 w-full divide-safe-color-gray border rounded-[6px]"
        />
      </label>
    </div>
  )
}
