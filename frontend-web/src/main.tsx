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
// TODO create a custom loading screen for suspense
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading...</div>}> 
      <Provider store={store}>
        <PersistGate loading={<div>loading</div>} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </Suspense>
  </React.StrictMode>,
)
