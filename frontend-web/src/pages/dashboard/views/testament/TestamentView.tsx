import styles from "../../Dashboard.module.css"

export default function TestamentView() {
  const validationPageData = [
    {
      sectionName: "message",
      title: "Written Testament",
      content: "Personilized Message",
    },
    {
      sectionName: "validation",
      title: "Video Testament",
      video: "src",
    },
  ]

  return (
    <div className={styles.AppView}>
      <main className="p-8 flex items-center gap-8 mx-auto">
        {validationPageData.map((data) => {
          return (
            <Section
              sectionName={data.sectionName}
              title={data.title}
              content={data.content}
              video={data.video}
            />
          )
        })}
      </main>
    </div>
  )
}

function Section(_props: {
  title: string
  content?: string
  sectionName: string
  video?: string
}) {
  return {
    ...(_props.sectionName === "message" ? (
      <section className="w-[520px] shadow-md max-h-[749px] min-h-[480px] rounded-2xl">
        <header className="py-3  bg-[#F6F6F6] text-center rounded-t-2xl text-[#00192B] font-bold text-lg">
          {_props.title}
        </header>
        <div className="p-7 text-[#4F4F4F] ">{_props.content}</div>
      </section>
    ) : (
      <section className="w-[520px] shadow-md rounded-2xl min-h-[480px] ">
        <header className="py-3 bg-[#F6F6F6] text-center rounded-t-2xl text-[#00192B] font-bold text-lg">
          {_props.title}
        </header>
        <div className="p-7 scroll-auto text-[#00192B] text-lg text-center">
          <h2 className="py-3 font-bold">James left this video for you</h2>
          <p className="mb-6">Click on the video to play it.</p>
          <video width="466" height="263" controls className="rounded-xl mb-7">
            Your browser does not support the video tag.
          </video>
          <a
            href="#"
            className="text-[#04477B] border-b-[1px] border-[#04477B]"
          >
            Click here to download the video
          </a>
        </div>
      </section>
    )),
  }
}
