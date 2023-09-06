import { Modal } from "../../../../components"
import facebook from "../../../../../assets/images/facebook.svg"
import uploadVideoIcon from "../../../../../assets/images/upload-video.svg"
import video from "../../../../../assets/images/register_page_video.png"
import profilePic from "../../../../../assets/images/profile-pic.svg"
import registerBeneficiaryImg from "../../../../../assets/images/register-beneficiary.svg"

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
      modalTitle={"Register Beneficiaries"}
      closeIconVisibility={_props.closeIconVisibility}
      elements={[
        {
          type: "iconView",
          props: {
            image: registerBeneficiaryImg,
            imageStyles: "mx-auto",
            imageContainerStyles: "my-10",
          },
        },
        {
          type: "textView",
          props: {
            text: "What is a Beneficiary",
            textStyles: "text=[#00192B] text-lg font-bold mb-4 mx-auto w-fit",
          },
        },
        {
          type: "textView",
          props: {
            text: "A beneficiary is who you choose to receive information about your assets after you're gone. It could be a family member, friend, or even an organization. They are the ones who will learn about your valuables and investments after you pass away. By naming a beneficiary on SafeHerit, you decide who gets this important information in the future.",
            textStyles: "text=[#868686] leading-7 px-7 mb-7 text-center ",
          },
        },
        {
          type: "buttonView",
          props: {
            title: "Register Beneficiaries",
            onclick: _props._submitModal,
            buttonStyle:
              "bg-[#0971AA] font-bold text-white px-8 py-4 w-[233px] rounded-2xl",
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
                  CustomView: () => {
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

export function SuccessModal(_props: {
  openModal: boolean
  closeModal: any
  closeModalOnOverlayClick: boolean
  closeIconVisibility: boolean
  action: string
  registerAnotherBeneficiary: React.MouseEventHandler<HTMLButtonElement>
  gotoValidators: React.MouseEventHandler<HTMLButtonElement>
  _submitModal: React.MouseEventHandler<HTMLButtonElement>
}) {
  return (
    <Modal
      openModal={_props.openModal}
      closeModal={_props.closeModal}
      closeModalOnOverlayClick={_props.closeModalOnOverlayClick}
      modalTitle={_props.action == 'create' ? "Beneficiary Registered" : "Edit Beneficiary Details"}
      closeIconVisibility={_props.closeIconVisibility}
      elements={[
        {
          type: "iconView",
          props: {
            image: "../../../../../assets/images/step_4_of_4.svg",
            imageStyles: "mx-auto",
            imageContainerStyles: "mt-7 mb-24",
          },
        },
        {
          type: "textView",
          props: {
            text: _props.action == 'create' ? "You successfully registered a new beneficiary!" : "The details of your beneficiary have been successfully updated!",
            textStyles:
              "text=[#082A44] text-2xl font-bold text-center mb-32 px-12",
          },
        },

        _props.action == 'create' ? {
          type: "customView",
          props: {
            customViewContainer: "",
            CustomView: () => {
              return (
                <div className="flex gap-10 items-end mx-8 mb-10 ">
                  <div className="flex flex-col gap-8 ">
                    <p className="w-[194px] text-center text-[#4F4F4F] leading-tight">
                      Click here if you want to register another beneficiary.
                    </p>
                    <button onClick={_props.registerAnotherBeneficiary} className="bg-[#0971AA] font-bold text-white px-8 py-1 w-[225px] rounded-2xl">
                      Register another Beneficiary
                    </button>
                  </div>
                  <div className="flex flex-col gap-8 ">
                    <p className="w-[194px] text-center text-[#4F4F4F] leading-tight">
                      Click here to move on to register validators if you’re
                      done registering beneficiaries.
                    </p>
                    <button onClick={_props.gotoValidators} className="bg-[#0971AA] font-bold text-white px-4 py-4 w-[225px] rounded-2xl">
                      Register Validators
                    </button>
                  </div>
                </div>
              )
            },
          },
        } : {
          type: "buttonView",
          props: {
            title: "Done",
            onclick: _props._submitModal,
            buttonStyle:
              "bg-[#0971AA]  font-bold text-white px-8 py-4 w-[225px] rounded-2xl",
            buttonContainer: "mx-48 mb-10",
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
    name: string
    primary_email: string
    backup_email: string
    backup_email2: string
    phone_number: string
    backup_phone_number: string
  }
  _submitModal: Function
}) {
  return (
    <Modal
      openModal={_props.openModal}
      closeModal={_props.closeModal}
      closeModalOnOverlayClick={_props.closeModalOnOverlayClick}
      modalTitle={_props.action== "create" ? "Register Beneficiaries" : "Edit Beneficiary Details"}
      closeIconVisibility={_props.closeIconVisibility}
      elements={[
        {
          type: "iconView",
          props: {
            image: _props.action == "create" ? "../../../../../assets/images/step_2_of_4.svg" : "../../../../../assets/images/step_1_of_4.svg",
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
            placeholder: "Enter Name",
            value: _props.modalControl.name,
            _handleChange: _props._handleChange,
            required: false,
            inputStyles: "rounded-3xl border-[rgba(6, 90, 147, 0.30)] border-2",
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
            inputStyles: "rounded-3xl border-[rgba(6, 90, 147, 0.30)] border-2",
            inputContainerStyles: "mx-7 mb-4",
            hasRightIcon: false,
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
            inputStyles: "rounded-3xl border-[rgba(6, 90, 147, 0.30)] border-2",
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
            inputStyles: "rounded-3xl border-[rgba(6, 90, 147, 0.30)] border-2",
            inputContainerStyles: "mx-7 mb-4",
          },
        },
        {
          type: "inputView",
          props: {
            name: "phone_number",
            type: "tel",
            placeholder: "Phone Number",
            value: _props.modalControl.phone_number,
            _handleChange: _props._handleChange,
            required: false,
            inputStyles: "rounded-3xl border-[rgba(6, 90, 147, 0.30)] border-2",
            inputContainerStyles: "mx-7 mb-4",
          },
        },
        {
          type: "inputView",
          props: {
            name: "backup_phone_number",
            type: "tel",
            placeholder: "Backup Phone Number",
            value: _props.modalControl.backup_phone_number,
            _handleChange: _props._handleChange,
            required: false,
            inputStyles: "rounded-3xl border-[rgba(6, 90, 147, 0.30)] border-2",
            inputContainerStyles: "mx-7 mb-10",
          },
        },
        _props.action == "create" && {
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
                  text: "Notify the user that he has been added as a beneficiary",
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
    facebook_link: string
    instagram_username: string
    twitter_username: string
    image: string
  }
  _submitModal: Function
}) {
  return (
    <Modal
      openModal={_props.openModal}
      closeModal={_props.closeModal}
      closeModalOnOverlayClick={_props.closeModalOnOverlayClick}
      modalTitle={_props.action== "create" ? "Register Beneficiaries" : "Edit Beneficiary Details"}
      closeIconVisibility={_props.closeIconVisibility}
      elements={[
        {
          type: "iconView",
          props: {
            image: _props.action== "create" ? "../../../../../assets/images/step_3_of_4.svg" : "../../../../../assets/images/step_2_of_4.svg",
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
            placeholder: "Facebook Profile",
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
            placeholder: "Instagram Handle",
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
            placeholder: "Twitter Handle",
            value: _props.modalControl.twitter_username,
            _handleChange: _props._handleChange,
            required: true,
            inputStyles: "rounded-3xl w-full",
            hasRightIcon: true,
            icon: "../../../../../assets/images/twitter.svg",
            iconAlt: "instagram icon",
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
            CustomView: () => {
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

export function StepThreeModal(_props: {
  openModal: boolean
  closeModal: any
  closeModalOnOverlayClick: boolean
  closeIconVisibility: boolean
  action: string
  _handleChange: React.ChangeEventHandler<HTMLInputElement>
  modalControl: {
    personalized_message: string
    personalized_video_link: string
  }
  _submitModal: Function
}) {
  return (
    <Modal
      openModal={_props.openModal}
      closeModal={_props.closeModal}
      closeModalOnOverlayClick={_props.closeModalOnOverlayClick}
      modalTitle={_props.action== "create" ? "Register Beneficiaries" : "Edit Beneficiary Details"}
      closeIconVisibility={_props.closeIconVisibility}
      elements={[
        {
          type: "iconView",
          props: {
            image: _props.action== "create" ? "../../../../../assets/images/step_4_of_4.svg" : "../../../../../assets/images/step_3_of_4.svg",
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
            customViewContainer: "mx-auto w-[514px] h-[163px] mb-10",
            CustomView: () => {
              return (
                <textarea name="personalized_message" className="bg-[#F5FAFD] text-[#6F767B] pl-5 py-6 font-base rounded-3xl w-full h-full resize-none focus:outline-none"></textarea>
              )
            },
          },
        },
        {
          type: "textView",
          props: {
            text: "Upload a video testament for this beneficiary. This will only be shared once we confirm your passing. ",
            textStyles: "text=[#00192B] font-medium pl-7 mb-5",
          },
        },
        {
          type: "customView",
          props: {
            customViewContainer: "mx-auto",
            CustomView: () => {
              return (
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    name="personalized_video_link"
                    onChange={_props._handleChange}
                    className="opacity-0 absolute top-0 left-44 h-20 w-[220px]"
                  />
                  <div className="flex items-center justify-center gap-2 mb-8">
                    <span className="text-[#858992] font-medium">
                      Click to upload <br /> a video →
                    </span>
                    <img
                      src={uploadVideoIcon}
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
            onclick: _props._submitModal,
            buttonStyle: "",
            buttonContainer: "mx-48 mb-10",
          },
        },
      ]}
    />
  )
}

export function RegisterPKModal(_props: {
  openModal: boolean
  closeModal: any
  closeModalOnOverlayClick: boolean
  closeIconVisibility: boolean
  action: string
  _submitModal: React.MouseEventHandler<HTMLButtonElement>
  _handleKeyGeneration: React.MouseEventHandler<HTMLButtonElement>
}) {
  return (
    <Modal
      openModal={_props.openModal}
      closeModal={_props.closeModal}
      closeModalOnOverlayClick={_props.closeModalOnOverlayClick}
      modalTitle={_props.action== "create" ? "Register Beneficiaries" : "Edit Beneficiary Details"}
      closeIconVisibility={_props.closeIconVisibility}
      elements={[
        {
          type: "iconView",
          props: {
            image: _props.action == "create" ?  "../../../../../assets/images/step_1_of_4.svg" : "../../../../../assets/images/step_4_of_4.svg",
            imageStyles: "mx-auto",
            imageContainerStyles: "my-7",
          },
        },
        {
          type: "textView",
          props: {
            text: "Register a Public Key for this Beneficiary",
            textStyles: "text=[#00192B] font-semibold pl-7 mb-3 text-lg",
          },
        },
        {
          type: "textView",
          props: {
            text: "If you already have a Public/Private key pair, click on “I have a Private Key”. If not click on “Generate a Key pair” and we will generate one for you. ",
            textStyles: "text=[#858992] px-7 mb-9",
          },
        },
        {
          type: "customView",
          props: {
            customViewContainer: "mx-auto",
            CustomView: () => {
              return (
                <div className="flex items-center justify-between px-7 mb-11">
                  <button onClick={_props._handleKeyGeneration} className="primary-btn bg-[#D7D7D7] rounded-2xl text-[#04477B] px-8 py-4 font-bold">
                    Generate a Key pair
                  </button>
                  <button onClick={_props._submitModal} className="primary-btn bg-[#0971AA] rounded-2xl px-8 py-4 font-bold">
                    I have a Private Key
                  </button>
                </div>
              )
            },
          },
        },
        {
          type: "textView",
          props: {
            text: "Why do you need to set a private key?  ",
            textStyles: "text=[#00192B] px-7 mb-3 font-medium",
          },
        },
        {
          type: "iconView",
          props: {
            image: video,
            onclick: () => {},
            imageStyles: "mx-auto",
            imageContainerStyles: "mb-6",
          },
        },
      ]}
    />
  )
}
