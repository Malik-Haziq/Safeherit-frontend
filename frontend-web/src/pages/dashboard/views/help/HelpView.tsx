import styles from "../../Dashboard.module.css"
import addIcon from '@images/add.svg'
import crossIcon from '@images/cross.svg'
import emailIcon from '@images/email.svg'
import callIcon from '@images/call.svg'

import {useState} from 'react'
export default function () {
  const [openSection, setOpenSection] = useState('faq')

  function handleSection(section: string){
    setOpenSection(section)
  }

  return <div className={styles.AppView}>
    <main className="p-8 flex flex-col gap-8 mx-auto">
      <div className="w-[1085px]">
        <div className="flex gap-2 p-2 rounded-full mx-auto bg-white w-fit">
          <h1 className={openSection === 'faq' ? "px-6 py-2 bg-[#0971AA] rounded-full text-white font-semibold cursor-pointer" : "px-6 py-2 text-[#545454] rounded-full font-semibold cursor-pointer"} onClick={()=> handleSection('faq')}>Tutorial video & FAQ</h1>
          <h1 className={openSection === 'support' ? "px-6 py-2 bg-[#0971AA] rounded-full text-white font-semibold cursor-pointer" : "px-6 py-2 text-[#545454] rounded-full font-semibold cursor-pointer"} onClick={()=> handleSection('support')}>Contact Support</h1>
        </div>
      </div>
      {openSection === 'faq' &&  <FAQ/>}
      {openSection === 'support' &&  <Support/>}
    </main>
  </div>
}

function FAQ(){
  const FAQArr = [
    {
      question: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', 
      awnser: "Lorem Ipsum is simply dummy text of the printing and industry. Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a  galley of type and scrambled it to make a type specimen book. It has survivedcenturies, but also the leap into electronic typesetting, remaining essentially unchanged."

    },
    {
      question: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', 
      awnser: "Lorem Ipsum is simply dummy text of the printing and industry. Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a  galley of type and scrambled it to make a type specimen book. It has survivedcenturies, but also the leap into electronic typesetting, remaining essentially unchanged."

    },
    {
      question: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', 
      awnser: "Lorem Ipsum is simply dummy text of the printing and industry. Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a  galley of type and scrambled it to make a type specimen book. It has survivedcenturies, but also the leap into electronic typesetting, remaining essentially unchanged."

    },
    {
      question: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', 
      awnser: "Lorem Ipsum is simply dummy text of the printing and industry. Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a  galley of type and scrambled it to make a type specimen book. It has survivedcenturies, but also the leap into electronic typesetting, remaining essentially unchanged."

    },
    {
      question: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', 
      awnser: "Lorem Ipsum is simply dummy text of the printing and industry. Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a  galley of type and scrambled it to make a type specimen book. It has survivedcenturies, but also the leap into electronic typesetting, remaining essentially unchanged."

    },
  ]

  return (
      <section className="flex flex-col gap-6 bg-white mx-8 py-10 px-8 rounded-2xl w-[1085px] shadow-sm">
        {FAQArr.map(faq=>{
          return <QuestionBox question={faq.question} awswer={faq.awnser}/>
        })}
      </section>
  )
}

function QuestionBox(_props: {question: string; awswer: string}){
  const [isOpen, setIsOpen] = useState(false)

  function handleOpen(){
    setIsOpen(!isOpen)
  }

  return (
    <article className="mx-auto flex justify-between gap-5 shadow-lg p-6 rounded-2xl">
      <div className="w-[910px]">
        <h1 className="text-[#545454] text-xl mb-2 font-semibold">{_props.question}</h1>
        {isOpen && <p className="text-[#A5A5A5] ">{_props.awswer}</p>} 
      </div>
      <a href="#" className="w-10 h-10" onClick={handleOpen}>{isOpen ? <img src={crossIcon} alt="icon for closing box" className="w-full"/> : <img src={addIcon} alt="icon for opening box" className="w-full"/>}</a>
    </article>
 )
}

function Support(){
  return (
    <main className="flex flex-col gap-6 bg-white mx-8 py-10 px-8 rounded-2xl w-[1085px] shadow-sm">
      <section className="flex justify-between gap-6">
        <article className="flex gap-6 shadow-md rounded-2xl p-6 basis-1/2">
          <img src={emailIcon} alt="email icon" />  
          <div>
            <h2 className="text-[#828282] text-sm">Email Address</h2>
            <p className="font-semibold">Support.Safeherit@gmail.com</p>
          </div>
        </article>     
        <article className="flex gap-6 shadow-md rounded-2xl p-6 basis-1/2">
          <img src={callIcon} alt="email icon" />  
          <div>
            <h2 className="text-[#828282] text-sm">Contact Us</h2>
            <p className="font-semibold">+91 90000 00000 | 798 00000 000</p>
          </div>
        </article>
      </section>  
      <form className="mb-14">
        <textarea placeholder="Enter your message..." className="w-full h-[336px] p-4 resize-none focus:outline-none shadow-md scrollbar rounded-2xl"></textarea>
        <button className="primary-btn mx-auto px-12 rounded-xl mt-10 bg-[#0971AA]">Submit</button>
      </form>
    </main>
  )
}