import React, { useState, useEffect } from "react"
import registerAssetsImg from "@images/register-assets.svg"
import stepOne from "@images/step-1.svg"
import stepTwo from "@images/step-2.svg"
import uploadVideoIcon from "@images/upload-video.svg"
import arrowDown from "@images/arrow-down.svg"
import userImg from "@images/user.svg"

import { Modal, toast } from "@/components"
import { assetData } from "./data"
import { useAppSelector } from "@redux/hooks"
import { getFileFromFirebase } from "@/common"
import { CurrencyField } from "@/components/currencyField"

const selectFieldStyles =
  "rounded-3xl border-[rgba(6, 90, 147, 0.30)] border-2 font-semibold px-2 text-[#6F767B] bg-[#F5FAFD] min-h-[56px] h-[100%]"
const selectFieldRightIconStyles = "absolute right-4 top-4 cursor-pointer"
const textInputFieldStyles =
  "rounded-3xl border-[rgba(6, 90, 147, 0.30)] border-2"

export function StepZeroInformationModal(_props: {
  openModal: boolean
  closeModal: () => void
  closeModalOnOverlayClick: boolean
  closeIconVisibility: boolean
  _submitModal: () => void
}) {
  return (
    <Modal
      openModal={_props.openModal}
      closeModal={_props.closeModal}
      closeModalOnOverlayClick={_props.closeModalOnOverlayClick}
      modalTitle={"Create New Assets"}
      closeIconVisibility={_props.closeIconVisibility}
      elements={[
        {
          type: "iconView",
          props: {
            image: registerAssetsImg,
            imageStyles: "mx-auto",
            imageContainerStyles: "my-10",
          },
        },
        {
          type: "textView",
          props: {
            text: "What are Assets?",
            textStyles: "text-[#00192B] text-lg font-bold mb-4 mx-auto w-fit",
          },
        },
        {
          type: "textView",
          props: {
            text: "An asset is anything you own that has value. It could be physical, like a house or car, or intangible, like stocks or patents. It's a resource that helps you create wealth, can be converted into cash, or reduces your liabilities.",
            textStyles: "text-[#868686] leading-7 px-7 mb-8 text-center ",
          },
        },
        {
          type: "textView",
          props: {
            text: "When registering your assets on SafeHerit, you are essentially documenting what you have that is of value in order to later share that information with your beneficiaries",
            textStyles: "text-[#868686] leading-7 px-7 mb-7 text-center ",
          },
        },
        {
          type: "buttonView",
          props: {
            dataCy: "create-asset-button",
            title: "Create Assets",
            onclick: _props._submitModal,
            buttonStyle:
              "bg-[#0971AA] font-bold text-white mx-auto px-8 py-3 rounded-2xl block",
            buttonContainer: " mb-10 ",
          },
        },
      ]}
    />
  )
}
interface ModalControl {
  [key: string]: any // This index signature allows string keys with any value
}

const generateSelectFieldProps = (
  assetTypes: any,
  placeholder: string,
  value: any,
  name: string,
  isMulti: boolean,
  _handleChange: any,
) => {
  return {
    type: "selectView",
    props: {
      dataCy: "asset-types-list",
      data: assetTypes,
      value: value,
      selectProps: {
        placeholder: placeholder,
        isMulti: isMulti,
      },
      setSelectedValue: (value: any) => {
        const customEvent = {
          target: {
            name: name,
            value: value.value,
          },
        }
        _handleChange(customEvent as React.ChangeEvent<HTMLInputElement>)
      },
      hasRightIcon: true,
      rightIcon: arrowDown,
      rightIconAlt: "rightIcon",
      // selectFieldWidth: 490,
      selectContainer: "mx-7 mb-4 relative min-h-[56px] h-[100%]",
      selectFieldStyles: selectFieldStyles,
      rightIconStyles: selectFieldRightIconStyles,
    },
  }
}

