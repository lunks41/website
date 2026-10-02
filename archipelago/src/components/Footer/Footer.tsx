import { useState, useEffect, useContext } from "react";
import Link from "next/link";

import "./Footer.scss";
import {
  InputGroup,
  Input,
  InputGroupText
} from "reactstrap";

import { useTranslation } from "react-i18next";

import { ParamContext } from "@/contexts/ParamContext";
import dezenLogo from "../../../public/images/media-imgs/dezenLogo.svg";

import { contacts, description } from "../../contants/footer";

type Contact = {
  mobile_no: string;
  email: string;
};

const Footer = () => {
  const { t } = useTranslation();
  const [categories, setCategories] = useState<any>([]);
  const [brands, setBrands] = useState<any>([]);
  const [allCities, setAllCities] = useState<any>([]);
  const [socialLinks, setSocialLinks] = useState<any>([]);
  const [content, setContacts] = useState<Contact>({
    mobile_no: "",
    email: "",
  });

  const {
    selectedLanguage,
    countries,
    setSelectedCountry,
    setCityChanged,
    cityChanged,
    setSelectedCity,
    selectedCity,
    cities,
  } = useContext<any>(ParamContext);

  useEffect(() => {
    const phone = contacts?.subs?.find((s: any) => s.key === "phone")?.value ?? "";
    const email = contacts?.subs?.find((s: any) => s.key === "email")?.value ?? "";
    setContacts({ mobile_no: phone, email });
    setAllCities([]);
    setSocialLinks([]);
  }, [selectedLanguage]);

  const changeCity = async (city: any) => {
    if (selectedCity.id === city.id) return;
    let timer: any;
    const index = countries.findIndex(
      (country: any) => country.id === city.countryId
    );
    setSelectedCountry(countries[index]);
    setCityChanged(!cityChanged);
    localStorage.setItem("city_id", city.id);
    localStorage.setItem("country_id", countries[index].id);
    clearTimeout(timer);
    timer = setTimeout(() => {
      setSelectedCity(city);
    }, 1200);
  };

  return (
    <footer>
      {/* <div className="footer_social_media_main">
        {console.log(socialLinks)}
        {socialLinks.length > 0 &&
          socialLinks.map((item: any, index: number) => {
            return (
              <Link
                href={item.link}
                className="social_media_flex_main text-capitalize text-decoration-none"
                key={`social-item-${index}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <a
                  href={item.link}
                  className="social_media_flex_main text-capitalize text-decoration-none"
                  key={`social-item-${index}`}
                ></a>
                <img className="social_icon" src={item.images} />
                <p className="social_content_main">{item.name}</p>
              </Link>
            );
          })}
      </div> */}

      <div className="footer_content_main pb-3 d-flex col-12">
        <div className="container footer_content_flex d-flex flex-column flex-lg-row flex-md-row flex-sm-row col-lg-3 col-md-6 col-sm-6">
          
        <div className="w-100">

          <div className="w-100">
            <div className="footer_content_logo">
              <img src="/images/icons/header_icons/logo.svg" alt="Archipelago Middle East Shipping LLC" className="w-100" />
            </div>
            <p className="footer_content_para">{t(description)}</p>
          </div>

          <div>
            <h6 className="m-0"><b>Head Office</b></h6>
            <p className="footer_content_para mt-2 text-capitalize">Al Zahra Techno Centre, 7th Floor, Office # O-704, Dubai</p>
          </div>

          <div>
            <h6 className="m-0"><b>Phone Number:</b></h6>
            <p className="footer_content_para mt-2 mb-3">+971 9 2282223 / +971 4 3595895</p>
          </div>

          <div>
            <h6 className="m-0"><b>Email Address:</b></h6>
            <p className="footer_content_para mt-2">operations@archipelago.ae</p>
          </div>

        </div>

          {/* <div className="d-flex flex-column align-items-center">
            <p className="store_title text-center text-uppercase">
              {t("Download our app now")}
            </p>
            <Link
              href="https://www.apple.com/in/"
              className="footer_black_btn mb-2"
              style={{ textDecoration: "none" }}
              target="_blank"
            >
              <div className="footer_store_icons">
                <img
                  src="/images/icons/footer_icons/apple-store-icon.svg"
                  alt="App Store"
                />
              </div>
              <div>
                <p className="black_btn_para">{t("Download on the")}</p>
                <h1 className="black_btn_heading">{t("App Store")}</h1>
              </div>
            </Link>
            <Link
              href="https://play.google.com/store/games?hl=en_IN&gl=US"
              className="footer_black_btn"
              style={{ textDecoration: "none" }}
              target="_blank"
            >
              <div className="footer_store_icons">
                <img src="/images/icons/footer_icons/google-playstore-icon.svg" />
              </div>
              <div>
                <p className="black_btn_para">{t("Android app on")}</p>
                <h1 className="black_btn_heading">{t("google play")}</h1>
              </div>
            </Link>
          </div> */}
        </div>

        {/* <div className="footer_solid_line" /> */}

        <div className="container col-lg-7 footer_content_two">
          <div className="subLinksFooter row col-12 col-lg-12 col-sm-12 col-md-12 pt-3">
            <div className="col-sm-12 col-md-4 col-lg-3">
              <ul className="footer_content_list">
                <li className="list_header">{t("Quick links")}</li>
                <div className="d-flex w-80 mb-3">
                  <div
                    style={{
                      backgroundColor: "#498DAE",
                      padding: "1px",
                      borderRadius: "20px",
                      width: "35%",
                      marginRight: "0.3rem",
                    }}
                  ></div>
                  <div
                    style={{
                      backgroundColor: "#498DAE",
                      padding: "1px",
                      borderRadius: "50%",
                      width: "0.3rem",
                      height: "0.3rem",
                    }}
                  ></div>
                </div>
                <li className="list_text">
                  <Link href="/" className="text-decoration-none text-black">
                    {t("Home")}
                  </Link>
                </li>
                <li className="list_text">
                  <Link href="/about" className="text-decoration-none text-black">
                    {t("About Us")}
                  </Link>
                </li>
                <li className="list_text">
                  <Link
                    href="/our-services"
                    className="text-decoration-none text-black"
                  >
                    {t("Services")}
                  </Link>
                </li>
                <li className="list_text">
                  <Link href="/vission-mission" className="text-decoration-none text-black">
                    {t("Vision & Mission")}
                  </Link>
                </li>
                {/* <li className="list_text">
                  <Link href="/media" className="text-decoration-none text-black">
                    {t("Media")}
                  </Link>
                </li> */}
                <li className="list_text">
                  <Link href="/new-events" className="text-decoration-none text-black">
                    {t("News")}
                  </Link>
                </li>
                <li className="list_text">
                  <Link href="/career" className="text-decoration-none text-black">
                    {t("Career")}
                  </Link>
                </li>
                <li className="list_text">
                  <Link href="/contact-us" className="text-decoration-none text-black">
                    {t("Contact us")}
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-sm-12 col-md-4 col-lg-4">
              <ul className="footer_content_list">
                <li className="list_header">{t("Our Services")}</li>
                <div className="d-flex w-80 mb-3">
                  <div
                    style={{
                      backgroundColor: "#498DAE",
                      padding: "1px",
                      borderRadius: "20px",
                      width: "25%",
                      marginRight: "0.3rem",
                    }}
                  ></div>
                  <div
                    style={{
                      backgroundColor: "#498DAE",
                      padding: "1px",
                      borderRadius: "50%",
                      width: "0.3rem",
                      height: "0.3rem",
                    }}
                  ></div>
                </div>
                <li className="list_text">
                  <Link href="/ship-agency" className="text-decoration-none text-black">
                    {t("Ship Agency")}
                  </Link>
                </li>
                <li className="list_text">
                  <Link href="/marine-services" className="text-decoration-none text-black">
                    {t("Marine Services")}
                  </Link>
                </li>
                <li className="list_text">
                  <Link href="/ship-supply" className="text-decoration-none text-black">
                    {t("Ship Supply")}
                  </Link>
                </li>{" "}
                <li className="list_text">
                  <Link href="/crew-changes" className="text-decoration-none text-black">
                    {t("Crew Change")}
                  </Link>
                </li>
                <li className="list_text">
                  <Link href="/logistics" className="text-decoration-none text-black">
                    {t("Logistics and Clearance")}
                  </Link>
                </li>
                <li className="list_text">
                  <Link href="/inspection" className="text-decoration-none text-black">
                    {t("Ship Surveys and Inspection")}
                  </Link>
                </li>
                <li className="list_text">
                  <Link href="/medical-assistance" className="text-decoration-none text-black">
                    {t("Medical Assistance")}
                  </Link>
                </li>
                {/* <li className="list_text">
                  <Link href="/photoshoot" className="text-decoration-none text-black">
                    {t("Coordination with Terminal and Stevedores")}
                  </Link>
                </li>
                <li className="list_text">
                  <Link href="/photoshoot" className="text-decoration-none text-black">
                    {t("CTM")}
                  </Link>
                </li>
                <li className="list_text">
                  <Link href="/photoshoot" className="text-decoration-none text-black">
                    {t("Spare parts")}
                  </Link>
                </li> */}
              </ul>
            </div>

            <div className="col-sm-12 col-md-4 col-lg-4">
              <ul className="footer_content_list">
                <li className="list_header">{t("Our Services")}</li>
                <div className="d-flex w-80 mb-3">
                  <div
                    style={{
                      backgroundColor: "#498DAE",
                      padding: "1px",
                      borderRadius: "20px",
                      width: "25%",
                      marginRight: "0.3rem",
                    }}
                  ></div>
                  <div
                    style={{
                      backgroundColor: "#498DAE",
                      padding: "1px",
                      borderRadius: "50%",
                      width: "0.3rem",
                      height: "0.3rem",
                    }}
                  ></div>
                </div>
                <li className="list_text">
                  <Link href="/" className="text-decoration-none text-black d-flex align-items-center">
                    <div className="d-flex align-items-center justify-content-center" style={{backgroundColor:"black",borderRadius:"50%",padding:"5px",width:"40px", height:"40px",marginRight:"5px"}}>
                      <img src="/images/icons/igLogo.svg" alt="Instagram" className="m-0 w-100" />
                    </div>
                    {t("Instagram")}
                  </Link>
                </li>
                <li className="list_text">
                  <Link
                    href="https://www.facebook.com/operations.archipelago"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-decoration-none text-black d-flex align-items-center "
                  >
                    <div className="d-flex align-items-center justify-content-center" style={{backgroundColor:"black",borderRadius:"50%",padding:"5px",width:"40px", height:"40px",marginRight:"5px"}}>
                      <img src="/images/icons/fbLogo.svg" alt="Facebook" className="m-0 w-100"/>
                    </div>
                    {t("Facebook")}
                  </Link>
                </li>
                <li className="list_text">
                  <Link href="/" className="text-decoration-none text-black d-flex align-items-center ">
                    <div className="d-flex align-items-center justify-content-center" style={{backgroundColor:"black",borderRadius:"50%",padding:"5px",width:"40px", height:"40px",marginRight:"5px"}}>
                      <img src="/images/icons/twtLogo.svg" alt="Twitter" className="m-0 w-100"/>
                    </div>
                    {t("Twitter")}
                  </Link>
                </li>
                <li className="list_text">
                  <Link href="https://wa.me/97150433783"
                  target="_blank" rel="noopener noreferrer" className="text-decoration-none text-black d-flex align-items-center ">
                    <div className="d-flex align-items-center justify-content-center" style={{backgroundColor:"black",borderRadius:"50%",padding:"5px",width:"40px", height:"40px",marginRight:"5px"}}>
                      <img src="/images/icons/waLogo.svg" alt="WhatsApp" className="m-0 w-100"/>
                    </div>
                    {t("WhatsApp")}
                  </Link>
                </li>
                {/* {categories.length > 0 &&
                  categories.map((category: any, index: number) => {
                    return (
                      <li className="list_text" key={`category-item-${index}`}>
                        <Link
                          href={`/product-category?id=${category.id}`}
                          className="text-decoration-none"
                        >
                          {category.name}
                        </Link>
                      </li>
                    );
                  })} */}
              </ul>
            </div>

            {/* <div className="col-12 col-md-4 col-lg-2">
              <ul className="footer_content_list">
                <li className="list_header">{t("BRANDS")}</li>
                {brands.length > 0 &&
                  brands.map((brand: any, index: number) => {
                    return (
                      <li
                        className="list_text text-capitalize"
                        key={`brand-item-${index}`}
                      >
                        <Link
                          href={"/search?brand=" + brand.id}
                          className="text-decoration-none"
                        >
                          {brand.name}
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </div> */}

            {/* <div className="col-4 col-md-4 col-lg-4">
              <ul className="footer_content_list">
                <li className="list_header">{t("CITIES")}</li>
                {allCities.length > 0 &&
                  allCities.map((city: any, index: number) => {
                    return (
                      <li
                        className="list_text text-capitalize"
                        key={`city-item-${index}`}
                        onClick={() => changeCity(city)}
                      >
                        <Link href="#" className="text-decoration-none">
                          {city.name}
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </div> */}

            {/* <div className="col-12 col-md-12 col-lg-3">
              <ul className="footer_content_list">
                <li className="list_header">
                  {t("WE'RE ALWAYS HERE TO HELP")}
                </li>
                <li className="list_text mb-2">
                  <Link href="#" className="text-decoration-none">
                    <img
                      src="/images/icons/footer_icons/phone_icon.svg"
                      alt="phone"
                    />
                    <span>{content?.mobile_no}</span>
                  </Link>
                </li>
                <li className="list_text mb-2">
                  <Link href="#" className="text-decoration-none">
                    <img
                      src="/images/icons/footer_icons/mail_icon.svg"
                      alt="email"
                    />
                    <span>{content?.email}</span>
                  </Link>
                </li>
              </ul>
            </div> */}
          </div>
          {/* <div className="Newsletter">
            <h5>Subscribe for Newsletter</h5>
            <div className="d-flex w-80 mb-3">
              <div
                style={{
                  backgroundColor: "#498DAE",
                  padding: "1px",
                  borderRadius: "20px",
                  width: "10%",
                  marginRight: "0.3rem",
                }}
              ></div>
              <div
                style={{
                  backgroundColor: "#498DAE",
                  padding: "1px",
                  borderRadius: "50%",
                  width: "0.3rem",
                  height: "0.3rem",
                }}
              ></div>
            </div>
            <InputGroup style={{ width: "60%" }}>
              <Input
                placeholder="Enter your Email Address"
                style={{ padding: "0.8rem", fontSize: "small" }}
              />
              <InputGroupText
                style={{
                  fontSize: "x-small",
                  padding: "0px 1.5rem",
                  textAlign: "center",
                  gap: "none",
                  backgroundColor: "#498DAE",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                SEND
              </InputGroupText>
            </InputGroup>
          </div> */}
        </div>
      </div>
      <div className="cpRightDiv copy-right text-center">
        {t(
          "Copyright © [2022] Archipelago Middle East Shipping LLC All rights reserved."
        )}
        <div className="dezenSign text-center mt-2 mb-2">
          {t(
            "Powered By"
          )}{" "}
          <span className="w-50">
            <img src={dezenLogo.src} alt="Dezen Solutions" />
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
