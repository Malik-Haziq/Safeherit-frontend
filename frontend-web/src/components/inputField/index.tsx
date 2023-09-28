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
}) {
  return (
    <div className={_props.inputContainerStyles}>
      <input
        name={_props.name || ""}
        type={_props.type || "text"}
        placeholder={_props.placeholder || "input field"}
        value={_props.value}
        onChange={_props._handleChange}
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