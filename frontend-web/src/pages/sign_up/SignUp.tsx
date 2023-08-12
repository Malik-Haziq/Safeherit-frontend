import styles from "./SignUp.module.css"
import { useTranslation } from "react-i18next"
import logo from "../../../assets/images/safeherit_logo.svg"
import userIcon from "../../../assets/images/UserIcon.png"
import emailIcon from "../../../assets/images/EmailIcon.png"
import passwordVisibilityIcon from "../../../assets/images/PasswordVisibilityIcon.png"
import signUpImg from "../../../assets/images/sign-up-img.jpg"

export function SignUp() {
  const { t } = useTranslation()

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
        <form className="flex flex-col gap-4 mx-4 ">
          <InputField
            name="user name"
            type="text"
            placeholder="Full Name"
            value=""
            iconAlt="user icon"
            icon={userIcon}
            _handleChange={() => {}}
            _imagePress={() => {}}
          />

          <InputField
            name="email"
            type="email"
            placeholder="Email Address"
            value=""
            iconAlt="email icon"
            icon={emailIcon}
            _handleChange={() => {}}
            _imagePress={() => {}}
          />

          <InputField
            name="password"
            type="password"
            placeholder="Password"
            value=""
            iconAlt="password visibility icon"
            icon={passwordVisibilityIcon}
            _handleChange={() => {}}
            _imagePress={() => {}}
          />

          <InputField
            name="confirm password"
            type="password"
            placeholder="Confirm Password"
            value=""
            iconAlt="password visibility icon"
            icon={passwordVisibilityIcon}
            _handleChange={() => {}}
            _imagePress={() => {}}
          />

          <div className="flex gap-2 text-safe-text-gray mt-2 mb-8">
            <input type="checkbox" className="mr-2 block h-5 w-5" />
            <small>
              By Continuing you agree to our&nbsp;
              <a href="#" className="text-safe-text-link-blue font-semibold">
                Terms of conditions Privacy policy
              </a>
            </small>
          </div>
          <button className="primary-btn px-16 uppercase w-fit mx-auto ">
            Sign up
          </button>
        </form>
        <small className="text-sm text-safe-text-dark-gray mt-8">
          Already have an account?&nbsp;
          <a href="#" className="text-safe-text-dark-link-blue font-bold">
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
  _imagePress: any
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
        className="bg-safe-gray py-4 px-4 w-full placeholder:text-safe-text-dark-blue placeholder:font-medium rounded-[22px]"
      />
      <img
        src={icon}
        alt={iconAlt}
        onClick={_imagePress}
        className="absolute right-4 top-4"
      />
    </div>
  )
}
