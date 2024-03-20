import React from "react"
import { useState, useCallback, useEffect } from "react"
import styles from "../../Dashboard.module.css"
import shieldIcon from "@images/Shield-done.svg"
import tickIcon from "@images/tick-blue.svg"
import editIcon from "@images/edit-icon.svg"
import pulseImg from "@images/pulse-check-img.svg"
import checkmark from "@images/checkmark.svg"
import introVideo from "@videos/pulse-video.mp4"
import {
  StepOneModal,
  StepTwoModal,
  StepThreeModal,
  StepFourModal,
  SuccessModal,
} from "./modal_pulse"
import {
  ROUTE_CONSTANTS,
  convertToCamelCase,
  isValidEmail,
  isValidPhoneWithRegion,
  useArray,
} from "@/common"
import { InputField, PhoneNumField, Spinner, toast } from "@/components"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { getUser, updatePulse } from "@/redux/actions"
import { setLoaderVisibility } from "@/redux/reducers/LoaderSlice"
import { useNavigate } from "react-router-dom"
import { setWizardStep } from "@/redux/reducers/UserSlice"

const initialState = {
  pulseCheckDays: "30",
  pulseCheckEmail1: "",
  pulseCheckEmail2: "",
  pulseCheckEmail3: "",
  pulseCheckPhone1: "",
  pulseCheckPhone2: "",
  pulseCheckPhone3: "",
  pulseCheckValidationRequired: "true",
  pulseCheckNonValidationDays: "0",
}

interface CustomChangeEvent {
  target: {
    name: string
    value: string | ArrayBuffer | null | undefined
  }
}

