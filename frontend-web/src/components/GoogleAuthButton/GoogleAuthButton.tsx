import React from "react"

interface GoogleAuthButtonProps {
  handleClick: () => void
  type: string
  isLoading?: boolean
  buttonText: string
}

export const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({
  handleClick,
  type,
  isLoading,
  buttonText,
}) => {
  return (
    <div className="flex items-center justify-center">
      <button
        onClick={handleClick}
        className={`flex items-center justify-center border primary-btn bg-[#fff] text-[#000] gap-1 ${
          type === "login" && "rounded-md w-[100%]"
        } ${type === "signup" && "w-[300px]"}`}
      >
        {isLoading ? "Loading..." : <>{buttonText}</>}
      </button>
    </div>
  )
}
