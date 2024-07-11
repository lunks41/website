import Link from "next/link"

export default function OrderCard(props: any) {
  return (
    <div className="card_section mt-2">
      <div className="row g-1">
        <Link
          href={`/new-product/${props?.publicId}`}
          className="text-decoration-none col-sm-12 col-md-2 col-lg-2 col-xl-2 d-flex justify-content-center order_image_section"
        >
          <div className="order_img_section">
            {props?.image && (
              <img
                className="order_img"
                src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}/${props?.image}`}
                alt="Not found"
              />
            )}
          </div>
        </Link>
        <Link
          href={`/new-product/${props?.publicId}`}
          className="text-decoration-none col-sm-12 col-md-3 col-lg-2 col-xl-2"
        >
          <div className="order_section">
            <h4 className="order_heading_text">{props?.title}</h4>
            <p className="order_text">Color: {props?.color}</p>
            <p className="order_text">Supplier : {props?.supplierName}</p>
            <h4 className="order_heading_text mb-1">
              {props?.price}SAR
            </h4>
          </div>
        </Link>
        <div className="col-sm-12 col-md-7 col-lg-8 col-xl-8">
          <div className="stepper_wrapper">
            <div className="stepper_item completed">
              <div className="step_counter" />
              <div className="step_name">Order Confirm</div>
              <div className="step_date">Wed,9th Dec</div>
            </div>
            <div className="stepper_item completed">
              <div className="step_counter" />
              <div className="step_name">Ready to Ship</div>
              <div className="step_date">Fri,11th Dec</div>
            </div>
            <div className="stepper_item completed">
              <div className="step_counter" />
              <div className="step_name">Out for Delivery</div>
              <div className="step_date">Mon,14th Dec</div>
            </div>
            <div className="stepper_item active completed">
              <div className="step_counter" />
              <div className="step_name">Delivered</div>
              <div className="step_date">Mon,14th Dec</div>
            </div>
          </div>
          <hr />
          <div className="d-flex align-items-center justify-content-between">
            <p className="order_text montserrat-bold">
              Your order has been delivered
            </p>
            <Link
              href={`/add_review/${props.publicId}`}
              className="btn-add-reviews d-flex align-items-center gap-2 text-decoration-none"
            >
              <img src="/images/icons/add.svg" alt="add" />
              Add Reviews
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
