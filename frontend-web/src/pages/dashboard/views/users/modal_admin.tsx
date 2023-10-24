import { Modal } from "@/components"

export function UserDetails(_props: {
  openModal: boolean
  closeModal: any
  closeModalOnOverlayClick: boolean
  closeIconVisibility: boolean
  action: string
  modalControl: any
  arrayLength: any
  showPreviousModal: any
}) {
  const headings = [{}]
  const values = [{}]
  return (
    <Modal
      openModal={_props.openModal}
      closeModal={_props.closeModal}
      closeModalOnOverlayClick={_props.closeModalOnOverlayClick}
      modalTitle={"User"}
      closeIconVisibility={_props.closeIconVisibility}
      arrayLength={_props.arrayLength}
      showPreviousModal={_props.showPreviousModal}
      elements={[
        {
          type: "customView",
          props: {
            customViewContainer: "",
            CustomView: () => {
              return (
                <section>
                  <div className="pt-6 pb-10">
                    {headings.map((_, index) => {
                      return (
                        <div key={4} className="flex gap-6 items-start pb-6">
                          <h2 className="text-[#292929] font-sm font-medium basis-1/2 text-right">
                            {/* {heading || ""} */}
                          </h2>
                          {headings[index] === "Pulse status" ? (
                            <div className="w-[170px] text-[#4D4D4D] font-medium text-xs basis-1/2">
                              <p>{_props.modalControl["Pulse status"].title}</p>
                              <span
                                className={
                                  _props.modalControl[
                                    "Pulse status"
                                  ].subTitle.toLowerCase() ===
                                  "waiting for answer"
                                    ? "w-[80px] text-[#52CEB7] font-medium text-xs"
                                    : _props.modalControl[
                                        "Pulse status"
                                      ].subTitle.toLowerCase() ===
                                      "pending login"
                                    ? "w-[80px] text-[#04477B] font-medium text-sm"
                                    : _props.modalControl[
                                        "Pulse status"
                                      ].subTitle.toLowerCase() === "login done"
                                    ? "w-[80px] text-[#27AE60] font-medium text-sm"
                                    : "w-[80px] text-[#04477B] font-medium text-sm"
                                }
                              >
                                {_props.modalControl["Pulse status"].subTitle}
                              </span>
                            </div>
                          ) : (
                            <p className="text-[#585858] basis-1/2">
                              {/* {values[index]} */}
                            </p>
                          )}
                        </div>
                      )
                    })}
                  </div>
                  <div className="flex justify-end gap-2 w-full py-4 px-5 border-t-2 border-[#F0F0F0]">
                    <button className="primary-btn rounded-lg font-sm font-medium text-[#414141] bg-white border-[1px] shadow-none border-[#DBDBDB]">
                      Edit
                    </button>
                    <button className="primary-btn rounded-lg font-sm font-medium">
                      Delete
                    </button>
                  </div>
                </section>
              )
            },
          },
        },
      ]}
    />
  )
}
