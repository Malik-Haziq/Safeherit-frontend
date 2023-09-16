import styles from "../../Dashboard.module.css"
import userIcon from "../../../../../assets/images/user-icon.svg"
import addIcon from "../../../../../assets/images/add-icon.svg"
import dots from "../../../../../assets/images/dots.svg"
import facebook from "../../../../../assets/images/facebook.svg"
import instagram from "../../../../../assets/images/insta.svg"
import twitter from "../../../../../assets/images/twitter.svg"
import userImg from "../../../../../assets/images/user.svg"
import beneficiaryImg from "../../../../../assets/images/beneficiaryScreen.svg"
import { ValidatorDropDown } from "../../../../components"
import { UserDetailsModal } from "../../../../components/modal/UserDetailsModal"

import {
  StepZeroInformationModal,
  SuccessModal,
  StepOneModal,
  StepTwoModal,
  StepThreeModal,
  RegisterPKModal,
} from "./modal_beneficiary"
import { useCallback, useEffect, useState } from "react"
import {
  getAllBeneficiary,
  createBeneficiary,
  findBeneficiary,
  updateBeneficiary,
  deleteBeneficiary,
} from "../../../../redux/actions/BeneficiaryAction"
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks"
import { ConfirmationModal } from "../../../../components/modal/ConfirmationModal"
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
  personalized_message: "",
  personalized_video_link: "",
  image: "",
}