export default function PulseView() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.user)
  const startLoader = () => dispatch<any>(setLoaderVisibility(true))
  const stopLoader = () => dispatch<any>(setLoaderVisibility(false))

  const [pulseCheck, setPulseCheck] = useState<boolean | null>(null)
  const [modalVisibility, setModalVisibility] = useState("none")
  const [confirmationDetails, setConfirmationDetails] = useState("Email")
  const [modalControl, setModalControl] = useState(initialState)
  const [editDetailInput, setEditDetailInput] = useState("")
  const [newPulseCheckDays, setNewPulseCheckDays] = useState<string>("")
  const [pulseCheckCustomDays, setPulseCheckCustomDays] = useState<string>("")
  const [
    modalHistory,
    modalHistoryLength,
    modalHistoryPop,
    modalHistoryPush,
    modalHistoryPopAll,
  ] = useArray()

  const checkPulsePeriodArr = [
    "30",
    "60",
    "90",
    user.pulseCheckDays == "30" ||
    user.pulseCheckDays == "60" ||
    user.pulseCheckDays == "90"
      ? "0"
      : user.pulseCheckDays,
  ]
  const checkPUlseDateArr = {
    lastPulseCheck: user.lastPulseCheck,
    nextPulseCheck: user.nextPulseCheckDueDays,
  }
  const checkAliveMethodArr = ["Email", "Phone", "Social media"]

  useEffect(() => {
    modalHistoryPopAll()
    getUserDetails()

    initialState.pulseCheckEmail1 = user.email
    initialState.pulseCheckNonValidationDays = user.pulseCheckNonValidationDays
    setModalControl(initialState)
  }, [])

  useEffect(() => {
    setEditDetailInput("")
  }, [confirmationDetails])

  useEffect(() => {
    if (!user.startupWizardCompleted && user.wizardStep === "PulseCheck") {
      setModalVisibility("Step-1")
    }
  }, [])

  const getUserDetails = () => {
    if (user.startupWizardCompleted) {
      dispatch<any>(getUser({ HideLoader: true }))
        .unwrap()
        .catch()
        .then((res: { data: { data: { pulseCheckActive: string } } }) => {
          if (JSON.parse(res.data.data.pulseCheckActive)) {
            setPulseCheck(true)
          } else {
            setPulseCheck(false)
          }
        })
    }
  }
  const _handleChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target
    setModalControl({ ...modalControl, [name]: value })
  }

  const _submitStepOneModal = () => {
    modalHistoryPush("Step-1")
    setModalVisibility("Step-2")
  }

  const _submitStepTwoModal = () => {
    if (!modalControl.pulseCheckDays) {
      toast("please select valid pulse check days", "error")
    } else if (
      (!isValidEmail(modalControl.pulseCheckEmail1) &&
        !isValidEmail(modalControl.pulseCheckEmail2) &&
        !isValidEmail(modalControl.pulseCheckEmail3)) ||
      (modalControl.pulseCheckEmail1 &&
        !isValidEmail(modalControl.pulseCheckEmail1)) ||
      (modalControl.pulseCheckEmail2 &&
        !isValidEmail(modalControl.pulseCheckEmail2)) ||
      (modalControl.pulseCheckEmail3 &&
        !isValidEmail(modalControl.pulseCheckEmail3))
    ) {
      toast("please enter a valid Email address", "error")
    } else if (
      (modalControl.pulseCheckPhone1 &&
        !isValidPhoneWithRegion(modalControl.pulseCheckPhone1)) ||
      (modalControl.pulseCheckPhone2 &&
        !isValidPhoneWithRegion(modalControl.pulseCheckPhone2))
    ) {
      toast("please enter a valid Phone number", "error")
    } else {
      modalHistoryPush("Step-2")
      setModalVisibility("Step-3")
    }
  }

  const _submitStepThreeModal = () => {
    if (user.numOfValidatorOfUser) {
      modalHistoryPush("Step-3")
      setModalVisibility("Step-4")
    } else {
      _submitStepFourModal()
    }
  }

  const _submitStepFourModal = () => {
    startLoader()
    toast("creating pulse check ", "info")
    dispatch<any>(updatePulse(modalControl))
      .unwrap()
      .catch()
      .then(() => {
        modalHistoryPush("Step-4")
        setModalVisibility("success-modal")
        getUserDetails()
      })
      .finally(() => {
        stopLoader()
      })
  }

  const _submitSuccessModal = () => {
    setModalVisibility("none")
    if (!user.startupWizardCompleted && user.wizardStep === "PulseCheck") {
      navigate(
        `${ROUTE_CONSTANTS.DASHBOARD}/${ROUTE_CONSTANTS.DASHBOARD_ASSETS}`,
      )
      dispatch(setWizardStep("Assets"))
      return
    }
  }

  const _closeModal = useCallback(() => {
    setModalControl(initialState)
    setModalVisibility("none")
    modalHistoryPopAll()
  }, [])

  const showPreviousModal = () => {
    const lastEl = modalHistory[modalHistoryLength - 1] || "none"
    modalHistoryPop()
    setModalVisibility(lastEl)
  }

  const submitUpdatedValue = ({
    propertyName,
    value,
  }: {
    propertyName: string
    value: string
  }) => {
    if (!value || value === "0") {
      toast("Please enter valid days", "error")
      return
    }
    startLoader()
    const updatedData = {
      [propertyName === "primaryPhone"
        ? "pulseCheckPhone1"
        : propertyName === "backupPhone1"
        ? "pulseCheckPhone2"
        : propertyName]: value,
      pulseCheckValidationRequired: user.pulseCheckValidationRequired,
      pulseCheckNonValidationDays: user.pulseCheckNonValidationDays,
    }
    if (propertyName !== "pulseCheckDays") {
      updatedData["pulseCheckDays"] = user.pulseCheckDays
    }

    dispatch(updatePulse(updatedData))
      .unwrap()
      .catch()
      .then(() => {
        toast("Pulse check data updated successfully", "info")
        getUserDetails()
      })
      .finally(() => {
        stopLoader()
      })
  }

  const _submitUpdateValidatorDays = () => {
    toast("Updating", "info")
    dispatch<any>(updatePulse(modalControl))
      .unwrap()
      .catch()
      .then(() => {
        getUserDetails()
      })
      .finally(() => {})
  }

  return (
    <div className={styles.AppView}>
      <StepOneModal
        openModal={modalVisibility == "Step-1"}
        closeModal={_closeModal}
        closeModalOnOverlayClick={false}
        closeIconVisibility={user.startupWizardCompleted}
        action={""}
        _submitModal={_submitStepOneModal}
        _handleChange={() => {}}
      />
      <StepTwoModal
        openModal={modalVisibility == "Step-2"}
        closeModal={_closeModal}
        closeModalOnOverlayClick={false}
        closeIconVisibility={user.startupWizardCompleted}
        action={""}
        _submitModal={_submitStepTwoModal}
        _handleChange={_handleChange}
        modalControl={modalControl}
        arrayLength={modalHistoryLength}
        showPreviousModal={showPreviousModal}
      />
      <StepThreeModal
        openModal={modalVisibility == "Step-3"}
        closeModal={_closeModal}
        closeModalOnOverlayClick={false}
        closeIconVisibility={user.startupWizardCompleted}
        numberOfValidators={user.numOfValidatorOfUser}
        action={""}
        _submitModal={_submitStepThreeModal}
        _handleChange={_handleChange}
        arrayLength={modalHistoryLength}
        showPreviousModal={showPreviousModal}
      />
      <StepFourModal
        openModal={modalVisibility == "Step-4"}
        closeModal={_closeModal}
        closeModalOnOverlayClick={false}
        closeIconVisibility={user.startupWizardCompleted}
        action={""}
        _submitModal={_submitStepFourModal}
        _handleChange={_handleChange}
        modalControl={modalControl}
        arrayLength={modalHistoryLength}
        showPreviousModal={showPreviousModal}
      />
      <SuccessModal
        openModal={modalVisibility == "success-modal"}
        closeModal={_closeModal}
        closeModalOnOverlayClick={false}
        closeIconVisibility={user.startupWizardCompleted}
        action={""}
        _submitModal={_submitSuccessModal}
      />
      {pulseCheck === null ? (
        <div className={styles.AppView}>
          <div className="relative h-[80vh]">
            <Spinner />
          </div>
        </div>
      ) : pulseCheck ? (
        <PulseCheckView
          checkPulsePeriodArr={checkPulsePeriodArr}
          checkPUlseDateArr={checkPUlseDateArr}
          checkAliveMethodArr={checkAliveMethodArr}
          methodArr={user.pulseDetail[confirmationDetails]}
          confirmationDetails={confirmationDetails}
          setConfirmationDetails={setConfirmationDetails}
          editDetailInput={editDetailInput}
          setEditDetailInput={setEditDetailInput}
          pulseCheckDays={user.pulseCheckDays}
          newPulseCheckDays={newPulseCheckDays}
          setNewPulseCheckDays={setNewPulseCheckDays}
          pulseCheckCustomDays={pulseCheckCustomDays}
          setPulseCheckCustomDays={setPulseCheckCustomDays}
          submitUpdatedValue={submitUpdatedValue}
          modalControl={modalControl}
          handleChange={_handleChange}
          numOfValidator={user.numOfValidatorOfUser}
          _submitUpdateValidatorDays={_submitUpdateValidatorDays}
        />
      ) : (
        <SetUpPulseCheck
          openStepZeroModal={() => {
            setModalVisibility("Step-1")
          }}
        />
      )}
    </div>
  )
}

