import { Dialog, Transition } from "@headlessui/react"
import { Fragment } from "react"

export default function ForgotPasswordModal(_props: {
  resetEmail: string
  setResetEmail: any
  closeModalOnOverlayClick: boolean
  openModal: boolean
  closeModal: any
  sendEmail: any
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
                    Reset Password
                  </Dialog.Title>
                  <form
                    className="relative mt-6 text-safe-text-black font-semibold text-sm"
                    onSubmit={(e) => {
                      e.preventDefault()
                      _props.sendEmail()
                    }}
                  >
                    <input
                      type={"email"}
                      name={"email"}
                      placeholder={"Enter email to reset password"}
                      value={_props.resetEmail}
                      onChange={(event) =>
                        _props.setResetEmail(event.target.value)
                      }
                      required
                      className="bg-safe-white py-4 px-4 w-full divide-safe-color-gray border rounded-[6px]"
                    />
                    <button
                      type="submit"
                      className="mt-4 primary-btn rounded-md bg-safe-blue-shade px-40"
                    >
                      Send Reset Link
                    </button>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
