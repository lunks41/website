import { useEffect, useState, useContext, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import Skeleton from "react-loading-skeleton";
import { toast } from "react-toastify";

import { ParamContext } from "@/contexts/ParamContext";
import { AuthContext } from "@/contexts/AuthContext";

import { uploadFiles, getProductDetails } from "@/api/product";
import { submitOrderReview } from "@/api/order";
import { getOrderDetails } from "@/api/order";

import "./index.scss";
import moment from "moment";

const ORDER_TYPES = {
  photoshoot: "photoshoot",
  catering: "catering",
  product: "product",
};

export default function AddReview() {
  const { isAuthenticated } = useContext<any>(AuthContext);
  const { selectedLanguage } = useContext<any>(ParamContext);
  const [rates, setRates] = useState<number>(-1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [review, setReview] = useState<string>("");
  const [details, setDetails] = useState<any>({});
  const [attachments, setAttachments] = useState<any>([]);
  const [orderType, setOrderType] = useState<string>("");
  const router = useRouter();
  const { slug }: any = router.query;
  const [itemIndex, setItemIndex] = useState<number>(-1);
  const videoFileBtnRef: any = useRef();
  const imageFileBtnRef: any = useRef();
  const { updateTransparentHeader } = useContext<any>(ParamContext);

  let formData: any;

  if (process.browser) {
    formData = new FormData();
  }

  const getDetails = async () => {
    const res = await getOrderDetails(slug[0], {});
    setDetails(res);
    setOrderType(res?.type);
    setIsLoading(false);
  };

  const handleClick = (index: number) => {
    setRates(index);
  };

  const handleChange = (e: any) => {
    const value = e.target.value;
    setReview(value);
  };

  const goBack = (e: Event) => {
    e.preventDefault();
    router.back();
  };

  useEffect(() => {
    if (slug) {
      if (slug[0]) {
        getDetails();
      }
      if (slug[1]) {
        setItemIndex(Number(slug[1]) - 1);
      }
    }
  }, [slug, selectedLanguage]);

  useEffect(() => {
    updateTransparentHeader(false);
  }, []);

  const checkFormValidation = () => {
    if (!isAuthenticated) {
      toast.warn("Please login to submit a review");
      return false;
    }
    if (rates === -1) {
      toast.error("Please select rating!");
      return false;
    }
    if (!review) {
      toast.error("Please insert message!");
      return false;
    }
    return true;
  };

  const arrangeAttachments = async () => {
    let responses: any = [];
    let imageURLs: any = [];
    let videoURLs: any = [];
    for (let i = 0; i < attachments.length; i++) {
      const response: any = await uploadFiles(attachments[i]);
      if (attachments[i].type.includes("image")) {
        imageURLs.push(response.headers["file-name"]);
      } else if (attachments[i].type.includes("video")) {
        videoURLs.push(response.headers["file-name"]);
      }
      responses.push(response);
    }
    return { responses, imageURLs, videoURLs };
  };

  const submitReview = async () => {
    if (!checkFormValidation()) {
      return;
    }

    setIsSubmitting(true);
    const { responses, imageURLs, videoURLs }: any = await arrangeAttachments();

    let flag: boolean = true;
    if (responses.length > 0) {
      responses.map((item: any, index: number) => {
        if (item.status !== 201) {
          flag = false;
          return toast.error(
            `Whoops! Something went wrong while uploading file at index ${index}!`
          );
        }
      });
    }

    if (!flag) return null;

    const params: any = {
      productRatingDescription: review,
      productRating: rates + 1,
      status: "active",
      orderId: details?.id,
      type: details?.type,
      ratingImages: imageURLs,
      ratingVideos: videoURLs,
    };
    const res: any = await handleSubmitRequest(params, orderType);
    setIsSubmitting(false);
    checkSumitted(res);
  };

  const checkSumitted = (res: any) => {
    if (res?.status === 201 || res?.status === 200) {
      toast.success("Submitted successfully!");
      router.push(`/order-detail/${details.publicId}`);
    } else {
      toast.error("Whoops! Something went wrong!");
    }
  };

  const handleSubmitRequest = async (params: any, type: string) => {
    let res: any = {};
    switch (type) {
      case ORDER_TYPES.product:
        params.productId = details?.orderProducts[itemIndex]?.productId * 1;
        break;
      case ORDER_TYPES.catering:
        params.productId = details?.orderRestaurants[itemIndex]?.productId * 1;
        break;
      case ORDER_TYPES.photoshoot:
        params.productId = details?.orderPhotoshoots[itemIndex]?.productId * 1;
        break;
      default:
        break;
    }
    res = await submitOrderReview(params);
    return res;
  };

  const handleFileChange = (e: any, type: string) => {
    const files = e.target.files;
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        if (type === "image" && !files[i].type.includes("image")) {
          toast.error("Please select an valid image!");
          return false;
        } else if (type === "video" && !files[i].type.includes("video")) {
          toast.error("Please select a valid video!");
          return false;
        }
      }
      setAttachments((prev: any) => [...prev, ...files]);
    }
  };

  const handleRemoveAttachments = (index: number) => {
    setAttachments((prev: any) => {
      return [...prev.slice(0, index), ...prev.slice(index + 1)];
    });
  };

  useEffect(() => {
    console.log("attachments", attachments);
  }, [attachments]);

  const handleUploadBtnClick = (type: string) => {
    if (type === "image") {
      imageFileBtnRef.current.click();
      return;
    }
    videoFileBtnRef.current.click();
  };

  return (
    <div className="page-add-review">
      <div className="container">
        <div className="heading d-flex justify-content-between align-items-center">
          <h3 className="heading-text m-0">Add Reviews</h3>
          <Link
            className="text-decoration-none"
            href="#"
            onClick={(e: any) => goBack(e)}
          >
            <img src="/images/icons/CommonIcon/CloseIcon.svg" />
          </Link>
        </div>
        <hr />
        {isLoading ? (
          <>
            <Skeleton
              height="168px"
              className="mb-2"
              style={{
                borderRadius: "16px",
              }}
            />
            <Skeleton
              height="150px"
              className="mb-2"
              style={{
                borderRadius: "16px",
              }}
            />
            <Skeleton
              height="260px"
              style={{
                borderRadius: "16px",
                marginBottom: "48px",
              }}
            />
          </>
        ) : (
          <>
            <div className="row product-card mb-2">
              <div className="text-decoration-none col-12 col-lg-6 col-md-6 d-flex align-items-center gap-4 mb-4 mb-lg-0 mb-md-0 p-0 overflow-y-auto">
                {orderType === ORDER_TYPES.product &&
                  details?.orderProducts &&
                  details?.orderProducts.length > 0 && (
                    <Link
                      href={`/new-product/${details?.orderProducts[itemIndex]?.productPublicId}`}
                    >
                      <img
                        src={details?.orderProducts[itemIndex]?.images}
                        className="product-img"
                        alt="product"
                      />
                    </Link>
                  )}

                {orderType === ORDER_TYPES.photoshoot &&
                  details?.orderPhotoshoots &&
                  details?.orderPhotoshoots.length > 0 && (
                    <>
                      {details?.orderPhotoshoots[itemIndex].photoshootImages &&
                        details?.orderPhotoshoots[itemIndex].photoshootImages
                          .length > 0 &&
                        details?.orderPhotoshoots[
                          itemIndex
                        ].photoshootImages.map((photo: any, i: number) => (
                          <img
                            src={`${photo.images}`}
                            key={`photo-${i}`}
                            className="product-img"
                            alt="product"
                          />
                        ))}
                    </>
                  )}

                {orderType === ORDER_TYPES.catering &&
                  details?.orderRestaurants &&
                  details?.orderRestaurants.length > 0 && (
                    <>
                      {details?.orderRestaurants[itemIndex]?.restaurantImages &&
                        details?.orderRestaurants[itemIndex].restaurantImages
                          .length > 0 &&
                        details?.orderRestaurants[
                          itemIndex
                        ].restaurantImages.map((photo: any, i: number) => (
                          <img
                            src={`${photo.images}`}
                            key={`restaurant-${i}`}
                            className="product-img"
                            alt="product"
                          />
                        ))}
                    </>
                  )}
              </div>
              <div className="col-12 col-lg-6 col-md-6 order-info d-flex flex-column gap-1 align-items-start align-items-lg-end align-items-md-end justify-content-center">
                <div className="order-number">Order {details?.id}</div>
                <div className="delivery-date">
                  Ordered on{" "}
                  {moment(details?.createdAt).format("dddd DD, MMM YYYY")}
                </div>
              </div>
            </div>

            <div className="row add-attachments align-items-center mb-2">
              <div className="col-12 attachments col-lg-9 col-md-8 mb-3 mb-lg-0 mb-md-0">
                {attachments.length > 0 ? (
                  <div className="d-flex align-items-center gap-3 overflow-auto p-2">
                    {attachments.length > 0 &&
                      [...Array(attachments.length)].map(
                        (el, index: number) => (
                          <div
                            key={`selected-attachments-${index}`}
                            className="position-relative"
                          >
                            {attachments[index].type.includes("image") && (
                              <img
                                alt="not found"
                                key={`selected-image-${index}`}
                                width={"120px"}
                                height={"120px"}
                                src={URL.createObjectURL(attachments[index])}
                              />
                            )}
                            {attachments[index].type.includes("video") && (
                              <video
                                width="120"
                                height="120"
                                controls
                                autoPlay={true}
                                key={`selected-video-${index}`}
                              >
                                <source
                                  src={URL.createObjectURL(attachments[index])}
                                  type={attachments[index].type}
                                />
                                Your browser does not support the video tag.
                              </video>
                            )}
                            <button
                              className="position-absolute btn-fresh btn-delete"
                              onClick={() => handleRemoveAttachments(index)}
                            >
                              x
                            </button>
                          </div>
                        )
                      )}
                  </div>
                ) : (
                  <div className="add-text">
                    <h4 className="mb-1">Add Photo or Video</h4>
                    <p className="m-0">
                      Upload photos/ videos related to the product like
                      Unboxing, Installation, Product usage, etc.
                    </p>
                  </div>
                )}
              </div>
              <div className="col-12 col-lg-3 col-md-4 d-flex gap-3">
                <button
                  className="btn-add px-2 d-flex align-items-center gap-1"
                  onClick={() => handleUploadBtnClick("image")}
                >
                  <img src="/images/icons/photo.svg" alt="not found" />
                  <span>Add photo</span>
                </button>
                <input
                  type="file"
                  className="d-none"
                  ref={imageFileBtnRef}
                  multiple={true}
                  onChange={(e: any) => handleFileChange(e, "image")}
                  accept="image/*"
                />
                <input
                  type="file"
                  className="d-none"
                  ref={videoFileBtnRef}
                  multiple={true}
                  onChange={(e: any) => handleFileChange(e, "video")}
                  accept="video/*"
                />
                <button
                  className="btn-add px-2 d-flex align-items-center gap-1"
                  onClick={() => handleUploadBtnClick("video")}
                >
                  <img src="/images/icons/video.svg" alt="not found" />
                  <span>Add video</span>
                </button>
              </div>
            </div>

            <div className="review-form">
              <h4 className="mb-3">Write your review</h4>
              <div className="give-rate mb-2 d-flex mb-3">
                {[...Array(5)].map((item, index: number) => (
                  <button
                    key={`rate-button-${index}`}
                    className="btn-rate p-0 pe-3"
                    onClick={() => handleClick(index)}
                  >
                    {rates >= index ? (
                      <img src="/images/icons/star.svg" alt="star" />
                    ) : (
                      <img src="/images/icons/star-grey.svg" alt="star" />
                    )}
                  </button>
                ))}
              </div>
              <textarea
                placeholder="Message Here"
                className="w-100"
                onChange={(e: any) => handleChange(e)}
                value={review}
              ></textarea>
            </div>
          </>
        )}
        <div className="submit-review text-center">
          <button
            className="btn-submit text-uppercase"
            onClick={submitReview}
            disabled={isSubmitting}
            style={{ height: "50px" }}
          >
            {isSubmitting ? (
              <div style={{ height: "100%" }}>
                <img
                  src="/images/icons/balloon-loading.gif"
                  alt="loading"
                  style={{ height: "100%", margin: "auto" }}
                />
              </div>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