function PulseCheckView(_props: {
  checkPulsePeriodArr: any
  checkPUlseDateArr: any
  checkAliveMethodArr: any
  methodArr: { heading: string; subHeading: string }[]
  confirmationDetails: string
  setConfirmationDetails: any
  editDetailInput: string
  setEditDetailInput: any
  pulseCheckDays: string
  newPulseCheckDays: string
  modalControl: any
  handleChange: any
  numOfValidator: number
  _submitUpdateValidatorDays: () => void
  setNewPulseCheckDays: React.Dispatch<React.SetStateAction<string>>
  pulseCheckCustomDays: string
  setPulseCheckCustomDays: React.Dispatch<React.SetStateAction<string>>
  submitUpdatedValue: ({
    propertyName,
    value,
  }: {
    propertyName: string
    value: string
  }) => void
}) {
  useEffect(() => {
    function handleUpdatePulseCheckDays() {
      _props.submitUpdatedValue({
        propertyName: "pulseCheckDays",
        value:
          _props.newPulseCheckDays === "0" && _props.pulseCheckCustomDays
            ? _props.pulseCheckCustomDays
            : _props.newPulseCheckDays,
      })
      _props.setNewPulseCheckDays("")
    }
    if (
      _props.newPulseCheckDays &&
      _props.newPulseCheckDays !== _props.pulseCheckDays &&
      _props.newPulseCheckDays !== "0"
    ) {
      handleUpdatePulseCheckDays()
    }
  }, [_props.newPulseCheckDays])

  return (
    <div className="px-8 py-4">
      <main className="flex justify-between gap-14 shadow-xl h-full rounded-2xl p-6">
        <section className="basis-1/2 max-w-[524px]">
          <h1 className="text-[#00192B] text-2xl font-bold pb-8">
            Pulse check Settings
          </h1>
          <div className="flex items-center justify-between pb-4">
            <h2 className="text-lg font-bold ">Set your pulse check period</h2>
            <span className="text-[#0DA74B] border-[1px] border-[#0DA74B] py-1 px-4 rounded-full text-xs font-semibold">
              Active
            </span>
          </div>
          <p className="text-[#707070] text-sm mb-5">
            We will contact you if you don’t log in and there are no signs of
            activity on your registered social media for the following number of
            days:
          </p>
          <div className="flex flex-col justify-center items-center mb-6">
            <div className="flex justify-between mb-2 gap-3">
              {_props.checkPulsePeriodArr.map((value: any, index: string) => {
                return (
                  <CheckPulsePeriod
                    key={index}
                    days={value}
                    pulseCheckDays={_props.pulseCheckDays}
                    newPulseCheckDays={_props.newPulseCheckDays}
                    setNewPulseCheckDays={_props.setNewPulseCheckDays}
                    pulseCheckCustomDays={_props.pulseCheckCustomDays}
                    setPulseCheckCustomDays={_props.setPulseCheckCustomDays}
                  />
                )
              })}
            </div>
            {_props.newPulseCheckDays === "0" && (
              <div className="w-[100%] flex justify-end pe-2">
                <button
                  data-cy="update-pulse-check-days-button"
                  className="primary-btn text-[12px] rounded-2xl bg-[#0971AA]"
                  onClick={() => {
                    _props.submitUpdatedValue({
                      propertyName: "pulseCheckDays",
                      value: _props.pulseCheckCustomDays,
                    })
                    _props.setNewPulseCheckDays("")
                    _props.setPulseCheckCustomDays("")
                  }}
                >
                  Update
                </button>
              </div>
            )}
          </div>
          <div className="bg-[#ECF6FA] text-[#0C8AC1] flex flex-col gap-2 py-3 pl-5 text-sm rounded-xl mb-6">
            <CheckPulseDates
              lastPulseCheck={_props.checkPUlseDateArr.lastPulseCheck}
              nextPulseCheck={_props.checkPUlseDateArr.nextPulseCheck}
            />
          </div>
          <h2 className="text-lg font-bold mb-4">
            Set the ways in which we can confirm you’re alive
          </h2>
          <article className="bg-[#F9F9F9] border-[1px] border-[#E1E1E1] rounded-xl h-[334px] overflow-auto scrollbar">
            <div className="flex gap-8 border-b-[1px] border-b-[#e1e1e1] text-[#707070] pl-5 ">
              {_props.checkAliveMethodArr.map((value: any, index: string) => {
                return (
                  <CheckAliveMethod
                    key={index}
                    setConfirmationDetails={_props.setConfirmationDetails}
                    method={value}
                    selected={
                      _props.confirmationDetails == value ? true : false
                    }
                  />
                )
              })}
            </div>
            <div className="p-5 flex flex-col gap-3 ">
              {_props.methodArr.map((value: any, i: number) => {
                return (
                  <MethodRow
                    heading={value.heading}
                    subHeading={value.subHeading}
                    editDetailInput={_props.editDetailInput}
                    setEditDetailInput={_props.setEditDetailInput}
                    submitUpdatedValue={_props.submitUpdatedValue}
                    key={i}
                  />
                )
              })}
            </div>
          </article>
        </section>
        <section className="basis-1/2 flex mt-36 items-center flex-col gap-8 ">
          <video
            src={introVideo}
            controls
            className="w-[450px] h-[300px] rounded-xl"
          ></video>
          <p className="text-xl mb-8">Learn how our Pulse Check system works</p>
          {_props.numOfValidator && (
            <ValidatorMonths
              modalControl={_props.modalControl}
              _handleChange={_props.handleChange}
              _submitUpdateValidatorDays={_props._submitUpdateValidatorDays}
            />
          )}
        </section>
      </main>
    </div>
  )
}

