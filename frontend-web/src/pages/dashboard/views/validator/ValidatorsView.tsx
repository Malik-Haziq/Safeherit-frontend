import styles from "../../Dashboard.module.css"
import userIcon from "../../../../../assets/images/user-icon.svg"
import addIcon from "../../../../../assets/images/add-icon.svg"
import facebook from "../../../../../assets/images/facebook.svg"
import instagram from "../../../../../assets/images/insta.svg"
import twitter from "../../../../../assets/images/twitter.svg"
import userImg from "../../../../../assets/images/user.svg"
import validatorImage from "../../../../../assets/images/validator-screen.svg"
import { ValidatorDropDown } from "../../../../components"

import {
  StepZeroInformationModal,
  StepOneModal,
  StepTwoModal,
  StepThreeModal,
  StepFourSuccessModal,
} from "./modal_validator"
import { useEffect, useMemo, useState } from "react"
import {
  getAllValidator,
  createValidator,
  findValidator,
  updateValidator,
  deleteValidator
} from "../../../../redux/actions/ValidatorAction"
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks"
import { DeleteValidatorModal } from "../../../../components/modal/deleteValidatorModal"
import { useNavigate } from "react-router-dom"
import { isValidEmail, isValidFacebook, isValidPhone } from "../../../../common"

