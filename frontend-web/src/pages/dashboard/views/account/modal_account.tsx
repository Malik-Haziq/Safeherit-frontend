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
  }
  _submitModal: Function
  imageUpload: string
  setImageUpload: Function
  email: string
}) {
  const Languages = [{ value: "en", label: "en" }]
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
                    type="file"
                    accept="image/*"
                    onChange={handleImageInputChange}
                    name="profile_image"
                    className="opacity-0 absolute bottom-7 right-[212px] h-10 w-10 z-10 rounded-full"
                  />
                  <div className="flex items-center justify-center gap-2 mb-8">
                    <div className="mx-auto my-7 w-[128px] h-[128px] flex items-center justify-center bg-white rounded-full shadow-lg relative">
                      {_props.imageUpload ? (
                        <>
                          <img
                            src={_props.imageUpload || userImg}
                            alt=""
                            className="w-[124px] h-[124px] rounded-full"
                          />
                          <img
                            src={uploadIcon}
                            alt=""
                            className="h-10 w-10 absolute bottom-0 right-0 rounded-full"
                          />
                        </>
                      ) : (
                        <>
                          <img
                            src={userImg}
                            alt=""
                            className="w-[124px] h-[124px] rounded-full"
                          />
                          <img
                            src={uploadIcon}
                            alt=""
                            className="h-10 w-10 absolute bottom-0 right-0 rounded-full"
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
          type: "inputView",
          props: {
            name: "email",
            type: "text",
            placeholder: "Email",
            value: _props.email,
            _handleChange: () => {},
            required: true,
            disabled: true,
            inputStyles: "rounded-3xl w-full",
            hasRightIcon: false,
            inputContainerStyles: "mx-7 mb-4 relative",
          },
        },
        {
          type: "selectView",
          props: {
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
            // selectFieldWidth: 490,
            selectContainer: "mx-7 mb-4 relative",
            selectFieldStyles:
              "rounded-3xl border-[rgba(6, 90, 147, 0.30)] border-2 font-semibold px-2 text-[#6F767B] bg-[#F5FAFD]",
            rightIconStyles: "absolute right-4 top-4 cursor-pointer",
          },
        },
        {
          type: "buttonView",
          props: {
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
