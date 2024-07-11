import axios from "axios";
import getConfig from "../config/axios";

export const businessDetails = async (params: any) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_AUTH_URL}/b-to-b`,
      params,
      getConfig()
    );
    return res;
  } catch (error) {
    return error;
  }
};
