import axios from "axios";
import getConfig from "../config/axios";

export async function addToCart(params: any) {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_PRODUCT_API_BASE_URL}/add-cart`,
      params,
      getConfig()
    );
    return res;
  } catch (error) {
    return error;
  }
}

export async function updateDateAndTimeCart(id: any, params: any, stamp: any) {
  try {
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_PRODUCT_API_BASE_URL}/update-cart/${id}`,
      params,
      {
        headers: {
          Authorization: getConfig().headers.Authorization,
          "x-coreplatform-concurrencystamp": stamp,
        },
      }
    );
    return res;
  } catch (error) {
    return error;
  }
}

export async function getCarts() {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_PRODUCT_API_BASE_URL}/get-cart`,
      getConfig()
    );
    return res;
  } catch (error) {
    return error;
  }
}
export async function getUserCartDetails() {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_PRODUCT_API_BASE_URL}/get-user-cart`,
      getConfig()
    );
    return res;
  } catch (error) {
    return error;
  }
}

export async function addVoucherCode(params: any) {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_PRODUCT_API_BASE_URL}/add-user-cart`,
      params,
      getConfig()
    );
    return res;
  } catch (error) {
    return error;
  }
}
