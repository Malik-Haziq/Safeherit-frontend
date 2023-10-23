import { useState, useEffect, useRef } from "react"

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
