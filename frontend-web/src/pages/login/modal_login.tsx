import uploadImg from "@images/upload.png"
import { Modal } from "@/components"

export function PrivateKeyModal(_props: {
  openModal: boolean
  closeModal: any
  closeModalOnOverlayClick: boolean
  closeIconVisibility: boolean
  action: string
  videoUpload: string
  // setVideoUpload: Function
  _handleChange: React.ChangeEventHandler<HTMLInputElement>
}) {
  const handleImageInputChange = (event: any) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const dataURL = e.target?.result
        //   _props.setVideoUpload(dataURL)
        const customEvent: CustomChangeEvent = {
          target: {
            name: "personalized_video",
            value: file,
          },
        }
        _props._handleChange(customEvent as React.ChangeEvent<HTMLInputElement>)
      }
      reader.readAsDataURL(file)
    }
  }
  interface CustomChangeEvent {
    target: {
      name: string
      value: string | ArrayBuffer | null | undefined
    }
  }
  return (
    <Modal
      openModal={_props.openModal}
      closeModal={_props.closeModal}
      closeModalOnOverlayClick={_props.closeModalOnOverlayClick}
      modalTitle={
        _props.action == "create"
          ? "Register Beneficiaries"
          : "Edit Beneficiary Details"
      }
      closeIconVisibility={_props.closeIconVisibility}
      elements={[
        {
          type: "textView",
          props: {
            text: "How we use your Private key:",
            textStyles: "text-[#00192B] text-sm font-semibold pl-7 mb-3 mt-2",
          },
        },

        {
          type: "textView",
          props: {
            text: "First we will use it to derive the corresponding Public Key.We will store this Public Key in our servers, and use it to encrypt all your data. ",
            textStyles: "text-[#74777E]  text-sm font-medium pl-8 pr-7 mb-5",
          },
        },
        {
          type: "textView",
          props: {
            text: "As for your Private key, it will kept in your browser’s cache memory, and will be used to decrypt the data coming from our servers (which is encrypted with your private key). Once your session is over your Private key will be encrypted and stored in your browser for your next session. ",
            textStyles: "text-[#74777E]  text-sm font-medium pl-8 pr-7 mb-5",
          },
        },
        {
          type: "textView",
          props: {
            text: "Your Private key will never leave your computer and we will neither receive nor store it.",
            textStyles: "text-[#74777E]  text-sm font-medium pl-8 pr-7 mb-5",
          },
        },
        {
          type: "customView",
          props: {
            customViewContainer: "mx-auto mb-7",
            CustomView: () => {
              return (
                <div className="relative">
                  <input
                    type="file"
                    accept="video/*"
                    name="personalized_video"
                    onChange={handleImageInputChange}
                    className="opacity-0 absolute top-2 left-36 h-10 w-[266px]"
                  />
                  <img src={uploadImg} alt="upload file" className="mx-auto" />
                </div>
              )
            },
          },
        },
        {
          type: "customView",
          props: {
            customViewContainer: "mx-auto mb-7",
            CustomView: () => {
              return (
                <div className="flex items-center justify-between px-8">
                  <button className="primary-btn rounded-xl px-9 border-[1px] border-[#04477B] text-[#04477B] bg-white shadow-none">
                    Cancel
                  </button>
                  <button className="primary-btn rounded-xl px-9 bg-[#04477B] text-white shadow-none">
                    Load
                  </button>
                </div>
              )
            },
          },
        },
      ]}
    />
  )
}
