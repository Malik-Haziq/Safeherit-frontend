import { Modal } from "../../../../components"
import facebook from "../../../../../assets/images/facebook.svg"
import arrowDown from "../../../../../assets/images/Arrow-Down-Circle.svg"
import profilePic from "../../../../../assets/images/profile-pic.svg"
import registerValidatorImg from "../../../../../assets/images/register-validator-img.svg"
import { useRef } from "react"

export function EditValidatorModal_1(_props: {
  openModal: boolean
  closeModal: any
  closeModalOnOverlayClick: boolean
  modalTitle: string
  closeIconVisibility: boolean
  //   elements: object
}) {
  return (
    <Modal
      openModal={_props.openModal}
      closeModal={_props.closeModal}
      closeModalOnOverlayClick={_props.closeModalOnOverlayClick}
      modalTitle={_props.modalTitle}
      closeIconVisibility={_props.closeIconVisibility}
      elements={[
        {
          type: "iconView",
          props: {
            image: "../../../../../assets/images/step_1_of_3.svg",
            onclick: () => {},
            imageStyles: "mx-auto",
            imageContainerStyles: "my-7",
          },
        },
        {
          type: "textView",
          props: {
            text: "Personal info",
            onclick: () => {},
            textStyles: "text=[#00192B] font-semibold pl-7 mb-3",
          },
        },
        {
          type: "inputView",
          props: {
            name: "",
            type: "text",
            placeholder: "Enter Name",
            value: "",
            _handleChange: () => {},
            required: false,
            inputStyles:
              "rounded-3xl border-[rgba(6, 90, 147, 0.30)] border-2 w-full",
            inputContainerStyles: "mx-7 mb-4",
            hasRightIcon: false,
            icon: "",
            iconAlt: "",
            iconPress: () => {},
            rightIconStyles: "",
          },
        },
        {
          type: "inputView",
          props: {
            name: "",
            type: "text",
            placeholder: "Enter Email",
            value: "",
            _handleChange: () => {},
            required: false,
            inputStyles:
              "rounded-3xl border-[rgba(6, 90, 147, 0.30)] border-2 w-full",
            inputContainerStyles: "mx-7 mb-4",
            hasRightIcon: false,
            icon: "",
            iconAlt: "",
            iconPress: () => {},
            rightIconStyles: "",
          },
        },
        {
          type: "inputView",
          props: {
            name: "",
            type: "text",
            placeholder: "Enter Email",
            value: "",
            _handleChange: () => {},
            required: false,
            inputStyles:
              "rounded-3xl border-[rgba(6, 90, 147, 0.30)] border-2 w-full",
            inputContainerStyles: "mx-7 mb-4",
            hasRightIcon: false,
            icon: "",
            iconAlt: "",
            iconPress: () => {},
            rightIconStyles: "",
          },
        },
        {
          type: "inputView",
          props: {
            name: "",
            type: "text",
            placeholder: "Enter Email",
            value: "",
            _handleChange: () => {},
            required: false,
            inputStyles:
              "rounded-3xl border-[rgba(6, 90, 147, 0.30)] border-2 w-full",
            inputContainerStyles: "mx-7 mb-4",
            hasRightIcon: false,
            icon: "",
            iconAlt: "",
            iconPress: () => {},
            rightIconStyles: "",
          },
        },
        {
          type: "inputView",
          props: {
            name: "",
            type: "tel",
            placeholder: "Enter Phone Number",
            value: "",
            _handleChange: () => {},
            required: false,
            inputStyles:
              "rounded-3xl border-[rgba(6, 90, 147, 0.30)] border-2 w-full",
            inputContainerStyles: "mx-7 mb-5",
            hasRightIcon: false,
            icon: "",
            iconAlt: "",
            iconPress: () => {},
            rightIconStyles: "",
          },
        },
        {
          type: "inputView",
          props: {
            name: "",
            type: "tel",
            placeholder: "Enter Phone Number",
            value: "",
            _handleChange: () => {},
            required: false,
            inputStyles:
              "rounded-3xl border-[rgba(6, 90, 147, 0.30)] border-2 w-full",
            inputContainerStyles: "mx-7 mb-5",
            hasRightIcon: false,
            icon: "",
            iconAlt: "",
            iconPress: () => {},
            rightIconStyles: "",
          },
        },
        {
          type: "multiFields",
          containerStyles: "flex items-center  gap-3 ml-8 mb-5",
          props: {
            fields: [
              {
                type: "customView",
                props: {
                  customViewContainer: "w-5 h-5",
                  CustomView: function Name() {
                    return <input type="checkbox" className="w-full h-full" />
                  },
                },
              },
              {
                type: "textView",
                props: {
                  text: "Notify the user that he has been added as a validator",
                  onclick: () => {},
                  textStyles: "text-[#00192B] text-sm font-semibold",
                },
              },
            ],
          },
        },
        {
          type: "buttonView",
          props: {
            title: "Save & Next",
            onclick: () => {},
            buttonStyle: "",
            buttonContainer: "mx-48 mb-10",
          },
        },
      ]}
    />
  )
}

