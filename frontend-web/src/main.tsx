import React, { Suspense } from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./redux"
import App from "./App"
import "./index.css"
import "./i18n"
import "./firebase"
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from "./redux"
import { Spinner } from "./components/spinner/Spinner"
import styles from './pages/dashboard/Dashboard.module.css'

// TODO create a custom loading screen for suspense
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Suspense fallback={<div className={styles.AppView}>
        <div className="relative h-[80vh]">
      <Spinner/>
        </div>
      </div>}> 
      <Provider store={store}>
        <PersistGate loading={<div>loading</div>} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </Suspense>
  </React.StrictMode>,
)
