import { DashboardModal } from "./modal_dashboard"
import styles from "../../Dashboard.module.css"
import diamond from "../../../../../assets/images/diamond.svg"
import shield from "../../../../../assets/images/Shield-done.svg"
import heart from "../../../../../assets/images/heart.svg"
import users from "../../../../../assets/images/users.svg"
import privateKeysIcon from "../../../../../assets/images/key-icon.svg"

export default function DashboardView() {
  const cardDettails = [
    { img: diamond, numberOfItems: "58", title: "Total Assets" },
    { img: shield, numberOfItems: "6", title: "Beneficiaries" },
    { img: users, numberOfItems: "5", title: "Validators" },
    { img: heart, numberOfItems: "22 Days", title: "Total Assets" },
    { img: privateKeysIcon, numberOfItems: "3", title: "Private Keys" },
  ]

  const cardTitles = ["Assets", "Beneficiaries", "Validators"]

  return (
    <div className="flex flex-col px-8 gap-8 mt-8 items-center max-w-[1200px] mx-auto">
      <section className="flex gap-5 h-[240px] justify-between">
        {cardDettails.map((det) => {
          return (
            <DetailsCard
              img={det.img}
              numberOfItems={det.numberOfItems}
              title={det.title}
            />
          )
        })}
      </section>
      <section className=" flex gap-4 px-auto">
        {cardTitles.map((title) => {
          return <Cards title={title} />
        })}
      </section>
    </div>
  )
}

function DetailsCard(_props: {
  img: any
  numberOfItems: string
  title: string
}) {
  return (
    <div className="h-full min-w-[200px] p-3 flex flex-col gap-8 bg-white rounded-xl shadow-lg">
      <div className="bg-safe-light-blue-tint-1 flex items-center justify-center py-7 rounded-xl">
        <img src={_props.img} alt="" />
      </div>
      <div className="flex items-center justify-center flex-col">
        <p className="text-[28px] font-bold">{_props.numberOfItems}</p>
        <small className="text-lg text-safe-text-light-gray-1">
          {_props.title}
        </small>
      </div>
    </div>
  )
}

function Cards(_props: { title: string }) {
  const assetsInfo = [
    { img: users, title: "Real estate nation bank", subtitle: "Bank account" },
    { img: users, title: "Commercial real estate", subtitle: "Bank account" },
    { img: users, title: "DPSC limited", subtitle: "Bank account" },
    { img: users, title: "Commercial real estate", subtitle: "Bank account" },
  ]

  return (
    <div className="h-[500px] w-[350px] rounded-lg shadow-lg">
      <div className="flex justify-between items-center h-14 bg-safe-green-light-1 p-4 rounded-t-lg">
        <h3 className="text-safe-text-black-tint text-lg font-bold">
          {_props.title}
        </h3>
        <a className="text-safe-text-blue-shade text-sm font-semibold">
          View All
        </a>
      </div>

      <div className="h-[444px] overflow-y-auto">
        {assetsInfo.map((info) => {
          return (
            <Row img={info.img} title={info.title} subTitle={info.subtitle} />
          )
        })}
      </div>
    </div>
  )
}

function Row(_props: { img: any; title: string; subTitle: string }) {
  return (
    <div className="p-4 flex gap-4 border-b-[.5px] ">
      <img src={_props.img} alt="" className="w-11 rounded-full" />
      <div>
        <h4 className="font-semibold">{_props.title}</h4>
        <small className="text-safe-text-light-gray-1 text-sm">
          {_props.subTitle}
        </small>
      </div>
    </div>
  )
}
