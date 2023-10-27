import logo from "@images/safeherit_logo.svg"
import loginImg from "@images/login-img.png"
import star from "@images/star.svg"

import { ChangeEvent, useCallback, useState } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { getUser, login, resetPassword } from "@redux/actions"
import { useAppDispatch, useAppSelector } from "@redux/hooks"
import { ForgotPasswordModal, toast } from "@/components"
import {
  UserRolesModal,
  PrivateKeyModal,
  GeneratePrivateKey,
} from "./modal_login"
import {
  resetBeneficiaryOf,
  resetMapper,
  resetValidatorOf,
  updateActive,
  updateRole,
  updateRoleUser,
} from "@/redux/reducers/UserSlice"
import { SelectOption } from "@/types"

export function Login() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const user = useAppSelector((state) => state.user)

  const [formControl, setFormControl] = useState({
    email: "",
    password: "",
  })
  const [rememberMe, setRememberMe] = useState(false)
  const [modalVisibility, setModalVisibility] = useState("none")
  const [selectedBeneficiary, setSelectedBeneficiary] = useState<SelectOption>()
  const [selectedValidator, setSelectedValidator] = useState<SelectOption>()
  const [resetEmail, setResetEmail] = useState("")

  const closeModal = useCallback(() => {
    setModalVisibility("none")
    setResetEmail("")
  }, [])

  const _handleChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target
    setFormControl({ ...formControl, [name]: value })
  }

  const _setRememberMe = (event: { target: { checked: boolean } }) => {
    setRememberMe(event.target.checked)
  }

  const _handleSubmit = () => {
    toast("logging in", "info")
    if (formControl.email && formControl.password) {
      dispatch(
        login({ email: formControl.email, password: formControl.password }),
      )
        .unwrap()
        .then((res) => {
          dispatch(getUser({}))
            .unwrap()
            .catch()
            .then((res) => {
              if (res.data.data.isOwner && !res.data.data.isBeneficiary && !res.data.data.isValidator && !res.data.data.isAdmin && !res.data.data.isSuperAdmin) {
                setModalVisibility("none")
                dispatch(updateActive(true))
                dispatch(updateRole("owner"))
                navigate("/dashboard")
              } else {
                setModalVisibility("user-roles")
              }
            })
        })
        .catch((err) => {
          toast(err?.code, "error")
        })
    }
  }

  const _handleUserRolesSubmit = (selectedRole: string) => {
    if (
      selectedRole == "owner" || selectedRole == "super-admin" || selectedRole == "admin" ||
      (selectedRole == "beneficiary" && selectedBeneficiary) ||
      (selectedRole == "validator" && selectedValidator)
    ) {
      if (selectedRole == "beneficiary") {
        dispatch(updateRoleUser(user.userMap[selectedBeneficiary?.value || 0]))
      } else if (selectedRole == "validator") {
        dispatch(updateRoleUser(user.userMap[selectedValidator?.value || 0]))
      } else {
        dispatch(resetMapper())
        dispatch(resetValidatorOf())
        dispatch(resetBeneficiaryOf())
      }
      setModalVisibility("none")
      dispatch(updateActive(true))
      dispatch(updateRole(selectedRole))
      navigate("/dashboard")
    }
  }

  const _handleForgotPassword = () => {
    if (resetEmail) {
      dispatch(resetPassword({ email: resetEmail }))
        .unwrap()
        .catch()
        .then((res) => {
          toast("Email Sent", "info")
        })
        .finally(() => {
          closeModal()
        })
    }
  }

  return (
    <main className="flex flex-row justify-center lg:justify-between font-safe-font-default w-screen h-screen">
      <UserRolesModal
        openModal={modalVisibility == "user-roles"}
        closeModal={closeModal}
        closeModalOnOverlayClick={false}
        closeIconVisibility={true}
        isBeneficiary={user.isBeneficiary}
        isOwner={user.isOwner}
        isSuperAdmin={user.isSuperAdmin}
        isAdmin={user.isAdmin}
        isValidator={user.isValidator}
        userName={user.displayName}
        _beneficiaryOf={user._beneficiaryOf}
        _validatorOf={user._validatorOf}
        selectedBeneficiary={selectedBeneficiary}
        setSelectedBeneficiary={setSelectedBeneficiary}
        selectedValidator={selectedValidator}
        setSelectedValidator={setSelectedValidator}
        _handleUserRolesSubmit={_handleUserRolesSubmit}
      />
      <ForgotPasswordModal
        openModal={modalVisibility == "forgot-password"}
        closeModal={closeModal}
        closeModalOnOverlayClick={true}
        resetEmail={resetEmail}
        setResetEmail={setResetEmail}
        sendEmail={_handleForgotPassword}
      />
      <section className="pt-10 px-10 basis-2/5 flex flex-col gap-48">
        <img src={logo} alt="safeherit logo" className="h-8 w-40" />
        <div className="mx-auto">
          <h2 className="text-3xl mb-2 font-semibold font-monstrate text-safe-text-black">
            Login
          </h2>
          <p className="text-safe-text-black text-base mb-8 font-medium opacity-80">
            Login with your credential information
          </p>
          <form
            className="flex flex-col gap-5 mb-6"
            onSubmit={(e) => {
              e.preventDefault()
              _handleSubmit()
            }}
          >
            <InputField
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formControl.email}
              _handleChange={_handleChange}
              inputLable="Email"
            />

            <InputField
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formControl.password}
              _handleChange={_handleChange}
              inputLable="password"
            />
            <div className="flex justify-between items-center ">
              <div className="flex gap-2 text-safe-text-gray items-center justify-center  ">
                <input
                  type="checkbox"
                  className="mr-2 block h-5 w-5"
                  checked={rememberMe}
                  onChange={_setRememberMe}
                />
                <small className="text-base text-safe-text-black font-medium">
                  Remember Me
                </small>
              </div>
              <p
                className="text-safe-text-blue-shade font-medium cursor-pointer"
                onClick={() => {
                  setModalVisibility("forgot-password")
                }}
              >
                Forgot Password?
              </p>
            </div>
            <button className="primary-btn rounded-md bg-safe-blue-shade px-40">
              Login
            </button>
            <small className="text-sm text-safe-text-black font-medium mx-auto">
              Don't have an account?&nbsp;
              <a
                href="/signup"
                className="text-safe-text-dark-link-blue font-bold"
              >
                Sign up
              </a>
            </small>
          </form>
        </div>
        <footer className="flex justify-between">
          <small>© 2023 SafeHerit.com</small>
          <small>help@safeherit.com</small>
        </footer>
      </section>
      <section className="hidden lg:block basis-3/5 bg-safe-white-shade relative">
        <div className="pt-16 xl:pt-20 px-12 xl:px-20">
          <p className="font-medium text-3xl mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore
          </p>
          <div className="flex justify-between">
            <span className="font-semibold text-safe-text-black flex justify-center items-center gap-2 ">
              <div className=" w-5 h-[1px] bg-safe-black"></div>
              Rayan Adlardard
            </span>
            <div className="flex">
              <img src={star} alt="star icon" />
              <img src={star} alt="star icon" />
              <img src={star} alt="star icon" />
              <img src={star} alt="star icon" />
              <img src={star} alt="star icon" />
            </div>
          </div>
          <small>Founder, Safeherit</small>
        </div>
        <img
          src={loginImg}
          alt="dashboad image"
          className="absolute -bottom-10 xl:bottom-0 -right-10 xl:right-0 w-[500] h-[523] xl:max-w-[700px] xl:max-h-[623px]"
        />
      </section>
    </main>
  )
}

function InputField(_props: {
  type: string
  name: string
  placeholder: string
  value: string
  _handleChange: any
  inputLable: string
}) {
  const { type, name, placeholder, value, _handleChange, inputLable } = _props
  return (
    <div className="relative">
      <label className="text-safe-text-black font-semibold text-sm">
        {inputLable}*
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={_handleChange}
          required
          className="bg-safe-white py-4 px-4 w-full divide-safe-color-gray border rounded-[6px]"
        />
      </label>
    </div>
  )
}
