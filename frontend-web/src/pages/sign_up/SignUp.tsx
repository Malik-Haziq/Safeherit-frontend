import React from "react"
import logo from "@images/safeherit_logo.svg"
import userIcon from "@images/UserIcon.png"
import emailIcon from "@images/EmailIcon.png"
import signupBg from "@images/signup-bg.svg"
import passwordVisibilityIcon from "@images/PasswordVisibilityIcon.png"
import signupImg from "@images/signup-pic.png"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { loginWithGoogle, signup } from "@redux/actions"
import { useAppDispatch } from "@redux/hooks"
import { User, updateProfile } from "firebase/auth"
import { GoogleAuthButton, toast } from "@/components"
import { setLoaderVisibility } from "@/redux/reducers/LoaderSlice"
import {
  updateActive,
  updateRole,
  updateRoleCheck,
} from "@/redux/reducers/UserSlice"
import { sendEmailVerificationEmail, isStrongPassword } from "@/common"

export function SignUp() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const startLoader = () => dispatch<any>(setLoaderVisibility(true))
  const stopLoader = () => dispatch<any>(setLoaderVisibility(false))

  const [formControl, setFormControl] = useState({
    name: "",
    email: "",
    password: "",
    password_visibility: false,
    confirm_password: "",
    confirm_password_visibility: false,
  })
  const [agreeTermAndCondition, setAgreeTermAndCondition] = useState(false)
  const [validPassword, setValidPassword] = useState(false)
  const _handleChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target
    setFormControl({ ...formControl, [name]: value })
  }

  const _handlePasswordVisibility = (name: string, value: boolean) => {
    setFormControl({ ...formControl, [name]: value })
  }

  const _acceptTermCondition = (event: { target: { checked: boolean } }) => {
    setAgreeTermAndCondition(event.target.checked)
  }

  const _handleSubmit = () => {
    if (
      formControl.name &&
      formControl.email &&
      formControl.password &&
      formControl.confirm_password &&
      agreeTermAndCondition
    ) {
      if (formControl.password !== formControl.confirm_password) {
        toast("password must match", "error")
      } else if (!isStrongPassword(formControl.password)) {
        setValidPassword(true)
      } else {
        startLoader()
        toast("signing up", "info")
        dispatch<any>(
          signup({ email: formControl.email, password: formControl.password }),
        )
          .unwrap()
          .then((res: { user: User }) => {
            updateProfile(res.user, {
              displayName: formControl.name,
            })
              .then()
              .catch((err) => {
                toast(err?.code, "error")
              })
              .finally(async () => {
                const emailSent = await sendEmailVerificationEmail()
                if (emailSent) {
                  toast("Verification Email Sent", "info")
                  setTimeout(() => {
                    toast("Please verify your email to login", "info")
                    stopLoader()
                    navigate("/login")
                  }, 500)
                } else {
                  navigate("/login")
                }
              })
          })
          .catch((err: { code: string }) => {
            toast(err?.code, "error")
            stopLoader()
          })
      }
    }
  }

  const _signupWithGoogle = () => {
    startLoader()
    dispatch<any>(loginWithGoogle({}))
      .unwrap()
      .then(() => {
        dispatch<any>(updateActive(true))
        dispatch<any>(updateRole("owner"))
        dispatch<any>(updateRoleCheck({ role: "owner", value: true }))
        setTimeout(() => {
          stopLoader()
          navigate("/pricing")
        }, 1000)
      })
      .catch((err: { code: string }) => {
        toast(err?.code, "error")
      })
      .finally(() => {
        stopLoader()
      })
  }

  return (
    <main className="flex flex-col md:flex-row justify-center lg:justify-between font-safe-font-default w-screen h-[calc(100vh-80px)]">
      <section className="flex items-center flex-col gap-8 w-full lg:w-2/5 my-4">
        <div className="mt-6">
          <img
            src={logo}
            alt="safeherit logo"
            className=" w-52 hidden lg:block my-4 mx-auto"
          />  
          <h2 className="text-xl lg:text-2xl mb-2  font-bold font-monstrate text-safe-text-dark-blue text-center">
            Create New Account!
          </h2>
          <p className="text-safe-text-dark-gray text-sm">
            Please create your new account to continue
          </p>
        </div>
        <form
          className="flex flex-col gap-4 mx-4 "
          onSubmit={(e) => {
            e.preventDefault()
            _handleSubmit()
          }}
        >
          <InputField
            name="name"
            type="text"
            placeholder="Full Name"
            value={formControl.name}
            iconAlt="user icon"
            icon={userIcon}
            _handleChange={_handleChange}
          />

          <InputField
            name="email"
            type="email"
            placeholder="Email Address"
            value={formControl.email}
            iconAlt="email icon"
            icon={emailIcon}
            _handleChange={_handleChange}
          />

          <InputField
            name="password"
            type={formControl.password_visibility ? "text" : "password"}
            placeholder="Password"
            value={formControl.password}
            iconAlt="password visibility icon"
            icon={passwordVisibilityIcon}
            _handleChange={_handleChange}
            _imagePress={() => {
              _handlePasswordVisibility(
                "password_visibility",
                !formControl.password_visibility,
              )
            }}
          />

          <InputField
            name="confirm_password"
            type={formControl.confirm_password_visibility ? "text" : "password"}
            placeholder="Confirm Password"
            value={formControl.confirm_password}
            iconAlt="password visibility icon"
            icon={passwordVisibilityIcon}
            _handleChange={_handleChange}
            _imagePress={() => {
              _handlePasswordVisibility(
                "confirm_password_visibility",
                !formControl.confirm_password_visibility,
              )
            }}
          />
          {validPassword && <PasswordValidation/>}
          <div className="flex gap-2 text-safe-text-gray mt-2 mb-6">
            <input
              name="checkbox"
              type="checkbox"
              checked={agreeTermAndCondition}
              required
              className="mr-2 block h-5 w-5"
              onChange={_acceptTermCondition}
            />
            <small>
              By Continuing you agree to our&nbsp;
              <a
                href="/about"
                className="text-safe-text-link-blue font-semibold"
              >
                Terms of conditions Privacy policy
              </a>
            </small>
          </div>
          <button className="primary-btn px-16 uppercase w-fit mx-auto">
            Sign up
          </button>
        </form>
        <GoogleAuthButton
          handleClick={_signupWithGoogle}
          type={"signup"}
          buttonText={"Continue with Google"}
        />
        <small className="text-sm text-safe-text-dark-gray">
          Already have an account?&nbsp;
          <a href="/login" className="text-safe-text-dark-link-blue font-bold">
            Login
          </a>
        </small>
      </section>
      <section
        className="bg-safe-blue hidden lg:flex lg:items-center lg:justify-center lg:w-3/5 relative"
        style={{
          background: `url(${signupBg})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <img
          src={signupImg}
          alt="sign up image"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </section>
    </main>
  )
}

function InputField(_props: {
  name: string
  type: string
  placeholder: string
  value: string
  iconAlt: string
  icon: any
  _handleChange: any
  _imagePress?: any
}) {
  const {
    name,
    type,
    placeholder,
    value,
    iconAlt,
    icon,
    _handleChange,
    _imagePress,
  } = _props
  return (
    <div className="relative">
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={_handleChange}
        required
        className="bg-safe-gray py-4 px-4 w-full placeholder:text-safe-text-dark-blue placeholder:font-medium rounded-[22px]"
      />
      <img
        src={icon}
        alt={iconAlt}
        onClick={_imagePress}
        className="absolute right-4 top-4 cursor-pointer"
      />
    </div>
  )
}

function PasswordValidation() {
  return (
    <div>
      <ul className="text-red-500 text-sm list-disc list-inside flex flex-col gap-1">
        <li>password must be 8 or more characters length.</li>
        <li>password must contain 1 or more uppercase characters.</li>
        <li>password must contain 1 or more digit characters.</li>
        <li>password must contain 1 or more spacial characters.</li>
      </ul>
    </div>
  )
}