const generateMultiSelectFieldProps = (
  assetTypes: any,
  placeholder: string,
  value: any,
  name: string,
  isMulti: boolean,
  _handleChange: any,
) => {
  return {
    type: "selectView",
    props: {
      dataCy: "asset-types-list",
      data: assetTypes,
      value: value,
      selectProps: {
        placeholder: placeholder,
        isMulti: isMulti,
      },
      setSelectedValue: (value: any) => {
        const customEvent = {
          target: {
            name: name,
            value: value,
          },
        }
        _handleChange(customEvent as React.ChangeEvent<HTMLInputElement>)
      },
      hasRightIcon: true,
      rightIcon: arrowDown,
      rightIconAlt: "rightIcon",
      // selectFieldWidth: 490,
      selectContainer: "mx-7 mb-4 relative",
      selectFieldStyles: selectFieldStyles,
      rightIconStyles: selectFieldRightIconStyles,
    },
  }
}

const generateTextInputFieldProps = (
  name: string,
  placeholder: string,
  value: any,
  _handleChange: any,
) => {
  return {
    type: "inputView",
    props: {
      dataCy: "generate-text-input-field",
      name: name,
      type: "text",
      placeholder: placeholder,
      value: value,
      _handleChange: _handleChange,
      required: false,
      inputStyles: textInputFieldStyles,
      inputContainerStyles: "mx-7 mb-4",
      hasRightIcon: false,
    },
  }
}

const generateTextView = (name: string) => {
  return {
    type: "textView",
    props: {
      text: name,
      textStyles: "text-[#00192B] font-medium mb-4 px-7",
    },
  }
}

