import axios from "axios";
import getConfig from "../config/axios";

export async function getProducts(params: any) {
  params.lang = localStorage.getItem("lang");
  let loginData = JSON.parse(localStorage.getItem("login_data") || "{}");
  if (loginData.user) {
    params.userId = loginData.user.publicId;
  }

  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_PRODUCT_API_BASE_URL}/public-products-list`,
      {
        params: params,
      }
    );
    return res.data;
  } catch (error) {
    return error;
  }
}

export async function getProductDetails(id: any) {
  const params: any = {};
  params.lang = localStorage.getItem("lang");
  let loginData = JSON.parse(localStorage.getItem("login_data") || "{}");
  if (loginData.user) {
    params.userId = loginData.user.publicId;
  }
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_PRODUCT_API_BASE_URL}/public-product/${id}`,
    {
      params: params,
    }
  );
  return res.data;
}

export async function getVariantDetails(id: any) {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_PRODUCT_API_BASE_URL}/product-variants-filters/${id}`
  );
  return res.data;
}

export async function getCategoryFliter(params: any) {
  params.lang = localStorage.getItem("lang");
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_PRODUCT_API_BASE_URL}/product-type_filter`,
      {
        params: params,
      }
    );
    return res.data;
  } catch (error) {
    return error;
  }
}

export async function getMinMaxPrice(params: any) {
  // params.lang = localStorage.getItem("lang");
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_PRODUCT_API_BASE_URL}/get-min-max-price`,
      {
        params: params,
      }
    );
    return res.data;
  } catch (error) {
    return error;
  }
}

export async function getCategoryProducts(params: any) {
  params.lang = localStorage.getItem("lang");
  let loginData = JSON.parse(localStorage.getItem("login_data") || "{}");
  if (loginData.user) {
    params.userId = loginData.user.publicId;
  }
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_PRODUCT_API_BASE_URL}/public-home-products-list`,
    {
      params: params,
    }
  );
  return res.data;
}

export async function productSearch(params: any) {
  params.lang = localStorage.getItem("lang");
  let loginData = JSON.parse(localStorage.getItem("login_data") || "{}");
  if (loginData.user) {
    params.userId = loginData.user.publicId;
  }
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_PRODUCT_API_BASE_URL}/public-product-search`,
      {
        params: params,
      }
    );
    return res.data;
  } catch (error) {
    return error;
  }
}

export async function getPublicBrands() {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_PRODUCT_API_BASE_URL}/public-brands`,
      {
        params: {
          pageSize: 10,
          PageNumber: 1,
          "filters[0][key]": "status",
          "filters[0][eq]": "active",
          lang: localStorage.getItem("lang"),
        },
      }
    );
    return res.data;
  } catch (error) {
    return error;
  }
}

// export async function getCategories() {
//   const res = await axios.get(
//     `${process.env.NEXT_PUBLIC_PRODUCT_API_BASE_URL}/public-categories`,
//     {
//       params: {
//         pageSize: 10,
//         PageNumber: 1,
//         "filters[0][key]": "status",
//         "filters[0][eq]": "active",
//         lang: localStorage.getItem("lang"),
//       },
//     }
//   );
//   return res.data;
// }

export async function uploadFiles(file: any) {
  try {
    const formData = new FormData();
    formData.append(`file`, file);

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_FILE_UPLOAD_URL}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: getConfig().headers.Authorization,
        },
      }
    );
    return res;
  } catch (error) {
    return error;
  }
}

export const addToFavorite = async (params: any) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_PRODUCT_API_BASE_URL}/favourite`,
      params,
      getConfig()
    );
    return res;
  } catch (error) {
    return error;
  }
};

export const getFavoritesProducts = async (params: any) => {
  params.lang = localStorage.getItem("lang");
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_PRODUCT_API_BASE_URL}/favourite-list`,
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
