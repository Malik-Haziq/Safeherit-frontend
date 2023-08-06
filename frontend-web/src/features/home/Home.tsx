import { Link } from "react-router-dom";
import logo from "./logo.svg";
import styles from "./Home.module.css";
import { useTranslation } from "react-i18next";


// TODO: Example page. fix this page or remove it.
// See Counter for example with Redux Toolkit
export function Home() {

  const { t } = useTranslation();

  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <img src={logo} className={styles.AppLogo} alt="logo" />
        <p>
          {t("hello")}
        </p>
        <a>
          <Link to="/counter"> {t("go_to", { page: "Example Counter" })}</Link>
        </a>
      </header>
    </div>
  )
}
