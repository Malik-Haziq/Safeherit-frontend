import styles from "../../Dashboard.module.css"
import shieldIcon from "@images/Shield-done.svg"
import tickIcon from "@images/tick-blue.svg"
import editIcon from "@images/edit-icon.svg"

export default function PulseView() {
  const checkPulsePeriodArr = ["30", "60", "90", "0"]
  const checkPUlseDateArr = {
    lastPulseCheck: "April 12th, 2023",
    nextPulseCheck: "22 days",
  }
  const checkAliveMethodArr = ["Email", "Phone", "Social media"]
  const methodArr = [
    { heading: "Primary Phone", subHeading: "+1 234 566 890" },
    { heading: "Backup Phone 1", subHeading: "+7 234 566 890" },
    { heading: "Backup Phone 2", subHeading: "+9 234 566 560" },
  ]

  return (
    <div className={styles.AppView}>
      <div className="px-8 py-4">
        <main className="flex justify-between gap-14 shadow-xl h-full rounded-2xl p-6">
          <section className="basis-1/2 max-w-[524px]">
            <h1 className="text-[#00192B] text-2xl font-bold pb-8">
              Pulse check Settings
            </h1>
            <div className="flex items-center justify-between pb-4">
              <h2 className="text-lg font-bold ">
                Set your pulse check period
              </h2>
              <span className="text-[#0DA74B] border-[1px] border-[#0DA74B] py-1 px-4 rounded-full text-xs font-semibold">
                Active
              </span>
            </div>
            <p className="text-[#707070] text-sm mb-5">
              We will contact you if you don’t log in and there are no signs of
              activity on your registered social media for the following number
              of days:
            </p>
            <div className="flex justify-between mb-6 gap-3">
              {checkPulsePeriodArr.map((el) => {
                return <CheckPulsePeriod days={el} selected={false} />
              })}
            </div>
            <div className="bg-[#ECF6FA] text-[#0C8AC1] flex flex-col gap-2 py-3 pl-5 text-sm rounded-xl mb-6">
              <CheckPulseDates
                lastPulseCheck={checkPUlseDateArr.lastPulseCheck}
                nextPulseCheck={checkPUlseDateArr.nextPulseCheck}
              />
            </div>
            <h2 className="text-lg font-bold mb-4">
              Set the ways in which we can confirm you’re alive
            </h2>
            <article className="bg-[#F9F9F9] border-[1px] border-[#E1E1E1] rounded-xl h-[334px] overflow-auto scrollbar">
              <div className="flex gap-8 border-b-[1px] border-b-[#e1e1e1] text-[#707070] pl-5 ">
                {checkAliveMethodArr.map((el) => {
                  return <CheckAliveMethod method={el} selected={false} />
                })}
              </div>
              <div className="p-5 flex flex-col gap-3 ">
                {methodArr.map((method) => {
                  return (
                    <MethodRow
                      heading={method.heading}
                      subHeading={method.subHeading}
                    />
                  )
                })}
              </div>
            </article>
          </section>
          <section className="basis-1/2 flex mt-36 items-center flex-col gap-8 ">
            <video
              src="#"
              controls
              className="w-[450px] h-[300px] rounded-xl"
            ></video>
            <p className="text-xl">Learn how our Pulse Check system works</p>
          </section>
        </main>
      </div>
    </div>
  )
}

function CheckPulsePeriod(_props: { days: string; selected: boolean }) {
  return (
    <div
      className={
        _props.selected
          ? "flex items-center justify-center flex-col py-6 px-11 bg-[#F6F6F6] rounded-xl cursor-pointer border-[1px] border-[#0C8AC1] relative"
          : "flex items-center justify-center flex-col py-6 px-11 bg-[#F6F6F6] rounded-xl cursor-pointer"
      }
    >
      <h3 className="text-xl font-bold ">{_props.days}</h3>
      <small className="text-[#666] text-sm ">days</small>
      {_props.selected && (
        <img
          src={tickIcon}
          alt="Tick icon"
          className="absolute top-2 right-2"
        />
      )}
    </div>
  )
}

function CheckPulseDates(_props: {
  lastPulseCheck: string
  nextPulseCheck: string
}) {
  return (
    <>
      <div className="flex gap-2">
        <img src={shieldIcon} alt="safe icon" className="w-6 h-6" />
        <p>
          Last Pulse Check was successfully done on &nbsp;
          <span className="font-bold text-[#065A93]">
            {_props.lastPulseCheck}
          </span>
        </p>
      </div>
      <p className=" ml-8">
        Next Pulse Check is due in
        <span className="font-bold text-[#065A93]">
          &nbsp;{_props.nextPulseCheck}
        </span>
      </p>
    </>
  )
}

function CheckAliveMethod(_props: { method: string; selected: boolean }) {
  return (
    <p
      className={
        _props.selected
          ? "py-4 px-2 cursor-pointer text-[#04477B] font-medium  border-b-2 border-b-[#04477B]"
          : "py-4 px-2 cursor-pointer"
      }
    >
      {_props.method}
    </p>
  )
}

function MethodRow(_props: { heading: string; subHeading: string }) {
  return (
    <div className="py-3 px-2 flex items-center justify-between rounded-lg bg-white  border-[1px] border-[#E3E3E3] text-[#4E4F50]">
      <p>{_props.heading}</p>
      <p>{_props.subHeading}</p>
      <img src={editIcon} alt="edit icon" className="w-5 h-5 cursor-pointer" />
    </div>
  )
}
