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
import {
  getProductDetails,
  getProducts,
  getVariantDetails,
} from "@/api/product";
import { getProductReview } from "@/api/order";
import { addToCart } from "@/api/cart";
import { Markup } from "interweave";
import { CartContext } from "@/contexts/CartContext";
import { AuthContext } from "@/contexts/AuthContext";
import { ParamContext } from "@/contexts/ParamContext";
import { addToFavorite } from "@/api/product";
import "./detail.scss";
import { Label, FormGroup } from "reactstrap";
import SimpleReactValidator from "simple-react-validator";
interface formDataProps {
  message: string;
}

const FORMDATA_KEY = {
  MESSAGE: "message",
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
  const [selectVariantDetails, setSelectVariantDetails] = useState<any>({});
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const { setLoginOpen, isAuthenticated, loginOpen } =
    useContext<any>(AuthContext);
  const { updateCart } = useContext<any>(CartContext);
  const { selectedLanguage, cityChanged } = useContext<any>(ParamContext);
  const [cartCount, setCartCount] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [variantLoading, setVariantLoading] = useState(true);
  const [deliveryDate, setDeliveryDate] = useState<Date>(new Date());
  const [displayDate, setDisplayDate] = useState<boolean>(false);
  const [showCaldendar, setShowCalendar] = useState<boolean>(false);
  const [selectedTime, setSelectedTime] = useState<number>(0);
  const [products, setProducts] = useState<any>([]);
  const [varaintProducts, setVaraintProducts] = useState<any>([]);
  const [selectedDeliveryTime, setSelectedDeliveryTime] = useState<number>(0);
  const [socialModalShow, setSocialModalShow] = useState<boolean>(false);
  const [categoryId, setCategoryId] = useState<number>(-1);
  const router = useRouter();
  const { slug }: any = router.query;
  const calendarModalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const [pageSize, setPageSize] = useState<number>(10);
  const [rates, setRates] = useState<any>({});
  const [modifiedTime, setModifiedTime] = useState<any>({
    start: "9:00 AM",
    end: "12:00 PM",
  });
  const [reviews, setReviews] = useState<any>([]);
  const [reviewCounts, setReviewCounts] = useState<number>(0);
  const [totalRatings, setTotalRatings] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [, forceUpdate] = useState<number>();
  const loginOpenRef = useRef<any>(null);
  const validator = useRef(
    new SimpleReactValidator({
      autoForceUpdate: { forceUpdate: () => forceUpdate(1) },
    })
  );
  const [formData, setFormData] = useState<formDataProps>({
    message: "",
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
      productId: details?.id,
    };
    const res: any = await addToFavorite(params);
    if (res.status === 200) {
      toast.success("added in your Wishlist");
    }
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
      country_id: localStorage.getItem("country_id"),
      state_id: localStorage.getItem("city_id"),
    };
    const res = await getProducts(params);
    setProducts(res);
  };

  const getReviews = async () => {
    const params = {
      pageSize: pageSize,
      pageNumber: 1,
    };
    const res = await getProductReview(details?.id, params);
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
      deliveryDate: deliveryDate,
      deliveryTime: `${modifiedTime.start} - ${modifiedTime.end}`,
      message: formData.message,
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

  const getSelectVariantDetails = async () => {
    setVariantLoading(true);
    const res = await getVariantDetails(slug);
    setSelectVariantDetails(res);
    setVariantLoading(false);
  };

  const handleDeliveryTimeChange = (index: number) => {
    setSelectedDeliveryTime(index);
    if (index !== -1) {
      setDisplayDate(false);
      let mdate = new Date();
      mdate.setDate(mdate.getDate() + index);
      setDeliveryDate(mdate);
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
    let mtime = e;
    setModifiedTime(mtime);
    setSelectedTime(index);
  };

  const onVariantChange = (e: ChangeEvent<HTMLInputElement>, ee: string) => {
    let selv = selectVariantDetails?.products || [];
    let variant = details?.variants || [];
    let det = details?.details || {};
    let combination = {
      [ee]: e.target.value,
    };
    variant.map((_: string) => {
      // console.log(_);
      if (ee != _) {
        if (det[_]) {
          combination[_] = det[_];
        }
      }
    });

    selv.forEach((eachselv: any) => {
      let isCombinationSame = true;
      Object.keys(combination).map((eachKey) => {
        if (!eachselv[eachKey] || eachselv[eachKey] != combination[eachKey]) {
          isCombinationSame = false;
        }
      });
      if (isCombinationSame) {
        // console.log(eachselv);
        router.push({ query: { slug: eachselv.publicId } });
        return;
      }
    });
    // console.log(combination);
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
  }, [categoryId, selectedLanguage, cityChanged]);

  useEffect(() => {
    if (details?.id) {
      getReviews();
    }
  }, [details, pageSize]);

  useEffect(() => {
    if (slug) {
      getDetails();
      getSelectVariantDetails();
    }
  }, [slug, selectedLanguage, cityChanged]);

  useEffect(() => {
    if (loginOpen) {
      if (!loginOpenRef.current) return;
      loginOpenRef.current.click();
    }
  }, [loginOpen]);

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
          <div className="row px-3 mobile-gutter-main align-items-start gap-3">
            <div className="col-12 col-md-6 col-lg-6 p-0 row">
              <div className="col-4 col-md-4 col-lg-3">
                <div className="row flex-column mobile-gutter-main">
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
                      {console.log(details)}
                      {details?.id &&
                        details?.productImages &&
                        details?.productImages?.length > 0 &&
                        details?.productImages.map(
                          (item: any, index: number) => {
                            return (
                              <div
                                className="col-12 product-details-smallimg-main"
                                onClick={() => changeImage(item.images)}
                                key={`product-image-${index}`}
                              >
                                <img src={item?.images} alt="Not found" />
                              </div>
                            );
                          }
                        )}
                    </>
                  )}
                </div>
              </div>
              <div className="col-8 col-md-8 col-lg-9">
                <div className="product-details-bigimg-main">
                  {isLoading ? (
                    <Skeleton height="750px" />
                  ) : (
                    <div>
                      <img
                        src={`${process?.env?.NEXT_PUBLIC_S3_BASE_URL}/${details?.image}`}
                        id="image"
                        alt="Not found"
                        className="bg-img"
                      />
                      <div className="action-icons">
                        <div className="action-item" onClick={addToWhiteList}>
                          {details?.favourite ? (
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
                          className="action-item"
                          onClick={() => setSocialModalShow(true)}
                        >
                          <img src="/images/icons/good/share.svg" alt="share" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="col-12">
                <div className="product_details_content">
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
                        {times?.map((time: any, index: number) => {
                          return (
                            <button
                              className={`col-6 col-md-6 mb-2 mb-lg-0 col-lg-3 ${
                                index < times.length - 1 ? "pe-0" : ""
                              } ${selectedTime === index ? "selected" : ""}`}
                              key={`time-item-${index}`}
                            >
                              <div
                                className="delivery_date_grey_card"
                                onClick={(e: any) =>
                                  handleTimeChange(time, index)
                                }
                              >
                                <p className="text-content">{time?.start}</p>
                                <p className="text-content">{time?.end}</p>
                              </div>
                            </button>
                          );
                        })}
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
                          <div className="quantity-header">{cartCount}</div>
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
                          // ref={loginOpenRef}
                          style={{ height: "50px" }}
                          // data-bs-toggle="modal"
                          // data-bs-target="#loginModal"
                          id="open_modal"
                        >
                          {isAdding ? (
                            <div style={{ height: "100%" }}>
                              <img
                                src="/images/icons/balloon-loading.gif"
                                alt="loading"
                                style={{ height: "100%", margin: "auto" }}
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
            <div className="col-12 col-md-6 col-lg-6 p-0">
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
                  <div>
                    <div className="col-12">
                      <div className="ps-3 padding-none">
                        <h1 className="header_main d-flex gap-4 align-items-start justify-content-between">
                          <p className="date-nd-time-header-main">
                            {details?.title}
                          </p>
                        </h1>
                        <p className="subheader-main">
                          <span style={{ color: "#f92323", fontWeight: "600" }}>
                            {t("Supplier")} :
                          </span>
                          <span style={{ fontWeight: "500" }}>
                            {" "}
                            {details?.supplierName}
                          </span>
                        </p>
                        <div className="gift-details-content-main">
                          <p
                            className="date-nd-time-strick-header"
                            style={{ textDecoration: "none" }}
                          >
                            {details?.description}
                          </p>
                        </div>
                        <div className="solid-line-main" />

                        <div>
                          <p className="date-nd-time-header-main">
                            {details?.sellingPrice} {t("SAR")}
                          </p>
                          <p className="mb-0 price-include-text-main">
                            {t("All Price Include Vat")}
                          </p>
                        </div>

                        <div className="solid-line-main" />
                        <div>
                          <div className="d-block text-capitalize fw-bold my-1">
                            {t("Description")}
                          </div>
                          {/* <ul>
                            {[...Array(4)].map((each) => {
                              return (
                                <li
                                  className="date-nd-time-strick-header"
                                  style={{ textDecoration: "none" }}
                                >
                                  It is a long established fact that a reader
                                  will be distracted by the readable content of
                                  a page when looking at its layout.
                                </li>
                              );
                            })}
                          </ul> */}
                          <div className="gift-details-content-main">
                            <Markup content={details?.content} />
                          </div>
                        </div>

                        <div className="solid-line-main" />

                        <div className="row dynamic-variants-main">
                          {details?.variants &&
                            details?.variants.length > 0 &&
                            details?.variants.map((ee: any) => (
                              <FormGroup className="col-3">
                                <div>
                                  <Label
                                    className="variant-select-lable"
                                    for={ee}
                                  >
                                    {ee}
                                  </Label>
                                </div>
                                <select
                                  className="select variant-select-main"
                                  id={ee}
                                  name={ee}
                                  value={details?.details[ee]}
                                  onChange={(e: any) => onVariantChange(e, ee)}
                                >
                                  {selectVariantDetails &&
                                    selectVariantDetails?.variants &&
                                    selectVariantDetails?.variants[ee]?.length >
                                      0 &&
                                    selectVariantDetails?.variants[ee].map(
                                      (item: string) => (
                                        <option key={item} value={item}>
                                          {item}
                                        </option>
                                      )
                                    )}
                                </select>
                              </FormGroup>
                            ))}
                        </div>

                        <div className="solid-line-main" />

                        <div className="payment-with-main">
                          <div className="d-flex align-items-center justify-content-between flex-wrap px-3 pt-3">
                            <p className="mb-0 payment-with-header-main">
                              {t("Payment With")}
                            </p>
                            <div className="d-flex gap-2">
                              <div className="payment-option-main">
                                <img
                                  src="/images/icons/visa-credit-card.svg"
                                  alt="visa card"
                                />
                              </div>
                              <div className="payment-option-main">
                                <img
                                  src="/images/icons/stc-pay.svg"
                                  alt="master card"
                                />
                              </div>
                              <div className="payment-option-main">
                                <img
                                  src="/images/icons/mada-pay.svg"
                                  alt="paypal"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="solid-line-main" />
                          <div className="row px-3">
                            <div className="m-0 col-12 col-sm-12 col-md-8 col-lg-8">
                              <p className="m-0 payment-with-grey-content">
                                {t("Split in up to 4 Payments with tamara")}
                              </p>
                              <p
                                className="m-0 payment-with-grey-content"
                                style={{
                                  textDecoration: "underline",
                                  cursor: "pointer",
                                }}
                              >
                                {t("Learn More")}
                              </p>
                            </div>
                            <p className="m-0 col-12 col-sm-12 col-md-4 col-lg-4 payment-with-black-content text-right-main">
                              {t("Tamara")}
                            </p>
                          </div>
                          <div className="solid-line-main" />
                          <div className="row pb-3 px-3">
                            <div className="m-0 col-12 col-sm-12 col-md-8 col-lg-8">
                              <p className="m-0 payment-with-grey-content">
                                {t("Or 4 interest-free payments of SAR 96.25")}
                              </p>
                              <p
                                className="m-0 payment-with-grey-content"
                                style={{
                                  textDecoration: "underline",
                                  cursor: "pointer",
                                }}
                              >
                                {t("Learn More")}
                              </p>
                            </div>
                            <div className="m-0 col-12 col-sm-12 col-md-4 col-lg-4 text-right-main">
                              <div className="tabby-btn-main">
                                <p className="payment-with-black-content mb-0">
                                  {t("tabby")}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="delivery_date_main">
                          <div>
                            <p className="custom-message-main">
                              {t("Add Custom Message")}
                            </p>
                            <div>
                              <input
                                type="text"
                                className="form-control"
                                name="message"
                                id="message"
                                value={formData?.message}
                                placeholder={t("Custom your quotes")!}
                                onChange={(e) =>
                                  handleChange(e, FORMDATA_KEY.MESSAGE)
                                }
                              />
                              {validator?.current?.message(
                                "message",
                                formData?.message,
                                "required"
                              )}
                            </div>
                          </div>

                          {details?.terms && (
                            <div className="solid-line-main">
                              <div className="solid-line-main" />
                              <div className="d-block text-capitalize fw-bold my-1">
                                {t("Terms And Conditions")}
                              </div>
                              <div className="gift-details-content-main">
                                <Markup content={details?.terms} />
                              </div>
                            </div>
                          )}

                          <div className="my-3">
                            <div className="d-block text-capitalize fw-bold">
                              {t("Available Offers")}
                            </div>
                            <div className="available-offers-main">
                              {[...Array(2)].map((each) => {
                                return (
                                  <div className="row mt-1">
                                    <div className="col-1">
                                      <div className="available-offers-image-main">
                                        <img
                                          src="/images/icons/calendar/tag-right.svg"
                                          alt="not found"
                                        />
                                      </div>
                                    </div>
                                    <div className="col-11">
                                      <p className="mb-1">
                                        <span className="bank-details-text-main">
                                          {t("Bank Offer")}{" "}
                                        </span>
                                        <span className="available-grey-text-main">
                                          {t(
                                            "10% off on HDFC Bank Credit Card EMI  Transactions, up to ₹1,500 on orders of ₹7,500 and above"
                                          )}{" "}
                                        </span>
                                        <span className="tandc-text-main">
                                          {t("T&C")}
                                        </span>
                                      </p>
                                    </div>
                                  </div>
                                );
                              })}
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
                  {products &&
                    products.length > 0 &&
                    products?.map((product: any, index: any) => {
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
                  {totalRatings} ratings & {reviewCounts} <br /> Reviews
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
