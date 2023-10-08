import { useEffect, useState } from "react"
import styles from "../../Dashboard.module.css"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { useNavigate } from "react-router-dom"
import { getOwnerValidation, logout } from "@/redux/actions"

export default function ValidationView() {

  const user = useAppSelector((state) => state.user)
  const validator = useAppSelector((state) => state.validator)

  const [confirmed, setConfirmed] = useState(false)
  const [alive, setAlive] = useState(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [personalized_message, setPersonalized_message] = useState("")

  useEffect(() => {
    dispatch(getOwnerValidation({})).unwrap()
    .then((res) => {
      setPersonalized_message(res.data.data.personalized_message)
    })
    .catch((err) => {
      alert(err?.code)
    })
  }, [])
  
  const _handleLogout = () => {
    dispatch(logout({}))
      .unwrap()
      .catch((err) => {
        alert(err?.code)
      })
      .finally(() => {
        navigate("/login")
      })
  }
  
  const _handleAliveConfirmation = (confirmation: boolean) => {
    setAlive(confirmation)
    setConfirmed(true)
  }


  return (
    <div className={styles.AppView}>
      <main className="p-8 flex items-center gap-8 mx-auto">

        <section className="w-[520px] shadow-md max-h-[749px] min-h-[480px] rounded-2xl">
          <header className="py-3  bg-[#F6F6F6] text-center rounded-t-2xl text-[#00192B] font-bold text-lg">
            {`Message from ${user.selectedRoleUser.ownerName}`}
          </header>
          {personalized_message ? <div className="p-7 text-[#4F4F4F] ">{personalized_message}</div> : <p>Loading...</p>}
        </section>

        <section className="w-[520px] shadow-md rounded-2xl min-h-[480px] ">
          <header className="py-3 bg-[#F6F6F6] text-center rounded-t-2xl text-[#00192B] font-bold text-lg">
            {"Validation"}
          </header>
          <div className="p-7 scroll-auto text-[#00192B] text-lg text-center">
            <h2 className="py-3 font-bold">
              {confirmed
                ? "Thank you for your confirmation"
                : ` Do you confirm that ${user.selectedRoleUser.ownerName} passed away?`}
            </h2>
            <p className="mb-6">
              {confirmed
                ? `Thank you for confirming whether ${user.selectedRoleUser.ownerName} is alive or not. We will proceed accordingly.`
                : `If you are not sure, you can logout and come back once you are sure using the link and credentials sent to you by e-mail.`}
            </p>
            <p>
              {confirmed
                ? `Thank you for using SafeHerit.`
                : `However, don’t wait too long as it delays the sharing of ${user.selectedRoleUser.ownerName}’ testament and asset information to his beneficiaries.`}
            </p>
          </div>
          <div className="flex items-center justify-between px-10 pb-12">
            {confirmed ? (
              <button onClick={_handleLogout} className="px-5 mt-12 mx-auto h-[80px] font-bold text-center w-[180px] bg-[#0971AA] text-white rounded-xl">
                CLICK HERE TO LOGOUT
              </button>
            ) : (
              <>
                <button onClick={() => {_handleAliveConfirmation(true)}} className="px-5 h-[80px] font-bold text-center w-[180px] bg-[#5CEAD2] text-[#04477B] rounded-xl">
                  NO HE/SHE ISSTILL ALIVE
                </button>
                <button onClick={() => {_handleAliveConfirmation(false)}} className="px-5 h-[80px] font-bold text-center w-[180px] bg-[#0971AA] text-white rounded-xl">
                  YES
                </button>
              </>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}
