import styles from "./Modal.module.css"
import userImage from "../../../assets/images/user.svg"
import closeIcon from "../../../assets/images/close-icon.svg"
import facebookIcon from "../../../assets/images/facebook.svg"
import instagramIcon from "../../../assets/images/insta.svg"
import twitterIcon from "../../../assets/images/twitter.svg"
import copy from "../../../assets/images/copy-icon.svg"
import testimentVideo from "../../../assets/images/register_page_video.png"

export const UserDetailsModal = (_props: {
  openModal: boolean
  closeModal: any
  closeModalOnOverlayClick: boolean
  view: string
  closeIconVisibility: boolean
  modalControl: {
    id?: string,
    name: string
    primary_email: string
    backup_email: string
    backup_email2: string
    phone_number: string
    backup_phone_number: string
    facebook_link: string
    instagram_username: string
    twitter_username: string
    personalized_message?: string
    message?: string
    personalized_video_link?: string
    image: string
  }
}) => {
  return (
    <>
      {_props.openModal && (
        <div
          className={styles.backDrop}
        >
          <div className={styles.modalContainer}>
            <div className="w-[1070px] bg-white rounded-2xl border border-[#04477B]">
              <ModalHeader
                closeModal={_props.closeModal}
                title={_props.view == 'validator' ? "View Validator Details" : "View Beneficiary Details"}
                closeIconVisibility={_props.closeIconVisibility}
              />
              <main className="flex flex-col pl-11 pr-7 py-7">
                <img
                  src={_props.modalControl.image || userImage}
                  alt="validator image"
                  className="w-[88px] h-[88px] rounded-full mx-auto"
                />
                <section className="flex justify-between gap-[45px]">
                  <aside>
                    <div className="flex flex-col gap-2 mb-10 ">
                      <TextView
                        text="Personal info"
                        textStyles="text-[#00192B] font-bold mb-3"
                      />
                      <div className="flex justify-between items-center gap-3 w-full">
                        <TextView
                          text="Name"
                          textStyles="text-[#00192B] font-medium"
                        />
                        <InputField
                          value={_props.modalControl.name}
                          _handleChange={() => {}}
                          hasRightIcon={false}
                          name={"name"}
                          type={"text"}
                          inputStyles={"w-[260px]"}
                          inputContainerStyles={""}
                        />
                      </div>
                      <div className="flex justify-between items-center gap-3">
                        <TextView
                          text="Email"
                          textStyles="text-[#00192B] font-medium"
                        />
                        <InputField
                          value={_props.modalControl.primary_email}
                          _handleChange={() => {}}
                          hasRightIcon={false}
                          name={"primary_email"}
                          type={"text"}
                          inputStyles={"w-[260px]"}
                          inputContainerStyles={""}
                        />
                      </div>
                      <div className="flex justify-between items-center gap-3">
                        <TextView
                          text="Backup email 1"
                          textStyles="text-[#00192B] font-medium"
                        />
                        <InputField
                          value={_props.modalControl.backup_email}
                          _handleChange={() => {}}
                          hasRightIcon={false}
                          name={"backup_email"}
                          type={"text"}
                          inputStyles={"w-[260px]"}
                          inputContainerStyles={""}
                        />
                      </div>
                      <div className="flex justify-between items-center gap-3">
                        <TextView
                          text="Backup email 2"
                          textStyles="text-[#00192B] font-medium"
                        />
                        <InputField
                          value={_props.modalControl.backup_email2}
                          _handleChange={() => {}}
                          hasRightIcon={false}
                          name={"backup_email2"}
                          type={"text"}
                          inputStyles={"w-[260px]"}
                          inputContainerStyles={""}
                        />
                      </div>
                      <div className="flex justify-between items-center gap-3">
                        <TextView
                          text="Phone number"
                          textStyles="text-[#00192B] font-medium"
                        />
                        <InputField
                          value={_props.modalControl.phone_number}
                          _handleChange={() => {}}
                          hasRightIcon={false}
                          name={"phone_number"}
                          type={"text"}
                          inputStyles={"w-[260px]"}
                          inputContainerStyles={""}
                        />
                      </div>
                      <div className="flex justify-between items-center gap-3">
                        <TextView
                          text="Backup phone number"
                          textStyles="text-[#00192B] font-medium"
                        />
                        <InputField
                          value={_props.modalControl.backup_phone_number}
                          _handleChange={() => {}}
                          hasRightIcon={false}
                          name={"backup_phone_number"}
                          type={"text"}
                          inputStyles={"w-[260px]"}
                          inputContainerStyles={""}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-3 justify-between">
                      <TextView
                        text="Social Media Links"
                        textStyles="text-[#00192B] font-bold"
                      />
                      <div>
                        <InputField
                          value={_props.modalControl.facebook_link}
                          _handleChange={() => {}}
                          hasRightIcon={true}
                          name={"facebook_link"}
                          type={"text"}
                          inputStyles={""}
                          inputContainerStyles={""}
                          icon="../../../assets/images/facebook.svg"
                          iconAlt="facebook icon"
                          rightIconStyles="absolute right-4 top-4"
                        />
                      </div>
                      <div>
                        <InputField
                          value={_props.modalControl.instagram_username}
                          _handleChange={() => {}}
                          hasRightIcon={true}
                          name={"instagram_username"}
                          type={"text"}
                          inputStyles={""}
                          inputContainerStyles={""}
                        />{" "}
                      </div>
                      <div>
                        <InputField
                          value={_props.modalControl.twitter_username}
                          _handleChange={() => {}}
                          hasRightIcon={true}
                          name={"twitter_username"}
                          type={"text"}
                          inputStyles={""}
                          inputContainerStyles={""}
                        />{" "}
                      </div>
                    </div>
                  </aside>
                  {_props.view == 'validator' ? (
                    <aside className="flex flex-col gap-5 items-end">
                      <TextView
                        text="Personalized Message"
                        textStyles="text-[#00192B] font-bold"
                      />
                      <div className="w-[446px] h-[510px] bg-[#F2F2F2] rounded-3xl text-[#6F767B] py-7 px-5 overflow-auto border-[rgba(6, 90, 147, 0.30)] border-2">
                        {_props.modalControl.message}
                      </div>
                    </aside>
                  ) : (
                    <aside className="flex flex-col gap-5 items-end">
                      <div className="flex flex-col items-end gap-5">
                        <TextView
                          text="Personalized Message"
                          textStyles="text-[#00192B] font-bold"
                        />
                        <div className="w-[446px] h-[112px] bg-[#F2F2F2] rounded-3xl text-[#6F767B] py-2 px-4 overflow-auto border-[rgba(6, 90, 147, 0.30)]  border-2 ">
                          {_props.modalControl.personalized_message}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <TextView
                          text="Testament Video"
                          textStyles="text-[#00192B] font-bold"
                        />
                        <img
                          src={_props.modalControl.personalized_video_link || testimentVideo}
                          alt="testment video"
                          className="h-[186px]"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="flex justify-between">
                          <p className="flex cursor-pointer">
                            <span className="text-sm text-[#858992]">Copy</span>
                            <img src={copy} alt="copy icon" />
                          </p>
                          <TextView
                            text="Public Key"
                            textStyles="text-[#00192B] font-bold"
                          />
                        </div>
                        <div className="w-[446px] h-[112px] bg-[#F2F2F2] rounded-3xl text-[#6F767B] py-2 px-4 overflow-auto border-[rgba(6, 90, 147, 0.30)]  border-2  ">
                          Public key
                        </div>
                      </div>
                    </aside>
                  )}
                </section>
              </main>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function ModalHeader(_props: {
  closeModal: () => void
  title: string
  closeIconVisibility: boolean
}) {
  return (
    <div className="h-[56px] w-full bg-[#f6f6f6] flex items-center rounded-tl-3xl rounded-tr-3xl border border-b-[#04477B]">
      <div className={styles.title}>{_props.title}</div>
      {_props.closeIconVisibility && (
        <div className={styles.icon} onClick={_props.closeModal}>
          <img
            src={closeIcon}
            alt="close icon"
            className="cursor-pointer mx-auto"
          />
        </div>
      )}
    </div>
  )
}

function TextView(_props: {
  textStyles: string
  onclick?: React.MouseEventHandler<HTMLParagraphElement>
  text: string
}) {
  return (
    <p
      className={_props.textStyles || "safe-font-default"}
      onClick={_props.onclick}
    >
      {_props.text}
    </p>
  )
}

function InputField(_props: {
  name: string
  type: string
  value: string
  _handleChange: any
  inputStyles: string
  hasRightIcon?: boolean
  icon?: string
  iconAlt?: string
  iconPress?: React.MouseEventHandler<HTMLImageElement>
  rightIconStyles?: string
  inputContainerStyles: string
}) {
  return (
    <div className={_props.inputContainerStyles}>
      <input
        name={_props.name || ""}
        type={_props.type || "text"}
        value={_props.value}
        onChange={_props._handleChange}
        disabled
        className={
          _props.inputStyles +
          " bg-[#F2F2F2] py-4 px-4 h-[40px] w-full text-[#00192B] outline-none rounded-3xl border-2 border-[rgba(6, 90, 147, 0.30)]"
        }
      />
      {_props.hasRightIcon && (
        <img
          src={_props.icon}
          alt={_props.iconAlt}
          onClick={_props.iconPress}
          className={
            _props.rightIconStyles || "absolute right-4 top-4 cursor-pointer"
          }
        />
      )}
    </div>
  )
}

function userDetails(_props: {
  name: string
  email: string
  backup_email: string
  backup_email2: string
  phone_number: string
  backup_phone_number: string
  facebook_link: string
  instagram_username: string
  twitter_username: string
}) {
  return (
    <section>
      <div className="flex flex-col items-center gap-5">
        <TextView text="Personal info" textStyles="text-[#00192B] font-bold" />
        <div className="flex justify-between items-center gap-3">
          <TextView text="Name" textStyles="text-[#00192B] font-medium" />
          <InputField
            value={_props.name}
            _handleChange={() => {}}
            hasRightIcon={false}
            name={""}
            type={""}
            inputStyles={""}
            inputContainerStyles={""}
          />
        </div>
        <div className="flex justify-between items-center gap-3">
          <TextView text="Email" textStyles="text-[#00192B] font-medium" />
          <InputField
            value={_props.email}
            _handleChange={() => {}}
            hasRightIcon={false}
            name={""}
            type={""}
            inputStyles={""}
            inputContainerStyles={""}
          />
        </div>
        <div className="flex justify-between items-center gap-3">
          <TextView
            text="Backup email 1"
            textStyles="text-[#00192B] font-medium"
          />
          <InputField
            value={_props.backup_email}
            _handleChange={() => {}}
            hasRightIcon={false}
            name={""}
            type={""}
            inputStyles={""}
            inputContainerStyles={""}
          />
        </div>
        <div className="flex justify-between items-center gap-3">
          <TextView
            text="Backup email 2"
            textStyles="text-[#00192B] font-medium"
          />
          <InputField
            value={_props.backup_email2}
            _handleChange={() => {}}
            hasRightIcon={false}
            name={""}
            type={""}
            inputStyles={""}
            inputContainerStyles={""}
          />
        </div>
        <div className="flex justify-between items-center gap-3">
          <TextView
            text="Phone number"
            textStyles="text-[#00192B] font-medium"
          />
          <InputField
            value={_props.phone_number}
            _handleChange={() => {}}
            hasRightIcon={false}
            name={""}
            type={""}
            inputStyles={""}
            inputContainerStyles={""}
          />
        </div>
        <div className="flex justify-between items-center gap-3">
          <TextView
            text="Backup phone number"
            textStyles="text-[#00192B] font-medium"
          />
          <InputField
            value={_props.backup_phone_number}
            _handleChange={() => {}}
            hasRightIcon={false}
            name={""}
            type={""}
            inputStyles={""}
            inputContainerStyles={""}
          />
        </div>
      </div>
      <div className="flex flex-col ">
        <TextView
          text="Social Media Links"
          textStyles="text-[#00192B] font-bold"
        />
        <div>
          <InputField
            value={_props.facebook_link}
            _handleChange={() => {}}
            hasRightIcon={false}
            name={""}
            type={""}
            inputStyles={""}
            inputContainerStyles={""}
          />
        </div>
        <div>
          <InputField
            value={_props.instagram_username}
            _handleChange={() => {}}
            hasRightIcon={false}
            name={""}
            type={""}
            inputStyles={""}
            inputContainerStyles={""}
          />{" "}
        </div>
        <div>
          <InputField
            value={_props.twitter_username}
            _handleChange={() => {}}
            hasRightIcon={false}
            name={""}
            type={""}
            inputStyles={""}
            inputContainerStyles={""}
          />{" "}
        </div>
      </div>
    </section>
  )
}
