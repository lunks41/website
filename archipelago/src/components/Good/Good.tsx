import Link from "next/link";
import React, { useState, useContext, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { addToFavorite } from "@/api/product";
import { AuthContext } from "@/contexts/AuthContext";
import { useTranslation } from "react-i18next";
import "./Good.scss";
import { addToCart } from "@/api/cart";
import { CartContext } from "@/contexts/CartContext";
import { getProducts } from "@/api/product";

const Good = ({ item, hideFavorite }: any) => {
  const [product, setProduct] = useState<any>({});
  const router = useRouter();
  const [isDragging, setIsDragging] = useState(false);
  const { isAuthenticated, setLoginOpen } = useContext<any>(AuthContext);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [isVariantLoading, setIsVariantLoading] = useState<boolean>(false);
  const { t } = useTranslation();
  const { updateCart } = useContext<any>(CartContext);
  const [similarProducts, setSimilarProducts] = useState<any>({});
  const interval = useRef<any>(null);
  const deBounce = (callback: any, time: number) => {
    let milseconds = time ? time : 500;
    clearInterval(interval.current);
    interval.current = setTimeout(() => {
      callback();
    }, milseconds);
  };
  const lang = localStorage.getItem("lang");

  const addToWhiteList = async (e: React.MouseEvent, id: any) => {
    if (!isAuthenticated) {
      setLoginOpen(true);
      toast.error("You need to be logged in to add to favorite!");
      return;
    }
    const params = {
      productId: id,
    };
    setProduct((prev: any) => {
      return { ...prev, favourite: !prev.favourite };
    });
    const res = await addToFavorite(params);
  };

  const handleMoveUp = (e: React.MouseEvent) => {
    if (!isDragging) {
      router.push(`/new-product/${product.publicId}`);
    }
  };

  useEffect(() => {
    if (item?.id) {
      setProduct(item);
    }
  }, [item]);

  const addToBag = async (publicId: string) => {
    if (!isAuthenticated) {
      return setLoginOpen(true);
    }
    setIsAdding(true);
    const params = {
      productId: publicId,
      quantity: 1,
    };
    const res: any = await addToCart(params);
    if (res.status === 200) {
      toast.success("Successfully added to cart!");
    }
    updateCart();
    setIsAdding(false);
  };

  const getVariantsByProduct = async (groupId: string, publicId: string) => {
    setIsVariantLoading(true);

    try {
      const params = {
        country_id: localStorage.getItem("country_id"),
        state_id: localStorage.getItem("city_id"),
        "filters[0][key]": "groupId",
        "filters[0][eq]": groupId,
        "filters[1][key]": "publicId",
        "filters[1][neq]": publicId,
      };

      const res = await getProducts(params);
      console.log(res);

      if (res && res.length > 0) {
        setSimilarProducts({ ...similarProducts, [publicId]: res });
      } else {
        setIsVariantLoading(false);
      }
    } catch (error) {
      console.error("Error fetching variants:", error);
    } finally {
      setIsVariantLoading(false);
    }
  };

  return (
    <div className="flip-card">
      <div
        className="text-decoration-none container-outer flip-card-inner"
        onMouseDown={() => setIsDragging(false)}
        onMouseMove={() => setIsDragging(true)}
      >
        <div
          className="text-decoration-none px-2 flip-card-front"
          onMouseUp={handleMoveUp}
        >
          <div className="img-box" style={{ height: "100%" }}>
            <img
              className="good-image"
              src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}/${product.image}`}
              alt="good"
            />
          </div>

          <div className="d-flex justify-content-between mt-2 align-items-center">
            <div>
              <p className="review_content_header text-truncate">
                {product.title}
              </p>
              <p className="m-0">
                {product.sellingPrice === product.costPrice ? (
                  <span className="review_content_price">
                    {product.sellingPrice} {t("SAR")}
                  </span>
                ) : (
                  <React.Fragment>
                    <span className="review_content_price">
                      {product.sellingPrice} {t("SAR")}
                    </span>
                    <span className="review_content_oldprice">
                      {product.costPrice} {t("SAR")}
                    </span>
                  </React.Fragment>
                )}
              </p>
            </div>
            <div>
              <div className="d-flex justify-content-end align-items-center">
                <span className="mx-1">
                  <img src="/images/slider/star.svg" alt="star" />
                </span>
                <span className="review_rating_main">
                  {product.productRating}
                </span>
              </div>
              {/* <span className="review_rating_main">{product.status}</span> */}
            </div>
          </div>
        </div>
        <div
          className="flip-card-back"
          onMouseEnter={() => {
            deBounce(
              () => getVariantsByProduct(product?.groupId, product?.publicId),
              200
            );
          }}
        >
          <div className="detail-item">
            <div
              onClick={handleMoveUp}
              className={`flip-card-details-main ${
                lang == "ar" && "ps-2 pe-0"
              }`}
            >
              {console.log(lang)}
              <div>
                <h1
                  className={`text-capitalize flip-card-header-main ${
                    lang == "ar" ? "text-end" : ""
                  }`}
                >
                  {product?.title || "Occasion"}
                </h1>
                <p className="text-capitalize flip-card-text-main">
                  {product?.description}
                </p>
              </div>
              {product.details && (
                <div>
                  {Object.keys(product.details).length > 0 &&
                    Object.keys(product.details).map((eachKey) => {
                      if (
                        !(
                          eachKey === "productType" ||
                          eachKey === "producttype" ||
                          eachKey === "product type" ||
                          eachKey === "product Type" ||
                          eachKey === "ProductType" ||
                          eachKey === "Producttype" ||
                          eachKey === "Product Type" ||
                          eachKey === "Product type"
                        )
                      ) {
                        return (
                          <div
                            className="flip-card-flex-main"
                            style={{ textTransform: "capitalize" }}
                          >
                            <p
                              className={`flip-card-left-flex ${
                                lang == "ar" ? "text-end" : ""
                              }`}
                            >
                              {eachKey}
                            </p>
                            <p
                              className={`flip-card-right-flex ${
                                lang == "ar" ? "text-left" : ""
                              }`}
                            >
                              {product?.details[eachKey] || "Rubber"}
                            </p>
                          </div>
                        );
                      }
                    })}
                </div>
              )}
            </div>
            <div className="solid-line-main" />
            {isVariantLoading ? (
              <div style={{ height: "100px" }}>
                <img
                  src="/images/icons/balloon-loading.gif"
                  alt="loading"
                  style={{ height: "100%", margin: "auto" }}
                />
              </div>
            ) : (
              <div>
                {similarProducts[product?.publicId] &&
                  similarProducts[product?.publicId].length > 0 && (
                    <div>
                      <h1 className="text-capitalize flip-card-header-main">
                        {t("View Similar Products")}
                      </h1>
                      <div className="row">
                        {similarProducts[product?.publicId]
                          .slice(0, 4)
                          .map((_: any) => (
                            <div
                              className="col-3"
                              onClick={() =>
                                router.push(`/new-product/${_.publicId}`)
                              }
                            >
                              <div style={{ width: "100%", cursor: "pointer" }}>
                                <img
                                  src={
                                    _?.productImages &&
                                    _?.productImages.length > 0
                                      ? _?.productImages[0]?.images
                                      : "/images/icons/flip-three.svg"
                                  }
                                  alt="not found"
                                  style={{ width: "100%" }}
                                  loading="lazy"
                                />
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
              </div>
            )}
          </div>

          <div className="flip-card-btn-main">
            <div className="d-flex justify-content-between align-items-center">
              {!hideFavorite && (
                <div
                  className="whitelist-icon d-flex align-items-center justify-content-center"
                  onClick={(e: any) => addToWhiteList(e, product.id)}
                >
                  {product.favourite ? (
                    <img src="/images/icons/good/selected.svg" alt="heart" />
                  ) : (
                    <img src="/images/icons/good/heart.svg" alt="heart" />
                  )}
                </div>
              )}
              <div
                className="buy-now-btn-main"
                style={{ border: "1px solid #0fff" }}
              >
                <Link href={`/new-product/${product.publicId}`}>
                  {t("Buy Now")}
                </Link>
              </div>
              <button
                className="btn buy-now-btn-main mb-3 mb-lg-0"
                disabled={isAdding}
                onClick={() => addToBag(product.publicId)}
                style={{ background: "#000", height: "40px", width: "110px" }}
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
                  t("Add To Bag")
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Good;
