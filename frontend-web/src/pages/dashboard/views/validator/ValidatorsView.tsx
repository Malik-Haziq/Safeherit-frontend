import styles from "../../Dashboard.module.css"
import userIcon from "../../../../../assets/images/user-icon.svg"
import addIcon from "../../../../../assets/images/add-icon.svg"
import dots from "../../../../../assets/images/dots.svg"
import facebook from "../../../../../assets/images/facebook.svg"
import instagram from "../../../../../assets/images/insta.svg"
import twitter from "../../../../../assets/images/twitter.svg"
import userImg from "../../../../../assets/images/user.svg"
import validatorImage from "../../../../../assets/images/validator-screen.svg"

import {
  EditValidatorModal_1,
  EditValidatorModal_2,
  EditValidatorModal_3,
  RegisterValidatorModal_0,
  StepOneModal,
  StepTwoModal,
  StepThreeModal,
  RegisterValidatorModal_4,
} from "./modal_validator"
import { useCallback, useEffect, useState } from "react"
import {
  getAllValidator,
  createValidator,
} from "../../../../redux/actions/ValidatorAction"
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks"

const initialState = {
  name: "",
  primary_email: "",
  backup_email: "",
  backup_email2: "",
  phone_number: "",
  backup_phone_number: "",
  facebook_link: "",
  instagram_username: "",
  twitter_username: "",
  message: "",
  image: "",
}

export default function ValidatorsView() {
  const dispatch = useAppDispatch()
  const [hasValidators, setHasValidators] = useState(false)

  useEffect(() => {
    dispatch(getAllValidator({}))
      .unwrap()
      .then((res) => {
        if (res?.data.data && res?.data?.data.length > 0) {
          setHasValidators(true)
        } else {
          setHasValidators(false)
        }
      })
      .catch(() => {
        // TODO: show fallback page
      })
  }, [])

  if (hasValidators) {
    return <Validators />
  } else {
    return <AddValidators />
  }
}

function AddValidators() {
  const openStepOneModal = () => {
    alert("show modals")
  }

  return (
    <div className="h-[calc(100vh-83px)] p-7">
      <main className="flex flex-col items-center justify-center shadow-xl h-full rounded-2xl">
        <img
          src={validatorImage}
          className="mb-10"
          alt="validator screen image"
        />
        <h2 className="text-[#00192B] text-xl font-bold mb-2">No Validators</h2>
        <p className="text-[#868686] font-medium mb-10">
          No registered validator yet
        </p>
        <button
          onClick={openStepOneModal}
          className="primary-btn rounded-2xl py-3 px-9 bg-[#0971AA]"
        >
          Register Validators
        </button>
      </main>
    </div>
  )
}