const initialState = {
  id: "",
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
  const navigate = useNavigate()

  const [hasValidators, setHasValidators] = useState(-1)
  const [modalControl, setModalControl] = useState(initialState)
  const [modalAction, setModalAction] = useState('')
  const [deleteModalVisibility, setDeleteModalVisibility] = useState(false)
  const [stepOneModalVisibility, setStepOneModalVisibility] = useState(false)
  const [stepTwoModalVisibility, setStepTwoModalVisibility] = useState(false)
  const [stepThreeModalVisibility, setStepThreeModalVisibility] = useState(false)
  const [stepFourModalVisibility, setStepFourModalVisibility] = useState(false)
  const [stepZeroModalVisibility, setStepZeroModalVisibility] = useState(false)

  const validatorArray = useAppSelector(
    (state) => state.validator.validator_array,
  )
  const updateValidatorArrayCount = (res?: {data: {data: []}}) => {
    if (res?.data.data && res?.data?.data.length > 0) {
      setHasValidators(1)
    } else {
      setHasValidators(0)
    }
  }
  useEffect(() => {
    dispatch(getAllValidator({}))
      .unwrap()
      .then((res) => {
        updateValidatorArrayCount(res)
      })
      .catch(() => {
        // TODO: show fallback page
      })
  }, [])

  const modalOperations = useMemo(() => {
    return {
      closeStepOneModal: () => {
        setModalControl(initialState)
        setStepOneModalVisibility(false)
      },
      closeStepTwoModal: () => {
        setModalControl(initialState)
        setStepTwoModalVisibility(false)
      },
      closeStepThreeModal: () => {
        setModalControl(initialState)
        setStepThreeModalVisibility(false)
      },
      closeDeleteModal: () => {
        setModalControl(initialState)
        setDeleteModalVisibility(false)
      },
      closeStepFourModal: () => {
        setModalControl(initialState)
        setStepFourModalVisibility(false)
      },
      closeStepZeroModal: () => {
        setStepZeroModalVisibility(false)
      },
      
      openStepOneModal: () => {
        setStepOneModalVisibility(true)
      },
      openStepTwoModal: () => {
        setStepTwoModalVisibility(true)
      },
      openStepThreeModal: () => {
        setStepThreeModalVisibility(true)
      },
      openDeleteModal: () => {
        setDeleteModalVisibility(true)
      },
      openStepFourModal: () => {
        setStepFourModalVisibility(true)
      },
      openStepZeroModal: () => {
        setStepZeroModalVisibility(true)
      },
    }
  }, [])

  const _submitStepOneModal = () => {
    if (!modalControl.name) {
      alert("please enter a valid input")
    }
    else if (
      !isValidEmail(modalControl.primary_email) ||
      !isValidEmail(modalControl.backup_email) || 
      !isValidEmail(modalControl.backup_email2)
    ) {
      alert("please enter a valid Email address")
    }
    else if (
      !isValidPhone(modalControl.phone_number) ||
      !isValidPhone(modalControl.backup_phone_number)
    ) {
      alert("please enter valid Phone number")
    }
    else {
      setStepOneModalVisibility(false)
      modalOperations.openStepTwoModal()
    }
  }
  const _submitStepTwoModal = () => {
    if (!isValidFacebook(modalControl.facebook_link)) {
      alert("please enter valid facebook")
    }
    else if(!modalControl.instagram_username) {
      alert("please enter valid instagram username")
    }
    else if(!modalControl.twitter_username) {
      alert("please enter valid twitter username")
    }
    else {
      setStepTwoModalVisibility(false)
      modalOperations.openStepThreeModal()
    }
  }
  const _submitStepThreeModal = () => {
    // validate input
    
    if (modalAction == 'edit') {
      dispatch(updateValidator(modalControl))
        .unwrap()
        .then((res) => {
          dispatch(getAllValidator({}))
            .unwrap()
            .then((res) => {
              modalOperations.closeStepThreeModal()
              updateValidatorArrayCount(res)
            })
            .catch(() => {
              // TODO: show fallback page
            })
        })
        .catch((err) => {
          console.log(err)
          // TODO: show fallback page
        })
    } 
    else if (modalAction == 'create') {
      dispatch(createValidator(modalControl))
        .unwrap()
        .then((res) => {
          dispatch(getAllValidator({}))
          .unwrap()
          .then((res) => {
            modalOperations.closeStepThreeModal()
            modalOperations.openStepFourModal()
            updateValidatorArrayCount(res)
          })
          .catch(() => {
            // TODO: show fallback page
          })
        })
        .catch((err) => {
          console.log(err)
          // TODO: show fallback page
        })
    }
  }
  const _submitDeleteModal = () => {
    dispatch(deleteValidator({id: modalControl.id})).unwrap()
    .then((res) => {
      dispatch(getAllValidator({}))
      .unwrap()
      .then((res) => {
        modalOperations.closeDeleteModal()
        updateValidatorArrayCount(res)
      })
      .catch(() => {
        // TODO: show fallback page
      })
    })
  }
  const _submitStepZeroModal = () => {
    modalOperations.closeStepZeroModal()
    newValidator()
  }

  const _handleChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target
    setModalControl({ ...modalControl, [name]: value })
  }
  const newValidator = () => {
    setModalAction('create')
    setModalControl(initialState)
    modalOperations.openStepOneModal()
  }
  const editValidator = (id: string) => {
    dispatch(findValidator({id: id})).unwrap()
    .then((res) => {
      setModalAction('edit')
      setModalControl(res?.data?.data)
      modalOperations.openStepOneModal()
    })
  }
  const destroyValidator = (id: string) => {
    dispatch(findValidator({id: id})).unwrap()
    .then((res) => {
      setModalAction('delete')
      setModalControl(res?.data?.data)
      modalOperations.openDeleteModal()
    })
  }
  const registerAnotherValidator = () => {
    modalOperations.closeStepFourModal()
    setModalAction('create')
    modalOperations.openStepOneModal()
  }
  const pulseCheck = () => {
    navigate("/dashboard/pulse")
  }

  return (
    <>
      <StepZeroInformationModal
        openModal={stepZeroModalVisibility}
        closeModal={modalOperations.closeStepZeroModal}
        closeModalOnOverlayClick={false}
        modalTitle= {"Register Validators"}
        closeIconVisibility={true}
        _submitModal={_submitStepZeroModal}
      />
      <StepFourSuccessModal
        openModal={stepFourModalVisibility}
        closeModal={modalOperations.closeStepFourModal}
        closeModalOnOverlayClick={false}
        modalTitle= {"Validator Registered"}
        closeIconVisibility={true}
        registerAnother={registerAnotherValidator}
        pulseCheck={pulseCheck}
      />
      <DeleteValidatorModal
        closeModalOnOverlayClick={false}
        openModal={deleteModalVisibility}
        closeModal={modalOperations.closeDeleteModal}
        _submitModal={_submitDeleteModal}
      />
      <StepOneModal
        openModal={stepOneModalVisibility}
        closeModal={modalOperations.closeStepOneModal}
        closeModalOnOverlayClick={false}
        modalTitle="Register Validators"
        closeIconVisibility={true}
        _handleChange={_handleChange}
        modalControl={modalControl}
        _submitModal={_submitStepOneModal}
      />
      <StepTwoModal
        openModal={stepTwoModalVisibility}
        closeModal={modalOperations.closeStepTwoModal}
        closeModalOnOverlayClick={false}
        modalTitle="Register Validators"
        closeIconVisibility={true}
        _handleChange={_handleChange}
        modalControl={modalControl}
        _submitModal={_submitStepTwoModal}
      />
      <StepThreeModal
        openModal={stepThreeModalVisibility}
        closeModal={modalOperations.closeStepThreeModal}
        closeModalOnOverlayClick={false}
        modalTitle="Register Validators"
        closeIconVisibility={true}
        _handleChange={_handleChange}
        modalControl={modalControl}
        _submitModal={_submitStepThreeModal}
      />
      {
        hasValidators == -1 ?
        <div>Loading Validators</div>
        : hasValidators == 0 ?
        <AddValidators 
          openStepZeroModal={modalOperations.openStepZeroModal}
        /> : 
        <Validators 
          validatorArray={validatorArray}
          createValidator={newValidator}
          editValidator={editValidator}
          deleteValidator={destroyValidator}
        /> 
      }
    </>
  )
}

