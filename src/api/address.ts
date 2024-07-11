import axios from "axios"
import getConfig from "../config/axios"

export async function getMyLocation() {
  try {
    const res = await axios.get('https://geolocation-db.com/json/')
    return res.data
  } catch (error) {
    return error
  }
}

export async function getCountries() {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_AUTH_URL}/get-active-countries`,
      {
        params: {
          lang: localStorage.getItem("lang"),
        },
        headers: {
          Authorization: getConfig().headers.Authorization,
        },
      }
    )
    return res
  } catch (error) {
    return error
  }
}

export async function getAllStates() {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_AUTH_URL}/get-public-all-states`,
      {
        params: {
          lang: localStorage.getItem("lang"),
          pageSize: 10,
          pageNumber: 1,
        },
      }
    )

    return res.data
  } catch (error) {
    return error
  }
}

export async function getStates(id: any) {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_AUTH_URL}/states/${id}`,
      {
        params: {
          lang: localStorage.getItem("lang"),
        },
        headers: {
          Authorization: getConfig().headers.Authorization,
        },
      }
    )
    return res
  } catch (error) {
    return error
  }
}

export async function getUserAddress() {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_AUTH_URL}/user-address`,
      getConfig()
    )
    return res
  } catch (error) {
    return error
  }
}

export async function addUserAddress(params: any) {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_AUTH_URL}/address`,
      params,
      getConfig()
    )
    return res
  } catch (error) {
    return error
  }
}

export async function editUserAddress(params: any, id: any, stamp: any) {
  try {
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_AUTH_URL}/address/${id}`,
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

export async function getAllSocialLinks(params: any) {
  params.lang = localStorage.getItem("lang")
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_AUTH_URL}/public-social-link`,
      {
        params: params,
      }
    )
    return res.data
  } catch (error) {
    return error
  }
}
