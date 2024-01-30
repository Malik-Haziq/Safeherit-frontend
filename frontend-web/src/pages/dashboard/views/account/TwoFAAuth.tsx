import React from "react"
import styles from "../../Dashboard.module.css"
import { useState, useRef } from "react"
import { auth } from "@/firebase"
import { toast } from "@/components"
import {
  useRecaptcha,
  verifyPhoneNumber,
  enrollUser,
  isValidPhoneWithRegion,
} from "@/common"
import { PhoneNumField, VerificationCode } from "@/components"
import { useAppDispatch } from "@/redux/hooks"
import { setLoaderVisibility } from "@/redux/reducers/LoaderSlice"

export default function TwoFAAuth(_props: { hideTwoFA: () => void }) {
  const dispatch = useAppDispatch()
  const authAttempts = useRef(0)
  const recaptcha = useRecaptcha("authenticate")
  const [verificationCodeId, setVerificationCodeId] = useState<string | null>(
    null,
  )
  const [confirmationCodeVisibility, setConfirmationCodeVisibility] =
    useState<boolean>(false)
  const code = new Array<string>(6).fill("")

  const startLoader = () => dispatch<any>(setLoaderVisibility(true))
  const stopLoader = () => dispatch<any>(setLoaderVisibility(false))

  async function getCode(code: string) {
    if (auth.currentUser && verificationCodeId) {
      const response = await enrollUser(
        auth.currentUser,
        verificationCodeId,
        code,
      )

      if (response) {
        toast("Number verified", "success")
        returnToAccountView()
        setVerificationCodeId("")
      } else {
        toast("Number not verified", "error")
        authAttempts.current += 1
        if (authAttempts.current > 2) {
          _handleMFACancel()
          setVerificationCodeId("")
        }
      }
    } else {
      toast("Something went wrong. Please try again.", "error")
      setVerificationCodeId("")
    }
  }

  function _handleMFASubmit() {
    const finalCode = code.reduce((previousValue, currentValue) => {
      return previousValue.concat(currentValue)
    })
    getCode(finalCode)
  }

  async function getPhoneNumber(phoneNumber: string) {
    startLoader()
    if (!auth.currentUser || !recaptcha) {
      return
    }

    const verificationId = await verifyPhoneNumber(
      auth.currentUser,
      phoneNumber,
      recaptcha,
    )

    if (!verificationId) {
      setConfirmationCodeVisibility(false)
      setVerificationCodeId(null)
    } else {
      setVerificationCodeId(verificationId)
      setConfirmationCodeVisibility(true)
    }
    stopLoader()
  }

  const _handleMFACancel = () => {
    setConfirmationCodeVisibility(false)
    setVerificationCodeId(null)
  }

  const returnToAccountView = () => {
    _handleMFACancel()
    _props.hideTwoFA()
  }

  return (
    <div className={styles.AppView + " relative"}>
      <button
        data-cy="back-to-account-button"
        onClick={returnToAccountView}
        className=" mb-4 mt-2 p-2 hover:opacity-75 rounded-lg shadow-md my-[5px] w-[200px] mx-2"
      >
        ← Back to My Account
      </button>
      <>
        {!verificationCodeId && !confirmationCodeVisibility && (
          <PhoneRegistration getPhoneNumber={getPhoneNumber} />
        )}
        {verificationCodeId &&
          auth.currentUser &&
          confirmationCodeVisibility && (
            <VerificationCode
              _handleMFASubmit={_handleMFASubmit}
              _handleMFACancel={_handleMFACancel}
              code={code}
            />
          )}
        <div className="z-10" id="authenticate"></div>
      </>
    </div>
  )
}

function PhoneRegistration({
  getPhoneNumber,
}: {
  getPhoneNumber: (phoneNumber: string) => void
}) {
  const [phoneNumber, setPhoneNumber] = useState("")

  function handleClick() {
    if (isValidPhoneWithRegion(phoneNumber)) {
      getPhoneNumber(phoneNumber)
    } else {
      toast("Invalid Phone Number", "error")
    }
  }

  const _handleChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target
    name
    setPhoneNumber(value)
  }

  return (
    <div className="flex sm:justify-center items-center px-4 sm:px-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="bg-white flex flex-col p-5 md:p-6 border-2 shadow-md shadow-gray-100/10 border-palladium rounded-xl w-full sm:max-w-[540px]">
        <div className="flex flex-col justify-between">
          <h1 className="font-medium text-[22px] leading-[130%] md:mr-8">
            Provide your phone
          </h1>
          <p className="text-slate-500 mt-2 text-base">
            Fill in your phone number to receive the code
          </p>
        </div>
        <div className="mt-6">
          <div className="relative">
            <PhoneNumField
              name="phone_number"
              placeholder="Phone Number"
              selectFieldStyles=""
              inputStyles=""
              inputContainerStyles=""
              selectFieldMenuWidth={432}
              _handleChange={_handleChange}
              value={phoneNumber?.split(" ")[1]}
              code={phoneNumber?.split(" ")[0]}
            />
          </div>
        </div>
        <div className="flex justify-between mt-4 gap-x-4">
          <button
            data-cy="send-sms-to-phone-number-button"
            onClick={handleClick}
            className="bg-safe-blue-tint rounded-xl flex h-11 w-1/2 items-center justify-center px-6"
          >
            <span className="text-base text-white">Send SMS</span>
          </button>
        </div>
      </div>
    </div>
  )
}