function AddValidators(_props: {
  openStepZeroModal: React.MouseEventHandler<HTMLButtonElement>
}) {

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
          onClick={_props.openStepZeroModal}
          className="primary-btn rounded-2xl py-3 px-9 bg-[#0971AA]"
        >
          Register Validators
        </button>
      </main>
    </div>
  )
}

function Validators(_props: {
  validatorArray: any
  createValidator: React.MouseEventHandler<HTMLImageElement>
  editValidator: Function
  deleteValidator: Function
}) {
  return (
    <div className={styles.AppView}>
      <section className="px-8 py-4">
        <div className="flex justify-between items-center shadow-md p-4 rounded-xl">
          <div className="flex">
            <div className="w-14 h-14 bg-safe-light-blue-tint flex justify-center items-center rounded-xl">
              <img src={userIcon} alt="user icon" />
            </div>
            <div className="ml-2 flex flex-col justify-center">
              <p className="text-black font-semibold">
                {_props.validatorArray.length}
              </p>
              <small className="text-safe-text-light-gray-tint text-xm">
                validators
              </small>
            </div>
          </div>
          <img
            onClick={_props.createValidator}
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

          {_props.validatorArray.map((validator: any, index: number) => {
            return (
              <Validator
                key={index}
                // userImg={validator.userImg} TODO
                userImg={"../../../../../assets/images/user.svg"}
                userName={validator.name}
                email={validator.primary_email}
                phoneNumber={validator.phone_number}
                backupPhoneNumber={validator.backup_phone_number}
                id={validator.id}
                editValidator={_props.editValidator}
                deleteValidator={_props.deleteValidator}
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
  editValidator: Function
  deleteValidator: Function
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
        <div className="relative">
          <ValidatorDropDown
            id={_props.id}
            editValidator={_props.editValidator}
            deleteValidator={_props.deleteValidator}
          />
        </div>
      </li>
    </ul>
  )
}
