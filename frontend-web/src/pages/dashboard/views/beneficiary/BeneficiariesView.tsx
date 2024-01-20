import React from "react"
import userIcon from "@images/user-icon.svg"
import addIcon from "@images/add-icon.svg"
import facebook from "@images/facebook.svg"
import instagram from "@images/insta.svg"
import twitter from "@images/twitter.svg"
import userImg from "@images/user.svg"
import beneficiaryImg from "@images/beneficiaryScreen.svg"
import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from "../../Dashboard.module.css"
import {
  ValidatorDropDown,
  UserDetailsModal,
  Spinner,
  toast,
} from "@/components"
import {
  StepZeroInformationModal,
  SuccessModal,
  StepOneModal,
  StepTwoModal,
  StepThreeModal,
  RegisterPKModal,
} from "./modal_beneficiary"
import {
  getAllBeneficiary,
  createBeneficiary,
  findBeneficiary,
  updateBeneficiary,
  deleteBeneficiary,
} from "@redux/actions"
import { useAppDispatch, useAppSelector } from "@redux/hooks"
import { ConfirmationModal } from "@/components"
import {
  isValidEmail,
  getFileFromFirebase,
  copyToClipboard,
  isValidPhoneWithRegion,
  useArray,
  downloadPEM,
} from "@/common"
import {
  PrivateKeyModal,
  GeneratePrivateKey,
} from "@/pages/register-key/modal_register_key"
import Encryption from "@/common/encryption/encryption"
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
  personalized_video: "",
  profile_image: "",
  public_key: "",
}

const initialStateForEncryptionKeys = {
  publicKey: "",
  privateKey: "",
}

