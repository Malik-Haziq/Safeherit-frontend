import { Modal } from "../../../../components"
import registerAssetsImg from "../../../../../assets/images/register-assets.svg"
import stepOne from "../../../../../assets/images/step-1.svg"
import stepTwo from "../../../../../assets/images/step-2.svg"
import uploadVideoIcon from "../../../../../assets/images/upload-video.svg"
import arrowDown from "../../../../../assets/images/arrow-down.svg"

export function StepZeroInformationModal(_props: {
  openModal: boolean
  closeModal: Function
  closeModalOnOverlayClick: boolean
  closeIconVisibility: boolean
  _submitModal: Function
  action: string
}) {
  return (
    <Modal
      openModal={_props.openModal}
      closeModal={_props.closeModal}
      closeModalOnOverlayClick={_props.closeModalOnOverlayClick}
      modalTitle={"Create New Assets"}
      closeIconVisibility={_props.closeIconVisibility}
      elements={[
        {
          type: "iconView",
          props: {
            image: registerAssetsImg,
            imageStyles: "mx-auto",
            imageContainerStyles: "my-10",
          },
        },
        {
          type: "textView",
          props: {
            text: "What are Assets?",
            textStyles: "text-[#00192B] text-lg font-bold mb-4 mx-auto w-fit",
          },
        },
        {
          type: "textView",
          props: {
            text: "An asset is anything you own that has value. It could be physical, like a house or car, or intangible, like stocks or patents. It's a resource that helps you create wealth, can be converted into cash, or reduces your liabilities.",
            textStyles: "text-[#868686] leading-7 px-7 mb-8 text-center ",
          },
        },
        {
          type: "textView",
          props: {
            text: "When registering your assets on SafeHerit, you are essentially documenting what you have that is of value in order to later share that information with your beneficiaries",
            textStyles: "text-[#868686] leading-7 px-7 mb-7 text-center ",
          },
        },
        {
          type: "buttonView",
          props: {
            title: "Create Assets",
            onclick: _props._submitModal,
            buttonStyle:
              "bg-[#0971AA] font-bold text-white mx-auto px-8 py-3 rounded-2xl block",
            buttonContainer: " mb-10 ",
          },
        },
      ]}
    />
  )
}

