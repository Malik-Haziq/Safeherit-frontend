import styles from "../../Dashboard.module.css"

export default function ValidationView() {
  const validationPageData = [
    {
      sectionName: "message",
      title: "Message from James",
      content: "Personilized Message",
    },
    {
      sectionName: "validation",
      title: "validation",
      confirmed: false,
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
              confirmed={data.confirmed}
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
  confirmed?: boolean
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
          <h2 className="py-3 font-bold">
            {_props.confirmed
              ? "Thank you for your confirmation"
              : " Do you confirm that James passed away?"}
          </h2>
          <p className="mb-6">
            {_props.confirmed
              ? "Thank you for confirming whether James is alive or not. We will proceed accordingly."
              : "If you are not sure, you can logout and come back once you are sure using the link and credentials sent to you by e-mail."}
          </p>
          <p>
            {_props.confirmed
              ? "Thank you for using SafeHerit."
              : "However, don’t wait too long as it delays the sharing of James’ testament and asset information to his beneficiaries."}
          </p>
        </div>
        <div className="flex items-center justify-between px-10 pb-12">
          {_props.confirmed ? (
            <button className="px-5 mt-12 mx-auto h-[80px] font-bold text-center w-[180px] bg-[#0971AA] text-white rounded-xl">
              CLICK HERE TO LOGOUT
            </button>
          ) : (
            <>
              <button className="px-5 h-[80px] font-bold text-center w-[180px] bg-[#5CEAD2] text-[#04477B] rounded-xl">
                NO HE/SHE ISSTILL ALIVE
              </button>
              <button className="px-5 h-[80px] font-bold text-center w-[180px] bg-[#0971AA] text-white rounded-xl">
                YES
              </button>
            </>
          )}
        </div>
      </section>
    )),
  }
}
