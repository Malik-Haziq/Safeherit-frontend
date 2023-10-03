import { InputField, SelectField } from ".."
import iconDown from '@images/Arrow-Down-Circle.svg'

export function PhoneNumField() {
  return (
    <div className="flex">
        <SelectField
          data={[{value: '92', label: '92'},{value: '92', label: '92'}]}
          value={''}
          setSelectedValue={() => {}}
          hasRightIcon={true}
          rightIcon={iconDown}
          rightIconAlt={""}
          selectFieldWidth={0}
          selectFieldStyles={'w-[100px] bg-[#F5FAFD] rounded-tl-[18px] rounded-bl-[18px] flex'}
        />
      <InputField
        name={""}
        type={"text"}
        placeholder={"Phone Number"}
        value={""}
        _handleChange={() => {}}
        required={true}
        inputStyles={"w-full rounded-tl-none rounded-bl-none"}
        inputContainerStyles={"w-[400px]"}
        mask="tel"
      />
    </div>
  )
}