export default function BeneficiariesView() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [hasBeneficiaries, setHasBeneficiaries] = useState(-1)
  const [modalControl, setModalControl] = useState(initialState)
  const [modalAction, setModalAction] = useState("")
  const [modalVisibility, setModalVisibility] = useState("none")

  const beneficiaryArray = useAppSelector(
    (state) => state.beneficiary.beneficiary_array,
  )
  const updateBeneficiaryArrayCount = (res?: { data?: { data: [] } }) => {
    if (res?.data?.data && res?.data?.data.length > 0) {
      setHasBeneficiaries(1)
    } else {
      setHasBeneficiaries(0)
    }
  }
  useEffect(() => {
    dispatch(getAllBeneficiary({}))
      .unwrap()
      .then((res) => {
        updateBeneficiaryArrayCount(res)
      })
      .catch(() => {
        // TODO: show fallback page
      })
  }, [])

  const closeModal = useCallback(() => {
    setModalControl(initialState)
    setModalVisibility("none")
  }, [])

  const addBeneficiary = useCallback(() => {
    setModalVisibility("Step-0")
  }, [])

  const _submitStepOneModal = () => {
    if (!modalControl.name) {
      alert("please enter a valid name")
    } else if (
      !isValidEmail(modalControl.primary_email) &&
      !isValidEmail(modalControl.backup_email) &&
      !isValidEmail(modalControl.backup_email2)
    ) {
      alert("please enter a valid Email address")
    } else if (
      !isValidPhone(modalControl.phone_number) &&
      !isValidPhone(modalControl.backup_phone_number)
    ) {
      alert("please enter valid Phone number")
    } else {
      setModalVisibility("Step-2")
    }
  }
  const _submitStepTwoModal = () => {
    if (!modalControl.facebook_link && !modalControl.instagram_username && !modalControl.twitter_username) {
      alert("Atleast 1 social media accounts is compulsory")
    } else {
      setModalVisibility("Step-3")
    }
  }
  const _submitStepThreeModal = () => {
    if (!modalControl.personalized_message) {
      alert("Personalized message cannot be empty")
    } else {
      if (modalAction == "edit") {
        dispatch(updateBeneficiary(modalControl))
          .unwrap()
          .then((res) => {
            dispatch(getAllBeneficiary({}))
              .unwrap()
              .then((res) => {
                setModalVisibility("Step-pk")
                updateBeneficiaryArrayCount(res)
              })
              .catch(() => {
                // TODO: show fallback page
              })
          })
          .catch((err) => {
            console.log(err)
            // TODO: show fallback page
          })
      } else if (modalAction == "create") {
        alert("creating beneficiary")
        dispatch(createBeneficiary(modalControl))
          .unwrap()
          .then((res) => {
            dispatch(getAllBeneficiary({}))
              .unwrap()
              .then((res) => {
                setModalVisibility("Step-success")
                updateBeneficiaryArrayCount(res)
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
  }
  const _submitSuccessModal = () => {
    setModalControl(initialState)
    setModalVisibility("none")
  }
  const _submitRegisterPKModal = () => {
    if (modalAction == "create") {
      setModalVisibility("Step-1")
    } else {
      setModalVisibility("Step-success")
    }
  }
  const _submitDeleteModal = () => {
    alert("deleting Beneficiary " + modalControl.name)
    dispatch(deleteBeneficiary({ id: modalControl.id }))
      .unwrap()
      .then((res) => {
        dispatch(getAllBeneficiary({}))
          .unwrap()
          .then((res) => {
            setModalVisibility("none")
            updateBeneficiaryArrayCount(res)
          })
          .catch(() => {
            // TODO: show fallback page
          })
      })
  }
  const _submitStepZeroModal = () => {
    newBeneficiary()
  }

  const _handleChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target
    if ((name == "phone_number" || name == "backup_phone_number" )) {
      if (isValidPhone(value)) {
        setModalControl({ ...modalControl, [name]: value })
      }
    } else {
      setModalControl({ ...modalControl, [name]: value })
    }
  }
  const newBeneficiary = () => {
    setModalAction("create")
    setModalControl(initialState)
    setModalVisibility("Step-pk")
  }
  const editBeneficiary = (id: string) => {
    dispatch(findBeneficiary({ id: id }))
      .unwrap()
      .then((res) => {
        setModalAction("edit")
        setModalControl(res?.data?.data)
        setModalVisibility("Step-1")
      })
  }
  const destroyBeneficiary = (id: string) => {
    dispatch(findBeneficiary({ id: id }))
      .unwrap()
      .then((res) => {
        setModalAction("delete")
        setModalControl(res?.data?.data)
        setModalVisibility("Step-delete")
      })
  }
  const registerAnotherBeneficiary = () => {
    newBeneficiary()
  }
  const gotoValidators = () => {
    navigate("/dashboard/validators")
  }
  const viewBeneficiary = (id: string) => {
    alert("showing user data")
    dispatch(findBeneficiary({ id: id }))
      .unwrap()
      .then((res) => {
        setModalAction("view")
        setModalControl(res?.data?.data)
        setModalVisibility("User-Info")
      })
  }

  return (
    <>
      <UserDetailsModal
        openModal={modalVisibility == "User-Info"}
        closeModal={closeModal}
        closeModalOnOverlayClick={false}
        view="beneficiary"
        closeIconVisibility={true}
        modalControl={modalControl}
      />
      <StepOneModal
        openModal={modalVisibility == "Step-1"}
        closeModal={closeModal}
        closeModalOnOverlayClick={false}
        closeIconVisibility={true}
        action={modalAction}
        _handleChange={_handleChange}
        modalControl={modalControl}
        _submitModal={_submitStepOneModal}
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
      />
      <StepThreeModal
        openModal={modalVisibility == "Step-3"}
        closeModal={closeModal}
        closeModalOnOverlayClick={false}
        closeIconVisibility={true}
        action={modalAction}
        _handleChange={_handleChange}
        modalControl={modalControl}
        _submitModal={_submitStepThreeModal}
      />
      <SuccessModal
        openModal={modalVisibility == "Step-success"}
        closeModal={closeModal}
        closeModalOnOverlayClick={false}
        closeIconVisibility={true}
        action={modalAction}
        registerAnotherBeneficiary={registerAnotherBeneficiary}
        gotoValidators={gotoValidators}
        _submitModal={_submitSuccessModal}
      />
      <RegisterPKModal
        openModal={modalVisibility == "Step-pk"}
        closeModal={closeModal}
        closeModalOnOverlayClick={false}
        closeIconVisibility={true}
        action={modalAction}
        _submitModal={_submitRegisterPKModal}
        _handleKeyGeneration={() => {
          alert("generate key pair")
        }}
      />
      <ConfirmationModal
        openModal={modalVisibility == "Step-delete"}
        closeModalOnOverlayClick={false}
        closeModal={closeModal}
        _submitModal={_submitDeleteModal}
        heading="Sure You Want to Remove Beneficiaries"
        body="beneficiary will not be informed he was removed"
      />
      <StepZeroInformationModal
        openModal={modalVisibility == "Step-0"}
        closeModal={closeModal}
        closeModalOnOverlayClick={false}
        closeIconVisibility={true}
        action={modalAction}
        _submitModal={_submitStepZeroModal}
      />
      {hasBeneficiaries == -1 ? (
        <div>Loading Beneficiary</div>
      ) : hasBeneficiaries == 0 ? (
        <AddBeneficiary openStepZeroModal={addBeneficiary} />
      ) : (
        <Beneficiaries
          beneficiaryArray={beneficiaryArray}
          createBeneficiary={newBeneficiary}
          editBeneficiary={editBeneficiary}
          deleteBeneficiary={destroyBeneficiary}
          viewBeneficiary={viewBeneficiary}
        />
      )}
    </>
  )
}

function AddBeneficiary(_props: {
  openStepZeroModal: React.MouseEventHandler<HTMLButtonElement>
}) {
  return (
    <div className="h-[calc(100vh-83px)] p-7">
      <main className="flex flex-col items-center justify-center shadow-xl h-full rounded-2xl">
        <img
          src={beneficiaryImg}
          className="mb-10"
          alt="validator screen image"
        />
        <h2 className="text-[#00192B] text-xl font-bold mb-2">
          No Beneficiaries
        </h2>
        <p className="text-[#868686] font-medium mb-10">
          There is no any Beneficiaries in your Board please create
          beneficiaries.
        </p>
        <button
          onClick={_props.openStepZeroModal}
          className="primary-btn rounded-2xl py-3 px-9 bg-[#0971AA]"
        >
          Register Beneficiaries
        </button>
      </main>
    </div>
  )
}

function Beneficiaries(_props: {
  beneficiaryArray: any
  createBeneficiary: React.MouseEventHandler<HTMLImageElement>
  editBeneficiary: Function
  deleteBeneficiary: Function
  viewBeneficiary: Function
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
                {_props.beneficiaryArray.length}
              </p>
              <small className="text-safe-text-light-gray-tint text-xm">
                Beneficiaries
              </small>
            </div>
          </div>
          <img
            onClick={_props.createBeneficiary}
            src={addIcon}
            alt="add icon"
            className="cursor-pointer"
          />
        </div>
      </section>

      <section className={styles.beneficiaries}>
        <div className="rounded-xl shadow-md h-full overflow-y-scroll no-scrollbar">
          <ul className="flex items-center justify-between border-b-[1px] py-3 px-7 ">
            <li className="text-safe-text-gray-shade flex gap-10">
              <div className="relative">
                <input type="checkbox" id="checkbox" />
                <label
                  htmlFor="checkbox"
                  className="checkbox-label ml-1 -top-1"
                >
                  <div className="check_mark"></div>
                </label>
              </div>
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

          {_props.beneficiaryArray.map((beneficiary: any, index: number) => {
            return (
              <Beneficiary
                key={index}
                // userImg={beneficiary.userImg} TODO
                userImg={"../../../../../assets/images/user.svg"}
                userName={beneficiary.name}
                email={beneficiary.primary_email}
                phoneNumber={beneficiary.phone_number}
                backupPhoneNumber={beneficiary.backup_phone_number}
                facebook_link={beneficiary.facebook_link}
                instagram_username={beneficiary.instagram_username}
                twitter_username={beneficiary.twitter_username}
                id={beneficiary.id}
                editBeneficiary={_props.editBeneficiary}
                deleteBeneficiary={_props.deleteBeneficiary}
                viewBeneficiary={_props.viewBeneficiary}
              />
            )
          })}
        </div>
      </section>
    </div>
  )
}

function Beneficiary(_props: {
  userImg: string
  userName: string
  email: string
  phoneNumber: string
  backupPhoneNumber: string
  facebook_link: string
  instagram_username: string
  twitter_username: string
  id: string
  editBeneficiary: Function
  deleteBeneficiary: Function
  viewBeneficiary: Function
}) {
  return (
    <ul className="grid grid-cols-5 items-center py-3 px-7 text-safe-text-black-tint">
      <li className="flex items-center gap-4 text-black">
        <img src={userImg} alt="user image" className="rounded-full" />
        <p
          className="font-semibold cursor-pointer"
          onClick={() => _props.viewBeneficiary(_props.id)}
        >
          {_props.userName}
        </p>
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
          <a href={_props.facebook_link} target="_blank" rel="noopener noreferrer">
            <img
              src={facebook}
              alt="facebook logo"
              className="w-5 cursor-pointer"
            />
          </a>
          <a href={`https://www.instagram.com/${_props.instagram_username}/`} target="_blank" rel="noopener noreferrer">
            <img
              src={instagram}
              alt="instagram logo"
              className="w-5 cursor-pointer"
            />
          </a>
          <a href={`https://twitter.com/${_props.twitter_username}/`} target="_blank" rel="noopener noreferrer">
            <img
              src={twitter}
              alt="twitter logo"
              className="w-5 cursor-pointer"
            />
          </a>
        </div>
        <div className="relative">
          <ValidatorDropDown
            id={_props.id}
            editValidator={_props.editBeneficiary}
            deleteValidator={_props.deleteBeneficiary}
          />
        </div>
      </li>
    </ul>
  )
}
