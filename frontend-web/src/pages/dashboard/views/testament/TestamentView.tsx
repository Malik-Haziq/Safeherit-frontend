import { useEffect, useState } from "react"
import styles from "../../Dashboard.module.css"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { findTestment } from "@/redux/actions"
import { getFileFromFirebase } from "@/common"

export default function TestamentView() {

  const dispatch = useAppDispatch()
  const beneficiary = useAppSelector((state) => state.beneficiary)
  const user = useAppSelector((state) => state.user)
  const [videoUrl, setVideoUrl] = useState("")

  useEffect(() => {
    dispatch(findTestment({})).unwrap()
    .then((res) => {
      getFileFromFirebase(res.data.data.personalized_video)
      .then((response) => {
        setVideoUrl(response)
      })
      .catch(() => {})
    })
  }, [])

  return (
    <div className={styles.AppView}>
      <main className="p-8 flex items-start gap-8 mx-auto">

        <section className="w-[520px] shadow-md max-h-[749px] min-h-[480px] rounded-2xl">
          {
            beneficiary.personalized_message ?
            <>
              <header className="py-3  bg-[#F6F6F6] text-center rounded-t-2xl text-[#00192B] font-bold text-lg">
                Written Testament
              </header>
              <div className="p-7 text-[#4F4F4F] ">{beneficiary.personalized_message}</div>
            </>
            :
            <div>Loading...</div>
          }
        </section>

        <section className="w-[520px] shadow-md rounded-2xl min-h-[480px] ">
          <header className="py-3 bg-[#F6F6F6] text-center rounded-t-2xl text-[#00192B] font-bold text-lg">
            Video Testament
          </header>
          <div className="p-7 scroll-auto text-[#00192B] text-lg text-center">
            { 
              videoUrl ?
              <>
                <h2 className="py-3 font-bold">{user.selectedRoleUser?.ownerName} left this video for you</h2>
                <p className="mb-6">Click on the video to play it.</p>
                <video controls  className="rounded-xl mb-7 mx-auto w-[466px] h-[263px]">
                  <source src={videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video> 
                <a
                  target="blank"
                  className="text-[#04477B] border-b-[1px] border-[#04477B]"
                  href={videoUrl}
                  download="your_video_filename.mp4"
                >
                  Click here to download the video
                </a>
              </>
              : 
              <div>{user.selectedRoleUser?.ownerName} left no video for you</div>
            }
          </div>
        </section>
      </main>
    </div>
  )
}
