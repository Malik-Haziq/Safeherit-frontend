import React from "react"
import { Modal } from "@/components"
import { User } from "@/types"

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
            dataCy: "user-email-input-field",
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
            dataCy: "new-user-phone-number",
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
            dataCy: "user-name-input-field",
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
            dataCy: "create-new-user-button",
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
            dataCy: "activate-and-deactivate-user-account-button",
            title: "Activate / Deactivate",
            onclick: _props.toggleUserAccount,
            buttonStyle: "",
            buttonContainer: "mx-48 my-10",
          },
        },
        {
          type: "buttonView",
          props: {
            dataCy: "offer-free-trial-button",
            title: "Free trial",
            onclick: _props.offerFreeTrial,
            buttonStyle: "",
            buttonContainer: "mx-48 mb-10",
          },
        },
        {
          type: "buttonView",
          props: {
            dataCy: "set-pulse-check-button",
            title: "Pulse Check",
            onclick: () => {},
            buttonStyle: "",
            buttonContainer: "mx-48 mb-10",
          },
        },
        {
          type: "buttonView",
          props: {
            dataCy: "update-account-details-button",
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
            dataCy: "pulse-free-trial-till-data-input-field",
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
            dataCy: "pulse-check-free-trial-reason-input-field",
            name: "reason",
            type: "text",
            placeholder: "Reason",
            value: _props.modalControl.reason,
            _handleChange: _props._handleChange,
            required: true,
            inputStyles: "rounded-3xl w-full border-2",
            hasRightIcon: false,
            inputContainerStyles: "mx-7 my-7 mb-4 relative",
            pattern: "d{4}-d{2}-d{2}",
          },
        },
        {
          type: "buttonView",
          props: {
            dataCy: "give-free-trial-button",
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
