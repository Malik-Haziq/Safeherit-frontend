import React from "react"
import { Modal } from "@/components"
import stepOne from "@images/step_1_of_4.svg"
import stepTwo from "@images/step_2_of_4.svg"
import stepThree from "@images/step_3_of_4.svg"
import stepFour from "@images/step_4_of_4.svg"
import videoImg from "@images/register_page_video.png"
import radioBlueIcon from "@images/radio-icon-blue.svg"
import radioGrayIcon from "@images/radio-icon-gray.svg"
import linkFacebook from "@images/link-facebook.svg"
import linkTwitter from "@images/link-twitter.svg"
import linkInsta from "@images/link-insta.svg"
import checkmark from "@images/checkmark.svg"

import { useEffect, useState } from "react"
interface CustomChangeEvent {
  target: {
    name: string
    value: string | ArrayBuffer | null | undefined
  }
}

export function StepOneModal(_props: {
  openModal: boolean
  closeModal: any
  closeModalOnOverlayClick: boolean
  closeIconVisibility: boolean
  action: string
  _handleChange: React.ChangeEventHandler<HTMLInputElement>
  _submitModal: () => void
}) {
  return (
    <Modal
      openModal={_props.openModal}
      closeModal={_props.closeModal}
      closeModalOnOverlayClick={_props.closeModalOnOverlayClick}
      modalTitle={"Setup Pulse Check"}
      closeIconVisibility={_props.closeIconVisibility}
      elements={[
        {
          type: "iconView",
          props: {
            image: stepOne,
            imageStyles: "mx-auto",
            imageContainerStyles: "my-7",
          },
        },
        {
          type: "textView",
          props: {
            text: "How does Pulse Check work:",
            textStyles: "text-[#00192B] font-semibold pl-7 mb-3",
          },
        },
        {
          type: "videoView",
          props: {
            video: videoImg,
            onclick: () => {},
            videoStyles: "w-full h-full rounded-3xl",
            videoContainerStyles: "w-[490px] h-[260px] mx-auto mb-10",
          },
        },
        {
          type: "buttonView",
          props: {
            title: "Next",
            onclick: _props._submitModal,
            buttonStyle: "",
            buttonContainer: "mx-48 mb-10",
          },
        },
      ]}
    />
  )
}

