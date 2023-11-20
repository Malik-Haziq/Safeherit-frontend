import React from 'react'
import { FcGoogle } from "react-icons/fc";

interface GoogleAuthButtonProps {
    handleClick: () => void;
    type: string;
    isLoading?: boolean
}

const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({handleClick, type, isLoading}) => {
  return (
    <div className='flex items-center justify-center'>

    <button onClick={handleClick}
    className={`flex items-center justify-center border primary-btn bg-[#fff] text-[#000] gap-1 ${type==='signin' && 'rounded-md w-[100%]'} ${type === 'signup' && 'w-[197px]'}`}
    >
      {
        isLoading ? "Loading..." : (
          <>
          <FcGoogle className="text-[30px]" />{type === 'signin' && "Continue with Google"} 
          </>
        )
      }
    </button>
    </div>

  )
}

export default GoogleAuthButton