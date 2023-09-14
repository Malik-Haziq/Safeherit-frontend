import notification from "../../../assets/images/Notification.svg"
import userImg from "../../../assets/images/user.svg"
import arrowDown from "../../../assets/images/chevron-down.svg"
import { DropDownButton } from "../../components"
import { Notifications } from "../../../src/components/notificationDropDown"
import { useLocation } from "react-router-dom"

type NavBarItem = {
  screen: string
  title: string
}

export default function DashboardNavbar(_props: { _handleLogout: Function }) {
  const currentPath = useLocation()
  const USER_NAME = window.localStorage.getItem("userName") || "Profile"
  const navBarHeadings: Record<string, NavBarItem> = {
    "/dashboard": {
      screen: "Dashboard",
      title: "View all your assets status",
    },
    "/dashboard/assets": {
      screen: "My Assets",
      title: "Add and remove assets",
    },
    "/dashboard/beneficiaries": {
      screen: "Beneficiaries",
      title: "Add and remove beneficiaries",
    },
    "/dashboard/validators": {
      screen: "Validators",
      title: "Manage your validators",
    },
    "/dashboard/pulse": {
      screen: "Pulse check",
      title: "Check your pulse",
    },
  }

  return (
    <div className="h-[83px] p-2 sm:p-7 flex justify-between items-center shadow-sm min-w-[1200px] max-w-[100vw]">
      <div>
        <h2 className="text-safe-text-black-tint sm:text-xl font-bold">
          {navBarHeadings[currentPath.pathname].screen}
        </h2>
        <p className="text-safe-text-dark-gray text-sm sm:text-base ">
          {navBarHeadings[currentPath.pathname].title}
        </p>
      </div>
      <div className="flex items-center gap-3 md:gap-10">
        <Notifications />

        <DropDownButton
          className="flex items-center bg-safe-white-shade px-2 py-1 rounded-full gap-1 cursor-pointer"
          onClick={_props._handleLogout}
          title={USER_NAME}
          titleClassName={"text-sm sm:text-base"}
          arrowIcon={arrowDown}
          arrowDownClassName={"ml-1 "}
          userIcon={userImg}
          userIconClassName={"w-6 sm:w-8"}
          options={["Logout"]}
        />
      </div>
    </div>
  )
}
