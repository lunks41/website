import { createContext, useEffect, useState } from "react";

import { useTranslation } from "react-i18next";

import { getCountries, getStates } from "@/api/address";
// import { getCategories } from "@/api/product";

export const ParamContext = createContext({});

const ParamContextProvider = (props: any) => {
  const { i18n } = useTranslation();
  const [languages, setLanguages] = useState<any>([
    {
      name: "English",
      code: "en",
      img: <img src="/images/icons/header_icons/usa_flag.svg" alt="flag" />,
    },
    {
      name: "عربي",
      code: "ar",
      img: (
        <img
          className="rounded-circle"
          src="/images/icons/header_icons/saudi_flag.png"
          alt="flag"
        />
      ),
    },
  ]);
  const [isHeaderTransparent, setIsHeaderTransparent] =
    useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [countries, setCountries] = useState<any>([]);
  const [selectedCountry, setSelectedCountry] = useState<any>({});
  const [cities, setCities] = useState<any>([]);
  const [selectedCountryId, setSelectedCountryId] = useState<any>("");
  const [selectedCity, setSelectedCity] = useState<any>({});
  const [cityChanged, setCityChanged] = useState<boolean>(false);
  const [pageName, setPageName] = useState<string>("");
  const [isCategoryLoading, setIsCategoryLoading] = useState<boolean>(true);
  const [isApplicationLoading, setIsApplicationLoading] =
    useState<boolean>(true);
  const [categories, setCategories] = useState<any>([]);

  const getAllCountries = async () => {
    const res: any = await getCountries();
    const data = res.data;
    setCountries(data);
    const countryId = Number(localStorage.getItem("country_id"));
    if (countryId) {
      setSelectedCountryId(countryId);
      const index = data?.findIndex((item: any) => item.id === countryId);
      setSelectedCountry(data && data[index]);
      return;
    }
    localStorage.setItem("country_id", data[0].id);
    data[0].id && setIsApplicationLoading(false);
    setSelectedCountryId(data[0].id);
    setSelectedCountry(data[0]);
  };

  const getCites = async () => {
    if (selectedCountryId) {
      const res: any = await getStates(selectedCountryId);
      const data = res?.data;
      if (data.length < 1) return;
      setCities(data);
      const cityId = Number(localStorage.getItem("city_id"));
      const index = data.findIndex((item: any) => item.id === cityId);
      if (cityId && index > -1) {
        setSelectedCity(data[index]);
      }
      if (!cityId) {
        localStorage.setItem("city_id", data[0].id);
        data[0].id && setIsApplicationLoading(false);
        setSelectedCity(data[0]);
      }
    }
  };

  // const getCategory = async () => {
  //   setIsCategoryLoading(true);
  //   const res = await getCategories();
  //   setCategories(res);
  //   setIsCategoryLoading(false);
  // };

  const updateTransparentHeader = (data: boolean) => {
    setIsHeaderTransparent(data ? true : false);
  };

  useEffect(() => {
    const lang = localStorage.getItem("lang");
    if (lang === "ar") {
      setSelectedLanguage(languages[1]);
      i18n.changeLanguage("ar");
      document.body.dir = i18n.dir();
    }
  }, []);

  useEffect(() => {
    getAllCountries();
    // getCategory();
  }, [selectedLanguage]);

  useEffect(() => {
    getCites();
  }, [selectedCountryId, selectedLanguage]);

  return (
    <ParamContext.Provider
      value={{
        languages,
        countries,
        cities,
        selectedLanguage,
        selectedCountry,
        selectedCountryId,
        setCityChanged,
        cityChanged,
        setSelectedCountryId,
        setSelectedLanguage,
        selectedCity,
        setSelectedCity,
        setSelectedCountry,
        setLanguages,
        setCountries,
        pageName,
        setPageName,
        isCategoryLoading,
        isApplicationLoading,
        categories,
        updateTransparentHeader,
        isHeaderTransparent,
      }}
    >
      {props.children}
    </ParamContext.Provider>
  );
};

export default ParamContextProvider;
