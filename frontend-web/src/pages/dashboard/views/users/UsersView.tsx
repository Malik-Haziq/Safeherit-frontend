import React, { useRef } from "react"
import styles from "../../Dashboard.module.css"
import eye from "@images/eye.svg"
import userImg from "@images/user.svg"
import edit from "@images/edit.svg"
import deleteIcon from "@images/delete.svg"
import {
  NewUserDetail,
  NewUserModal,
  UserDetail,
  EditUser,
  FreeTrial,
  AdminUpdatePulseCheck,
} from "../users/modal_admin"
import { useCallback, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import {
  deleteUserRequest,
  getUsers,
  deleteUserFromSuperadmin,
  changeUserAccountStatus,
  offerTrial,
  adminUpdatePulseCheck,
} from "@/redux/actions/AdminAction"
import { toast, Spinner, Pagination } from "@/components"
import { createUser } from "@/redux/actions/UserActions"
import { setLoaderVisibility } from "@/redux/reducers/LoaderSlice"
import {
  getFileFromFirebase,
  isValidEmail,
  isValidPhoneWithRegion,
} from "@/common"
import { User } from "@/types"

const initialState = {
  email: "",
  phoneNumber: "",
  displayName: "",
  password: "",
  tillDate: "",
  reason: "",
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
  profile_image: "",
}

const pulseCheckData = {
  pulseCheckDays: 30,
  pulseCheckEmail1: "",
  pulseCheckEmail2: "",
  pulseCheckEmail3: "",
  pulseCheckPhone1: "",
  pulseCheckPhone2: "",
  pulseCheckValidationRequired: "false",
  pulseCheckNonValidationMonths: 3,
  ownerEmail: "",
}

export default function UsersView() {
  const dispatch = useAppDispatch()
  const admin = useAppSelector((state) => state.admin)
  const user = useAppSelector((state) => state.user)
  const startLoader = () => dispatch<any>(setLoaderVisibility(true))
  const stopLoader = () => dispatch<any>(setLoaderVisibility(false))

  const [currentPage, setCurrentPage] = useState(1)
  const [selectedUser, setSelectedUser] = useState<any>()
  const [loading, setLoading] = useState(true)
  const [modalControl, setModalControl] = useState(initialState)
  const [pulseCheckControl, setPulseCheckControl] = useState(pulseCheckData)
  const [userViewControl, setViewControl] = useState(userInitialState)
  const [modalVisibility, setModalVisibility] = useState("none")
  const paginationRef = useRef<HTMLDivElement>(null)

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

  const _handlePulseChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target
    setPulseCheckControl({ ...pulseCheckControl, [name]: value })
  }

  const createUserSubmit = () => {
    if (
      modalControl.displayName &&
      modalControl.email &&
      modalControl.phoneNumber
    ) {
      if (isValidEmail(modalControl.email)) {
        dispatch<any>(createUser(modalControl))
          .unwrap()
          .catch()
          .then((res: { data: { data: { password: any } } }) => {
            startLoader()
            fetchUsers()
            setModalControl({
              ...modalControl,
              email: modalControl.email,
              phoneNumber: modalControl.phoneNumber,
              displayName: modalControl.displayName,
              password: res.data.data.password,
            })
            setModalVisibility("view-new-user")
            toast("User Created", "success")
          })
          .finally(() => {
            stopLoader()
          })
      } else {
        toast("Please enter valid email", "error")
      }
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

  const deleteUser = (email: string) => {
    if (user.role == "super-admin") {
      startLoader()
      const data = {
        email: email,
      }
      dispatch<any>(deleteUserFromSuperadmin(data))
        .unwrap()
        .catch()
        .then(() => {
          fetchUsers()
          toast("User deleted successfully", "success")
        })
        .finally(() => {
          stopLoader()
        })
    } else {
      let reason: string | null = ""
      reason = prompt("Please enter reason for user deletion")
      if (reason === null) {
        toast("User deletion request canceled", "info")
      } else {
        startLoader()
        const data = {
          email: email,
          reason: reason,
        }

        dispatch<any>(deleteUserRequest(data))
          .unwrap()
          .catch()
          .then(() => {
            fetchUsers()
            toast("User deletion request submitted", "success")
          })
          .finally(() => {
            stopLoader()
          })
      }
    }
  }

  const editUser = (email: string, currentStatus: string) => {
    setModalVisibility("edit-user")
    setSelectedUser({
      email: email,
      currentStatus: currentStatus,
    })
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
      profile_image: _props.profile_image,
    })
    setModalVisibility("view-user")
  }
  const createAccount = () => {
    setModalVisibility("create-user")
  }

  const changeAccountStatus = () => {
    const data = {
      userEmail: selectedUser.email,
      currentlyActive: selectedUser.currentStatus === "Active" ? false : true,
    }
    dispatch<any>(changeUserAccountStatus(data))
      .unwrap()
      .catch(() => {
        setLoading(false)
      })
      .then(() => {
        setModalVisibility("")
        toast("User account status updated successfully", "success")
        fetchUsers()
      })
      .finally(() => {})
  }

  const offerFreeTrial = () => {
    setModalVisibility("free-trial-modal")
  }

  const _submitOfferFreeTrial = () => {
    if (modalControl.tillDate) {
      setModalVisibility("")
      dispatch<any>(
        offerTrial({
          email: selectedUser.email,
          tillDate: modalControl.tillDate,
          reason: modalControl.reason,
        }),
      )
        .unwrap()
        .then(() => {
          toast("Trial activated", "success")
          setModalControl(initialState)
          setSelectedUser("")
          fetchUsers()
        })
    } else {
      toast("Please enter a valid date", "error")
    }
  }

  const editPulseCheck = () => {
    setModalVisibility("admin-update-pulse-check")
  }

  const _submitUpdatePulseCheck = () => {
    const data = {
      ...pulseCheckControl,
      ownerEmail: selectedUser.email,
    }
    if (
      (!isValidEmail(pulseCheckControl.pulseCheckEmail1) &&
        !isValidEmail(pulseCheckControl.pulseCheckEmail2) &&
        !isValidEmail(pulseCheckControl.pulseCheckEmail3)) ||
      (pulseCheckControl.pulseCheckEmail1 &&
        !isValidEmail(pulseCheckControl.pulseCheckEmail1)) ||
      (pulseCheckControl.pulseCheckEmail3 &&
        !isValidEmail(pulseCheckControl.pulseCheckEmail3)) ||
      (pulseCheckControl.pulseCheckEmail2 &&
        !isValidEmail(pulseCheckControl.pulseCheckEmail2))
    ) {
      toast("please enter a valid Email address", "error")
    } else if (
      pulseCheckControl.pulseCheckPhone1 &&
      !isValidPhoneWithRegion(pulseCheckControl.pulseCheckPhone1)
    ) {
      toast("Please enter a valid phone number", "error")
    } else if (
      pulseCheckControl.pulseCheckPhone2 &&
      !isValidPhoneWithRegion(pulseCheckControl.pulseCheckPhone2)
    ) {
      toast("Please enter a valid phone number", "error")
    } else {
      dispatch<any>(adminUpdatePulseCheck(data))
        .unwrap()
        .then(() => {
          toast("pulse details has been updated", "success")
          fetchUsers()
          setSelectedUser("")
          setPulseCheckControl(pulseCheckData)
          setModalVisibility("")
        })
    }
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
      <EditUser
        openModal={modalVisibility == "edit-user"}
        closeModal={closeModal}
        closeModalOnOverlayClick={false}
        closeIconVisibility={true}
        toggleUserAccount={changeAccountStatus}
        offerFreeTrial={offerFreeTrial}
        editPulseCheck={editPulseCheck}
      />
      <FreeTrial
        openModal={modalVisibility == "free-trial-modal"}
        closeModal={closeModal}
        closeModalOnOverlayClick={false}
        closeIconVisibility={true}
        offerFreeTrial={offerFreeTrial}
        _handleChange={_handleChange}
        _submitModal={_submitOfferFreeTrial}
        modalControl={modalControl}
      />
      <AdminUpdatePulseCheck
        openModal={modalVisibility == "admin-update-pulse-check"}
        closeModal={closeModal}
        closeModalOnOverlayClick={false}
        closeIconVisibility={true}
        _handleChange={_handlePulseChange}
        _submitModal={_submitUpdatePulseCheck}
        modalControl={pulseCheckControl}
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
        <button
          data-cy="create-new-user-account"
          onClick={createAccount}
          className="mt-10 flex justify-end mb-8"
        >
          <a
            href="#"
            className="primary-btn bg-[#04477B] text-white rounded-md py-2 font-medium flex items-center gap-2"
          >
            <span className="text-3xl">+</span> Create Account
          </a>
        </button>
        <section
          className="rounded-xl h-[676px] border-[1px] flex justify-between flex-col"
          ref={paginationRef}
        >
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
          <Pagination
            totalPages={admin.totalPages}
            currentPage={currentPage}
            parentRef={paginationRef}
            setCurrentPage={setCurrentPage}
          />
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
  editUser: (email: string, status: string) => void
  deleteUser: (id: string) => void
}) {
  const [userImage, setUserImage] = useState("")
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
        <p
          data-cy={`${_props.displayName}-user`}
          className="text-[#00192B] text-lg font-semibold"
        >
          {_props.displayName}
        </p>
      </td>
      <td
        data-cy={`user-${_props.joining_date}`}
        className="w-[120px] text-[#4D4D4D] font-medium text-sm"
      >
        {_props.joining_date}
      </td>
      <td
        data-cy={`user-${_props.plan}`}
        className="w-[80px] text-[#4D4D4D] font-medium text-sm"
      >
        {_props.plan}
      </td>

      <td
        data-cy={`user-${_props.payment_status}`}
        className={
          _props.payment_status.toLowerCase() === "paid"
            ? "w-[80px] text-[#27AE60] font-medium text-sm"
            : _props.payment_status.toLowerCase() === "overdue"
            ? "w-[80px] text-[#5CEAD2] font-medium text-sm"
            : "w-[80px] text-[#F44336] font-medium text-sm"
        }
      >
        {_props.payment_status}
      </td>
      <td
        data-cy={`user-${_props.account_status}`}
        className={
          _props.account_status.toLowerCase() === "active"
            ? "w-[80px] text-[#27AE60] font-medium text-sm"
            : // eslint-disable-next-line no-constant-condition
            _props.payment_status.toLowerCase() === "blocked" || "deleted"
            ? "w-[80px] text-[#F44336] font-medium text-sm"
            : "w-[80px] text-[#000] font-medium text-sm"
        }
      >
        {_props.account_status}
      </td>
      <td className="w-[170px] text-[#4D4D4D] font-medium text-xs">
        <p data-cy={`user-${_props.pulse_status}`}>{_props.pulse_status}</p>
        <span
          data-cy={`user-${_props.pulseStatusSubtile}`}
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
            data-cy="view-user-button"
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
                pulse_status: _props.pulse_status,
              })
            }}
          />
          <img
            data-cy="edit-user-button"
            src={edit}
            alt="edit icon"
            className="cy-edit-asset-btn cursor-pointer"
            id="cy-edit-asset-btn"
            onClick={() => {
              _props.editUser(_props.email, _props.account_status)
            }}
          />
          <img
            data-cy="delete-user-button"
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
