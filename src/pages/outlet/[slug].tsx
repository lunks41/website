import { useState, useEffect, useContext, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { Carousel } from "react-bootstrap";
import ProgressBar from "@/components/ProgressBar/ProgressBar";
import Review from "@/components/Review/Review";
import {
  getRestaurantDetail,
  getRestaurantList,
  getOtherList,
} from "@/api/catering";
import { getCateringReview } from "@/api/order";

import CateringSliderItem from "@/components/CateringSliderItem/CateringSliderItem";
import MenuItem from "@/components/MenuItem/MenuItem";
import SelectBtn from "@/components/SelectBtn/SelectBtn";

import { ParamContext } from "@/contexts/ParamContext";
import { AuthContext } from "@/contexts/AuthContext";
import { CartContext } from "@/contexts/CartContext";

import "./outlet.scss";
import restaurant from "../restaurant";

export default function Outlet() {
  const { t } = useTranslation();
  const router = useRouter();
  const { slug } = router.query;
  const { setPageName, selectedLanguage, cityChanged } =
    useContext<any>(ParamContext);
  const { isAuthenticated, setLoginOpen } = useContext<any>(AuthContext);
  const { setCateringDetails, cateringDetails } = useContext<any>(CartContext);
  const [selectedOption, setSelectedOption] = useState<number>(0);
  const [restaurants, setRestaurants] = useState<any>([]);
  const [otherRestaurants, setOtherRestaurants] = useState<any>([]);
  const [details, setDetails] = useState<any>({});
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [rates, setRates] = useState<any>({});
  const [reviews, setReviews] = useState<any>([]);
  const [reviewCounts, setReviewCounts] = useState<number>(0);
  const [totalRatings, setTotalRatings] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const lastContainerRef = useRef<HTMLDivElement>(null);
  const lastShifContainerRef = useRef<HTMLDivElement>(null);

  const handleOptionChange = (option: number) => {
    if (option === 0) {
      setTimeout(() => {
        if (lastContainerRef.current) {
          lastContainerRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, 200);
    }
    if (option === 1) {
      setTimeout(() => {
        if (lastShifContainerRef.current) {
          lastShifContainerRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, 200);
    }
    setSelectedOption(option);
  };

  const getDetails = async () => {
    const res = await getRestaurantDetail(slug, {});
    setDetails(res);
  };

  const getReviews = async () => {
    const params = {
      pageSize: pageSize,
      pageNumber: 1,
    };
    const res = await getCateringReview(details.id, params);
    setRates(res?.counts);
    setReviews(res?.ratings);
  };

  const getRestaurants = async () => {
    const params: any = {
      categoryFilter: JSON.stringify(details.category),
      pageNumber: 1,
      pageSize: 10,
      country_id: localStorage.getItem("country_id"),
      state_id: localStorage.getItem("city_id"),
    };
    const res = await getRestaurantList(params);
    setRestaurants(res);
  };

  const getOtherRestaurants = async () => {
    const params: any = {
      pageNumber: 1,
      pageSize: 10,
      country_id: localStorage.getItem("country_id"),
      state_id: localStorage.getItem("city_id"),
    };
    params.supplierId = details.supplierId;
    params.restaurantId = details.publicId;
    const res = await getOtherList(params);
    setOtherRestaurants(res);
  };

  const handleSelectChange = (e: any) => {
    setSelectedIndex(e.target.value);
    setCateringDetails({
      ...cateringDetails,
      menuIndex: e.target.value,
    });
  };

  const handleSendRequest = () => {
    if (!isAuthenticated) {
      toast.error("You need to be logged in to send request!");
      setLoginOpen(true);
      return;
    }
    setCateringDetails({
      serviceId: details?.services,
      restaurantId: details?.id,
      supplierId: details?.supplierId,
      menuIndex: cateringDetails?.menuIndex || 0,
      packageIndex: cateringDetails?.selectedPackages || 0,
      supplierName: "Anonymous",
      lat: details?.lat,
      lang: details?.lang,
      status: "active",
      bookingTime: "10:20",
      categoryId: details?.category,
      members: cateringDetails?.members,
    });
    router.push("/enter-details");
  };

  const handleViewMore = () => {
    if (pageSize <= reviewCounts) {
      setPageSize((prev: number) => prev + 10);
    } else {
      setHasMore(false);
    }
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
    if (details.supplierId) {
      getOtherRestaurants();
    }
  }, [details, selectedLanguage, cityChanged]);

  useEffect(() => {
    if (details.category) {
      getRestaurants();
    }
  }, [details, selectedLanguage, cityChanged]);

  useEffect(() => {
    if (details?.id) {
      getReviews();
    }
  }, [slug, selectedLanguage, pageSize, details, cityChanged]);

  useEffect(() => {
    if (slug) {
      getDetails();
    }
  }, [slug, selectedLanguage, pageSize, cityChanged]);

  useEffect(() => {
    setPageName("catering");
    return () => {
      setPageName("");
    };
  }, []);

  const handleMenuButtonClick = () => {
    // Scroll to the last container
  };
  const handleGalleryButtonClick = () => {
    // Scroll to the last container
  };
  return (
    <div className="restaurant-container mt-4">
      <div className="restaurant-pic text-center d-flex justify-content-center">
        <img
          src={`${
            details.restaurantImages && details.restaurantImages.length > 0
              ? details.restaurantImages[0].images
              : "/images/catering/bg-main.svg"
          }`}
          className="w-100 big-background"
          alt="not found"
        />

        <div className="restaurant-info-text d-flex flex-column position-absolute">
          {details.name && (
            <h3 className="restaurant-name mb-2">{details?.name}</h3>
          )}
          {details.location && (
            <div className="restaurant-location text-capitalize">
              {t("Location")} : <span>{details?.location}</span>
            </div>
          )}
          <div className="btn-change-options d-flex justify-content-center">
            <button
              className={`${selectedOption === 0 ? "btn-selected" : ""}`}
              onClick={() => {
                handleOptionChange(0);
              }}
            >
              {t("Menu")}
            </button>
            <button
              className={`${selectedOption === 1 ? "btn-selected" : ""}`}
              onClick={() => {
                handleOptionChange(1);
              }}
            >
              {t("Gallery")}
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        <h1 className="outlet-heading mb-2">
          {t("Check Our Outlets & Menu")}{" "}
        </h1>
        <p className="outlet-desc">{details?.description}</p>
        <div className="row">
          <div className="col-12 col-lg-3 col-md-3 col-sm-4">
            {otherRestaurants &&
              otherRestaurants.map((image: any, index: number) => (
                <CateringSliderItem
                  key={`catering-item-${index}`}
                  item={image}
                />
              ))}
          </div>
          <div className="col-12 col-lg-9 col-md-9 col-sm-8 d-flex flex-column  menu-container">
            <div
              className="dish-container"
              style={{ display: selectedOption === 0 ? "block" : "none" }}
            >
              <h5 className="our-menu mb-3" ref={lastContainerRef}>
                {t("OUR MENU")}
              </h5>

              <select
                value={selectedIndex}
                className="form-select form-select-lg mb-3"
                onChange={(e: any) => handleSelectChange(e)}
              >
                {details.menu &&
                  details.menu.length > 0 &&
                  details.menu.map((item: any, index: number) => (
                    <option value={index}>{item.name}</option>
                  ))}
              </select>

              {details.menu && (
                <MenuItem
                  name={details?.menu[selectedIndex]?.name}
                  categories={details?.menu[selectedIndex]?.categories}
                />
              )}
            </div>
            {/* //carousel div started */}
            <div
              className="dish-container-2"
              style={{ display: selectedOption === 1 ? "block" : "none" }}
              ref={lastShifContainerRef}
            >
              <div
                id="carouselExampleIndicators"
                className="carousel slide"
                data-ride="carousel"
              >
                <ol className="carousel-indicators">
                  <li
                    data-target="#carouselExampleIndicators"
                    data-slide-to="0"
                    className="active"
                  ></li>
                  <li
                    data-target="#carouselExampleIndicators"
                    data-slide-to="1"
                  ></li>
                  <li
                    data-target="#carouselExampleIndicators"
                    data-slide-to="2"
                  ></li>
                </ol>
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img
                      src={`${
                        details.restaurantImages &&
                        details.restaurantImages.length > 0
                          ? details.restaurantImages[0].images
                          : "/images/catering/bg-main.svg"
                      }`}
                      className="w-100 big-background"
                      alt="not found"
                    />
                  </div>
                </div>
                <a
                  className="carousel-control-prev"
                  href="#carouselExampleIndicators"
                  role="button"
                  data-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Previous</span>
                </a>
                <a
                  className="carousel-control-next"
                  href="#carouselExampleIndicators"
                  role="button"
                  data-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Next</span>
                </a>
              </div>
            </div>
            {/* //carousel div ended */}
            <div className="mt-5 package-container">
              {details.menu &&
                details.menu[selectedIndex].packages.length > 0 && (
                  <h6 className="package-heading mb-4">{t("OUR PACKAGES")}</h6>
                )}
              <div className="d-flex select-btns-container flex-wrap gap-2">
                {details.menu &&
                  details.menu[selectedIndex].packages.length > 0 &&
                  details.menu[selectedIndex].packages.map(
                    (item: any, index: number) => (
                      <>
                        {item?.members != "1" && (
                          <SelectBtn
                            key={`select-btn-${index}`}
                            index={index}
                            members={item?.members}
                            price={item?.price}
                          />
                        )}
                      </>
                    )
                  )}
              </div>

              <div className="d-flex gap-4 package-option-btns pb-2">
                <button
                  className="text-decoration-none text-center"
                  onClick={handleSendRequest}
                >
                  {t("SEND REQUEST")}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="restaurant-item-container row">
          <h1>{t("OTHERS ALSO VIEWED")}</h1>
          {restaurants.length > 0 &&
            restaurants.map((item: any, index: number) => (
              <CateringSliderItem
                item={item}
                cols={3}
                key={`restaurant-item-${index}`}
              />
            ))}
        </div>

        {totalRatings ? (
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
        ) : (
          ""
        )}

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
  );
}
