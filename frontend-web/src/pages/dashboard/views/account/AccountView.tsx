import styles from "../../Dashboard.module.css"
import userImg from "../../../../../assets/images/user.svg"
import userIcon from "../../../../../assets/images/UserIcon.png"
import msgIcon from "../../../../../assets/images/message.svg"
import editIcon from "../../../../../assets/images/edit.svg"
import viewIcon from "../../../../../assets/images/view-icon.svg"
import languageIcon from "../../../../../assets/images/language.svg"
import warningIcon from "../../../../../assets/images/warning.svg"
import MembershipPlanView from './MembershipPlanView'
import { useState, useEffect } from "react"
import { EditUserModal } from "./modal_account"
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks"
import { getUser, updateUser } from "../../../../redux/actions/UserActions"
import { getFileFromFirebase } from "../../../../common/utils/firebase"

const initialState = {
  displayName: "",
  language: "",
  profile_image: "",
}

export default function AccountView() {

  const user = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()
  
  const [showMemberShipPlan, setShowMemberShipPlan] = useState(false)
  const showPlanView = () => {setShowMemberShipPlan(true)}
  const hidePlanView = () => {setShowMemberShipPlan(false)}
  const [modalControl, setModalControl] = useState(initialState)
  const [imageUpload, setImageUpload] = useState("")
  const [modalVisibility, setModalVisibility] = useState("none")

  useEffect(() => {
    dispatch(getUser({}))
      .unwrap()
      .then((res) => {
        setModalControl(res.data.data)
        getFileFromFirebase(res.data.data.profile_image).then((res) => {
          setImageUpload(res)
        })
        .catch(() => {
          setImageUpload("")
        })
      })
      .catch(() => {
        // TODO: show fallback page
      })
  }, [])

  const editUser = () => {
    setModalVisibility("edit-user")
  }
  const closeModal = () => {
    setModalVisibility("none")
  }
  const _submitEditUserModal = () => {
    alert("updating user information")
    dispatch(updateUser(modalControl)).unwrap().finally(() => {
      closeModal()
    })
  }

  const _handleChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target
    setModalControl({ ...modalControl, [name]: value })
  }

  return (
    showMemberShipPlan ?
      <MembershipPlanView
        hidePlanView={hidePlanView}
      />
    :
      <>
        <EditUserModal
          openModal= {modalVisibility == "edit-user"}
          closeModal= {closeModal}
          closeModalOnOverlayClick= {false}
          closeIconVisibility= {true}
          _handleChange= {_handleChange}
          modalControl= {modalControl}
          _submitModal= {_submitEditUserModal}
          imageUpload= {imageUpload}
          setImageUpload= {setImageUpload}
          email={user.email}
        />
        <div className={styles.AppView}>
          <main className="p-6 w-full">
            <UserProfile
              userImg={imageUpload || userImg}
              userName={user.displayName}
              userEmail={user.email}
              editUser={editUser}
            />
            <UserProfileDetails
              userName={user.displayName}
              userEmail={user.email}
              userLanguage="English"
              varified={false}
            />
            <MembershipPlan
              plan={"Monthly"}
              duration={"1 Month"}
              date={"May 18, 2023"}
              showPlanView={showPlanView}
            />
            <section className="rounded-2xl shadow-md mb-4 ">
              <div className="p-5 flex justify-between items-center border-b-[1px]">
                <p className="text-[#061334] text-lg font-semibold">
                  Delete Your Account
                </p>
                <button
                  className="primary-btn bg-[#D8D8D8] rounded-2xl text-[#686868] text-sm"
                  onClick={() => {}}
                >
                  Delete Account
                </button>
              </div>
            </section>
          </main>
        </div>
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
              className="w-[90px] h-[90px] rounded-full "
            />
          </div>
          <div className="ml-28">
            <h2 className="text-xl font-semibold ">{_props.userName}</h2>
            <small className="text-[#707070]">{_props.userEmail}</small>
          </div>
        </div>
        <button onClick={_props.editUser}className="primary-btn rounded-[14px] bg-[#0971AA] cursor-pointer">
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
  varified: boolean
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
          <img src={viewIcon} alt="View icon" />
          <img src={editIcon} alt="Edit icon" />
        </div>
      </div>
      <div>
        <div className="p-5 flex justify-between items-center border-b-[1px]">
          <div>
            <div className="flex gap-2 items-center">
              <h2 className="text-xl font-semibold ">2FA</h2>
              <img src={warningIcon} alt="Warning Icon" />
            </div>
            <small className="text-[#707070]">
              {_props.varified
                ? "2 Factor Authentication is activated, you will be asked a 2FA code every time you log into SafeHerit."
                : "You still didn't set up 2FA, we highly recommend that you do so in order to keep your account secure and private."}
            </small>
          </div>
          <button
            className={
              _props.varified
                ? "primary-btn bg-[#0AB64E] cursor-pointer rounded-full py-2 px-6 text-sm"
                : "primary-btn rounded-[14px] bg-[#0971AA] cursor-pointer text-sm"
            }
          >
            {_props.varified ? "Active" : "Varify"}
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
      <div className="rouneded-t-2xl bg-[#ECF6FA] py-4 px-5">
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
            Membership Duration
            <span className="text-[#00192B] font-bold">{_props.duration}</span>
          </p>
          <p className="text-[#707070] text-sm font-medium">
            Next Renewal Date:
            <span className="text-[#00192B] font-bold">{_props.date}</span>
          </p>
        </div>
        <button onClick={_props.showPlanView} className="primary-btn bg-[#0971AA] rounded-2xl">
          See more details
        </button>
      </div>
    </section>
  )
}
