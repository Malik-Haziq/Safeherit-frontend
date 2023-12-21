import React from "react"
import userImg from "@images/user.svg"
import userIcon from "@images/UserIcon.png"
import msgIcon from "@images/message.svg"
import editIcon from "@images/edit.svg"
import viewIcon from "@images/view-icon.svg"
import languageIcon from "@images/language.svg"
import warningIcon from "@images/warning.svg"
import { useState, useEffect, useCallback } from "react"
import styles from "../../Dashboard.module.css"
import MembershipPlanView from "./MembershipPlanView"
import { EditUserModal, ViewPrivateKey } from "./modal_account"
import { useAppDispatch, useAppSelector } from "@redux/hooks"
import {
  getUser,
  updateUser,
  deleteUser,
  logout,
  updatePayment,
  getAllAsset,
  updatePK,
} from "@redux/actions"
import {
  copyToClipboard,
  downloadJson,
  getFileFromFirebase,
  verifyIfUserIsEnrolled,
} from "@/common"
import { ConfirmationModal, Spinner, toast } from "@/components"
import { useNavigate } from "react-router-dom"
import TwoFAAuth from "./TwoFAAuth"
import AuthenticateUser from "./AuthenticateUser"
import { setLoaderVisibility } from "@/redux/reducers/LoaderSlice"
import { GeneratePrivateKey } from "@/pages/register-key/modal_register_key"
import Encryption from "@/common/encryption/encryption"

const initialState = {
  displayName: "",
  language: "",
  profile_image: "",
  privateKey: "",
  publicKey: "",
}

const initialPKState = {
  privateKey: "",
  publicKey: "",
}

