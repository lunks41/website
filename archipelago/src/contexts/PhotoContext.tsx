import { createContext, useEffect, useState } from "react"

export const PhotoContext = createContext({})

const PhotoContextProvider = (props: any) => {
  const [options, setOptions] = useState<any>({})

  useEffect(() => {
    const oldOptions = JSON.parse(localStorage.getItem("photoshoot") || "{}")
    const newOptions = { ...oldOptions, ...options }
    localStorage.setItem("photoshoot", JSON.stringify(newOptions))
  }, [options])

  return (
    <PhotoContext.Provider
      value={{
        options,
        setOptions,
      }}
    >
      {props.children}
    </PhotoContext.Provider>
  )
}

export default PhotoContextProvider
