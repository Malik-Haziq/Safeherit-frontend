import uploadImg from "@images/upload.png"
import copyIcon from "@images/copy-icon.svg"
import downloadIcon from "@images/download.svg"
import jsonFile from "@images/json.webp"
import { Modal, toast } from "@/components"
import { ChangeEvent } from "react"
import { CustomChangeEvent } from "@/types"

interface Data {
  privateKey: string
}

export function PrivateKeyModal(_props: {
  openModal: boolean
  closeModal: React.MouseEventHandler<HTMLButtonElement>
  closeModalOnOverlayClick: boolean
  closeIconVisibility: boolean
  _handleChange: React.ChangeEventHandler<HTMLInputElement>
  _handleRegisterPK: React.MouseEventHandler<HTMLButtonElement>
  doHaveFile: any
  setDoHaveFile:any
  fileName: any
  setFileName: any
}) {


  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const parsedData: Data = JSON.parse(e.target?.result as string);
          if (parsedData.privateKey) {
            const customEvent: CustomChangeEvent = {
              target: {
                name: "privateKey",
                value: parsedData.privateKey,
              },
            }
            _props._handleChange(customEvent as React.ChangeEvent<HTMLInputElement>)
            _props.setDoHaveFile(true)
            _props.setFileName(file.name)
            toast("File uploaded", "success")
          }
          else {
            toast("Please choose a valid file", "error")
          }
        } catch (error) {
          toast('Error loading file', 'error');
        }
      };
      reader.readAsText(file);
    }
  }

  return (
    <Modal
      openModal={_props.openModal}
      closeModal={_props.closeModal}
      closeModalOnOverlayClick={_props.closeModalOnOverlayClick}
      modalTitle={"Load Private Key"}
      closeIconVisibility={_props.closeIconVisibility}
      elements={[
        {
          type: "textView",
          props: {
            text: "How we use your Private key:",
            textStyles: "text-[#00192B] text-sm font-semibold pl-7 mb-3 mt-2",
          },
        },
        {
          type: "textView",
          props: {
            text: "First we will use it to derive the corresponding Public Key.We will store this Public Key in our servers, and use it to encrypt all your data. ",
            textStyles: "text-[#74777E]  text-sm font-medium pl-8 pr-7 mb-5",
          },
        },
        {
          type: "textView",
          props: {
            text: "As for your Private key, it will kept in your browser’s cache memory, and will be used to decrypt the data coming from our servers (which is encrypted with your private key). Once your session is over your Private key will be encrypted and stored in your browser for your next session. ",
            textStyles: "text-[#74777E]  text-sm font-medium pl-8 pr-7 mb-5",
          },
        },
        {
          type: "textView",
          props: {
            text: "Your Private key will never leave your computer and we will neither receive nor store it.",
            textStyles: "text-[#74777E]  text-sm font-medium pl-8 pr-7 mb-5",
          },
        },
        {
          type: "customView",
          props: {
            customViewContainer: "mx-auto mb-7",
            CustomView: () => {
              return (
                <div className="relative">
                  <input
                    type="file"
                    accept=".json"
                    name="personalized_video"
                    onChange={handleFileChange}
                    className="opacity-0 absolute top-2 left-36 h-10 w-[266px]"
                  />
                  <div className="mx-[142px] mb-4">
                    <input type="text" className="text-[#74777E] border-2 border-[#aab4b9] py-2 px-2 bg-white w-[150px]" placeholder="Choose File" value={_props.fileName}  disabled />
                    <button className="bg-[#DDE3E8] py-2 px-3 border-2 border-[#aab4b9] border-l-0 font-bold text-[#515D66]">Browse File</button>
                  </div>
                  {_props.doHaveFile ? <img src={jsonFile} alt="json file icon" className="mx-auto w-28 mb-3"/> : <img src={uploadImg} alt="upload file" className="mx-auto" />}
                </div>
              )
            },
          },
        },
        {
          type: "customView",
          props: {
            customViewContainer: "mx-auto mb-7",
            CustomView: () => {
              return (
                <div className="flex items-center justify-between px-8">
                  <button onClick={_props.closeModal} className="primary-btn rounded-xl px-9 border-[1px] border-[#04477B] text-[#04477B] bg-white shadow-none">
                    Cancel
                  </button>
                  <button onClick={_props._handleRegisterPK} className="primary-btn rounded-xl px-9 bg-[#04477B] text-white shadow-none">
                    Load
                  </button>
                </div>
              )
            },
          },
        },
      ]}
    />
  )
}

