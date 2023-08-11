import styles from "./Login.module.css"
import { useTranslation } from "react-i18next"
import logo from "../../../assets/images/safeherit_logo.svg"

export function Login() {
  const { t } = useTranslation()

  return (
    <div className={"bg-safe-white min-h-screen flex flex-row"}>
      <div
        className={"bg-safe-white min-h-screen flex flex-col justify-between"}
      >
        <img className="h-8 w-167px mt-8 ml-10" src={logo} alt="logo" />
        <div className={styles.signup_form}>
          <div className={styles.signup_form_heading}>
            <p className="text-safe-text-dark-blue font-safe-font-default text-2xl font-bold">
              {"Login"}
            </p>
            <p className="text-safe-text-dark-gray font-safe-font-default text-base font-normal mt-2">
              {"Login with your credential information"}
            </p>
          </div>
          <InputField
            type={"email"}
            name={"email"}
            placeholder={"Enter your email"}
            value={""}
            _handleChange={() => {}}
            inputLable={"Email*"}
          />
          <InputField
            type={"password"}
            name={"password"}
            placeholder={"Create a password"}
            value={""}
            _handleChange={() => {}}
            inputLable={"Password*"}
          />
          <div className={styles.button}>
            <button className="w-64 h-16 px-5 flex justify-center items-center bg-blue-500 text-safe-text-white bg-safe-blue font-safe-font-default font-semibold text-base rounded-full shadow-md hover:opacity-75 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:ring-opacity-75">
              {"SIGN UP"}
            </button>
          </div>
          <p className="text-safe-text-dark-gray font-safe-font-default text-base font-medium text-sm mt-14">
            {"Already have an account"}
            <p className="text-safe-text-dark-link-blue font-safe-font-default text-base font-semibold text-sm ml-1 cursor-pointer">
              {"Login"}
            </p>
          </p>
        </div>
        <p className="text-safe-text-dark-gray font-safe-font-default text-base font-normal mt-2">
          {"Please create your new account to continue"}
        </p>
      </div>
      <div className="h-14 bg-gradient-to-r from-cyan-500 to-blue-500 flex-1 min-h-screen"></div>
      {/* TODO image should be placed here*/}
    </div>
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
      <p className="mb-1.5">{inputLable}</p>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={_handleChange}
        className="bg-safe-gray py-4 px-4 w-full placeholder:text-safe-text-dark-blue placeholder:font-semibold rounded-2xl"
      />
    </div>
  )
}