export function EditValidatorModal_2(_props: {
  openModal: boolean
  closeModal: any
  closeModalOnOverlayClick: boolean
  modalTitle: string
  closeIconVisibility: boolean
  //   elements: object
}) {
  return (
    <Modal
      openModal={_props.openModal}
      closeModal={_props.closeModal}
      closeModalOnOverlayClick={_props.closeModalOnOverlayClick}
      modalTitle={_props.modalTitle}
      closeIconVisibility={_props.closeIconVisibility}
      elements={[
        {
          type: "iconView",
          props: {
            image: "../../../../../assets/images/step_2_of_3.svg",
            onclick: () => {},
            imageStyles: "mx-auto",
            imageContainerStyles: "my-7",
          },
        },
        {
          type: "textView",
          props: {
            text: "Social media links",
            onclick: () => {},
            textStyles: "text=[#00192B] font-semibold pl-7 mb-3",
          },
        },
        {
          type: "inputView",
          props: {
            name: "",
            type: "text",
            placeholder: "Add facebook link",
            value: "",
            _handleChange: () => {},
            required: true,
            inputStyles: "rounded-3xl w-full",
            hasRightIcon: true,
            icon: facebook,
            iconAlt: "facebook icon",
            iconPress: () => {},
            rightIconStyles: "absolute right-4 top-4",
            inputContainerStyles: "mx-7 mb-4 relative",
          },
        },
        {
          type: "inputView",
          props: {
            name: "",
            type: "text",
            placeholder: "Enter instagram link",
            value: "",
            _handleChange: () => {},
            required: true,
            inputStyles: "rounded-3xl w-full",
            hasRightIcon: true,
            icon: "../../../../../assets/images/insta.svg",
            iconAlt: "instagram icon",
            iconPress: () => {},
            rightIconStyles: "absolute right-4 top-4 w-6",
            inputContainerStyles: "mx-7 mb-4 relative",
          },
        },
        {
          type: "inputView",
          props: {
            name: "",
            type: "text",
            placeholder: "Enter twitter link",
            value: "",
            _handleChange: () => {},
            required: true,
            inputStyles: "rounded-3xl w-full",
            hasRightIcon: true,
            icon: "../../../../../assets/images/twitter.svg",
            iconAlt: "instagram icon",
            iconPress: () => {},
            rightIconStyles: "absolute right-4 top-4 w-6",
            inputContainerStyles: "mx-7 mb-4 relative",
          },
        },
        {
          type: "textView",
          props: {
            text: "Profile Picture",
            onclick: () => {},
            textStyles: "text=[#00192B] font-medium pl-7 mb-5",
          },
        },
        {
          type: "customView",
          props: {
            customViewContainer: "mx-auto",
            CustomView: function Name() {
              return (
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    name="image"
                    className="opacity-0 absolute top-0 left-44 h-20 w-[220px]"
                  />
                  <div className="flex items-center justify-center gap-2 mb-8">
                    <span className="text-[#858992] font-medium">
                      Click to upload <br /> a profile picture →
                    </span>
                    <img
                      src={arrowDown}
                      alt="user image"
                      className="w-20 h-20 rounded-full"
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
            title: "Continue",
            onclick: () => {},
            buttonStyle: "",
            buttonContainer: "mx-48 mb-10",
          },
        },
      ]}
    />
  )
}

export function EditValidatorModal_3(_props: {
  openModal: boolean
  closeModal: any
  closeModalOnOverlayClick: boolean
  modalTitle: string
  closeIconVisibility: boolean
  //   elements: object
}) {
  return (
    <Modal
      openModal={_props.openModal}
      closeModal={_props.closeModal}
      closeModalOnOverlayClick={_props.closeModalOnOverlayClick}
      modalTitle={_props.modalTitle}
      closeIconVisibility={_props.closeIconVisibility}
      elements={[
        {
          type: "iconView",
          props: {
            image: "../../../../../assets/images/step_3_of_3.svg",
            onclick: () => {},
            imageStyles: "mx-auto",
            imageContainerStyles: "my-7",
          },
        },
        {
          type: "textView",
          props: {
            text: "Send a personalized message to your validator once your passing is confirmed.",
            onclick: () => {},
            textStyles: "text=[#00192B] font-semibold pl-7 mb-3",
          },
        },
        {
          type: "customView",
          props: {
            customViewContainer: "mx-auto w-[514px] h-[334px] mb-10",
            CustomView: function Name() {
              return (
                <textarea className="bg-[#F5FAFD] text-[#6F767B] pl-5 py-6 font-base rounded-3xl w-full h-full resize-none focus:outline-none"></textarea>
              )
            },
          },
        },
        {
          type: "buttonView",
          props: {
            title: "Continue",
            onclick: () => {},
            buttonStyle: "",
            buttonContainer: "mx-48 mb-10",
          },
        },
      ]}
    />
  )
}

export function RegisterValidatorModal_0(_props: {
  openModal: boolean
  closeModal: any
  closeModalOnOverlayClick: boolean
  modalTitle: string
  closeIconVisibility: boolean
  //   elements: object
}) {
  return (
    <Modal
      openModal={_props.openModal}
      closeModal={_props.closeModal}
      closeModalOnOverlayClick={_props.closeModalOnOverlayClick}
      modalTitle={_props.modalTitle}
      closeIconVisibility={_props.closeIconVisibility}
      elements={[
        {
          type: "iconView",
          props: {
            image: registerValidatorImg,
            onclick: () => {},
            imageStyles: "mx-auto",
            imageContainerStyles: "my-10",
          },
        },
        {
          type: "textView",
          props: {
            text: "What is a Validator",
            onclick: () => {},
            textStyles: "text=[#00192B] text-lg font-bold mb-4 mx-auto w-fit",
          },
        },
        {
          type: "textView",
          props: {
            text: "A validator is a trusted person you choose whose role is to confirm your status if SafeHerit cannot verify you are alive.",
            onclick: () => {},
            textStyles: "text=[#868686]  leading-7 px-7 mb-7 text-center ",
          },
        },
        {
          type: "textView",
          props: {
            text: "If you are unresponsive and the validator confirms your passing, SafeHerit will then share your registered asset information with your chosen beneficiaries.",
            onclick: () => {},
            textStyles: "text=[#868686]  leading-7 px-7 mb-8 text-center ",
          },
        },
        {
          type: "buttonView",
          props: {
            title: "Register Validators",
            onclick: () => {},
            buttonStyle:
              "bg-[#0971AA]  font-bold text-white px-8 py-4 w-[225px] rounded-2xl",
            buttonContainer: "mx-48 mb-10",
          },
        },

        {
          type: "multiFields",
          containerStyles: "flex gap-5 items-center mb-7",
          props: {
            fields: [
              {
                type: "customView",
                props: {
                  customViewContainer: "",
                  CustomView: function Name() {
                    return (
                      <div className="w-5 h-5 bg-[#EDEDED] rounded-md drop-shadow-lg ml-8"></div>
                    )
                  },
                },
              },
              {
                type: "textView",
                props: {
                  text: "Don’t display this next time",
                  onclick: () => {},
                  textStyles: "text-[#00192B] text-lg font-light",
                },
              },
            ],
          },
        },
      ]}
    />
  )
}

export function StepOneModal(_props: {
  openModal: boolean
  closeModal: Function
  closeModalOnOverlayClick: boolean
  modalTitle: string
  closeIconVisibility: boolean
  _handleChange: React.ChangeEventHandler<HTMLInputElement>
  modalControl: {
    name: string
    primary_email: string
    backup_email: string
    backup_email2: string
    phone_number: string
    backup_phone_number: string
  }
  _submitModal: Function
  //   elements: objeect
}) {
  return (
    <Modal
      openModal={_props.openModal}
      closeModal={_props.closeModal}
      closeModalOnOverlayClick={_props.closeModalOnOverlayClick}
      modalTitle={_props.modalTitle}
      closeIconVisibility={_props.closeIconVisibility}
      elements={[
        {
          type: "iconView",
          props: {
            image: "../../../../../assets/images/step_1_of_3.svg",
            imageStyles: "mx-auto",
            imageContainerStyles: "my-7",
          },
        },
        {
          type: "textView",
          props: {
            text: "Personal info",
            textStyles: "text=[#00192B] font-semibold pl-7 mb-3",
          },
        },
        {
          type: "inputView",
          props: {
            name: "name",
            type: "text",
            placeholder: "Name",
            value: _props.modalControl.name,
            _handleChange: _props._handleChange,
            required: true,
            inputStyles: "rounded-3xl w-full",
            inputContainerStyles: "mx-7 mb-4",
          },
        },
        {
          type: "inputView",
          props: {
            name: "primary_email",
            type: "text",
            placeholder: "Email",
            value: _props.modalControl.primary_email,
            _handleChange: _props._handleChange,
            required: false,
            inputStyles: "rounded-3xl w-full",
            inputContainerStyles: "mx-7 mb-4",
          },
        },
        {
          type: "inputView",
          props: {
            name: "backup_email",
            type: "text",
            placeholder: "Backup email 1",
            value: _props.modalControl.backup_email,
            _handleChange: _props._handleChange,
            required: false,
            inputStyles: "rounded-3xl w-full",
            inputContainerStyles: "mx-7 mb-4",
          },
        },
        {
          type: "inputView",
          props: {
            name: "backup_email2",
            type: "text",
            placeholder: "Backup email 2",
            value: _props.modalControl.backup_email2,
            _handleChange: _props._handleChange,
            required: false,
            inputStyles: "rounded-3xl w-full",
            inputContainerStyles: "mx-7 mb-4",
          },
        },
        {
          type: "inputView",
          props: {
            name: "phone_number",
            type: "tel",
            placeholder: "Phone number",
            value: _props.modalControl.phone_number,
            _handleChange: _props._handleChange,
            required: false,
            inputStyles: "rounded-3xl w-full",
            inputContainerStyles: "mx-7 mb-5",
          },
        },
        {
          type: "inputView",
          props: {
            name: "backup_phone_number",
            type: "tel",
            placeholder: "Backup phone number",
            value: _props.modalControl.backup_phone_number,
            _handleChange: _props._handleChange,
            required: false,
            inputStyles: "rounded-3xl w-full",
            inputContainerStyles: "mx-7 mb-5",
          },
        },
        {
          type: "multiFields",
          containerStyles: "flex items-center gap-3 ml-8 mb-5",
          props: {
            fields: [
              {
                type: "customView",
                props: {
                  customViewContainer: "w-5 h-5",
                  CustomView: function Name() {
                    return <input type="checkbox" className="w-full h-full" />
                  },
                },
              },
              {
                type: "textView",
                props: {
                  text: "Notify the user that he has been added as a validator",
                  textStyles: "text-[#00192B] text-sm font-semibold",
                },
              },
            ],
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
  modalTitle: string
  closeIconVisibility: boolean
  _handleChange: React.ChangeEventHandler<HTMLInputElement>
  modalControl: {
    facebook_link: string
    instagram_username: string
    twitter_username: string
    image: string
  }
  _submitModal: Function
  //   elements: object
}) {
  return (
    <Modal
      openModal={_props.openModal}
      closeModal={_props.closeModal}
      closeModalOnOverlayClick={_props.closeModalOnOverlayClick}
      modalTitle={_props.modalTitle}
      closeIconVisibility={_props.closeIconVisibility}
      elements={[
        {
          type: "iconView",
          props: {
            image: "../../../../../assets/images/step_2_of_3.svg",
            imageStyles: "mx-auto",
            imageContainerStyles: "my-7",
          },
        },
        {
          type: "textView",
          props: {
            text: "Social media links",
            textStyles: "text=[#00192B] font-semibold pl-7 mb-3",
          },
        },
        {
          type: "inputView",
          props: {
            name: "facebook_link",
            type: "text",
            placeholder: "Facebook link",
            value: _props.modalControl.facebook_link,
            _handleChange: _props._handleChange,
            required: true,
            inputStyles: "rounded-3xl w-full",
            hasRightIcon: true,
            icon: facebook,
            iconAlt: "facebook icon",
            rightIconStyles: "absolute right-4 top-4",
            inputContainerStyles: "mx-7 mb-4 relative",
          },
        },
        {
          type: "inputView",
          props: {
            name: "instagram_username",
            type: "text",
            placeholder: "Instagram link",
            value: _props.modalControl.instagram_username,
            _handleChange: _props._handleChange,
            required: true,
            inputStyles: "rounded-3xl w-full",
            hasRightIcon: true,
            icon: "../../../../../assets/images/insta.svg",
            iconAlt: "instagram icon",
            rightIconStyles: "absolute right-4 top-4 w-6",
            inputContainerStyles: "mx-7 mb-4 relative",
          },
        },
        {
          type: "inputView",
          props: {
            name: "twitter_username",
            type: "text",
            placeholder: "Twitter link",
            value: _props.modalControl.twitter_username,
            _handleChange: _props._handleChange,
            required: true,
            inputStyles: "rounded-3xl w-full",
            hasRightIcon: true,
            icon: "../../../../../assets/images/twitter.svg",
            iconAlt: "Twitter icon",
            rightIconStyles: "absolute right-4 top-4 w-6",
            inputContainerStyles: "mx-7 mb-4 relative",
          },
        },
        {
          type: "textView",
          props: {
            text: "Profile Picture",
            textStyles: "text=[#00192B] font-medium pl-7 mb-5",
          },
        },
        {
          type: "customView",
          props: {
            customViewContainer: "mx-auto",
            CustomView: function Name() {
              return (
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={_props._handleChange}
                    name="image"
                    className="opacity-0 absolute top-0 left-44 h-20 w-[220px]"
                  />
                  <div className="flex items-center justify-center gap-2 mb-8">
                    <span className="text-[#858992] font-medium">
                      Click to upload <br /> a profile picture →
                    </span>
                    <img
                      src={profilePic}
                      alt="user image"
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
            title: "Continue",
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
  modalTitle: string
  closeIconVisibility: boolean
  _handleChange: any
  modalControl: {
    message: string
  }
  _submitModal: Function
  //   elements: object
}) {
  const textareaRef = useRef(null)
  return (
    <Modal
      openModal={_props.openModal}
      closeModal={_props.closeModal}
      closeModalOnOverlayClick={_props.closeModalOnOverlayClick}
      modalTitle={_props.modalTitle}
      closeIconVisibility={_props.closeIconVisibility}
      elements={[
        {
          type: "iconView",
          props: {
            image: "../../../../../assets/images/step_3_of_3.svg",
            imageStyles: "mx-auto",
            imageContainerStyles: "my-7",
          },
        },
        {
          type: "textView",
          props: {
            text: "Send a personalized message to your validator once your passing is confirmed.",
            textStyles: "text=[#00192B] font-semibold pl-7 mb-3",
          },
        },
        {
          type: "customView",
          props: {
            customViewContainer: "mx-auto w-[514px] h-[334px] mb-10",
            CustomView: function Name() {
              return (
                <textarea
                  ref={textareaRef}
                  name="message"
                  // onChange={_props._handleChange}
                  // value={_props.modalControl.message}
                  className="bg-[#F5FAFD] text-[#6F767B] pl-5 py-6 font-base rounded-3xl w-full h-full resize-none focus:outline-none"
                />
              )
            },
          },
        },
        {
          type: "buttonView",
          props: {
            title: "Continue",
            onclick: _props._submitModal,
            buttonStyle: "",
            buttonContainer: "mx-48 mb-10",
          },
        },
      ]}
    />
  )
}

export function RegisterValidatorModal_4(_props: {
  openModal: boolean
  closeModal: any
  closeModalOnOverlayClick: boolean
  modalTitle: string
  closeIconVisibility: boolean
  //   elements: object
}) {
  return (
    <Modal
      openModal={_props.openModal}
      closeModal={_props.closeModal}
      closeModalOnOverlayClick={_props.closeModalOnOverlayClick}
      modalTitle={_props.modalTitle}
      closeIconVisibility={_props.closeIconVisibility}
      elements={[
        {
          type: "iconView",
          props: {
            image: "../../../../../assets/images/step_3_of_3.svg",
            onclick: () => {},
            imageStyles: "mx-auto",
            imageContainerStyles: "mt-7 mb-24",
          },
        },
        {
          type: "textView",
          props: {
            text: "You successfully registered a new validator",
            onclick: () => {},
            textStyles: "text=[#082A44] text-2xl font-bold text-center mb-32",
          },
        },

        {
          type: "customView",
          props: {
            customViewContainer: "",
            CustomView: function Name() {
              return (
                <div className="flex gap-10 items-end mx-8 mb-10 ">
                  <div className="flex flex-col gap-8 ">
                    <p className="w-[194px] text-center text-[#4F4F4F] leading-tight">
                      Click here if you want to register another validator.
                    </p>
                    <button className="bg-[#0971AA] font-bold text-white px-8 py-1 w-[225px] rounded-2xl">
                      Register another Validator
                    </button>
                  </div>
                  <div className="flex flex-col gap-8 ">
                    <p className="w-[194px] text-center text-[#4F4F4F] leading-tight">
                      Click here to move on to Pulse Check setting if you’re
                      done registering validators.{" "}
                    </p>
                    <button className="bg-[#0971AA] font-bold text-white px-4 py-4 w-[225px] rounded-2xl">
                      Setup Pulse Check
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