export function StepTwoModal(_props: {
  openModal: boolean
  closeModal: any
  closeModalOnOverlayClick: boolean
  closeIconVisibility: boolean
  action: string
  _handleChange: React.ChangeEventHandler<HTMLInputElement>
  modalControl: {
    pulseCheckDays: string
    pulseCheckEmail1: string
    pulseCheckEmail2: string
    pulseCheckEmail3: string
    pulseCheckPhone1: string
    pulseCheckPhone2: string
  }
  _submitModal: () => void
  arrayLength: any
  showPreviousModal: any
}) {
  const [selectedDays, setSelectedDays] = useState("30")
  const [customDays, setCustomDays] = useState("")

  function handleDays(days: string) {
    setCustomDays("")
    setSelectedDays(days)
    const customEvent: CustomChangeEvent = {
      target: {
        name: "pulseCheckDays",
        value: days,
      },
    }
    _props._handleChange(customEvent as React.ChangeEvent<HTMLInputElement>)
  }

  function handleCustomDays(event: { target: { name: any; value: any } }) {
    setSelectedDays("")
    setCustomDays(event.target.value)
    const customEvent: CustomChangeEvent = {
      target: {
        name: "pulseCheckDays",
        value: event.target.value,
      },
    }
    _props._handleChange(customEvent as React.ChangeEvent<HTMLInputElement>)
  }

  return (
    <Modal
      openModal={_props.openModal}
      closeModal={_props.closeModal}
      closeModalOnOverlayClick={_props.closeModalOnOverlayClick}
      modalTitle={"Setup Pulse Check"}
      closeIconVisibility={_props.closeIconVisibility}
      arrayLength={_props.arrayLength}
      showPreviousModal={_props.showPreviousModal}
      elements={[
        {
          type: "iconView",
          props: {
            image: stepTwo,
            imageStyles: "mx-auto",
            imageContainerStyles: "my-7",
          },
        },
        {
          type: "textView",
          props: {
            text: "How often should we e-mail to check up on you? Every:",
            textStyles: "text-[#00192B] font-semibold pl-7 mb-3",
          },
        },

        {
          type: "multiFields",
          containerStyles: "flex ",
          props: {
            fields: [
              {
                type: "customView",
                props: {
                  customViewContainer: "mx-7 mb-3",
                  CustomView: () => {
                    return (
                      <div className="flex gap-2">
                        <div
                          className={
                            selectedDays == "30"
                              ? "w-[240px] bg-[#F6F6F6] flex items-center justify-between py-4 px-5 rounded-2xl cursor-pointer border-[1px] border-[#0C8AC1]"
                              : "w-[240px] bg-[#F6F6F6] flex items-center justify-between py-4 px-5 rounded-2xl border-[1px] cursor-pointer"
                          }
                          onClick={() => handleDays("30")}
                        >
                          <p className="text-[#00192B] font-semibold">
                            30{" "}
                            <span className=" font-medium text-sm">Days</span>
                          </p>
                          {selectedDays == "30" ? (
                            <img src={radioBlueIcon} alt="radio icon" />
                          ) : (
                            <img src={radioGrayIcon} alt="radio icon" />
                          )}
                        </div>
                        <div
                          className={
                            selectedDays == "60"
                              ? "w-[240px] bg-[#F6F6F6] flex items-center justify-between py-4 px-5 rounded-2xl cursor-pointer border-[1px] border-[#0C8AC1]"
                              : "w-[240px] bg-[#F6F6F6] flex items-center justify-between py-4 px-5 rounded-2xl border-[1px] cursor-pointer"
                          }
                          onClick={() => handleDays("60")}
                        >
                          <p className="text-[#00192B] font-semibold">
                            60{" "}
                            <span className=" font-medium text-sm">Days</span>
                          </p>
                          {selectedDays == "60" ? (
                            <img src={radioBlueIcon} alt="radio icon" />
                          ) : (
                            <img src={radioGrayIcon} alt="radio icon" />
                          )}
                        </div>
                      </div>
                    )
                  },
                },
              },
            ],
          },
        },
        {
          type: "multiFields",
          containerStyles: "flex items-center gap-2 mx-7",
          props: {
            fields: [
              {
                type: "customView",
                props: {
                  customViewContainer: "",
                  CustomView: () => {
                    return (
                      <div
                        className={
                          selectedDays == "90"
                            ? "w-[240px] bg-[#F6F6F6] flex items-center justify-between py-4 px-5 rounded-2xl cursor-pointer border-[1px] border-[#0C8AC1]"
                            : "w-[240px] bg-[#F6F6F6] flex items-center justify-between py-4 px-5 rounded-2xl border-[1px] cursor-pointer"
                        }
                        onClick={() => handleDays("90")}
                      >
                        <p className="text-[#00192B] font-semibold">
                          90 <span className=" font-medium text-sm">Days</span>
                        </p>
                        {selectedDays == "90" ? (
                          <img src={radioBlueIcon} alt="radio icon" />
                        ) : (
                          <img src={radioGrayIcon} alt="radio icon" />
                        )}
                      </div>
                    )
                  },
                },
              },
              {
                type: "inputView",
                props: {
                  name: "pulseCheckDays",
                  type: "number",
                  placeholder: "Custom",
                  value: customDays,
                  _handleChange: handleCustomDays,
                  required: false,
                  inputStyles:
                    "w-[240px] bg-[#F6F6F6] flex items-center justify-between py-4 rounded-2xl focus:outline-none placeholder:text-[#00192B] placeholder:font-semibold",
                  inputContainerStyles: "",
                  hasRightIcon: false,
                },
              },
            ],
          },
        },
        {
          type: "textView",
          props: {
            text: "Please enter an e-mail address you check regularly",
            textStyles: "text-[#00192B] font-semibold pl-7 mb-3",
          },
        },

        {
          type: "inputView",
          props: {
            name: "pulseCheckEmail1",
            type: "text",
            placeholder: "Email",
            value: _props.modalControl.pulseCheckEmail1,
            _handleChange: _props._handleChange,
            required: false,
            inputStyles: "rounded-3xl border-[rgba(6, 90, 147, 0.30)] border-2",
            inputContainerStyles: "mx-7 mb-2",
            hasRightIcon: false,
            disabled: true,
          },
        },
        {
          type: "inputView",
          props: {
            name: "pulseCheckEmail2",
            type: "text",
            placeholder: "Backup email 1",
            value: _props.modalControl.pulseCheckEmail2,
            _handleChange: _props._handleChange,
            required: false,
            inputStyles: "rounded-3xl border-[rgba(6, 90, 147, 0.30)] border-2",
            inputContainerStyles: "mx-7 mb-2",
          },
        },
        {
          type: "inputView",
          props: {
            name: "pulseCheckEmail3",
            type: "text",
            placeholder: "Backup email 2",
            value: _props.modalControl.pulseCheckEmail3,
            _handleChange: _props._handleChange,
            required: false,
            inputStyles: "rounded-3xl border-[rgba(6, 90, 147, 0.30)] border-2",
            inputContainerStyles: "mx-7 mb-2 ",
          },
        },
        {
          type: "textView",
          props: {
            text: "Please enter a phone number. This will only be used to confirm you are alive if we cannot reach you by e-mail:",
            textStyles: "text-[#00192B] font-semibold px-7 mb-3",
          },
        },
        {
          type: "phoneNumberView",
          props: {
            name: "pulseCheckPhone1",
            placeholder: "Phone Number",
            value: _props?.modalControl?.pulseCheckPhone1?.split(" ")[1],
            code: _props?.modalControl?.pulseCheckPhone1?.split(" ")[0],
            inputStyles: "",
            inputContainerStyles: "",
            selectFieldStyles: "",
            selectFieldMenuWidth: "",
            _handleChange: _props._handleChange,
          },
        },

        {
          type: "phoneNumberView",
          props: {
            name: "pulseCheckPhone2",
            placeholder: "Backup Phone Number",
            value: _props?.modalControl?.pulseCheckPhone2?.split(" ")[1],
            code: _props?.modalControl?.pulseCheckPhone2?.split(" ")[0],
            inputStyles: "",
            inputContainerStyles: "",
            selectFieldStyles: "",
            selectFieldMenuWidth: "",
            _handleChange: _props._handleChange,
          },
        },
        {
          type: "buttonView",
          props: {
            title: "Confirm & Next",
            onclick: _props._submitModal,
            buttonStyle: "",
            buttonContainer: "mx-48 mb-10",
          },
        },
      ]}
    />
  )
}

