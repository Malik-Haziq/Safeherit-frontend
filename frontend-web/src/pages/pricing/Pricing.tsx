import { Spinner } from "@/components"
import tick from "@images/tick.svg"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { setLoaderVisibility } from "@redux/reducers/LoaderSlice"
import { useAppDispatch, useAppSelector } from "@redux/hooks"
import { createPayment, getUser, updateUser } from "@/redux/actions"

export default function Pricing() {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const user = useAppSelector(state => state.user)
  const [selectedPlan, setSelectedPlan] = useState("Yearly")

  const startLoader = () => dispatch(setLoaderVisibility(true))
  const stopLoader = () => dispatch(setLoaderVisibility(false))
 
  const packagePlans = [
    { plan: "Monthly", price: "19.99", priceTime: "month" },
    { plan: "Yearly", price: "199", priceTime: "year" },
    { plan: "Life time", price: "1,999", priceTime: "" },
  ]
  const planMapper = {
    "Monthly": "monthly",
    "Yearly": "yearly",
    "Life time": "lifetime",
  }

  useEffect(() => {
    startLoader()
    getUserDetails()
  }, [])

  const getUserDetails = async () => {

    dispatch(getUser({})).unwrap()
    .then((res) => {
      if (!res.data.data.displayName) {
        dispatch(updateUser({
          displayName: user.displayName || user.email
        })).unwrap().catch()
      }
      if (res.data.data.paymentStatus != "Pending") {
        navigate("/register")
      }
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      stopLoader()
    })
  }

  const _handlePlanTransition = (selectedPlan: string) => setSelectedPlan(selectedPlan)

  function _handlePlanSelect(selectedPlan: "Monthly" | "Yearly" | "Life time") {
    _handlePlanTransition(selectedPlan)
    startLoader()
    dispatch(createPayment({subscriptionType: planMapper[selectedPlan]})).unwrap()
    .catch()
    .then((res) => {
      if (res.data.data.sessionUrl) {
        window.open(res.data.data.sessionUrl, "_blank");
      }
    })
    .finally(() => {
      stopLoader()
    })
  }

  return (
    <main className="font-safe-font-default relative">
      <section className="bg-safe-blue-tint text-safe-text-white flex justify-center items-center flex-col py-[74px] z-0">
        <h1 className="text-safe-text-white text-2xl sm:text-3xl font-bold mb-4 text-center">
          Get Started Now Pick a Plan
        </h1>
        <p className="text-base sm:text-lg opacity-80 mb-9 text-center mx-1">
          Purchase the Premium plan and access all the features.
        </p>
        <h3 className="text-base mb-3">Choose your plan</h3>
        <div className="flex justify-between items-center gap-5 bg-safe-blue-shade py-1 px-2 rounded-full">
          {packagePlans.map((item, i) => {
            return (
              <PricingButtons
                key={i}
                paymentPlan={item.plan}
                selectedPlan={selectedPlan}
                onclick={_handlePlanTransition}
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
              priceTime={item.priceTime}
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
          className="px-5 py-2 rounded-[50px] bg-linear-gradient text-sm sm:text-base"
          onClick={() => {
            _props.onclick(_props.paymentPlan)
          }}
        >
          {_props.paymentPlan}
        </button>
      ) : (
        <button
          className="px-5 py-2 rounded-[50px] opacity-80 text-sm sm:text-base"
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