function CheckPulsePeriod(_props: {
  pulseCheckDays: any
  days: string
  newPulseCheckDays: string
  setNewPulseCheckDays: React.Dispatch<React.SetStateAction<string>>
  pulseCheckCustomDays: string
  setPulseCheckCustomDays: React.Dispatch<React.SetStateAction<string>>
}) {
  return (
    <div
      data-cy="pulse-check-period-button"
      className={`
      w-[120px] flex items-center justify-center flex-col py-6  bg-[#F6F6F6] rounded-xl cursor-pointer ${
        (_props.pulseCheckDays == _props.days ||
          _props.newPulseCheckDays == _props.days) &&
        " border-[1px] border-[#0C8AC1] relative"
      }
      `}
      onClick={() => {
        _props.setNewPulseCheckDays(_props.days)
      }}
    >
      {_props.newPulseCheckDays == _props.days &&
      _props.newPulseCheckDays == "0" ? (
        <input
          data-cy="pulse-check-days-input"
          type="number"
          placeholder="0"
          value={_props.pulseCheckCustomDays}
          onChange={(e) => _props.setPulseCheckCustomDays(e.target.value)}
          onBlur={(e) => {
            if (e.target.value === "0") {
              _props.setPulseCheckCustomDays("")
            }
          }}
          className="w-[100px] outline-none border-0 text-xl font-bold bg-[#F6F6F6]"
          autoFocus
        />
      ) : (
        <>
          <h3 className="text-xl font-bold ">
            {_props.days !== "0" ? _props.days : "Custom"}
          </h3>
          <small className="text-[#666] text-sm ">days</small>
        </>
      )}
      {_props.pulseCheckDays == _props.days && (
        <img
          src={tickIcon}
          alt="Tick icon"
          className="absolute top-2 right-2"
        />
      )}
    </div>
  )
}

