import React, { useState, useEffect } from "react"
import { Modal } from "@/components"
import { User } from "@/types"
import checkmark from "@images/checkmark.svg"

interface CustomChangeEvent {
  target: {
    name: string
    value: string | ArrayBuffer | null | undefined
  }
}
export function NewUserModal(_props: {
  openModal: boolean
  closeModal: any
  closeModalOnOverlayClick: boolean
  closeIconVisibility: boolean
  _handleChange: (event: { target: { name: any; value: any } }) => void
  _submitModal: () => void
  modalControl: {
    email: string
    phoneNumber: string
    displayName: string
    password: string
  }
}) {
  return (
    <Modal
      openModal={_props.openModal}
      closeModal={_props.closeModal}
      closeModalOnOverlayClick={_props.closeModalOnOverlayClick}
      modalTitle={"Create User"}
      closeIconVisibility={_props.closeIconVisibility}
      elements={[
        {
          type: "inputView",
          props: {
            name: "email",
            type: "text",
            placeholder: "Email",
            value: _props.modalControl.email,
            _handleChange: _props._handleChange,
            required: true,
            inputStyles: "rounded-3xl w-full border-2",
            hasRightIcon: false,
            inputContainerStyles: "mx-7 mt-7 mb-4 relative",
          },
        },
        {
          type: "phoneNumberView",
          props: {
            name: "phoneNumber",
            placeholder: "Phone Number",
            value: _props?.modalControl?.phoneNumber?.split(" ")[1],
            code: _props?.modalControl?.phoneNumber?.split(" ")[0],
            inputStyles: "",
            inputContainerStyles: "",
            selectFieldStyles: "",
            selectFieldMenuWidth: "",
            _handleChange: _props._handleChange,
          },
        },
        {
          type: "inputView",
          props: {
            name: "displayName",
            type: "text",
            placeholder: "Name",
            value: _props.modalControl.displayName,
            _handleChange: _props._handleChange,
            required: true,
            inputStyles: "rounded-3xl w-full border-2",
            hasRightIcon: false,
            inputContainerStyles: "mx-7 mb-4 relative",
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

export function UserDetail(_props: {
  openModal: boolean
  closeModal: any
  closeModalOnOverlayClick: boolean
  closeIconVisibility: boolean
  modalControl: User
}) {
  const headings = Object.keys(_props.modalControl)
  const values = Object.values(_props.modalControl)
  const USER_HEADINGS: { [key: string]: string } = {
    displayName: "User name",
    id: "User id",
    email: "User email",
    joining_date: "Joining date",
    plan: "Plan",
    payment_status: "Payment status",
    account_status: "Account type",
    pulse_status: "Pulse status",
  }

  return (
    <Modal
      openModal={_props.openModal}
      closeModal={_props.closeModal}
      closeModalOnOverlayClick={_props.closeModalOnOverlayClick}
      modalTitle={"User"}
      closeIconVisibility={_props.closeIconVisibility}
      elements={[
        {
          type: "customView",
          props: {
            customViewContainer: "",
            CustomView: () => {
              return (
                <section>
                  <div className="pt-6">
                    {headings.map((key, index) => {
                      return (
                        <div
                          key={index}
                          className="flex gap-6 items-center pb-6"
                        >
                          <h2 className="text-[#292929] font-sm font-medium basis-2/5 text-right">
                            {USER_HEADINGS[`${key}`]}
                          </h2>
                          <p className="text-[#585858] basis-3/5">
                            {values[index]}
                          </p>
                        </div>
                      )
                    })}
                  </div>
                </section>
              )
            },
          },
        },
      ]}
    />
  )
}

export function NewUserDetail(_props: {
  openModal: boolean
  closeModal: any
  closeModalOnOverlayClick: boolean
  closeIconVisibility: boolean
  modalControl: {
    email: string
    phoneNumber: string
    displayName: string
    password: string
  }
}) {
  const headings = Object.keys(_props.modalControl)
  const values = Object.values(_props.modalControl)
  const USER_HEADINGS: { [key: string]: string } = {
    email: "Email",
    phoneNumber: "Phone Number",
    displayName: "Display Name",
    password: "Password",
  }
  return (
    <Modal
      openModal={_props.openModal}
      closeModal={_props.closeModal}
      closeModalOnOverlayClick={_props.closeModalOnOverlayClick}
      modalTitle={"Your New User Credentials"}
      closeIconVisibility={_props.closeIconVisibility}
      elements={[
        {
          type: "customView",
          props: {
            customViewContainer: "",
            CustomView: () => {
              return (
                <section>
                  <div className="pt-6">
                    {headings.map((key, index) => {
                      return (
                        <div
                          key={index}
                          className="flex gap-6 items-center pb-6"
                        >
                          <h2 className="text-[#292929] font-sm font-medium basis-2/5 text-right">
                            {USER_HEADINGS[`${key}`]}
                          </h2>
                          <p className="text-[#585858] basis-3/5">
                            {values[index]}
                          </p>
                        </div>
                      )
                    })}
                  </div>
                </section>
              )
            },
          },
        },
      ]}
    />
  )
}

export function EditUser(_props: {
  openModal: boolean
  closeModal: any
  closeModalOnOverlayClick: boolean
  closeIconVisibility: boolean
  toggleUserAccount: () => void
  offerFreeTrial: () => void
  editPulseCheck: () => void
}) {
  return (
    <Modal
      openModal={_props.openModal}
      closeModal={_props.closeModal}
      closeModalOnOverlayClick={_props.closeModalOnOverlayClick}
      modalTitle={"Your New User Credentials"}
      closeIconVisibility={_props.closeIconVisibility}
      elements={[
        {
          type: "buttonView",
          props: {
            title: "Activate / Deactivate",
            onclick: _props.toggleUserAccount,
            buttonStyle: "",
            buttonContainer: "mx-48 my-10",
          },
        },
        {
          type: "buttonView",
          props: {
            title: "Free trial",
            onclick: _props.offerFreeTrial,
            buttonStyle: "",
            buttonContainer: "mx-48 mb-10",
          },
        },
        {
          type: "buttonView",
          props: {
            title: "Pulse Check",
            onclick: _props.editPulseCheck,
            buttonStyle: "",
            buttonContainer: "mx-48 mb-10",
          },
        },
        {
          type: "buttonView",
          props: {
            title: "Account",
            onclick: () => {},
            buttonStyle: "",
            buttonContainer: "mx-48 mb-10",
          },
        },
      ]}
    />
  )
}

export function FreeTrial(_props: {
  openModal: boolean
  closeModal: any
  closeModalOnOverlayClick: boolean
  closeIconVisibility: boolean
  offerFreeTrial: () => void
  _handleChange: any
  _submitModal: () => void
  modalControl: any
}) {
  return (
    <Modal
      openModal={_props.openModal}
      closeModal={_props.closeModal}
      closeModalOnOverlayClick={_props.closeModalOnOverlayClick}
      modalTitle={"Free Trial"}
      closeIconVisibility={_props.closeIconVisibility}
      elements={[
        {
          type: "inputView",
          props: {
            name: "tillDate",
            type: "date",
            placeholder: "Date",
            value: _props.modalControl.tillDate,
            _handleChange: _props._handleChange,
            required: true,
            inputStyles: "rounded-3xl w-full border-2",
            hasRightIcon: false,
            inputContainerStyles: "mx-7 mt-7 mb-4 relative",
          },
        },
        {
          type: "inputView",
          props: {
            name: "reason",
            type: "text",
            placeholder: "Reason",
            value: _props.modalControl.reason,
            _handleChange: _props._handleChange,
            required: true,
            inputStyles: "rounded-3xl w-full border-2",
            hasRightIcon: false,
            inputContainerStyles: "mx-7 my-7 mb-4 relative",
          },
        },
        {
          type: "buttonView",
          props: {
            title: "Give free trial",
            onclick: _props._submitModal,
            buttonStyle: "",
            buttonContainer: "mx-48 mb-10",
          },
        },
      ]}
    />
  )
}

export function AdminUpdatePulseCheck(_props: {
  openModal: boolean
  closeModal: any
  closeModalOnOverlayClick: boolean
  closeIconVisibility: boolean
  _handleChange: any
  _submitModal: () => void
  modalControl: any
}) {
  const [getResponseFromValidator, setGetResponseFromValidator] =
    useState("opt-1")
  const [responseMonths, setResponseMonths] = useState("3")

  function handleClick(selectedOption: string) {
    setGetResponseFromValidator(selectedOption)
  }

  useEffect(() => {
    if (_props.modalControl.pulseCheckValidationRequired == "true") {
      triggerEvent("pulseCheckNonValidationDays", "0")
    }
  }, [_props.modalControl.pulseCheckValidationRequired])

  useEffect(() => {
    if (_props.modalControl.pulseCheckNonValidationDays == "3") {
      triggerEvent("pulseCheckValidationRequired", "false")
    }
  }, [_props.modalControl.pulseCheckNonValidationDays])

  useEffect(() => {
    if (getResponseFromValidator == "opt-1") {
      triggerEvent("pulseCheckValidationRequired", "true")
    } else {
      triggerEvent("pulseCheckNonValidationDays", responseMonths)
    }
  }, [getResponseFromValidator, responseMonths])

  const triggerEvent = (name: string, value: string) => {
    const customEvent: CustomChangeEvent = {
      target: {
        name: name,
        value: value,
      },
    }
    _props._handleChange(customEvent as React.ChangeEvent<HTMLInputElement>)
  }

  const handleChange = (e: any) => {
    const value = e.target.value
    if (value == "" || (value >= 1 && value <= 90 && !value.includes("."))) {
      setResponseMonths(value)
    }
  }
  return (
    <>
      <Modal
        openModal={_props.openModal}
        closeModal={_props.closeModal}
        closeModalOnOverlayClick={_props.closeModalOnOverlayClick}
        modalTitle={"Edit pulse details"}
        closeIconVisibility={_props.closeIconVisibility}
        elements={[
          {
            type: "textView",
            props: {
              text: "How often should we e-mail to check up on? Every:",
              textStyles: "text-[#00192B] font-medium pl-7 mb-2 mt-5",
            },
          },
          {
            type: "inputView",
            props: {
              name: "pulseCheckDays",
              type: "number",
              placeholder: "Pulse Check Days",
              value: _props.modalControl.pulseCheckDays,
              _handleChange: _props._handleChange,
              required: true,
              inputStyles: "rounded-3xl w-full border-2",
              hasRightIcon: false,
              inputContainerStyles: "mx-7  mb-4 relative",
            },
          },
          {
            type: "textView",
            props: {
              text: "Please enter e-mail address",
              textStyles: "text-[#00192B] font-medium pl-7 mb-2",
            },
          },
          {
            type: "inputView",
            props: {
              name: "pulseCheckEmail1",
              type: "email",
              placeholder: "Primary email",
              value: _props.modalControl.pulseCheckEmail1,
              _handleChange: _props._handleChange,
              required: true,
              inputStyles: "rounded-3xl w-full border-2",
              hasRightIcon: false,
              inputContainerStyles: "mx-7 mb-4 relative",
            },
          },
          {
            type: "inputView",
            props: {
              name: "pulseCheckEmail2",
              type: "email",
              placeholder: "Backup email 1",
              value: _props.modalControl.pulseCheckEmail2,
              _handleChange: _props._handleChange,
              required: true,
              inputStyles: "rounded-3xl w-full border-2",
              hasRightIcon: false,
              inputContainerStyles: "mx-7 mb-4 relative",
            },
          },
          {
            type: "inputView",
            props: {
              name: "pulseCheckEmail3",
              type: "email",
              placeholder: "Backup email 1",
              value: _props.modalControl.pulseCheckEmail3,
              _handleChange: _props._handleChange,
              required: true,
              inputStyles: "rounded-3xl w-full border-2",
              hasRightIcon: false,
              inputContainerStyles: "mx-7 mb-4 relative",
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
            type: "textView",
            props: {
              text: "If we get no response from any validator:",
              textStyles: "text-[#00192B] font-medium pl-7 mb-4 mt-5",
            },
          },
          {
            type: "customView",
            props: {
              customViewContainer: "mx-7",
              CustomView: () => {
                return (
                  <div className="flex flex-col gap-3 mb-5">
                    <div
                      className={
                        getResponseFromValidator == "opt-1"
                          ? "flex items-center gap-3 text-sm font-semibold mb-3 text-[#474747]"
                          : "flex items-center gap-3 text-sm font-medium mb-3 text-[#8C8C8C]"
                      }
                      onClick={() => handleClick("opt-1")}
                    >
                      {getResponseFromValidator == "opt-1" ? (
                        <img
                          src={checkmark}
                          alt="checkmark"
                          className="w-6 h-6"
                        />
                      ) : (
                        <div className="w-6 h-6 border-2 shrink-0 rounded-sm"></div>
                      )}

                      <p className="text-start cursor-default">
                        Keep following up: do not contact my beneficiaries
                        unless you get a confirmation from a validator.
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
                        <img
                          src={checkmark}
                          alt="checkmark"
                          className="w-6 h-6"
                        />
                      ) : (
                        <div className="w-6 h-6 border-2 shrink-0 rounded-sm"></div>
                      )}

                      <p className="text-start cursor-default">
                        Make the data available to my beneficiaries after&nbsp;
                        <input
                          type="text"
                          min={1}
                          max={90}
                          onChange={handleChange}
                          autoFocus={getResponseFromValidator === "opt-2"}
                          disabled={getResponseFromValidator !== "opt-2"}
                          value={responseMonths}
                          className="inline h-7 w-16 px-3 text-safe-text-dark-gray rounded-md border-[1px] border-safe-color-gray outline-none"
                          required
                        />
                        &nbsp;days without a response from any validator.
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
              title: "Update",
              onclick: _props._submitModal,
              buttonStyle: "",
              buttonContainer: "mx-48 mb-10",
            },
          },
        ]}
      />
    </>
  )
}
