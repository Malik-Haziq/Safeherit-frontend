import React from "react"
import arrowRight from "@images/Arrow - Right.svg"
import registerPageVideo from "@images/register_page_video.png"
import safepal from "@images/Safepal.svg"
import { useNavigate } from "react-router-dom"
import { useCallback, useState } from "react"
import { GeneratePrivateKey, PrivateKeyModal } from "./modal_register_key"
import Encryption from "@/common/encryption/encryption"
import { toast } from "@/components"
import { copyToClipboard, downloadPEM } from "@/common/utils"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { updatePK } from "@/redux/actions"
import { setLoaderVisibility } from "@/redux/reducers/LoaderSlice"

const initialState = {
  publicKey: "",
  privateKey: "",
}

export default function RegisterKey() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const encryptionService = new Encryption()

  const stopLoader = () => dispatch(setLoaderVisibility(false))
  const startLoader = () => dispatch(setLoaderVisibility(true))

  const user = useAppSelector((state) => state.user)

  const [modalVisibility, setModalVisibility] = useState("none")
  const [modalControl, setModalControl] = useState(initialState)
  const [filePresent, setFilePresent] = useState(false)
  const [fileName, setFileName] = useState("")

  const closeModal = useCallback(() => {
    setModalControl(initialState)
    setModalVisibility("none")
    setFilePresent(false)
    setFileName("")
  }, [])

  const _handleChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target
    setModalControl({ ...modalControl, [name]: value })
  }

  const _handleRegister = useCallback(() => {
    setModalVisibility("Load-PK")
  }, [])

  const _handleGenerate = useCallback(() => {
    if (user.role == "beneficiary" || user.publicKey) {
      setModalVisibility("Load-PK")
    } else {
      setModalVisibility("Generate-PK")
    }
  }, [])

  const _handleGeneratePKPair = useCallback(() => {
    startLoader()
    toast("Generating Public/Private Key", "info")
    setTimeout(() => {
      setModalControl(encryptionService.generateKeyPair())
      toast("Keys Generated", "success")
      stopLoader()
    }, 1000)
  }, [])

  const _handleRegisterPK = () => {
    if (
      encryptionService.validateKeyPair(
        modalControl.publicKey || user.publicKey,
        modalControl.privateKey,
      )
    ) {
      if (modalVisibility == "Load-PK") {
        const _privateKey = modalControl.privateKey
          ? encryptionService.encryptKeys(modalControl.privateKey, user.uid)
          : ""
        localStorage.setItem("privateKey", _privateKey)
        navigate("/dashboard")
      } else {
        dispatch<any>(
          updatePK({
            publicKey: modalControl.publicKey,
            assetKeysEncByOwner: JSON.stringify({}),
          }),
        )
          .unwrap()
          .then(() => {
            toast("Keys Registered", "success")
            const _privateKey = modalControl.privateKey
              ? encryptionService.encryptKeys(modalControl.privateKey, user.uid)
              : ""
            localStorage.setItem("privateKey", _privateKey)
            navigate("/dashboard")
          })
          .catch((err: any) => {
            console.log(err)
          })
      }
    } else {
      toast("Unable to verify keys", "error")
    }
  }

  const downloadPrivateKey = useCallback(() => {
    if (modalControl.privateKey) {
      const KEY = { privateKey: modalControl.privateKey }
      downloadPEM(KEY, `${user.displayName}_privateKey.pem`)
      toast("Download Complete", "success")
    } else {
      toast("Kindly Generate Private Key", "error")
    }
  }, [modalControl.privateKey])

  const copyPrivateKey = useCallback(() => {
    if (modalControl.privateKey) {
      copyToClipboard(modalControl.privateKey)
    } else {
      toast("Kindly Generate Private Key", "error")
    }
  }, [modalControl.privateKey])

  const downloadPublicKey = useCallback(() => {
    if (modalControl.publicKey) {
      const KEY = { publicKey: modalControl.publicKey }
      downloadPEM(KEY, `${user.displayName}_publicKey.pem`)
      toast("Download Complete", "success")
    } else {
      toast("Kindly Generate Public Key", "error")
    }
  }, [modalControl.publicKey])

  const copyPublicKey = useCallback(() => {
    if (modalControl.publicKey) {
      copyToClipboard(modalControl.publicKey)
    } else {
      toast("Kindly Generate Public Key", "error")
    }
  }, [modalControl.publicKey])

  return (
    <main className="flex  min-h-[calc(100vh-80px)] ">
      <PrivateKeyModal
        openModal={modalVisibility == "Load-PK"}
        closeModal={closeModal}
        closeModalOnOverlayClick={false}
        closeIconVisibility={true}
        _handleChange={_handleChange}
        _handleRegisterPK={_handleRegisterPK}
        filePresent={filePresent}
        setFilePresent={setFilePresent}
        fileName={fileName}
        setFileName={setFileName}
        keyType="Private"
      />
      <GeneratePrivateKey
        openModal={modalVisibility == "Generate-PK"}
        closeModal={closeModal}
        closeModalOnOverlayClick={false}
        closeIconVisibility={true}
        modalControl={modalControl}
        _handleChange={_handleChange}
        _handleGeneratePKPair={_handleGeneratePKPair}
        _handleRegisterPK={_handleRegisterPK}
        downloadPrivateKey={downloadPrivateKey}
        downloadPublicKey={downloadPublicKey}
        copyPrivateKey={copyPrivateKey}
        copyPublicKey={copyPublicKey}
      />
      <section className="basis-2/5 flex flex-col justify-center items-center px-24 ">
        <h1 className="text-safe-text-dark-blue text-2xl text-center font-bold mb-7">
          Import your Secret Key
        </h1>
        <p className="text-safe-text-dark-gray text-center mb-5">
          If you already have a Public/Private key pair, you can use it with
          SafeHerit by registering it. If you don’t have one we can generate a
          Key Pair for you, or you can use one of the many generators on the web
          to generate them yourself. The choice is yours!
        </p>
        <button
          data-cy="import-private-key-button"
          className="primary-btn uppercase py-5 px-[86px] mb-28"
          onClick={_handleRegister}
        >
          Import
        </button>
        {!user.publicKey && (
          <>
            <small className="before:content-none before:h-1 before:max-w-[146px] before:bg-safe-gray-shade after:content-none after:h-1 after:max-w-[146px] after:bg-safe-gray-shade mb-8 text-safe-text-dark-gray text-sm ">
              Don’t have a Public/Private key yet?
            </small>
            <a
              onClick={_handleGenerate}
              className="cy-add-generate-PK flex gap-3 justify-between items-center bg-white shadow-md py-2 px-4 rounded-lg cursor-pointer w-full"
            >
              <div className="flex justify-center items-center gap-4">
                <img src={safepal} alt="safepal icon" />
                <span className="text-safe-text-black-tint font-medium">
                  Generate Public/Private Key Pair
                </span>
              </div>
              <img src={arrowRight} alt="arrow right" className="ml-9" />
            </a>
          </>
        )}
      </section>
      <section className="basis-3/5 bg-linear-gradient flex justify-center items-center ">
        <div className="bg-white rounded-2xl  ">
          <h3 className="text-center  text-lg font-bold bg-safe-gray rounded-t-2xl py-3">
            Why are we asking you this?
          </h3>
          <div className="pt-12 p-7 ">
            <h2 className="text-safe-text-black-tint text-lg font-bold text-center">
              What are Public and Private Keys?
            </h2>
            <p className="text-center mb-12">
              Learn how private keys keep your data safe.
            </p>
            <img src={registerPageVideo} alt="register video screenshot" />
          </div>
        </div>
      </section>
    </main>
  )
}
