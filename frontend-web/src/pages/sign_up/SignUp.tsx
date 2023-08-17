import { useState } from "react"
import { useTranslation } from "react-i18next"
import logo from "../../../assets/images/safeherit_logo.svg"
import userIcon from "../../../assets/images/UserIcon.png"
import emailIcon from "../../../assets/images/EmailIcon.png"
import passwordVisibilityIcon from "../../../assets/images/PasswordVisibilityIcon.png"
import signUpImg from "../../../assets/images/sign-up-img.jpg"
import { auth } from "../../firebase"
import { updateProfile } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { signup } from "../../redux/actions/UserActions"
import { useAppDispatch } from "../../redux/hooks"

export function SignUp() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [formControl, setFormControl] = useState({
    name: "",
    email: "",
    password: "",
    password_visibility: false,
    confirm_password: "",
    confirm_password_visibility: false,
  })
  const [agreeTermAndCondition, setAgreeTermAndCondition] = useState(false)

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
        alert("password must match")
      } else {
        dispatch(
          signup({ email: formControl.email, password: formControl.password }),
        )
          .unwrap()
          .then(() => {
            navigate("/login")
          })
      }
    }
  }

  return (
    <main className="flex flex-col md:flex-row justify-center lg:justify-between font-safe-font-default w-screen h-[91vh]">
      <section className="flex items-center  flex-col gap-8 w-full lg:w-2/5">
        <div className="mt-6">
          <img
            src={logo}
            alt="safe herit logo"
            className=" w-52 hidden lg:block my-12 mx-auto"
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

          <div className="flex gap-2 text-safe-text-gray mt-2 mb-8">
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
        <small className="text-sm text-safe-text-dark-gray mt-8">
          Already have an account?&nbsp;
          <a href="/login" className="text-safe-text-dark-link-blue font-bold">
            Login
          </a>
        </small>
      </section>
      <section className="bg-safe-blue hidden lg:flex lg:items-center lg:justify-center lg:w-3/5  ">
        <img
          src={signUpImg}
          alt="Sign up img"
          className="min-h-full min-w-full shrink-0"
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
