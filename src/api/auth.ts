import axios from "axios";
import getConfig from "../config/axios";

export async function userResetPassword(params: any) {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_AUTH_URL}/reset-password`,
      params
    );
    return res;
  } catch (error: any) {
    return error;
  }
}

export async function register(params: any) {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_AUTH_URL}/register`,
      params
    );
    return res;
  } catch (error: any) {
    return error;
  }
}

export async function login(params: any) {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_AUTH_URL}/login`,
      params
    );
    return res;
  } catch (error: any) {
    return error;
  }
}

export const googleAuth = async (params: any) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_AUTH_URL}/google-signin`,
      params
    );
    return res;
  } catch (error) {
    return error;
  }
};

export const facebookAuth = async (params: any) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_AUTH_URL}/facebook-signin`,
      params
    );
    return res;
  } catch (error) {
    return error;
  }
};


// uvudfbhfhbo
export const otpVerification = async (params: any) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_AUTH_URL}/userapis/verify_mobile_otp`,
      params
    );
    return res;
  } catch (error) {
    return error;
  }
};


export const resendOtp = async (params: any) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_AUTH_URL}/userapis/verify_mobile_otp`,
      params
    );
    return res;
  } catch (error) {
    return error;
  }
};



export async function getUserProfile() {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_AUTH_URL}/user-profile`,
      getConfig()
    );
    return res;
  } catch (error) {
    return error;
  }
}

export async function handlePasswordUpdate(params: any) {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_AUTH_URL}/change-password`,
      params,
      getConfig()
    );
    return res;
  } catch (error: any) {
    return error;
  }
}

export async function updateProfile(params: any, concurrencyStamp: string) {
  try {
    const headers = {
      'x-coreplatform-concurrencystamp': concurrencyStamp,
    };

    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_AUTH_URL}/update-user-profile`,
      params,
      {
        ...getConfig(),
        headers: {
          ...getConfig().headers,
          ...headers,
        },
      }
    );
    
    return res;
  } catch (error: any) {
    return error;
  }
}
