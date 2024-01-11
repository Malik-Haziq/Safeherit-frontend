import React from "react"
import logo from "@images/safeherit_log_white.svg"
import logoutIcon from "@images/Logout.svg"

import styles from "./Dashboard.module.css"
import { CONSTANT } from "@/common"

export default function NavigationDrawer(_props: {
  DRAWER_MENU: any[]
  DRAWER_SETTINGS: any[]
  _handleLogout: () => void
  selectedOption: string
}) {
  return (
    <div className={styles.NavigationDrawer}>
      <div className="relative h-full">
        <div className="flex items-center justify-center">
          <img className="w-32 md:w-48 mt-7" src={logo} alt="safeherit logo"></img>
        </div>
        <div className="mt-11 cursor-pointer">
          {_props.DRAWER_MENU.map((item) => {
            return (
              <IconView
                key={item.option}
                icon={item.icon}
                option={item.option}
                navigate={item.navigate}
                selectedOption={_props.selectedOption}
              />
            )
          })}
        </div>
        <div className="mt-12 sm:mt-24 cursor-pointer">
          {_props.DRAWER_SETTINGS.map((item) => {
            return (
              <IconView
                key={item.option}
                icon={item.icon}
                option={item.option}
                navigate={item.navigate}
                selectedOption={_props.selectedOption}
              />
            )
          })}
        </div>
        <div className="mt-24 sm:mt-36 cursor-pointer absolute bottom-16">
          <IconView
            icon={logoutIcon}
            option={CONSTANT.LOGOUT}
            navigate={_props._handleLogout}
            selectedOption={_props.selectedOption}
          />
        </div>
      </div>
    </div>
  )
}

function IconView(_props: {
  icon: string
  option: string
  navigate: () => void
  selectedOption: string
}) {
  return (
    <div
      className={
        _props.selectedOption === _props.option
          ? "flex items-center gap-5 w-full mb-5 py-2 px-3 sm:px-5 cursor-pointer selected"
          : "flex items-center gap-5 w-full mb-5 py-2 px-3 sm:px-5 cursor-pointer "
      }
      onClick={() => _props.navigate()}
    >
      <img
        src={_props.icon}
        alt={_props.option}
        className="w-4 sm:w-[22px] h-4 sm:h-[22px]"
      />
      <p className="px-auto text-sm sm:text-lg">{_props.option}</p>
    </div>
  )
}