function CheckPulseDates(_props: {
  lastPulseCheck: string
  nextPulseCheck: string
}) {
  return (
    <>
      <div className="flex gap-2">
        <img src={shieldIcon} alt="safe icon" className="w-6 h-6" />
        <p>
          Last Pulse Check was successfully done on &nbsp;
          <span className="font-bold text-[#065A93]">
            {_props.lastPulseCheck}
          </span>
        </p>
      </div>
      <p className=" ml-8">
        Next Pulse Check is due in
        <span className="font-bold text-[#065A93]">
          &nbsp;{_props.nextPulseCheck}&nbsp;
        </span>
        {Number(_props.nextPulseCheck) > 1 ? "days" : "day"}
      </p>
    </>
  )
}

function CheckAliveMethod(_props: {
  method: string
  selected: boolean
  setConfirmationDetails: any
}) {
  return (
    <p
      data-cy={`check-method-${_props.method}`}
      onClick={() => {
        _props.setConfirmationDetails(_props.method)
      }}
      className={
        _props.selected
          ? "py-4 px-2 cursor-pointer text-[#04477B] font-medium  border-b-2 border-b-[#04477B]"
          : "py-4 px-2 cursor-pointer"
      }
    >
      {_props.method}
    </p>
  )
}

function MethodRow(_props: {
  heading: string
  subHeading: string
  editDetailInput: string
  setEditDetailInput: any
  submitUpdatedValue: ({
    propertyName,
    value,
  }: {
    propertyName: string
    value: string
  }) => void
}) {
  const [_inputValue, _setInputValue] = useState<string>("")

  useEffect(() => {
    _setInputValue(_props.subHeading || "")
  }, [_props.editDetailInput])

  function _handleUpdate() {
    if (
      (_props.editDetailInput === "pulseCheckEmail1" ||
        _props.editDetailInput === "pulseCheckEmail2" ||
        _props.editDetailInput === "pulseCheckEmail3") &&
      !isValidEmail(_inputValue)
    ) {
      toast("please enter a valid Email address", "error")
    } else if (
      (_props.editDetailInput === "primaryPhone" ||
        _props.editDetailInput === "backupPhone1" ||
        _props.editDetailInput === "backupPhone2") &&
      !isValidPhoneWithRegion(_inputValue)
    ) {
      toast("please enter a valid Phone number", "error")
    } else {
      const data = {
        propertyName: _props.editDetailInput,
        value: _inputValue,
      }
      _props.submitUpdatedValue(data)
      _props.setEditDetailInput("")
    }
  }

  return (
    <div className="py-3 px-2 flex items-center justify-between rounded-lg bg-white  border-[1px] border-[#E3E3E3] text-[#4E4F50]">
      <p>{_props.heading}</p>
      {_props.editDetailInput === convertToCamelCase(_props.heading) &&
      (_props.editDetailInput === "primaryPhone" ||
        _props.editDetailInput === "backupPhone1" ||
        _props.editDetailInput === "backupPhone2") ? (
        <>
          <PhoneNumField
            name="phone_number"
            placeholder="Phone Number"
            selectFieldStyles="w-[90px] justify-between bg-[#F5FAFD] rounded-tl-[22px] rounded-bl-[22px] flex relative after:absolute after:content-[''] after:w-[1px] after:h-[22px] after:bg-[#B4B4B4] after:-right-3 after:top-4"
            inputStyles=""
            inputContainerStyles="w-[170px]"
            containerStyles="mb-0"
            selectFieldMenuWidth={242}
            _handleChange={(e) => _setInputValue(e.target.value)}
            value={_inputValue?.split(" ")[1]}
            code={_inputValue?.split(" ")[0]}
          />
          <img
            data-cy="save-edited-phone-number-button"
            src={tickIcon}
            onClick={_handleUpdate}
            alt="save icon"
            className="w-5 h-5 cursor-pointer"
          />
        </>
      ) : _props.editDetailInput === convertToCamelCase(_props.heading) ? (
        <>
          <InputField
            name="email"
            type="email"
            placeholder="Email Address"
            required={true}
            value={_inputValue}
            inputStyles="border-0 bg-safe-gray w-[250px] py-4 px-4  placeholder:text-[#6F767B] outline-none rounded-[22px]"
            inputContainerStyles=""
            _handleChange={(e: any) => _setInputValue(e.target.value)}
          />
          <img
            data-cy="save-edited-phone-number-button"
            src={tickIcon}
            onClick={_handleUpdate}
            alt="save icon"
            className="w-5 h-5 cursor-pointer"
          />
        </>
      ) : (
        <>
          <p>{_props.subHeading}</p>
          <img
            data-cy="edit-phone-number-button"
            src={editIcon}
            onClick={() =>
              _props.setEditDetailInput(convertToCamelCase(_props.heading))
            }
            alt="edit icon"
            className="w-5 h-5 cursor-pointer"
          />
        </>
      )}
    </div>
  )
}

