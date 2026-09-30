import { createContext, useEffect, useState } from "react"
import { useRouter } from "next/router"

import { getUserProfile } from "@/api/auth"

// import { io } from "socket.io-client"

const socketUrl: any = process?.env?.NEXT_PUBLIC_AUTH_URL

let socket: any

export const AuthContext = createContext({})

const AuthContextProvider = (props: any) => {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [messages, setMessages] = useState<any>([])
  const [loginOpen, setLoginOpen] = useState(false)
  const [me, setMe] = useState({
    email: null,
    name: null,
    mobileNumber: null,
    role: null,
    password: null,
  })

  let loginData: any = {}

  // const sendSocketId = (id: string) => {
  //   if (loginData) {
  //     socket.emit("add-user", id, (socket: any) => {
  //       console.log("socket", socket)
  //     })
  //   }
  // }

  const handleMessage = (index: number, key: string) => {
    setMessages((prev: any) => [
      ...prev.slice(0, index),
      ...prev.slice(index + 1),
    ])
    const loginData: any = localStorage.getItem("login_data")
    const data = JSON.parse(loginData)
    if (data) {
      data.user.messages = [
        ...messages.slice(0, index),
        ...messages.slice(index + 1),
      ]
      localStorage.removeItem("login_data")
      localStorage.setItem("login_data", JSON.stringify(data))
    }
    if (key === "delete") {
      console.log(messages[index].id, "messages[index].id")
      socket.emit("delete-message", messages[index].id, (socket: any) => {
        console.log(socket)
      })
    } else {
      socket.emit("read-message", messages[index].id, (socket: any) => {
        console.log(socket)
      })
    }
  }

  if (typeof window !== "undefined") {
    loginData = localStorage.getItem("login_data")
  }

  const doSetUser = (data: any) => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("login_data")
      localStorage.setItem("login_data", JSON.stringify(data))
      setIsAuthenticated(true)
      setMe(data)
      // socket = io(socketUrl)
      // sendSocketId(data.user?.publicId)
      setMessages(data?.user?.messages)
    }
  }
  const logOut = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("login_data")
      loginData = null
      socket?.destroy()
      setIsAuthenticated(false)
      setMe({
        email: null,
        name: null,
        mobileNumber: null,
        role: null,
        password: null,
      })
      router.push("/")
    }
  }

  const checkToken = async (data: any) => {
    const res: any = await getUserProfile()
    if (res.status === 200) {
      doSetUser(data)
    } else {
      logOut()
    }
  }

  useEffect(() => {
    if (loginData) {
      const data = JSON.parse(loginData)
      checkToken(data)
    } else {
      setIsAuthenticated(false)
      setMe({
        email: null,
        name: null,
        mobileNumber: null,
        role: null,
        password: null,
      })
      setMessages([])
    }
  }, [loginData])

  useEffect(() => {
    if (!isAuthenticated) {
      return
    }
    socket.on("connect", () => {
      console.log(socket.id, "connected") // x8WIv7-mJelg7on_ALbx
    })
    socket.on("disconnect", () => {
      console.log(socket.id) // undefined
    })
    socket.on("status-change", (res: any) => {
      const loginData: any = localStorage.getItem("login_data")
      const data = JSON.parse(loginData)
      if (data) {
        data.user.messages.push({ status: res.status, id: res.id })
        localStorage.removeItem("login_data")
        localStorage.setItem("login_data", JSON.stringify(data))
      }
      setMessages((prev: any) => [...prev, { status: res.status, id: res.id }])
    })
    return () => {
      socket.disconnect()
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        me,
        isAuthenticated,
        messages,
        doSetUser,
        setMessages,
        handleMessage,
        socket,
        logOut,
        loginOpen,
        setLoginOpen,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
