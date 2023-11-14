import logo from "@images/safeherit_logo.svg"
import userImg from "@images/user.svg"
import { InputField, Modal, SelectField } from "@/components"
import { SelectOption } from "@/types"
import downArrow from '@images/Arrow-Down-Circle.svg'
 
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
                      userName={"Select Owner"}
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
                      userName={"Select Owner"}
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
        <div className="flex flex-col items-start w-[428px]">
          <p className="font-medium text-[#bbb] text-sm mb-2">
            {_props.userRole?.toUpperCase()}
          </p>
          <div className="flex justify-between w-full">
            <small className= {
              _props.userRole == "beneficiary" || _props.userRole == "validator" ? "text-sm font-small text-[#bbb]" : "text-lg font-medium" }>{
              _props.selectedBeneficiary ? _props.selectedBeneficiary.label :
              _props.selectedValidator ? _props.selectedValidator.label :
              _props.userName
            }
            </small>
            <button
              onClick={() => {
                _props._handleUserRolesSubmit(_props.userRole)
              }}
              className="text-sm font-medium text-[#0C8AC1] cursor-pointer hover:opacity-75"
              > 
              Login
            </button>
          </div>
        </div>
        <div className="cy-role-select-field flex flex-col gap-2">
          {_props.userRole.toLowerCase() == "beneficiary" ? (
            <SelectField
              data={_props._beneficiaryOf}
              value={_props.selectedBeneficiary}
              selectProps={{ placeholder: "Select Owner", isSearchable: false }}
              setSelectedValue={_props.setSelectedBeneficiary}
              selectFieldStyles={
                "cy-beneficiary-owner rounded-3xl font-semibold px-2 text-[#6F767B] bg-[#F5FAFD] my-3 relative"
              }
              hasRightIcon={true}
              rightIcon={downArrow}
              rightIconStyles='absolute right-4 top-4 cursor-pointer'
            />
          ) : _props.userRole.toLowerCase() == "validator" ? (
            <SelectField
              data={_props._validatorOf}
              value={_props.selectedValidator}
              selectProps={{ placeholder: "Select Owner", isSearchable: false }}
              setSelectedValue={_props.setSelectedValidator}
              selectFieldStyles={
                "cy-validator-owner rounded-2xl font-semibold px-2 text-[#6F767B] bg-[#F5FAFD] my-3 relative"
              }
              hasRightIcon={true}
              rightIcon={downArrow}
              rightIconStyles='absolute right-4 top-4 cursor-pointer'
            />
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  )
}
