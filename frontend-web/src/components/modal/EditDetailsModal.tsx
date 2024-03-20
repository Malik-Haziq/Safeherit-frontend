import facebook from "@images/facebook.svg"
import twitter from "@images/twitter.svg"
import instagram from "@images/insta.svg"
import profilePic from "@images/profile-pic.svg"
import closeIcon from "@images/close-icon.svg"
import { IoMdCloseCircle } from "react-icons/io"
import uploadVideoIcon from "@images/upload-video.svg"

import { toast } from "@/components"

interface CustomChangeEvent {
  target: {
    name: string
    value: string | ArrayBuffer | null | undefined
  }
}

export const EditDetailsModal = (_props: {
  openModal: boolean
  closeModal: any
  closeModalOnOverlayClick: boolean
  isBeneficiary: boolean
  modalControl: any
  setModalControl: () => void
  handleSubmit: () => void
  _handleChange: () => void
  imageUpload: any
  setImageUpload: any
  videoUpload?: any
  setVideoUpload?: any
  _handleDiscard: () => void
}) => {
  const handleImageInputChange = (event: any) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const dataURL = e.target?.result
        _props.setImageUpload(dataURL)
        const customEvent: CustomChangeEvent = {
          target: {
            name: "profile_image",
            value: file,
          },
        }
        _props._handleChange(customEvent as React.ChangeEvent<HTMLInputElement>)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleVideoInputChange = (event: any) => {
    const maxSize = 100 * 1024 * 1024
    const file = event.target.files[0]

    if (file) {
      if (file.size > maxSize) {
        toast("Video's size should be less than 100MBs", "error")
      } else {
        const reader = new FileReader()
        reader.onload = (e) => {
          const dataURL = e.target?.result
          _props.setVideoUpload(dataURL)
          const customEvent: CustomChangeEvent = {
            target: {
              name: "personalized_video",
              value: file,
            },
          }
          _props._handleChange(
            customEvent as React.ChangeEvent<HTMLInputElement>,
          )
        }
        reader.readAsDataURL(file)
      }
    }
  }

  return (
    <>
      {_props.openModal && (
        <>
          <div className="bg-[#00000066] absolute top-0 left-0 h-screen w-screen z-10"></div>
          <div className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-[1070px] bg-white rounded-2xl border border-[#04477B]">
              <div className="h-[56px] w-full bg-[#f6f6f6] flex items-center rounded-tl-3xl rounded-tr-3xl border border-b-[#04477B]">
                <div className="text-[#00192b] font-bold text-center text-lg flex-1">
                  {_props.isBeneficiary
                    ? "Edit beneficiary details"
                    : "Edit validator details"}
                </div>
                <div className="flex-[0.06]" onClick={_props.closeModal}>
                  <img
                    src={closeIcon}
                    alt="close icon"
                    className="cursor-pointer mx-auto"
                  />
                </div>
              </div>
              <main className="flex flex-col pl-11 pr-7 py-7">
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageInputChange}
                    name="profile_image"
                    className="opacity-0 absolute top-0 left-96 h-20 w-[220px]"
                  />
                  <div className="flex items-center justify-center gap-2 mb-8">
                    <span className="text-[#858992] font-medium">
                      Click to upload <br /> a profile picture →
                    </span>
                    {_props.imageUpload ? (
                      <div className="relative">
                        <img
                          src={_props.imageUpload || profilePic}
                          alt="user image"
                          className="w-20 h-20 rounded-full object-contain"
                        />
                        <span
                          className="absolute top-0 right-0 text-red-900 cursor-pointer"
                          onClick={() => {
                            _props.setImageUpload("")
                            _props._handleDiscard("profile_image", "")
                          }}
                        >
                          <IoMdCloseCircle size={"20px"} />
                        </span>
                      </div>
                    ) : (
                      <img
                        src={profilePic}
                        alt="user image"
                        className="w-20 h-20 rounded-full object-contain"
                      />
                    )}
                  </div>
                </div>
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
                          hasRightIcon={false}
                          name={"name"}
                          type={"text"}
                          inputStyles={"w-[260px]"}
                          inputContainerStyles={""}
                          modalControl={_props.modalControl}
                          setModalControl={_props.setModalControl}
                        />
                      </div>
                      <div className="flex justify-between items-center gap-3">
                        <TextView
                          text="Email"
                          textStyles="text-[#00192B] font-medium"
                        />
                        <InputField
                          hasRightIcon={false}
                          name={"primary_email"}
                          type={"text"}
                          inputStyles={"w-[260px]"}
                          inputContainerStyles={""}
                          modalControl={_props.modalControl}
                          setModalControl={_props.setModalControl}
                        />
                      </div>
                      <div className="flex justify-between items-center gap-3">
                        <TextView
                          text="Backup email 1"
                          textStyles="text-[#00192B] font-medium"
                        />
                        <InputField
                          hasRightIcon={false}
                          name={"backup_email"}
                          type={"text"}
                          inputStyles={"w-[260px]"}
                          inputContainerStyles={""}
                          modalControl={_props.modalControl}
                          setModalControl={_props.setModalControl}
                        />
                      </div>
                      <div className="flex justify-between items-center gap-3">
                        <TextView
                          text="Backup email 2"
                          textStyles="text-[#00192B] font-medium"
                        />
                        <InputField
                          hasRightIcon={false}
                          name={"backup_email2"}
                          type={"text"}
                          inputStyles={"w-[260px]"}
                          inputContainerStyles={""}
                          modalControl={_props.modalControl}
                          setModalControl={_props.setModalControl}
                        />
                      </div>
                      <div className="flex justify-between items-center gap-3">
                        <TextView
                          text="Phone number"
                          textStyles="text-[#00192B] font-medium"
                        />
                        <InputField
                          hasRightIcon={false}
                          name={"phone_number"}
                          type={"text"}
                          inputStyles={"w-[260px]"}
                          inputContainerStyles={""}
                          modalControl={_props.modalControl}
                          setModalControl={_props.setModalControl}
                        />
                      </div>
                      <div className="flex justify-between items-center gap-3">
                        <TextView
                          text="Backup phone number"
                          textStyles="text-[#00192B] font-medium"
                        />
                        <InputField
                          hasRightIcon={false}
                          name={"backup_phone_number"}
                          type={"text"}
                          inputStyles={"w-[260px]"}
                          inputContainerStyles={""}
                          modalControl={_props.modalControl}
                          setModalControl={_props.setModalControl}
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
                          hasRightIcon={true}
                          name={"facebook_link"}
                          type={"text"}
                          inputStyles={""}
                          inputContainerStyles={"relative"}
                          icon={facebook}
                          iconAlt="facebook icon"
                          rightIconStyles="absolute right-4 top-2 w-6"
                          modalControl={_props.modalControl}
                          setModalControl={_props.setModalControl}
                        />
                      </div>
                      <div>
                        <InputField
                          hasRightIcon={true}
                          name={"instagram_username"}
                          type={"text"}
                          inputStyles={""}
                          inputContainerStyles={"relative"}
                          icon={instagram}
                          iconAlt="facebook icon"
                          rightIconStyles="absolute right-4 top-2 w-6"
                          modalControl={_props.modalControl}
                          setModalControl={_props.setModalControl}
                        />
                      </div>
                      <div>
                        <InputField
                          hasRightIcon={true}
                          name={"twitter_username"}
                          type={"text"}
                          inputStyles={""}
                          inputContainerStyles={"relative"}
                          icon={twitter}
                          iconAlt="facebook icon"
                          rightIconStyles="absolute right-4 top-3 w-5"
                          modalControl={_props.modalControl}
                          setModalControl={_props.setModalControl}
                        />
                      </div>
                    </div>
                  </aside>
                  {_props.isBeneficiary === true ? (
                    <aside className="flex flex-col gap-5 items-end">
                      <div className="flex flex-col items-end gap-5">
                        <TextView
                          text="Personalized Message"
                          textStyles="text-[#00192B] font-bold"
                        />
                        <TextArea
                          name="personalized_message"
                          modalControl={_props.modalControl}
                          setModalControl={_props.setModalControl}
                          styles="w-[446px] h-[112px]"
                        />
                      </div>
                      {/* {_props.videoUpload ? (
                      <div className="flex flex-col items-end gap-1">
                        <TextView
                          text="Testament Video"
                          textStyles="text-[#00192B] font-bold"
                        />
                        <video
                          controls
                          className="max-h-[186px] max-w-[446px]"
                        >
                          <source src={_props.videoUpload} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    ) : (
                      <div></div>
                    )} */}
                      <div className="relative">
                        <input
                          data-cy="beneficiary-video-input"
                          type="file"
                          accept="video/*"
                          name="personalized_video"
                          onChange={handleVideoInputChange}
                          className="opacity-0 absolute top-0 left-0 h-20 w-[340px]"
                        />
                        <div className="flex items-center justify-center gap-2 mb-8">
                          <span className="text-[#858992]">
                            Click to upload a video . <br /> This will replace
                            the existing one →
                          </span>
                          {_props.videoUpload ? (
                            <div className="relative ">
                              <video
                                controls
                                className="w-20 h-20 rounded-full"
                              >
                                <source
                                  src={_props.videoUpload}
                                  type="video/mp4"
                                />
                                Your browser does not support the video tag.
                              </video>
                              <span
                                className="absolute top-0 right-0 text-red-900 cursor-pointer"
                                onClick={() => {
                                  _props.setVideoUpload("")
                                  _props._handleDiscard(
                                    "personalized_video",
                                    "",
                                  )
                                }}
                              >
                                <IoMdCloseCircle size={"20px"} />
                              </span>
                            </div>
                          ) : (
                            <img
                              src={uploadVideoIcon}
                              alt="upload video"
                              className="w-20 h-20"
                            />
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="flex justify-between items-center mb-2">
                          <button className="primary-btn px-12 rounded-xl bg-[#47B29E]">
                            Change
                          </button>
                          <TextView
                            text="Public Key"
                            textStyles="text-[#00192B] font-bold"
                          />
                        </div>
                        <TextArea
                          name="public_key"
                          disabled={true}
                          modalControl={_props.modalControl}
                          setModalControl={_props.setModalControl}
                          styles="w-[446px] h-[112px]"
                        />
                      </div>
                      <button
                        className="primary-btn px-12 rounded-xl"
                        onClick={() => _props.handleSubmit()}
                      >
                        Done
                      </button>
                    </aside>
                  ) : (
                    <aside className="flex flex-col gap-5 items-end">
                      <TextView
                        text="Personalized Message"
                        textStyles="text-[#00192B] font-bold"
                      />
                      <TextArea
                        name={"personalized_message"}
                        modalControl={_props.modalControl}
                        setModalControl={_props.setModalControl}
                      />
                      <button
                        className="primary-btn px-12 rounded-xl"
                        onClick={() => _props.handleSubmit()}
                      >
                        Done
                      </button>
                    </aside>
                  )}
                </section>
              </main>
            </div>
          </div>
        </>
      )}
    </>
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
  inputStyles?: string
  hasRightIcon?: boolean
  icon?: string
  iconAlt?: string
  iconPress?: React.MouseEventHandler<HTMLImageElement>
  rightIconStyles?: string
  inputContainerStyles?: string
  modalControl: any
  setModalControl: any
}) {
  const _handleChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target
    _props.setModalControl({ ..._props.modalControl, [name]: value })
  }

  return (
    <div className={_props.inputContainerStyles}>
      <input
        name={_props.name || ""}
        type={_props.type || "text"}
        value={_props.modalControl[_props.name]}
        onChange={_handleChange}
        className={
          _props.inputStyles +
          " bg-[#F5FAFD] py-4 px-4 h-[40px] w-full text-[#00192B] outline-none rounded-2xl border-[1px] border-[#065A934D] focus:bg-[#e8f2f8] focus:border-[#065b9371]"
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

function TextArea(_props: {
  name: string
  modalControl: any
  setModalControl: any
  styles?: string
  disabled?: boolean
}) {
  const _handleChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target
    _props.setModalControl({
      ..._props.modalControl,
      [name]: value,
    })
  }

  return (
    <textarea
      name={_props.name}
      value={_props.modalControl[_props.name]}
      onChange={_handleChange}
      className={
        _props.styles +
        " bg-[#F5FAFD] rounded-3xl text-[#6F767B] py-7 px-5 overflow-auto border-[1px] border-[#065A934D] focus:bg-[#e8f2f8] focus:border-[#065b9371] focus:outline-none resize-none "
      }
      disabled={_props.disabled}
    ></textarea>
  )
}
