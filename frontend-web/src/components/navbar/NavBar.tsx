import logo from "../../../assets/images/safeherit_logo.svg"
import userImg from "../../../assets/images/user.svg"
import arrowDown from "../../../assets/images/chevron-down.svg"
import { useNavigate, useLocation } from "react-router-dom"
import { useAppDispatch } from "../../redux/hooks"
import { logout } from "../../redux/actions/UserActions"
import { DropDownButton } from ".."

export function NavBar() {
  const USER_NAME = window.localStorage.getItem("userName")
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const currentPath = useLocation()
  const registerBtn = ["/register", "/signup", "/"]

  const _handleLogout = () => {
    dispatch(logout({}))
      .unwrap()
      .then((response) => {
        console.log(response)
        navigate("/login")
      })
  }

  const _handleLoginPress = () => {
    _handleLogout()
    navigate("/login")
  }

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
                Home
              </a>
            </li>
            <li className="nav-item mr-16">
              <a
                href="/about"
                className="px-3 flex py-2 font-safe-font-default font-medium text-base hover:opacity-75 cursor-pointer"
              >
                About us
              </a>
            </li>
            <li className="nav-item mr-11">
              <a
                href="/contact"
                className="px-3 flex py-2 font-safe-font-default font-medium text-base hover:opacity-75 cursor-pointer"
              >
                Contact
              </a>
            </li>
            <li className="nav-item mr-14">
              {registerBtn.includes(currentPath.pathname) ? (
                <button className="primary-btn" onClick={_handleLoginPress}>
                  Login / Register
                </button>
              ) : (
                <DropDownButton
                  className="flex items-center bg-safe-white-shade px-2 py-1 rounded-full gap-1 cursor-pointer"
                  onClick={_handleLogout}
                  title={USER_NAME}
                  arrowIcon={arrowDown}
                  arrowDownClassName={"ml-1"}
                  userIcon={userImg}
                  userIconClassName={""}
                  optionText={"Logout"}
                />
              )}
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}
