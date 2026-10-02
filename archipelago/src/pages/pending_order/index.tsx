import Link from "next/link";
import { useTranslation } from "react-i18next";
import "./pending_order.scss";

const pending_order = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="order_detials_page">
        <div className="container">
          <div className="address_header_seciton">
            <h3 className="heading_text">Order Details</h3>
            <div className="close_icon_section">
              <Link href="/" className="text-decoration-none">
                <img src="/images/icons/CommonIcon/CloseIcon.svg" />
              </Link>
            </div>
          </div>
          <hr />
          <div className="card_section">
            <div className="row g-1">
              <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                <h2 className="order_number_text">Order #112263316163</h2>
              </div>
              <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 d-flex justify-content-end align-items-center order_image_section">
                <p className="m-0 order_status_text order_status_delivered">
                  Delivered on Mon, 14 Dec 2022
                </p>
              </div>
            </div>
          </div>
          <div className="card_section mt-2">
            <div className="row g-1">
              <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                <h2 className="order_number_text mb-4">
                  {t("Delivery address")}
                </h2>
                <h4 className="order_heading_text montserrat-bold">
                  Shaikh Altaf
                </h4>
                <p className="order_text">
                  1st floor, xyz building, xyz colony, near xyz shop, riyad,
                  Saudia rabia-12211
                </p>
                <p className="order_text">
                  <span className="montserrat-bold">Phone number:</span>
                  9890740354
                </p>
              </div>
              <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                <a href="#" className="order_check">
                  Cancel your order
                </a>
              </div>
            </div>
          </div>
          <div className="card_section mt-2">
            <div className="row g-1">
              <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 d-flex justify-content-center order_image_section">
                <div className="order_img_section">
                  <img
                    className="order_img"
                    src="/images/orderImg.png"
                    alt="Not found"
                  />
                </div>
              </div>
              <div className="col-sm-12 col-md-3 col-lg-2 col-xl-2">
                <div className="order_section">
                  <h4 className="order_heading_text">White Lilies</h4>
                  <p className="order_text">Size:1 Color: white</p>
                  <p className="order_text">Supplier : Supplier name</p>
                  <h4 className="order_heading_text mb-1">150SAR</h4>
                </div>
              </div>
              <div className="col-sm-12 col-md-7 col-lg-8 col-xl-8">
                <div className="stepper_wrapper">
                  <div className="stepper_item completed">
                    <div className="step_counter" />
                    <div className="step_name">Order Confirm</div>
                    <div className="step_date">Wed,9th Dec</div>
                  </div>
                  <div className="stepper_item">
                    <div className="step_counter" />
                    <div className="step_name">Ready to Ship</div>
                    <div className="step_date">Fri,11th Dec</div>
                  </div>
                  <div className="stepper_item">
                    <div className="step_counter" />
                    <div className="step_name">Out for Delivery</div>
                  </div>
                  <div className="stepper_item active">
                    <div className="step_counter" />
                    <div className="step_name">Delivered</div>
                    <div className="step_date">Expected by Mon, 14th Dec</div>
                  </div>
                </div>
                <hr />
                <p className="order_text montserrat-bold">
                  Item waiting to be picked up by Supplier.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default pending_order;
