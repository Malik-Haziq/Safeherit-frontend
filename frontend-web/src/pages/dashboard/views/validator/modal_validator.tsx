import { Modal } from "../../../../components"
import facebook from "../../../../../assets/images/facebook.svg"
import arrowDown from "../../../../../assets/images/Arrow-Down-Circle.svg"
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
                  customViewContainer: "",
                  CustomView: function Name() {
                    return (
                      <input type="checkbox" className="w-5 h-5 bg-black" />
                    )
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
                <textarea className="bg-[#F5FAFD] text-[#6F767B] pl-5 py-6 font-base rounded-3xl w-full h-full focus:outline-none"></textarea>
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