export function StepOneModal(_props: {
  openModal: boolean
  closeModal: any
  closeModalOnOverlayClick: boolean
  closeIconVisibility: boolean
  action: string
  _handleChange: React.ChangeEventHandler<HTMLInputElement>
  modalControl: ModalControl
  assetTypes: { value: string; label: string }[]
  _submitModal: () => void
  disableAssetSelection: boolean
  arrayLength: any
  showPreviousModal: any
}) {
  const factoryElements = assetData[_props.modalControl?.category]?.[0]
  const conditionalElements = factoryElements
    ? factoryElements.map((Asset, index) => {
        if (Asset.name == "Currency") {
          return null
        }
        if (Asset.name == "Balance" || Asset.name == "Acquisition cost") {
          return (
            <CurrencyField
              key={index}
              name={Asset.name}
              placeholder={Asset.placeholder}
              containerStyles="mx-7 mb-4"
              _handleChange={_props._handleChange}
              value={
                _props.modalControl?.[Asset?.name]
                  ? _props.modalControl?.[`${Asset?.name}`]
                  : ""
              }
              currency={
                _props.modalControl?.["Currency"]
                  ? _props.modalControl?.["Currency"]
                  : ""
              }
            />
          )
        } else if (Asset.type === "Text") {
          return generateTextInputFieldProps(
            Asset.name,
            Asset.placeholder,
            _props.modalControl?.[Asset?.name]
              ? _props.modalControl?.[`${Asset?.name}`]
              : "",
            _props._handleChange,
          )
        } else if (Asset.type === "Select") {
          return generateSelectFieldProps(
            Asset.value,
            Asset.placeholder,
            _props.modalControl?.[Asset?.name]
              ? {
                  value: _props.modalControl?.[`${Asset?.name}`],
                  label: _props.modalControl?.[`${Asset?.name}`],
                }
              : "",
            Asset.name,
            Asset.isMulti || false,
            _props._handleChange,
          )
        }
        return null // Return null for other types or handle as needed
      })
    : []

  return (
    <Modal
      openModal={_props.openModal}
      closeModal={_props.closeModal}
      closeModalOnOverlayClick={_props.closeModalOnOverlayClick}
      modalTitle={_props.action == "create" ? "Create Assets" : "Edit Assets"}
      closeIconVisibility={_props.closeIconVisibility}
      arrayLength={_props.arrayLength}
      showPreviousModal={_props.showPreviousModal}
      elements={[
        {
          type: "iconView",
          props: {
            image: _props.action == stepOne,
            imageStyles: "mx-auto",
            imageContainerStyles: "my-7",
          },
        },
        {
          type: "selectView",
          props: {
            dataCy: "asset-types-list",
            data: _props.assetTypes,
            value: _props.modalControl.category
              ? {
                  value: _props.modalControl.category,
                  label: _props.modalControl.category,
                }
              : "",
            selectProps: {
              placeholder: "Select Asset Type",
              isDisabled: _props.disableAssetSelection,
            },
            setSelectedValue: (value: any) => {
              const customEvent = {
                target: {
                  name: "category",
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
            selectFieldStyles: selectFieldStyles,
            rightIconStyles: selectFieldRightIconStyles,
          },
        },
        ...conditionalElements,
        {
          type: "buttonView",
          props: {
            dataCy: "submit-asset-modal-one-button",
            title: _props.action == "create" ? "Next" : "Save & Next",
            onclick: _props._submitModal,
            buttonStyle: "",
            buttonContainer: "mx-48 mb-10 mt-10",
          },
        },
      ]}
    />
  )
}

export function StepTwoModal(_props: {
  openModal: boolean
  closeModal: any
  closeModalOnOverlayClick: boolean
  closeIconVisibility: boolean
  action: string
  _handleChange: React.ChangeEventHandler<HTMLInputElement>
  modalControl: ModalControl
  _submitModal: () => void
  assetFile: any
  setAssetFile: React.Dispatch<React.SetStateAction<string>>
  arrayLength: any
  showPreviousModal: any
}) {
  const factoryElements = assetData[_props.modalControl?.category]?.[1]
  const beneficiary = useAppSelector((state) => state.beneficiary)

  const conditionalElements = factoryElements
    ? factoryElements.map((Asset) => {
        if (Asset.type === "Text") {
          return generateTextInputFieldProps(
            Asset.name,
            Asset.placeholder,
            _props.modalControl?.[Asset?.name]
              ? _props.modalControl?.[`${Asset?.name}`]
              : "",
            _props._handleChange,
          )
        } else if (Asset.type === "Select") {
          if (Asset.name == "Beneficiary") {
            return generateMultiSelectFieldProps(
              beneficiary.beneficiary_list, //send beneficiary list here
              Asset.placeholder,
              _props.modalControl?.[Asset?.name],
              Asset.name,
              Asset.isMulti || false,
              _props._handleChange,
            )
          } else {
            return generateSelectFieldProps(
              Asset.value,
              Asset.placeholder,
              _props.modalControl?.[Asset?.name]
                ? {
                    value: _props.modalControl?.[`${Asset?.name}`],
                    label: _props.modalControl?.[`${Asset?.name}`],
                  }
                : "",
              Asset.name,
              Asset.isMulti || false,
              _props._handleChange,
            )
          }
        } else if (Asset.type === "textView") {
          return generateTextView(Asset.name)
        }
        return null // Return null for other types or handle as needed
      })
    : []

  const handleFileInputChange = (event: any) => {
    const maxSize = 10
    const file = event.target.files[0]
    if (file) {
      const fileSizeInMB = file.size / (1024 * 1024)
      if (fileSizeInMB > maxSize) {
        toast(`File too large. Maximum allowed size is ${maxSize} MB.`, "error")
      } else {
        _props.setAssetFile(file)
        _props.modalControl.fileSize = fileSizeInMB
      }
    }
  }

  return (
    <Modal
      openModal={_props.openModal}
      closeModal={_props.closeModal}
      closeModalOnOverlayClick={_props.closeModalOnOverlayClick}
      modalTitle={_props.action == "create" ? "Create Assets" : "Edit Assets"}
      closeIconVisibility={_props.closeIconVisibility}
      arrayLength={_props.arrayLength}
      showPreviousModal={_props.showPreviousModal}
      elements={[
        {
          type: "iconView",
          props: {
            image: stepTwo,
            imageStyles: "mx-auto",
            imageContainerStyles: "my-7",
          },
        },
        ...conditionalElements,
        {
          type: "customView",
          props: {
            customViewContainer: "mx-7",
            CustomView: () => {
              return (
                <div className="relative">
                  <input
                    data-cy="asset-file-input"
                    type="file"
                    accept="image/*"
                    name="asset_file"
                    onChange={handleFileInputChange}
                    className="opacity-0 absolute top-0 right-0 h-20 w-20"
                    multiple={false}
                  />
                  <div className="flex items-center justify-between gap-2 mb-8">
                    <div className="flex flex-col">
                      <span className="text-safe-text-gray-shade font-medium text-sm">
                        File size should be less than 10MBs
                      </span>
                      <span className="text-gray text-safe-text-gray-shade text-sm">
                        png/jpg/webp/jpeg
                      </span>
                    </div>
                    <p>{_props.assetFile?.name || _props.assetFile}</p>
                    <img
                      src={uploadVideoIcon}
                      alt="Asset files"
                      className="w-20 h-20"
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
            dataCy: "submit-asset-modal-two-button",
            title: "Confirm",
            onclick: _props._submitModal,
            buttonStyle: "",
            buttonContainer: "mx-48 mb-10",
          },
        },
      ]}
    />
  )
}

export function SuccessModal(_props: {
  openModal: boolean
  closeModal: any
  closeModalOnOverlayClick: boolean
  closeIconVisibility: boolean
  registerAnotherAsset: React.MouseEventHandler<HTMLButtonElement>
  submitModal: React.MouseEventHandler<HTMLButtonElement>
}) {
  return (
    <Modal
      openModal={_props.openModal}
      closeModal={_props.closeModal}
      closeModalOnOverlayClick={_props.closeModalOnOverlayClick}
      modalTitle={"Asset Registered"}
      closeIconVisibility={_props.closeIconVisibility}
      elements={[
        {
          type: "iconView",
          props: {
            image: stepTwo,
            imageStyles: "mx-auto",
            imageContainerStyles: "mt-7 mb-24",
          },
        },
        {
          type: "textView",
          props: {
            text: "You successfully registered a new asset!",
            textStyles:
              "text-[#082A44] text-2xl font-bold text-center mb-32 px-12",
          },
        },
        {
          type: "customView",
          props: {
            customViewContainer: "",
            CustomView: () => {
              return (
                <div className="flex gap-10 items-end mx-8 mb-10 ">
                  <div className="flex flex-col gap-8 ">
                    <p className="w-[194px] text-center text-[#4F4F4F] leading-tight">
                      Click here if you want to register another Asset.
                    </p>
                    <button
                      data-cy="register-another-asset--button"
                      onClick={_props.registerAnotherAsset}
                      disabled={!_props.closeIconVisibility}
                      className="bg-[#0971AA] font-bold text-white px-8 py-1 w-[225px] rounded-2xl"
                    >
                      Register another Asset
                    </button>
                  </div>
                  <div className="flex flex-col gap-8 ">
                    <p className="w-[194px] text-center text-[#4F4F4F] leading-tight">
                      Click here if you are done registering assets.
                    </p>
                    <button
                      data-cy="done-button-of-created-asset-modal"
                      onClick={_props.submitModal}
                      className="bg-[#0971AA] font-bold text-white px-4 py-4 w-[225px] rounded-2xl"
                    >
                      Done
                    </button>
                  </div>
                </div>
              )
            },
          },
        },
      ]}
    />
  )
}

export function AssetDetail(_props: {
  openModal: boolean
  closeModal: any
  closeModalOnOverlayClick: boolean
  closeIconVisibility: boolean
  action: string
  modalControl: ModalControl
  // delete: Function
  // edit: Function
  assetId: string
  arrayLength: any
  showPreviousModal: any
  role: string
  userName: string
}) {
  const headings = Object.keys(_props.modalControl)
  const values = Object.values(_props.modalControl)
  return (
    <Modal
      openModal={_props.openModal}
      closeModal={_props.closeModal}
      closeModalOnOverlayClick={_props.closeModalOnOverlayClick}
      modalTitle={
        _props.action == "create"
          ? "Create Assets"
          : _props.action == "view"
          ? "View Asset"
          : "Edit Asset"
      }
      closeIconVisibility={_props.closeIconVisibility}
      arrayLength={_props.arrayLength}
      showPreviousModal={_props.showPreviousModal}
      elements={[
        {
          type: "customView",
          props: {
            customViewContainer: "",
            CustomView: () => {
              return (
                <section>
                  <div className="pt-6">
                    {headings.map((heading, index) => {
                      return (
                        <div
                          key={index}
                          className="flex gap-6 items-center pb-6"
                        >
                          {heading == "Beneficiary" ? (
                            <></>
                          ) : (
                            <>
                              <h2 className="text-[#292929] font-sm font-medium basis-2/5 text-right">
                                {heading}
                              </h2>
                              <p className="text-[#585858] basis-3/5">
                                {values[index]}
                              </p>
                            </>
                          )}
                        </div>
                      )
                    })}
                  </div>
                  {/* {
                    _props.role != "beneficiary" ?
                    <div className="flex justify-end gap-2 w-full py-4 px-5 border-t-2 border-[#F0F0F0]">
                      <button
                        onClick={() => {
                          _props.edit(_props.assetId)
                        }}
                        className="primary-btn rounded-lg font-sm font-medium text-[#414141] bg-white border-[1px] shadow-none border-[#DBDBDB]"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          _props.delete(_props.assetId)
                        }}
                        className="primary-btn rounded-lg font-sm font-medium"
                      >
                        Delete
                      </button>
                    </div>
                    : <></>
                  } */}
                </section>
              )
            },
          },
        },
      ]}
    />
  )
}
export function AssetBeneficiaries(_props: {
  openModal: boolean
  closeModal: any
  closeModalOnOverlayClick: boolean
  closeIconVisibility: boolean
  modalControl: ModalControl
  assetId: string
}) {
  return (
    <Modal
      openModal={_props.openModal}
      closeModal={_props.closeModal}
      closeModalOnOverlayClick={_props.closeModalOnOverlayClick}
      modalTitle={"Beneficiaries"}
      closeIconVisibility={_props.closeIconVisibility}
      modalCustomStyles={"min-w-[700px] w-auto"}
      elements={[
        {
          type: "customView",
          props: {
            customViewContainer: "max-h-[500px] overflow-auto",
            CustomView: () => {
              return (
                <table className="rounded-xl w-full overflow-auto">
                  <thead className="bg-[#F2F2F2]">
                    <tr className="flex justify-between px-5 py-3 rounded-t-lg">
                      <th className="font-medium text-sm uppercase min-w-[160px] text-left">
                        Name
                      </th>
                      <th className="font-medium text-sm uppercase min-w-[300px] text-left">
                        Email
                      </th>
                      <th className="font-medium text-sm uppercase text-left min-w-[160px]">
                        Phone
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {_props.modalControl.map(
                      (beneficiary: any, index: number) => (
                        <Beneficiary
                          img={beneficiary.profile_image}
                          name={beneficiary.name}
                          email={beneficiary.primary_email}
                          number={beneficiary.phone_number}
                          key={index}
                        />
                      ),
                    )}
                  </tbody>
                </table>
              )
            },
          },
        },
      ]}
    />
  )
}

function Beneficiary(_props: {
  img: string
  name: string
  email: string
  number: string
}) {
  const [image, setImage] = useState<string>(_props.img)

  useEffect(() => {
    getFileFromFirebase(_props.img)
      .then((res) => {
        setImage(res)
      })
      .catch(() => {
        setImage(userImg)
      })
  }, [])

  return (
    <>
      <tr className="flex justify-between items-center px-5 py-3">
        <td className="text-[#292929] font-sm min-w-[160px] px-1 flex gap-2 items-center">
          <img src={image} alt="beneficiary image" className="w-10" />
          {_props.name.slice(0, 20)}
        </td>
        <td className="text-[#292929] font-sm min-w-[300px] text-left px-1">
          {_props.email}
        </td>
        <td className="text-[#292929] font-sm min-w-[160px] text-left px-1">
          {_props.number}
        </td>
      </tr>
    </>
  )
}
export function BeneficiaryWarning(_props: {
  openModal: boolean
  closeModal: () => void
  closeModalOnOverlayClick: boolean
  closeIconVisibility: boolean
  _submitModal: () => void
}) {
  return (
    <Modal
      openModal={_props.openModal}
      closeModal={_props.closeModal}
      closeModalOnOverlayClick={_props.closeModalOnOverlayClick}
      modalTitle={"Register beneficiary"}
      closeIconVisibility={_props.closeIconVisibility}
      elements={[
        {
          type: "textView",
          props: {
            text: "Oops! It looks like you haven't registered any beneficiaries yet.",
            textStyles:
              "text-[#00192B] text-xl font-bold mb-4 mt-14 px-7 text-center mx-auto w-fit",
          },
        },
        {
          type: "textView",
          props: {
            text: "SafeHerit requires at least one registered beneficiary to assign to your assets. Please add your beneficiaries first to continue with asset registration.",
            textStyles: "text-[#868686] leading-7 px-7 mb-12 text-center ",
          },
        },
        {
          type: "buttonView",
          props: {
            dataCy: "register-beneficiary-button",
            title: "Register Beneficiary",
            onclick: _props._submitModal,
            buttonStyle:
              "bg-[#0971AA] font-bold text-white mx-auto px-8 py-3 rounded-2xl block",
            buttonContainer: " mb-10 ",
          },
        },
      ]}
    />
  )
}
