import React from "react"
import dollar from "@images/dollar.svg"
import realEstate from "@images/real-estate.svg"
import bank from "@images/bank.svg"
import eye from "@images/eye.svg"
import edit from "@images/edit.svg"
import deleteIcon from "@images/delete.svg"
import arrowDown from "@images/arrow-down.svg"
import AddAssetImg from "@images/beneficiaryScreen.svg"
import user from "@images/UserIcon.png"
import addIcon from "@images/add-icon.svg"

import styles from "../../Dashboard.module.css"

import { useEffect, useCallback, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import {
  StepZeroInformationModal,
  SuccessModal,
  StepOneModal,
  StepTwoModal,
  AssetDetail,
} from "./modal_assets"
import { ASSET_TYPES, ROUTE_CONSTANTS, useArray } from "@/common"

import {
  findAsset,
  getAllAsset,
  deleteAsset,
  updateAsset,
  createAsset,
  getAllBeneficiary,
  getAllBeneficiaryAsset,
  findBeneficiaryAsset,
} from "@redux/actions"
import { useAppDispatch, useAppSelector } from "@redux/hooks"
import { DropDownButton, ConfirmationModal, Spinner, toast } from "@/components"
import { getRequiredFields } from "./data"
import { AxiosResponse } from "axios"
import { setLoaderVisibility } from "@/redux/reducers/LoaderSlice"
import { SelectOption, Asset, Beneficiary } from "@/types"

interface ModalControl {
  [key: string]: any // This index signature allows string keys with any value
}

const initialState: ModalControl = {}

export default function AssetsView() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const asset = useAppSelector((state) => state.asset)
  const user = useAppSelector((state) => state.user)
  const beneficiary = useAppSelector((state) => state.beneficiary)
  const startLoader = () => dispatch<any>(setLoaderVisibility(true))
  const stopLoader = () => dispatch<any>(setLoaderVisibility(false))

  const [hasAssets, setHasAssets] = useState(-1)
  const [modalControl, setModalControl] = useState(initialState)
  const [modalVisibility, setModalVisibility] = useState("none")
  const isEditingAsset = useRef(false)
  const [modalAction, setModalAction] = useState("")
  const [selected, setSelected] = useState("")
  const [selectedAsset, setSelectedAsset] = useState("")
  const [assetFile, setAssetFile] = useState("")
  const [
    modalHistory,
    modalHistoryLength,
    modalHistoryPop,
    modalHistoryPush,
    modalHistoryPopAll,
  ] = useArray()
  useEffect(() => {
    // reset values incase of creating an asset
    if (!isEditingAsset.current) {
      setModalControl({ category: modalControl.category })
    }
  }, [modalControl.category])

  useEffect(() => {
    //Get Beneficiaries
    if (user.role == "owner") {
      dispatch<any>(getAllBeneficiary({}))
        .unwrap()
        .catch(() => {
          // TODO: show fallback page
        })
        .finally(() => {
          dispatch<any>(getAllAsset({}))
            .unwrap()
            .then((res: any) => {
              updateAssetArrayCount(res)
            })
            .catch(() => {
              // TODO: show fallback page
            })
        })
    } else if (user.role == "beneficiary") {
      dispatch<any>(getAllBeneficiaryAsset({}))
        .unwrap()
        .then((res: any) => {
          updateAssetArrayCount(res)
        })
        .catch()
    }
  }, [])

  useEffect(() => {
    modalHistoryPopAll()
  }, [])

  const closeModal = useCallback(() => {
    // close modal
    setModalControl(initialState)
    setModalVisibility("none")
    setAssetFile("")
    setSelectedAsset("")
    isEditingAsset.current = false
    modalHistoryPopAll()
  }, [])

  const showPreviousModal = () => {
    const lastEl = modalHistory[modalHistoryLength - 1] || "none"
    modalHistoryPop()
    setModalVisibility(lastEl)
  }
  const assetCatagories = [
    "All",
    "Bank",
    "Stock",
    "Real Estate",
    "Life Insurance",
    "Cryptocurrency",
  ]
  const assetTypes = [
    { value: ASSET_TYPES.BANK_ACCOUNT, label: ASSET_TYPES.BANK_ACCOUNT },
    { value: ASSET_TYPES.LIFE_INSURANCE, label: ASSET_TYPES.LIFE_INSURANCE },
    { value: ASSET_TYPES.REAL_ESTATE, label: ASSET_TYPES.REAL_ESTATE },
    {
      value: ASSET_TYPES.RETIREMENT_ACCOUNT,
      label: ASSET_TYPES.RETIREMENT_ACCOUNT,
    },
    { value: ASSET_TYPES.STOCKS, label: ASSET_TYPES.STOCKS },
    { value: ASSET_TYPES.BONDS, label: ASSET_TYPES.BONDS },
    { value: ASSET_TYPES.COMPANY_SHARES, label: ASSET_TYPES.COMPANY_SHARES },
    {
      value: ASSET_TYPES.INVESTMENT_FUNDS,
      label: ASSET_TYPES.INVESTMENT_FUNDS,
    },
    {
      value: ASSET_TYPES.BROKERAGE_ACCOUNT,
      label: ASSET_TYPES.BROKERAGE_ACCOUNT,
    },
    {
      value: ASSET_TYPES.CRYPTOCURRENCY_SELF_CUSTODY,
      label: ASSET_TYPES.CRYPTOCURRENCY_SELF_CUSTODY,
    },
    {
      value: ASSET_TYPES.CRYPTOCURRENCY_ONLINE_EXCHANGE,
      label: ASSET_TYPES.CRYPTOCURRENCY_ONLINE_EXCHANGE,
    },
    { value: ASSET_TYPES.SAFETY_BOX, label: ASSET_TYPES.SAFETY_BOX },
    { value: ASSET_TYPES.PHYSICAL_GOODS, label: ASSET_TYPES.PHYSICAL_GOODS },
    {
      value: ASSET_TYPES.ACCOUNT_PASSWORDS,
      label: ASSET_TYPES.ACCOUNT_PASSWORDS,
    },
    { value: ASSET_TYPES.OTHERS_CUSTOM, label: ASSET_TYPES.OTHERS_CUSTOM },
  ]
  const AssetDetailsCardArr = [
    {
      img: dollar,
      title: "USD 126,000",
      subTitle: "Total Balance",
      element: (
        <DropDownButton
          className="flex gap-2"
          title="All"
          titleClassName="font-semibold cursor-pointer"
          arrowIcon={arrowDown}
          options={[
            "All",
            "Bank",
            "Stock",
            "Real Estate",
            "Life Insurance",
            "Cryptocurrency",
          ]}
        />
      ),
    },
    {
      img: bank,
      title: asset.Asset_array.length,
      subTitle: "Assets registered",
      element: (
        <img
          src={user.role == "owner" ? addIcon : ""}
          className="cy-add-asset-button cursor-pointer"
          id="cy-add-asset-button"
          onClick={() => {
            newAsset()
          }}
        />
      ),
    },
  ]

  const updateAssetArrayCount = (res: AxiosResponse<any, any>) => {
    if (
      (res.data.data && res.data.data.length > 0) ||
      user.role == "beneficiary"
    ) {
      setHasAssets(1)
    } else if (res.data.data && res.data.data.length == 0) {
      setHasAssets(0)
    }
  }
  const validateRequiredFields = (
    modalControl: ModalControl,
    modal: number,
  ) => {
    let isValid = true
    const [requiredFields] = getRequiredFields(modalControl.category, modal)
    const enteredFields = Object.keys(modalControl)
    requiredFields.forEach((field: string) => {
      if (!enteredFields.includes(field)) {
        isValid = false
        toast(`Please enter ${field}`, "error")
      }
    })
    return isValid
  }

  const _submitStepZeroInformationModal = () => {
    newAsset()
  }
  const _submitStepOneModal = () => {
    // TODO validate fields
    if (!modalControl.category) {
      toast(`Please select an Asset category`, "error")
    } else {
      if (validateRequiredFields(modalControl, 0)) {
        modalHistoryPush("Step-1")
        setModalVisibility("Step-2")
      }
    }
  }
  const _submitStepTwoModal = () => {
    // TODO validate fields
    const beneficiaryIds = modalControl?.Beneficiary?.map(
      (value: SelectOption) => {
        return value?.value
      },
    )

    const Data: {
      id?: string
      category: string
      assignedBeneficiaryIds: string[]
      data: string
      asset_file: any
      beneficirayPublicKeys: any
    } = {
      category: modalControl.category,
      assignedBeneficiaryIds: beneficiaryIds,
      data: JSON.stringify(modalControl),
      asset_file: assetFile,
      beneficirayPublicKeys: beneficiary.beneficiary_mapper,
    }
    if (validateRequiredFields(modalControl, 1)) {
      startLoader()
      if (modalAction == "edit") {
        toast("Updating Asset", "info")
        Data.id = selectedAsset
        dispatch<any>(updateAsset(Data))
          .unwrap()
          .then(() => {
            dispatch<any>(getAllAsset({}))
              .unwrap()
              .then((res: any) => {
                updateAssetArrayCount(res)
                closeModal()
              })
          })
          .catch()
          .finally(() => {
            stopLoader()
          })
      } else if (modalAction == "create") {
        toast("Creating Asset", "info")
        dispatch<any>(createAsset(Data))
          .unwrap()
          .then(() => {
            dispatch<any>(getAllAsset({}))
              .unwrap()
              .then((res: any) => {
                updateAssetArrayCount(res)
                modalHistoryPush("Step-2")
                setModalVisibility("Step-Success")
              })
          })
          .catch()
          .finally(() => {
            stopLoader()
          })
      }
    }
  }
  const _submitSuccessModal = () => {
    // goto Dashboard
    setModalVisibility("none")
    navigate(ROUTE_CONSTANTS.DASHBOARD)
  }
  const _submitDeleteModal = () => {
    dispatch<any>(deleteAsset({ id: selectedAsset }))
      .unwrap()
      .then(() => {
        dispatch<any>(getAllAsset({}))
          .unwrap()
          .then((res: any) => {
            updateAssetArrayCount(res)
            closeModal()
          })
          .catch(() => {
            // TODO: show fallback page
          })
      })
  }

  const _handleChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target
    setModalControl({ ...modalControl, [name]: value })
  }
  const newAsset = () => {
    setModalAction("create")
    setModalControl(initialState)
    modalHistoryPush("Step-0")
    setModalVisibility("Step-1")
  }
  const addAsset = () => {
    setModalVisibility("Step-0")
  }
  const editAsset = (assetId: string) => {
    dispatch<any>(findAsset({ id: assetId }))
      .unwrap()
      .then((res: any) => {
        isEditingAsset.current = true
        setSelectedAsset(assetId)
        setModalControl(JSON.parse(res.data.data.data))
        setAssetFile(res.data.data.asset_file)
        setModalAction("edit")
        setModalVisibility("Step-1")
      })
  }
  const destroyAsset = (assetId: string) => {
    setSelectedAsset(assetId)
    setModalAction("delete")
    setModalVisibility("Step-delete")
  }
  const viewAsset = (assetId: string) => {
    if (user.role == "owner") {
      dispatch<any>(findAsset({ id: assetId }))
        .unwrap()
        .then((res: { data: { data: { data: string } } }) => {
          isEditingAsset.current = true //TODO look into this why is this here
          setSelectedAsset(assetId)
          setModalControl(JSON.parse(res.data.data.data))
          setModalAction("view")
          setModalVisibility("Asset-Info")
        })
    } else if (user.role == "beneficiary") {
      const owner_email = user.selectedRoleUser?.ownerEmail
      const beneficiary_id = user.selectedRoleUser?.beneficiaryId
      dispatch<any>(
        findBeneficiaryAsset({
          id: assetId,
          owner_email: owner_email,
          beneficiary_id: beneficiary_id,
        }),
      )
        .unwrap()
        .then((res: { data: { data: { data: string } } }) => {
          isEditingAsset.current = true //TODO look into this why is this here
          setSelectedAsset(assetId)
          setModalControl(JSON.parse(res.data.data.data))
          setModalAction("view")
          setModalVisibility("Asset-Info")
        })
    }
  }

  return (
    <>
      <StepZeroInformationModal
        openModal={modalVisibility == "Step-0"}
        closeModal={closeModal}
        closeModalOnOverlayClick={false}
        closeIconVisibility={true}
        _submitModal={_submitStepZeroInformationModal}
        action={"string"}
      />
      <StepOneModal
        openModal={modalVisibility == "Step-1"}
        closeModal={closeModal}
        closeModalOnOverlayClick={false}
        closeIconVisibility={true}
        action={modalAction}
        _handleChange={_handleChange}
        modalControl={modalControl}
        assetTypes={assetTypes}
        _submitModal={_submitStepOneModal}
        disableAssetSelection={isEditingAsset.current}
        arrayLength={modalHistoryLength}
        showPreviousModal={showPreviousModal}
      />
      <StepTwoModal
        openModal={modalVisibility == "Step-2"}
        closeModal={closeModal}
        closeModalOnOverlayClick={false}
        closeIconVisibility={true}
        action={modalAction}
        _handleChange={_handleChange}
        modalControl={modalControl}
        _submitModal={_submitStepTwoModal}
        setAssetFile={setAssetFile}
        assetFile={assetFile}
        arrayLength={modalHistoryLength}
        showPreviousModal={showPreviousModal}
      />
      <SuccessModal
        openModal={modalVisibility == "Step-Success"}
        closeModal={closeModal}
        closeModalOnOverlayClick={false}
        closeIconVisibility={true}
        registerAnotherAsset={newAsset}
        gotoDashboard={_submitSuccessModal}
      />
      <ConfirmationModal
        openModal={modalVisibility == "Step-delete"}
        closeModalOnOverlayClick={false}
        closeModal={closeModal}
        _submitModal={_submitDeleteModal}
        heading="Are you sure you want to delete this asset?"
        body="This action cannot be undone."
      />
      <AssetDetail
        openModal={modalVisibility == "Asset-Info"}
        closeModal={closeModal}
        closeModalOnOverlayClick={false}
        closeIconVisibility={true}
        action={modalAction}
        modalControl={modalControl}
        // delete={destroyAsset}
        // edit={editAsset}
        assetId={selectedAsset}
        arrayLength={modalHistoryLength}
        showPreviousModal={showPreviousModal}
        role={user.role}
        userName={user.displayName}
      />
      {hasAssets > 0 ? (
        <Assets
          AssetDetailsCardArr={AssetDetailsCardArr}
          assetCatagories={assetCatagories}
          selected={selected}
          setSelected={setSelected}
          assetDetailsArr={asset.Asset_array}
          destroyAsset={destroyAsset}
          editAsset={editAsset}
          viewAsset={viewAsset}
          userRole={user.role}
        />
      ) : hasAssets == 0 ? (
        <AddAsset openStepZeroModal={addAsset} />
      ) : (
        <div className={styles.AppView}>
          <div className="relative h-[80vh]">
            <Spinner />
          </div>
        </div>
      )}
    </>
  )
}

