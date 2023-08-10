import styles from "./Dashboard.module.css"
import { useTranslation } from "react-i18next"

export function Dashboard() {
  const { t } = useTranslation()

  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <p>{t("Dashboard")}</p>
      </header>
    </div>
  )
}
