import { createContext, useEffect, useState } from "react";

import { useTranslation } from "react-i18next";

export const ParamContext = createContext({});

/** Static UAE default — no backend country API. */
const DEFAULT_COUNTRY = {
  id: 1,
  name: "United Arab Emirates",
  code: "AE",
};

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
  const [countries, setCountries] = useState<any>([DEFAULT_COUNTRY]);
  const [selectedCountry, setSelectedCountry] = useState<any>(DEFAULT_COUNTRY);
  const [cities, setCities] = useState<any>([]);
  const [selectedCountryId, setSelectedCountryId] = useState<any>(
    DEFAULT_COUNTRY.id
  );
  const [selectedCity, setSelectedCity] = useState<any>({});
  const [cityChanged, setCityChanged] = useState<boolean>(false);
  const [pageName, setPageName] = useState<string>("");
  const [isCategoryLoading, setIsCategoryLoading] = useState<boolean>(false);
  const [isApplicationLoading, setIsApplicationLoading] =
    useState<boolean>(false);
  const [categories, setCategories] = useState<any>([]);

  const updateTransparentHeader = (data: boolean) => {
    setIsHeaderTransparent(data ? true : false);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("country_id", String(DEFAULT_COUNTRY.id));
    const lang = localStorage.getItem("lang");
    if (lang === "ar") {
      setSelectedLanguage(languages[1]);
      i18n.changeLanguage("ar");
      document.body.dir = i18n.dir();
    }
  }, []);

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
        setCities,
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
