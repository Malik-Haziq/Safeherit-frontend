import React from 'react'
import { ChangeEvent, useState } from "react"

type Props = {
    _handleMFASubmit: any
    _handleMFACancel: any
    code:  Array<string>
}
export function VerificationCode({_handleMFASubmit,  _handleMFACancel, code}: Props) {

    return (
      <div className='flex sm:justify-center items-center px-4 sm:px-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        <div className="bg-white flex flex-col p-5 md:p-6  border-2 border-palladium rounded-xl w-full sm:max-w-[540px]">
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
              onClick={() => _handleMFACancel()}
              className='rounded-xl flex gap-x-4 mb-8 h-11 w-1/2 items-center justify-center px-6 border border-[#04477B] text-[#04477B]'>
              Cancel
            </button>
            <button
              onClick={() => _handleMFASubmit()}
              className="bg-safe-blue-tint rounded-xl flex h-11 w-1/2 items-center justify-center px-6 ">
              <span
                className="text-base text-white">
                Submit
              </span>
            </button>
          </div>
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
        className="transition ease-in-out duration-300 flex justify-center flex-1 items-center disabled:cursor-not-allowed border-2 outline-none focus:outline-none focus:shadow-[0_0_0_4px_rgba(209,213,218,0.45)] focus:border-2 h-[44px] md:h-[68px] w-[68px] pl-[26px] rounded-xl"
        type="text"
      />
    )
}
  