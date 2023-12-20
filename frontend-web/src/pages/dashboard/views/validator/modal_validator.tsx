import React from "react"
import facebook from "@images/facebook.svg"
import twitter from "@images/twitter.svg"
import instagram from "@images/insta.svg"
import profilePic from "@images/profile-pic.svg"
import registerValidatorImg from "@images/register-validator-img.svg"
import stepOne from "@images/step_1_of_3.svg"
import stepTwo from "@images/step_2_of_3.svg"
import stepThree from "@images/step_3_of_3.svg"

import { Modal } from "@/components"
import { IoMdCloseCircle } from "react-icons/io"

export function StepZeroInformationModal(_props: {
  openModal: boolean
  closeModal: () => void
  closeModalOnOverlayClick: boolean
  modalTitle: string
  closeIconVisibility: boolean
  _submitModal: () => void
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
            imageStyles: "mx-auto",
            imageContainerStyles: "my-10",
          },
        },
        {
          type: "textView",
          props: {
            text: "What is a Validator",
            textStyles: "text-[#00192B] text-lg font-bold mb-4 mx-auto w-fit",
          },
        },
        {
          type: "textView",
          props: {
            text: "A validator is a trusted person you choose whose role is to confirm your status if SafeHerit cannot verify you are alive.",
            textStyles: "text-[#868686]  leading-7 px-7 mb-7 text-center ",
          },
        },
        {
          type: "textView",
          props: {
            text: "If you are unresponsive and the validator confirms your passing, SafeHerit will then share your registered asset information with your chosen beneficiaries.",
            textStyles: "text-[#868686]  leading-7 px-7 mb-8 text-center ",
          },
        },
        {
          type: "buttonView",
          props: {
            title: "Register Validators",
            onclick: _props._submitModal,
            buttonStyle:
              "bg-[#0971AA]  font-bold text-white mx-auto px-8 py-4 w-[225px] rounded-2xl block",
            buttonContainer: " mb-10",
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
                  CustomView: () => {
                    return (
                      <div className="relative">
                        <input type="checkbox" id="checkbox" />
                        <label htmlFor="checkbox" className="checkbox-label">
                          <div className="check_mark"></div>
                        </label>
                      </div>
                    )
                  },
                },
              },
              {
                type: "textView",
                props: {
                  text: "Don’t display this next time",
                  onclick: () => {},
                  textStyles: "text-[#00192B] text-lg font-light ml-6",
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
  closeModal: () => void
  closeModalOnOverlayClick: boolean
  modalTitle: string
  closeIconVisibility: boolean
  _handleChange: React.ChangeEventHandler<HTMLInputElement>
  arrayLength: any
  showPreviousModal: any
  modalControl: {
    name: string
    primary_email: string
    backup_email: string
    backup_email2: string
    phone_number: string
    backup_phone_number: string
  }
  _submitModal: () => void
  //   elements: objeect
}) {
  return (
    <Modal
      openModal={_props.openModal}
      closeModal={_props.closeModal}
      closeModalOnOverlayClick={_props.closeModalOnOverlayClick}
      modalTitle={_props.modalTitle}
      closeIconVisibility={_props.closeIconVisibility}
      arrayLength={_props.arrayLength}
      showPreviousModal={_props.showPreviousModal}
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
            text: "Personal info",
            textStyles: "text-[#00192B] font-semibold pl-7 mb-3",
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
          type: "phoneNumberView",
          props: {
            name: "phone_number",
            placeholder: "Phone number",
            value: _props?.modalControl?.phone_number?.split(" ")[1],
            code: _props?.modalControl?.phone_number?.split(" ")[0],
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
            name: "backup_phone_number",
            placeholder: "Backup phone number",
            value: _props?.modalControl?.backup_phone_number?.split(" ")[1],
            code: _props?.modalControl?.backup_phone_number?.split(" ")[0],
            inputStyles: "",
            inputContainerStyles: "",
            selectFieldStyles: "",
            selectFieldMenuWidth: "",
            _handleChange: _props._handleChange,
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
                  CustomView: () => {
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

interface CustomChangeEvent {
  target: {
    name: string
    value: string | ArrayBuffer | null | undefined
  }
}

export function StepTwoModal(_props: {
  openModal: boolean
  closeModal: () => void
  closeModalOnOverlayClick: boolean
  modalTitle: string
  closeIconVisibility: boolean
  _handleChange: React.ChangeEventHandler<HTMLInputElement>
  modalControl: {
    facebook_link: string
    instagram_username: string
    twitter_username: string
    profile_image: string
  }
  _submitModal: () => void
  _handleDiscard: (name: string, value: any) => void
  imageUpload: string
  setImageUpload: any
  arrayLength: any
  showPreviousModal: any
}) {
  const handleImageInputChange = (event: any) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const dataURL = e.target?.result
        _props.setImageUpload(dataURL)
        const customEvent: CustomChangeEvent = {
          target: {
            name: "profile_image",
            value: file,
          },
        }
        _props._handleChange(customEvent as React.ChangeEvent<HTMLInputElement>)
      }
      reader.readAsDataURL(file)
    }
  }
  return (
    <Modal
      openModal={_props.openModal}
      closeModal={_props.closeModal}
      closeModalOnOverlayClick={_props.closeModalOnOverlayClick}
      modalTitle={_props.modalTitle}
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
            text: "Social media links",
            textStyles: "text-[#00192B] font-semibold pl-7 mb-3",
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
            icon: instagram,
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
            icon: twitter,
            iconAlt: "Twitter icon",
            rightIconStyles: "absolute right-4 top-4 w-6",
            inputContainerStyles: "mx-7 mb-4 relative",
          },
        },
        {
          type: "textView",
          props: {
            text: "Profile Picture",
            textStyles: "text-[#00192B] font-medium pl-7 mb-5",
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
                    onChange={handleImageInputChange}
                    name="profile_image"
                    className="opacity-0 absolute top-0 left-44 h-20 w-[220px]"
                  />
                  <div className="flex items-center justify-center gap-2 mb-8">
                    <span className="text-[#858992] font-medium">
                      Click to upload <br /> a profile picture →
                    </span>
                    {_props.imageUpload ? (
                      <div className="relative">
                        <img
                          src={_props.imageUpload || profilePic}
                          alt="user image"
                          className="w-20 h-20"
                        />
                        <span
                          className="absolute top-0 right-0 text-red-900 cursor-pointer"
                          onClick={() => {
                            _props.setImageUpload("")
                            _props._handleDiscard("profile_image", "")
                          }}
                        >
                          <IoMdCloseCircle size={"20px"} />
                        </span>
                      </div>
                    ) : (
                      <img
                        src={profilePic}
                        alt="user image"
                        className="w-20 h-20"
                      />
                    )}
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
  closeModal: () => void
  closeModalOnOverlayClick: boolean
  modalTitle: string
  closeIconVisibility: boolean
  _handleChange: any
  modalControl: {
    personalized_message: string
  }
  _submitModal: () => void
  arrayLength: any
  showPreviousModal: any
}) {
  return (
    <Modal
      openModal={_props.openModal}
      closeModal={_props.closeModal}
      closeModalOnOverlayClick={_props.closeModalOnOverlayClick}
      modalTitle={_props.modalTitle}
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
            text: "Send a personalized message to your validator once your passing is confirmed.",
            textStyles: "text-[#00192B] font-semibold pl-7 mb-3",
          },
        },
        {
          type: "TextAreaField",
          props: {
            textAreaContainerStyles: "",
            name: "personalized_message",
            placeholder:
              "Dear {Name}, \n\nIf you receive this message it probably means I am gone. \n\nSince you’re one of the closest people to me, you probably know if am still alive or not. If I’m indeed dead, please confirm it as per the instructions of this platform (SafeHerit). \n\nThis will help me a lot in making sure that my family gets access to its inheritance as quickly as possible. \n\nThank you buddy, I’m counting on you! \n\n{your name}",
            _handleChange: _props._handleChange,
            value: _props.modalControl.personalized_message,
            inputStyles:
              "bg-[#F5FAFD] text-[#6F767B] pl-5 py-6 font-base rounded-3xl mx-auto w-[514px] h-[334px]  mb-10 block leading-tight resize-none focus:outline-none",
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

export function StepFourSuccessModal(_props: {
  openModal: boolean
  closeModal: () => void
  closeModalOnOverlayClick: boolean
  modalTitle: string
  closeIconVisibility: boolean
  registerAnother: React.MouseEventHandler<HTMLButtonElement>
  pulseCheck: React.MouseEventHandler<HTMLButtonElement>
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
            image: stepThree,
            imageStyles: "mx-auto",
            imageContainerStyles: "mt-7 mb-24",
          },
        },
        {
          type: "textView",
          props: {
            text: "You successfully registered a new validator",
            textStyles: "text-[#082A44] text-2xl font-bold text-center mb-32",
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
                      Click here if you want to register another validator.
                    </p>
                    <button
                      onClick={_props.registerAnother}
                      className="bg-[#0971AA] font-bold text-white px-8 py-1 w-[225px] rounded-2xl"
                    >
                      Register another Validator
                    </button>
                  </div>
                  <div className="flex flex-col gap-8 ">
                    <p className="w-[194px] text-center text-[#4F4F4F] leading-tight">
                      Click here to move on to Pulse Check setting if you’re
                      done registering validators.{" "}
                    </p>
                    <button
                      onClick={_props.pulseCheck}
                      className="bg-[#0971AA] font-bold text-white px-4 py-4 w-[225px] rounded-2xl"
                    >
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