export function StepThreeModal(_props: {
  openModal: boolean
  closeModal: any
  closeModalOnOverlayClick: boolean
  closeIconVisibility: boolean
  action: string
  _handleChange: React.ChangeEventHandler<HTMLInputElement>
  _submitModal: () => void
  arrayLength: any
  showPreviousModal: any
}) {
  return (
    <Modal
      openModal={_props.openModal}
      closeModal={_props.closeModal}
      closeModalOnOverlayClick={_props.closeModalOnOverlayClick}
      modalTitle={"Setup Pulse Check"}
      closeIconVisibility={_props.closeIconVisibility}
      arrayLength={_props.arrayLength}
      showPreviousModal={_props.showPreviousModal}
      elements={[
        {
          type: "iconView",
          props: {
            image: stepThree,
            imageStyles: "mx-auto",
            imageContainerStyles: "my-7",
          },
        },
        {
          type: "textView",
          props: {
            text: "Link your social media profiles to your account:",
            textStyles: "text-[#00192B] font-semibold pl-7 mb-3",
          },
        },
        {
          type: "textView",
          props: {
            text: "SafeHerit will reset the Pulse Check timer automatically when it detects that you are active on your social media accounts. SafeHerit will only check for signs of your activity and will not get any details such as what you posted or who you interacted with.",
            textStyles: "text-[#4F4F4F] pl-7 mb-3",
          },
        },
        {
          type: "customView",
          props: {
            customViewContainer: "mx-7",
            CustomView: () => {
              return (
                <div className="flex flex-col gap-3 mb-3">
                  <div className="flex items-center  gap-3">
                    <img
                      src={linkFacebook}
                      alt="icon for linking facebook account"
                    />
                    <a href="#" className="text-[#00192B] underline">
                      Click to link your Facebook account
                    </a>
                  </div>
                  <div className="flex items-center  gap-3">
                    <img
                      src={linkTwitter}
                      alt="icon for linking twitter account"
                    />
                    <a href="#" className="text-[#00192B] underline">
                      Click to link your Facebook account
                    </a>
                  </div>
                  <div className="flex items-center  gap-3">
                    <img
                      src={linkInsta}
                      alt="icon for linking instagram account"
                    />
                    <a href="#" className="text-[#00192B] underline">
                      Click to link your Facebook account
                    </a>
                  </div>
                </div>
              )
            },
          },
        },
        {
          type: "buttonView",
          props: {
            title: "Confirm & Next",
            onclick: _props._submitModal,
            buttonStyle: "",
            buttonContainer: "mx-48 mb-10",
          },
        },
      ]}
    />
  )
}

