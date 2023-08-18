import { useTranslation } from "react-i18next"
import { useState } from "react"
import tick from "../../../assets/images/tick.svg"

export function Pricing() {
  const packagePlans = [
    { plan: "Monthly", isSeleced: false },
    { plan: "Yearly", isSeleced: true },
    { plan: "Life time", isSeleced: false },
  ]

  const { t } = useTranslation()
  const [isSelected, setIsSlected] = useState(packagePlans)

  return (
    <main className="font-safe-font-default">
      <section className="bg-safe-blue-tint text-safe-text-white flex justify-center items-center flex-col py-[74px]">
        <h1 className="text-safe-text-white text-3xl font-bold mb-4">
          Get Started Now Pick a Plan
        </h1>
        <p className="text-lg opacity-80 mb-9">
          Purchase the Premium plan and access all the features.
        </p>
        <h3 className="text-base mb-3">Choose your plan</h3>
        <div className="flex justify-between items-center gap-5 bg-safe-blue-shade py-3 px-2 rounded-full">
          {packagePlans.map((item, i) => {
            return (
              <PricingButtons
                isSelected={item.isSeleced}
                paymentPlan={item.plan}
                key={i}
              />
            )
          })}
        </div>
      </section>
      <section className="flex justify-center items-center flex-wrap gap-8">
        <PricingCards
          time="Monthly"
          price={19.99}
          priceTime="month"
          isSelected={false}
        />
        <PricingCards
          time="Yearly"
          price={199}
          priceTime="year"
          isSelected={true}
        />
        <PricingCards
          time="Life time"
          price={"1,999"}
          priceTime=""
          isSelected={false}
        />
      </section>
    </main>
  )
}

function PricingButtons(_props: { paymentPlan: string; isSelected: boolean }) {
  return (
    <div>
      {_props.isSelected ? (
        <span className="px-5 py-2 rounded-[50px] bg-linear-gradient">
          {_props.paymentPlan}
        </span>
      ) : (
        <span className="px-5 py-2 rounded-[50px] opacity-80">
          {_props.paymentPlan}
        </span>
      )}
    </div>
  )
}

function PricingCards(_props: {
  time: string
  price: any
  priceTime: string
  isSelected: boolean
}) {
  return (
    <div className="card w-[256px] p-5 mb-5 rounded-xl -translate-y-7 bg-safe-white shadow-md">
      <h1 className="text-[22px] font-bold mb-3">{_props.time}</h1>
      <p className="text-[22px] flex gap-1 font-semibold mb-7">
        ${_props.price}
        <span className="text-safe-text-light-gray">
          {_props.priceTime ? `/ ${_props.priceTime}` : ""}
        </span>
      </p>
      <h3 className="mb-12 text-safe-text-gray font-semibold">
        Get the benefits
      </h3>
      <ul className="mb-6 bg-safe-green-light ">
        <div className="flex gap-3 items-center justify-start mb-3">
          <img src={tick} alt="tick icon" />
          <li>Lorem ipsum doner</li>
        </div>
        <div className="flex gap-3 items-center justify-start mb-3">
          <img src={tick} alt="tick icon" />
          <li>Lorem ipsum doner</li>
        </div>
        <div className="flex gap-3 items-center justify-start mb-3">
          <img src={tick} alt="tick icon" />
          <li>Lorem ipsum doner</li>
        </div>
        <div className="flex gap-3 items-center justify-start mb-3">
          <img src={tick} alt="tick icon" />
          <li>Lorem ipsum doner</li>
        </div>
        <div className="flex gap-3 items-center justify-start mb-3">
          <img src={tick} alt="tick icon" />
          <li>Lorem ipsum doner</li>
        </div>
      </ul>
      {_props.isSelected ? (
        <button className="primary-btn text-lg px-[46px] py-2 mx-auto">
          choose
        </button>
      ) : (
        <button className="primary-btn text-lg text-safe-text-blue-shade px-[46px] py-2 mx-auto bg-safe-blue-light">
          choose
        </button>
      )}
    </div>
  )
}