export function StepOneModal(_props: {
  openModal: boolean
  closeModal: any
  closeModalOnOverlayClick: boolean
  closeIconVisibility: boolean
  action: string
  _handleChange: React.ChangeEventHandler<HTMLInputElement>
  modalControl: {
    bankAccount: string
    label: string
    bankName: string
    country: string
    accountNumber: any
    currency: any
    balance: any
    dabitCardPin: any
  }
  _submitModal: Function
}) {
  return (
    <Modal
      openModal={_props.openModal}
      closeModal={_props.closeModal}
      closeModalOnOverlayClick={_props.closeModalOnOverlayClick}
      modalTitle={_props.action == "create" ? "Create Assets" : "Edit Assets"}
      closeIconVisibility={_props.closeIconVisibility}
      elements={[
        {
          type: "iconView",
          props: {
            image: _props.action == "create" ? stepTwo : stepOne,
            imageStyles: "mx-auto",
            imageContainerStyles: "my-7",
          },
        },
        {
          type: "selectView",
          props: {
            data: [
              { value: "chocolate", label: "Chocolate" },
              { value: "strawberry", label: "Strawberry" },
              { value: "vanilla", label: "Vanilla" },
            ],
            value: { value: "Bank Account", label: "Back Account" },
            defaultValue: "Bacnk",
            selectProps: {},
            setSelectedValue: () => {},
            hasRightIcon: true,
            rightIcon: arrowDown,
            rightIconAlt: "rightIcon",
            selectFieldWidth: 490,
            selectContainer: "mx-7 mb-4 relative",
            selectFieldStyles:
              "rounded-3xl border-[rgba(6, 90, 147, 0.30)] border-2 font-semibold px-2 text-[#6F767B] bg-[#F5FAFD]",
            rightIconStyles: "absolute right-4 top-4 cursor-pointer",
          },
        },
        {
          type: "inputView",
          props: {
            name: "label",
            type: "text",
            placeholder: "Label  (ex: My main bank)",
            value: _props.modalControl.label,
            _handleChange: _props._handleChange,
            required: false,
            inputStyles: "rounded-3xl border-[rgba(6, 90, 147, 0.30)] border-2",
            inputContainerStyles: "mx-7 mb-4",
            hasRightIcon: false,
          },
        },
        {
          type: "inputView",
          props: {
            name: "bank_name",
            type: "text",
            placeholder: "Bank Name",
            value: _props.modalControl.bankName,
            _handleChange: _props._handleChange,
            required: false,
            inputStyles: "rounded-3xl border-[rgba(6, 90, 147, 0.30)] border-2",
            inputContainerStyles: "mx-7 mb-4",
          },
        },
        {
          type: "selectView",
          props: {
            data: [
              { value: "chocolate", label: "Chocolate" },
              { value: "strawberry", label: "Strawberry" },
              { value: "vanilla", label: "Vanilla" },
            ],
            value: { value: "Country", label: "Country" },
            defaultValue: "Bacnk",
            selectProps: {},
            setSelectedValue: () => {},
            hasRightIcon: true,
            rightIcon: arrowDown,
            rightIconAlt: "rightIcon",
            selectFieldWidth: 490,
            selectContainer: "mx-7 mb-4 relative",
            selectFieldStyles:
              "rounded-3xl border-[rgba(6, 90, 147, 0.30)] border-2 font-semibold px-2 text-[#6F767B] bg-[#F5FAFD]",
            rightIconStyles: "absolute right-4 top-4 cursor-pointer",
          },
        },
        {
          type: "inputView",
          props: {
            name: "account_number",
            type: "text",
            placeholder: "Account Number",
            value: _props.modalControl.accountNumber,
            _handleChange: _props._handleChange,
            required: false,
            inputStyles: "rounded-3xl border-[rgba(6, 90, 147, 0.30)] border-2",
            inputContainerStyles: "mx-7 mb-4",
          },
        },
        {
          type: "multiFields",
          containerStyles: "flex gap-4 justify-center",
          props: {
            fields: [
              {
                type: "selectView",
                props: {
                  data: [
                    { value: "chocolate", label: "Chocolate" },
                    { value: "strawberry", label: "Strawberry" },
                    { value: "vanilla", label: "Vanilla" },
                  ],
                  value: { value: "Bank Account", label: "Back Account" },
                  defaultValue: "Bacnk",
                  selectProps: {},
                  setSelectedValue: () => {},
                  hasRightIcon: true,
                  rightIcon: arrowDown,
                  rightIconAlt: "rightIcon",
                  selectFieldWidth: 490,
                  selectContainer: " mb-4 relative",
                  selectFieldStyles:
                    "rounded-3xl border-[rgba(6, 90, 147, 0.30)] border-2 font-semibold px-2 text-[#6F767B] bg-[#F5FAFD] min-w-[237px] ",
                  rightIconStyles: "absolute right-4 top-4 cursor-pointer",
                },
              },
              {
                type: "inputView",
                props: {
                  name: "debit_card_pin",
                  type: "text",
                  placeholder: "Balance",
                  value: _props.modalControl.dabitCardPin,
                  _handleChange: _props._handleChange,
                  required: false,
                  inputStyles:
                    "rounded-3xl border-[rgba(6, 90, 147, 0.30)] border-2 w-[237px]",
                  inputContainerStyles: "mb-3",
                },
              },
            ],
          },
        },
        {
          type: "inputView",
          props: {
            name: "debit_card_pin",
            type: "text",
            placeholder: "Dabit Card PIN",
            value: _props.modalControl.dabitCardPin,
            _handleChange: _props._handleChange,
            required: false,
            inputStyles: "rounded-3xl border-[rgba(6, 90, 147, 0.30)] border-2",
            inputContainerStyles: "mx-7 mb-10",
          },
        },
        {
          type: "buttonView",
          props: {
            title: _props.action == "create" ? "Next" : "Save & Next",
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
    website: string
    login: string
    password: string
    otp: string
    beneficiary: string
    notes: string
  }
  _submitModal: Function
}) {
  return (
    <Modal
      openModal={_props.openModal}
      closeModal={_props.closeModal}
      closeModalOnOverlayClick={_props.closeModalOnOverlayClick}
      modalTitle={_props.action == "create" ? "Create Assets" : "Edit Assets"}
      closeIconVisibility={_props.closeIconVisibility}
      elements={[
        {
          type: "iconView",
          props: {
            image: _props.action == "create" ? stepTwo : stepOne,
            imageStyles: "mx-auto",
            imageContainerStyles: "my-7",
          },
        },
        {
          type: "textView",
          props: {
            text: "Online banking credentials",
            textStyles: "text=[#00192B] font-semibold pl-7 mb-3",
          },
        },
        {
          type: "inputView",
          props: {
            name: "webstie",
            type: "text",
            placeholder: "Website",
            value: _props.modalControl.website,
            _handleChange: _props._handleChange,
            required: false,
            inputStyles: "rounded-3xl border-[rgba(6, 90, 147, 0.30)] border-2",
            inputContainerStyles: "mx-7 mb-4",
          },
        },
        {
          type: "inputView",
          props: {
            name: "login",
            type: "text",
            placeholder: "Login",
            value: _props.modalControl.login,
            _handleChange: _props._handleChange,
            required: false,
            inputStyles: "rounded-3xl border-[rgba(6, 90, 147, 0.30)] border-2",
            inputContainerStyles: "mx-7 mb-4",
            hasRightIcon: false,
          },
        },
        {
          type: "inputView",
          props: {
            name: "password",
            type: "password",
            placeholder: "Password",
            value: _props.modalControl.password,
            _handleChange: _props._handleChange,
            required: false,
            inputStyles: "rounded-3xl border-[rgba(6, 90, 147, 0.30)] border-2",
            inputContainerStyles: "mx-7 mb-4",
          },
        },
        {
          type: "inputView",
          props: {
            name: "otp",
            type: "text",
            placeholder: "OTP",
            value: _props.modalControl.otp,
            _handleChange: _props._handleChange,
            required: false,
            inputStyles: "rounded-3xl border-[rgba(6, 90, 147, 0.30)] border-2",
            inputContainerStyles: "mx-7 mb-4",
          },
        },
        {
          type: "selectView",
          props: {
            data: [
              { value: "chocolate", label: "Chocolate" },
              { value: "strawberry", label: "Strawberry" },
              { value: "vanilla", label: "Vanilla" },
            ],
            value: { value: "Beneficiary", label: "Beneficiary" },
            defaultValue: "Bacnk",
            selectProps: {},
            setSelectedValue: () => {},
            hasRightIcon: true,
            rightIcon: arrowDown,
            rightIconAlt: "rightIcon",
            selectFieldWidth: 490,
            selectContainer: "mx-7 mb-4 relative",
            selectFieldStyles:
              "rounded-3xl border-[rgba(6, 90, 147, 0.30)] border-2 font-semibold px-2 text-[#6F767B] bg-[#F5FAFD]",
            rightIconStyles: "absolute right-4 top-4 cursor-pointer",
          },
        },
        {
          type: "inputView",
          props: {
            name: "notes",
            type: "tel",
            placeholder: "Notes",
            value: _props.modalControl.notes,
            _handleChange: _props._handleChange,
            required: false,
            inputStyles: "rounded-3xl border-[rgba(6, 90, 147, 0.30)] border-2",
            inputContainerStyles: "mx-7 mb-4",
          },
        },
        {
          type: "customView",
          props: {
            customViewContainer: "mx-7",
            CustomView: () => {
              return (
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    name="personalized_video_link"
                    onChange={_props._handleChange}
                    className="opacity-0 absolute top-0 right-0 h-20 w-20"
                  />
                  <div className="flex items-center justify-between gap-2 mb-8">
                    <span className="text-black font-medium">Upload files</span>
                    <img
                      src={uploadVideoIcon}
                      alt="Asset Image"
                      className="w-20 h-20"
                    />
                  </div>
                </div>
              )
            },
          },
        },
        {
          type: "buttonView",
          props: {
            title: "Confirm",
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
  registerAnotherAsset: React.MouseEventHandler<HTMLButtonElement>
  gotoDashboard: React.MouseEventHandler<HTMLButtonElement>
  _submitModal: React.MouseEventHandler<HTMLButtonElement>
}) {
  return (
    <Modal
      openModal={_props.openModal}
      closeModal={_props.closeModal}
      closeModalOnOverlayClick={_props.closeModalOnOverlayClick}
      modalTitle={"Asset Registered"}
      closeIconVisibility={_props.closeIconVisibility}
      elements={[
        {
          type: "iconView",
          props: {
            image: stepTwo,
            imageStyles: "mx-auto",
            imageContainerStyles: "mt-7 mb-24",
          },
        },
        {
          type: "textView",
          props: {
            text: "You successfully registered a new asset!",
            textStyles:
              "text=[#082A44] text-2xl font-bold text-center mb-32 px-12",
          },
        },

        {
          type: "customView",
          props: {
            customViewContainer: "",
            CustomView: () => {
              return (
                <div className="flex gap-10 items-end mx-8 mb-10 ">
                  <div className="flex flex-col gap-8 ">
                    <p className="w-[194px] text-center text-[#4F4F4F] leading-tight">
                      Click here if you want to register another Asset.
                    </p>
                    <button
                      onClick={_props.registerAnotherAsset}
                      className="bg-[#0971AA] font-bold text-white px-8 py-1 w-[225px] rounded-2xl"
                    >
                      Register another Asset
                    </button>
                  </div>
                  <div className="flex flex-col gap-8 ">
                    <p className="w-[194px] text-center text-[#4F4F4F] leading-tight">
                      Click here if you are done registering assets. This will
                      take you to your Dashboard
                    </p>
                    <button
                      onClick={_props.gotoDashboard}
                      className="bg-[#0971AA] font-bold text-white px-4 py-4 w-[225px] rounded-2xl"
                    >
                      Done
                    </button>
                  </div>
                </div>
              )
            },
          },
        },
      ]}
    />
  )
}
