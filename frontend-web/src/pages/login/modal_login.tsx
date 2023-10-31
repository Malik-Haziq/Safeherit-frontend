import logo from "@images/safeherit_logo.svg"
import userImg from "@images/user.svg"
import { InputField, Modal, SelectField } from "@/components"
import { SelectOption } from "@/types"

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
