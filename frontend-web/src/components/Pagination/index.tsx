import React from "react"
import { RefObject, useEffect, useState } from "react"
import leftArrow from "@images/left-arrow.svg"
import rightArrow from "@images/right-arrow.svg"

export function Pagination(_props: {
  totalPages: number
  currentPage: number
  parentRef: RefObject<HTMLDivElement>
  setCurrentPage: (page: number) => void
}) {
  const [visiblePages, setVisiblePages] = useState<number[]>([])

  useEffect(() => {
    const containerWidth = _props.parentRef.current
      ? _props.parentRef.current.offsetWidth
      : 0
    const noOfVisiblePages = Math.floor(containerWidth / 80)
    const startPage = Math.max(
      1,
      _props.totalPages - _props.currentPage > noOfVisiblePages / 2
        ? _props.currentPage - Math.floor(noOfVisiblePages / 2)
        : _props.totalPages - noOfVisiblePages + 1,
    )
    const lastPage = Math.min(
      _props.totalPages,
      startPage + noOfVisiblePages - 1,
    )
    const visiblePages = Array.from(
      { length: lastPage - startPage + 1 },
      (_, index) => startPage + index,
    )
    setVisiblePages(visiblePages)
  }, [_props.currentPage, _props.totalPages])

  const _changePage = (page: number) => {
    _props.setCurrentPage(page)
  }
  const _previousPage = () => {
    _changePage(_props.currentPage - 1)
  }
  const _nextPage = () => {
    _changePage(_props.currentPage + 1)
  }

  return (
    <div className="flex items-center justify-between p-5">
      <button
        onClick={_previousPage}
        disabled={_props.currentPage == 1}
        className={
          _props.currentPage > 1
            ? "px-4 py-2 text-[#04477B] border-[1px] border-[#04477B] rounded-lg flex items-center justify-center gap-2"
            : "px-4 py-2 text-[#E6EDF9] border-[1px] border-[#E6EDF2] rounded-lg flex items-center justify-center gap-2"
        }
      >
        <img src={leftArrow} alt="left arrow" />
        Previous
      </button>
      <div className="flex items-center justify-around">
        {visiblePages.map((pageNumber, index) => (
          <div
            key={index}
            onClick={() => {
              _changePage(pageNumber)
            }}
            className={
              _props.currentPage == pageNumber
                ? "w-12 h-12 text-[#04477B] bg-[#E6EDF2] flex items-center justify-center rounded-lg cursor-pointer"
                : "w-12 h-12 flex items-center justify-center cursor-pointer"
            }
          >
            {pageNumber}
          </div>
        ))}
      </div>
      <button
        onClick={_nextPage}
        disabled={_props.currentPage == _props.totalPages}
        className={
          _props.currentPage < _props.totalPages
            ? "px-4 py-2 text-[#04477B] border-[1px] border-[#04477B] rounded-lg flex items-center justify-center gap-2"
            : "px-4 py-2 text-[#E6EDF9] border-[1px] border-[#E6EDF2] rounded-lg flex items-center justify-center gap-2"
        }
      >
        Next
        <img src={rightArrow} alt="right arrow" />
      </button>
    </div>
  )
}
