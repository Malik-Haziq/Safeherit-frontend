import uploadImg from "@images/upload.png"
import logo from "@images/safeherit_logo.svg"
import userImg from "@images/user.svg"
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

export function UserRolesModal(_props: {
  openModal: boolean
  closeModal: any
  closeModalOnOverlayClick: boolean
  closeIconVisibility: boolean
  isBeneficiary: boolean
  isOwner: boolean
  isValidator: boolean
  userName: string
  _handleUserRolesSubmit: Function
}) {
  return (
    <Modal
      openModal={_props.openModal}
      closeModal={_props.closeModal}
      closeModalOnOverlayClick={_props.closeModalOnOverlayClick}
      modalTitle={"User Roles "}
      closeIconVisibility={_props.closeIconVisibility}
      elements={[
        {
          type: "iconView",
          props: {
            image: logo,
            imageStyles: "mx-auto",
            imageContainerStyles: "mt-7 mb-10",
          },
        },
        {
          type: "customView",
          props: {
            customViewContainer: "mx-auto mb-10",
            CustomView: () => {
              return (
                <div>
                  {_props.isOwner && <LoggedUser
                    userImg={userImg}
                    userName={_props.userName}
                    userRole={"owner"}
                    // ownerImg={userImg}
                    // ownerName={"sa"}
                    _handleUserRolesSubmit={_props._handleUserRolesSubmit}
                  /> }
                  {_props.isBeneficiary && <LoggedUser
                    userImg={userImg}
                    userName={_props.userName}
                    userRole={"beneficiary"}
                    // ownerImg={userImg}
                    // ownerName={"sa"}
                    _handleUserRolesSubmit={_props._handleUserRolesSubmit}
                  /> }
                  {_props.isValidator && <LoggedUser
                    userImg={userImg}
                    userName={_props.userName}
                    userRole={"validator"}
                    // ownerImg={userImg}
                    // ownerName={"sa"}
                    _handleUserRolesSubmit={_props._handleUserRolesSubmit}
                  /> }
                </div>
              )
            },
          },
        },
      ]}
    />
  )
}

function LoggedUser(_props: {
  userImg: any
  userName: string
  userRole: string
  ownerImg?: any
  ownerName?: string
  _handleUserRolesSubmit: Function
}) {
  return (
    <div className="flex items-center justify-between py-1 mx-14 my-4 border-b-[1px] ">
      <div className="flex flex-col gap-2">
        <div className="flex justify-center items-center gap-4 font-semibold">
          <img
            src={_props.userImg}
            alt="user image"
            className="w-8 h-w rounded-full"
          />
          <h2>{_props.userName}</h2>
        </div>
        {
          _props.userRole.toLowerCase() !== 'owner' ?
            <div className="flex items-center text-[#333] ">
              <small className="flex items-center justify-center gap-1">
                Owner: <img src={_props.ownerImg} alt="owner Image" className="ml-2 w-5"/>{" "}
                <span>{_props.ownerName}</span>
              </small>
            </div> : 
            <div></div>
        }
        
      </div>
      <p className="font-medium text-sm">{_props.userRole?.toUpperCase()}</p>
      <p onClick={() => {_props._handleUserRolesSubmit(_props.userRole)}} className="text-sm font-medium text-[#0C8AC1] cursor-pointer hover:opacity-75">
        Login
      </p>
    </div>
  )
}
