import { Modal } from "@/components"

export function UserDetails(_props: {
  openModal: boolean
  closeModal: any
  closeModalOnOverlayClick: boolean
  closeIconVisibility: boolean
  action: string
  modalControl: any
}) {
  const headings = [{}]
  const values = [{}]
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
                  <div className="pt-6 pb-10">
                    {headings.map((_, index) => {
                      return (
                        <div key={4} className="flex gap-6 items-start pb-6">
                          <h2 className="text-[#292929] font-sm font-medium basis-1/2 text-right">
                            {/* {heading || ""} */}
                          </h2>
                          {headings[index] === "Pulse status" ? (
                            <div className="w-[170px] text-[#4D4D4D] font-medium text-xs basis-1/2">
                              <p>{_props.modalControl["Pulse status"].title}</p>
                              <span
                                className={
                                  _props.modalControl[
                                    "Pulse status"
                                  ].subTitle.toLowerCase() ===
                                  "waiting for answer"
                                    ? "w-[80px] text-[#52CEB7] font-medium text-xs"
                                    : _props.modalControl[
                                        "Pulse status"
                                      ].subTitle.toLowerCase() ===
                                      "pending login"
                                    ? "w-[80px] text-[#04477B] font-medium text-sm"
                                    : _props.modalControl[
                                        "Pulse status"
                                      ].subTitle.toLowerCase() === "login done"
                                    ? "w-[80px] text-[#27AE60] font-medium text-sm"
                                    : "w-[80px] text-[#04477B] font-medium text-sm"
                                }
                              >
                                {_props.modalControl["Pulse status"].subTitle}
                              </span>
                            </div>
                          ) : (
                            <p className="text-[#585858] basis-1/2">
                              {/* {values[index]} */}
                            </p>
                          )}
                        </div>
                      )
                    })}
                  </div>
                  <div className="flex justify-end gap-2 w-full py-4 px-5 border-t-2 border-[#F0F0F0]">
                    <button className="primary-btn rounded-lg font-sm font-medium text-[#414141] bg-white border-[1px] shadow-none border-[#DBDBDB]">
                      Edit
                    </button>
                    <button className="primary-btn rounded-lg font-sm font-medium">
                      Delete
                    </button>
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
  modalControl: {
    "User name": string,
    "User id": string,
    "User email": string,
    "Joining date": string,
    "Plan": string,
    "Payment status": string,
    "Account type": string,
    "Pulse status": string
  }
}) {
  const headings = Object.keys(_props.modalControl)
  const values = Object.values(_props.modalControl)
  return (
    <Modal
      openModal={_props.openModal}
      closeModal={_props.closeModal}
      closeModalOnOverlayClick={_props.closeModalOnOverlayClick}
      modalTitle={"View User"}
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
                            {heading.toLocaleUpperCase()}
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