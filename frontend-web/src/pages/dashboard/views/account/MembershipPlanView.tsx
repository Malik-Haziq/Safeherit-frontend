import React, { useEffect } from "react"
import tick from "@images/tick.svg"
import creditCardImg from "@images/credit-card.svg"
import cancelIcon from "@images/cancel.svg"
import styles from "../../Dashboard.module.css"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/redux"
import { fetchBillingHistory, fetchCreditCards } from "@/redux/actions"
import { Spinner } from "@/components"
import useDownloadFile from "@/common/hooks"

export default function MembershipPlanView(_props: {
  hidePlanView: React.MouseEventHandler<HTMLButtonElement>
  updatePlan: (plan: any) => void
}) {
  const dispatch = useDispatch()
  const { billingHistory, creditCards, loading } = useSelector(
    (state: RootState) => state.payment,
  )
  useEffect(() => {
    dispatch(fetchBillingHistory())
    dispatch(fetchCreditCards())
  }, [dispatch])

  const pricingInfoArr = [
    { duration: "Monthly", price: "20", time: "month", currentPlan: true },
    { duration: "Yearly", price: "200", time: "month", currentPlan: false },
    { duration: "Lifetime", price: "1999", time: "month", currentPlan: false },
  ]

  return (
    <div className={styles.AppView}>
      <button
        data-cy="back-to-account-view-button"
        onClick={_props.hidePlanView}
        className=" mb-4 mt-2 p-2 hover:opacity-75 rounded-lg shadow-md my-[5px] w-[200px] mx-2"
      >
        ← Back to My Account
      </button>
      <main className=" p-6 rounded-lg shadow-md my-[22px] w-[1080px] mx-auto">
        <section className="mb-7">
          <h1 className="text-xl font-semibold mb-5">Your Membership Plan</h1>
          <div className="flex items-center justify-between gap-5">
            {pricingInfoArr.map((info, index) => {
              return (
                <PricingPlan
                  key={index}
                  duration={info.duration}
                  price={info.price}
                  time={info.time}
                  currentPlan={info.currentPlan}
                  updatePlan={() => _props.updatePlan(info)}
                />
              )
            })}
          </div>
        </section>

        <section className="mb-7">
          <h1 className="text-xl font-semibold mb-5">
            Registered Payment Methods
          </h1>
          <div className="flex items-center gap-3">
            {loading ? (
              <Spinner />
            ) : (
              <>
                {creditCards?.length > 0 ? (
                  creditCards?.map((item, index) => (
                    <CreditCard key={index} item={item || {}} />
                  ))
                ) : (
                  <p>No Payment Method Registered</p>
                )}
              </>
            )}
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
            {loading ? (
              <Spinner />
            ) : (
              billingHistory?.map((bill, index) => (
                <BillingHistory
                  key={index}
                  date={bill?.date}
                  details={bill?.details}
                  amount={bill?.amount}
                  invoice={bill?.download}
                />
              ))
            )}
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
  updatePlan: React.MouseEventHandler<HTMLAnchorElement>
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
        onClick={_props.updatePlan}
      >
        {_props.currentPlan ? "Cancel plan" : "Upgrade"}
      </a>
    </article>
  )
}

function CreditCard(_props: { item: any }) {
  const { cardImg, card: cardDetail } = _props?.item
  return (
    <article className="border-[1px] border-[#D8D8D8] p-4 flex flex-col gap-5 rounded-lg w-[250px]">
      <small className="text-xm text-[#888] font-medium mb-5">
        {`${cardDetail?.funding?.toUpperCase()} CARD` || "N/A"}
      </small>
      <div className="flex items-center gap-2">
        <img src={cardImg || creditCardImg} alt="credit card image" />
        <p className="font-medium">
          {`**** **** **** ${cardDetail?.last4}` || "N/A"}
        </p>
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
  const { handleDownload } = useDownloadFile()
  return (
    <div className="grid grid-cols-4 text-sm px-5 py-2">
      <p>{_props.date || "N/A"}</p>
      <p>{_props.details || "N/A"}</p>
      <p>${_props.amount || "N/A"}</p>
      {_props.invoice ? (
        <a
          onClick={() => handleDownload(_props.invoice, "invoice.pdf")}
          className="cy-invoice-btn text-[#0C8AC1] font-semibold cursor-pointer"
        >
          Download
        </a>
      ) : (
        <p>N/A</p>
      )}
    </div>
  )
}
