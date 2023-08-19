import { useState } from "react"
import tick from "../../../assets/images/tick.svg"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../../redux/hooks"
import { logout } from "../../redux/actions/UserActions"

export function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState("Yearly")
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const packagePlans = [
    { plan: "Monthly", price: "19.99", priceTime: "month" },
    { plan: "Yearly", price: "199", priceTime: "year" },
    { plan: "Life time", price: "1,999", priceTime: "" },
  ]

  const _handleLogout = () => {
    dispatch(logout({}))
      .unwrap()
      .then((response) => {
        navigate("/login")
      })
  }

  function _handlePlanSelect(selectedPlan: string) {
    setSelectedPlan(selectedPlan)
    setTimeout(() => {
      _handleLogout()
    }, 1000)
  }

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
                key={i}
                paymentPlan={item.plan}
                selectedPlan={selectedPlan}
                onclick={_handlePlanSelect}
              />
            )
          })}
        </div>
      </section>
      <section className="flex justify-center items-center flex-wrap gap-8">
        {packagePlans.map((item, i) => {
          return (
            <PricingCards
              key={i}
              paymentPlan={item.plan}
              price={item.price}
              priceTime={item.price}
              selectedPlan={selectedPlan}
              onclick={_handlePlanSelect}
            />
          )
        })}
      </section>
    </main>
  )
}

function PricingButtons(_props: {
  paymentPlan: string
  selectedPlan: string
  onclick: Function
}) {
  return (
    <div>
      {_props.selectedPlan === _props.paymentPlan ? (
        <button
          className="px-5 py-2 rounded-[50px] bg-linear-gradient"
          onClick={() => {
            _props.onclick(_props.paymentPlan)
          }}
        >
          {_props.paymentPlan}
        </button>
      ) : (
        <button
          className="px-5 py-2 rounded-[50px] opacity-80"
          onClick={() => {
            _props.onclick(_props.paymentPlan)
          }}
        >
          {_props.paymentPlan}
        </button>
      )}
    </div>
  )
}

function PricingCards(_props: {
  paymentPlan: string
  price: any
  priceTime: string
  selectedPlan: string
  onclick: Function
}) {
  return (
    <div className="card w-[256px] p-5 mb-5 rounded-xl -translate-y-7 bg-safe-white shadow-md">
      <h1 className="text-[22px] font-bold mb-3">{_props.paymentPlan}</h1>
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
      {_props.selectedPlan === _props.paymentPlan ? (
        <button
          className="primary-btn text-lg px-[46px] py-2 mx-auto"
          onClick={() => {
            _props.onclick(_props.paymentPlan)
          }}
        >
          choose
        </button>
      ) : (
        <button
          className="primary-btn text-lg text-safe-text-blue-shade px-[46px] py-2 mx-auto bg-safe-blue-light"
          onClick={() => {
            _props.onclick(_props.paymentPlan)
          }}
        >
          choose
        </button>
      )}
    </div>
  )
}
