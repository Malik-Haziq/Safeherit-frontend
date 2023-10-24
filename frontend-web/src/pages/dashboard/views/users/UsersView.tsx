import styles from "../../Dashboard.module.css"
import eye from "@images/eye.svg"
import userImg from "@images/user.svg"
import edit from "@images/edit.svg"
import leftArrow from "@images/left-arrow.svg"
import rightArrow from "@images/right-arrow.svg"
import deleteIcon from "@images/delete.svg"
import { NewUserModal } from "../users/modal_admin"
import { useCallback, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { getUsers } from "@/redux/actions/AdminAction"
import { toast, Spinner } from "@/components"
import { createUser } from "@/redux/actions/UserActions"

const initialState = {
  email: "",
  phoneNumber: "",
  displayName: "",
}


export default function UsersView() {
  const dispatch = useAppDispatch()
  const admin = useAppSelector(state => state.admin)
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)  
  const [modalControl, setModalControl] = useState(initialState)
  const [modalVisibility, setModalVisibility] = useState("none")

  useEffect(() => {
    fetchUsers()
  }, [])

  useEffect(() => {
    fetchUsers()
  }, [currentPage])

  const closeModal = useCallback(() => {
    setModalControl(initialState)
    setModalVisibility("none")
  }, [])
  const _handleChange = (event: { target: { name: any; value: any } }) => {
    // debugger
    const { name, value } = event.target
    setModalControl({ ...modalControl, [name]: value })
  }

  const createUserSubmit = () => {
    if (modalControl.displayName && modalControl.email && modalControl.phoneNumber) {
      dispatch(createUser(modalControl)).unwrap().catch()
      .then(() => {
        fetchUsers()
        closeModal()
        toast("User Created", "success")
      })
    }
    else {
      toast("All fields are required", 'warning')
    }
  }

  const fetchUsers = () => {
    setLoading(true)
    dispatch(getUsers({"page": currentPage})).unwrap().finally(() => {
      setLoading(false)
    })
  }

  const _changePage = (page: number) => {
    setLoading(true)
    setCurrentPage(page)
  }
  const _previousPage = () => {
    _changePage(currentPage-1)
  }
  const _nextPage = () => {
    _changePage(currentPage+1)
  }

  const deleteUser = (id: string) => {
    toast("functionality not implimented", "error")
  }
  const editUser = (id: string) => {
    toast("functionality not implimented", "error")
  }
  const viewUser = (id: string) => {
    toast("functionality not implimented", "error")
  }
  const createAccount = () => {
    setModalVisibility('create-user')
  }

  return (
    <div className={styles.AppView}>
      <NewUserModal
        openModal= {modalVisibility == 'create-user'}
        closeModal={closeModal}
        closeModalOnOverlayClick={false}
        closeIconVisibility={true}
        _handleChange={_handleChange}
        _submitModal= {createUserSubmit}
        modalControl= {modalControl}
      />
      <main className="p-5 mx-auto w-[1101px]">
        <button onClick={createAccount} className="mt-10 flex justify-end mb-8">
          <a
            href="#"
            className="primary-btn bg-[#04477B] text-white rounded-md py-2 font-medium flex items-center gap-2"
          >
            <span className="text-3xl">+</span> Create Account
          </a>
        </button>
        <section className="rounded-xl h-[676px] border-[1px] flex justify-between flex-col">
          <table className="rounded-3xl ">
            <thead className="bg-[#F2F2F2] px-5 py-3 rounded-t-xl text-sm uppercase border-[1px] border-[#E5E5E5]">
              <tr>
                <th className="w-[240px] text-start">
                  <p className="pl-5 py-3 font-medium">user</p>
                </th>
                <th className="w-[140px] text-start font-medium">joining Date</th>
                <th className="w-[100px] text-start font-medium">plan</th>
                <th className="w-[100px] text-start font-medium">payment</th>
                <th className="w-[170px] text-start font-medium">account</th>
                <th className="w-[180px] text-start font-medium">pulse Status</th>
                <th className="pr-5 font-medium">Action</th>
              </tr>
            </thead>
            {
              loading ? 
              <div>
                <Spinner />
              </div> :
              <tbody>
                {admin.users.map((user, index) => {
                  return (
                    <User
                      key={index}
                      userImg={''}
                      userName={user.name}
                      userId={user.id}
                      joiningDate={`${user.joining_date}`}
                      plan={user.plan}
                      payment={user.payment_status}
                      account={user.account_status}
                      pulseStatusTitle={user.pulse_status}
                      pulseStatusSubtile={' '}
                      viewUser={viewUser}
                      editUser={editUser}
                      deleteUser={deleteUser}
                    />
                  )
                })}
              </tbody>
            }
          </table>
          <div className="flex items-center justify-between p-5">
            <button 
              onClick={_previousPage}
              disabled = {currentPage == 1}
              className={
                currentPage > 1 ?
                "px-4 py-2 text-[#04477B] border-[1px] border-[#04477B] rounded-lg flex items-center justify-center gap-2" :
                "px-4 py-2 text-[#E6EDF9] border-[1px] border-[#E6EDF2] rounded-lg flex items-center justify-center gap-2"
              }
            >
              <img src={leftArrow} alt="left arrow" />
              Previous
            </button>
            <div className="flex items-center justify-center">
            {
              Array.from({ length: admin.totalPages }).map((_, index) => (
                <div 
                  key={index}
                  onClick={() => {_changePage(index+1)}}
                  className={
                    currentPage == index+1 ?
                    "w-12 h-12 text-[#04477B] bg-[#E6EDF2] flex items-center justify-center rounded-lg cursor-pointer" :
                    "w-12 h-12 flex items-center justify-center cursor-pointer"
                  }
                >
                  {index+1}
                </div>
              ))
            }
            </div>
            <button
              onClick={_nextPage}
              disabled = {currentPage == admin.totalPages}
              className={
                currentPage < admin.totalPages ?
                "px-4 py-2 text-[#04477B] border-[1px] border-[#04477B] rounded-lg flex items-center justify-center gap-2" :
                "px-4 py-2 text-[#E6EDF9] border-[1px] border-[#E6EDF2] rounded-lg flex items-center justify-center gap-2"
              }
            >
              Next
              <img src={rightArrow} alt="right arrow" />
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}

function User(_props: {
  userImg: any
  userName: string
  userId: string
  joiningDate: string
  plan: string
  payment: string
  account: string
  pulseStatusTitle: string
  pulseStatusSubtile: string
  viewUser: Function
  editUser: Function
  deleteUser: Function
}) {
  return (
    <tr className="border-b-[1px] border-x-[1px] border-[#E5E5E5] h-16 rounded-2xl">
      <td className="w-[220px] pl-5 flex items-center gap-3 content-center h-16">
        <img src={_props.userImg || userImg} alt="user image" className="w-9 h-9 rounded-full" />
        <p className="text-[#00192B] text-lg font-semibold">
          {_props.userName}
        </p>
      </td>
      <td className="w-[120px] text-[#4D4D4D] font-medium text-sm">
        {_props.joiningDate}
      </td>
      <td className="w-[80px] text-[#4D4D4D] font-medium text-sm">
        {_props.plan}
      </td>

      <td
        className={
          _props.payment.toLowerCase() === "paid"
            ? "w-[80px] text-[#27AE60] font-medium text-sm"
            : _props.payment.toLowerCase() === "overdue"
            ? "w-[80px] text-[#5CEAD2] font-medium text-sm"
            : "w-[80px] text-[#F44336] font-medium text-sm"
        }
      >
        {_props.payment}{" "}
      </td>
      <td
        className={
          _props.account.toLowerCase() === "active"
            ? "w-[80px] text-[#27AE60] font-medium text-sm"
            : _props.payment.toLowerCase() === "blocked" || "deleted"
            ? "w-[80px] text-[#F44336] font-medium text-sm"
            : "w-[80px] text-[#000] font-medium text-sm"
        }
      >
        {_props.account}{" "}
      </td>
      <td className="w-[170px] text-[#4D4D4D] font-medium text-xs">
        <p>{_props.pulseStatusTitle}</p>
        <span
          className={
            _props.pulseStatusSubtile.toLowerCase() === "waiting for answer"
              ? "w-[80px] text-[#52CEB7] font-medium text-xs"
              : _props.pulseStatusSubtile.toLowerCase() === "pending login"
              ? "w-[80px] text-[#04477B] font-medium text-sm"
              : _props.pulseStatusSubtile.toLowerCase() === "login done"
              ? "w-[80px] text-[#27AE60] font-medium text-sm"
              : "w-[80px] text-[#04477B] font-medium text-sm"
          }
        >
          {_props.pulseStatusSubtile}
        </span>
      </td>
      <td>
        <div className="flex gap-1 w-[140px]">
          <img
            src={eye}
            alt="view icon"
            className="cy-view-asset-btn cursor-pointer"
            id="cy-view-asset-btn"
            onClick={() => {_props.viewUser(_props.userId)}}
          />
          <img
            src={edit}
            alt="edit icon"
            className="cy-edit-asset-btn cursor-pointer"
            id="cy-edit-asset-btn"
            onClick={() => {_props.editUser(_props.userId)}}
          />
          <img
            src={deleteIcon}
            alt="delete icon"
            className="cy-del-asset-btn cursor-pointer"
            id="cy-del-asset-btn"
            onClick={() => {_props.deleteUser(_props.userId)}}
          />
        </div>
      </td>
    </tr>
  )
}
