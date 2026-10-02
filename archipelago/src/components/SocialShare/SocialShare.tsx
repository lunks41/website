import { useState, useRef } from "react"

import { useRouter } from "next/router"

import {
  TwitterShareButton,
  TwitterIcon,
  FacebookShareButton,
  FacebookIcon,
} from "next-share"

import "./SocialShare.scss"

export default function SocialShare({ onClose }: any) {
  const backdropRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const facebookBtnRef = useRef<HTMLButtonElement>(null)
  const twitterBtnRef = useRef<HTMLButtonElement>(null)
  const router = useRouter()

  const handleClose = () => {
    if (!backdropRef.current) return
    backdropRef.current.style.animationName = "showOut"
    if (!modalRef.current) return
    modalRef.current.style.animationName = "showOut"
    setTimeout(() => {
      onClose()
    }, 200)
  }

  const handleButtonClick = (type: string) => {
    if (type === "twitter") {
      if (!twitterBtnRef.current) return
      twitterBtnRef.current.click()
    } else {
      if (!facebookBtnRef.current) return
      facebookBtnRef.current.click()
    }
  }

  return (
    <>
      <div className="backdrop" onClick={handleClose} ref={backdropRef}></div>
      <div
        className="share-modal d-flex justify-content-center align-items-center flex-column p-5"
        ref={modalRef}
      >
        <button className="social-close p-0" onClick={handleClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
            width="25px"
            height="25px"
          >
            <path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z" />
          </svg>
        </button>
        <h1>Sharing is Caring</h1>
        <p className="mb-4">
          Help spread the word. You're awesome for doing it!
        </p>
        <div className="d-flex gap-3 align-items-center justify-content-center">
          <div
            className="twitter-btn ps-2 pe-3 d-flex justfity-content-between align-items-center"
            onClick={() => handleButtonClick("twitter")}
          >
            <TwitterShareButton
              url={`${window.location.origin}${router.asPath}`}
              ref={twitterBtnRef}
              title={
                "next-share is a social share buttons for your next React apps."
              }
            >
              <TwitterIcon size={36} round />
            </TwitterShareButton>
            Twitter
          </div>
          <div
            className="facebook-btn ps-2 pe-3 d-flex justfity-content-between align-items-center"
            onClick={() => handleButtonClick("facebook")}
          >
            <FacebookShareButton
              ref={facebookBtnRef}
              url={`${window.location.origin}${router.asPath}`}
              quote={
                "next-share is a social share buttons for your next React apps."
              }
              hashtag={"#nextshare"}
            >
              <FacebookIcon size={36} round />
            </FacebookShareButton>
            Facebook
          </div>
        </div>
      </div>
    </>
  )
}
