import styles from "./Dashboard.module.css"
import { NavigationDrawer } from "./NavigationDrawer"
import { DashboardNavbar } from "./DashboardNavbar"
import { Outlet, useNavigate } from "react-router-dom"
import { CONSTANT } from "../../common"
import dashboardIcon from "../../../assets/images/dashboard.svg"
import assets from "../../../assets/images/assets.svg"
import beneficiaries from "../../../assets/images/beneeficiaries.svg"
import validator from "../../../assets/images/validarors.svg"
import pulseCheck from "../../../assets/images/pulse-check.svg"
import profile from "../../../assets/images/Profile.svg"
import setting from "../../../assets/images/Setting.svg"
import diamond from "../../../assets/images/diamond.svg"
import shield from "../../../assets/images/Shield-done.svg"
import heart from "../../../assets/images/heart.svg"
import users from "../../../assets/images/users.svg"
import privateKeysIcon from "../../../assets/images/key-icon.svg"
import { useAppDispatch } from "../../redux/hooks"
import { logout } from "../../redux/actions/UserActions"

console.log(beneficiaries)

export function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const cardDettails = [
    { img: diamond, numberOfItems: "58", title: "Total Assets" },
    { img: shield, numberOfItems: "6", title: "Beneficiaries" },
    { img: users, numberOfItems: "5", title: "Validators" },
    { img: heart, numberOfItems: "22 Days", title: "Total Assets" },
    { img: privateKeysIcon, numberOfItems: "3", title: "Private Keys" },
  ]

  const DRAWER_MENU = [
    {
      icon: dashboardIcon,
      option: CONSTANT.DASHBOARD,
      navigate: () => {
        navigate("/dashboard")
      },
    },
    {
      icon: assets,
      option: CONSTANT.MY_ASSETS,
      navigate: () => {
        navigate("/dashboard/assets")
      },
    },
    {
      icon: beneficiaries,
      option: CONSTANT.BENEFICIARIES,
      navigate: () => {
        navigate("/dashboard/beneficiaries")
      },
    },
    {
      icon: validator,
      option: CONSTANT.VALIDATORS,
      navigate: () => {
        navigate("/dashboard/validators")
      },
    },
    {
      icon: pulseCheck,
      option: CONSTANT.PULSE_CHECK,
      navigate: () => {
        navigate("/dashboard/pulse")
      },
    },
  ]
  const DRAWER_SETTINGS = [
    {
      icon: profile,
      option: CONSTANT.MY_ACCOUNT,
      navigate: () => {
        navigate("/dashboard")
      },
    },
    {
      icon: setting,
      option: CONSTANT.HELP,
      navigate: () => {
        navigate("/dashboard")
      },
    },
  ]
  // TODO manually terminate the session on catch
  const _handleLogout = () => {
    dispatch(logout({}))
      .unwrap()
      .catch((err) => {
        alert(err?.code)
      })
      .finally(() => {
        navigate("/login")
      })
  }

  return (
    <div className={styles.App}>
      <NavigationDrawer
        DRAWER_MENU={DRAWER_MENU}
        DRAWER_SETTINGS={DRAWER_SETTINGS}
        _handleLogout={_handleLogout}
      />
      <section className={styles.DashboardBody}>
        <DashboardNavbar _handleLogout={_handleLogout} />
        <Outlet />
      </section>
      <section className="flex gap-4 h-[240px]">
        {cardDettails.map((det) => {
          return (
            <DetailsCard
              img={det.img}
              numberOfItems={det.numberOfItems}
              title={det.title}
            />
          )
        })}
      </section>
    </div>
  )
}

function DetailsCard(_props: {
  img: any
  numberOfItems: string
  title: string
}) {
  return (
    <div className="w-[285px] h-full p-3 flex flex-col gap-8 bg-white rounded-xl shadow-lg">
      <div className="bg-safe-light-blue-tint-1 flex items-center justify-center py-7 rounded-xl">
        <img src={_props.img} alt="" />
      </div>
      <div className="flex items-center justify-center flex-col">
        <p className="text-[28px] font-bold">{_props.numberOfItems}</p>
        <small className="text-lg text-safe-text-light-gray-1">
          {_props.title}
        </small>
      </div>
    </div>
  )
}
