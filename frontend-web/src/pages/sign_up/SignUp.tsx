import styles from "./SignUp.module.css";
import { useTranslation } from "react-i18next";
import logo from '../../../assets/images/SafeHeritLogo.png'
import userIcon from '../../../assets/images/UserIcon.png'
import emailIcon from '../../../assets/images/EmailIcon.png'
import passwordVisibilityIcon from '../../../assets/images/PasswordVisibilityIcon.png'

export function SignUp() {

  const { t } = useTranslation();

  return (
    <div className={'bg-safe-white min-h-screen flex flex-row justify-between'}>
      <div className={styles.sinup_form}>

        <img className="h-20 mt-20" src={logo} alt="logo" /> {/* TODO Image need to be changed*/}

        <p className="text-safe-text-dark-blue font-safe-font-default text-2xl font-bold">
          {t('Create New Account')}
        </p>

        <p className="text-safe-text-dark-gray font-safe-font-default text-base font-normal mt-2">
          {t('Please create your new account to continue')}
        </p>

        <div className={styles.input}>
          <input type="text" className={styles.input_field} placeholder="Full Name"/> {/* TODO Place holder text color*/}
          <img className={styles.icon} src={userIcon} alt="user icon" />
        </div>

        <div className={styles.input}>
          <input type="email" className={styles.input_field} placeholder="Email address"/> {/* TODO Place holder text color*/}
          <img className={styles.icon} src={emailIcon} alt="email icon" />
        </div>

        <div className={styles.input}>
          <input type="password" className={styles.input_field} placeholder="Password"/> {/* TODO Place holder text color*/}
          <img className={styles.icon} src={passwordVisibilityIcon} alt="password visibility icon" />
        </div>

        <div className={styles.input}>
          <input type="password" className={styles.input_field} placeholder="Confirm Password"/> {/* TODO Place holder text color*/}
          <img className={styles.icon} src={passwordVisibilityIcon} alt="password visibility icon" />
        </div>

        <div className={styles.radio}>
          <input className={styles.radio_field} type="checkbox" name="site_name"/>
          <p className="text-safe-text-gray font-safe-font-default font-medium text-xs ml-2">
            {t('By Continuing you agree to our')}
            <a className="text-safe-text-link-blue font-safe-font-default font-medium text-xs ml-1 cursor-pointer">
              {t('Terms of conditions arivacy policy')}
            </a>
          </p>
        </div>

        <div className={styles.button}>
          <button className="w-64 h-16 px-5 flex justify-center items-center bg-blue-500 text-safe-text-white bg-safe-blue font-safe-font-default font-semibold text-base rounded-full shadow-md hover:opacity-75 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:ring-opacity-75">
            {t("SIGN UP")}
          </button>
        </div>

        <p className="text-safe-text-dark-gray font-safe-font-default text-base font-medium text-sm mt-14">
          {t('Already have an account')}
          <a className="text-safe-text-dark-link-blue font-safe-font-default text-base font-semibold text-sm ml-1 cursor-pointer">
            {t('Login')}
          </a>
        </p>

      </div>
      <div className="h-14 bg-gradient-to-r from-cyan-500 to-blue-500 min-w-full min-h-screen"> </div> {/* TODO image should be placed here*/}
    </div>
  )
}