function SetUpPulseCheck(_props: {
  openStepZeroModal: React.MouseEventHandler<HTMLButtonElement>
}) {
  return (
    <div className="h-[calc(100vh-83px)] p-7">
      <main className="flex flex-col items-center justify-center shadow-xl h-full rounded-2xl">
        <img src={pulseImg} className="mb-10 " alt="validator screen image" />
        <h2 className="text-[#00192B] text-xl font-bold mb-2">
          No Pulse checked
        </h2>
        <p className="text-[#868686] mb-10">
          You should setup your pulse check so we can verify that you’re alive.
        </p>
        <button
          data-cy="setup-pulse-check-button"
          onClick={_props.openStepZeroModal}
          className="primary-btn rounded-2xl py-3 px-9 bg-[#0971AA]"
        >
          Set Up Pulse
        </button>
      </main>
    </div>
  )
}

function ValidatorMonths(_props: {
  modalControl: any
  _handleChange: any
  _submitUpdateValidatorDays: any
}) {
  const [getResponseFromValidator, setGetResponseFromValidator] = useState(
    _props.modalControl.pulseCheckNonValidationDays === 0 ? "opt-1" : "opt-2",
  )
  const [validatorDays, setValidatorDays] = useState(
    _props.modalControl.pulseCheckNonValidationDays,
  )
  const [updateButton, setUpdateButton] = useState(false)

  function handleClick(selectedOption: string) {
    setGetResponseFromValidator(selectedOption)
    setUpdateButton(true)
  }

  useEffect(() => {
    if (_props.modalControl.pulseCheckValidationRequired == "true") {
      triggerEvent("pulseCheckNonValidationDays", "0")
    }
  }, [_props.modalControl.pulseCheckValidationRequired])

  useEffect(() => {
    if (_props.modalControl.pulseCheckNonValidationDays == "3") {
      triggerEvent("pulseCheckValidationRequired", "false")
    }
  }, [_props.modalControl.pulseCheckNonValidationDays])

  useEffect(() => {
    if (getResponseFromValidator == "opt-1") {
      triggerEvent("pulseCheckValidationRequired", "true")
      triggerEvent("pulseCheckNonValidationDays", "0")
    } else {
      triggerEvent("pulseCheckNonValidationDays", validatorDays)
    }
  }, [getResponseFromValidator, validatorDays])

  const triggerEvent = (name: string, value: string) => {
    const customEvent: CustomChangeEvent = {
      target: {
        name: name,
        value: value,
      },
    }
    _props._handleChange(customEvent as React.ChangeEvent<HTMLInputElement>)
  }

  const handleChange = (e: any) => {
    const value = e.target.value
    if (value == "" || (value >= 1 && value <= 90 && !value.includes("."))) {
      setValidatorDays(value)
    }
  }

  const _handleSubmit = () => {
    if (getResponseFromValidator == "opt-1") {
      setValidatorDays(0)
    }
    _props._submitUpdateValidatorDays()
  }

  return (
    <div className="flex flex-col gap-3 mb-10">
      <div
        className={
          getResponseFromValidator == "opt-1"
            ? "flex items-center gap-3 text-sm font-semibold mb-3 text-[#474747]"
            : "flex items-center gap-3 text-sm font-medium mb-3 text-[#8C8C8C]"
        }
        onClick={() => handleClick("opt-1")}
      >
        {getResponseFromValidator == "opt-1" ? (
          <img src={checkmark} alt="checkmark" className="w-6 h-6" />
        ) : (
          <div className="w-6 h-6 border-2 shrink-0 rounded-sm"></div>
        )}

        <p className="text-start cursor-default">
          Keep following up: do not contact my beneficiaries unless you get a
          confirmation from a validator.
        </p>
      </div>

      <div
        className={
          getResponseFromValidator == "opt-2"
            ? "flex items-center gap-3 text-sm font-semibold mb-3 text-[#474747]"
            : "flex items-center gap-3 text-sm font-medium mb-3 text-[#8C8C8C]"
        }
        onClick={() => handleClick("opt-2")}
      >
        {getResponseFromValidator == "opt-2" ? (
          <img src={checkmark} alt="checkmark" className="w-6 h-6" />
        ) : (
          <div className="w-6 h-6 border-2 shrink-0 rounded-sm"></div>
        )}

        <p className="text-start cursor-default">
          Make the data available to my beneficiaries after
          <input
            type="text"
            min={1}
            max={90}
            onChange={handleChange}
            autoFocus={getResponseFromValidator === "opt-2"}
            disabled={getResponseFromValidator !== "opt-2"}
            value={validatorDays}
            className="inline h-7 w-16 px-3 text-safe-text-dark-gray rounded-md border-[1px] border-safe-color-gray outline-none"
            required
          />
          days without a response from any validator.
        </p>
      </div>
      {updateButton && (
        <button
          data-cy="update-pulse-check-days-button"
          className="primary-btn text-[12px] rounded-2xl bg-[#0971AA] inline-block w-fit ml-auto"
          onClick={_handleSubmit}
        >
          Update
        </button>
      )}
    </div>
  )
}
