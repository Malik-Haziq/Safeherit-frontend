import { Modal } from "@/components"
import { User } from "@/types"

export function NewUserModal(_props: {
  openModal: boolean
  closeModal: any
  closeModalOnOverlayClick: boolean
  closeIconVisibility: boolean
  _handleChange: Function
  _submitModal: Function
  modalControl: any
}) {
  return (
    <Modal
      openModal={_props.openModal}
      closeModal={_props.closeModal}
      closeModalOnOverlayClick={_props.closeModalOnOverlayClick}
      modalTitle={ "Create User"}
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
            inputStyles: "rounded-3xl w-full",
            hasRightIcon: false,
            inputContainerStyles: "mx-7 mt-7 mb-4 relative",
          },
        },
        {
          type: "inputView",
          props: {
            name: "phoneNumber",
            type: "text",
            placeholder: "Phone Number",
            value: _props.modalControl.phoneNumber,
            _handleChange: _props._handleChange,
            required: true,
            inputStyles: "rounded-3xl w-full",
            hasRightIcon: false,
            inputContainerStyles: "mx-7 mb-4 relative",
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
            inputStyles: "rounded-3xl w-full",
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
  const USER_HEADINGS: {[key: string]: string; } = {
    "displayName": "User name",
    "id": "User id",
    "email": "User email",
    "joining_date": "Joining date",
    "plan": "Plan",
    "payment_status": "Payment status",
    "account_status": "Account type",
    "pulse_status": "Pulse status"
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
    "Email": string,
    "Phone Number": string,
    "Display Name": string,
    "Password": string,
  }
}) {
  const headings = Object.keys(_props.modalControl)
  const values = Object.values(_props.modalControl)
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
                    {headings.map((heading, index) => {
                      return (
                        <div
                          key={index}
                          className="flex gap-6 items-center pb-6"
                        >
                          <h2 className="text-[#292929] font-sm font-medium basis-2/5 text-right">
                            {heading}
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