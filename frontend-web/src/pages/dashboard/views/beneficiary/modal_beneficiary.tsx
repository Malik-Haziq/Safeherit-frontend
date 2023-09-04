import { Modal } from "../../../../components"
import facebook from "../../../../../assets/images/facebook.svg"
import uploadVideoIcon from "../../../../../assets/images/upload-video.svg"
import video from "../../../../../assets/images/register_page_video.png"
import registerBeneficiaryImg from "../../../../../assets/images/register-beneficiary.svg"

export function RegisterBeneficiaryModal_0(_props: {
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
            image: registerBeneficiaryImg,
            onclick: () => {},
            imageStyles: "mx-auto",
            imageContainerStyles: "my-10",
          },
        },
        {
          type: "textView",
          props: {
            text: "What is a Beneficiary",
            onclick: () => {},
            textStyles: "text=[#00192B] text-lg font-bold mb-4 mx-auto w-fit",
          },
        },
        {
          type: "textView",
          props: {
            text: "A beneficiary is who you choose to receive information about your assets after you're gone. It could be a family member, friend, or even an organization. They are the ones who will learn about your valuables and investments after you pass away. By naming a beneficiary on SafeHerit, you decide who gets this important information in the future.",
            onclick: () => {},
            textStyles: "text=[#868686] leading-7 px-7 mb-7 text-center ",
          },
        },
        {
          type: "buttonView",
          props: {
            title: "Register Beneficiaries",
            onclick: () => {},
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

export function RegisterBeneficiaryModal_4(_props: {
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
            image: "../../../../../assets/images/step_4_of_4.svg",
            onclick: () => {},
            imageStyles: "mx-auto",
            imageContainerStyles: "mt-7 mb-24",
          },
        },
        {
          type: "textView",
          props: {
            text: "You successfully registered a new beneficiary!",
            onclick: () => {},
            textStyles:
              "text=[#082A44] text-2xl font-bold text-center mb-32 px-12",
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
                      Click here if you want to register another beneficiary.
                    </p>
                    <button className="bg-[#0971AA] font-bold text-white px-8 py-1 w-[225px] rounded-2xl">
                      Register another Beneficiary
                    </button>
                  </div>
                  <div className="flex flex-col gap-8 ">
                    <p className="w-[194px] text-center text-[#4F4F4F] leading-tight">
                      Click here to move on to register validators if you’re
                      done registering beneficiaries.
                    </p>
                    <button className="bg-[#0971AA] font-bold text-white px-4 py-4 w-[225px] rounded-2xl">
                      Register Validators
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

export function EditBeneficiaryModal_1(_props: {
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
            image: "../../../../../assets/images/step_1_of_4.svg",
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
            inputStyles: "rounded-3xl border-[rgba(6, 90, 147, 0.30)] border-2",
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
            inputStyles: "rounded-3xl border-[rgba(6, 90, 147, 0.30)] border-2",
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
            inputStyles: "rounded-3xl border-[rgba(6, 90, 147, 0.30)] border-2",
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
            inputStyles: "rounded-3xl border-[rgba(6, 90, 147, 0.30)] border-2",
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
            inputStyles: "rounded-3xl border-[rgba(6, 90, 147, 0.30)] border-2",
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
            inputStyles: "rounded-3xl border-[rgba(6, 90, 147, 0.30)] border-2",
            inputContainerStyles: "mx-7 mb-10",
            hasRightIcon: false,
            icon: "",
            iconAlt: "",
            iconPress: () => {},
            rightIconStyles: "",
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

export function EditBeneficiaryModal_2(_props: {
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
            image: "../../../../../assets/images/step_2_of_4.svg",
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
                      src={facebook}
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
            onclick: () => {},
            buttonStyle: "",
            buttonContainer: "mx-48 mb-10",
          },
        },
      ]}
    />
  )
}

export function EditBeneficiaryModal_3(_props: {
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
            image: "../../../../../assets/images/step_3_of_4.svg",
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
            customViewContainer: "mx-auto w-[514px] h-[163px] mb-10",
            CustomView: function Name() {
              return (
                <textarea className="bg-[#F5FAFD] text-[#6F767B] pl-5 py-6 font-base rounded-3xl w-full h-full resize-none focus:outline-none"></textarea>
              )
            },
          },
        },
        {
          type: "textView",
          props: {
            text: "Upload a video testament for this beneficiary. This will only be shared once we confirm your passing. ",
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
            onclick: () => {},
            buttonStyle: "",
            buttonContainer: "mx-48 mb-10",
          },
        },
      ]}
    />
  )
}

export function EditBeneficiaryModal_4(_props: {
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
            image: "../../../../../assets/images/step_4_of_4.svg",
            onclick: () => {},
            imageStyles: "mx-auto",
            imageContainerStyles: "my-7",
          },
        },
        {
          type: "textView",
          props: {
            text: "Register a Public Key for this Beneficiary",
            onclick: () => {},
            textStyles: "text=[#00192B] font-semibold pl-7 mb-3 text-lg",
          },
        },
        {
          type: "textView",
          props: {
            text: "If you already have a Public/Private key pair, click on “I have a Private Key”. If not click on “Generate a Key pair” and we will generate one for you. ",
            onclick: () => {},
            textStyles: "text=[#858992] px-7 mb-9",
          },
        },
        {
          type: "customView",
          props: {
            customViewContainer: "mx-auto",
            CustomView: function Name() {
              return (
                <div className="flex items-center justify-between px-7 mb-11">
                  <button className="primary-btn bg-[#D7D7D7] rounded-2xl text-[#04477B] px-8 py-4 font-bold">
                    Generate a Key pair
                  </button>
                  <button className="primary-btn bg-[#0971AA] rounded-2xl px-8 py-4 font-bold">
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
            onclick: () => {},
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
