import uploadImg from "@images/upload.png"
import logo from "@images/safeherit_logo.svg"
import userImg from "@images/user.svg"
import { InputField, Modal, SelectField } from "@/components"
import { SelectOption } from "@/types"
import copyIcon from "@images/copy-icon.svg"
import downloadIcon from "@images/download.svg"

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
      modalTitle={"Load Private Key"}
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
export function GeneratePrivateKey(_props: {
  openModal: boolean
  closeModal: any
  closeModalOnOverlayClick: boolean
  closeIconVisibility: boolean
  action: string
  videoUpload: string
  // setVideoUpload: Function
  _handleChange: React.ChangeEventHandler<HTMLInputElement>
}) {
  return (
    <Modal
      openModal={_props.openModal}
      closeModal={_props.closeModal}
      closeModalOnOverlayClick={_props.closeModalOnOverlayClick}
      modalTitle={"Generate Public/Private Key Pair"}
      closeIconVisibility={_props.closeIconVisibility}
      elements={[
        {
          type: "buttonView",
          props: {
            title: "Generate Public/Private Key Pair",
            onclick: () => {},
            buttonStyle:
              "bg-[#47B29E] font-bold text-white px-8 py-4 rounded-2xl mx-auto mt-5",
            buttonContainer: "flex mb-10",
          },
        },
        {
          type: "customView",
          props: {
            customViewContainer: "mx-6 mb-2",
            CustomView: () => {
              return (
                <div className="flex justify-between items-center">
                  <p className="text-[#00192B] font-semibold ">Public Key:</p>
                  <div className="flex items-center gap-3 ">
                    <div className="flex items-center gap-1 cursor-pointer">
                      <span>Copy</span>
                      <img src={copyIcon} alt="copy icon " />
                    </div>
                    <div className="flex items-center gap-1 cursor-pointer">
                      <span>Download</span>
                      <img src={downloadIcon} alt="download icon" />
                    </div>
                  </div>
                </div>
              )
            },
          },
        },
        {
          type: "customView",
          props: {
            customViewContainer: "mx-6 mb-7",
            CustomView: () => {
              return (
                <div className="flex justify-between items-center">
                  <textarea className="w-full h-[68px] border-[1px] border-[#858992] rounded-[5px]"></textarea>
                </div>
              )
            },
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
                  <div className="flex items-center gap-3 ">
                    <div className="flex items-center gap-1 cursor-pointer">
                      <span>Copy</span>
                      <img src={copyIcon} alt="copy icon " />
                    </div>
                    <div className="flex items-center gap-1 cursor-pointer">
                      <span>Download</span>
                      <img src={downloadIcon} alt="download icon" />
                    </div>
                  </div>
                </div>
              )
            },
          },
        },
        {
          type: "customView",
          props: {
            customViewContainer: "mx-6 mb-7",
            CustomView: () => {
              return (
                <div className="flex justify-between items-center">
                  <textarea className="w-full h-[107px] border-[1px] border-[#858992] rounded-[5px] "></textarea>
                </div>
              )
            },
          },
        },
        {
          type: "textView",
          props: {
            text: "Warning:",
            textStyles:
              "text-[#00192B] font-semibold text-start pl-6 mb-3 mt-2",
          },
        },
        {
          type: "textView",
          props: {
            text: "Make sure to save your Secret Phrase (Private Key) somewhere safe. We do not store it, and without it you will not be able to view your encrypted data.",
            textStyles: "text-[#74777E] text-start pl-6 pr-7 mb-5",
          },
        },

        {
          type: "buttonView",
          props: {
            title: "Register the Generated Public Key",
            onclick: () => {},
            buttonStyle:
              "bg-[#0971AA] font-bold text-white px-12 py-4 rounded-2xl mx-auto mt-5",
            buttonContainer: "flex mb-10",
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
  _beneficiaryOf: SelectOption[]
  _validatorOf: SelectOption[]
  selectedBeneficiary: SelectOption | undefined
  setSelectedBeneficiary: Function
  selectedValidator: SelectOption | undefined
  setSelectedValidator: Function
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
                  {_props.isOwner && (
                    <LoggedUser
                      userImg={userImg}
                      userName={_props.userName}
                      userRole={"owner"}
                      _handleUserRolesSubmit={_props._handleUserRolesSubmit}
                    />
                  )}
                  {_props.isBeneficiary && (
                    <LoggedUser
                      userImg={userImg}
                      userName={_props.userName}
                      _beneficiaryOf={_props._beneficiaryOf}
                      userRole={"beneficiary"}
                      setSelectedBeneficiary={_props.setSelectedBeneficiary}
                      selectedBeneficiary={_props.selectedBeneficiary}
                      _handleUserRolesSubmit={_props._handleUserRolesSubmit}
                    />
                  )}
                  {_props.isValidator && (
                    <LoggedUser
                      userImg={userImg}
                      userName={_props.userName}
                      _validatorOf={_props._validatorOf}
                      userRole={"validator"}
                      setSelectedValidator={_props.setSelectedValidator}
                      selectedValidator={_props.selectedValidator}
                      _handleUserRolesSubmit={_props._handleUserRolesSubmit}
                    />
                  )}
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
  _beneficiaryOf?: SelectOption[]
  _validatorOf?: SelectOption[]
  setSelectedBeneficiary?: Function
  selectedBeneficiary?: SelectOption | undefined
  setSelectedValidator?: Function
  selectedValidator?: SelectOption | undefined
  _handleUserRolesSubmit: Function
}) {
  return (
    <div className="flex items-center justify-between items-end py-1 mx-14 my-4 border-b-[1px] ">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row justify-between">
          <p className="font-medium text-sm">
            {_props.userRole?.toUpperCase()}
          </p>
          <p
            onClick={() => {
              _props._handleUserRolesSubmit(_props.userRole)
            }}
            className="text-sm font-medium text-[#0C8AC1] cursor-pointer hover:opacity-75"
          >
            Login
          </p>
        </div>
        <div className="flex flex-col gap-2">
          {_props.userRole.toLowerCase() == "beneficiary" ? (
            <SelectField
              data={_props._beneficiaryOf}
              value={_props.selectedBeneficiary}
              selectProps={{ placeholder: "Select Owner", isSearchable: false }}
              setSelectedValue={_props.setSelectedBeneficiary}
              selectFieldStyles={
                "rounded-3xl font-semibold px-2 text-[#6F767B] bg-[#F5FAFD] w-[430px]"
              }
              hasRightIcon={false}
            />
          ) : _props.userRole.toLowerCase() == "validator" ? (
            <SelectField
              data={_props._validatorOf}
              value={_props.selectedValidator}
              selectProps={{ placeholder: "Select Owner", isSearchable: false }}
              setSelectedValue={_props.setSelectedValidator}
              selectFieldStyles={
                "rounded-3xl font-semibold px-2 text-[#6F767B] bg-[#F5FAFD] w-[430px]"
              }
              hasRightIcon={false}
            />
          ) : (
            <div className="flex justify-center items-center w-[200] font-semibold">
              <InputField
                name={""}
                type={""}
                placeholder={""}
                value={_props.userName}
                _handleChange={() => {}}
                required={false}
                hasRightIcon={false}
                inputContainerStyles={"rounded-3xl w-[430px]"}
                inputStyles={"w-[430px] bg-white"}
                disabled={true}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
