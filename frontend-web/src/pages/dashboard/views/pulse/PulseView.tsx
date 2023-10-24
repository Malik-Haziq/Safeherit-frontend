import {
  ChangeEvent,
  MouseEvent,
  useState,
  useCallback,
  useEffect,
} from "react"
import styles from "../../Dashboard.module.css"
import shieldIcon from "@images/Shield-done.svg"
import tickIcon from "@images/tick-blue.svg"
import editIcon from "@images/edit-icon.svg"
import pulseImg from "@images/pulse-check-img.svg"
import {
  StepOneModal,
  StepTwoModal,
  StepThreeModal,
  StepFourModal,
  SuccessModal,
} from "./modal_pulse"
import { isValidEmail, isValidPhone, useArray } from "@/common"
import { toast } from "@/components"
import { useAppDispatch } from "@/redux/hooks"
import { updatePulse } from "@/redux/actions"
import { useNavigate } from "react-router-dom"

const initialState = {
  pulseCheckDays: "30",
  pulseCheckEmail1: "",
  pulseCheckEmail2: "",
  pulseCheckEmail3: "",
  pulseCheckPhone1: "",
  pulseCheckPhone2: "",
  pulseCheckValidationRequired: "true",
  pulseCheckNonValidationMonths: "0",
}

export default function PulseView() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [pulseCheck, setPulseCheck] = useState(0)
  const [modalVisibility, setModalVisibility] = useState("none")
  const [modalControl, setModalControl] = useState(initialState)
  const [
    modalHistory,
    modalHistoryLength,
    modalHistoryPop,
    modalHistoryPush,
    modalHistoryPopAll,
  ] = useArray()

  const checkPulsePeriodArr = ["30", "60", "90", "0"]
  const checkPUlseDateArr = {
    lastPulseCheck: "April 12th, 2023",
    nextPulseCheck: "22 days",
  }

  const checkAliveMethodArr = ["Email", "Phone", "Social media"]
  const methodArr = [
    { heading: "Primary Phone", subHeading: "+1 234 566 890" },
    { heading: "Backup Phone 1", subHeading: "+7 234 566 890" },
    { heading: "Backup Phone 2", subHeading: "+9 234 566 560" },
  ]

  useEffect(() => {
    modalHistoryPopAll()
  }, [])

  useEffect(() => {
    console.log(modalHistory)
  }, [])

  const _handleChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target
    setModalControl({ ...modalControl, [name]: value })
  }

  const _submitStepOneModal = () => {
    modalHistoryPush("step-1")
    setModalVisibility("step-2")
  }

  const _submitStepTwoModal = () => {
    // if (
    //   !isValidEmail(modalControl.pulseCheckEmail1) ||
    //   (modalControl.pulseCheckEmail1 &&
    //     !isValidEmail(modalControl.pulseCheckEmail2)) ||
    //   (modalControl.pulseCheckEmail2 &&
    //     !isValidEmail(modalControl.pulseCheckEmail3)) ||
    //   (modalControl.pulseCheckEmail3 &&
    //     !isValidPhone(modalControl.pulseCheckPhone1)) ||
    //   (modalControl.pulseCheckPhone1 &&
    //     !isValidPhone(modalControl.pulseCheckPhone2)) ||
    //   modalControl.pulseCheckPhone2
    // ) {
    //   toast("please enter a valid Email address", "error")
    // } else {
    modalHistoryPush("step-2")
    setModalVisibility("step-3")
    // }
  }

  const _submitStepThreeModal = () => {
    modalHistoryPush("step-3")
    setModalVisibility("step-4")
  }

  const _submitStepFourModal = () => {
    dispatch(updatePulse(modalControl))
      .unwrap()
      .catch()
      .then((res) => {
        modalHistoryPush("step-4")
        setModalVisibility("success-modal")
      })
  }

  const _submitSuccessModal = () => {
    setModalVisibility("none")
    setPulseCheck(1)
    navigate("/dashboard/assets")
  }

  const _closeModal = useCallback(() => {
    setModalControl(initialState)
    setModalVisibility("none")
    modalHistoryPopAll()
  }, [])

  const showPreviousModal = () => {
    modalHistoryPop()
    const lastEl = modalHistory[modalHistoryLength - 1]
    setModalVisibility(lastEl)
  }

  return (
    <div className={styles.AppView}>
      <StepOneModal
        openModal={modalVisibility == "step-1"}
        closeModal={_closeModal}
        closeModalOnOverlayClick={false}
        closeIconVisibility={true}
        action={""}
        _submitModal={_submitStepOneModal}
        _handleChange={() => {}}
      />
      <StepTwoModal
        openModal={modalVisibility == "step-2"}
        closeModal={_closeModal}
        closeModalOnOverlayClick={false}
        closeIconVisibility={true}
        action={""}
        _submitModal={_submitStepTwoModal}
        _handleChange={_handleChange}
        modalControl={modalControl}
        arrayLength={modalHistoryLength}
        showPreviousModal={showPreviousModal}
      />
      <StepThreeModal
        openModal={modalVisibility == "step-3"}
        closeModal={_closeModal}
        closeModalOnOverlayClick={false}
        closeIconVisibility={true}
        action={""}
        _submitModal={_submitStepThreeModal}
        _handleChange={_handleChange}
        arrayLength={modalHistoryLength}
        showPreviousModal={showPreviousModal}
      />
      <StepFourModal
        openModal={modalVisibility == "step-4"}
        closeModal={_closeModal}
        closeModalOnOverlayClick={false}
        closeIconVisibility={true}
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
        closeIconVisibility={true}
        action={""}
        _submitModal={_submitSuccessModal}
      />
      {pulseCheck ? (
        <PulseCheckView
          checkPulsePeriodArr={checkPulsePeriodArr}
          checkPUlseDateArr={checkPUlseDateArr}
          checkAliveMethodArr={checkAliveMethodArr}
          methodArr={methodArr}
        />
      ) : (
        <SetUpPulseCheck
          openStepZeroModal={() => {
            setModalVisibility("step-1")
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
  methodArr: any
}) {
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
          <div className="flex justify-between mb-6 gap-3">
            {_props.checkPulsePeriodArr.map((el: any) => {
              return <CheckPulsePeriod days={el} selected={false} />
            })}
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
              {_props.checkAliveMethodArr.map((el: any) => {
                return <CheckAliveMethod method={el} selected={false} />
              })}
            </div>
            <div className="p-5 flex flex-col gap-3 ">
              {_props.methodArr.map((method: any) => {
                return (
                  <MethodRow
                    heading={method.heading}
                    subHeading={method.subHeading}
                  />
                )
              })}
            </div>
          </article>
        </section>
        <section className="basis-1/2 flex mt-36 items-center flex-col gap-8 ">
          <video
            src="#"
            controls
            className="w-[450px] h-[300px] rounded-xl"
          ></video>
          <p className="text-xl">Learn how our Pulse Check system works</p>
        </section>
      </main>
    </div>
  )
}
function CheckPulsePeriod(_props: { days: string; selected: boolean }) {
  return (
    <div
      className={
        _props.selected
          ? "flex items-center justify-center flex-col py-6 px-11 bg-[#F6F6F6] rounded-xl cursor-pointer border-[1px] border-[#0C8AC1] relative"
          : "flex items-center justify-center flex-col py-6 px-11 bg-[#F6F6F6] rounded-xl cursor-pointer"
      }
    >
      <h3 className="text-xl font-bold ">{_props.days}</h3>
      <small className="text-[#666] text-sm ">days</small>
      {_props.selected && (
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
          &nbsp;{_props.nextPulseCheck}
        </span>
      </p>
    </>
  )
}

function CheckAliveMethod(_props: { method: string; selected: boolean }) {
  return (
    <p
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

function MethodRow(_props: { heading: string; subHeading: string }) {
  return (
    <div className="py-3 px-2 flex items-center justify-between rounded-lg bg-white  border-[1px] border-[#E3E3E3] text-[#4E4F50]">
      <p>{_props.heading}</p>
      <p>{_props.subHeading}</p>
      <img src={editIcon} alt="edit icon" className="w-5 h-5 cursor-pointer" />
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
          You still didn’t set up ho we should make sure you are alive.
        </p>
        <button
          onClick={_props.openStepZeroModal}
          className="primary-btn rounded-2xl py-3 px-9 bg-[#0971AA]"
        >
          Set Up Pulse
        </button>
      </main>
    </div>
  )
}
