import { DashboardModal } from "./madal_dashboard"
import styles from "../../Dashboard.module.css"

export default function DashboardView() {
  return (
    <div className={styles.AppView}>
      <p>Dashboard View</p>
      <DashboardModal />
    </div>
  )
}
