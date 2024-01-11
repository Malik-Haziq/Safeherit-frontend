import React, { useState } from "react"
import { InputField, SelectField } from ".."
import { currencyList } from "@/pages/dashboard/views/asset/data"
import { SelectOption } from "@/types"
import iconDown from "@images/Arrow-Down-Circle.svg"

export function CurrencyField(_props: {
  name: string
  value: string
  currency: string
  placeholder: string
  inputContainerStyles?: string
  containerStyles?: string
  _handleChange: React.ChangeEventHandler<HTMLInputElement>
}) {
  const _handleChange = (
    name: string,
    value: string,
    currency?: SelectOption,
  ) => {
    let customEvent = {
      target: {},
    }

    if (name === "currency") {
      customEvent.target = {
        name: "Currency",
        value: currency?.value,
      }
    } else {
      customEvent.target = {
        name: _props.name,
        value: value,
      }
    }
    _props._handleChange(customEvent as React.ChangeEvent<HTMLInputElement>)
  }

  return (
    <div
      className={
        _props.containerStyles +
        " flex border-2 bg-safe-gray placeholder:text-[#6F767B] outline-none rounded-[22px] mb-4"
      }
    >
      <SelectField
        data={currencyList}
        value={{
          value: _props.currency || "Select",
          label: _props.currency || "Select",
        }}
        setSelectedValue={(currency: SelectOption) => {
          _handleChange("currency", "", currency)
        }}
        hasRightIcon={true}
        rightIcon={iconDown}
        rightIconAlt={"v"}
        selectFieldMenuWidth={100}
        selectProps={{ isSearchable: true, placeholder: "USD" }}
        selectFieldStyles={
          "w-[100px] justify-between bg-[#F5FAFD] rounded-tl-[22px] rounded-bl-[22px] flex relative after:absolute after:content-[''] after:w-[1px] after:h-[22px] after:bg-[#B4B4B4] after:-right-3 after:top-4"
        }
      />
      <InputField
        name={_props.name}
        type={"text"}
        placeholder={_props.placeholder}
        value={_props.value}
        _handleChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          _handleChange(e.target.name, e.target.value)
        }}
        required={true}
        inputStyles={"w-full rounded-tl-none rounded-bl-none pl-6"}
        inputContainerStyles={
          _props.inputContainerStyles
            ? _props.inputContainerStyles
            : "w-[400px]"
        }
        mask="tel"
      />
    </div>
  )
}
