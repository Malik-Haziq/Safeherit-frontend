import React from "react"
import logo from "@images/safeherit_logo.svg"
import userImg from "@images/user.svg"
import arrowDown from "@images/chevron-down.svg"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "@redux/hooks"
import { logout } from "@redux/actions"
import { DropDownButton, toast } from "@/components"
import { getFileFromFirebase } from "@/common"

export function NavBar() {
  const user = useAppSelector((state) => state.user)
  const USER_NAME = user.displayName || "Profile"
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [userImage, setUserImage] = useState("")

  useEffect(() => {
    if (user.profile_image) {
      getFileFromFirebase(user.profile_image)
        .then((res) => {
          setUserImage(res)
        })
        .catch(() => {
          setUserImage("")
        })
    }
  }, [user.profile_image])

  // TODO manually terminate the use session on logout failiure (browser storage etc)
  // Do the above commented change for all _handleLogout methods
  const _handleLogout = () => {
    dispatch<any>(logout({}))
      .unwrap()
      .catch((err: { code: string }) => {
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
  const handleMyAccount = () => {
    navigate('/dashboard/account')
  }
  const handleHelp = () => {
    navigate('/dashboard/help')
  }
  // TODO manually terminate the session on catch
  const handleLogout = () => {
    dispatch<any>(logout({}))
      .unwrap()
      .catch()
      .finally(() => {
        navigate("/login")
      })
  }
  
  const options = [
    { button: "My Account", action: handleMyAccount },
    { button: "Help", action: handleHelp },
    { button: "Logout", action: handleLogout },
  ]


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

        {!user.active ? (
          <button className="primary-btn " onClick={_handleLoginPress}>
            Login / Register
          </button>
        ) : (
          <div>
            <DropDownButton
              className="flex items-center bg-safe-white-shade px-2 py-1 rounded-full gap-1 cursor-pointer"
              onClick={_handleLogout}
              title={USER_NAME}
              titleClassName={"text-sm sm:text-base"}
              arrowIcon={arrowDown}
              arrowDownClassName={"ml-1"}
              userIcon={userImage || userImg}
              userIconClassName={"sm:w-8 sm:h-8 rounded-full object-contain"}
              options={options}
            />
          </div>
        )}
      </nav>
    </div>
  )
}
