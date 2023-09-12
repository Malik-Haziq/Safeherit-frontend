import Select, { components } from "react-select"
import styles from "./SelectField.module.css"
import { useRef, useState } from "react"
/**
 * Component that displays user information.
 * @component
 * @param {object} _props - The _props required for component functioning.
 * @param {string} _props.selectContainer - select field container styles.
 * @param {Array} _props.data - array of values
 * @param {number} _props.value - selected value
 * @param {function} _props.setSelectedValue - set selected value to this method
 * @param {boolean} _props.hasRightIcon - display if has right icon
 * @param {string} _props.rightIcon - path to right icon
 * @param {string} _props.rightIconAlt -
 * @param {string} _props.rightIconStyles - right icon styles
 * @param {number} _props.selectFieldWidth - need to provide width
 *
 *
 * @property
 * @param _props.selectProps
 * @param _props.selectProps.isClearable
 * @param _props.selectProps.isMulti
 * @param _props.selectProps.isSearchable
 * @param _props.selectProps.menuPlacement
 * @param _props.selectProps.isDisabled
 * @param _props.selectProps.minMenuHeight
 * @param _props.selectProps.maxMenuHeight
 */

const IndicatorsContainer = (props?: any) => {
  return (
    <components.IndicatorsContainer {...props}>
      <></>
    </components.IndicatorsContainer>
  )
}
const selectFieldStyles = (selectFieldWidth: number) => {
  return {
    control: (baseStyles: any) => ({
      ...baseStyles,
      borderWidth: "0px",
      height: "56px",
      backgroundColor: "",
      color: "#6F767B",
      fontFamily: "Montserrat",
      fontWeight: 500,
      fontSize: "14px",
    }),
    menuList: (baseStyles: any) => ({
      ...baseStyles,
      borderRadius: 5,
      borderColor: "white",
      backgroundColor: "white",
      fontFamily: "Montserrat",
      fontWeight: 400,
      fontSize: "14px",
    }),
  }
}
const selectFieldTheme = (theme: any) => {
  return {
    ...theme,
    borderRadius: 5,
    colors: {
      ...theme.colors,
      primary: "#F5FAFD",
      neutral0: "#0C8AC1",
    },
  }
}

export const SelectField = (_props: {
  selectContainer?: any
  data: any
  value: any
  selectProps?: any
  setSelectedValue: any
  hasRightIcon: boolean
  rightIcon: string
  rightIconAlt: string
  rightIconStyles?: string
  selectFieldWidth: number
  selectFieldStyles: any
}) => {
  const [openMenu, setOpenMenu] = useState(false)
  const selectRef = useRef<HTMLDivElement | null>(null)

  const _hanelSelect = () => {
    if (!openMenu) {
      selectRef?.current?.focus()
    }
    setOpenMenu((val) => !val)
  }

  return (
    <div className={_props.selectContainer || styles.selectContainer}>
      <div
        className={_props.selectFieldStyles || styles.selectFieldStyles}
        onClick={_hanelSelect}
      >
        <Select
          ref={selectRef}
          options={_props.data}
          onChange={_props.setSelectedValue}
          defaultValue={_props.setSelectedValue}
          value={_props.value}
          {..._props.selectProps}
          // overriding pre-defined styles
          components={{ IndicatorsContainer }}
          styles={{ ...selectFieldStyles(_props.selectFieldWidth) }}
          theme={(theme) => selectFieldTheme(theme)}
          menuIsOpen={openMenu}
        />
        {_props.hasRightIcon && (
          <img
            src={_props.rightIcon}
            alt={_props.rightIconAlt}
            className={_props.rightIconStyles || styles.rightIconStyles}
          />
        )}
      </div>
    </div>
  )
}
