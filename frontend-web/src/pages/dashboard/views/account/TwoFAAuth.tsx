import styles from "../../Dashboard.module.css"
import { useRef, useState, ChangeEvent, useEffect } from "react";
import { auth } from "@/firebase";
import { toast } from "@/components";
import { User } from "@firebase/auth";
import { verifyPhoneNumber, enrollUser } from "@/common";
import {ApplicationVerifier, RecaptchaVerifier} from "@firebase/auth";

export default function TwoFAAuth(_props:{
  hideTwoFA: React.MouseEventHandler<HTMLButtonElement>
}) {
  const [verificationCodeId, setVerificationCodeId] = useState<string | null>(null);
  const [confirmationCodeVisibility, setConfirmationCodeVisibility] = useState<boolean>(false);
  const recaptcha = useRef<ApplicationVerifier>();

  useEffect(() => {
    const recaptchaVerifier = new RecaptchaVerifier('authenticate', {}, auth);

    recaptcha.current = recaptchaVerifier

    return () => {
      recaptchaVerifier.clear();
    }
    });

  async function getPhoneNumber(phoneNumber: string) {
    if (!auth.currentUser || !recaptcha.current) {
      return;
    }

    const verificationId = await verifyPhoneNumber(
      auth.currentUser,
      phoneNumber,
      recaptcha.current
    );

    if (!verificationId) {
      toast('Something went wrong.', 'error');
    }else {
      setVerificationCodeId(verificationId);
    }
  }

  return (
    <div className={styles.AppView}>
      <button onClick={_props.hideTwoFA} className=" mb-4 mt-2 p-2 hover:opacity-75 rounded-lg shadow-md my-[5px] w-[200px] mx-2">← Back to My Account</button>
      <>
        {
          !verificationCodeId && !confirmationCodeVisibility &&
          <PhoneRegistration
            getPhoneNumber={getPhoneNumber}
            setConfirmationCodeVisibility={setConfirmationCodeVisibility}
          />
        }
        {
          verificationCodeId &&
          auth.currentUser &&
          <CodeSignup
            currentUser={auth.currentUser}
            verificationCodeId={verificationCodeId}
            setConfirmationCodeVisibility={setConfirmationCodeVisibility}
          />
        }
        <div id='authenticate'></div>
      </>
    </div>
  )
}

function PhoneRegistration({getPhoneNumber, setConfirmationCodeVisibility}: {
  getPhoneNumber: (phoneNumber: string) => void
  setConfirmationCodeVisibility: Function
}) {
  const phoneNumber = useRef<HTMLInputElement>(null);

  function handleClick() {
    if (phoneNumber.current) {
      getPhoneNumber(phoneNumber.current.value);
    }
  }

  return (
    <div className='flex sm:justify-center items-center px-4 sm:px-0'>
      <div className="bg-white flex flex-col p-5 md:p-6  border-2 shadow-md shadow-gray-100/10  border-palladium rounded-xl w-full sm:max-w-[440px]">
        <div className="flex flex-col justify-between">
          <h1 className='font-medium text-[22px] leading-[130%] md:mr-8'>Provide your phone</h1>
          <p className='text-slate-500 mt-2 text-base'>Fill in your phone number to receive the code</p>
        </div>
        <div className="space-y-4 my-6">
          <div className="relative flex items-center">
            <input
              ref={phoneNumber}
              type="text"
              name="password"
              id="password"
              placeholder="Insert your phone number"
              className="focus:outline-none block w-full rounded-xl placeholder-gray-500 bg-gray-100 pl-12 pr-4 h-12 text-gray-600 transition duration-300 invalid:ring-2 invalid:ring-red-400 focus:ring-2 focus:ring-black"
            />
          </div>
        </div>
        <div className="flex justify-between mt-4 gap-x-4">
          <button
            onClick={() => setConfirmationCodeVisibility(true)}
            className='rounded-xl flex gap-x-4 mb-8 text-black h-11 w-1/2 items-center justify-center px-6 border border-gray-500'>Cancel</button>
          <button
            onClick={handleClick}
            className="bg-black rounded-xl flex h-11 w-1/2 items-center justify-center px-6">
            <span
              className="text-base font-light text-white">
              Send SMS
            </span>
            </button>
        </div>
      </div>
    </div>
  )
}

function CodeSignup({currentUser, verificationCodeId, setConfirmationCodeVisibility}: {
  currentUser: User,
  verificationCodeId: string
  setConfirmationCodeVisibility: Function
}) {

  async function getCode(code: string) {
    const response = await enrollUser(
      currentUser,
      verificationCodeId,
      code
    );

    if (response) {
      toast("number verified", "success")
    }else {
      toast('Something went wrong.', 'error');
      setConfirmationCodeVisibility(false)
    }
  }

  return (
    <Code 
      getCode={getCode}
      setConfirmationCodeVisibility={setConfirmationCodeVisibility}
    />
  )
}

function Code({getCode, setConfirmationCodeVisibility}: {
  getCode: (code: string) => void
  setConfirmationCodeVisibility: Function
}) {
  let code = new Array<string>(6).fill('');

  function handleClick() {
    const finalCode = code.reduce((previousValue, currentValue) => {
      return previousValue.concat(currentValue);
    })
    getCode(finalCode);
  }

  return (
    <div className="bg-white flex flex-col p-5 md:p-6  border-2 border-palladium rounded-xl w-full sm:max-w-[440px]">
      <div className="flex justify-between">
        <div>
          <h1 className='font-medium text-[22px] leading-[130%] md:mr-8'>Verify your phone</h1>
          <p className='text-slate-500 mt-2 text-base'>We sent you an SMS code to your phone number</p>
        </div>
      </div>
      <div className='flex gap-x-4 mt-6 md:mt-8 pb-4'>
        {
          code.map((value, index) => {
            return (
              <Input
                key={index}
                index={index}
                getValue={(value, index) => {
                  code[index] = value;
                }}
              />
            )
          })
        }
      </div>
      <div className="flex mt-4 gap-x-4">
        <button
          onClick={() => setConfirmationCodeVisibility(false)}
          className='rounded-xl flex gap-x-4 mb-8 text-black h-11 w-1/2 items-center justify-center px-6 border border-gray-500'>
          Cancel
        </button>
        <button
          onClick={handleClick}
          className="bg-black rounded-xl flex h-11 w-1/2 items-center justify-center px-6">
          <span
            className="text-base font-light text-white">
            Submit
          </span>
        </button>
      </div>
    </div>
  )
}

function Input({index, getValue}: {
  index: number,
  getValue: (value: string, index: number) => void
}) {
  const [value, setValue] = useState<string>('');

  function checkValue(event: ChangeEvent<HTMLInputElement>) {
    const currentValue = event.currentTarget.value.slice(-1);
    setValue(currentValue);
    getValue(currentValue, index);

    const nextElement = event.currentTarget.nextSibling;
    if (nextElement instanceof HTMLInputElement) {
      nextElement.disabled = false;
      nextElement.focus();
    }
  }

  return (
    <input
      value={value}
      disabled={index > 0}
      onChange={checkValue}
      className="transition ease-in-out duration-300 flex flex-1 items-center disabled:cursor-not-allowed border-2 outline-none focus:outline-none focus:shadow-[0_0_0_4px_rgba(209,213,218,0.45)] focus:border-2 h-[44px] md:h-[52px] w-full px-4 rounded-xl"
      type="number"
    />
  )
}