export function StepFourModal(_props: {
  openModal: boolean
  closeModal: any
  closeModalOnOverlayClick: boolean
  closeIconVisibility: boolean
  action: string
  _handleChange: React.ChangeEventHandler<HTMLInputElement>
  modalControl: {
    pulseCheckValidationRequired: string
    pulseCheckNonValidationMonths: string
  }
  _submitModal: () => void
  arrayLength: any
  showPreviousModal: any
}) {
  const [getResponseFromValidator, setGetResponseFromValidator] =
    useState("opt-1")

  function handleClick(selectedOption: string) {
    setGetResponseFromValidator(selectedOption)
  }

  useEffect(() => {
    if (_props.modalControl.pulseCheckValidationRequired == "true") {
      triggerEvent("pulseCheckNonValidationMonths", "0")
    }
  }, [_props.modalControl.pulseCheckValidationRequired])

  useEffect(() => {
    if (_props.modalControl.pulseCheckNonValidationMonths == "3") {
      triggerEvent("pulseCheckValidationRequired", "false")
    }
  }, [_props.modalControl.pulseCheckNonValidationMonths])

  useEffect(() => {
    if (getResponseFromValidator == "opt-1") {
      triggerEvent("pulseCheckValidationRequired", "true")
    } else {
      triggerEvent("pulseCheckNonValidationMonths", "3")
    }
  }, [getResponseFromValidator])

  const triggerEvent = (name: string, value: string) => {
    const customEvent: CustomChangeEvent = {
      target: {
        name: name,
        value: value,
      },
    }
    _props._handleChange(customEvent as React.ChangeEvent<HTMLInputElement>)
  }

  return (
    <Modal
      openModal={_props.openModal}
      closeModal={_props.closeModal}
      closeModalOnOverlayClick={_props.closeModalOnOverlayClick}
      modalTitle={"Setup Pulse Check"}
      closeIconVisibility={_props.closeIconVisibility}
      arrayLength={_props.arrayLength}
      showPreviousModal={_props.showPreviousModal}
      elements={[
        {
          type: "iconView",
          props: {
            image: stepFour,
            imageStyles: "mx-auto",
            imageContainerStyles: "my-7",
          },
        },

        {
          type: "textView",
          props: {
            text: "We recommend that you register at least two validators in case one of them cannot be reached. SafeHerit will make your encrypted data available to your beneficiaries as soon as one of your validators confirms your passing.",
            textStyles: "text-[#4F4F4F] px-7 mb-3 text-start",
          },
        },
        {
          type: "textView",
          props: {
            text: "Below you can define how SafeHerit should proceed if we get no response from any of your validators after multiple attempts using all the contact information you registered.",
            textStyles: "text-[#4F4F4F] px-7 mb-9 text-start",
          },
        },
        {
          type: "textView",
          props: {
            text: "If we get no response from any validator:  ",
            textStyles: "text-[#00192B] font-semibold pl-7 mb-3 text-start",
          },
        },
        {
          type: "customView",
          props: {
            customViewContainer: "mx-7",
            CustomView: () => {
              return (
                <div className="flex flex-col gap-3 mb-10">
                  <div
                    className={
                      getResponseFromValidator == "opt-1"
                        ? "flex items-center gap-3 text-sm font-semibold mb-3 text-[#474747]"
                        : "flex items-center gap-3 text-sm font-medium mb-3 text-[#8C8C8C]"
                    }
                    onClick={() => handleClick("opt-1")}
                  >
                    {getResponseFromValidator == "opt-1" ? (
                      <img src={checkmark} alt="checkmark" className="w-6 h-6"/>
                      ) : (
                        <div className="w-6 h-6 border-2 shrink-0 rounded-sm"></div>
                    )}

                    <p className="text-start cursor-default">
                      Keep following up: do not contact my beneficiaries unless
                      you get a confirmation from a validator.
                    </p>
                  </div>
                  
                  <div
                    className={
                      getResponseFromValidator == "opt-2"
                        ? "flex items-center gap-3 text-sm font-semibold mb-3 text-[#474747]"
                        : "flex items-center gap-3 text-sm font-medium mb-3 text-[#8C8C8C]"
                    }
                    onClick={() => handleClick("opt-2")}
                  >
                    {getResponseFromValidator == "opt-2" ? (
                      <img src={checkmark} alt="checkmark" className="w-6 h-6"/>
                    ) : (
                      <div className="w-6 h-6 border-2 shrink-0 rounded-sm"></div>
                    )}

                    <p className="text-start cursor-default">
                      Make the data available to my beneficiaries after n months
                      without a response from any validator.
                    </p>
                  </div>
                </div>
              )
            },
          },
        },
        {
          type: "buttonView",
          props: {
            title: "Done",
            onclick: _props._submitModal,
            buttonStyle: "",
            buttonContainer: "mx-48 mb-10",
          },
        },
      ]}
    />
  )
}

