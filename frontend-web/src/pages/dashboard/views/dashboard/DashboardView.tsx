import React from "react"
import diamond from "@images/diamond.svg"
import shield from "@images/Shield-done.svg"
import heart from "@images/heart.svg"
import users from "@images/users.svg"
import privateKeysIcon from "@images/key-icon.svg"

import { useAppDispatch, useAppSelector } from "@redux/hooks"
import { getData } from "@redux/actions"
import { useEffect, useState } from "react"
import { getFileFromFirebase, ROUTE_CONSTANTS } from "@/common"
import { Spinner } from "@/components"
import { Link } from "react-router-dom"
import { assetImages } from "../asset/data"

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
    { img: heart, numberOfItems: "22 Days", title: "Check due in" },
    {
      img: privateKeysIcon,
      numberOfItems: dashboardData.securityRating,
      title: `Security Score (${dashboardData.securityScore})`,
    },
  ]

  const _dashboardData = [
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
    dispatch<any>(getData({}))
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
        {_dashboardData.map((data, index) => {
          return (
            <Cards
              key={index}
              rowData={data.data}
              navigationPath={data.navigationPath}
              title={data.title}
              loading={dashboardData.loading}
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
        <img src={_props.img} alt="icon" />
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
  rowData: any
  navigationPath: string
  loading: boolean
}) {
  return (
    <div className="h-[500px] min-w-[350px] rounded-lg shadow-lg">
      <div className="flex justify-between items-center h-14 bg-safe-green-light-1 p-4 rounded-t-lg">
        <h3 className="text-safe-text-black-tint text-lg font-bold">
          {_props.title}
        </h3>
        <Link
          to={_props.navigationPath}
          className="text-safe-text-blue-shade text-sm font-semibold hover:opacity-75 cursor-pointer"
        >
          View All
        </Link>
      </div>

      <div className="h-[444px] overflow-y-auto relative">
        {_props.loading ? (
          <Spinner />
        ) : _props.rowData.length ? (
          _props.rowData.map((info: any, index: string) => {
            return (
              <Row
                key={index}
                img={info.img}
                title={info.title}
                subTitle={info.subTitle}
                type={_props.title}
              />
            )
          })
        ) : (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            No&nbsp;{_props.title}&nbsp;registered
          </div>
        )}
      </div>
    </div>
  )
}

function Row(_props: {
  img: any
  title: string
  subTitle: string
  type: string
}) {
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
      <img
        src={
          _props.type === "Assets" ? assetImages[_props.title] : image || users
        }
        alt=""
        className="w-11 h-11 rounded-full object-contain"
      />
      <div>
        <h4 className="font-semibold">{_props.title}</h4>
        <small className="text-safe-text-light-gray-1 text-sm">
          {_props.subTitle}
        </small>
      </div>
    </div>
  )
}
