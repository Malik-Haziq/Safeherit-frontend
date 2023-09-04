import { Dialog, Transition } from "@headlessui/react"
import { Fragment } from "react"

export function DeleteValidatorModal(_props: {
  closeModalOnOverlayClick: boolean
  openModal: boolean
  closeModal?: any
  _submitModal: React.MouseEventHandler<HTMLButtonElement>
}) {
  return (
    <>
      <Transition appear show={_props.openModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={
            _props.closeModalOnOverlayClick ? _props.closeModal : () => {}
          }
        >
          <Transition.Child // modal overlay opacity
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="transform overflow-hidden rounded-2xl bg-white p-6 text-center align-middle shadow-xl transition-all">
                  <Dialog.Title className="text-2xl font-monstrate leading-6 text-gray-900">
                    Sure You Want to Remove Validator
                  </Dialog.Title>
                  <div>
                    <p>
                      Note that the validator will not be informed he was
                      removed
                    </p>
                    <div className="flex gap-5">
                      <button onClick={_props._submitModal} className="primary-btn rounded-xl">Yes</button>
                      <button onClick={_props.closeModal} className="primary-btn rounded-xl bg-[#D8D8D8] text-[#00192B]">
                        No
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
