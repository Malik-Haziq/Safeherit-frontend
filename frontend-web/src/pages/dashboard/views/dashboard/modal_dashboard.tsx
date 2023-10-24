import logo from "@images/vertical_Logo.png"
import video from "@images/register_page_video.png"

import { Modal } from "@/components"

export function DashboardModal() {
  return (
    <Modal
      openModal={false}
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
            text: "Before you start, watch this shortvideo about how SafeHerit works:",
            onclick: () => {},
            textStyles: "text=[#082A44] text-2xl font-bold px-16 text-center",
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
              "text=[#082A44] text-2xl font-bold px-16 text-center mb-9",
          },
        },
        {
          type: "buttonView",
          props: {
            title: "Get Started",
            onclick: () => {},
            buttonStyle: "",
            buttonContainer: "mx-48 mb-10",
          },
        },
      ]}
      arrayLength={undefined}
      showPreviousModal={undefined}
    />
  )
}
