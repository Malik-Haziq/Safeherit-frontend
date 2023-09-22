import notification from "../../../assets/images/Notification.svg"
import userImg from "../../../assets/images/user.svg"
import arrowDown from "../../../assets/images/chevron-down.svg"
import { DropDownButton } from "../../components"
import { Notifications } from "../../../src/components/notificationDropDown"
import { useAppSelector } from "../../redux/hooks"

type NavBarItem = {
  screen: string
  title: string
}

export default function DashboardNavbar(_props: {
  _handleLogout: Function
  navBarHeadings: Record<string, NavBarItem>
  currentPath: any
}) {
  const user = useAppSelector(state => state.user)
  const USER_NAME =  user.displayName || "Profile"

  return (
    <div className="h-[83px] p-2 sm:p-7 flex justify-between items-center shadow-sm min-w-[1200px] max-w-[100vw]">
      <div>
        <h2 className="text-safe-text-black-tint sm:text-xl font-bold">
          {_props.navBarHeadings[_props.currentPath.pathname].screen}
        </h2>
        <p className="text-safe-text-dark-gray text-sm sm:text-base ">
          {_props.navBarHeadings[_props.currentPath.pathname].title}
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
