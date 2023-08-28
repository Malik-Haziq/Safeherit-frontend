import { initializeApp } from "firebase/app"
import { getFirestore } from "@firebase/firestore"
import { getAuth, onAuthStateChanged } from "firebase/auth"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_APP_apiKey,
  authDomain: import.meta.env.VITE_REACT_APP_authDomain,
  projectId: import.meta.env.VITE_REACT_APP_projectId,
  storageBucket: import.meta.env.VITE_REACT_APP_storageBucket,
  messagingSenderId: import.meta.env.VITE_REACT_APP_messagingSenderId,
  appId: import.meta.env.VITE_REACT_APP_appId,
  measurementId: import.meta.env.VITE_REACT_APP_measurementId,
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const firestore = getFirestore(app)

// TODO temporarily story this is local storage
onAuthStateChanged(auth, (user) => {
  if (user) {
    localStorage.setItem("user", user.uid)
    localStorage.setItem("userName", user.displayName || "Profile")
  } else {
    localStorage.clear()
  }
})
