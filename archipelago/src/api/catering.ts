import axios from "axios";
import getConfig from "../config/axios";

export async function getHomeRestaurantList(params: any) {
  params.lang = localStorage.getItem("lang");
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_CATERING_API_URL}/public-home-restaurants-list`,
      {
        params: params,
      }
    );
    return res.data;
  } catch (error) {
    return error;
  }
}

// export async function getCateringCategories(params: any) {
//   params.lang = localStorage.getItem("lang");
//   try {
//     const res = await axios.get(
//       `${process.env.NEXT_PUBLIC_CATERING_API_URL}/public-categories`,
//       {
//         params: params,
//       }
//     );
//     return res.data;
//   } catch (error) {
//     return error;
//   }
// }

export async function getRestaurantServices(params: any) {
  params.lang = localStorage.getItem("lang");
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_CATERING_API_URL}/public-type`,
      {
        params: params,
      }
    );
    return res.data;
  } catch (error) {
    return error;
  }
}

export async function getRestaurantList(params: any) {
  params.lang = localStorage.getItem("lang");
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_CATERING_API_URL}/public-restaurants-list`,
      {
        params: params,
      }
    );
    return res.data;
  } catch (error) {
    return error;
  }
}

export async function getOtherList(params: any) {
  params.lang = localStorage.getItem("lang");
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_CATERING_API_URL}/public-other-outlets`,
      {
        params: params,
      }
    );
    return res.data;
  } catch (error) {
    return error;
  }
}

export async function getRestaurantDetail(id: any, params: any) {
  params.lang = localStorage.getItem("lang");
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_CATERING_API_URL}/public-restaurant/${id}`,
      {
        params: params,
      }
    );
    return res.data;
  } catch (error) {
    return error;
  }
}
export async function getBookingPrices(params: any) {
  params.lang = localStorage.getItem("lang");
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_CATERING_API_URL}/get-customer-booking-prices`,
      {
        params: params,
        ...getConfig(),
      }
    );
    return res.data;
  } catch (error) {
    return error;
  }
}

export const bookRestaurant = async (params: any) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_CATERING_API_URL}/customer-booking`,
      params,
      getConfig()
    );
    return res;
  } catch (error) {
    return error;
  }
};