export default function AccountView() {
  const user = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const encryptionService = new Encryption()

  const [showMemberShipPlan, setShowMemberShipPlan] = useState(false)
  const [showTwoFAAuth, setShowTwoFAAuth] = useState(false)
  const [showAuthenticateUser, setShowAuthenticateUser] = useState(false)
  const [modalControl, setModalControl] = useState(initialState)
  const [PKEditModalControl, setPKEditModalControl] = useState(initialPKState)
  const [imageUpload, setImageUpload] = useState("")
  const [userImage, setUserImage] = useState("")
  const [modalVisibility, setModalVisibility] = useState("none")
  // const [modalVisibility, setModalVisibility] = useState("none")
  const [auth2FAEnabled, setAuth2FAEnabled] = useState(false)

  useEffect(() => {
    const key = sessionStorage.getItem("privateKey")
    setModalControl({ ...modalControl, privateKey: key || "" })
  }, [modalControl.privateKey])

  useEffect(() => {
    getUserDetails()
  }, [])

  useEffect(() => {
    if (user.profile_image) {
      getFileFromFirebase(user.profile_image)
        .then((res) => {
          setUserImage(res)
        })
        .catch(() => {
          setUserImage("")
        })
    }
  }, [user.profile_image])

  // const showPlanView = () => setShowMemberShipPlan(true)
  const hidePlanView = () => setShowMemberShipPlan(false)
  const startLoader = () => dispatch<any>(setLoaderVisibility(true))
  const stopLoader = () => dispatch<any>(setLoaderVisibility(false))

  const showTwoFA = () => setShowTwoFAAuth(true)
  const hideTwoFA = () => {
    setShowTwoFAAuth(false)
    setAuth2FAEnabled(verifyIfUserIsEnrolled())
  }

  const showUserAuthenticate = () => setShowAuthenticateUser(true)
  const hideUserAuthenticate = () => {
    setShowAuthenticateUser(false)
  }

  const getUserDetails = () => {
    dispatch<any>(getUser({}))
      .unwrap()
      .then((res: any) => {
        setAuth2FAEnabled(verifyIfUserIsEnrolled())
        setModalControl(res.data.data)
      })
      .catch(() => {
        // TODO: show fallback page
      })
  }

  const editUser = () => {
    setModalVisibility("edit-user")
  }

  const closeModal = () => {
    setModalVisibility("none")
    setImageUpload("")
    setPKEditModalControl(initialPKState)
  }

  const _submitEditUserModal = () => {
    startLoader()
    toast("Updating user information", "info")
    dispatch<any>(updateUser(modalControl))
      .unwrap()
      .then(() => {
        toast("User updated", "success")
      })
      .finally(() => {
        stopLoader()
        closeModal()
      })
  }

  const _handleChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target
    setModalControl({ ...modalControl, [name]: value })
  }

  const _handleLogout = () => {
    dispatch<any>(logout({}))
      .unwrap()
      .catch((err: { code: string }) => {
        toast(err?.code, "error")
      })
      .finally(() => {
        navigate("/login")
      })
  }

  const _submitUserDeletionRequest = () => {
    startLoader()
    toast("Deleting user", "info")
    dispatch<any>(deleteUser({}))
      .unwrap()
      .catch()
      .then((response: { data: { message: string } }) => {
        toast(response?.data.message, "info")
        _handleLogout()
      })
      .finally(() => {
        stopLoader()
        closeModal()
      })
  }

  const _handleUserDeletion = () => {
    setModalVisibility("delete-user")
  }

  const _handleKeysView = () => {
    setModalVisibility("show-keys")
  }

  const _handleKeysEdit = () => {
    setModalVisibility("Generate-PK")
  }

  const updatePlan = () => {
    startLoader()
    dispatch<any>(updatePayment({}))
      .unwrap()
      .catch()
      .then(
        (res: { data: { data: { sessionUrl: string | URL | undefined } } }) => {
          if (res.data.data.sessionUrl) {
            window.open(res.data.data.sessionUrl, "_blank")
          }
        },
      )
      .finally(() => {
        stopLoader()
      })
  }

  const _handleGeneratePKPair = useCallback(() => {
    toast("Generating Public/Private Key", "info")
    setTimeout(() => {
      setPKEditModalControl(encryptionService.generateKeyPair())
      toast("Keys Generated", "success")
    }, 1000)
  }, [])

  const _handleRegisterPK = () => {
    startLoader()
    if (
      encryptionService.validateKeyPair(
        PKEditModalControl.publicKey,
        PKEditModalControl.privateKey,
      )
    ) {
      dispatch<any>(getAllAsset({}))
        .unwrap()
        .then((res: { data: { data: any[] } }) => {
          const data: any = {}

          res.data.data.forEach((asset: any) => {
            const key = encryptionService.decrypt(
              modalControl.privateKey,
              asset.privateKeyEncByOwner,
            )
            const newKey = encryptionService.encrypt(
              PKEditModalControl.publicKey,
              key,
            )
            data[`${asset.id}`] = newKey
          })

          dispatch<any>(
            updatePK({
              publicKey: PKEditModalControl.publicKey,
              assetKeysEncByOwner: JSON.stringify(data),
            }),
          )
            .unwrap()
            .then(() => {
              toast("Keys Registered", "success")
              closeModal()
              sessionStorage.setItem(
                "privateKey",
                PKEditModalControl.privateKey,
              )
            })
            .catch()
            .finally(() => {
              stopLoader()
            })
        })
        .catch()
        .finally(() => {
          stopLoader()
        })
    } else {
      toast("Unable to verify keys", "error")
    }
  }

  const downloadPrivateKey = useCallback(() => {
    if (PKEditModalControl.privateKey) {
      const KEY = { privateKey: PKEditModalControl.privateKey }
      downloadJson(KEY, "privateKey.json")
      toast("Download Complete", "success")
    } else {
      toast("Kindly Generate Private Key", "error")
    }
  }, [PKEditModalControl.privateKey])

  const copyPrivateKey = useCallback(() => {
    if (PKEditModalControl.privateKey) {
      copyToClipboard(PKEditModalControl.privateKey)
    } else {
      toast("Kindly Generate Private Key", "error")
    }
  }, [PKEditModalControl.privateKey])

  const downloadPublicKey = useCallback(() => {
    if (PKEditModalControl.publicKey) {
      const KEY = { publicKey: PKEditModalControl.publicKey }
      downloadJson(KEY, "publicKey.json")
      toast("Download Complete", "success")
    } else {
      toast("Kindly Generate Public Key", "error")
    }
  }, [PKEditModalControl.publicKey])

  const copyPublicKey = useCallback(() => {
    if (PKEditModalControl.publicKey) {
      copyToClipboard(PKEditModalControl.publicKey)
    } else {
      toast("Kindly Generate Public Key", "error")
    }
  }, [PKEditModalControl.publicKey])

  return (
    <>
      {showAuthenticateUser ? (
        <AuthenticateUser
          hideUserAuthenticate={hideUserAuthenticate}
          showTwoFA={showTwoFA}
        />
      ) : showTwoFAAuth ? (
        <TwoFAAuth hideTwoFA={hideTwoFA} />
      ) : showMemberShipPlan ? (
        <MembershipPlanView hidePlanView={hidePlanView} />
      ) : (
        <>
          <ViewPrivateKey
            openModal={modalVisibility == "show-keys"}
            closeModal={closeModal}
            closeModalOnOverlayClick={false}
            closeIconVisibility={true}
            modalControl={modalControl}
          />
          <GeneratePrivateKey
            openModal={modalVisibility == "Generate-PK"}
            closeModal={closeModal}
            closeModalOnOverlayClick={false}
            closeIconVisibility={true}
            modalControl={PKEditModalControl}
            _handleChange={() => {}}
            _handleGeneratePKPair={_handleGeneratePKPair}
            _handleRegisterPK={_handleRegisterPK}
            downloadPrivateKey={downloadPrivateKey}
            downloadPublicKey={downloadPublicKey}
            copyPrivateKey={copyPrivateKey}
            copyPublicKey={copyPublicKey}
          />
          <EditUserModal
            openModal={modalVisibility == "edit-user"}
            closeModal={closeModal}
            closeModalOnOverlayClick={false}
            closeIconVisibility={true}
            _handleChange={_handleChange}
            modalControl={modalControl}
            _submitModal={_submitEditUserModal}
            imageUpload={imageUpload}
            userImage={userImage}
            setImageUpload={setImageUpload}
            email={user.email}
          />
          <ConfirmationModal
            closeModalOnOverlayClick={false}
            openModal={modalVisibility == "delete-user"}
            closeModal={closeModal}
            _submitModal={_submitUserDeletionRequest}
            heading={""}
            body={"Are you sure you want to delete this user?"}
          />
          {user.loading ? (
            <div className={styles.AppView}>
              <div className="relative h-[80vh]">
                <Spinner />
              </div>
            </div>
          ) : (
            <div className={styles.AppView}>
              <main className="p-6 w-full">
                <UserProfile
                  userImg={userImage || userImg}
                  userName={user.displayName}
                  userEmail={user.email}
                  editUser={editUser}
                />
                <UserProfileDetails
                  userName={user.displayName}
                  userEmail={user.email}
                  userLanguage="English"
                  handleKeysView={_handleKeysView}
                  handleKeysEdit={_handleKeysEdit}
                  verified={auth2FAEnabled}
                  reauthenticateUser={showUserAuthenticate}
                />
                <MembershipPlan
                  plan={"Monthly"}
                  duration={"1 Month"}
                  date={"May 18, 2023"}
                  showPlanView={updatePlan}
                />
                <section className="rounded-2xl shadow-md mb-4 ">
                  <div className="p-5 flex justify-between items-center border-b-[1px]">
                    <p className="text-[#061334] text-lg font-semibold">
                      Delete Your Account
                    </p>
                    <button
                      className="primary-btn bg-[#D8D8D8] rounded-2xl text-[#686868] text-sm"
                      onClick={_handleUserDeletion}
                    >
                      Delete Account
                    </button>
                  </div>
                </section>
              </main>
            </div>
          )}
        </>
      )}
    </>
  )
}

