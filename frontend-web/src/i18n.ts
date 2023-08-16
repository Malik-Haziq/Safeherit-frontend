import i18n from "i18next"
import i18nBackend from "i18next-http-backend"
import { initReactI18next } from "react-i18next"

// TODO: add staging and prod urls when needed
const getCurrentHost =
  import.meta.env.MODE === "development"
    ? "http://localhost:5173"
    : "LINK TO PROD"

// Note: The backend files for i18n can be found in assets/i18n.
i18n
  .use(i18nBackend)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    lng: "en", // TODO: add logic to get lang selected by user
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: `${getCurrentHost}/i18n/{{lng}}.json`,
    },
  })

export default i18n
