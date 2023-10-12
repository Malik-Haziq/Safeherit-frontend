import { ChangeEvent, MouseEvent } from "react"
import styles from "../../Dashboard.module.css"
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
      <StepOneModal
        openModal={true}
        closeModal={false}
        closeModalOnOverlayClick={false}
        closeIconVisibility={true}
        action={""}
        _submitModal={() => {}}
        _handleChange={function (event: ChangeEvent<HTMLInputElement>): void {
          throw new Error("Function not implemented.")
        }}
      />
      <p>Pulse View</p>
    </div>
  )
}
