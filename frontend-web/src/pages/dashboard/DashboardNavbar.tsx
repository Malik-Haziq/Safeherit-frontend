import notification from "../../../assets/images/Notification.svg"
import userImg from "../../../assets/images/user.svg"
import arrowDown from "../../../assets/images/chevron-down.svg"
import { DropDownButton } from "../../components"

export default function DashboardNavbar (_props: { _handleLogout: Function }) {
  const USER_NAME = window.localStorage.getItem("userName") || "Profile"

  return (
    <div className="h-[83px] p-2 sm:p-7 flex justify-between items-center shadow-sm">
      <div>
        <h2 className="text-safe-text-black-tint sm:text-xl font-bold">
          Dashboard
        </h2>
        <p className="text-safe-text-dark-gray text-sm sm:text-base ">
          View all your assets status
        </p>
      </div>
      <div className="flex items-center gap-3 md:gap-10">
        <img
          src={notification}
          alt="notification icon"
          className="cursor-pointer w-4 sm:w-5 h-[18px] sm:h-[22px]"
        />
        <DropDownButton
          className="flex items-center bg-safe-white-shade px-2 py-1 rounded-full gap-1 cursor-pointer"
          onClick={_props._handleLogout}
          title={USER_NAME}
          titleClassName={"text-sm sm:text-base"}
          arrowIcon={arrowDown}
          arrowDownClassName={"ml-1 "}
          userIcon={userImg}
          userIconClassName={"w-6 sm:w-8"}
          optionText={"Logout"}
        />
      </div>
    </div>
  )
}
