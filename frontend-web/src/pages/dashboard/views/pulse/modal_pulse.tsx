import { Modal } from "@/components"
import stepOne from "@images/step_1_of_4.svg"
import stepTwo from "@images/step_2_of_4.svg"
import stepThree from "@images/step_3_of_4.svg"
import stepFour from "@images/step_4_of_4.svg"
import videoImg from "@images/register_page_video.png"
import radioIcon from "@images/radio-icon.svg"
import radioBlueIcon from "@images/radio-icon-blue.svg"
import radioGreenIcon from "@images/radio-icon-green.svg"
import radioGrayIcon from "@images/radio-icon-gray.svg"
import linkFacebook from "@images/link-facebook.svg"
import linkTwitter from "@images/link-twitter.svg"
import linkInsta from "@images/link-insta.svg"

export function StepOneModal(_props: {
  openModal: boolean
  closeModal: any
  closeModalOnOverlayClick: boolean
  closeIconVisibility: boolean
  action: string
  _handleChange: React.ChangeEventHandler<HTMLInputElement>
  _submitModal: Function
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
            onclick: () => {},
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
      modalTitle={"Setup Pulse Check"}
      closeIconVisibility={_props.closeIconVisibility}
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
          type: "customView",
          props: {
            customViewContainer: "mx-7",
            CustomView: () => {
              return (
                <div className="grid grid-cols-2 grid-rows-2 gap-2 mb-5">
                  <div className="w-[240px] bg-[#F6F6F6] flex items-center justify-between py-4 px-5 rounded-2xl cursor-pointer border-[1px] border-[#0C8AC1]">
                    <p className="text-[#00192B] font-semibold">
                      30 <span className=" font-medium text-sm">Days</span>
                    </p>
                    <img src={radioBlueIcon} alt="radio icon" />
                  </div>
                  <div className="w-[240px] bg-[#F6F6F6] flex items-center justify-between py-4 px-5 rounded-2xl">
                    <p className="text-[#00192B] font-semibold">
                      30 <span className=" font-medium text-sm">Days</span>
                    </p>
                    <img src={radioIcon} alt="radio icon" />
                  </div>
                  <div className="w-[240px] bg-[#F6F6F6] flex items-center justify-between py-4 px-5 rounded-2xl">
                    <p className="text-[#00192B] font-semibold">
                      30 <span className=" font-medium text-sm">Days</span>
                    </p>
                    <img src={radioIcon} alt="radio icon" />
                  </div>
                  <div className="">
                    <input
                      type="text"
                      placeholder="Custom"
                      className="w-[240px] bg-[#F6F6F6] flex items-center justify-between py-4 px-5 rounded-2xl focus:outline-none placeholder:text-[#00192B] placeholder:font-semibold"
                    />
                  </div>
                </div>
              )
            },
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
            name: "primary_email",
            type: "text",
            placeholder: "Email",
            value: _props.modalControl.primary_email,
            _handleChange: _props._handleChange,
            required: false,
            inputStyles: "rounded-3xl ",
            inputContainerStyles: "mx-7 mb-2",
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
            inputStyles: "rounded-3xl ",
            inputContainerStyles: "mx-7 mb-2",
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
            inputStyles: "rounded-3xl ",
            inputContainerStyles: "mx-7 mb-2",
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
          type: "inputView",
          props: {
            name: "phone_number",
            type: "tel",
            placeholder: "Phone Number",
            value: _props.modalControl.phone_number,
            _handleChange: _props._handleChange,
            required: false,
            inputStyles: "rounded-3xl ",
            inputContainerStyles: "mx-7 mb-2",
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
            inputStyles: "rounded-3xl ",
            inputContainerStyles: "mx-7 mb-5",
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
  _submitModal: Function
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
            onclick: () => {},
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
  _submitModal: Function
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
            imageContainerStyles: "my-7",
          },
        },

        {
          type: "textView",
          props: {
            text: "We recommend that you register at least two validators in case one of them cannot be reached. SafeHerit will make your encrypted data available to your beneficiaries as soon as one of your validators confirms your passing.",
            textStyles: "text-[#4F4F4F] pl-7 mb-3",
          },
        },
        {
          type: "textView",
          props: {
            text: "Below you can define how SafeHerit should proceed if we get no response from any of your validators after multiple attempts using all the contact information you registered.",
            textStyles: "text-[#4F4F4F] pl-7 mb-3",
          },
        },
        {
          type: "textView",
          props: {
            text: "If we get no response from any validator:  ",
            textStyles: "text-[#00192B] font-semibold pl-7 mb-3",
          },
        },
        {
          type: "customView",
          props: {
            customViewContainer: "mx-7",
            CustomView: () => {
              return (
                <div className="flex flex-col gap-3 mb-10">
                  <div className="flex items-center gap-3 text-sm font-semibold mb-3 text-[#47B29E]">
                    <img src={radioGreenIcon} alt="radio icon green" />
                    <p>
                      Keep following up: do not contact my beneficiaries unless
                      you get a confirmation from a validator.
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-medium text-[#8C8C8C]">
                    <img src={radioGrayIcon} alt="radio icon green" />
                    <p>
                      Keep following up: do not contact my beneficiaries unless
                      you get a confirmation from a validator.
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
            onclick: () => {},
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
      modalTitle={
        _props.action == "create"
          ? "Beneficiary Registered"
          : "Edit Beneficiary Details"
      }
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
            title: "Register Assets",
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
