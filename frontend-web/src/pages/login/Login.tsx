import styles from "./Login.module.css"
import { useTranslation } from "react-i18next"

export function Login() {
  const { t } = useTranslation()

  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <p>{t("Login")}</p>
      </header>
    </div>
  )
}
