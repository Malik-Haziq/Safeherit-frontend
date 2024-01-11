import React from "react"
import defaultIcon from "@images/safeherit_logo.svg"
import closeIcon from "@images/close-icon.svg"
import arrowLeft from "@images/left-arrow.png"
import styles from "./Modal.module.css"
import { SelectField, InputField, PhoneNumField } from ".."

const DisplayFieldComponent = (_props: { element: any; index: number }) => {
  const element = _props.element
  if (element?.type === "textView") {
    return (
      <TextView
        key={_props.index}
        text={element?.props?.text}
        onclick={element?.props?.onclick}
        textStyles={element?.props?.textStyles}
      />
    )
  } else if (element?.type === "iconView") {
    return (
      <IconView
        key={_props.index}
        image={element?.props?.image}
        onclick={element?.props?.onclick}
        imageStyles={element?.props?.imageStyles}
        imageContainerStyles={element?.props?.imageContainerStyles}
      />
    )
  } else if (element?.type === "videoView") {
    return (
      <VideoView
        key={_props.index}
        video={element?.props?.video}
        onclick={element?.props?.onclick}
        videoStyles={element?.props?.videoStyles}
        videoContainerStyles={element?.props?.videoContainerStyles}
      />
    )
  } else if (element?.type === "inputView") {
    return (
      <InputField
        key={_props.index}
        name={element?.props?.name}
        type={element?.props?.type}
        placeholder={element?.props?.placeholder}
        value={element?.props?.value}
        _handleChange={element?.props?._handleChange}
        required={element?.props?.required}
        disabled={element?.props?.disabled}
        inputStyles={element?.props?.inputStyles}
        inputContainerStyles={element?.props?.inputContainerStyles}
        hasRightIcon={element?.props?.hasRightIcon}
        icon={element?.props?.icon}
        iconAlt={element?.props?.iconAlt}
        iconPress={element?.props?.iconPress}
        rightIconStyles={element?.props?.rightIconStyles}
        mask={element?.props?.mask}
      />
    )
  } else if (element?.type === "selectView") {
    return (
      <SelectField
        key={_props.index}
        data={element?.props?.data}
        value={element?.props?.value}
        selectProps={element?.props?.selectProps}
        setSelectedValue={element?.props?.setSelectedValue}
        hasRightIcon={element?.props?.hasRightIcon}
        rightIcon={element?.props?.rightIcon}
        rightIconAlt={element?.props?.rightIconAlt}
        selectFieldWidth={element?.props?.selectFieldWidth}
        rightIconStyles={element?.props?.rightIconStyles}
        selectContainer={element?.props?.selectContainer}
        selectFieldStyles={element?.props?.selectFieldStyles}
      />
    )
  } else if (element?.type === "phoneNumberView") {
    return (
      <PhoneNumField
        key={_props.index}
        name={element?.props?.name}
        placeholder={element?.props?.placeholder}
        value={element?.props?.value}
        code={element?.props?.code}
        selectFieldMenuWidth={element?.props?.selectFieldMenuWidth}
        selectFieldStyles={element?.props?.selectFieldStyles}
        inputStyles={element?.props?.inputStyles}
        inputContainerStyles={element?.props?.inputContainerStyles}
        containerStyles="mx-7"
        _handleChange={element?.props?._handleChange}
      />
    )
  } else if (element?.type === "buttonView") {
    return (
      <ButtonView
        key={_props.index}
        title={element?.props?.title}
        onclick={element?.props?.onclick}
        buttonStyle={element?.props?.buttonStyle}
        buttonContainer={element?.props?.buttonContainer}
      />
    )
  } else if (element?.type === "customView") {
    const CustomView = element?.props?.CustomView
    return (
      <div className={element?.props?.customViewContainer} key={_props.index}>
        <CustomView />
      </div>
    )
  } else if (element?.type === "TextAreaField") {
    return (
      <TextAreaField
        key={_props.index}
        name={element?.props?.name}
        placeholder={element?.props?.placeholder}
        value={element?.props?.value}
        _handleChange={element?.props?._handleChange}
        required={element?.props?.required}
        inputStyles={element?.props?.inputStyles}
        textAreaContainerStyles={element?.props?.inputContainerStyles}
        isDisabled={element?.props?.isDisabled}
      />
    )
  }
}

