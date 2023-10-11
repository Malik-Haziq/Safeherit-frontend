import { InputField, SelectField } from ".."
import { countryCodes } from "@/common/data"
import { SelectOption } from "@/types";
import iconDown from '@images/Arrow-Down-Circle.svg'

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

  const _handleChange = (name:string, value: string, code?: SelectOption) => {
    
    let customEvent = {}
    if (name === "code") {
      customEvent = {
        target: {
          name: _props.name,
          value: code?.value != "Select Code" ? `${code?.value} ${_props.value ? _props.value : ""}` : "",
        },
      }
    }
    else {
      customEvent = {
        target: {
          name: _props.name,
          value: `${_props.code? _props.code: ''} ${value}`,
        },
      }
    }
    _props._handleChange(
      customEvent as React.ChangeEvent<HTMLInputElement>,
    )
  }

  return (
    <div className="flex">
      <SelectField
        data={countryCodes}
        value={_props.code ? {value: _props.code, label: _props.code} : {value: "Select Code", label: "Select Code"}}
        setSelectedValue={(code :SelectOption) => {_handleChange("code", "", code)}}
        hasRightIcon={true}
        rightIcon={iconDown}
        rightIconAlt={"v"}
        selectFieldMenuWidth={_props.selectFieldMenuWidth ? _props.selectFieldMenuWidth : 500}
        selectProps={{isSearchable: true, placeholder: "+1"}}
        selectFieldStyles={_props.selectFieldStyles ? _props.selectFieldStyles : 'w-[100px] justify-between bg-[#F5FAFD] rounded-tl-[18px] rounded-bl-[18px] flex'}
      />
      <InputField
        name={"phone_number"}
        type={"text"}
        placeholder={_props.placeholder}
        value={_props.value ? _props.value : ""}
        _handleChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          _handleChange(e.target.name, e.target.value)
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