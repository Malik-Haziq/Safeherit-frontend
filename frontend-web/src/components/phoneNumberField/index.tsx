import { InputField, SelectField } from ".."
import { countryCodes } from "@/common/data"
import { SelectOption } from "@/types";
import iconDown from '@images/Arrow-Down-Circle.svg'
import { useState } from "react";

export function PhoneNumField(_props: { 
  name: string
  value: string
  code: string
  placeholder: string
  selectFieldMenuWidth?: number
  selectFieldStyles?: string
  inputStyles?: string
  inputContainerStyles?: string
  _handleChange: (event: { target: { name: any; value: any } }) => void
}) {
  const [countryCode, setCountryCode] = useState<SelectOption>({value: '+1', label: '+1'})
  const [phoneNumber, setPhoneNumber] = useState('')

  const _handleChange = (code:string | undefined, value:string, name:string) => {
    setPhoneNumber(value)
    if (!code) {
      _props.code ?
      setCountryCode({value: _props.code, label: _props.code}) :
      setCountryCode({value: '+1', label: '+1'})
    }
    const customEvent = {
      target: {
        name: name,
        value: value ? code + ' ' + value : '',
      },
    }
    _props._handleChange(
      customEvent as React.ChangeEvent<HTMLInputElement>,
    )
  }

  return (
    <div className="flex">
      <SelectField
        data={countryCodes}
        value={countryCode ? countryCode : _props.code ? {value: _props.code, label: _props.code} : {value: '+1', label: '+1',}}
        setSelectedValue={setCountryCode}
        hasRightIcon={true}
        rightIcon={iconDown}
        rightIconAlt={"v"}
        selectFieldMenuWidth={_props.selectFieldMenuWidth ? _props.selectFieldMenuWidth : 500}
        selectProps={{isSearchable: true, placeholder: "+1"}}
        selectFieldStyles={_props.selectFieldStyles ? _props.selectFieldStyles : 'w-[100px] justify-between bg-[#F5FAFD] rounded-tl-[18px] rounded-bl-[18px] flex'}
      />
      <InputField
        name={_props.name}
        type={"text"}
        placeholder={_props.placeholder}
        value={phoneNumber ? phoneNumber : _props.value ? _props.value : ""}
        _handleChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          _handleChange(countryCode?.value, e.target.value, e.target.name)
        }}
        required={true}
        inputStyles={_props.inputStyles ? _props.inputStyles : "w-full rounded-tl-none rounded-bl-none"}
        inputContainerStyles={_props.inputContainerStyles ? _props.inputContainerStyles : "w-[400px]"}
        mask="tel"
      />
    </div>
  )
}


{/* 
<PhoneNumField
  name="phone_number"
  _handleChange={_handleChange}
  value={formControl?.phone_number?.split(' ')[1]}
  code={formControl?.phone_number?.split(' ')[0]}
/>
*/}