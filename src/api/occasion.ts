import axios from "axios"
import getConfig from "../config/axios"

export async function getUserOccasion() {
  try {
    const config = {
      headers: {
        // Assuming getConfig() sets your headers
        ...getConfig().headers
      },
      params: {
        filters: [{ key: "status", eq: "active" }]
      }
    };

    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_AUTH_URL}/user_occasion`,
      config
    );
    return res;
  } catch (error) {
    return error;
  }
}


// export async function getUserOccasion() {
//   try {
//     const res = await axios.get(
//       `${process.env.NEXT_PUBLIC_AUTH_URL}/user_occasion`,
//       params:{
//         filters:[{key:"status",eq:"active"}]
//       },
//       getConfig()
//     )
//     return res
//   } catch (error) {
//     return error
//   }
// }

export async function editUserOccasion(params: any, id: any, stamp: any) {
  try {
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_AUTH_URL}/user_occasion/${id}`,
      params,
      {
        headers: {
          Authorization: getConfig().headers.Authorization,
          "x-coreplatform-concurrencystamp": stamp,
        },
      }
    )
    return res
  } catch (error) {
    return error
  }
}

export async function editUserOccasionStatus(params: any, id: any, stamp: any) {
  try {
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_AUTH_URL}/user_occasion/${id}`,
      params,
      {
        headers: {
          Authorization: getConfig().headers.Authorization,
          "x-coreplatform-concurrencystamp": stamp,
        },
      }
    )
    return res
  } catch (error) {
    return error
  }
}

export async function addUserOccasion(params: any) {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_AUTH_URL}/user_occasion`,
        params,
        getConfig()
      )
      return res
    } catch (error) {
      return error
    }
  }
  