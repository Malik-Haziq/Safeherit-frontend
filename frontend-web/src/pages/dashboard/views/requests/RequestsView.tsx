import { useEffect, useRef, useState } from "react"
import tick from "@images/tick-blue.svg"
import close from "@images/close-icon-red.svg"
import edit from "@images/edit-icon.svg"
import styles from "../../Dashboard.module.css"
import { Spinner, Pagination } from "@/components"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import {
  getDeleteRequests,
  reAddDeleteRequest,
  updateDeleteRequest,
} from "@/redux/actions/AdminAction"

export default function RequestsView() {
  const dispatch = useAppDispatch()
  const admin = useAppSelector((state) => state.admin)
  const user = useAppSelector((state) => state.user)
  const [loading, setLoading] = useState<boolean>(true)
  const [currentPage, setCurrentPage] = useState(1)
  const paginationRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    fetchRequests()
  }, [])
  useEffect(() => {
  }, [currentPage])

  const fetchRequests = () => {
    setLoading(true)
    dispatch<any>(getDeleteRequests({role: user.role, page: currentPage}))
      .unwrap()
      .finally(() => {
        setLoading(false)
      })
  }

  const handleUpdateRequest = (id: string, action: string) => {
    setLoading(true)
    const data = {
      id,
      action,
    }
    switch (action) {
      case "Approve":
      case "Reject":
        dispatch<any>(updateDeleteRequest(data))
          .unwrap()
          .catch(() => {
            setLoading(false)
          })
          .then(() => {
            fetchRequests()
          })
          .finally(() => {})
        break
      case "ReAdd":
        dispatch<any>(reAddDeleteRequest(data))
          .unwrap()
          .catch(() => {
            setLoading(false)
          })
          .then(() => {
            fetchRequests()
          })
          .finally(() => {})
        break
      default:
        break
    }
  }

  return (
    <div className={styles.AppView}>
      <main className="p-5 mx-auto w-[1101px]">
        <section className="rounded-xl h-[676px] border-[1px] flex justify-between flex-col" ref={paginationRef}>
          <table className="rounded-3xl ">
            <thead className="bg-[#F2F2F2] px-5 py-3 rounded-t-xl text-sm uppercase border-[1px] border-[#E5E5E5]">
              <tr>
                <th className="w-[270px] text-start">
                  <p className="pl-5 py-3 font-medium">user</p>
                </th>
                <th className=" text-start font-medium">Reason</th>
                <th className=" text-start font-medium">Requested By</th>
                <th className=" text-start font-medium">Status</th>
                {user.role === "super-admin" && (
                  <th className="pr-5 font-medium">Action</th>
                )}
              </tr>
            </thead>
            {loading ? (
              <div>
                <Spinner />
              </div>
            ) : (
              <tbody>
                {admin.requests.map((request, index) => {
                  return (
                    <RequestView
                      key={index}
                      id={request.id}
                      role={user.role}
                      reason={request?.reason}
                      request_status={request.status}
                      email={request.userEmailToDelete}
                      requestedByEmail={request.requestedByEmail}
                      updateRequest={handleUpdateRequest}
                    />
                  )
                })}
              </tbody>
            )}
          </table>
          <Pagination
            totalPages={admin.totalPages}
            currentPage={currentPage}
            parentRef={paginationRef}
            setCurrentPage={setCurrentPage}
          />
        </section>
      </main>
    </div>
  )
}

function RequestView(_props: {
  profile_image?: any
  id: string
  email: string
  requestedByEmail: string
  request_status: string
  reason: string
  role: string
  updateRequest: (id: string, action: string) => void
}) {
  return (
    <tr className="border-b-[1px] border-x-[1px] border-[#E5E5E5] h-16 rounded-2xl">
      <td className="pl-5 pr-4 flex items-center gap-3 content-center h-16">
        <p className="text-[#00192B] text-lg ">{_props.email}</p>
      </td>
      <td className="">
        <p className="text-[#00192B] text-lg ">{_props.reason}</p>
      </td>
      <td className="">
        <p className="text-[#00192B] text-lg ">{_props.requestedByEmail}</p>
      </td>

      <td
        className={`font-medium text-sm ${
          _props.request_status.toLowerCase() === "approved"
            ? "text-[#27AE60]"
            : _props.request_status.toLowerCase() === "rejected"
            ? "text-[#F44336]"
            : "text-[#e1ad54]"
        }`}
      >
        {_props.request_status}{" "}
      </td>
      {_props.role === "super-admin" && (
        <td>
          <div className="flex justify-center gap-2 w-[140px]">
            <img
              src={close}
              alt="reject icon"
              className="cy-view-asset-btn cursor-pointer text-red-400"
              id="cy-view-asset-btn"
              onClick={() => _props.updateRequest(_props.id, "Reject")}
            />
            <img
              src={tick}
              alt="approve icon"
              className="cy-edit-asset-btn cursor-pointer"
              id="cy-edit-asset-btn"
              onClick={() => _props.updateRequest(_props.id, "Approve")}
            />
            <img
              src={edit}
              alt="approve icon"
              className="cy-edit-asset-btn cursor-pointer"
              id="cy-edit-asset-btn"
              onClick={() => _props.updateRequest(_props.id, "ReAdd")}
            />
          </div>
        </td>
      )}
    </tr>
  )
}
