import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState, ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import Good from "@/components/Good/Good";
import SocialShare from "@/components/SocialShare/SocialShare";
import Skeleton from "react-loading-skeleton";
import Calendar from "react-calendar";
import { toast } from "react-toastify";
import moment from "moment";
import DefaultBanner from "@/components/Banner/Banner";
import ProgressBar from "@/components/ProgressBar/ProgressBar";
import Review from "@/components/Review/Review";
import { getProductDetails, getProducts } from "@/api/product";
import { getProductReview } from "@/api/order";
import { addToCart } from "@/api/cart";
import { Markup } from "interweave";
import { CartContext } from "@/contexts/CartContext";
import { AuthContext } from "@/contexts/AuthContext";
import { ParamContext } from "@/contexts/ParamContext";
import { addToFavorite } from "@/api/product";
import "./detail.scss";
import SimpleReactValidator from "simple-react-validator";
interface formDataProps {
  printedCard: string;
}

const FORMDATA_KEY = {
  PRINTED_CARD: "printed card",
};

const times = [
  {
    start: "09:00 AM",
    end: "12:00 PM",
  },
  {
    start: "12:00 PM",
    end: "03:00 PM",
  },
  {
    start: "03:00 PM",
    end: "06:00 PM",
  },
  {
    start: "06:00 PM",
    end: "09:00 PM",
  },
];

