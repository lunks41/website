import axios from "axios";
import getConfig from "../config/axios";

export const placeOrder = async (params: any) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_PRODUCT_API_BASE_URL}/place-order`,
      params,
      getConfig()
    );
    return res;
  } catch (error) {
    return error;
  }
};

export const getOrders = async (params: any) => {
  params = {
    lang: localStorage.getItem("lang") || "en",
    "sorting[0][key]": "id",
    "sorting[0][direction]": "desc",
    pageNumber: 1,
    pageSize: 100,
  };

  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_ORDER_API_URL}/orders`,
      {
        params: params,
        headers: {
          Authorization: getConfig().headers.Authorization,
        },
      }
    );
    return res;
  } catch (error) {
    return error;
  }
};

export const getOrderDetails = async (id: any, params: any) => {
  params.lang = localStorage.getItem("lang") || "en";
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_ORDER_API_URL}/order-view-details/${id}`,
      {
        params: params,
        headers: {
          Authorization: getConfig().headers.Authorization,
        },
      }
    );
    return res.data;
  } catch (error) {
    return error;
  }
};

export async function submitOrderReview(params: any) {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_ORDER_API_URL}/product_ratings`,
      params,
      getConfig()
    );
    return res;
  } catch (error) {
    return error;
  }
}

export const getProductReview = async (id: number, params: any) => {
  params.lang = localStorage.getItem("lang");
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_PRODUCT_API_BASE_URL}/public_product_ratings/${id}`,
      {
        params: params,
      }
    );
    return res.data;
  } catch (error) {
    return error;
  }
};

export const getCateringReview = async (id: number, params: any) => {
  params.lang = localStorage.getItem("lang");
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_CATERING_API_URL}/public_product_ratings/${id}`,
      {
        params: params,
      }
    );
    return res.data;
  } catch (error) {
    return error;
  }
};

export const getPhotoshootReview = async (id: number, params: any) => {
  params.lang = localStorage.getItem("lang");
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_PHOTOSHOOT_API_URL}/public_product_ratings/${id}`,
      {
        params: params,
      }
    );
    return res.data;
  } catch (error) {
    return error;
  }
};
export const printOrder = async (params: any) => {
  params.lang = localStorage.getItem("lang");
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_ORDER_API_URL}/print-invoice`,
      {
        params: params,
        headers: {
          Authorization: getConfig().headers.Authorization,
        },
      }
    );
    return res.data;
  } catch (error) {
    return error;
  }
};
