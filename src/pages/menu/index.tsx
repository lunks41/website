import Link from "next/link"

import "./index.scss"

const types = [
  "Party",
  "Wedding",
  "Occasion",
  "Sepcial Dinner",
  "Lunch",
  "Birthday",
  "Commercials",
  "Engagement"
]

const menu = () => {
  return (
    <div className="select_menu_main">
      <div className="container">
        <div>
          <h1 className="select_menu_header_main">Please select your menu</h1>
        </div>
        <div className="row select_menu_flex_main">
          {types.map((item: any, index: number) => {
            return (
              <div
                className="text-decoration-none col-12 col-md-6 col-lg-3 mb-4"
                key={`duration-item-${index}`}
              >
                <div className="selection_card">
                  <img
                    src="/images/icons/CommonIcon/tickSquareIcon.svg"
                    alt="eye"
                    className="tick_square_icon"
                  />
                  <h3 className="selection_card_text">
                    {item}
                  </h3>
                </div>
              </div>
            )
          })}
        </div>
        <div className="d-flex justify-content-center">
          <Link
            href="/order_completed"
            className="text-decoration-none send_request_btn_main"
          >
            Send Request
          </Link>
        </div>
        <div className="select_menu_bottom_content_main">
          <p>
            Because we at Balloons Catering Service know you don't want to
            regret saying
          </p>
          <p>‘Oh! I could have eaten a bit more...’</p>
        </div>
      </div>
    </div>
  )
}

export default menu