function AddAsset(_props: {
  openStepZeroModal: React.MouseEventHandler<HTMLButtonElement>
}) {
  return (
    <div className="h-[calc(100vh-83px)] p-7">
      <main className="flex flex-col items-center justify-center shadow-xl h-full rounded-2xl">
        <img src={AddAssetImg} className="mb-10" alt="validator screen image" />
        <h2 className="text-[#00192B] text-xl font-bold mb-2">No Assets</h2>
        <p className="text-[#868686] mb-10">
          There are no assets on your board. Please create assets.
        </p>
        <button
          onClick={_props.openStepZeroModal}
          className="primary-btn rounded-2xl py-3 px-9 bg-[#0971AA]"
        >
          Create Assets
        </button>
      </main>
    </div>
  )
}

function Assets(_props: {
  AssetDetailsCardArr: {
    img: string
    title: string | number
    subTitle: string
    element: any
  }[]
  assetCatagories: string[]
  selected: string
  setSelected: React.Dispatch<React.SetStateAction<string>>
  assetDetailsArr: Asset[]
  destroyAsset: (assetId: string) => void
  editAsset: (assetId: string) => void
  viewAsset: (assetId: string) => void
  userRole: string
}) {
  return (
    <div className={styles.AppView}>
      <section className="px-7 pt-4 mx-auto">
        <section className="flex items-center gap-4 mb-8">
          {_props.AssetDetailsCardArr.map((data, index) => {
            return (
              <AssetDetailsCard
                key={index}
                img={data.img}
                title={data.title}
                subtitle={data.subTitle}
                element={data.element}
              />
            )
          })}
        </section>
        <section className="">
          <div className="flex items-center gap-11 mb-2 pl-6">
            <div className="relative">
              <input type="checkbox" id="checkbox" />
              <label htmlFor="checkbox" className="checkbox-label h-5 w-5">
                <div className="check_mark"></div>
              </label>
            </div>
            {_props.assetCatagories.map((category, index) => (
              <AssetCategory
                key={index}
                category={category}
                selected={_props.selected}
                setSelected={_props.setSelected}
                // onClick={() => {}}
              />
            ))}
          </div>
          <section className="rounded-xl h-[650px] shadow-lg mb-5 overflow-auto scrollbar w-[1080px]">
            <div className="bg-[#F2F2F2] flex justify-between gap-24 px-5 py-3 rounded-t-lg">
              <div className="flex flex-grow justify-between">
                <p className="font-medium text-sm uppercase">Asset</p>
                <p className="font-medium text-sm uppercase">Value</p>
              </div>
              <div className="flex flex-grow justify-between">
                {_props.userRole != "beneficiary" ? (
                  <p className="font-medium text-sm uppercase ">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Beneficiary
                  </p>
                ) : (
                  <></>
                )}
                <p className="font-medium text-sm uppercase">Action</p>
              </div>
            </div>
            {_props.assetDetailsArr.map((asset: Asset, index) => {
              return (
                <AssetDetails
                  key={index}
                  assetId={asset?.id || ""}
                  assetName={asset?.category || ""}
                  assetValue={asset?.data?.value || "No value found"}
                  beneficiaries={asset?.beneficiaries}
                  destroyAsset={_props.destroyAsset}
                  editAsset={_props.editAsset}
                  viewAsset={_props.viewAsset}
                  userRole={_props.userRole}
                />
              )
            })}
          </section>
        </section>
      </section>
    </div>
  )
}

