import styles from "./Pricing.module.css";
import { useTranslation } from "react-i18next";

export function Pricing() {

  const { t } = useTranslation();

  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <p>
          {t("Pricing")}
        </p>
      </header>
    </div>
  )
}
