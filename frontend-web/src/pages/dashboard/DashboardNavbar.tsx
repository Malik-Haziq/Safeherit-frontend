import notification from "../../../assets/images/Notification.svg"
import userImg from "../../../assets/images/user.svg"
import arrowDown from "../../../assets/images/chevron-down.svg"
import { DropDownButton } from "../../components"

export const DashboardNavbar = (_props: { _handleLogout: Function }) => {
  const USER_NAME = window.localStorage.getItem("userName")

  return (
    <div className="h-[83px] p-7 flex justify-between items-center shadow-sm">
      <div>
        <h2 className="text-safe-text-black-tint font-xl font-bold">
          Dashboard
        </h2>
        <p className="text-safe-text-dark-gray font-sm ">
          View all your assets status
        </p>
      </div>
      <div className="flex items-center gap-10">
        <img
          src={notification}
          alt="notification icon  "
          className="cursor-pointer"
        />
        <DropDownButton
          className="flex items-center bg-safe-white-shade px-2 py-1 rounded-full gap-1 cursor-pointer"
          onClick={_props._handleLogout}
          title={USER_NAME}
          arrowIcon={arrowDown}
          arrowDownClassName={"ml-1"}
          userIcon={userImg}
          userIconClassName={""}
          optionText={"Logout"}
        />
      </div>
    </div>
  )
}
