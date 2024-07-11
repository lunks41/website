import { useEffect, useRef, useState } from "react"

export default function ToTop() {
  const [showTopBtn, setShowTopBtn] = useState(false)
  const toTopButtonRef = useRef<HTMLButtonElement>(null)

  const handleScroll = () => {
    let timer: any
    if (window.scrollY > 700) {
      setShowTopBtn(true)
    } else {
      if (!toTopButtonRef.current) return
      clearTimeout(timer)
      toTopButtonRef.current.style.animationName = "topFade"
      timer = setTimeout(() => {
        setShowTopBtn(false)
      }, 200)
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <>
      {showTopBtn && (
        <button
          className="to-top d-flex justify-content-center align-items-center border-0"
          style={{backgroundColor:"#498DAE",width:"5px",height:"5px",borderRadius:"5px"}}
          ref={toTopButtonRef}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <img src="/images/icons/arrowUp.svg" alt="" />
        </button>
      )}
    </>
  )
}
