import { useTranslation } from "react-i18next"
import logo from "../../../assets/images/SafeHeritLogo.png"

export function NavBar() {
  const { t } = useTranslation()

  return (
    <div className="text-safe-text-gray h-20 bg-safe-white">
      <nav className="relative h-20 flex flex-wrap items-center justify-between navbar-expand-lg bg-white-500">
        <div className="w-full relative flex flex-row lg:w-auto pl-16 lg:static lg:block lg:justify-start">
          <img className="h-20" src={logo} alt="..."></img>
          {/* TODO Image need to be changed*/}
        </div>
        <div className="lg:flex flex-grow">
          <ul className="flex flex-col lg:flex-row list-none ml-auto">
            <li className="nav-item mr-16">
              <p className="px-3 flex py-2 font-safe-font-default font-medium text-base hover:opacity-75 cursor-pointer">
                {t("Home")}
              </p>
            </li>
            <li className="nav-item mr-16">
              <p className="px-3 flex py-2 font-safe-font-default font-medium text-base hover:opacity-75 cursor-pointer">
                {t("About us")}
              </p>
            </li>
            <li className="nav-item mr-11">
              <p className="px-3 flex py-2 font-safe-font-default font-medium text-base hover:opacity-75 cursor-pointer">
                {t("Contact")}
              </p>
            </li>
            <li className="nav-item mr-14">
              <button className="px-5 flex py-2.5 bg-blue-500 text-safe-text-white bg-safe-blue font-safe-font-default font-semibold text-base rounded-full shadow-md hover:opacity-75 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:ring-opacity-75">
                {t("Login Register")}
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}