const detail = () => {
  const [isDragging, setIsDragging] = useState(false);
  const SliderSettings = {
    dots: false,
    arrows: true,
    slidesToShow: 4,
    adaptiveHeight: true,
    slidesToScroll: 4,
    autoplay: true,
    swipe: true,
    speed: 600,
    autoplaySpeed: 4000,
    beforeChange: () => {
      setIsDragging(true);
    },
    afterChange: () => {
      setIsDragging(false);
    },
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 552,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const { t, i18n } = useTranslation();
  const [details, setDetails] = useState<any>({});
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const { setLoginOpen, isAuthenticated, loginOpen } =
    useContext<any>(AuthContext);
  const { updateCart } = useContext<any>(CartContext);
  const { selectedLanguage } = useContext<any>(ParamContext);
  const [cartCount, setCartCount] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [deliveryDate, setDeliveryDate] = useState<Date>(new Date());
  const [displayDate, setDisplayDate] = useState<boolean>(false);
  const [showCaldendar, setShowCalendar] = useState<boolean>(false);
  const [selectedTime, setSelectedTime] = useState<number>(0);
  const [products, setProducts] = useState<any>([]);
  const [selectedDeliveryTime, setSelectedDeliveryTime] = useState<number>(0);
  const [socialModalShow, setSocialModalShow] = useState<boolean>(false);
  const [categoryId, setCategoryId] = useState<number>(-1);
  const router = useRouter();
  const { slug }: any = router.query;
  const calendarModalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const [pageSize, setPageSize] = useState<number>(10);
  const [rates, setRates] = useState<any>({});
  const [reviews, setReviews] = useState<any>([]);
  const [reviewCounts, setReviewCounts] = useState<number>(0);
  const [totalRatings, setTotalRatings] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [, forceUpdate] = useState<number>();
  const validator = useRef(
    new SimpleReactValidator({
      autoForceUpdate: { forceUpdate: () => forceUpdate(1) },
    })
  );
  const [formData, setFormData] = useState<formDataProps>({
    printedCard: "",
  });

  const ArrowLeft = (
    <img src="/images/icons/calendar/arrow-left.svg" alt="prev" />
  );
  const ArrowRight = (
    <img src="/images/icons/calendar/arrow-right.svg" alt="prev" />
  );

  const addToWhiteList = async () => {
    if (!isAuthenticated) {
      setLoginOpen(true);
      toast.error("You need to be logged in to add to favorite!");
      return;
    }
    const params = {
      productId: details.id,
    };
    const res = await addToFavorite(params);
    setDetails((prev: any) => {
      return { ...prev, favourite: !prev.favourite };
    });
  };

  const getRelatedProducts = async () => {
    const params = {
      pageNumber: 1,
      pageSize: 10,
      "categoryFilters[0][key]": "id",
      "categoryFilters[0][eq]": categoryId,
    };
    const res = await getProducts(params);
    setProducts(res);
  };

  const getReviews = async () => {
    const params = {
      pageSize: pageSize,
      pageNumber: 1,
    };
    const res = await getProductReview(details.id, params);
    console.log(res, "res");
    setRates(res?.counts);
    setReviews(res?.ratings);
  };

  const addToBag = async () => {
    if (!isAuthenticated) {
      return setLoginOpen(true);
    }
    setIsAdding(true);
    const params = {
      productId: slug,
      quantity: cartCount,
    };
    const res: any = await addToCart(params);
    if (res.status === 200) {
      toast.success("Successfully added to cart!");
    }
    updateCart();
    setIsAdding(false);
  };

  const changeImage = (imageName: any) => {
    document.getElementById("image")?.setAttribute("srcset", imageName);
  };

  const getDetails = async () => {
    setIsLoading(true);
    const res = await getProductDetails(slug);
    setCategoryId(res?.productCategories[0].categoryId);
    setDetails(res);
    setIsLoading(false);
  };

  const handleDeliveryTimeChange = (index: number) => {
    setSelectedDeliveryTime(index);
    if (index !== -1) {
      setDisplayDate(false);
      setDeliveryDate(new Date());
    }
  };

  const handleCountChage = (dir: string) => {
    if (dir === "plus") {
      setCartCount((prev) => prev + 1);
    } else {
      if (cartCount > 1) {
        setCartCount((prev) => prev - 1);
      }
    }
  };

  const handleCalendarChange = (action: any) => {
    if (action) {
      setDeliveryDate(new Date());
    } else {
      setDisplayDate(true);
      handleDeliveryTimeChange(-1);
    }
    handleBackdropClick();
  };

  const handleTimeChange = (e: any, index: number) => {
    setSelectedTime(index);
  };

  const handleBackdropClick = () => {
    let timer;
    if (!calendarModalRef.current) return;
    calendarModalRef.current.style.animationName = "fadeOut";
    if (!backdropRef.current) return;
    backdropRef.current.style.animationName = "showOut";
    clearTimeout(timer);
    timer = setTimeout(() => {
      setShowCalendar(false);
    }, 150);
  };

  const handleViewMore = () => {
    if (pageSize <= reviewCounts) {
      setPageSize((prev: number) => prev + 10);
    } else {
      setHasMore(false);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>, key: string) => {
    const value = event.target.value;
    setFormData((prev) => {
      return { ...prev, [key]: value };
    });
  };

  const calcTotalReviews = () => {
    const keys = Object.keys(rates);
    let total: number = 0;
    let totalRating: number = 0;
    keys.map((key) => {
      total += Number(rates[key]);
      totalRating += Number(key) * Number(rates[key]);
    });
    setTotalRatings(totalRating);
    setReviewCounts(total);
  };

  useEffect(() => {
    calcTotalReviews();
  }, [rates]);

  useEffect(() => {
    getRelatedProducts();
  }, [categoryId, selectedLanguage]);

  useEffect(() => {
    if (details.id) {
      getReviews();
    }
  }, [details, pageSize]);

  useEffect(() => {
    if (slug) {
      getDetails();
    }
  }, [slug, selectedLanguage]);

  return (
    <>
      {socialModalShow && (
        <SocialShare onClose={() => setSocialModalShow(false)} />
      )}
      {showCaldendar && (
        <div>
          <div
            className="backdrop"
            ref={backdropRef}
            onClick={handleBackdropClick}
          ></div>
          <div
            ref={calendarModalRef}
            className="position-fixed react-calendar-wrapper"
          >
            <Calendar
              onChange={(val: any) => setDeliveryDate(val)}
              value={deliveryDate}
              prevLabel={ArrowLeft}
              minDate={new Date()}
              className="calendar-details"
              nextLabel={ArrowRight}
              next2Label={null}
              prev2Label={null}
              locale="en-US"
            />
            <div className="calendar-btns gap-2 p-3 d-flex justify-content-between align-items-center">
              <button
                className="py-2 w-100 text-uppercase"
                onClick={() => handleCalendarChange("cancel")}
              >
                {t("Cancel")}
              </button>
              <button
                className="py-2 w-100 text-uppercase btn-apply"
                onClick={() => handleCalendarChange(null)}
              >
                {t("Apply")}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="product_details_main">
        <div className="container">
          <div className="row px-3">
            <div className="col-12 col-md-4 col-lg-4 p-0 row">
              <div className="col-12 col-md-4 col-lg-3">
                <div className="row flex-column">
                  {isLoading ? (
                    <>
                      {[...Array(6)].map((el, index) => (
                        <div
                          className="col-12 product-details-smallimg-main"
                          key={`product-detail-skeleton-${index}`}
                        >
                          <Skeleton height="150px" />
                        </div>
                      ))}
                    </>
                  ) : (
                    <>
                      {details.id &&
                        details.productImages.length > 0 &&
                        details.productImages.map(
                          (item: any, index: number) => {
                            return (
                              <div
                                className="col-12 product-details-smallimg-main"
                                onClick={() => changeImage(item.images)}
                                key={`product-image-${index}`}
                              >
                                <img src={item.images} alt="Not found" />
                              </div>
                            );
                          }
                        )}
                    </>
                  )}
                </div>
              </div>
              <div className="col-12 col-md-8 col-lg-9">
                <div className="product-details-bigimg-main">
                  {isLoading ? (
                    <Skeleton height="750px" />
                  ) : (
                    <img
                      src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}/${details.image}`}
                      id="image"
                      alt="Not found"
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="col-8 col-md-8 col-lg-8 p-0">
              <div className="product_details_content">
                {isLoading ? (
                  <>
                    <Skeleton height="30px" className="mb-2" />
                    <Skeleton height="17px" className="mb-2" />
                    <div className="solid-line-main mb-3" />
                    <Skeleton height="96px" className="mb-2" />
                    <Skeleton height="90px" className="mb-3" />
                    <Skeleton height="20px" width="200px" className="mb-2" />
                    <Skeleton height="69px" className="mb-3" />
                    <Skeleton height="20px" className="mb-3" />
                    <Skeleton height="25px" width="250px" className="mb-3" />
                    <Skeleton height="25px" width="150px" className="mb-3" />
                    <div className="row mb-3">
                      {[...Array(4)].map((el, index) => (
                        <div
                          className="col-lg-3 col-md-4 col-sm-6 col-6"
                          key={`skeleton-${index}`}
                        >
                          <Skeleton width="135px" height="107px" />
                        </div>
                      ))}
                    </div>
                    <Skeleton height="25px" width="150px" className="mb-3" />
                    <div className="row mb-3">
                      {[...Array(4)].map((el, index) => (
                        <div
                          className="col-lg-3 col-md-4 col-sm-6 col-6"
                          key={`skeleton-picker-${index}`}
                        >
                          <Skeleton width="135px" height="78px" />
                        </div>
                      ))}
                    </div>
                    <div className="d-flex justify-content-between">
                      <Skeleton height="40px" width="150px" />
                      <Skeleton height="40px" width="300px" />
                    </div>
                  </>
                ) : (
                  <div className="row">
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                      <div className="ps-3">
                        <h1 className="header_main d-flex gap-4 align-items-start justify-content-between">
                          <p className="date-nd-time-header-main">
                            {details.title}
                          </p>

                          <div className="action-icons d-flex justify-content-between align-items-center gap-2">
                            <div
                              className="d-flex align-items-center justify-content-center"
                              onClick={addToWhiteList}
                            >
                              {details.favourite ? (
                                <img
                                  src="/images/icons/good/discription_selected.svg"
                                  alt="heart"
                                />
                              ) : (
                                <img
                                  src="/images/icons/good/discription.svg"
                                  alt="heart"
                                />
                              )}
                            </div>
                            <div
                              className="d-flex align-items-center justify-content-center"
                              onClick={() => setSocialModalShow(true)}
                            >
                              <img
                                src="/images/icons/good/share.svg"
                                alt="share"
                              />
                            </div>
                          </div>
                        </h1>
                        <p className="subheader-main">
                          <span style={{ color: "#f92323" }}>{t('Supplier')} :</span>
                          <span> {details.supplierName}</span>
                        </p>
                        <div className="gift-details-content-main">
                          <Markup content={details.content} />
                        </div>
                        <div className="solid-line-main" />

                        {Object.keys(details?.details)?.map(
                          (key: string, index: number) => (
                            <div
                              className="d-flex justify-content-between detail-info"
                              key={`detail-value-${index}`}
                            >
                              <div className="d-block text-capitalize fw-bold my-1">
                                {key}:
                              </div>
                              <div className="d-block text-capitalize my-1">
                                {details?.details[key]}
                              </div>
                            </div>
                          )
                        )}

                        <div className="solid-line-main" />
                        <div className="gift-details-flex-main mb-2 d-flex justify-content-between">
                          <span style={{ fontWeight: 600 }}>
                           {t('Availability')}  :{" "}
                          </span>
                          <span>{details.status}</span>
                        </div>
                        <div className="gift-details-flex-main mb-2 d-flex justify-content-between">
                          <span style={{ fontWeight: 600 }}>SKU : </span>
                          <span>Balloons43560-duba</span>
                        </div>

                        <div>
                          <div className="d-block text-capitalize fw-bold my-1">
                            Gift Details
                          </div>
                          <ul>
                            {[...Array(4)].map((each) => {
                              return (
                                <li
                                  className="date-nd-time-strick-header"
                                  style={{ textDecoration: "none" }}
                                >
                                  {t('It is a long established fact that a reader  will be distracted by the readable content of  a page when looking at its layout.')}
                                  
                                 
                                 
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                    </div>
                    {/* <div className="gift-details-content-main">
                      <Markup content={details.content} />
                    </div> 
                    <div className="solid-fent-line-main" />
                    
                    <div className="product-details-price-main">
                      <div>Price</div>
                      <div>{details.sellingPrice}SAR</div>
                    </div>*/}

                    <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                      <div className="date-nd-time-select-main">
                        <div className="mb-3">
                          <span className="date-nd-time-header-main me-2">
                           {t('150SAR')} 
                          </span>
                          <span className="date-nd-time-strick-header">
                            200SAR
                          </span>
                        </div>
                        <p className="gift-details-flex-main m-0">
                          {t("Select date and time of delivery")}
                        </p>
                        <div className="delivery_date_main">
                          <p className="header_main">{t("Delivery Date")}</p>
                          <div className="row">
                            <button
                              className={`col-6 col-md-6 col-lg-2 border-0 delivery-date mb-2 mb-lg-0 pe-0 ${
                                selectedDeliveryTime === 0 ? "selected" : ""
                              }`}
                            >
                              <div
                                className="delivery_date_grey_card"
                                onClick={() => handleDeliveryTimeChange(0)}
                              >
                                {/* <p className="text-content">{t("Today")}</p> */}
                                <p className="header-content">
                                  {moment().format("D")}
                                </p>
                                {/* <p className="text-content">
                                  {t(moment().format("MMM"))}
                                </p> */}
                              </div>
                            </button>

                            <button
                              className={`col-6 col-md-6 col-lg-2 border-0 delivery-date mb-2 mb-lg-0 pe-0 ${
                                selectedDeliveryTime === 1 ? "selected" : ""
                              }`}
                            >
                              <div
                                className="delivery_date_grey_card"
                                onClick={() => handleDeliveryTimeChange(1)}
                              >
                                {/* <p className="text-content">{t("Tomorrow")}</p> */}
                                <p className="header-content">
                                  {moment().add(1, "days").format("D")}
                                </p>
                                {/* <p className="text-content">
                                  {t(moment().add(1, "days").format("MMM"))}
                                </p> */}
                              </div>
                            </button>

                            <button
                              className={`col-6 col-md-6 col-lg-2 border-0 delivery-date mb-2 mb-lg-0 pe-0 ${
                                selectedDeliveryTime === 2 ? "selected" : ""
                              }`}
                            >
                              <div
                                className="delivery_date_grey_card"
                                onClick={() => handleDeliveryTimeChange(2)}
                              >
                                {/* <p className="text-content">
                                  {t(moment().add(2, "days").format("dddd"))}
                                </p> */}
                                <p className="header-content">
                                  {moment().add(2, "days").format("D")}
                                </p>
                                {/* <p className="text-content">
                                  {t(moment().add(2, "days").format("MMM"))}
                                </p> */}
                              </div>
                            </button>

                            <button
                              className={`col-6 col-md-6 col-lg-2 border-0 delivery-date mb-2 mb-lg-0 pe-0 ${
                                selectedDeliveryTime === 3 ? "selected" : ""
                              }`}
                            >
                              <div
                                className="delivery_date_grey_card"
                                onClick={() => handleDeliveryTimeChange(3)}
                              >
                                {/* <p className="text-content">
                                  {t(moment().add(3, "days").format("dddd"))}
                                </p> */}
                                <p className="header-content">
                                  {moment().add(3, "days").format("D")}
                                </p>
                                {/* <p className="text-content">
                                  {t(moment().add(2, "days").format("MMM"))}
                                </p> */}
                              </div>
                            </button>

                            <button
                              className={`col-6 col-md-6 col-lg-2 border-0 delivery-date mb-2 mb-lg-0 pe-0 ${
                                selectedDeliveryTime === 4 ? "selected" : ""
                              }`}
                            >
                              <div
                                className="delivery_date_grey_card"
                                onClick={() => handleDeliveryTimeChange(4)}
                              >
                                {/* <p className="text-content">
                                  {t(moment().add(2, "days").format("dddd"))}
                                </p> */}
                                <p className="header-content">
                                  {moment().add(4, "days").format("D")}
                                </p>
                                {/* <p className="text-content">
                                  {t(moment().add(2, "days").format("MMM"))}
                                </p> */}
                              </div>
                            </button>

                            <button
                              className={`col-6 col-md-6 col-lg-2 border-0 delivery-date mb-2 mb-lg-0 ${
                                selectedDeliveryTime === -1 ? "selected" : ""
                              }`}
                            >
                              <div
                                className="delivery_date_grey_card"
                                onClick={() => setShowCalendar(!showCaldendar)}
                              >
                                {/* <p className="text-content">
                                  {displayDate
                                    ? t(moment(deliveryDate).format("dddd"))
                                    : t("Calender")}
                                </p> */}
                                <p className="header-content">
                                  {displayDate ? (
                                    moment(deliveryDate).format("D")
                                  ) : (
                                    <img
                                      src="/images/icons/calendar.svg"
                                      alt="calendar"
                                    />
                                  )}
                                </p>
                                {/* <p className="text-content">
                                  {displayDate
                                    ? t(moment(deliveryDate).format("MMM"))
                                    : t("Other Date")}
                                </p> */}
                              </div>
                            </button>
                          </div>

                          <div className="delivery-time-main">
                            <p className="header_main">{t("Delivery Time")}</p>
                            <div className="row date-cards">
                              {times.map((time: any, index: number) => {
                                return (
                                  <button
                                    className={`col-6 col-md-6 mb-2 mb-lg-0 col-lg-3 pe-0 ${
                                      selectedTime === index ? "selected" : ""
                                    }`}
                                    key={`time-item-${index}`}
                                  >
                                    <div
                                      className="delivery_date_grey_card"
                                      onClick={(e: any) =>
                                        handleTimeChange(e, index)
                                      }
                                    >
                                      <p className="text-content">
                                        {time.start}
                                      </p>
                                      <p className="text-content">{time.end}</p>
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          <div>
                            <p className="header_main">
                              {t("Add Printed Card")}
                            </p>
                            <div>
                              <input
                                type="text"
                                className="form-control"
                                aria-placeholder="9890740354"
                                value={formData.printedCard}
                                placeholder={t("Printed Card")!}
                                onChange={(e) =>
                                  handleChange(e, FORMDATA_KEY.PRINTED_CARD)
                                }
                              />
                              {validator.current.message(
                                "printed card",
                                formData.printedCard,
                                "required"
                              )}
                            </div>
                          </div>

                          <div className="product-quantity-main row">
                            <div className="col-6">
                              <div className="product-quantity-flex mb-3 mb-lg-0">
                                <div
                                  className="grey-symbol-btn"
                                  onClick={() => handleCountChage("minus")}
                                >
                                  <img
                                    src="/images/icons/product_details_icon/minus.svg"
                                    alt="not found"
                                  />
                                </div>
                                <div className="quantity-header">
                                  {cartCount}
                                </div>
                                <div
                                  className="grey-symbol-btn"
                                  onClick={() => handleCountChage("plus")}
                                >
                                  <img
                                    src="/images/icons/product_details_icon/add.svg"
                                    alt="not found"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <button
                                className="btn add_to_bag_btn  mb-3 mb-lg-0"
                                disabled={isAdding}
                                onClick={() => addToBag()}
                                style={{ height: "50px" }}
                              >
                                {isAdding ? (
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
                                  t("ADD TO BAG")
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <DefaultBanner />
          <div className="product_review_main mt-5">
            <p className="product_review_header">{t("OTHERS ALSO VIEWED")}</p>
            <div className="row">
              {products.length > 0 && (
                <Slider {...SliderSettings}>
                  {products.map((product: any, index: any) => {
                    return (
                      <Good
                        key={`good-item-${index}`}
                        dragging={isDragging}
                        item={product}
                      />
                    );
                  })}
                </Slider>
              )}
            </div>
          </div>
          <div className="ratings mb-3">
            <p className="heading text-uppercase">{t("Product Ratings")}</p>
            <div className="row">
              <div className="col-4 col-lg-2 col-md-3 col-sm-4 d-flex flex-column justify-content-center">
                <div className="rate d-flex align-items-center gap-2 mb-2">
                  {Number((totalRatings / reviewCounts).toFixed(1)) || 0}
                  <div className="star">
                    <img src="/images/icons/star.svg" alt="not found" />
                  </div>
                </div>
                <p className="count text-uppercase m-0">
                  {totalRatings} {t('ratings &')} {reviewCounts} <br /> {t('Reviews')} 
                </p>
              </div>
              <div className="col-8 col-lg-10 col-md-9 col-sm-8">
                {[...Array(5)].map((item, index: number) => (
                  <ProgressBar
                    key={`progress-bar-item-${index}`}
                    rate={5 - index}
                    percent={(100 / reviewCounts) * rates[`${5 - index}`] || 0}
                    count={rates[`${5 - index}`] || 0}
                    color={
                      index === 3 ? "#FF9F00" : index === 4 ? "#FF6161" : ""
                    }
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="reviews">
            {reviews.length > 0 &&
              reviews.map((review: any, index: number) => (
                <Review
                  rate={review.product_rating}
                  attachments={review["product_rating_attachments"]}
                  key={`review-item-${index}`}
                  userName={review?.name}
                  reviewContent={review?.product_rating_description}
                  reviewDate={moment(review.created_at).fromNow()}
                  upvotes={500}
                  downvotes={6}
                />
              ))}
            <div className="total-reviews d-flex align-items-center justify-content-between p-4">
              <span className="total-count text-uppercase">
                All {reviewCounts} Reviews
              </span>
              {hasMore && (
                <button
                  className="see-more-reviews d-flex align-items-center justify-content-center"
                  onClick={handleViewMore}
                >
                  <img src="/images/icons/arrow-down.svg" alt="more" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default detail;
