import { useTranslation } from "react-i18next"
import logo from "../../../assets/images/safeherit_logo.svg"
import userImg from "../../../assets/images/user.svg"
import arrowDown from "../../../assets/images/chevron-down.svg"
import { useNavigate } from "react-router-dom"
import { useLocation } from "react-router-dom"

export function NavBar() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const currentPath = useLocation()

  const registerBtn = ["/register", "/signup"]

  const _handleLoginPress = () => navigate("/login")

  return (
    <div className="text-safe-text-gray h-20 bg-safe-white shadow-sm">
      <nav className="relative h-20 flex flex-wrap items-center justify-between navbar-expand-lg bg-white-500 bg-safe-white">
        <div className="w-full relative flex flex-row lg:w-auto pl-16 lg:static lg:block lg:justify-start">
          <img className="w-48" src={logo} alt="..."></img>
        </div>
        <div className="lg:flex flex-grow">
          <ul className="flex flex-col lg:flex-row list-none ml-auto">
            <li className="nav-item mr-16">
              <a
                href="/"
                className="px-3 flex py-2 font-safe-font-default font-medium text-base hover:opacity-75 cursor-pointer"
              >
                {t("Home")}
              </a>
            </li>
            <li className="nav-item mr-16">
              <a
                href="/about"
                className="px-3 flex py-2 font-safe-font-default font-medium text-base hover:opacity-75 cursor-pointer"
              >
                {t("About us")}
              </a>
            </li>
            <li className="nav-item mr-11">
              <a
                href="/contact"
                className="px-3 flex py-2 font-safe-font-default font-medium text-base hover:opacity-75 cursor-pointer"
              >
                {t("Contact")}
              </a>
            </li>
            <li className="nav-item mr-14">
              {registerBtn.includes(currentPath.pathname) ? (
                <button className="primary-btn" onClick={_handleLoginPress}>
                  {t("Login Register")}
                </button>
              ) : (
                <div className="flex items-center bg-safe-white-shade px-2 py-1 rounded-full gap-1 cursor-pointer">
                  <img src={userImg} alt="" />
                  <p>James</p>
                  <img src={arrowDown} alt="" className="ml-1" />
                </div>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}
