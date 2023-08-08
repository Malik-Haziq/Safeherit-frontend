import styles from "./SignUp.module.css";
import { useTranslation } from "react-i18next";

export function SignUp() {

  const { t } = useTranslation();

  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <p>
          {t("SignUp")}
        </p>
      </header>
    </div>
  )
}