export function GeneratePrivateKey(_props: {
  openModal: boolean
  closeModal: any
  closeModalOnOverlayClick: boolean
  closeIconVisibility: boolean
  modalControl: {
    publicKey: string,
    privateKey: string
  }
  _handleGeneratePKPair: Function
  _handleRegisterPK: Function
  _handleChange: React.ChangeEventHandler<HTMLTextAreaElement>
  downloadPrivateKey: React.MouseEventHandler<HTMLDivElement>
  downloadPublicKey: React.MouseEventHandler<HTMLDivElement>
  copyPrivateKey: React.MouseEventHandler<HTMLDivElement>
  copyPublicKey: React.MouseEventHandler<HTMLDivElement>
}) {
  return (
    <Modal
      openModal={_props.openModal}
      closeModal={_props.closeModal}
      closeModalOnOverlayClick={_props.closeModalOnOverlayClick}
      modalTitle={"Generate Public/Private Key Pair"}
      closeIconVisibility={_props.closeIconVisibility}
      elements={[
        {
          type: "buttonView",
          props: {
            title: "Generate Public/Private Key Pair",
            onclick: _props._handleGeneratePKPair,
            buttonStyle:
              "bg-[#47B29E] font-bold text-white px-8 py-4 rounded-2xl mx-auto mt-5 hover:opacity-75",
            buttonContainer: "flex mb-10",
          },
        },
        {
          type: "customView",
          props: {
            customViewContainer: "mx-6 mb-2",
            CustomView: () => {
              return (
                <div className="flex justify-between items-center">
                  <p className="text-[#00192B] font-semibold ">Public Key:</p>
                  <div className="flex items-center gap-3 ">
                    <div onClick={_props.copyPublicKey} className="flex items-center gap-1 cursor-pointer">
                      <span>Copy</span>
                      <img src={copyIcon} alt="copy icon " />
                    </div>
                    <div onClick={_props.downloadPublicKey} className="cy-add-generate-private-key flex items-center gap-1 cursor-pointer">
                      <span>Download</span>
                      <img src={downloadIcon} alt="download icon" />
                    </div>
                  </div>
                </div>
              )
            },
          },
        },
        {
          type: "TextAreaField",
          props: {
            textAreaContainerStyles: "flex justify-between items-center",
            name:"publicKey",
            inputStyles:"h-[68px] w-[502px] mx-6 p-2 border-[1px] border-[#858992] rounded-[5px] resize-none",
            value:_props.modalControl.publicKey,
            _handleChange:_props._handleChange,
            isDisabled: true
          },
        },
        {
          type: "customView",
          props: {
            customViewContainer: "mx-6 mb-2",
            CustomView: () => {
              return (
                <div className="flex justify-between items-center">
                  <p className="text-[#00192B] font-semibold ">
                    Secret Phrase (Private Key):
                  </p>
                  <div className="flex items-center gap-3 ">
                    <div onClick={_props.copyPrivateKey} className="flex items-center gap-1 cursor-pointer">
                      <span>Copy</span>
                      <img src={copyIcon} alt="copy icon " />
                    </div>
                    <div onClick={_props.downloadPrivateKey} className="cy-add-download-public-key flex items-center gap-1 cursor-pointer">
                      <span>Download</span>
                      <img src={downloadIcon} alt="download icon" />
                    </div>
                  </div>
                </div>
              )
            },
          },
        },
        {
          type: "TextAreaField",
          props: {
            textAreaContainerStyles: "flex justify-between items-center",
            name:"privateKey",
            inputStyles:"h-[107px] w-[502px] mx-6 p-2 resize-none border-[1px] border-[#858992] rounded-[5px] mx-6",
            value:_props.modalControl.privateKey,
            _handleChange:_props._handleChange,
            isDisabled: true
          },
        },
        {
          type: "textView",
          props: {
            text: "Warning:",
            textStyles:
              "text-[#00192B] font-semibold text-start pl-6 mb-3 mt-2",
          },
        },
        {
          type: "textView",
          props: {
            text: "Make sure to save your Secret Phrase (Private Key) somewhere safe. We do not store it, and without it you will not be able to view your encrypted data.",
            textStyles: "text-[#74777E] text-start pl-6 pr-7 mb-5",
          },
        },
        {
          type: "buttonView",
          props: {
            title: "Register the Generated Public Key",
            onclick: _props._handleRegisterPK,
            buttonStyle:
              "bg-[#0971AA] font-bold text-white px-12 py-4 rounded-2xl mx-auto mt-5 hover:opacity-75",
            buttonContainer: "flex mb-10",
          },
        },
      ]}
    />
  )
}
