import Link from "next/link";

import { useState, useEffect, useContext } from "react";
import { placeOrder } from "@/api/order";

import { CartContext } from "@/contexts/CartContext";

import { useRouter } from "next/navigation";

import "./payment.scss";

const payment = () => {
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [isPaying, setIsPaying] = useState<boolean>(false);
  const { selectedAddress, updateCart, carts } = useContext<any>(CartContext);
  const [redirectUrl, setRedirectUrl] = useState<string>("");
  const router = useRouter();

  const placeOrders = async () => {
    setIsPaying(true);
    const params = {
      shippingAddress: selectedAddress,
      billingAddress: selectedAddress,
    };
    const res: any = await placeOrder(params);
    if (res.status === 200) {
      updateCart();
      console.log(res?.data?.url);
      router.push(res?.data?.url);
    }
    setIsPaying(false);
  };

  return (
    <>
      {/* Payment Method Start */}
      <div className="payment_method_body">
        <div className="container payment_main">
          <div className="row justify-content-center">
            <div className="col-12 mt-3">
              <div className="container payment_header">
                <div className="d-flex justify-content-between">
                  <label>Select your payment method</label>
                  <Link className="text-decoration-none" href="./">
                    <img
                      src="/images/icons/header_icons/cartClose.svg"
                      alt=""
                    />
                  </Link>
                </div>
                <hr />
                <div className="row justify-content-center">
                  <div className="col-12 mt-1 payment_card p-3">
                    <div className="col-12 p-0 d-lg-flex d-md-flex d-sm-block justify-content-between align-items-center">
                      <label htmlFor="" className="payment_order_id">
                        Order #112263316163
                      </label>
                      <label htmlFor="" className="payment_order_datetime">
                        Delivered on Tue, Dec 31, 2022, 02:27 PM
                      </label>
                    </div>
                    <div className="row justify-content-center">
                      <div className="col-lg-6 col-sm-12">
                        <label className="wallet_label">Wallets</label>
                        <div className="row p-3 wallet_card_section d-lg-flex d-md-flex d-sm-block gap-3">
                          <div className="wallet_card p-2 border">
                            <div className="d-flex gap-2 justify-content-center align-items-center">
                              <img
                                src="/images/icons/payment_icons/amazon_icon.svg"
                                alt=""
                              />
                              <label className="amazon_wallet_label">
                                Amazon Pay
                              </label>
                            </div>
                            <div className="d-flex justify-content-center my-3">
                              <button className="btn amazon_pay_btn">
                                Pay 300
                              </button>
                            </div>
                          </div>
                          <div className="wallet_card p-3 border">
                            <div className="d-flex gap-2 justify-content-center align-items-center mt-2">
                              <img
                                src="/images/icons/payment_icons/paytm_icon.svg"
                                alt=""
                              />
                              <label className="amazon_wallet_label">
                                Paytm
                              </label>
                            </div>
                            <div className="d-flex justify-content-center align-items-center my-3">
                              <button className="btn link_btn">
                                Link Account
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="p-2 payment_account_card_details my-1">
                          <div>
                            <label htmlFor="" className="wallet_account_label">
                              Credit/Debit Cards
                            </label>
                          </div>
                          <hr className="m-1" />
                          <div>
                            <label
                              htmlFor=""
                              className="payment_add_card_label"
                            >
                              Add New Card
                            </label>
                          </div>
                          <div className="mt-2">
                            <label
                              htmlFor=""
                              className="payment_card_accept_label"
                            >
                              WE ACCEPT
                            </label>
                            <img src="/images/icons/cart/cards.png" alt="" />
                          </div>
                          <div className="row my-1">
                            <div className="col-sm-6 my-2">
                              <input
                                type="number"
                                className="form-control"
                                id="cardNumber"
                                placeholder="16 Digit Card Number"
                              />
                            </div>
                            <div className="col-sm-3 my-1">
                              <input
                                type="date"
                                className="form-control"
                                id="cardNumber"
                                placeholder=""
                              />
                            </div>
                            <div className="col-sm-3 my-1">
                              <input
                                type="number"
                                className="form-control"
                                id="cardNumber"
                                placeholder="CVV"
                              />
                            </div>
                          </div>
                          <div className="col-12 my-1">
                            <input
                              type="text"
                              className="form-control"
                              id="cardName"
                              placeholder="Name On Card"
                            />
                          </div>
                          <div className="col-12 my-1">
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
                                Securely save this card for a faster checkout
                                next time.
                              </label>
                            </div>
                          </div>
                          <div className="col-12 my-1">
                            <label
                              className="form_check_label"
                              htmlFor="flexCheckDefault"
                            >
                              Card details will be saved securely, based of the
                              industry standard
                            </label>
                          </div>
                          <div className="my-3">
                            <label htmlFor="" className="wallet_account_label">
                              UPI
                            </label>
                            <br />
                            <label
                              htmlFor=""
                              className="payment_add_card_label"
                            >
                              Pay via New VPA
                            </label>
                            <div className="col-12 my-1">
                              <label
                                className="form_check_label"
                                htmlFor="flexCheckDefault"
                              >
                                You must have a Virtual Payment Address
                              </label>
                              <div className="col-12 my-2">
                                <input
                                  type="text"
                                  className="form-control"
                                  id="cardName"
                                  placeholder="Enter VPA"
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
                                    Securely save this card for a faster
                                    checkout next time.
                                  </label>
                                </div>
                                <div className="col text-center my-3">
                                  <button
                                    type="button"
                                    className="btn pay_btn btn-dark"
                                    disabled={isPaying}
                                    onClick={() => placeOrders()}
                                    style={{ height: "50px" }}
                                  >
                                    {isPaying ? (
                                      <div style={{ height: "100%" }}>
                                        <img
                                          src="/images/icons/balloon-loading.gif"
                                          alt="loading"
                                          style={{
                                            height: "100%",
                                            margin: "auto",
                                          }}
                                        />
                                      </div>
                                    ) : (
                                      "Pay Now"
                                    )}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default payment;
