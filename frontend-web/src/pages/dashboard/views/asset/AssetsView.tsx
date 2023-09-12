import styles from "../../Dashboard.module.css"
import { useCallback, useState } from "react"
import {
  StepZeroInformationModal,
  SuccessModal,
  StepOneModal,
  StepTwoModal,
} from "./modal_assets"

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

  return (
    <div className={styles.AppView}>
      <StepOneModal
        openModal={true}
        closeModal={() => {}}
        closeModalOnOverlayClick={true}
        closeIconVisibility={true}
        action={""}
        _handleChange={() => {}}
        _submitModal={() => {}}
        modalControl={initialState}
      />
      <p>Assets View</p>
    </div>
  )
}
