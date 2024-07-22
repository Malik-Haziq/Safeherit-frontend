import React, { useCallback } from "react"

import { Outlet, useNavigate } from "react-router-dom"
import styles from "./Dashboard.module.css"
import { useAppDispatch } from "@redux/hooks"
import { logout } from "@redux/actions"
import NavigationDrawer from "./NavigationDrawer"
import DashboardNavbar from "./DashboardNavbar"
import { removeCookie } from "@/common/utils/cookie"

export default function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  // TODO manually terminate the session on catch
  const _handleLogout = useCallback(() => {
    removeCookie("defaultCurrency")
    dispatch<any>(logout({}))
      .unwrap()
      .catch()
      .finally(() => {
        navigate("/login")
      })
  }, [])

  return (
    <div className={styles.App}>
      <NavigationDrawer _handleLogout={_handleLogout} />
      <section className={styles.DashboardBody}>
        <DashboardNavbar _handleLogout={_handleLogout} />
        <Outlet />
      </section>
    </div>
  )
}
