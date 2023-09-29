import { DashboardModal } from "./modal_dashboard"
import styles from "../../Dashboard.module.css"
import diamond from "../../../../../assets/images/diamond.svg"
import shield from "../../../../../assets/images/Shield-done.svg"
import heart from "../../../../../assets/images/heart.svg"
import users from "../../../../../assets/images/users.svg"
import privateKeysIcon from "../../../../../assets/images/key-icon.svg"
import { useAppDispatch } from "../../../../redux/hooks"
import { getData } from "../../../../redux/actions/DashboardAction"
import { useEffect, useState } from "react"
import { useAppSelector } from "../../../../redux/hooks"
import { getFileFromFirebase } from "../../../../common/utils/firebase"
import { ROUTE_CONSTANTS } from "../../../../common"

export default function DashboardView() {
  const dispatch = useAppDispatch()
  const dashboardData = useAppSelector((state) => state.dashboard)

  const cardDetails = [
    {
      img: diamond,
      numberOfItems: dashboardData.assetCount,
      title: "Total Assets",
    },
    {
      img: shield,
      numberOfItems: dashboardData.beneficiaryCount,
      title: "Beneficiaries",
    },
    {
      img: users,
      numberOfItems: dashboardData.validatorCount,
      title: "Validators",
    },
    { img: heart, numberOfItems: "22 Days", title: "Total Assets" },
    { img: privateKeysIcon, numberOfItems: "Medium", title: "Security Score" },
  ]
  const assets = [
    {
      title: "Assets",
      data: dashboardData.assets,
      navigationPath: `${ROUTE_CONSTANTS.DASHBOARD}/${ROUTE_CONSTANTS.DASHBOARD_ASSETS}`,
    },
    {
      title: "Beneficiaries",
      data: dashboardData.beneficiaries,
      navigationPath: `${ROUTE_CONSTANTS.DASHBOARD}/${ROUTE_CONSTANTS.DASHBOARD_BENEFICIARIES}`,
    },
    {
      title: "Validators",
      data: dashboardData.validators,
      navigationPath: `${ROUTE_CONSTANTS.DASHBOARD}/${ROUTE_CONSTANTS.DASHBOARD_VALIDATORS}`,
    },
  ]

  useEffect(() => {
    dispatch(getData({}))
      .unwrap()
      .catch(() => {
        // TODO: show fallback page
      })
  }, [])

  return (
    <div className="flex flex-col px-8 gap-8 mt-8 max-w-[1200px] mx-auto">
      <section className="flex gap-5 h-[240px] justify-between">
        {cardDetails.map((detail, index) => {
          return (
            <DetailsCard
              key={index}
              img={detail.img}
              numberOfItems={detail.numberOfItems}
              title={detail.title}
            />
          )
        })}
      </section>
      <section className=" flex gap-4 px-auto mx-auto">
        {assets.map((asset, index) => {
          return (
            <Cards
              key={index}
              assetsInfo={asset.data}
              navigationPath={asset.navigationPath}
              title={asset.title}
            />
          )
        })}
      </section>
    </div>
  )
}

function DetailsCard(_props: {
  img: any
  numberOfItems: string | number
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

function Cards(_props: {
  title: string
  assetsInfo: any
  navigationPath: any
}) {
  return (
    <div className="h-[500px] min-w-[350px] rounded-lg shadow-lg">
      <div className="flex justify-between items-center h-14 bg-safe-green-light-1 p-4 rounded-t-lg">
        <h3 className="text-safe-text-black-tint text-lg font-bold">
          {_props.title}
        </h3>
        <a
          href={_props.navigationPath}
          className="text-safe-text-blue-shade text-sm font-semibold hover:opacity-75 cursor-pointer"
        >
          View All
        </a>
      </div>

      <div className="h-[444px] overflow-y-auto">
        {_props.assetsInfo.length ? (
          _props.assetsInfo.map((info: any, index: string) => {
            return (
              <Row
                key={index}
                img={info.img}
                title={info.title}
                subTitle={info.subTitle}
              />
            )
          })
        ) : (
          <>{_props.title} preview not available</>
        )}
      </div>
    </div>
  )
}

function Row(_props: { img: any; title: string; subTitle: string }) {
  const [image, setImage] = useState<string>("")
  useEffect(() => {
    getFileFromFirebase(_props.img)
      .then((res) => {
        setImage(res)
      })
      .catch(() => {
        setImage("")
      })
  }, [_props.img])
  return (
    <div className="p-4 flex gap-4 border-b-[.5px] ">
      <img src={image || users} alt="" className="w-11 h-11 rounded-full" />
      <div>
        <h4 className="font-semibold">{_props.title}</h4>
        <small className="text-safe-text-light-gray-1 text-sm">
          {_props.subTitle}
        </small>
      </div>
    </div>
  )
}
