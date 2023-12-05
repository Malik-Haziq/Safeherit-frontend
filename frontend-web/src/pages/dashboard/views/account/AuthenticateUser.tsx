import styles from "../../Dashboard.module.css"
import { toast, InputField } from "@/components"
import { auth } from "@/firebase"
import {
  EmailAuthProvider,
  User,
  reauthenticateWithCredential,
} from "firebase/auth"
import { useState } from "react"
import { useAppDispatch } from "@/redux/hooks";
import { setLoaderVisibility } from "@/redux/reducers/LoaderSlice";

export default function AuthenticateUser(_props: {
  hideUserAuthenticate: Function,
  showTwoFA: Function,
}) {
  const dispatch = useAppDispatch()

  const [password, setPassword] = useState("")

  const startLoader = () => dispatch(setLoaderVisibility(true))
  const stopLoader = () => dispatch(setLoaderVisibility(false))

  const _handleChange = (event: { target: { value: any } }) => {
    const { value } = event.target
    setPassword(value)
  }

  const _handleCancel = () => {
    _props.hideUserAuthenticate();
  }

  function handleAuthentication() {
    startLoader()
    const user: User = auth.currentUser!
    const email: string = user?.email!
    const credential = EmailAuthProvider.credential(email, password)

    reauthenticateWithCredential(user, credential)
      .then(() => {
        _props.hideUserAuthenticate();
        _props.showTwoFA();
      })
      .catch((error) => {
        if (error.code === "auth/wrong-password") {
          toast("Invalid Password!", "error")
        } else {
          toast(error.code, "error")
        }
      })
      .finally(()=>{
        stopLoader()
      })
  }

  return (
    <div className={styles.AppView + " relative"}>
      <div className="flex sm:justify-center items-center px-4 sm:px-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="bg-white flex flex-col p-5 md:p-6 border-2 shadow-md shadow-gray-100/10 border-palladium rounded-xl w-full sm:max-w-[540px]">
          <div className="flex flex-col justify-between">
            <h1 className="font-medium text-[22px] leading-[130%] md:mr-8">
              Authentication
            </h1>
            <p className="text-slate-500 mt-2 text-base">
              Confirm Your Identity to Proceed
            </p>
          </div>
          <div className="space-y-4 my-6">
            <div className="relative">
              <p className="mb-2 font-semibold text-safe-text-dark-gray">Password</p>
              <InputField
                type="password"
                name="password"
                placeholder="Enter your password"
                value={password}
                _handleChange={_handleChange}
                required={true}
                inputStyles={""}
                inputContainerStyles={""} />
            </div>
          </div>
          <div className="flex justify-between mt-4 gap-x-4">
            <button
              className="border-2 border-bg-safe-blue-tint rounded-xl flex h-11 w-1/2 items-center justify-center px-6"
              onClick={_handleCancel}
            >
              <span className="text-base text-safe-text-light-gray-1">Cancel</span>
            </button>
            <button
              className="bg-safe-blue-tint rounded-xl flex h-11 w-1/2 items-center justify-center px-6"
              disabled={!password}
              onClick={handleAuthentication}
            >
              <span className="text-base text-white font-semibold">Confirm</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