function UserProfile(_props: {
  userImg: any
  userName: string
  userEmail: string
  editUser: React.MouseEventHandler<HTMLButtonElement>
}) {
  return (
    <section className="p-5 rounded-2xl shadow-md mb-4">
      <div className="bg-[#E6EDF2] h-[155px] rounded-2xl"></div>
      <div className="flex justify-between items-center px-5">
        <div className="flex items-end gap-4 pt-4 relative">
          <div className="flex items-center justify-center absolute -top-9 w-[94px] h-[94px] bg-white rounded-full shadow-xl shadow-[0px_5px_12px_0px_rgba(0, 0, 0, 0.15)]">
            <img
              src={_props.userImg}
              alt="User Image"
              className="w-[90px] h-[90px] rounded-full object-contain"
            />
          </div>
          <div className="ml-28">
            <h2 className="text-xl font-semibold ">{_props.userName}</h2>
            <small className="text-[#707070]">{_props.userEmail}</small>
          </div>
        </div>
        <button
          onClick={_props.editUser}
          className="primary-btn rounded-[14px] bg-[#0971AA] cursor-pointer"
        >
          Edit Profile
        </button>
      </div>
    </section>
  )
}

function UserProfileDetails(_props: {
  userName: string
  userEmail: string
  userLanguage: string
  verified: boolean
  handleKeysView: React.MouseEventHandler<HTMLImageElement>
  handleKeysEdit: React.MouseEventHandler<HTMLImageElement>
  reauthenticateUser: React.MouseEventHandler<HTMLButtonElement>
}) {
  return (
    <section className="rounded-2xl shadow-md mb-4">
      <div className="p-5 flex justify-between items-center border-b-[1px]">
        <p className="text-[#061334] text-lg font-semibold">
          {_props.userName}
        </p>
        <img src={userIcon} alt="User Image" />
      </div>
      <div className="p-5 flex justify-between items-center border-b-[1px]">
        <p className="text-[#061334] text-lg font-semibold">
          {_props.userEmail}
        </p>
        <img src={msgIcon} alt="Message icon" />
      </div>
      <div className="p-5 flex justify-between items-center border-b-[1px]">
        <p className="text-[#061334] text-lg font-semibold">
          My Public / Private Keys
        </p>
        <div className="flex gap-1">
          <img
            src={viewIcon}
            alt="View icon"
            onClick={_props.handleKeysView}
            className="cursor-pointer"
          />
          <img
            src={editIcon}
            alt="Edit icon"
            onClick={_props.handleKeysEdit}
            className="cursor-pointer"
          />
        </div>
      </div>
      <div>
        <div className="p-5 flex justify-between items-center border-b-[1px]">
          <div>
            <div className="flex gap-2 items-center">
              <h2 className="text-xl font-semibold ">2FA</h2>
              {!_props.verified && <img src={warningIcon} alt="Warning Icon" />}
            </div>
            <small className="text-[#707070]">
              {_props.verified
                ? "2 Factor Authentication is activated, you will be asked a 2FA code every time you log into SafeHerit."
                : "You still didn't set up 2FA, we highly recommend that you do so in order to keep your account secure and private."}
            </small>
          </div>
          <button
            onClick={_props.verified ? () => {} : _props.reauthenticateUser}
            className={
              _props.verified
                ? "primary-btn bg-[#0AB64E] cursor-pointer rounded-full py-2 px-6 text-sm"
                : "primary-btn rounded-[14px] bg-[#0971AA] cursor-pointer text-sm"
            }
          >
            {_props.verified ? "Active" : "Verify"}
          </button>
        </div>
      </div>
      <div className="p-5 flex justify-between items-center border-b-[1px]">
        <p className="text-[#061334] text-lg font-semibold">
          {_props.userLanguage}
        </p>
        <img src={languageIcon} alt="Language icon" />
      </div>
    </section>
  )
}

