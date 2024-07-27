import { useState, useEffect } from "react"
import { ApplicationVerifier, RecaptchaVerifier } from "@firebase/auth"
import { auth } from "@/firebase"
import { toast } from "@/components"

export const useArray = () => {
  const [array, setArray] = useState<string[]>([])
  const [arrayLength, setArrayLength] = useState(0)

  useEffect(() => {
    setArrayLength(array.length)
  }, [array])

  function push(newValue: string) {
    setArray([...array, newValue])
  }

  const pop = () => {
    const lastValue = array[array.length - 1]
    const newArr = array.filter((value) => value !== lastValue)

    setArray(newArr)
  }

  const popAll = () => {
    setArray([])
  }

  return [array, arrayLength, pop, push, popAll] as const
}

export function useRecaptcha(componentId: string) {
  const [recaptcha, setRecaptcha] = useState<ApplicationVerifier>()

  useEffect(() => {
    const recaptchaVerifier = new RecaptchaVerifier(
      componentId,
      {
        size: "invisible",
        callback: () => {},
      },
      auth,
    )

    setRecaptcha(recaptchaVerifier)

    return () => {
      recaptchaVerifier.clear()
    }
  }, [componentId])

  return recaptcha
}

/* Image and Video upload hooks */
// types
interface CustomChangeEvent {
  target: {
    name: string
    value: string | ArrayBuffer | null | undefined | File | number
  }
}

interface ImageHookProps {
  setImageUpload: (
    dataURL: string | ArrayBuffer | null | undefined | File,
  ) => void
  _handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

interface VideoHookProps {
  setVideoUpload?: any
  _handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

interface FileUploadResult {
  file: File | null
  fileSize: number
}

export const useImageFileUpload = (
  maxSize: number = 10,
  _props: ImageHookProps,
) => {
  const [file, setFile] = useState<File | null>(null)

  const handleImageFileUpload = (file: File): FileUploadResult => {
    const fileSizeInMB = file.size / (1024 * 1024)
    if (fileSizeInMB > maxSize) {
      toast(`File too large. Maximum allowed size is ${maxSize} MB.`, "error")
      return { file: null, fileSize: 0 }
    } else {
      const reader = new FileReader()
      reader.onload = (e) => {
        const dataURL = e.target?.result
        _props.setImageUpload(dataURL)

        // Dispatch custom event for profile_image
        const customEvent: CustomChangeEvent = {
          target: {
            name: "profile_image",
            value: file,
          },
        }
        _props._handleChange(customEvent as React.ChangeEvent<HTMLInputElement>)
      }
      reader.readAsDataURL(file)
      setFile(file)
      return { file, fileSize: fileSizeInMB }
    }
  }
  return {
    file,
    handleImageFileUpload,
  }
}

export const useVideoFileUpload = (
  maxSize: number = 100,
  _props: VideoHookProps,
) => {
  const [file, setFile] = useState<File | null>(null)

  const handleVideoFileUpload = (file: File): FileUploadResult => {
    const fileSizeInMB = file.size / (1024 * 1024)
    if (fileSizeInMB > maxSize) {
      toast(`File too large. Maximum allowed size is ${maxSize} MB.`, "error")
      return { file: null, fileSize: 0 }
    } else {
      const reader = new FileReader()
      reader.onload = (e) => {
        const dataURL = e.target?.result
        _props.setVideoUpload(dataURL)

        // Dispatch custom event for personalized_video
        const customEvent: CustomChangeEvent = {
          target: {
            name: "personalized_video",
            value: file,
          },
        }
        _props._handleChange(customEvent as React.ChangeEvent<HTMLInputElement>)
      }
      reader.readAsDataURL(file)
      setFile(file)
      return { file, fileSize: fileSizeInMB }
    }
  }
  return {
    file,
    handleVideoFileUpload,
  }
}
