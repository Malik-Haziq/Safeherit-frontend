import React, { useEffect } from "react"
import logo from "@images/vertical_Logo.png"
import video from "@images/register_page_video.png"

import { Modal } from "@/components"
import { useAppSelector } from "@/redux/hooks"
import { useDispatch } from "react-redux"
import { setWizardStep } from "@/redux/reducers/UserSlice"
import { useNavigate } from "react-router-dom"
import { ROUTE_CONSTANTS } from "@/common"

export function DashboardModal() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { startupWizardCompleted, wizardStep } = useAppSelector(
    (state) => state.user,
  )

  return (
    <Modal
      openModal={!startupWizardCompleted && wizardStep === "Dashboard"}
      closeModal={() => {}}
      closeModalOnOverlayClick={false}
      modalTitle="Welcome to SafeHerit!"
      closeIconVisibility={false}
      elements={[
        {
          type: "iconView",
          props: {
            image: logo,
            onclick: () => {},
            imageStyles: "mx-auto my-7",
            imageContainerStyles: "",
          },
        },
        {
          type: "textView",
          props: {
            text: "Before you start, watch this short video about how SafeHerit works:",
            onclick: () => {},
            textStyles: "text-[#082A44] text-2xl font-bold px-16 text-center",
          },
        },
        {
          type: "iconView",
          props: {
            image: video,
            onclick: () => {},
            imageStyles: "mx-auto my-7 ",
            imageContainerStyles: "",
          },
        },
        {
          type: "textView",
          props: {
            text: "Now let’s get you started by registering your first beneficiary.",
            onclick: () => {},
            textStyles:
              "text-[#082A44] text-2xl font-bold px-16 text-center mb-9",
          },
        },
        {
          type: "buttonView",
          props: {
            dataCy: "submit-intro-modal-button",
            title: "Get Started",
            onclick: () => {
              dispatch(setWizardStep("Beneficiary"))
              navigate(
                `${ROUTE_CONSTANTS.DASHBOARD}/${ROUTE_CONSTANTS.DASHBOARD_BENEFICIARIES}`,
              )
            },
            buttonStyle: "",
            buttonContainer: "mx-48 mb-10",
          },
        },
      ]}
    />
  )
}
