import React, { useEffect, useContext, useState } from "react";
import Link from "next/link";
import moment from "moment";
import MenuItem from "../MenuItem/MenuItem";
import { Button, Table } from "reactstrap";
import "./Order.scss";
import { getOrderDetails } from "@/api/order";
import { useRouter } from "next/router";
import { ParamContext } from "@/contexts/ParamContext";
import { useTranslation } from "react-i18next";
import { addToCart } from "@/api/cart";

export default function Order({
  order,
  reivewAddable,
  marginBottom,
  isDetailPage,
}: any) {
  const { selectedLanguage } = useContext<any>(ParamContext);
  const router = useRouter();
  const { t } = useTranslation();
  const { slug }: any = router.query;
  const [details, setDetails] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [itemIndex, setItemIndex] = useState<number>(-1);
  const [orderStatus, setOrderStatus] = useState<string>("");
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [cartCount, setCartCount] = useState(1);

  const getDetails = async () => {
    const res = await getOrderDetails(slug[0], {});
    setDetails(res);
    setOrderStatus(res?.status);
    setIsLoading(false);
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

  const addToBag = async (products: any) => {
    setIsAdding(true);
    console.log("CHEEKKKKKKK", products);
    try {
      const promises = [];

      for (let i = 0; i < products.length; i++) {
        const product = products[i];
        const params = {
          productId: product.productPublicId,
          quantity: product.quantity,
        };
        promises.push(addToCart(params));
      }
      await Promise.all(promises);
      router.push("/order_delivery");
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  const getActiveStepIndex = (status: string) => {
    const stepIndexMap: {
      [key: string]: number;
      "order-placed": number;
      "order-dispatched": number;
      "out-for-delivery": number;
      "order-delivered": number;
    } = {
      "order-placed": 0,
      "order-dispatched": 1,
      "out-for-delivery": 2,
      "order-delivered": 3,
    };

    return stepIndexMap[status] || 0;
  };

  const getTrackingText = (status: string) => {
    switch (status) {
      case "order-placed":
        return "Item waiting to be picked up by Supplier.";
      case "order-dispachted":
        return "Item is ready to be shipped.";
      case "Out for Delivery":
        return "Item is out for delivery.";
      case "order-delivered":
        return "Item has been delivered.";
      case "order-cancelled":
        return "As per your request, your item has been cancelled.";
      default:
        return "";
    }
  };

  return (
    <div
      className={`order-card-container my-4 ${
        marginBottom === 1 ? "mb-1" : ""
      }`}
    >
      <div className="card-heading p-3 d-flex gap-4 flex-wrap">
        <div className="order-date">
          {t("ORDER PLACED")}
          <p className="m-0">
            {moment(order?.createdAt).format("DD MMM YYYY")}
          </p>
        </div>
        <div className="ordered-by">
          {t("NAME")}
          <p className="m-0">
            {order?.firstName} {order?.lastName}
          </p>
        </div>
        <div className="order-price">
          {t("SUB TOTAL")}
          <p className="m-0">
            {(+order?.totalItemsPrice).toFixed(2)} {order?.currencyCode}
          </p>
        </div>
        {order.tax && (
          <>
            {Object.keys(order.tax).length > 0 &&
              Object.keys(order.tax).map((eachKey) => {
                return (
                  <div
                    className="order-price"
                    style={{ textTransform: "uppercase" }}
                  >


                    {eachKey}
                    <p className="m-0">
                      {order?.tax ? (+order?.tax[eachKey]).toFixed(2) : "-"}{" "}
                      {order?.currencyCode}
                    </p>
                  </div>
                );
              })}
          </>
        )}
        <div className="order-price">
          {t("TOTAL")}
          <p className="m-0">
            {(+order?.totalPayableAmount).toFixed(2)} {order?.currencyCode}
          </p>
        </div>
      </div>

      <div className="card_section_d re-order">
        <h3 className="order-number mt-3 mb-0">
          {t("Order")} {order?.id}
        </h3>
        {order?.orderProducts && order.orderProducts.length > 0 && (
          <Button
            onClick={() => addToBag(order.orderProducts)}
            className="re-Btn"
          >
           {t('Re-order')} 
          </Button>
        )}
      </div>
      <div className="card-main px-3 py-1">
        {order?.orderPhotoshoots?.length > 0 &&
          order?.orderPhotoshoots.map((item: any, index: number) => (
            <div
              key={`order-image-${index}`}
              className="d-flex gap-4 mt-3 mb-4 track_your_order_page"
            >
              <div className="container">
                <div className="card_section_d">
                  <div className="row g-1">
                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 d-flex justify-content-center order_image_section">
                      <div
                        className="order_img_section"
                        key={`order_img_section-${itemIndex}`}
                      >
                        <Link
                          href={`/photographer/${item?.productPublicId}`}
                          className="text-decoration-none"
                        >
                          <img
                            className="order_img"
                            src={item?.photoshootImages[0]?.images}
                            alt="not found"
                          />
                        </Link>
                      </div>
                    </div>
                    <div className="col-sm-12 col-md-10 col-lg-10 col-xl-10">
                      <div className="order-item-description d-flex flex-column justify-content-between align-items-start w-100">
                        <Link
                          href={`/photographer/${item?.productPublicId}`}
                          className="text-decoration-none mb-3"
                        >
                          {item?.name}
                        </Link>

                        {item?.message && (
                          <p
                            style={{
                              fontSize: "15px",
                              fontWeight: "400",
                              textTransform: "capitalize",
                            }}
                          >
                            <b>{t("Message")} :</b> {item?.message}
                          </p>
                        )}

                        {isDetailPage && (
                          <div className="row mb-3">
                            <div className="row col-12">
                              <div className="col-md-4 col-12">
                                <p className="m-0 details-content-main">
                                  <b>{t("Photoshoot Type")}</b>
                                </p>
                              </div>
                              <div className="col-8">
                                <p className="m-0 details-content-main">
                                  {order?.photoshootType || "-"}
                                </p>
                              </div>
                            </div>
                            <div className="row col-12">
                              <div className="col-12 col-md-4">
                                <p className="m-0 details-content-main">
                                  <b>{t("Booking Date")} </b>
                                </p>
                              </div>
                              <div className="col-md-8 col-12  ">
                                <p className="m-0 details-content-main">
                                  {moment(order?.bookingDate).format(
                                    "DD/MM/YYYY"
                                  )}
                                </p>
                              </div>
                            </div>
                            <div className="row col-12">
                              <div className="col-12 col-md-4">
                                <p className="m-0 details-content-main">
                                  <b>{t("Booking Time")}</b>
                                </p>
                              </div>
                              <div className="col-md-8 col-12  ">
                                <p className="m-0 details-content-main">
                                  {moment(
                                    order?.bookingTime,
                                    "HH:mm:ss"
                                  ).format("LT")}
                                </p>
                              </div>
                            </div>
                            <div className="row col-12">
                              <div className="col-md-4 col-12">
                                <p className="m-0 details-content-main">
                                  <b>{t("Total Item Price")} </b>
                                </p>
                              </div>
                              <div className="col-md-8 col-12  ">
                                <p className="m-0 details-content-main">
                                  {order?.totalItemsPrice}
                                </p>
                              </div>
                            </div>

                            <div className="row col-12">
                              <div className="col-md-4 col-12">
                                <p className="m-0 details-content-main">
                                  <b>{t("Total Payable Amount")} </b>
                                </p>
                              </div>
                              <div className="col-8">
                                <p className="m-0 details-content-main">
                                  {order?.totalPayableAmount}
                                </p>
                              </div>
                            </div>
                            {/* <div className="row col-12">
                              <div className="col-md-4 col-12">
                                <p className="m-0 details-content-main">
                                  <b>{t("Address")} </b>
                                </p>
                              </div>
                              <div className="col-8">
                                <p className="m-0 details-content-main">
                                  {item?.address}
                                </p>
                              </div>
                            </div> */}
                          </div>
                        )}



                        <p className="m-0 order-product-status mb-3">
                        {t(`${item?.orderProductStatus.replace(/-/g, " ")}`)}
                        </p>

                        <div className="d-flex justify-content-between w-100">
                          {!isDetailPage && (
                            <Link href={`/order-detail/${order?.publicId}`}>
                              {t("View Details")}
                            </Link>
                          )}
                          {reivewAddable && (
                            <div className="stars d-flex align-items-center gap-2">
                              {Number(item.rating) > 0 ? (
                                [...Array(5)].map((el, j) => (
                                  <img
                                    src={`/images/icons/star${
                                      Number(item?.rating) >= j + 1
                                        ? ""
                                        : "-grey"
                                    }.svg`}
                                    alt="star"
                                  />
                                ))
                              ) : (
                                <Link
                                  href={`/add-review/${order?.publicId}/${
                                    index + 1
                                  }`}
                                  className="btn-add-review btn-fresh text-decoration-none d-flex align-items-center gap-1"
                                >
                                  <img src="/images/icons/add.svg" alt="add" />
                                  {t("Add Reviews")}
                                </Link>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      {item &&
                        item?.orderStatuses &&
                        item?.orderStatuses.length > 0 && (
                          <div className="mt-4">
                            <Table responsive style={{ fontSize: "14px" }}>
                              <thead className="voucher-table-head">
                                <tr>
                                  <th>{t("Sr.No.")} </th>
                                  <th>{t("Product Status")} </th>
                                  <th>{t("Updated At")} </th>
                                </tr>
                              </thead>
                              <tbody>
                                {item?.orderStatuses.map(
                                  (each: any, index: number) => {
                                    return (
                                      <tr>
                                        <td>{index + 1}</td>
                                        <td
                                          style={{
                                            textTransform: "capitalize",
                                          }}
                                        >
                                          {(each?.orderStatus).replace(
                                            /-/g,
                                            " "
                                          )}
                                        </td>
                                        <td>
                                          {moment(each?.updatedAt).format(
                                            "MMMM Do YYYY, h:mm:ss a"
                                          )}
                                        </td>
                                      </tr>
                                    );
                                  }
                                )}
                              </tbody>
                            </Table>
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

        {order?.orderRestaurants?.length > 0 &&
          order?.orderRestaurants.map((item: any, index: number) => (
            <div
              key={`order-restaurant-${index}`}
              className="d-flex gap-4 mt-3 mb-4 track_your_order_page"
            >
              <div className="container">
                <div className="card_section_d">
                  <div className="row g-1">
                    <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 d-flex justify-content-center order_image_section">
                      <div
                        className="order_img_section"
                        key={`order_img_section-${itemIndex}`}
                      >
                        <Link
                          href={`/outlet/${item?.productPublicId}`}
                          className="text-decoration-none"
                          style={{ width: "100%" }}
                        >
                          <img
                            className="order_img"
                            src={item?.restaurantImages[0]?.images}
                            alt="not found"
                          />
                        </Link>
                      </div>
                    </div>
                    <div className="col-sm-12 col-md-10 col-lg-10 col-xl-10">
                      <div className="order-item-description d-flex flex-column justify-content-between align-items-start w-100">
                        <Link
                          href={`/outlet/${item?.productPublicId}`}
                          className="text-decoration-none mb-3"
                        >
                          {item?.name}
                        </Link>

                        {item?.message && (
                          <p
                            style={{
                              fontSize: "15px",
                              fontWeight: "400",
                              textTransform: "capitalize",
                            }}
                          >
                            <b>{t("Message")} :</b> {item?.message}
                          </p>
                        )}

                        {isDetailPage && (
                          <div className="row mb-3">
                            <div className="col-12 row">
                              <div className="col-md-4 col-12">
                                <p className="m-0 details-content-main">
                                  <b>{t("Booking Date")} </b>
                                </p>
                              </div>
                              <div className="col-8">
                                <p className="m-0 details-content-main">
                                  {moment(order?.bookingDate).format(
                                    "DD/MM/YYYY"
                                  ) || "-"}
                                </p>
                              </div>
                            </div>
                            <div className="col-12 row">
                              <div className="col-md-4 col-12">
                                <p className="m-0 details-content-main">
                                  <b>{t("Booking Time")}</b>
                                </p>
                              </div>
                              <div className="col-8">
                                <p className="m-0 details-content-main">
                                  {moment(
                                    order?.bookingTime,
                                    "HH:mm:ss"
                                  ).format("LT") || "-"}
                                </p>
                              </div>
                            </div>
                            <div className="col-12 row">
                              <div className="col-md-4 col-12">
                                <p className="m-0 details-content-main">
                                  <b>{t("Event")} </b>
                                </p>
                              </div>
                              <div className="col-8">
                                <p className="m-0 details-content-main">
                                  {order?.event || "-"}
                                </p>
                              </div>
                            </div>
                            <div className="col-12 row">
                              <div className="col-md-4 col-12">
                                <p className="m-0 details-content-main">
                                  <b>{t("Number Of Peoples")} </b>
                                </p>
                              </div>
                              <div className="col-8">
                                <p className="m-0 details-content-main">
                                  {order?.numberOfPeople || "-"}
                                </p>
                              </div>
                            </div>
                            <div className="col-12 row">
                              <div className="col-md-4 col-12">
                                <p className="m-0 details-content-main">
                                  <b>{t("Total Item Price")} </b>
                                </p>
                              </div>
                              <div className="col-8">
                                <p className="m-0 details-content-main">
                                  {order?.totalItemsPrice || "-"}
                                </p>
                              </div>
                            </div>

                            <div className="col-12 row">
                              <div className="col-md-4 col-12">
                                <p className="m-0 details-content-main">
                                  <b>{t("Total Payable Amount")} </b>
                                </p>
                              </div>
                              <div className="col-8">
                                <p className="m-0 details-content-main">
                                  {order?.totalPayableAmount || "-"}
                                </p>
                              </div>
                            </div>
                            {/* <div className="col-12 row">
                              <div className="col-md-4 col-12">
                                <p className="m-0 details-content-main">
                                  <b>{t("Address")} </b>
                                </p>
                              </div>
                              <div className="col-8">
                                <p className="m-0 details-content-main">
                                  {order?.shippingAddress?.address || "-"}
                                </p>
                              </div>
                            </div> */}
                          </div>
                        )}

                        <p className="m-0 order-product-status mb-3">
                          {t(`${item?.orderProductStatus.replace(/-/g, " ")}`)}
                        </p>

                        <div className="d-flex justify-content-between w-100">
                          {!isDetailPage && (
                            <Link href={`/order-detail/${order?.publicId}`}>
                              {t("View Details")}
                            </Link>
                          )}

                          {reivewAddable && (
                            <div className="stars d-flex align-items-center gap-2">
                              {Number(item.rating) > 0 ? (
                                [...Array(5)].map((el, j) => (
                                  <img
                                    src={`/images/icons/star${
                                      Number(item?.rating) >= j + 1
                                        ? ""
                                        : "-grey"
                                    }.svg`}
                                    alt="star"
                                  />
                                ))
                              ) : (
                                <Link
                                  href={`/add-review/${order?.publicId}/${
                                    index + 1
                                  }`}
                                  className="btn-add-review btn-fresh text-decoration-none d-flex align-items-center gap-1"
                                >
                                  <img src="/images/icons/add.svg" alt="add" />
                                  {t("Add Reviews")}
                                </Link>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      {item &&
                        item?.orderStatuses &&
                        item?.orderStatuses.length > 0 && (
                          <div className="mt-4">
                            <Table responsive style={{ fontSize: "14px" }}>
                              <thead className="voucher-table-head">
                                <tr>
                                  <th>Sr.No.</th>
                                  <th>Product Status</th>
                                  <th>Updated At</th>
                                </tr>
                              </thead>
                              <tbody>
                                {item?.orderStatuses.map(
                                  (each: any, index: number) => {
                                    return (
                                      <tr>
                                        <td>{index + 1}</td>
                                        <td
                                          style={{
                                            textTransform: "capitalize",
                                          }}
                                        >
                                          {(each?.orderStatus).replace(
                                            /-/g,
                                            " "
                                          )}
                                        </td>
                                        <td>
                                          {moment(each?.updatedAt).format(
                                            "MMMM Do YYYY, h:mm:ss a"
                                          )}
                                        </td>
                                      </tr>
                                    );
                                  }
                                )}
                              </tbody>
                            </Table>
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

        {order?.orderProducts?.length > 0 &&
          order?.orderProducts.map((item: any, itemIndex: number) => {
            const orderStatus = item?.orderProductStatus;
            const activeStepIndex = getActiveStepIndex(orderStatus);
            let orderStatusList = item?.orderStatuses || [];
            // console.log("orderStatus:", orderStatus);

            const stepIndexMap: {
              [key: string]: number;
              "Order Placed": number;
              "Order Dispatched": number;
              "Out for Delivery": number;
              "Order Delivered": number;
            } = {
              "Order Placed": 0,
              "Order Dispatched": 1,
              "Out for Delivery": 2,
              "Order Delivered": 3,
            };

            return (
              <div
                className="track_your_order_page"
                key={`order_product-${itemIndex}`}
              >
                <div className="container">
                  <div className="card_section_d">
                    <div className="row g-1">
                      <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2 d-flex justify-content-center order_image_section">
                        <div
                          className="order_img_section"
                          key={`order_img_section-${itemIndex}`}
                        >
                          <Link href={`/new-product/${item?.productPublicId}`}>
                            <img
                              className="order_img"
                              src={item?.images}
                              alt="Not found"
                            />
                          </Link>
                        </div>
                      </div>
                      <div className="col-sm-12 col-md-10 col-lg-10 col-xl-10">
                        <div className="order-item-description d-flex flex-column justify-content-between align-items-start w-100">
                          <Link
                            href={`/new-product/${item?.productPublicId}`}
                            className="text-decoration-none mb-3"
                          >
                            {item?.title}
                          </Link>

                          {item?.message && (
                            <p
                              style={{
                                fontSize: "15px",
                                fontWeight: "400",
                                textTransform: "capitalize",
                              }}
                            >
                              <b>Message :</b> {item?.message}
                            </p>
                          )}

                          {isDetailPage && (
                            <div className="row mb-3">
                              <div className="col-12 row">
                                <div className="col-md-4 col-12">
                                  <p className="m-0 details-content-main">
                                    <b>{t("Booking Date")}</b>
                                  </p>
                                </div>
                                <div className="col-8">
                                  <p className="m-0 details-content-main">
                                    {moment(order?.createdAt).format(
                                      "DD/MM/YYYY"
                                    ) || "-"}
                                  </p>
                                </div>
                              </div>
                              <div className="col-12 row">
                                <div className="col-md-4 col-12">
                                  <p className="m-0 details-content-main">
                                    <b>{t("Unit Price")} </b>
                                  </p>
                                </div>
                                <div className="col-8">
                                  <p className="m-0 details-content-main">
                                    {item?.sellingPrice || "-"}
                                  </p>
                                </div>
                              </div>
                              <div className="col-12 row">
                                <div className="col-md-4 col-12">
                                  <p className="m-0 details-content-main">
                                    <b>{t("Quantity")} </b>
                                  </p>
                                </div>
                                <div className="col-8">
                                  <p className="m-0 details-content-main">
                                    {item?.quantity || "-"}
                                  </p>
                                </div>
                              </div>

                              <div className="col-12 row">
                                <div className="col-md-4 col-12">
                                  <p className="m-0 details-content-main">
                                    <b>{t("Total Payable Amount")} </b>
                                  </p>
                                </div>
                                <div className="col-8">
                                  <p className="m-0 details-content-main">
                                    {item?.totalSellingPrice || "-"}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}

                          <p className="m-0 order-product-status mb-3">
                            {t(
                              `${item?.orderProductStatus.replace(/-/g, " ")}`
                            )}
                          </p>

                          <div className="d-flex justify-content-between w-100">
                            {!isDetailPage && (
                              <Link href={`/order-detail/${order?.publicId}`}>
                                {t("View Details")}
                              </Link>
                            )}
                            {reivewAddable && (
                              <div className="stars d-flex align-items-center gap-2">
                                {Number(item.rating) > 0 ? (
                                  [...Array(5)].map((el, j) => (
                                    <img
                                      src={`/images/icons/star${
                                        Number(item?.rating) >= j + 1
                                          ? ""
                                          : "-grey"
                                      }.svg`}
                                      alt="star"
                                    />
                                  ))
                                ) : (
                                  <Link
                                    href={`/add-review/${order?.publicId}/${
                                      itemIndex + 1
                                    }`}
                                    className="btn-add-review btn-fresh text-decoration-none d-flex align-items-center gap-1"
                                  >
                                    <img
                                      src="/images/icons/add.svg"
                                      alt="add"
                                    />
                                    {t("Add Reviews")}
                                  </Link>
                                )}
                              </div>
                            )}
                          </div>
                        </div>

                        {isDetailPage &&
                          item &&
                          item?.orderStatuses &&
                          item?.orderStatuses.length > 0 && (
                            <div className="mt-4">
                              <Table responsive style={{ fontSize: "14px" }}>
                                <thead className="voucher-table-head">
                                  <tr>
                                    <th>{t("Sr.No.")} </th>
                                    <th>{t("Product Status")} </th>
                                    <th>{t("Updated At")} </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {item?.orderStatuses.map(
                                    (each: any, index: number) => {
                                      return (
                                        <tr>
                                          <td>{index + 1}</td>
                                          <td
                                            style={{
                                              textTransform: "capitalize",
                                            }}
                                          >
                                            {(each?.orderStatus).replace(
                                              /-/g,
                                              " "
                                            )}
                                          </td>
                                          <td>
                                            {moment(each?.updatedAt).format(
                                              "MMMM Do YYYY, h:mm:ss a"
                                            )}
                                          </td>
                                        </tr>
                                      );
                                    }
                                  )}
                                </tbody>
                              </Table>
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      {isDetailPage && (
        <div className="px-3 py-2 order-menu">
          <h4 className="mb-3">
            {order?.orderRestaurants?.length > 0 ? t("Menu") : ""}
          </h4>

          {order?.orderRestaurants?.length > 0 &&
            order?.orderRestaurants.map((item: any, index: number) => (
              <div key={`menu-wrapper-${index}`}>
                {item?.menu.length > 0 &&
                  item.menu.map((menuItem: any, i: number) => (
                    <MenuItem
                      key={`menu-item-${i}`}
                      name={menuItem?.name}
                      categories={menuItem?.categories}
                    />
                  ))}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
