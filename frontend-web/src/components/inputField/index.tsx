import React from "react"

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
  mask?: "card" | "currency" | "date" | "time" | "tel"
  // mask?: string
}) {
  const _handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (_props.mask) {
      const inputValue = e.target.value // Remove existing spaces
      let formatted = inputValue
      switch (_props.mask) {
        case "card": {
          let formattedString = inputValue.replaceAll(" ", "")

          if (/^\d+$/.test(formattedString) || formattedString == "") {

            formattedString = formattedString.replace(/(\d{4}(?=\d))/g, "$1 ")
            formattedString = formattedString.trim() 

            const customEvent = {
              target: {
                name: e.target.name,
                value: formattedString,
              }, 
            }
            _props._handleChange(
              customEvent as React.ChangeEvent<HTMLInputElement>,
            )
          }
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
          break;
        }

        case "currency": {
          let formattedString = inputValue.replaceAll(",", "");
          
          if (/^\d+$/.test(formattedString) || formattedString == "") {

            formattedString = formattedString.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            formattedString = formattedString.trim();
           
            const customEvent = {
              target: {
                name: e.target.name,
                value: formattedString,
              },
            };
          
            _props._handleChange(customEvent as React.ChangeEvent<HTMLInputElement>);
          }
          break;
        }

        case "tel":{
          const formattedString = inputValue;

          if (/^\d+$/.test(formattedString) || formattedString == "") {
            const customEvent = {
              target: {
                name: e.target.name,
                value: formattedString,
              },
            };
            _props._handleChange(customEvent as React.ChangeEvent<HTMLInputElement>);
          }
          break;
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
        type={  _props.type || "text" }
        placeholder={ _props.placeholder || "input field"}
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
