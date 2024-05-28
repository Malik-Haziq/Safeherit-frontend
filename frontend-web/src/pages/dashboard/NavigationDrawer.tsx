import React, { memo } from "react"
import logo from "@images/safeherit_log_white.svg"
import logoutIcon from "@images/Logout.svg"

import styles from "./Dashboard.module.css"
import {
  CONSTANT,
  getDashboardDrawerMenu,
  getDashboardDrawerSettings,
} from "@/common"
import { useLocation, useNavigate } from "react-router-dom"
import { useAppSelector } from "@/redux/hooks"

export default function NavigationDrawer(_props: {
  _handleLogout: () => void
}) {
  const user = useAppSelector((state) => state.user)
  const navigate = useNavigate()
  const currentPath = useLocation()
  const trimmedPath = currentPath.pathname.replace(/\/$/, "")
  const DRAWER_MENU = getDashboardDrawerMenu(user.role)
  const DRAWER_SETTINGS = getDashboardDrawerSettings(user.role)
  return (
    <div className={styles.NavigationDrawer}>
      <div className="relative h-full">
        <div className="flex items-center justify-center">
          <img
            className="w-32 md:w-48 mt-7"
            src={logo}
            alt="safeherit logo"
          ></img>
        </div>
        <div className="mt-11 cursor-pointer">
          {DRAWER_MENU.map((item) => (
            <IconView
              key={item.option}
              icon={item.icon}
              option={item.option}
              route={item.navigate}
              navigate={() => navigate(item.navigate)}
              trimmedPath={trimmedPath}
            />
          ))}
        </div>
        <div className="mt-12 sm:mt-24 cursor-pointer">
          {DRAWER_SETTINGS.map((item) => (
            <IconView
              key={item.option}
              icon={item.icon}
              option={item.option}
              route={item.navigate}
              navigate={() => navigate(item.navigate)}
              trimmedPath={trimmedPath}
            />
          ))}
        </div>
        <div className="mt-24 sm:mt-36 cursor-pointer pb-4">
          <IconView
            icon={logoutIcon}
            option={CONSTANT.LOGOUT}
            navigate={_props._handleLogout}
            route={""}
            trimmedPath={trimmedPath}
          />
        </div>
      </div>
    </div>
  )
}

// eslint-disable-next-line react/display-name
const IconView = memo(
  (_props: {
    icon: string
    option: string
    route: string
    trimmedPath: string
    navigate: () => void
  }) => {
    return (
      <div
        data-cy={`dashboard-view-${_props.option
          .replaceAll(" ", "-")
          .toLocaleLowerCase()}-button`}
        className={
          _props.trimmedPath === _props.route
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
  },
  (prevProps, nextProps) => {
    return prevProps.trimmedPath === nextProps.trimmedPath
  },
)