export function SuccessModal(_props: {
  openModal: boolean
  closeModal: any
  closeModalOnOverlayClick: boolean
  closeIconVisibility: boolean
  action: string
  _submitModal: React.MouseEventHandler<HTMLButtonElement>
}) {
  return (
    <Modal
      openModal={_props.openModal}
      closeModal={_props.closeModal}
      closeModalOnOverlayClick={_props.closeModalOnOverlayClick}
      modalTitle={"Setup Pulse Check"}
      closeIconVisibility={_props.closeIconVisibility}
      elements={[
        {
          type: "iconView",
          props: {
            image: stepFour,
            imageStyles: "mx-auto",
            imageContainerStyles: "mt-7 mb-24",
          },
        },
        {
          type: "textView",
          props: {
            text: "You successfully setup your Pulse Check!",
            textStyles:
              "text-[#082A44] text-2xl font-bold text-center mb-32 px-12",
          },
        },
        {
          type: "textView",
          props: {
            text: "Click here to to start registering your first Assets.",
            textStyles: "text-[#4F4F4F]  text-center mb-8 px-7",
          },
        },
        {
          type: "buttonView",
          props: {
            title: "Done",
            onclick: _props._submitModal,
            buttonStyle:
              "bg-[#0971AA] font-bold text-white px-8 py-4 w-[225px] rounded-2xl mx-auto",
            buttonContainer: "flex mb-10",
          },
        },
      ]}
    />
  )
}