function MembershipPlan(_props: {
  plan: string
  duration: string
  date: string
  showPlanView: React.MouseEventHandler<HTMLButtonElement>
}) {
  return (
    <section className="rounded-2xl shadow-md mb-4 ">
      <div className="rounded-t-2xl bg-[#ECF6FA] py-4 px-5">
        <h3 className="font-bold text-[#0C8AC1]">Membership plan</h3>
      </div>
      <div className="flex items-center gap-5 pt-5 mb-7">
        <p className="text-lg font-semibold pl-5">
          {_props.plan} membership plan
        </p>
        <span className="bg-[#0AB64E] py-1 px-6 rounded-full text-white">
          Active
        </span>
      </div>
      <div className="flex justify-between px-5 pb-5">
        <div>
          <p className="text-[#707070] text-sm font-medium">
            Membership Duration:
            <span className="text-[#00192B] font-bold"> {_props.duration}</span>
          </p>
          <p className="text-[#707070] text-sm font-medium">
            Next Renewal Date:
            <span className="text-[#00192B] font-bold"> {_props.date}</span>
          </p>
        </div>
        <button
          onClick={_props.showPlanView}
          className="primary-btn bg-[#0971AA] rounded-2xl"
        >
          See more details
        </button>
      </div>
    </section>
  )
}