export default function BeneficiariesView() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const encryptionService = new Encryption()
  const user = useAppSelector((state) => state.user)
  const startLoader = () => dispatch<any>(setLoaderVisibility(true))
  const stopLoader = () => dispatch<any>(setLoaderVisibility(false))

  const [hasBeneficiaries, setHasBeneficiaries] = useState(-1)
  const [modalControl, setModalControl] = useState(initialState)
  const [modalEncryptionKeyControl, setModalEncryptionKeyControl] = useState(
    initialStateForEncryptionKeys,
  )
  const [imageUpload, setImageUpload] = useState("")
  const [videoUpload, setVideoUpload] = useState("")
  const [modalAction, setModalAction] = useState("")
  const [modalVisibility, setModalVisibility] = useState("none")
  const [filePresent, setFilePresent] = useState(false)
  const [fileName, setFileName] = useState("")
  const [
    modalHistory,
    modalHistoryLength,
    modalHistoryPop,
    modalHistoryPush,
    modalHistoryPopAll,
  ] = useArray()

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
    dispatch<any>(getAllBeneficiary({}))
      .unwrap()
      .then((res: any) => {
        updateBeneficiaryArrayCount(res)
      })
      .catch(() => {
        // TODO: show fallback page
      })
    // .finally(() => {
    //   modalHistoryPush("step-pk")
    // })
  }, [])

  useEffect(() => {
    modalHistoryPopAll()
  }, [])

  const closeModal = useCallback(() => {
    setModalControl(initialState)
    setModalEncryptionKeyControl(initialStateForEncryptionKeys)
    setModalVisibility("none")
    setImageUpload("")
    setVideoUpload("")
    modalHistoryPopAll()
    setFilePresent(false)
    setFileName("")
  }, [])

  const addBeneficiary = useCallback(() => {
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
    const facebookRegex = /^https?:\/\/(www\.)?facebook\.com\/.*/i;
    const instagramRegex = /^https?:\/\/(www\.)?instagram\.com\/.*/i;
    const twitterRegex = /^https?:\/\/(www\.)?twitter\.com\/.*/i;

    if(modalControl.facebook_link && !(facebookRegex.test(modalControl.facebook_link))){
      toast('Please enter a valid facebook link', 'error')
    } else if(modalControl.instagram_username && !(instagramRegex.test(modalControl.instagram_username))){
      toast('Please enter a valid instagram link', 'error')
    } else if(modalControl.twitter_username && !(twitterRegex.test(modalControl.twitter_username))){
      toast('Please enter a valid twitter link', 'error')
    } else{
      modalHistoryPush("Step-2")
      setModalVisibility("Step-3")
    }
  }

  const _submitStepThreeModal = () => {
    if (!modalControl.personalized_message) {
      modalControl.personalized_message = `Dear ${modalControl.name} If you receive this message it probably means I am gone. If so go to my closet and you will find a piece of paper in the pocket or my blue leather jacket. The paper contains the codes you will need to login to this platform (SafeHerit) and have access to the list of my assets.`
    }
      if (modalAction == "edit") {
        startLoader()
        toast("Updating beneficiary", "info")
        dispatch<any>(
          updateBeneficiary({
            ...modalControl,
            public_key: user.publicKey,
          }),
        )
          .unwrap()
          .then(() => {
            dispatch<any>(getAllBeneficiary({}))
              .unwrap()
              .then((res: any) => {
                modalHistoryPush("Step-3")
                setModalVisibility("Step-success")
                updateBeneficiaryArrayCount(res)
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
        toast("creating beneficiary", "info")
        dispatch<any>(
          createBeneficiary({
            ...modalControl,
            public_key: modalEncryptionKeyControl.publicKey,
          }),
        )
          .unwrap()
          .then(() => {
            dispatch<any>(getAllBeneficiary({}))
              .unwrap()
              .then((res: any) => {
                modalHistoryPush("Step-3")
                setModalVisibility("Step-success")
                updateBeneficiaryArrayCount(res)
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

  const _submitSuccessModal = () => {
    closeModal()
  }

  const _submitRegisterPKModal = (registerKeyModalType?: string) => {
    modalHistoryPush("Step-pk")
    registerKeyModalType == "generate-key"
      && setModalVisibility("Generate-PK")
  }
  const _submitDeleteModal = () => {
    toast("deleting Beneficiary " + modalControl.name, "info")
    dispatch<any>(deleteBeneficiary({ id: modalControl.id }))
      .unwrap()
      .then(() => {
        dispatch<any>(getAllBeneficiary({}))
          .unwrap()
          .then((res: any) => {
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
    // debugger
    const { name, value } = event.target
    setModalControl({ ...modalControl, [name]: value })
  }

  const _handleDiscard = (name: string, value: any) => {
    setModalControl({ ...modalControl, [name]: value })
  }

  const _handleEncryptionKeyChange = (event: {
    target: { name: any; value: any }
  }) => {
    const { name, value } = event.target
    setModalEncryptionKeyControl({
      ...modalEncryptionKeyControl,
      [name]: value,
    })
  }
  const newBeneficiary = () => {
    setModalAction("create")
    setModalControl(initialState)
    setImageUpload("")
    setVideoUpload("")
    modalHistoryPush("Step-0")
    setModalVisibility("Step-pk")
  }
  const editBeneficiary = (id: string) => {
    dispatch<any>(findBeneficiary({ id: id }))
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
        getFileFromFirebase(res?.data?.data?.personalized_video)
          .then((res) => {
            setVideoUpload(res)
          })
          .catch(() => {
            setVideoUpload("")
          })

        setModalVisibility("Step-1")
      })
  }
  const destroyBeneficiary = (id: string) => {
    dispatch<any>(findBeneficiary({ id: id }))
      .unwrap()
      .then((res: any) => {
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
    toast("showing user data", "info")
    dispatch<any>(findBeneficiary({ id: id }))
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
        getFileFromFirebase(res?.data?.data?.personalized_video)
          .then((res) => {
            setVideoUpload(res)
          })
          .catch(() => {
            setVideoUpload("")
          })

        setModalVisibility("User-Info")
      })
  }
  const showPreviousModal = () => {
    const lastEl = modalHistory[modalHistoryLength - 1] || "none"
    modalHistoryPop()
    setModalVisibility(lastEl)
  }

  const _handleRegisterPK = () => {
    if (
      modalVisibility === "Load-PK" ||
      (modalVisibility === "Generate-PK" &&
        encryptionService.validateKeyPair(
          modalEncryptionKeyControl.publicKey,
          modalEncryptionKeyControl.privateKey,
        ))
    ) {
      if (modalAction == "create") {
        modalHistoryPush("Step-pk")
        setModalVisibility("Step-1")
      } else {
        modalHistoryPush("Step-pk")
        setModalVisibility("Step-success")
      }
    } else {
      toast("Unable to verify keys", "error")
    }
  }

  const _handleGeneratePKPair = useCallback(() => {
    startLoader()
    toast("Generating Public/Private Key", "info")
    setTimeout(() => {
      setModalEncryptionKeyControl(encryptionService.generateKeyPair())
      toast("Keys Generated", "success")
      stopLoader()
    }, 1000)
  }, [])

  const downloadPrivateKey = useCallback(() => {
    if (modalEncryptionKeyControl.privateKey) {
      const KEY = { privateKey: modalEncryptionKeyControl.privateKey }
      downloadPEM(KEY, "privateKey.pem")
      toast("Download Complete", "success")
    } else {
      toast("Kindly Generate Private Key", "error")
    }
  }, [modalEncryptionKeyControl.privateKey])

  const copyPrivateKey = useCallback(() => {
    if (modalEncryptionKeyControl.privateKey) {
      copyToClipboard(modalEncryptionKeyControl.privateKey)
    } else {
      toast("Kindly Generate Private Key", "error")
    }
  }, [modalEncryptionKeyControl.privateKey])

  const downloadPublicKey = useCallback(() => {
    if (modalEncryptionKeyControl.publicKey) {
      const KEY = { publicKey: modalEncryptionKeyControl.publicKey }
      downloadPEM(KEY, "publicKey.pem")
      toast("Download Complete", "success")
    } else {
      toast("Kindly Generate Public Key", "error")
    }
  }, [modalEncryptionKeyControl.publicKey])

  const copyPublicKey = useCallback(() => {
    if (modalEncryptionKeyControl.publicKey) {
      copyToClipboard(modalEncryptionKeyControl.publicKey)
    } else {
      toast("Kindly Generate Public Key", "error")
    }
  }, [modalEncryptionKeyControl.publicKey])

  return (
    <>
      <PrivateKeyModal
        openModal={modalVisibility == "Load-PK"}
        closeModal={closeModal}
        closeModalOnOverlayClick={false}
        closeIconVisibility={true}
        _handleChange={_handleEncryptionKeyChange}
        _handleRegisterPK={_handleRegisterPK}
        filePresent={filePresent}
        setFilePresent={setFilePresent}
        fileName={fileName}
        setFileName={setFileName}
        keyType="Public"
      />

      <GeneratePrivateKey
        openModal={modalVisibility == "Generate-PK"}
        closeModal={closeModal}
        closeModalOnOverlayClick={false}
        closeIconVisibility={true}
        modalControl={modalEncryptionKeyControl}
        _handleChange={_handleEncryptionKeyChange}
        _handleGeneratePKPair={_handleGeneratePKPair}
        _handleRegisterPK={_handleRegisterPK}
        downloadPrivateKey={downloadPrivateKey}
        downloadPublicKey={downloadPublicKey}
        copyPrivateKey={copyPrivateKey}
        copyPublicKey={copyPublicKey}
      />

      <UserDetailsModal
        openModal={modalVisibility == "User-Info"}
        closeModal={closeModal}
        closeModalOnOverlayClick={false}
        view="beneficiary"
        closeIconVisibility={true}
        modalControl={modalControl}
        imageUpload={imageUpload}
        videoUpload={videoUpload}
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
        arrayLength={modalHistoryLength}
        showPreviousModal={showPreviousModal}
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
        _handleDiscard={_handleDiscard}
        setImageUpload={setImageUpload}
        imageUpload={imageUpload}
        arrayLength={modalHistoryLength}
        showPreviousModal={showPreviousModal}
      />
      <StepThreeModal
        openModal={modalVisibility == "Step-3"}
        closeModal={closeModal}
        closeModalOnOverlayClick={false}
        closeIconVisibility={true}
        action={modalAction}
        _handleChange={_handleChange}
        videoUpload={videoUpload}
        setVideoUpload={setVideoUpload}
        modalControl={modalControl}
        _handleDiscard={_handleDiscard}
        _submitModal={_submitStepThreeModal}
        arrayLength={modalHistoryLength}
        showPreviousModal={showPreviousModal}
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
        _handleKeyGeneration={() => {
          _submitRegisterPKModal("generate-key")
        }}
        arrayLength={modalHistoryLength}
        showPreviousModal={showPreviousModal}
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
        <div className={styles.AppView}>
          <div className="relative h-[80vh]">
            <Spinner />
          </div>
        </div>
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
  editBeneficiary: (id: string) => void
  deleteBeneficiary: (id: string) => void
  viewBeneficiary: (id: string) => void
}) {
  return (
    <div className={styles.AppView}>
      <section className="px-8 py-4 ">
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
            id="cy-add-beneficiary-button"
            onClick={_props.createBeneficiary}
            src={addIcon}
            alt="add icon"
            className="cursor-pointer cy-add-beneficiary-button"
          />
        </div>
      </section>

      <section className={styles.beneficiaries}>
        <div className="rounded-xl shadow-md h-full overflow-y-scroll no-scrollbar relative">
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

          {_props.beneficiaryArray.map((beneficiary: any, index: number) => {
            return (
              <Beneficiary
                key={index}
                userImg={beneficiary.profile_image}
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
  editBeneficiary: (id: string) => void
  deleteBeneficiary: (id: string) => void
  viewBeneficiary: (id: string) => void
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
    <ul className="grid grid-cols-5 items-center py-3 px-7 text-safe-text-black-tint">
      <li className="flex items-center gap-4 text-black">
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
          <a
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
            editValidator={_props.editBeneficiary}
            deleteValidator={_props.deleteBeneficiary}
          />
        </div>
      </li>
    </ul>
  )
}
