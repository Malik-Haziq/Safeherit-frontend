import logo from "@images/safeherit_logo.svg";
import userImg from "@images/user.svg"
import arrowDown from "@images/chevron-down.svg"

import { useNavigate, useLocation } from "react-router-dom"
import { useAppDispatch, useAppSelector} from "@redux/hooks"
import { logout } from "@redux/actions"
import { DropDownButton, toast } from "@/components"

export function NavBar() {

  const user = useAppSelector(state => state.user)
  const USER_NAME = user.displayName || "Profile"
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const currentPath = useLocation()
  const registerBtn = ["/signup", "/"]
  // TODO manually terminate the use session on logout failiure (browser storage etc)
  // Do the above commented change for all _handleLogout methods
  const _handleLogout = () => {
    dispatch(logout({}))
      .unwrap()
      .catch((err) => {
        toast(err?.code, "error")
      })
      .finally(() => {
        navigate("/login")
      })
  }

  const _handleLoginPress = () => {
    _handleLogout()
    navigate("/login")
  }

  return (
    <div className="text-safe-text-gray h-20 bg-safe-white shadow-sm">
      <nav className="relative h-20 flex flex-wrap items-center justify-between navbar-expand-lg bg-white-500 bg-safe-white px-16">
        <div className="relative flex flex-row lg:w-auto  lg:static lg:block lg:justify-start">
          <img className="w-48" src={logo} alt="..."></img>
        </div>
        <div className="flex flex-grow flex-col absolute top-12 lg:static">
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
          </ul>
        </div>
        {registerBtn.includes(currentPath.pathname) ? (
          <button className="primary-btn " onClick={_handleLoginPress}>
            Login / Register
          </button>
        ) : (
          <DropDownButton
            className="flex items-center bg-safe-white-shade px-2 py-1 rounded-full gap-1 cursor-pointer "
            onClick={_handleLogout}
            title={USER_NAME}
            arrowIcon={arrowDown}
            arrowDownClassName={"ml-1"}
            userIcon={userImg}
            userIconClassName={""}
            optionText={"Logout"}
            options={["Logout"]}
          />
        )}
      </nav>
    </div>
  )
}
