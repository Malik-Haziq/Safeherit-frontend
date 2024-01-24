import { useState } from "react"
import eye from "@images/eye.svg"
import styles from "../../Dashboard.module.css"
import { Spinner } from "@/components"


const dummyData = [
    {
        "reason": "Banda sahi nhi",
        "requestedByEmail": "test@example.com",
        "id": "HdcVw06vAN3AWLJAhFbr",
        "userEmailToDelete": "waseemsabir2000@gmail.com",
        "status": "pending",
        "statusUpdates": [
          {
            "statusChangedAt": {
              "_seconds": 1697820306,
              "_nanoseconds": 501000000
            },
            "statusChangedBy": "test@example.com",
            "status": "pending"
          }
        ],
        "createdAt": {
          "_seconds": 1697820306,
          "_nanoseconds": 505000000
        }
      },
      {
        "reason": "Banda sahi nhi",
        "requestedByEmail": "test@example.com",
        "id": "jSToQN87u9X7hUVFBSc7",
        "userEmailToDelete": "waseemsabir2000@gmail.com",
        "status": "pending",
        "statusUpdates": [
          {
            "statusChangedAt": {
              "_seconds": 1697820245,
              "_nanoseconds": 879000000
            },
            "statusChangedBy": "test@example.com",
            "status": "pending"
          }
        ],
        "createdAt": {
          "_seconds": 1697820245,
          "_nanoseconds": 888000000
        }
      }
]


export default function RequestsView () {

    const [loading, setLoading] = useState(false)
    const [requests, seRequests] = useState(dummyData)

    return <div className={styles.AppView}>
        <main className="p-5 mx-auto w-[1101px]">
        <section className="rounded-xl h-[676px] border-[1px] flex justify-between flex-col">
          <table className="rounded-3xl ">
            <thead className="bg-[#F2F2F2] px-5 py-3 rounded-t-xl text-sm uppercase border-[1px] border-[#E5E5E5]">
              <tr>
                <th className="w-[240px] text-start">
                  <p className="pl-5 py-3 font-medium">user</p>
                </th>
                <th className=" text-start font-medium">
                  Reason
                </th>
                <th className=" text-start font-medium">
                  Requested By
                </th>
                <th className=" text-start font-medium">Status</th>
                <th className="pr-5 font-medium">Action</th>
              </tr>
            </thead>
            {loading ? (
              <div>
                <Spinner />
              </div>
            ) : (
              <tbody>
                {requests.map((request, index) => {
                  return (
                    <RequestView
                      key={index}
                      email={request.userEmailToDelete}
                      requestedByEmail={request.requestedByEmail}
                      id={request.id}
                      request_status={request.status}
                    reason={request.reason}
                    />
                  )
                })}
              </tbody>
            )}
          </table>
         
        </section>
      </main>
    </div>
}

function RequestView(_props: {
    profile_image?: any
    id: string
    email: string
    requestedByEmail: string
    request_status: string
    reason: string
  }) {
    return (
      <tr className="border-b-[1px] border-x-[1px] border-[#E5E5E5] h-16 rounded-2xl">
        <td className="pl-5 pr-4 flex items-center gap-3 content-center h-16">
          <p className="text-[#00192B] text-lg ">
            {_props.email}
          </p>
        </td>
        <td className="">
          <p className="text-[#00192B] text-lg ">
            {_props.reason}
          </p>
        </td>
        <td className="">
          <p className="text-[#00192B] text-lg ">
            {_props.requestedByEmail}
          </p>
        </td>
  
        <td
          className={
            _props.request_status.toLowerCase() === "approved"
              ? " text-[#27AE60] font-medium text-sm"
              : _props.request_status.toLowerCase() === "rejected"
              ? " text-[#5CEAD2] font-medium text-sm"
              : " text-[#F44336] font-medium text-sm"
          }
        >
          {_props.request_status}{" "}
        </td>
        <td>
          <div className="flex justify-center gap-1 w-[140px]">
            <img
              src={eye}
              alt="view icon"
              className="cy-view-asset-btn cursor-pointer"
              id="cy-view-asset-btn"
            />
          </div>
        </td>
      </tr>
    )
  }
  