function AssetDetailsCard(_props: {
  img: any
  title: string | number
  subtitle: string
  element: any
}) {
  return (
    <div className="shadow-md flex-grow rounded-xl px-4 py-3 flex justify-between items-center max-w-[535px]">
      <div className="flex items-center gap-4 ">
        <div className="w-[60px] h-[60px] bg-[#E7F4F9] flex items-center justify-center rounded-xl">
          <img src={_props.img} alt="dollar icon" className="" />
        </div>
        <div>
          <h3 className="text-black font-semibold">{_props.title}</h3>
          <p className="text-[#828282] text-xs">{_props.subtitle}</p>
        </div>
      </div>
      <div className="cursor-pointer">{_props.element}</div>
    </div>
  )
}

function AssetCategory(_props: {
  category: string
  // onClick: any
  selected: any
  setSelected: any
}) {
  return (
    <a
      onClick={() => {
        _props.setSelected(_props.category)
      }}
      className={
        _props.selected === _props.category
          ? "text-[#74777E] text-sm font-medium cursor-pointer px-3 selected-category"
          : "text-[#74777E] text-sm font-medium cursor-pointer px-3 border-b-2 border-white"
      }
    >
      {_props.category}
    </a>
  )
}

function AssetDetails(_props: {
  key: number
  assetId: string
  assetName: string
  assetValue: string
  beneficiaries: Beneficiary[]
  destroyAsset: (assetId: string) => void
  editAsset: (assetId: string) => void
  viewAsset: (assetId: string) => void
  userRole: string
}) {
  return (
    <div className="flex justify-between gap-24 px-5 py-3">
      <div className="flex justify-between items-center w-[268px] flex-grow">
        <div className="flex gap-4 items-center">
          <img src={realEstate} alt="real estate icon" />
          <p className="text-[#00192B] text-sm font-semibold">
            {_props.assetName}
          </p>
        </div>
        <p className="text-[#00192B] text-sm font-semibold">
          USD <span>{_props.assetValue}</span>
        </p>
      </div>
      <div className="flex justify-between items-center flex-grow w-[278px]">
        {_props.userRole != "beneficiary" ? (
          <div className="flex justify-between items-center gap-3">
            <img src={user} alt="beneficiary image" className="h-11 w-11" />
            <button>View</button>
            {/* TODO ADD Beneficiray listing modal */}
          </div>
        ) : (
          <></>
        )}
        <div className="flex gap-1 ">
          <img
            src={eye}
            alt="view icon"
            className="cy-view-asset-btn cursor-pointer"
            id="cy-view-asset-btn"
            onClick={() => {
              _props.viewAsset(_props.assetId)
            }}
          />
          {_props.userRole == "owner" && (
            <>
              <img
                src={edit}
                alt="edit icon"
                className="cy-edit-asset-btn cursor-pointer"
                id="cy-edit-asset-btn"
                onClick={() => {
                  _props.editAsset(_props.assetId)
                }}
              />
              <img
                src={deleteIcon}
                alt="delete icon"
                className="cy-del-asset-btn cursor-pointer"
                id="cy-del-asset-btn"
                onClick={() => {
                  _props.destroyAsset(_props.assetId)
                }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
