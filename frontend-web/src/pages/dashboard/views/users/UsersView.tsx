import styles from "../../Dashboard.module.css"
import eye from "@images/eye.svg"
import edit from "@images/edit.svg"
import leftArrow from "@images/left-arrow.svg"
import rightArrow from "@images/right-arrow.svg"
import deleteIcon from "@images/delete.svg"
import { UserDetails } from "../users/modal_admin"

export default function UsersView() {
  const users = [
    {
      userImg: eye,
      userName: "Jonathon Smith",
      joiningDate: "24 aug 2023",
      plan: "Yearly",
      payment: "paid",
      account: "active",
      pulseStatusTitle: "Next schedule",
      pulseStatusSubtile: "12 Apr 2023",
    },
    {
      userImg: eye,
      userName: "Jonathon Smith",
      joiningDate: "24 aug 2023",
      plan: "Yearly",
      payment: "overdue",
      account: "Deactivate",
      pulseStatusTitle: "Next schedule",
      pulseStatusSubtile: "12 Apr 2023",
    },
    {
      userImg: eye,
      userName: "Jonathon Smith",
      joiningDate: "24 aug 2023",
      plan: "Monthly",
      payment: "blocked",
      account: "active",
      pulseStatusTitle: "Next schedule",
      pulseStatusSubtile: "Pending Login",
    },
    {
      userImg: eye,
      userName: "Jonathon Smith",
      joiningDate: "24 aug 2023",
      plan: "Yearly",
      payment: "paid",
      account: "Deleted",
      pulseStatusTitle: "Next schedule",
      pulseStatusSubtile: "Waiting for answer",
    },
  ]

  console.log(users[0].pulseStatusSubtile.toLowerCase())
  const modalControl = {
    Name: "Rayan Adlardard",
    "Joining date": "12 Apr 2023",
    Plan: "yearly",
    Payment: "paid",
    Account: "active",
    "Pulse status": { title: "Next schedule", subTitle: "Waiting for answer" },
  }
  return (
    <div className={styles.AppView}>
      {/* <UserDetails
        openModal={true}
        closeModal={false}
        closeModalOnOverlayClick={true}
        closeIconVisibility={true}
        action={""}
        modalControl={modalControl}
      /> */}
      <main className="p-5 mx-auto w-[1101px]">
        <section className="mt-10 flex justify-end mb-8">
          <a
            href="#"
            className="primary-btn bg-[#04477B] text-white rounded-md py-2 font-medium flex items-center gap-2"
          >
            <span className="text-3xl">+</span> Create Account
          </a>
        </section>
        <section className="rounded-xl h-[676px] border-[1px] flex justify-between flex-col">
          <table className="rounded-3xl ">
            <thead className="bg-[#F2F2F2] px-5 py-3 rounded-t-xl text-sm uppercase border-[1px] border-[#E5E5E5]">
              <th className="w-[240px] text-start">
                <p className="pl-5 py-3 font-medium">user</p>
              </th>
              <th className="w-[140px] text-start font-medium">joining Date</th>
              <th className="w-[100px] text-start font-medium">plan</th>
              <th className="w-[100px] text-start font-medium">payment</th>
              <th className="w-[170px] text-start font-medium">account</th>
              <th className="w-[180px] text-start font-medium">pulse Status</th>
              <th className="pr-5 font-medium">Action</th>
            </thead>
            <tbody>
              {users.map((user) => {
                return (
                  <User
                    userImg={user.userImg}
                    userName={user.userName}
                    joiningDate={user.joiningDate}
                    plan={user.plan}
                    payment={user.payment}
                    account={user.account}
                    pulseStatusTitle={user.pulseStatusTitle}
                    pulseStatusSubtile={user.pulseStatusSubtile}
                  />
                )
              })}
            </tbody>
          </table>
          <div className="flex items-center justify-between p-5">
            <button className="px-4 py-2 text-[#04477B] border-[1px] border-[#04477B] rounded-lg flex items-center justify-center gap-2">
              <img src={leftArrow} alt="left arrow" />
              Previous
            </button>
            <div className="flex items-center justify-center">
              <div className="w-12 h-12 text-[#04477B] bg-[#E6EDF2] flex items-center justify-center rounded-lg cursor-pointer">
                1
              </div>
              <div className="w-12 h-12 flex items-center justify-center cursor-pointer">
                2
              </div>
              <div className="w-12 h-12 flex items-center justify-center cursor-pointer">
                3
              </div>
            </div>
            <button className="px-4 py-2 text-[#04477B] border-[1px] border-[#04477B] rounded-lg flex items-center justify-center gap-2">
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
  joiningDate: string
  plan: string
  payment: string
  account: string
  pulseStatusTitle: string
  pulseStatusSubtile: string
}) {
  return (
    <tr className="border-b-[1px] border-x-[1px] border-[#E5E5E5] h-16 rounded-2xl">
      <td className="w-[220px] pl-5 flex items-center gap-3 content-center h-16">
        <img src={edit} alt="user image" className="w-9 h-9 rounded-full" />
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
            onClick={() => {}}
          />
          <img
            src={edit}
            alt="edit icon"
            className="cy-edit-asset-btn cursor-pointer"
            id="cy-edit-asset-btn"
            onClick={() => {}}
          />
          <img
            src={deleteIcon}
            alt="delete icon"
            className="cy-del-asset-btn cursor-pointer"
            id="cy-del-asset-btn"
            onClick={() => {}}
          />
        </div>
      </td>
    </tr>
  )
}
