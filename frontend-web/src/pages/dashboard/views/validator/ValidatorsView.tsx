import React from "react"
import userIcon from "@images/user-icon.svg"
import addIcon from "@images/add-icon.svg"
import facebook from "@images/facebook.svg"
import instagram from "@images/insta.svg"
import twitter from "@images/twitter.svg"
import userImg from "@images/user.svg"
import validatorImage from "@images/validator-screen.svg"

import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from "../../Dashboard.module.css"
import {
  ValidatorDropDown,
  ConfirmationModal,
  UserDetailsModal,
  Spinner,
  toast,
} from "@/components"
import {
  StepZeroInformationModal,
  StepOneModal,
  StepTwoModal,
  StepThreeModal,
  StepFourSuccessModal,
  EditValidatorModal,
} from "./modal_validator"
import {
  getAllValidator,
  createValidator,
  findValidator,
  updateValidator,
  deleteValidator,
} from "@redux/actions"
import { useAppDispatch, useAppSelector } from "@redux/hooks"
import {
  isValidEmail,
  getFileFromFirebase,
  isValidPhoneWithRegion,
  useArray,
} from "@/common"
import { setLoaderVisibility } from "@/redux/reducers/LoaderSlice"

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
  profile_image: "",
  inform_validator: false,
}

export default function ValidatorsView() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const user = useAppSelector((state) => state.user)

  const startLoader = () => dispatch<any>(setLoaderVisibility(true))
  const stopLoader = () => dispatch<any>(setLoaderVisibility(false))

  const [hasValidators, setHasValidators] = useState(-1)
  const [modalControl, setModalControl] = useState(initialState)
  const [imageUpload, setImageUpload] = useState("")
  const [modalAction, setModalAction] = useState("")
  const [modalVisibility, setModalVisibility] = useState("none")
  const [
    modalHistory,
    modalHistoryLength,
    modalHistoryPop,
    modalHistoryPush,
    modalHistoryPopAll,
  ] = useArray()

  const validatorArray = useAppSelector(
    (state) => state.validator.validator_array,
  )
  const updateValidatorArrayCount = (res?: { data?: { data: [] } }) => {
    if (res?.data?.data && res?.data?.data.length > 0) {
      setHasValidators(1)
    } else {
      setHasValidators(0)
    }
  }
  useEffect(() => {
    dispatch<any>(getAllValidator({}))
      .unwrap()
      .then((res: any) => {
        updateValidatorArrayCount(res)
      })
      .catch(() => {
        // TODO: show fallback page
      })
  }, [])

  useEffect(() => {
    modalHistoryPopAll()
  }, [])

  const closeModal = useCallback(() => {
    setModalControl(initialState)
    setModalVisibility("none")
    setImageUpload("")
    modalHistoryPopAll()
  }, [])

  const addValidator = useCallback(() => {
    setModalVisibility("Step-0")
  }, [])

  const _submitStepOneModal = () => {
    if (!modalControl.name) {
      toast("please enter a valid name", "error")
    } else if (
      (!isValidEmail(modalControl.primary_email) &&
        !isValidEmail(modalControl.backup_email2) &&
        !isValidEmail(modalControl.backup_email)) ||
      (modalControl.primary_email &&
        !isValidEmail(modalControl.primary_email)) ||
      (modalControl.backup_email && !isValidEmail(modalControl.backup_email)) ||
      (modalControl.backup_email2 && !isValidEmail(modalControl.backup_email2))
    ) {
      toast("please enter a valid Email address", "error")
    } else if (
      modalControl.phone_number &&
      !isValidPhoneWithRegion(modalControl.phone_number)
    ) {
      toast("Please enter a valid phone number", "error")
    } else if (
      modalControl.backup_phone_number &&
      !isValidPhoneWithRegion(modalControl.backup_phone_number)
    ) {
      toast("Please enter a valid phone number", "error")
    } else {
      modalHistoryPush("Step-1")
      setModalVisibility("Step-2")
    }
  }

  const _submitStepTwoModal = () => {
    const facebookRegex = /^https?:\/\/(www\.)?facebook\.com\/.*/i
    const instagramRegex = /^https?:\/\/(www\.)?instagram\.com\/.*/i
    const twitterRegex = /^https?:\/\/(www\.)?twitter\.com\/.*/i

    if (
      modalControl.facebook_link &&
      !facebookRegex.test(modalControl.facebook_link)
    ) {
      toast("Please enter a valid facebook link", "error")
    } else if (
      modalControl.instagram_username &&
      !instagramRegex.test(modalControl.instagram_username)
    ) {
      toast("Please enter a valid instagram link", "error")
    } else if (
      modalControl.twitter_username &&
      !twitterRegex.test(modalControl.twitter_username)
    ) {
      toast("Please enter a valid twitter link", "error")
    } else {
      modalHistoryPush("Step-2")
      setModalVisibility("Step-3")
    }
  }

  const _submitStepThreeModal = () => {
    if (!modalControl.personalized_message) {
      modalControl.personalized_message = `Dear ${modalControl.name}, \n\nIf you receive this message it probably means I am gone. \n\nSince you’re one of the closest people to me, you probably know if am still alive or not. If I’m indeed dead, please confirm it as per the instructions of this platform (SafeHerit). \n\nThis will help me a lot in making sure that my family gets access to its inheritance as quickly as possible. \n\nThank you buddy, I’m counting on you! \n\n${user.displayName}`
    }
    if (modalAction == "edit") {
      startLoader()
      toast("Updating validator", "info")
      dispatch<any>(updateValidator(modalControl))
        .unwrap()
        .then(() => {
          dispatch<any>(getAllValidator({}))
            .unwrap()
            .then((res: any) => {
              closeModal()
              updateValidatorArrayCount(res)
            })
            .catch(() => {
              // TODO: show fallback page
            })
        })
        .catch((err: any) => {
          console.log(err)
          // TODO: show fallback page
        })
        .finally(() => {
          stopLoader()
        })
    } else if (modalAction == "create") {
      startLoader()
      toast("Creating validator", "info")
      dispatch<any>(createValidator(modalControl))
        .unwrap()
        .then(() => {
          dispatch<any>(getAllValidator({}))
            .unwrap()
            .then((res: any) => {
              modalHistoryPush("Step-3")
              setModalVisibility("Step-4")
              updateValidatorArrayCount(res)
            })
            .catch(() => {
              // TODO: show fallback page
            })
        })
        .catch((err: any) => {
          console.log(err)
          // TODO: show fallback page
        })
        .finally(() => {
          stopLoader()
        })
    }
  }
  const _submitDeleteModal = () => {
    dispatch<any>(deleteValidator({ id: modalControl.id }))
      .unwrap()
      .then(() => {
        dispatch<any>(getAllValidator({}))
          .unwrap()
          .then((res: any) => {
            closeModal()
            updateValidatorArrayCount(res)
          })
          .catch(() => {
            // TODO: show fallback page
          })
      })
  }
  const _submitStepZeroModal = () => {
    newValidator()
  }

  const _handleChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target
    setModalControl({ ...modalControl, [name]: value })
  }
  const newValidator = () => {
    setModalAction("create")
    setModalControl(initialState)
    setImageUpload("")
    modalHistoryPush("Step-0")
    setModalVisibility("Step-1")
  }
  const editValidator = (id: string) => {
    startLoader()
    dispatch<any>(findValidator({ id: id }))
      .unwrap()
      .then((res: any) => {
        setModalAction("edit")
        setModalControl(res?.data?.data)
        getFileFromFirebase(res?.data?.data?.profile_image)
          .then((res) => {
            setImageUpload(res)
          })
          .catch(() => {
            setImageUpload("")
          })
        setModalVisibility("edit-validator")
      })
      .finally(() => {
        stopLoader()
      })
  }
  const destroyValidator = (id: string) => {
    dispatch<any>(findValidator({ id: id }))
      .unwrap()
      .then((res: any) => {
        setModalAction("delete")
        setModalControl(res?.data?.data)
        setModalVisibility("Step-delete")
      })
  }
  const registerAnotherValidator = () => {
    newValidator()
  }
  const pulseCheck = () => {
    navigate("/dashboard/pulse")
  }
  const viewValidator = (id: string) => {
    toast("showing user data", "info")
    dispatch<any>(findValidator({ id: id }))
      .unwrap()
      .then((res: any) => {
        setModalAction("view")
        setModalControl(res?.data?.data)
        getFileFromFirebase(res?.data?.data?.profile_image)
          .then((res) => {
            setImageUpload(res)
          })
          .catch(() => {
            setImageUpload("")
          })

        setModalVisibility("User-Info")
      })
  }
  const showPreviousModal = () => {
    const lastEl = modalHistory[modalHistoryLength - 1] || "none"
    modalHistoryPop()
    setModalVisibility(lastEl)
  }

  const _handleDiscard = (name: string, value: any) => {
    setModalControl({ ...modalControl, [name]: value })
  }

  const _submitEditValidatorModal = () => {
    const facebookRegex = /^https?:\/\/(www\.)?facebook\.com\/.*/i
    const instagramRegex = /^https?:\/\/(www\.)?instagram\.com\/.*/i
    const twitterRegex = /^https?:\/\/(www\.)?twitter\.com\/.*/i

    if (!modalControl.name) {
      toast("please enter a valid name", "error")
    } else if (
      (!isValidEmail(modalControl.primary_email) &&
        !isValidEmail(modalControl.backup_email2) &&
        !isValidEmail(modalControl.backup_email)) ||
      (modalControl.primary_email &&
        !isValidEmail(modalControl.primary_email)) ||
      (modalControl.backup_email && !isValidEmail(modalControl.backup_email)) ||
      (modalControl.backup_email2 && !isValidEmail(modalControl.backup_email2))
    ) {
      toast("please enter a valid Email address", "error")
    } else if (
      modalControl.phone_number &&
      !isValidPhoneWithRegion(modalControl.phone_number)
    ) {
      toast("Please enter a valid phone number", "error")
    } else if (
      modalControl.backup_phone_number &&
      !isValidPhoneWithRegion(modalControl.backup_phone_number)
    ) {
      toast("Please enter a valid phone number", "error")
    } else if (
      modalControl.facebook_link &&
      !facebookRegex.test(modalControl.facebook_link)
    ) {
      toast("Please enter a valid facebook link", "error")
    } else if (
      modalControl.instagram_username &&
      !instagramRegex.test(modalControl.instagram_username)
    ) {
      toast("Please enter a valid instagram link", "error")
    } else if (
      modalControl.twitter_username &&
      !twitterRegex.test(modalControl.twitter_username)
    ) {
      toast("Please enter a valid twitter link", "error")
    } else if (!modalControl.personalized_message) {
      toast("Personalized message cannot be empty", "error")
    } else {
      startLoader()
      toast("Updating validator", "info")
      dispatch<any>(updateValidator(modalControl))
        .unwrap()
        .then(() => {
          dispatch<any>(getAllValidator({}))
            .unwrap()
            .then((res: any) => {
              updateValidatorArrayCount(res)
            })
            .catch(() => {
              // TODO: show fallback page
            })
        })
        .catch((err: any) => {
          console.log(err)
          // TODO: show fallback page
        })
        .finally(() => {
          closeModal()
          stopLoader()
        })
    }
  }

  return (
    <>
      <EditValidatorModal
        openModal={modalVisibility === "edit-validator"}
        closeModal={closeModal}
        closeModalOnOverlayClick={false}
        _handleChange={_handleChange}
        setModalControl={setModalControl}
        modalControl={modalControl}
        handleSubmit={_submitEditValidatorModal}
        setImageUpload={setImageUpload}
        imageUpload={imageUpload}
        _handleDiscard={_handleDiscard}
      />
      <UserDetailsModal
        openModal={modalVisibility == "User-Info"}
        closeModal={closeModal}
        closeModalOnOverlayClick={false}
        view="validator"
        closeIconVisibility={true}
        modalControl={modalControl}
        imageUpload={imageUpload}
      />
      <StepZeroInformationModal
        openModal={modalVisibility == "Step-0"}
        closeModal={closeModal}
        closeModalOnOverlayClick={false}
        modalTitle={"Register Validators"}
        closeIconVisibility={true}
        _submitModal={_submitStepZeroModal}
      />
      <StepFourSuccessModal
        openModal={modalVisibility == "Step-4"}
        closeModal={closeModal}
        closeModalOnOverlayClick={false}
        modalTitle={"Validator Registered"}
        closeIconVisibility={true}
        registerAnother={registerAnotherValidator}
        pulseCheck={pulseCheck}
      />
      <ConfirmationModal
        openModal={modalVisibility == "Step-delete"}
        closeModalOnOverlayClick={false}
        closeModal={closeModal}
        _submitModal={_submitDeleteModal}
        heading="Sure You Want to Remove Validator"
        body="Note that the validator will not be informed he was removed"
      />
      <StepOneModal
        openModal={modalVisibility == "Step-1"}
        closeModal={closeModal}
        closeModalOnOverlayClick={false}
        modalTitle="Register Validators"
        closeIconVisibility={true}
        _handleChange={_handleChange}
        modalControl={modalControl}
        _submitModal={_submitStepOneModal}
        arrayLength={modalHistoryLength}
        showPreviousModal={showPreviousModal}
      />
      <StepTwoModal
        openModal={modalVisibility == "Step-2"}
        closeModal={closeModal}
        closeModalOnOverlayClick={false}
        modalTitle="Register Validators"
        closeIconVisibility={true}
        _handleChange={_handleChange}
        modalControl={modalControl}
        _submitModal={_submitStepTwoModal}
        _handleDiscard={_handleDiscard}
        imageUpload={imageUpload}
        setImageUpload={setImageUpload}
        arrayLength={modalHistoryLength}
        showPreviousModal={showPreviousModal}
      />
      <StepThreeModal
        openModal={modalVisibility == "Step-3"}
        closeModal={closeModal}
        closeModalOnOverlayClick={false}
        modalTitle="Register Validators"
        closeIconVisibility={true}
        _handleChange={_handleChange}
        modalControl={modalControl}
        _submitModal={_submitStepThreeModal}
        arrayLength={modalHistoryLength}
        showPreviousModal={showPreviousModal}
        userName={user.displayName}
      />
      {hasValidators == -1 ? (
        <div className={styles.AppView}>
          <div className="relative h-[80vh]">
            <Spinner />
          </div>
        </div>
      ) : hasValidators == 0 ? (
        <AddValidators openStepZeroModal={addValidator} />
      ) : (
        <Validators
          validatorArray={validatorArray}
          createValidator={newValidator}
          editValidator={editValidator}
          deleteValidator={destroyValidator}
          viewValidator={viewValidator}
        />
      )}
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
          className="mb-10 "
          alt="validator screen image"
        />
        <h2 className="text-[#00192B] text-xl font-bold mb-2">No Validators</h2>
        <p className="text-[#868686] font-medium mb-10">
          No registered validator yet
        </p>
        <button
          data-cy="register-validator-button"
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
  editValidator: (id: string) => void
  deleteValidator: (id: string) => void
  viewValidator: (id: string) => void
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
            id="cy-add-validator-button"
            onClick={_props.createValidator}
            src={addIcon}
            alt="add icon"
            className="cursor-pointer cy-add-validator-button"
          />
        </div>
      </section>

      <section className={styles.validators}>
        <div className="rounded-xl shadow-md h-full overflow-y-scroll no-scrollbar">
          <ul className="flex items-center justify-between border-b-[1px] py-3 px-7 ">
            <li className="text-safe-text-gray-shade flex gap-10">
              <div className="relative">
                <input
                  data-cy="select-all-validator-input"
                  type="checkbox"
                  id="checkbox"
                />
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
            <li className="text-safe-text-gray-shade text-sm">
              Phone&nbsp;Number
            </li>
            <li className="text-safe-text-gray-shade text-sm relative w-[140px]">
              <p className="w-36 absolute right-20 -top-3">
                Backup&nbsp;Phone&nbsp;Number
              </p>
            </li>
            <li className="text-safe-text-gray-shade text-sm relative -top-3">
              <p className="absolute right-14  w-24">Social&nbsp;Media</p>
            </li>
          </ul>

          {_props.validatorArray.map((validator: any, index: number) => {
            return (
              <Validator
                key={index}
                userImg={validator.profile_image}
                userName={validator.name}
                email={validator.primary_email}
                phoneNumber={validator.phone_number}
                backupPhoneNumber={validator.backup_phone_number}
                facebook_link={validator.facebook_link}
                instagram_username={validator.instagram_username}
                twitter_username={validator.twitter_username}
                id={validator.id}
                editValidator={_props.editValidator}
                deleteValidator={_props.deleteValidator}
                viewValidator={_props.viewValidator}
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
  facebook_link: string
  instagram_username: string
  twitter_username: string
  id: string
  editValidator: (id: string) => void
  deleteValidator: (id: string) => void
  viewValidator: (id: string) => void
}) {
  const [image, setImage] = useState<string>("")
  useEffect(() => {
    getFileFromFirebase(_props.userImg)
      .then((res) => {
        setImage(res)
      })
      .catch(() => {
        setImage("")
      })
  }, [_props.userImg])
  return (
    <ul className="grid grid-cols-5 items-center py-3 px-7 ">
      <li className=" flex items-center gap-4">
        {
          image ? (
            <img
              src={image || userImg}
              alt="user image"
              className="rounded-full h-11 w-11 object-contain"
            />
          ) : (
            <img
              src={userImg}
              alt="user image"
              className="rounded-full h-11 w-11 object-contain"
            />
          )
          // TODO add loading view
        }
        <p
          data-cy="view-validator-button"
          className="font-semibold cursor-pointer"
          onClick={() => _props.viewValidator(_props.id)}
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
          <a
            data-cy="validator-facebook-link"
            href={_props.facebook_link || "https://www.facebook.com/login.php"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={facebook}
              alt="facebook logo"
              className="w-5 cursor-pointer"
            />
          </a>
          <a
            data-cy="validator-facebook-link"
            href={`https://www.instagram.com/${_props.instagram_username}/`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={instagram}
              alt="instagram logo"
              className="w-5 cursor-pointer"
            />
          </a>
          <a
            data-cy="validator-facebook-link"
            href={`https://twitter.com/${_props.twitter_username}/`}
            target="_blank"
            rel="noopener noreferrer"
          >
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
            editValidator={_props.editValidator}
            deleteValidator={_props.deleteValidator}
          />
        </div>
      </li>
    </ul>
  )
}
