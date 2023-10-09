import { useAppSelector } from "@/redux/hooks"
import DashboardView from "../dashboard/DashboardView"
import TestamentView from "../testament/TestamentView"
import ValidationView from "../validation/ValidationView"

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
    </>
  )
}
