import React, { useState } from "react"

export function InputField(_props: {
  name: string
  type: string
  placeholder: string
  value: string
  _handleChange: any
  required: boolean
  inputStyles: string
  hasRightIcon?: boolean
  icon?: string
  iconAlt?: string
  iconPress?: React.MouseEventHandler<HTMLImageElement>
  rightIconStyles?: string
  inputContainerStyles: string
  disabled?: boolean
  mask?: "card" | "currency" | "date" | "time" | "phone"
  // mask?: string
}) {

  const _handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (_props.mask) {
      const inputValue = e.target.value.replace(/\s/g, "") // Remove existing spaces
      let formatted = inputValue
      switch (_props.mask) {
        case "card": {
          const formatted = inputValue
            .replace(/(\d{4})/g, "$1 ") // Add spaces after every four digits
            .trim() // Remove trailing space

          const customEvent = {
            target: {
              name: e.target.name,
              value: formatted,
            },
          };
          _props._handleChange(customEvent as React.ChangeEvent<HTMLInputElement>);
          break
        }
        case "date": {
          // formatted = inputValue
          //   .replace(/(\d{2})(\d{2})(\d{4})/, "$1/$2/$3") // Format as MM/DD/YYYY
          //   .slice(0, 10) // Limit to MM/DD/YYYY

           // Update the formatted value in state
           const customEvent = {
            target: {
              name: e.target.name,
              value: formatted,
              type: Date,
            },
          };
          // _props._handleChange(customEvent as React.ChangeEvent<HTMLInputElement>);
          break;
        }
        case "time": {
          formatted = inputValue
            .replace(/(\d{2})(\d{2})/, "$1:$2") // Format as HH:MM
            .slice(0, 5) // Limit to HH:MM

           // Update the formatted value in state
          _props._handleChange({
            ...e,
            target: {
              ...e.target,
              value: formatted, // Update the value with formatted value
            },
          })
        }
        case "currency": {
          // Format as currency with two decimal places
          formatted = inputValue.replace(/\D/g, "") // Remove non-numeric characters
          const match = formatted.match(/^(\d*)(\d{0,2})$/) // Split into whole and decimal parts
          if (match) {
            formatted = `$${match[1] || "0"}.${match[2] || "00"}`
          }

           // Update the formatted value in state
          _props._handleChange({
            ...e,
            target: {
              ...e.target,
              value: formatted, // Update the value with the formatted value
            },
          })
        }
        case "phone": {
          e.target.setAttribute('type', 'number')
        }
      }
    } else {
      _props._handleChange(e)
    }
  }
  return (
    <div className={_props.inputContainerStyles}>
      <input
        name={_props.name || ""}
        type={_props.type || "text"}
        placeholder={_props.placeholder || "input field"}
        value={_props.value}
        onChange={_handleInputChange}
        required={_props.required || false}
        disabled={_props.disabled || false}
        className={
          _props.inputStyles +
          " border-0 bg-safe-gray py-4 px-4 w-490px placeholder:text-[#6F767B] outline-none rounded-[22px]"
        }
      />
      {_props.hasRightIcon && (
        <img
          src={_props.icon}
          alt={_props.iconAlt}
          onClick={_props.iconPress}
          className={
            _props.rightIconStyles || "absolute right-4 top-4 cursor-pointer"
          }
        />
      )}
    </div>
  )
}
