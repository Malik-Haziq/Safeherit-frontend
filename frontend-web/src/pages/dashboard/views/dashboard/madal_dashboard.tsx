import { Modal } from "../../../../components"
import logo from "../../../../../assets/images/vertical_Logo.png"
import video from "../../../../../assets/images/register_page_video.png"

export function DashboardModal() {
  return (
    <Modal
      openModal={true}
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
            buttonContainer: "mx-auto mb-10",
          },
        },
      ]}
    />
  )
}
