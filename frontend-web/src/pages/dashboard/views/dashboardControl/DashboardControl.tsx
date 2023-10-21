import { useAppSelector } from "@/redux/hooks"
import DashboardView from "../dashboard/DashboardView"
import TestamentView from "../testament/TestamentView"
import ValidationView from "../validation/ValidationView"
import UsersView from "../users/UsersView"

export default function () {
  const user = useAppSelector((state) => state.user)

  return (
    <>
      {
        user.role == "owner" && <DashboardView/>
      }
      {
        user.role == "beneficiary" && <TestamentView/>
      }
      {
        user.role == "validator" && <ValidationView/>
      }
      {
       (user.role == "super-admin" || user.role == "admin") && <UsersView/>
      }
    </>
  )
}
