import axios from "axios";
import getConfig from "../config/axios";

export async function getAllUserNotifications(params: any) {
  //  params.lang = localStorage.getItem("lang")
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_AUTH_URL}/notifications-list`,
        {
            params,
            headers: {
              Authorization: getConfig().headers.Authorization??params.token,
            },
          }
        
          )
      return res.data
    } catch (error) {
      return error
    }
  }
  
  export async function updateNotification(params: any, id: any, stamp: any) {
    try {
      console.log('stamp',stamp)
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_AUTH_URL}/notifications/${id}`,
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
  