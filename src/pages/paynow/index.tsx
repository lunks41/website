import { useContext, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/router"

import { toast } from "react-toastify"

import { bookPhotographer } from "@/api/photoshoot"
import { PhotoContext } from "@/contexts/PhotoContext"
import { useTranslation } from "react-i18next";

import "./paynow.scss"

const paynow = () => {
  const router = useRouter()
  const { t } = useTranslation();
  const { options } = useContext<any>(PhotoContext)

  const handlePay = async () => {
    const { status }: any = await bookPhotographer(options)
    if (status === 201) {
      router.push("/ordercomplete")
    } else {
      toast.error("Whoops something went wrong!")
    }
  }

  return (
    <>
      <div className="container pay_now_page">
        <div className="row justify-content-center">
          <div className="col-12 mt-5">
            <div className="container pay_now_header_section">
              <div className="d-flex justify-content-between align-items-center">
                <h3 className="heading_text">{t('Pay now')}</h3>
                <Link href="/" className="text-decoration-none">
                  <img src="/images/icons/header_icons/cartClose.svg" alt="" />
                </Link>
              </div>
              <hr />
            </div>
            <div className="row  mt-4 justify-content-center align-items-center">
              <div className="col-sm-12 col-md-10 col-lg-8 col-xl-8 pay_now_details">
                <div className="p-2 order_account_coupon my-2">
                  <div>
                    <label className="detail_heading_text">
                     {t('Redeem coupon')} {" "}
                    </label>
                  </div>
                  <hr />
                  <div className="input-group mt-2">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Coupon Code"
                    />
                    <button type="button" className="btn coupon_btn">
                     {t('APPLY')} 
                    </button>
                  </div>
                </div>
                <div className="p-2 order_account_card_details my-2">
                  <div>
                    <label className="detail_heading_text">
                     {t('Credit/Debit Cards')} 
                    </label>
                  </div>
                  <hr className="m-1" />
                  <div>
                    <label className="add_card_label">{t('Add New Card')} </label>
                  </div>
                  <div className="mt-2">
                    <label className="card_accept_label">{t('WE ACCEPT')} </label>
                    <img src="/images/icons/cart/cards.png" alt="" />
                  </div>
                  <div className="row my-2">
                    <div className="col-sm-6 my-2">
                      <input
                        type="number"
                        className="form-control"
                        id="cardNumber"
                        placeholder="16 Digit Card Number"
                      />
                    </div>
                    <div className="col-sm-3 my-2">
                      <input
                        type="date"
                        className="form-control"
                        id="cardNumber"
                        placeholder="Valid Date(MM/YY)"
                      />
                    </div>
                    <div className="col-sm-3 my-2">
                      <input
                        type="number"
                        className="form-control"
                        id="cardNumber"
                        placeholder="CVV"
                      />
                    </div>
                  </div>
                  <div className="col-12 my-2">
                    <input
                      type="text"
                      className="form-control"
                      id="cardName"
                      placeholder="Name On Card"
                    />
                  </div>
                  <div className="col-12 my-2">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        defaultValue=""
                        id="flexCheckDefault"
                      />
                      <label
                        className="form_check_label"
                        htmlFor="flexCheckDefault"
                      >
                       {t('Securely save this card for a faster checkout next time.')} 
                      </label>
                    </div>
                  </div>
                  <div className="col-12 my-1">
                    <label
                      className="form_check_label"
                      htmlFor="flexCheckDefault"
                    >
                     {t('Card details will be saved securely, based of the industry  standard')} 
                     
                    </label>
                  </div>
                </div>
                <div className="p-2 order_summary_details my-2">
                  <div>
                    <label className="detail_heading_text">{t('Order Summary')} </label>
                  </div>
                  <hr className="m-1" />
                  <div className="d-flex justify-content-between my-2">
                    <label className="summary_item_label">
                     {t('Shoot day- Booking deposit: Event shoot')} 
                    </label>
                    <label className="summary_item_label">190 {t('SAR')} </label>
                  </div>
                  <div className="d-flex justify-content-between my-2">
                    <label className="summary_item_label text-success">
                       {t('Pay after shoot')} 
                    </label>
                    <label className="summary_item_label text-success">
                      760 {t('SAR')} 
                    </label>
                  </div>
                  <div className="d-flex justify-content-between my-2">
                    <label className="summary_item_label">{t('Tax')} </label>
                    <label className="summary_item_label">50 {t('SAR')} </label>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between my-2">
                    <label className="summary_item_label">{t('Grand total')} </label>
                    <label className="summary_item_label">41000 {t('SAR')} </label>
                  </div>
                  <div className="d-flex justify-content-between my-2">
                    <label className="summary_item_label">
                     {t('Pay now As a deposit')} 
                    </label>
                    <label className="summary_item_label">190 {t('SAR')} </label>
                  </div>
                </div>
                <div className="col text-center my-4">
                  <button
                    className="btn pay_btn text-decoration-none"
                    onClick={handlePay}
                  >
                   {t('Pay Now')} 
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default paynow