function Validators() {
  const dispatch = useAppDispatch()
  const validatorArray = useAppSelector(
    (state) => state.validator.validator_array,
  )
  const [modalControl, setModalControl] = useState(initialState) // TODO Change this to redux initalState
  const [stepOneModalVisibility, setStepOneModalVisibility] = useState(true)
  const [stepTwoModalVisibility, setStepTwoModalVisibility] = useState(false)
  const [stepThreeModalVisibility, setStepThreeModalVisibility] =
    useState(false)

  const closeStepOneModal = useCallback(() => {
    setModalControl(initialState)
    setStepOneModalVisibility(false)
  }, [])
  const closeStepTwoModal = useCallback(() => {
    setModalControl(initialState)
    setStepTwoModalVisibility(false)
  }, [])
  const closeStepThreeModal = useCallback(() => {
    setModalControl(initialState)
    setStepThreeModalVisibility(false)
  }, [])

  const openStepOneModal = useCallback(() => {
    setStepOneModalVisibility(true)
  }, [])
  const openStepTwoModal = useCallback(() => {
    setStepTwoModalVisibility(true)
  }, [])
  const openStepThreeModal = useCallback(() => {
    setStepThreeModalVisibility(true)
  }, [])

  const _handleChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target
    setModalControl({ ...modalControl, [name]: value })
  }
  const _submitStepOneModal = () => {
    // validate input
    setStepOneModalVisibility(false)
    openStepTwoModal()
  }
  const _submitStepTwoModal = () => {
    // validate input
    setStepTwoModalVisibility(false)
    openStepThreeModal()
  }
  const _submitStepThreeModal = () => {
    // validate input
    setStepThreeModalVisibility(false)
    dispatch(createValidator(modalControl))
      .unwrap()
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
        // TODO: show fallback page
      })
    // make a request to server
  }

  const editValidator = (id: string) => {
    alert(id)
  }

  return (
    <div className={styles.AppView}>
      <StepOneModal
        openModal={stepOneModalVisibility}
        closeModal={closeStepOneModal}
        closeModalOnOverlayClick={false}
        modalTitle="Register Validators"
        closeIconVisibility={true}
        _handleChange={_handleChange}
        modalControl={modalControl}
        _submitModal={_submitStepOneModal}
      />
      <StepTwoModal
        openModal={stepTwoModalVisibility}
        closeModal={closeStepTwoModal}
        closeModalOnOverlayClick={false}
        modalTitle="Register Validators"
        closeIconVisibility={true}
        _handleChange={_handleChange}
        modalControl={modalControl}
        _submitModal={_submitStepTwoModal}
      />
      <StepThreeModal
        openModal={stepThreeModalVisibility}
        closeModal={closeStepThreeModal}
        closeModalOnOverlayClick={false}
        modalTitle="Register Validators"
        closeIconVisibility={true}
        _handleChange={_handleChange}
        modalControl={modalControl}
        _submitModal={_submitStepThreeModal}
      />
      <section className="px-8 py-4">
        <div className="flex justify-between items-center shadow-md p-4 rounded-xl">
          <div className="flex">
            <div className="w-14 h-14 bg-safe-light-blue-tint flex justify-center items-center rounded-xl">
              <img src={userIcon} alt="user icon" />
            </div>
            <div className="ml-2 flex flex-col justify-center">
              <p className="text-black font-semibold">
                {validatorArray.length}
              </p>
              <small className="text-safe-text-light-gray-tint text-xm">
                validators
              </small>
            </div>
          </div>
          <img
            onClick={openStepOneModal}
            src={addIcon}
            alt="add icon"
            className="cursor-pointer"
          />
        </div>
      </section>

      <section className={styles.validators}>
        <div className="rounded-xl shadow-md h-full overflow-y-scroll no-scrollbar">
          <ul className="flex items-center justify-between border-b-[1px] py-3 px-7 ">
            <li className="text-safe-text-gray-shade flex gap-10">
              <div className="h-6 w-6 bg-safe-white-shade rounded-md shadow-lg cursor-pointer"></div>
              <p className="text-sm">Name</p>
            </li>
            <li className="text-safe-text-gray-shade text-sm">Email</li>
            <li className="text-safe-text-gray-shade text-sm">Phone Number</li>
            <li className="text-safe-text-gray-shade text-sm relative w-[140px]">
              <p className="w-36 absolute right-20 -top-3">
                Backup Phone Number
              </p>
            </li>
            <li className="text-safe-text-gray-shade text-sm relative -top-3">
              <p className="absolute right-14  w-24">Social Media</p>
            </li>
          </ul>

          {validatorArray.map((validator: any, index) => {
            return (
              <Validator
                key={index}
                // userImg={validator.userImg}
                userImg={"../../../../../assets/images/user.svg"}
                userName={validator.name}
                email={validator.primary_email}
                phoneNumber={validator.phone_number}
                backupPhoneNumber={validator.backup_phone_number}
                id={validator.id}
                editValidator={editValidator}
              />
            )
          })}
        </div>
      </section>
    </div>
  )
}

function Validator(_props: {
  userImg: string
  userName: string
  email: string
  phoneNumber: string
  backupPhoneNumber: string
  id: string
  editValidator: any
}) {
  return (
    <ul className="grid grid-cols-5 items-center py-3 px-7 ">
      <li className=" flex items-center gap-4">
        <img src={userImg} alt="user image" className="rounded-full" />
        <p className="font-semibold">{_props.userName}</p>
      </li>
      <li className="font-semibold text-sm max-w-48 justify-self-center pr-9">
        {_props.email}
      </li>
      <li className="font-semibold text-sm max-w-48 justify-self-center">
        {_props.phoneNumber}
      </li>
      <li className="font-semibold text-sm max-w-48 justify-self-center">
        {_props.backupPhoneNumber}
      </li>
      <li className="flex gap-10 max-w-56 justify-self-end">
        <div className="flex gap-3">
          <img
            src={facebook}
            alt="facebook logo"
            className="w-5 cursor-pointer "
          />
          <img
            src={instagram}
            alt="instagram logo"
            className="w-5 cursor-pointer "
          />
          <img
            src={twitter}
            alt="twitter logo"
            className="w-5 cursor-pointer "
          />
        </div>
        <img
          onClick={() => {
            _props.editValidator(_props.id)
          }}
          src={dots}
          alt="dots"
          className="w-6 cursor-pointer"
        />
      </li>
    </ul>
  )
}
