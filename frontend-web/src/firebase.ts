import { initializeApp } from "firebase/app"
import { getFirestore } from "@firebase/firestore"
import {
  getAuth,
  GoogleAuthProvider,
  inMemoryPersistence,
  setPersistence,
} from "firebase/auth"

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
setPersistence(auth, inMemoryPersistence)
export const provider = new GoogleAuthProvider()
export const firestore = getFirestore(app)
