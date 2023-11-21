import { useState, useEffect } from "react"
import { ApplicationVerifier, RecaptchaVerifier } from "@firebase/auth";
import { auth } from "@/firebase";

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
    let lastValue = array[array.length - 1]
    let newArr = array.filter((value) => value !== lastValue)

    setArray(newArr)
  }

  const popAll = () => {
    setArray([])
  }

  return [array, arrayLength, pop, push, popAll] as const
}

export function useRecaptcha(componentId: string) {
  const [recaptcha, setRecaptcha] = useState<ApplicationVerifier>();

  useEffect(() => {
    const recaptchaVerifier = new RecaptchaVerifier(componentId, {
      "size": "invisible",
      "callback": () => {}
    }, auth);

    setRecaptcha(recaptchaVerifier);

    return () => {
      recaptchaVerifier.clear();
    }
  }, [componentId]);

  return recaptcha;
}
