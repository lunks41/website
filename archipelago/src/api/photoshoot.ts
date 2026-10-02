import axios from "axios";
import getConfig from "../config/axios";

// export const getPhotoshootCategories = async (params: any) => {
//   params.lang = localStorage.getItem("lang");
//   try {
//     const res = await axios.get(
//       `${process.env.NEXT_PUBLIC_PHOTOSHOOT_API_URL}/public-categories`,
//       {
//         params: params,
//       }
//     );
//     return res.data;
//   } catch (error) {
//     return error;
//   }
// };

export const getPhotoshootDetails = async (id: any, params: any) => {
  params.lang = localStorage.getItem("lang");
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_PHOTOSHOOT_API_URL}/public-photoshoot/${id}`,
      {
        params: params,
      }
    );
    return res.data;
  } catch (error) {
    return error;
  }
};

export const getPhotographers = async (params: any) => {
  params.lang = localStorage.getItem("lang");
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_PHOTOSHOOT_API_URL}/public-photoshoots-list`,
      {
        params: params,
      }
    );
    return res.data;
  } catch (error) {
    return error;
  }
};

export const bookPhotographer = async (params: any) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_PHOTOSHOOT_API_URL}/photoshoot-booking`,
      params,
      getConfig()
    );
    return res;
  } catch (error) {
    return error;
  }
};
export const getPhotoshootPrices = async (params: any) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_PHOTOSHOOT_API_URL}/get-photoshoot-booking-prices`,
      {
        params: params,
        headers: getConfig().headers,
      }
    );
    return res;
  } catch (error) {
    return error;
  }
};
