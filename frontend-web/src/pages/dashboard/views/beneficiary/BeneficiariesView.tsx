import {
  EditBeneficiaryModal_1,
  EditBeneficiaryModal_2,
  EditBeneficiaryModal_3,
  EditBeneficiaryModal_4,
} from "./modal_beneficiary"
import styles from "../../Dashboard.module.css"
import userIcon from "../../../../../assets/images/user-icon.svg"
import addIcon from "../../../../../assets/images/add-icon.svg"
import dots from "../../../../../assets/images/dots.svg"
import facebook from "../../../../../assets/images/facebook.svg"
import instagram from "../../../../../assets/images/insta.svg"
import twitter from "../../../../../assets/images/twitter.svg"
import userImg from "../../../../../assets/images/user.svg"

export default function BeneficiariesView() {
  const beneficiaries = [
    {
      userImg: "../../../../../assets/images/user.svg",
      userName: "Cameron Wills",
      email: "jenny026@gmail.com",
      phoneNumber: "+91 952 3641 254",
      backupPhoneNumber: "+91 2541 3652 256",
    },
    {
      userImg: "../../../../../assets/images/user.svg",
      userName: "Rock Miller",
      email: "james123@gmail.com",
      phoneNumber: "+91 2541 3652 256",
      backupPhoneNumber: "+91 2541 3652 256",
    },
    {
      userImg: "../../../../../assets/images/user.svg",
      userName: "Brooklyn Simmons",
      email: "brs56025@gmail.com",
      phoneNumber: "+91 2541 3652 256",
      backupPhoneNumber: "+91 2541 3652 256",
    },
    {
      userImg: "../../../../../assets/images/user.svg",
      userName: "Leslie Alexander",
      email: "lesliealex@gmail.com",
      phoneNumber: "+91 2541 3652 256",
      backupPhoneNumber: "+91 2541 3652 256",
    },
  ]
  return (
    <div className={styles.AppView}>
      {/* <EditBeneficiaryModal_1
        openModal={true}
        closeModal={false}
        closeModalOnOverlayClick={true}
        modalTitle="Edit Beneficiary Details"
        closeIconVisibility={true}
      /> */}
      <EditBeneficiaryModal_4
        openModal={false}
        closeModal={false}
        closeModalOnOverlayClick={true}
        modalTitle="Edit Beneficiary Details"
        closeIconVisibility={true}
      />
      <section className="px-8 py-4">
        <div className="flex justify-between items-center shadow-md p-4 rounded-xl">
          <div className="flex">
            <div className="w-14 h-14 bg-safe-light-blue-tint flex justify-center items-center rounded-xl">
              <img src={userIcon} alt="user icon" />
            </div>
            <div className="ml-2 flex flex-col justify-center">
              <p className="text-black font-semibold">5</p>
              <small className="text-safe-text-light-gray-tint text-xm">
                Beneficiaries
              </small>
            </div>
          </div>
          <img src={addIcon} alt="add icon" className="cursor-pointer" />
        </div>
      </section>

      <section className={styles.beneficiaries}>
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

          {beneficiaries.map((beneficiary) => {
            return (
              <Beneficiary
                userImg={beneficiary.userImg}
                userName={beneficiary.userName}
                email={beneficiary.email}
                phoneNumber={beneficiary.phoneNumber}
                backupPhoneNumber={beneficiary.backupPhoneNumber}
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
}) {
  return (
    <ul className="grid grid-cols-5 items-center py-3 px-7 text-safe-text-black-tint">
      <li className="flex items-center gap-4 text-black">
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
        <img src={dots} alt="dots" className="w-6 cursor-pointer" />
      </li>
    </ul>
  )
}
