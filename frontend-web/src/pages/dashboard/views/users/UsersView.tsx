import React from 'react'
import styles from "../../Dashboard.module.css"
import eye from "@images/eye.svg"
import userImg from "@images/user.svg"
import edit from "@images/edit.svg"
import leftArrow from "@images/left-arrow.svg"
import rightArrow from "@images/right-arrow.svg"
import deleteIcon from "@images/delete.svg"
import { NewUserDetail, NewUserModal, UserDetail } from "../users/modal_admin"
import { useCallback, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { deleteUserRequest, getUsers } from "@/redux/actions/AdminAction"
import { toast, Spinner } from "@/components"
import { createUser } from "@/redux/actions/UserActions"
import { setLoaderVisibility } from "@/redux/reducers/LoaderSlice"
import { getFileFromFirebase } from "@/common"
import { User } from "@/types"

const initialState = {
  email: "",
  phoneNumber: "",
  displayName: "",
  password: ""
}

const userInitialState = {
  displayName: "",
  id: "",
  email: "",
  joining_date: "",
  plan: "",
  payment_status: "",
  account_status: "",
  pulse_status: "",
  profile_image: ""
}

export default function UsersView() {
  const dispatch = useAppDispatch()
  const admin = useAppSelector((state) => state.admin)
  const startLoader = () => dispatch<any>(setLoaderVisibility(true))
  const stopLoader = () => dispatch<any>(setLoaderVisibility(false))

  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [modalControl, setModalControl] = useState(initialState)
  const [userViewControl, setViewControl] = useState(userInitialState)
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
    const { name, value } = event.target
    setModalControl({ ...modalControl, [name]: value })
  }

  const createUserSubmit = () => {
    if (
      modalControl.displayName &&
      modalControl.email &&
      modalControl.phoneNumber
    ) {
      dispatch<any>(createUser(modalControl))
        .unwrap()
        .catch()
        .then((res: { data: { data: { password: any } } }) => {
          startLoader()
          fetchUsers()
          setModalControl({
            email: modalControl.email,
            phoneNumber: modalControl.phoneNumber,
            displayName: modalControl.displayName,
            password: res.data.data.password
          })
          setModalVisibility('view-new-user')
          toast("User Created", "success")
        })
        .finally(()=>{
          stopLoader()
        })
    } else {
      toast("All fields are required", "warning")
    }
  }

  const fetchUsers = () => {
    setLoading(true)
    dispatch<any>(getUsers({ page: currentPage }))
      .unwrap()
      .finally(() => {
        setLoading(false)
      })
  }

  const _changePage = (page: number) => {
    setLoading(true)
    setCurrentPage(page)
  }
  const _previousPage = () => {
    _changePage(currentPage - 1)
  }
  const _nextPage = () => {
    _changePage(currentPage + 1)
  }

  const deleteUser = (email: string) => {
    let reason: string | null = ''
    while(!reason) {
      reason = prompt("Please enter reason for user deletion")
      if (reason) {
        startLoader()
        const data = {
          email: email,
          reason: reason
        }
        dispatch<any>(deleteUserRequest(data)).unwrap().catch()
        .then(() => {
          toast("User deletion request submitted", "success")
        })
        .finally(() => {
          stopLoader()
        })
      }
    }
  }
  const editUser = (id: string) => {
    id
    toast("functionality not implemented", "error")
  }
  const viewUser = (_props: User) => {
    setViewControl({
      displayName: _props.displayName,
      id: _props.id,
      email: _props.email,
      joining_date: _props.joining_date,
      plan: _props.plan,
      payment_status: _props.payment_status,
      account_status: _props.account_status,
      pulse_status: _props.pulse_status,
      profile_image: _props.profile_image
    })
    setModalVisibility('view-user')
  }
  const createAccount = () => {
    setModalVisibility("create-user")
  }

  return (
    <div className={styles.AppView}>
      <NewUserModal
        openModal={modalVisibility == "create-user"}
        closeModal={closeModal}
        closeModalOnOverlayClick={false}
        closeIconVisibility={true}
        _handleChange={_handleChange}
        _submitModal={createUserSubmit}
        modalControl={modalControl}
      />
      <UserDetail
        openModal={modalVisibility == "view-user"}
        closeModal={closeModal}
        closeModalOnOverlayClick={false}
        closeIconVisibility={true}
        modalControl={userViewControl}
      />
      <NewUserDetail
        openModal={modalVisibility == "view-new-user"}
        closeModal={closeModal}
        closeModalOnOverlayClick={false}
        closeIconVisibility={true}
        modalControl={modalControl}
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
                <th className="w-[140px] text-start font-medium">
                  joining Date
                </th>
                <th className="w-[100px] text-start font-medium">plan</th>
                <th className="w-[100px] text-start font-medium">payment</th>
                <th className="w-[170px] text-start font-medium">account</th>
                <th className="w-[180px] text-start font-medium">
                  pulse Status
                </th>
                <th className="pr-5 font-medium">Action</th>
              </tr>
            </thead>
            {loading ? (
              <div>
                <Spinner />
              </div>
            ) : (
              <tbody>
                {admin.users.map((user, index) => {
                  return (
                    <UserView
                      key={index}
                      profile_image={user.profile_image}
                      displayName={user.displayName}
                      id={user.id}
                      email={user.email}
                      joining_date={`${user.joining_date}`}
                      plan={user.plan}
                      payment_status={user.payment_status}
                      account_status={user.account_status}
                      pulse_status={user.pulse_status}
                      pulseStatusSubtile={" "}
                      viewUser={viewUser}
                      editUser={editUser}
                      deleteUser={deleteUser}
                    />
                  )
                })}
              </tbody>
            )}
          </table>
          <div className="flex items-center justify-between p-5">
            <button
              onClick={_previousPage}
              disabled={currentPage == 1}
              className={
                currentPage > 1
                  ? "px-4 py-2 text-[#04477B] border-[1px] border-[#04477B] rounded-lg flex items-center justify-center gap-2"
                  : "px-4 py-2 text-[#E6EDF9] border-[1px] border-[#E6EDF2] rounded-lg flex items-center justify-center gap-2"
              }
            >
              <img src={leftArrow} alt="left arrow" />
              Previous
            </button>
            <div className="flex items-center justify-center">
              {Array.from({ length: admin.totalPages }).map((_, index) => (
                <div
                  key={index}
                  onClick={() => {
                    _changePage(index + 1)
                  }}
                  className={
                    currentPage == index + 1
                      ? "w-12 h-12 text-[#04477B] bg-[#E6EDF2] flex items-center justify-center rounded-lg cursor-pointer"
                      : "w-12 h-12 flex items-center justify-center cursor-pointer"
                  }
                >
                  {index + 1}
                </div>
              ))}
            </div>
            <button
              onClick={_nextPage}
              disabled={currentPage == admin.totalPages}
              className={
                currentPage < admin.totalPages
                  ? "px-4 py-2 text-[#04477B] border-[1px] border-[#04477B] rounded-lg flex items-center justify-center gap-2"
                  : "px-4 py-2 text-[#E6EDF9] border-[1px] border-[#E6EDF2] rounded-lg flex items-center justify-center gap-2"
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

function UserView(_props: {
  profile_image: any
  displayName: string
  id: string
  email: string
  joining_date: string
  plan: string
  payment_status: string
  account_status: string
  pulse_status: string
  pulseStatusSubtile: string
  viewUser: (_props: User) => void
  editUser: (id: string) => void
  deleteUser: (id: string) => void
}) {
  const [userImage, setUserImage] = useState('')
  if (_props.profile_image) {
    getFileFromFirebase(_props.profile_image)
    .then((res) => {
      setUserImage(res)
    })
    .catch(() => {
      setUserImage("")
    })
  }
  return (
    <tr className="border-b-[1px] border-x-[1px] border-[#E5E5E5] h-16 rounded-2xl">
      <td className="w-[220px] pl-5 flex items-center gap-3 content-center h-16">
        <img
          src={userImage || userImg}
          alt="user image"
          className="w-9 h-9 rounded-full object-contain"
        />
        <p className="text-[#00192B] text-lg font-semibold">
          {_props.displayName}
        </p>
      </td>
      <td className="w-[120px] text-[#4D4D4D] font-medium text-sm">
        {_props.joining_date}
      </td>
      <td className="w-[80px] text-[#4D4D4D] font-medium text-sm">
        {_props.plan}
      </td>

      <td
        className={
          _props.payment_status.toLowerCase() === "paid"
            ? "w-[80px] text-[#27AE60] font-medium text-sm"
            : _props.payment_status.toLowerCase() === "overdue"
            ? "w-[80px] text-[#5CEAD2] font-medium text-sm"
            : "w-[80px] text-[#F44336] font-medium text-sm"
        }
      >
        {_props.payment_status}{" "}
      </td>
      <td
        className={
          _props.account_status.toLowerCase() === "active"
            ? "w-[80px] text-[#27AE60] font-medium text-sm"
            // eslint-disable-next-line no-constant-condition
            : _props.payment_status.toLowerCase() === "blocked" || "deleted"
            ? "w-[80px] text-[#F44336] font-medium text-sm"
            : "w-[80px] text-[#000] font-medium text-sm"
        }
      >
        {_props.account_status}{" "}
      </td>
      <td className="w-[170px] text-[#4D4D4D] font-medium text-xs">
        <p>{_props.pulse_status}</p>
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
            onClick={() => {
              _props.viewUser({
                profile_image: _props.profile_image,
                displayName: _props.displayName,
                id: _props.id,
                email: _props.email,
                joining_date: _props.joining_date,
                plan: _props.plan,
                payment_status: _props.payment_status,
                account_status: _props.account_status,
                pulse_status: _props.pulse_status
              })
            }}
          />
          <img
            src={edit}
            alt="edit icon"
            className="cy-edit-asset-btn cursor-pointer"
            id="cy-edit-asset-btn"
            onClick={() => {
              _props.editUser(_props.id)
            }}
          />
          <img
            src={deleteIcon}
            alt="delete icon"
            className="cy-del-asset-btn cursor-pointer"
            id="cy-del-asset-btn"
            onClick={() => {
              _props.deleteUser(_props.email)
            }}
          />
        </div>
      </td>
    </tr>
  )
}
