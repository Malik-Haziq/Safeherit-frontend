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
    <main className="flex flex-col md:flex-row gap-0 justify-between font-safe-font-default w-screen h-[91vh]">
      <section className="flex items-center  flex-col gap-8 w-2/5">
        <div className="mt-6">
          <img
            src={logo}
            alt="safe herit logo"
            className=" w-52 hidden lg:block my-12 mx-auto"
          />
          <h2 className="text-xl lg:text-2xl mb-2  font-bold font-monstrate text-safe-text-dark-blue text-center">
            {t("Create New Account!")}
          </h2>
          <p className="text-safe-text-dark-gray text-sm">
            {t("Please create your new account to continue")}
          </p>
        </div>
        <form className="flex flex-col gap-4 mx-4 ">
          <div className="relative">
            <input
              type="text"
              placeholder="Full Name"
              className=" bg-safe-gray py-4 px-4 w-full  placeholder:text-safe-text-dark-blue placeholder:font-semibold rounded-2xl"
            />
            <img
              src={userIcon}
              alt="user icon"
              className="absolute right-4 top-4 "
            />
          </div>
          <div className="relative">
            <input
              type="email"
              placeholder="Email Address"
              className=" bg-safe-gray py-4 px-4 w-full  placeholder:text-safe-text-dark-blue placeholder:font-semibold rounded-2xl"
            />
            <img
              src={emailIcon}
              alt="email icon"
              className="absolute right-4 top-4 "
            />
          </div>
          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              className=" bg-safe-gray py-4 px-4 w-full rounded-2xl placeholder:text-safe-text-dark-blue placeholder:font-semibold"
            />
            <img
              src={passwordVisibilityIcon}
              alt="password visiblity icon"
              className="absolute right-4 top-4 "
            />
          </div>
          <div className="relative">
            <input
              type="password"
              placeholder="Confirm Password"
              className=" bg-safe-gray py-4 px-4 w-full  placeholder:text-safe-text-dark-blue placeholder:font-semibold rounded-2xl"
            />
            <img
              src={passwordVisibilityIcon}
              alt="password visiblity icon"
              className="absolute right-4 top-4 "
            />
          </div>
          <div className="flex gap-2 text-safe-text-gray mt-2 mb-8">
            <input type="checkbox" className="mr-2 block h-5 w-5" />
            <small className="">
              {t("By Continuing you agree to our")}
              <a href="#" className="text-safe-text-link-blue font-semibold">
                {t(" Terms of conditions arivacy policy")}
              </a>
            </small>
          </div>
          <button className="primary-btn px-16 uppercase w-fit mx-auto ">
            {t("Sign up")}
          </button>
        </form>
        <small className="text-sm text-safe-text-dark-gray mt-8">
          {" "}
          {t("Already have an account? ")}{" "}
          <a href="#" className="text-safe-text-dark-link-blue font-bold">
            {t("Login")}
          </a>
        </small>
      </section>
      <section className="bg-safe-blue  flex items-center justify-center w-3/5 ">
        <img
          src={signUpImg}
          alt="Sign up img"
          className="min-h-full min-w-full shrink-0"
        />
      </section>
    </main>
  )
}
