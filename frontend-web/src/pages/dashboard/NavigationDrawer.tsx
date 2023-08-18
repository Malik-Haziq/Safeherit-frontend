import styles from "./Dashboard.module.css"
import logo from "../../../assets/images/safeherit_logo.svg"
import { CONSTANT } from "../../common"

export const NavigationDrawer = (_props: {
  DRAWER_MENU: any[]
  DRAWER_SETTINGS: any[]
}) => {
  return (
    <div className={styles.NavigationDrawer}>
      <div className="pt-8 pl-8">
        <img className="w-48" src={logo} alt="..."></img>
      </div>
      <div className={styles.NavigationDrawerIconView}>
        {_props.DRAWER_MENU.map((item) => {
          return (
            <IconView key={item.option} icon={item.icon} option={item.option} />
          )
        })}
      </div>
      <div className={styles.NavigationDrawerIconView}>
        {_props.DRAWER_SETTINGS.map((item) => {
          return (
            <IconView key={item.option} icon={item.icon} option={item.option} />
          )
        })}
      </div>
      <div className={styles.LogoutIconView}>
        <IconView icon={"ICON"} option={CONSTANT.LOGOUT} />
      </div>
    </div>
  )
}

function IconView(_props: { icon: string; option: string }) {
  return (
    <div className={styles.IconView}>
      <p className={styles.IconViewIcon}>{_props.icon}</p>
      <p className={styles.IconViewIcon}>{_props.option}</p>
    </div>
  )
}
