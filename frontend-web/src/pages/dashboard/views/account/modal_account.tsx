import React, { useEffect } from "react"
import userImg from "@images/user.svg"
import uploadIcon from "@images/upload-icon.svg"
import arrowDown from "@images/arrow-down.svg"

import { Modal } from "@/components"

interface CustomChangeEvent {
  target: {
    name: string
    value: string | ArrayBuffer | null | undefined
  }
}

export function EditUserModal(_props: {
  openModal: boolean
  closeModal: any
  closeModalOnOverlayClick: boolean
  closeIconVisibility: boolean
  _handleChange: React.ChangeEventHandler<HTMLInputElement>
  modalControl: {
    displayName: string
    language: string
    profile_image: string
    defaultCurrency: string
  }
  _submitModal: () => void
  imageUpload: string
  userImage: string
  setImageUpload: any
  email: string
}) {
  const Languages = [{ value: "en", label: "en" }]
  const currencies = [
    { value: "USD", label: "USD (United State Dollar)" },
    { value: "AED", label: "AED (United Arab Emirates dirham)" },
    { value: "PKR", label: "PKR (Pakistani rupee)" },
    { value: "SGD", label: "SGD (Singapore dollar)" },
  ]

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
      modalTitle={"Edit Profile"}
      closeIconVisibility={_props.closeIconVisibility}
      elements={[
        {
          type: "customView",
          props: {
            customViewContainer: "w-full",
            CustomView: () => {
              return (
                <div className="relative">
                  <input
                    data-cy="select-profile-pic-input"
                    type="file"
                    accept="image/*"
                    onChange={handleImageInputChange}
                    name="profile_image"
                    className="opacity-0 absolute bottom-7 right-[212px] h-10 w-10 z-10 rounded-full"
                  />
                  <div className="flex items-center justify-center gap-2 mb-8">
                    <div className="mx-auto my-7 w-[128px] h-[128px] flex items-center justify-center bg-white rounded-full shadow-lg relative">
                      {_props.imageUpload || _props.userImage ? (
                        <>
                          <img
                            src={
                              _props.imageUpload || _props.userImage || userImg
                            }
                            alt=""
                            className="w-[124px] h-[124px] rounded-full object-contain"
                          />
                          <img
                            src={uploadIcon}
                            alt=""
                            className="h-10 w-10 absolute bottom-0 right-0 rounded-full object-contain"
                          />
                        </>
                      ) : (
                        <>
                          <img
                            src={userImg}
                            alt=""
                            className="w-[124px] h-[124px] rounded-full object-contain"
                          />
                          <img
                            src={uploadIcon}
                            alt=""
                            className="h-10 w-10 absolute bottom-0 right-0 rounded-full object-contain"
                          />
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )
            },
          },
        },
        {
          type: "textView",
          props: {
            text: "Name",
            textStyles: "text-[#00192B] font-medium mb-1 mx-7",
          },
        },
        {
          type: "inputView",
          props: {
            dataCy: "edit-user-name-field",
            name: "displayName",
            type: "text",
            placeholder: "Name",
            value: _props.modalControl.displayName,
            _handleChange: _props._handleChange,
            required: true,
            inputStyles: "rounded-3xl w-full",
            hasRightIcon: false,
            inputContainerStyles: "mx-7 mb-6 relative",
          },
        },
        {
          type: "textView",
          props: {
            text: "Email",
            textStyles: "text-[#00192B] font-medium mb-1 mx-7",
          },
        },
        {
          type: "inputView",
          props: {
            dataCy: "edit-user-email-field",
            name: "email",
            type: "text",
            placeholder: "Email",
            value: _props.email,
            _handleChange: () => {},
            required: true,
            disabled: true,
            inputStyles: "rounded-3xl w-full",
            hasRightIcon: false,
            inputContainerStyles: "mx-7 mb-6 relative",
          },
        },
        {
          type: "textView",
          props: {
            text: "Language",
            textStyles: "text-[#00192B] font-medium mb-1 mx-7",
          },
        },
        {
          type: "selectView",
          props: {
            dataCy: "select-language-list",
            data: Languages,
            value: {
              value: _props.modalControl.language,
              label: _props.modalControl.language,
            },
            selectProps: {
              placeholder: "Select a Language",
            },
            setSelectedValue: (value: any) => {
              const customEvent = {
                target: {
                  name: "language",
                  value: value.value,
                },
              }
              _props._handleChange(
                customEvent as React.ChangeEvent<HTMLInputElement>,
              )
            },
            hasRightIcon: true,
            rightIcon: arrowDown,
            rightIconAlt: "rightIcon",
            selectContainer: "mx-7 mb-4 relative",
            selectFieldStyles:
              "rounded-3xl border-[rgba(6, 90, 147, 0.30)] border-2 font-semibold px-2 text-[#6F767B] bg-[#F5FAFD]",
            rightIconStyles: "absolute right-4 top-4 cursor-pointer",
          },
        },
        {
          type: "textView",
          props: {
            text: "Currency",
            textStyles: "text-[#00192B] font-medium mb-1 mx-7",
          },
        },
        {
          type: "selectView",
          props: {
            data: currencies,
            value: {
              value: _props.modalControl.defaultCurrency,
              label: _props.modalControl.defaultCurrency,
            },
            selectProps: {
              placeholder: "Select a currency",
            },
            setSelectedValue: (value: any) => {
              const customEvent = {
                target: {
                  name: "defaultCurrency",
                  value: value.value,
                },
              }
              _props._handleChange(
                customEvent as React.ChangeEvent<HTMLInputElement>,
              )
            },
            hasRightIcon: true,
            rightIcon: arrowDown,
            rightIconAlt: "rightIcon",
            selectContainer: "mx-7 mb-4 relative",
            selectFieldStyles:
              "rounded-3xl border-[rgba(6, 90, 147, 0.30)] border-2 font-semibold px-2 text-[#6F767B] bg-[#F5FAFD]",
            rightIconStyles: "absolute right-4 top-4 cursor-pointer",
          },
        },
        {
          type: "buttonView",
          props: {
            dataCy: "save-changes-of-user-details-button",
            title: "Save Changes",
            onclick: _props._submitModal,
            buttonStyle: "",
            buttonContainer: "mx-48 mb-10 mt-10",
          },
        },
      ]}
    />
  )
}

export function ViewPrivateKey(_props: {
  openModal: boolean
  closeModal: any
  closeModalOnOverlayClick: boolean
  closeIconVisibility: boolean
  modalControl: any
}) {
  return (
    <Modal
      openModal={_props.openModal}
      closeModal={_props.closeModal}
      closeModalOnOverlayClick={_props.closeModalOnOverlayClick}
      modalTitle={"Public/Private Key Pair"}
      closeIconVisibility={_props.closeIconVisibility}
      elements={[
        {
          type: "customView",
          props: {
            customViewContainer: "mx-6 my-2",
            CustomView: () => {
              return (
                <div className="flex justify-between items-center">
                  <p className="text-[#00192B] font-semibold ">Public Key:</p>
                </div>
              )
            },
          },
        },
        {
          type: "TextAreaField",
          props: {
            dataCy: "public-key",
            textAreaContainerStyles: "flex justify-between items-center",
            name: "publicKey",
            inputStyles:
              "min-h-[200px] w-[502px] mx-6 p-2 border-[1px] border-[#858992] rounded-[5px] resize-none scrollbar",
            value: _props.modalControl.publicKey,
            isDisabled: true,
          },
        },
        {
          type: "customView",
          props: {
            customViewContainer: "mx-6 mb-2",
            CustomView: () => {
              return (
                <div className="flex justify-between items-center">
                  <p className="text-[#00192B] font-semibold ">
                    Secret Phrase (Private Key):
                  </p>
                </div>
              )
            },
          },
        },
        {
          type: "TextAreaField",
          props: {
            dataCy: "private-key",
            textAreaContainerStyles: "flex justify-between items-center",
            name: "privateKey",
            inputStyles:
              "min-h-[200px] w-[502px] mx-6 p-2 resize-none border-[1px] border-[#858992] rounded-[5px] mb-10 scrollbar",
            value: _props.modalControl.privateKey,
            isDisabled: true,
          },
        },
      ]}
    />
  )
}
