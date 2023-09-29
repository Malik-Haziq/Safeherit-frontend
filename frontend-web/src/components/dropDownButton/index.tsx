import { Menu, Transition } from "@headlessui/react"
import { Fragment } from "react"
import React from "react"
import dots from "../../../assets/images/dots.svg"

export function DropDownButton(_props: any) {
  return (
    <div>
      <Menu as="div" className="inline-block text-left relative">
        <div>
          <Menu.Button as={React.Fragment}>
            <div className={_props.className}>
              {_props.userIcon && (
                <img
                  src={_props.userIcon}
                  alt=""
                  className={_props.userIconClassName}
                />
              )}
              <p className={_props.titleClassName}>{_props.title}</p>
              {_props.arrowIcon && (
                <img
                  src={_props.arrowIcon}
                  alt=""
                  className={_props.arrowDownClassName}
                />
              )}
            </div>
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
          <Menu.Items className="absolute right-0 mt-2 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1">
              {_props.options?.map((option: any, index: string) => {
                return (
                  <Menu.Item key={index}>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-safe-blue text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-3 py-2 text-sm`}
                        onClick={_props.onClick}
                      >
                        {option}
                      </button>
                    )}
                  </Menu.Item>
                )
              })}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

export function ValidatorDropDown(_props: {
  editValidator: Function
  deleteValidator: Function
  id: string
}) {
  return (
    <div>
      <Menu as="div" className="inline-block text-left">
        <div>
          <Menu.Button as={React.Fragment}>
            <img src={dots} alt="dots" className="w-6 cursor-pointer" />
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
          <Menu.Items className="absolute -left-[90px] mt-1 w-24 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <div>
                    <button
                      className={`${
                        active ? "bg-safe-blue text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      onClick={() => {
                        _props.editValidator(_props.id)
                      }}
                    >
                      Edit
                    </button>
                  </div>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <div>
                    <button
                      className={`${
                        active ? "bg-safe-blue text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      onClick={() => {
                        _props.deleteValidator(_props.id)
                      }}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
