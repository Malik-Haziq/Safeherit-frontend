import styles from "./Dashboard.module.css"
import logo from "../../../assets/images/safeherit_log_white.svg"
import { CONSTANT } from "../../common"
import { useAppDispatch } from "../../redux/hooks"
import { logout } from "../../redux/actions/UserActions"
import { useNavigate } from "react-router-dom"

export const NavigationDrawer = (_props: {
  DRAWER_MENU: any[]
  DRAWER_SETTINGS: any[]
}) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const _handleLogout = () => {
    dispatch(logout({}))
      .unwrap()
      .then((response) => {
        console.log(response)
        navigate("/login")
      })
  }
  return (
    <div className={styles.NavigationDrawer}>
      <div className="flex items-center justify-center mt-7">
        <img className="w-48 " src={logo} alt="safeherit logo"></img>
      </div>
      <div className="mt-11 cursor-pointer">
        {_props.DRAWER_MENU.map((item) => {
          return (
            <IconView key={item.option} icon={item.icon} option={item.option} />
          )
        })}
      </div>
      <div className="mt-24 cursor-pointer">
        {_props.DRAWER_SETTINGS.map((item) => {
          return (
            <IconView key={item.option} icon={item.icon} option={item.option} />
          )
        })}
      </div>
      <div className="mt-36 cursor-pointer" onClick={_handleLogout}>
        <IconView
          icon="../../../../assets/images/Logout.svg"
          option={CONSTANT.LOGOUT}
        />
      </div>
    </div>
  )
}

function IconView(_props: { icon: string; option: string }) {
  return (
    <div className="flex items-center gap-5 w-full mb-5 py-2 px-5">
      <img src={_props.icon} alt={_props.option} />
      <p className="px-auto">{_props.option}</p>
    </div>
  )
}
