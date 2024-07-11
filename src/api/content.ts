import axios from "axios"
import getConfig from "../config/axios";
import { data } from "jquery";


export const getTerms = async () => {
  const params = {
    lang: localStorage.getItem("lang") || "en",
  }
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_AUTH_URL}/public-settings/terms-and-conditions`,
      {
        params: params,
      }
    )
    return res.data
  } catch (error) {
    return error
  }
}

export const getPromotionsSubcriptionLetter = async () => {
  const params = {
    lang: localStorage.getItem("lang") || "en",
  }
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_AUTH_URL}/public-settings/promotions-subscription-letter`,
      {
        params: params,
      }
    )
    return res.data
  } catch (error) {
    return error
  }
}

export const getAboutContent = async () => {
    const params = {
        lang: localStorage.getItem("lang") || "en"
    }
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_AUTH_URL}/public-settings/about-us`, {
            params: params
        })
        return res.data
    } catch (error) {
        return error
    }
}

export const getPrivacy = async () => {
    const params = {
        lang: localStorage.getItem("lang") || "en"
    }
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_AUTH_URL}/public-settings/privacy-policy`, {
            params: params
        })
        return res.data
    } catch (error) {
        return error
    }
}

export const getReturnPolicy = async () => {
    const params = {
        lang: localStorage.getItem("lang") || "en"
    }
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_AUTH_URL}/public-settings/return-policy`, {
            params: params
        })
        return res.data
    } catch (error) {
        return error
    }
}

export const getCookiePolicy = async () => {
    const params = {
        lang: localStorage.getItem("lang") || "en"
    }
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_AUTH_URL}/public-settings/cookie-policy`, {
            params: params
        })
        return res.data
    } catch (error) {
        return error
    }
}

export const getFaq = async () => {
    const params = {
        lang: localStorage.getItem("lang") || "en"
    }
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_AUTH_URL}/publicfaqs`, {        
            params: params    
        })
        return res.data
    } catch (error) {
        return error
    }
}

export const getFaqByCategoryName = async (categoryName:string) => {
    const params = {
        lang: localStorage.getItem("lang") || "en",
        name:categoryName
    }
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_AUTH_URL}/get-faq-by-category-name`, 
        {        
            params: params    
        })
        return res.data
    } catch (error) {
        return error
    }
}

export const getBannerByCategoryName = async (categoryName:string) => {
    const params = {
        lang: localStorage.getItem("lang") || "en",
        faqCategoryName:categoryName
    }
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_AUTH_URL}/get-banners-category-name`, 
        {        
            params: params    
        })
        return res.data
    } catch (error) {
        return error
    }
}

export const  getTestimonials = async (categoryName:string) => {
    const params = {
        lang: localStorage.getItem("lang") || "en",
        name:categoryName
    }
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_AUTH_URL}/get-testimonial-by-category-name`, 
        {        
            params: params    
        })
        return res.data
    } catch (error) {
        return error
    }
}


export const getContact = async () => {
    const params = {
      lang: localStorage.getItem("lang") || "en",
    }
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_AUTH_URL}/public-settings/contact`,
        {
          params: params,
        }
      )
      return res.data
    } catch (error) {
      return error
    }
  }