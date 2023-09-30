import { Menu, Transition } from "@headlessui/react"
import { Fragment, useEffect, useRef, useState } from "react"
import notificationIcon from "../../../assets/images/Notification.svg"
import notification from "../../../assets/images/notification-icon.svg"

export function Notifications() {
  const notificationsArr = [
    {
      title: "Please verify your account!",
      message: "Go to profile and verify your..",
    },
    {
      title: "Please verify your account!",
      message: "Go to profile and verify your..",
    },
    {
      title: "Please verify your account!",
      message: "Go to profile and verify your..",
    },
    {
      title: "Please verify your account!",
      message: "Go to profile and verify your..",
    },
    {
      title: "Please verify your account!",
      message: "Go to profile and verify your..",
    },
  ]
  return (
    <div>
      <Menu as="div" className="relative inline-block text-left z-50">
        <div>
          <Menu.Button className="inline-flex w-full justify-center">
            <img src={notificationIcon} alt="notification icon" />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            as="div"
            className="absolute right-0 mt-2 w-[288px] origin-top-right divide-gray-100 rounded-xl bg-white shadow-lg border-[.5px] "
          >
            <ul className=" rounded-[14px]">
              <Menu.Item>
                <li className="px-4 py-3 flex items-center justify-between border-b-2">
                  <h3 className="font-bold">Notifications</h3>
                  <a
                    href="#"
                    className="text-[#9F9F9F] text-sm font-medium"
                    onClick={() => {}}
                  >
                    Clear
                  </a>
                </li>
              </Menu.Item>
              <Menu.Item>
                <div className=" h-[210px] overflow-y-auto scrollbar">
                  {notificationsArr.map((notification, index) => {
                    return (
                      <Notification
                        key={index}
                        title={notification.title}
                        msg={notification.message}
                      />
                    )
                  })}
                </div>
              </Menu.Item>
              <Menu.Item>
                <li className="bg-[#E7F3F9] flex items-center justify-center py-3">
                  <a
                    href="#"
                    className="text-[#04477B] text-sm w-full h-full text-center "
                  >
                    View All
                  </a>
                </li>
              </Menu.Item>
            </ul>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

function Notification(_props: { title: any; msg: any }) {
  return (
    <li className="flex gap-3 p-4">
      <img src={notification} alt="notification icon" />
      <div className="flex flex-col">
        <p className="text-sm font-semibold">{_props.title}</p>
        <small className="text-[#74777E] text-xm">{_props.msg}</small>
      </div>
    </li>
  )
}
