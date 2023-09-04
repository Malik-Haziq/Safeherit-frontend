import { Modal } from "../../../../components"
import facebook from "../../../../../assets/images/facebook.svg"
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
            inputStyles: "rounded-3xl ",
            hasRightIcon: true,
            icon: facebook,
            iconAlt: "facebook icon",
            iconPress: () => {},
            rightIconStyles: "absolute right-12 top-4",
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
            inputStyles: "rounded-3xl ",
            hasRightIcon: true,
            icon: "../../../../../assets/images/insta.svg",
            iconAlt: "instagram icon",
            iconPress: () => {},
            rightIconStyles: "absolute right-12 top-4 w-6",
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
            inputStyles: "rounded-3xl",
            hasRightIcon: true,
            icon: "../../../../../assets/images/twitter.svg",
            iconAlt: "instagram icon",
            iconPress: () => {},
            rightIconStyles: "absolute right-12 top-4 w-6",
            inputContainerStyles: "mx-7 mb-4 relative",
          },
        },
        {
          type: "textView",
          props: {
            text: "Profile Picture",
            onclick: () => {},
            textStyles: "text=[#00192B] font-medium pl-7 mb-3",
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
