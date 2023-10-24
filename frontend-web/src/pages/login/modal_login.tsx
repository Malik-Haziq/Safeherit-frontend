import uploadImg from "@images/upload.png"
import logo from "@images/safeherit_logo.svg"
import userImg from "@images/user.svg"
import { InputField, Modal, SelectField } from "@/components"
import { SelectOption } from "@/types"

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
  isSuperAdmin: boolean
  isAdmin: boolean
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
                  {_props.isSuperAdmin && (
                    <LoggedUser
                      userImg={userImg}
                      userName={_props.userName}
                      userRole={"super-admin"}
                      _handleUserRolesSubmit={_props._handleUserRolesSubmit}
                    />
                  )}
                  {_props.isAdmin && (
                    <LoggedUser
                      userImg={userImg}
                      userName={_props.userName}
                      userRole={"admin"}
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
          <button
            onClick={() => {
              _props._handleUserRolesSubmit(_props.userRole)
            }}
            className="text-sm font-medium text-[#0C8AC1] cursor-pointer hover:opacity-75"
          >
            Login
          </button>
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
                placeholder={" "}
                value={_props.userName|| " "}
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
