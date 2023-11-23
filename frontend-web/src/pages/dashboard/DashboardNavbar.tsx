import userImg from "@images/user.svg"
import arrowDown from "@images/chevron-down.svg"

import { DropDownButton, Notifications } from "@/components"
import { useAppSelector } from "@redux/hooks"
import { useEffect, useState } from "react"
import { getFileFromFirebase } from "@/common"

type NavBarItem = {
  screen: string
  title: string
}

export default function DashboardNavbar(_props: {
  _handleLogout: Function
  navBarHeadings: Record<string, NavBarItem>
  currentPath: any
}) {
  const user = useAppSelector((state) => state.user)

  const [image, setImage] = useState<string>("")
  useEffect(() => {
    getFileFromFirebase(user.profile_image)
      .then((res) => {
        setImage(res)
      })
      .catch(() => {
        setImage("")
      })
  }, [user])

  return (
    <div className="h-[83px] p-2 sm:p-7 flex justify-between items-center shadow-sm min-w-[1200px] max-w-[100vw]">
      <div>
        <h2 className="text-safe-text-black-tint sm:text-xl font-bold">
          {_props.navBarHeadings[_props.currentPath]?.screen}
        </h2>
        <p className="text-safe-text-dark-gray text-sm sm:text-base ">
          {_props.navBarHeadings[_props.currentPath]?.title}
        </p>
      </div>
      <div className="flex items-center gap-3 md:gap-10">
        <Notifications />

        <DropDownButton
          className="flex items-center bg-safe-white-shade px-2 py-1 rounded-full gap-1 cursor-pointer"
          onClick={_props._handleLogout}
          title={user.displayName || "Profile"}
          titleClassName={"text-sm sm:text-base"}
          arrowIcon={arrowDown}
          arrowDownClassName={"ml-1 "}
          userIcon={image ? image : userImg}
          userIconClassName={" sm:w-8 sm:h-8 rounded-full object-contain"}
          options={["Logout"]}
        />
      </div>
    </div>
  )
}
