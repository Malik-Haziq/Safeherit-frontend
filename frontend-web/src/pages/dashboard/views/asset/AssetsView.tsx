import styles from "../../Dashboard.module.css"
import dollar from "../../../../../assets/images/dollar.svg"
import realEstate from "../../../../../assets/images/real-estate.svg"
import stock from "../../../../../assets/images/stock.svg"
import bank from "../../../../../assets/images/bank.svg"
import eye from "../../../../../assets/images/eye.svg"
import edit from "../../../../../assets/images/edit.svg"
import deleteIcon from "../../../../../assets/images/delete.svg"
import arrowDown from "../../../../../assets/images/arrow-down.svg"
import AddAssetImg from "../../../../../assets/images/beneficiaryScreen.svg"
import user from "../../../../../assets/images/UserIcon.png"
import { MouseEvent, useCallback, useState } from "react"
import {
  StepZeroInformationModal,
  SuccessModal,
  StepOneModal,
  StepTwoModal,
} from "./modal_assets"
import { DropDownButton } from "../../../../components/dropDownButton"
import { ConfirmationModal } from "../../../../components/modal/ConfirmationModal"

function AddAsset(_props: {
  // openStepZeroModal: React.MouseEventHandler<HTMLButtonElement>
}) {
  return (
    <div className="h-[calc(100vh-83px)] p-7">
      <main className="flex flex-col items-center justify-center shadow-xl h-full rounded-2xl">
        <img src={AddAssetImg} className="mb-10" alt="validator screen image" />
        <h2 className="text-[#00192B] text-xl font-bold mb-2">No Assets</h2>
        <p className="text-[#868686] mb-10">
          There is no any assets in your Board please create assets.
        </p>
        <button
          onClick={() => {}}
          className="primary-btn rounded-2xl py-3 px-9 bg-[#0971AA]"
        >
          Create Assets
        </button>
      </main>
    </div>
  )
}

export default function AssetsView() {
  const initialState = {
    bankAccount: "",
    label: "",
    bankName: "",
    country: "",
    accountNumber: "",
    currency: "",
    balance: "",
    dabitCardPin: "",
  }

  const initialStateOfBankingCredentials = {
    website: "",
    login: "",
    password: "",
    otp: "",
    beneficiary: "",
    notes: "",
  }

  const assetDetailsArr = [
    {
      img: "../../../../../assets/images/real-estate.svg",
      name: "Commercial real estate",
      value: "42,000",
      beneficiaryImg: "../../../../../assets/images/real-estate.svg",
      beneficiaryName: "John Docker",
    },
    {
      img: "../../../../../assets/images/real-estate.svg",
      name: "real estate",
      value: "39,000",
      beneficiaryImg: "../../../../../assets/images/real-estate.svg",
      beneficiaryName: "Jane Cooper",
    },
    {
      img: "../../../../../assets/images/real-estate.svg",
      name: "Mobile",
      value: "67,000",
      beneficiaryImg: "../../../../../assets/images/real-estate.svg",
      beneficiaryName: "Thomas Shelby",
    },
    {
      img: "../../../../../assets/images/real-estate.svg",
      name: "Cash",
      value: "88,000",
      beneficiaryImg: "../../../../../assets/images/real-estate.svg",
      beneficiaryName: "Ben Decker",
    },
  ]

  const assetCatagories = [
    "All",
    "Bank",
    "Stock",
    "Real Estate",
    "Life Insurance",
    "Cryptocurrency",
  ]

  const AssetDetailsCardArr = [
    {
      img: "../../../../../assets/images/dollar.svg",
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
      img: "../../../../../assets/images/bank-icon.svg",
      title: "58",
      subTitle: "Assets registered",
      element: (
        <img
          src="../../../../../assets/images/add-icon.svg"
          className="cy-add-asset-button cursor-pointer"
          id="cy-add-asset-button"
        />
      ),
    },
  ]
  const [selected, setSelected] = useState(false)

  return (
    <div className={styles.AppView}>
      <section className="px-7 pt-4 mx-auto">
        <section className="flex items-center gap-4 mb-8">
          {AssetDetailsCardArr.map((data) => {
            return (
              <AssetDetailsCard
                img={data.img}
                title={data.title}
                subtitle={data.subTitle}
                elemennt={data.element}
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
            {assetCatagories.map((category) => (
              <AssetCategory
                category={category}
                selected={selected}
                setSelected={setSelected}
                onClick={() => {}}
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
                <p className="font-medium text-sm uppercase ">
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Beneficiary
                </p>
                <p className="font-medium text-sm uppercase">Action</p>
              </div>
            </div>
            {assetDetailsArr.map((asset) => {
              return (
                <AssetDetails
                  assetName={asset.name}
                  assetImg={asset.img}
                  assetValue={asset.value}
                  beneficiaryImg={asset.beneficiaryImg}
                  beneficiaryName={asset.beneficiaryName}
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
  title: string
  subtitle: string
  elemennt: any
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
      <div className="cursor-pointer">{_props.elemennt}</div>
    </div>
  )
}

function AssetCategory(_props: {
  category: string
  onClick: Function
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
  assetName: string
  assetImg: any
  assetValue: any
  beneficiaryImg: any
  beneficiaryName: string
}) {
  return (
    <div className="flex justify-between gap-24 px-5 py-3">
      <div className="flex justify-between items-center w-[268px] flex-grow">
        <div className="flex gap-4 items-center">
          <img src={_props.assetImg} alt="real estate icon" />
          <p className="text-[#00192B] text-sm font-semibold">
            {_props.assetName}
          </p>
        </div>
        <p className="text-[#00192B] text-sm font-semibold">
          USD <span>{_props.assetValue}</span>
        </p>
      </div>
      <div className="flex justify-between items-center flex-grow w-[278px]">
        <div className="flex justify-between items-center gap-3">
          <img
            src={_props.beneficiaryImg}
            alt="beneficiary image"
            className="h-11 w-11"
          />
          <p className="font-semibold">{_props.beneficiaryName}</p>
        </div>
        <div className="flex gap-1 ">
          <img
            src={eye}
            alt="view icon"
            className="cy-view-asset-btn"
            id="cy-view-asset-btn"
          />
          <img
            src={edit}
            alt="edit icon"
            className="cy-edit-asset-btn"
            id="cy-edit-asset-btn"
          />
          <img
            src={deleteIcon}
            alt="delete icon"
            className="cy-del-asset-btn"
            id="cy-del-asset-btn"
          />
        </div>
      </div>
    </div>
  )
}
