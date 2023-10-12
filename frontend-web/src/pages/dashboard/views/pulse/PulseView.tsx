import { ChangeEvent, MouseEvent } from "react"
import styles from "../../Dashboard.module.css"
import pulseImg from "@images/pulse-check-img.svg"
import {
  StepOneModal,
  StepTwoModal,
  StepThreeModal,
  StepFourModal,
  SuccessModal,
} from "./modal_pulse"

export default function PulseView() {
  return (
    <div className={styles.AppView}>
      {/* <StepOneModal
        openModal={true}
        closeModal={false}
        closeModalOnOverlayClick={false}
        closeIconVisibility={true}
        action={""}
        _submitModal={() => {}}
        _handleChange={function (event: ChangeEvent<HTMLInputElement>): void {
          throw new Error("Function not implemented.")
        }}
      /> */}
      <SetUpPulseCheck openStepZeroModal={() => {}} />
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