const MultiFieldComponent = (_props: {
  component: any
  parentIndex: number
}) => {
  return (
    <div key={_props.parentIndex} className={_props.component?.containerStyles}>
      {_props.component?.props?.fields?.map((field: any, index: number) => {
        return (
          <DisplayFieldComponent key={index} element={field} index={index} />
        )
      })}
    </div>
  )
}

const RenderModal = (_props: { elements: any }) => {
  if (_props.elements.length > 0) {
    return _props.elements?.map((element: any, index: number) => {
      if (element?.props.name === "Balance" || element?.props.name === "Acquisition cost") {
        return element
      } else if (element?.type !== "multiFields") {
        return (
          <DisplayFieldComponent key={index} element={element} index={index} />
        )
      } else {
        return (
          <MultiFieldComponent
            key={index}
            component={element}
            parentIndex={index}
          />
        )
      }
    })
  } else {
    // TODO add an empty modal view here
    return <div>Empty modal</div>
  }
}

export const Modal = (_props: {
  openModal: boolean
  closeModal: any
  closeModalOnOverlayClick: boolean
  elements: Array<any>
  modalTitle: string
  closeIconVisibility: boolean
  arrayLength?: any
  showPreviousModal?: any
  modalCustomStyles?: string
}) => {
  const elements = _props?.elements
  return (
    <>
      {_props.openModal && (
        <div className={styles.backDrop}>
          <div className={styles.modalContainer}>
            <div
              className={`${styles.modal} ${
                _props.modalCustomStyles && _props.modalCustomStyles
              } relative`}
            >
              <ModalHeader
                closeModal={_props.closeModal}
                title={_props.modalTitle}
                closeIconVisibility={_props.closeIconVisibility}
                arrayLength={_props.arrayLength}
                showPreviousModal={_props.showPreviousModal}
              />
              <RenderModal elements={elements} />
              {_props.arrayLength ? (
                <div className="absolute bottom-12">
                  <img
                    src={arrowLeft}
                    alt="Back Arrow"
                    className="cursor-pointer ml-4 w-5"
                    onClick={_props.showPreviousModal}
                  />
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function ModalHeader(_props: {
  closeModal: () => void
  title: string
  closeIconVisibility: boolean
  arrayLength?: any
  showPreviousModal?: any
}) {
  return (
    <div className={styles.header}>
      <div className={styles.title}>{_props.title}</div>
      {_props.closeIconVisibility && (
        <div className={styles.icon} onClick={_props.closeModal}>
          <img src={closeIcon} alt="close icon" className="cursor-pointer" />
        </div>
      )}
    </div>
  )
}

function TextView(_props: {
  textStyles: string
  onclick?: React.MouseEventHandler<HTMLParagraphElement>
  text: string
}) {
  return (
    <p
      className={_props.textStyles || "safe-font-default"}
      onClick={_props.onclick}
    >
      {_props.text}
    </p>
  )
}

function IconView(_props: {
  imageContainerStyles: string
  image: string
  imageStyles: string
  onclick?: React.MouseEventHandler<HTMLImageElement>
}) {
  return (
    <div className={_props.imageContainerStyles || ""}>
      <img
        src={_props.image || defaultIcon}
        alt="icon"
        className={_props.imageStyles || ""}
        onClick={_props.onclick}
      />
    </div>
  )
}

function VideoView(_props: {
  //TODO revise this component
  videoContainerStyles: string
  video: string
  videoStyles: string
  onclick?: React.MouseEventHandler<HTMLImageElement>
}) {
  return (
    <div className={_props.videoContainerStyles || ""}>
      <img
        src={_props.video || defaultIcon}
        alt="icon"
        className={_props.videoStyles || ""}
        onClick={_props.onclick}
      />
    </div>
  )
}

function TextAreaField(_props: {
  name: string
  placeholder: string
  value: string
  _handleChange: any
  required: boolean
  inputStyles: string
  textAreaContainerStyles: string
  isDisabled?: boolean
}) {
  return (
    <div className={_props.textAreaContainerStyles}>
      <textarea
        name={_props.name || ""}
        placeholder={_props.placeholder || "Text Area"}
        value={_props.value}
        onChange={_props._handleChange}
        required={_props.required || false}
        className={_props.inputStyles}
        disabled={_props.isDisabled}
      />
    </div>
  )
}

function ButtonView(_props: {
  title: string
  buttonStyle: string
  onclick: React.MouseEventHandler<HTMLButtonElement>
  buttonContainer: string
}) {
  return (
    <div className={_props.buttonContainer || styles.buttonContainer}>
      <button
        className={_props.buttonStyle || styles.buttonStyle}
        onClick={_props.onclick}
      >
        {_props.title}
      </button>
    </div>
  )
}

// {
//     show && <Modal
//     openModal={show}
//     closeModal={hidemodal}
//     closeModalOnOverlayClick={true}
//     elements= {[]}
//     modalTitle={"mehran"}
//     closeIconVisibility= {true}
//   />
// }

{
  /* <Modal
openModal = {true}
closeModal = {() => alert("modal closed")}
closeModalOnOverlayClick = {() => alert("modal closed")}
modalTitle =  "Welcome to SafeHerit!"
closeIconVisibility = {true}
elements = {[
  {
    type: 'textView',
    props: {
      text: "Before you start, watch this shortvideo about how SafeHerit works:",
      onclick: () => {},
      textStyles: ""
    }
  },
  {
    type: 'iconView',
    props: {
      image: "../assets/images/safeherit_logo.svg",
      onclick: () => {},
      imageStyles: "",
      imageContainerStyles: ""
    }
  },
  {
    type: 'videoView',
    props: {
      video: "../assets/images/safeherit_logo.svg",
      onclick: () => {},
      videoStyles: "",
      videoContainerStyles: ""
    }
  },
  {
    type: 'inputView',
    props: {
      name:"",
      type:"text",
      placeholder:"input field",
      value:"",
      _handleChange: () => {},
      required: false,
      inputStyles:"",
      inputContainerStyles: "",
      hasRightIcon: false,
      icon: "",
      iconAlt: "",
      iconPress: () => {},
      rightIconStyles: ""
    }
  },
  {
    type: 'selectView',
    props: {
      data: options,
      value: selectValue,
      selectProps: {},
      setSelectedValue: setSelectValue,
      hasRightIcon: true,
      rightIcon: icon,
      rightIconAlt: "rightIcon",
      selectFieldWidth: 490,
      selectContainer={element?.props?.selectContainer}
      selectFieldStyles={element?.props?.selectFieldStyles}
      rightIconStyles={element?.props?.rightIconStyles}
    }
  },
  {
    type: 'buttonView',
    props: {
      title: "mehran",
      onclick: () => {},
      buttonStyle: "",
      buttonContainer: "",
    }
  },
  {
    type: 'customView',
    props: {
      customViewContainer: '',
      CustomView: function Name () {
        return (
          <div>Custom Component</div>
        )
      }
    }
  },
  {
    type: 'multiFields',
    containerStyles: "flex",
    props: {
      fields: [
        {
          type: 'textView',
          props: {
            text: "Before you start, watch this shortvideo about how SafeHerit works:",
            onclick: () => {},
            textStyles: ""
          }
        },
        {
          type: 'buttonView',
          props: {
            title: "mehran",
            onclick: () => {},
            buttonStyle: "",
            buttonContainer: "",
          }
        },
      ]
    }
  }
]}
/> */
}
