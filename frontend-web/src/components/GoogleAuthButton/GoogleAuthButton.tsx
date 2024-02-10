import React from "react"

interface GoogleAuthButtonProps {
  handleClick: () => void
  type: string
  isLoading?: boolean
  buttonText: string
  logingin?: boolean
}

export const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({
  handleClick,
  type,
  isLoading,
  buttonText,
  logingin,
}) => {
  return (
    <div className="flex items-center justify-center">
      <button
        data-cy="login-signup-with-google-button"
        onClick={handleClick}
        className={`flex items-center justify-center border primary-btn bg-[#fff] text-[#000] gap-1 ${
          type === "login" && "rounded-md w-[100%]"
        } ${type === "signup" && "w-[300px]"} ${logingin ? "text-[#ccc]" : "text-[#000]"}`}
        disabled={logingin}
      >
        {isLoading ? "Loading..." : <>{buttonText}</>}
      </button>
    </div>
  )
}
