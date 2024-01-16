import React, { Suspense } from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./redux"
import App from "./App"
import "./index.css"
import "./assets/i18n/en.json"
import "./firebase"
import { Spinner } from "./components/spinner/Spinner"
import styles from "./pages/dashboard/Dashboard.module.css"

// TODO create a custom loading screen for suspense
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Suspense
      fallback={
        <div className={styles.AppView}>
          <div className="relative h-[80vh]">
            <Spinner />
          </div>
        </div>
      }
    >
      <Provider store={store}>
        <App />
      </Provider>
    </Suspense>
  </React.StrictMode>,
)
