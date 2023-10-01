import tick from "@images/tick.svg"
import creditCardImg from "@images/credit-card.svg"
import cancelIcon from "@images/cancel.svg"

import styles from "../../Dashboard.module.css"

export default function MembershipPlanView(_props:{
  hidePlanView: React.MouseEventHandler<HTMLButtonElement>
}) {
  const pricingInfoArr = [
    { duration: "Monthly", price: "20", time: "month", currentPlan: true },
    { duration: "Yearly", price: "200", time: "month", currentPlan: false },
    { duration: "Lifetime", price: "1999", time: "month", currentPlan: false },
  ]

  const creditCardArr = [
    { cardImg: creditCardImg, cardNum: "**** **** **** 1234" },
    { cardImg: creditCardImg, cardNum: "**** **** **** 1234" },
    { cardImg: creditCardImg, cardNum: "**** **** **** 1234" },
  ]

  const billingHistoryArr = [
    {
      date: "08/7/2022",
      details: "08/7/2022",
      amount: "20",
      invoice: "Invoice 08 July 22",
    },
    {
      date: "08/7/2022",
      details: "08/7/2022",
      amount: "20",
      invoice: "Invoice 08 July 22",
    },
    {
      date: "08/7/2022",
      details: "08/7/2022",
      amount: "20",
      invoice: "Invoice 08 July 22",
    },
    {
      date: "08/7/2022",
      details: "08/7/2022",
      amount: "20",
      invoice: "Invoice 08 July 22",
    },
  ]
  return (
    <div className={styles.AppView}>
      <button onClick={_props.hidePlanView} className=" mb-4 mt-2 p-2 hover:opacity-75 rounded-lg shadow-md my-[5px] w-[200px] mx-2">← Back to My Account</button>
      <main className=" p-6 rounded-lg shadow-md my-[22px] w-[1080px] mx-auto">
        <section className="mb-7">
          <h1 className="text-xl font-semibold mb-5">Your Membership Plan</h1>
          <div className="flex itmes-center justify-between gap-5">
            {pricingInfoArr.map((info, index) => {
              return (
                <PricingPlan
                  key={index}
                  duration={info.duration}
                  price={info.price}
                  time={info.time}
                  currentPlan={info.currentPlan}
                />
              )
            })}
          </div>
        </section>

        <section className="mb-7">
          <h1 className="text-xl font-semibold mb-5">
            Registered Payment Methods
          </h1>
          <div className="flex itmes-center gap-3">
            {creditCardArr.map((card, index) => {
              return (
                <CreditCard key={index} cardImg={card.cardImg} cardNum={card.cardNum} />
              )
            })}
          </div>
        </section>
        <section>
          <h1 className="text-xl font-semibold mb-5">Billing History</h1>
          <div>
            <div className="grid grid-cols-4 items-end text-sm px-5 py-3 font-bold bg-[#F6F6F6]">
              <h3>Date</h3>
              <h3>Details</h3>
              <h3>Amount</h3>
              <h3>Download</h3>
            </div>
            {billingHistoryArr.map((bill, index) => {
              return (
                <BillingHistory
                  key={index}
                  date={bill.date}
                  details={bill.details}
                  amount={bill.amount}
                  invoice={bill.invoice}
                />
              )
            })}
          </div>
        </section>
      </main>
    </div>
  )
}

function PricingPlan(_props: {
  duration: string
  price: string
  time: string
  currentPlan: boolean
}) {
  return (
    <article className="py-5 shadow-md w-[300px] rounded-xl">
      <h2 className="pl-5 text-[22px] font-bold ">{_props.duration}</h2>
      <div className="pl-5 mb-8">
        <p className="text-[22px] font-semibold ">
          ${_props.price}
          <span className="text-[#B4B4B4]">/ {_props.time}</span>
        </p>
      </div>
      <p className="pl-5 text-[#858992] font-semibold mb-5">Get the benefits</p>
      <ul className="pl-5 py-6 bg-[#F7FEFD] flex flex-col gap-5 mb-5">
        <li className="flex gap-3">
          <img src={tick} alt="tick icon" />
          <p>Lorem, ipsum dolor</p>
        </li>
        <li className="flex gap-3">
          <img src={tick} alt="tick icon" />
          <p>Lorem, ipsum dolor</p>
        </li>
        <li className="flex gap-3">
          <img src={tick} alt="tick icon" />
          <p>Lorem, ipsum dolor</p>
        </li>
        <li className="flex gap-3">
          <img src={tick} alt="tick icon" />
          <p>Lorem, ipsum dolor</p>
        </li>
        <li className="flex gap-3">
          <img src={tick} alt="tick icon" />
          <p>Lorem, ipsum dolor</p>
        </li>
      </ul>
      <a
        href="#"
        className={
          _props.currentPlan
            ? "primary-btn w-fit mx-auto bg-[#F2F2F2] px-12 text-[#858992] font-medium"
            : "primary-btn w-fit mx-auto bg-[#B4DBEC] px-12 text-[#04477B] font-bold"
        }
      >
        {_props.currentPlan ? "Cancel plan" : "Upgrade"}
      </a>
    </article>
  )
}

function CreditCard(_props: { cardImg: any; cardNum: string }) {
  return (
    <article className="border-[1px] border-[#D8D8D8] p-4 flex flex-col gap-5 rounded-lg w-[250px]">
      <small className="text-xm text-[#888] font-medium mb-5">
        Credit Card
      </small>
      <div className="flex items-center gap-2">
        <img src={_props.cardImg} alt="credit card image" />
        <p className="font-medium">{_props.cardNum}</p>
      </div>
      <img src={cancelIcon} alt="cancel icon" className="self-end" />
    </article>
  )
}

function BillingHistory(_props: {
  date: string
  details: string
  amount: string
  invoice: string
}) {
  return (
    <div className="grid grid-cols-4 text-sm px-5 py-2">
      <p>{_props.date}</p>
      <p>{_props.details}</p>
      <p>${_props.amount}</p>
      <a
        href="#"
        onClick={() => {}}
        className="cy-invoice-btn text-[#0C8AC1] font-semibold"
      >
        {_props.invoice}
      </a>
    </div>
  )
}
