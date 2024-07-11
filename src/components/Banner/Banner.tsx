import "./Banner.scss";
import { useEffect, useState, useContext } from "react";
import Balloons from "../../assets/images/Balloons.jpg";
import Cakes from "../../assets/images/Cakes.jpg";
import Perfumes from "../../assets/images/Perfumes-banner.jpg";
import Flowers from "../../assets/images/Flowers.jpg"
import Gifts from "../../assets/images/Gifts.jpg"
import { useRouter } from "next/router";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { getBannerByCategoryName } from "@/api/content";
import { ParamContext } from "@/contexts/ParamContext";
import offerBanner from "../../assets/images/offer.png";
import offerBannerAr from "../../assets/images/offer_ar.png";
import Slider from "react-slick";
import { SliderSettings } from "@/contants/sliderSettings";

export const PhotoshootBanner = () => {
  const { t } = useTranslation()
  const [banner, setBanner] = useState<any>([]);
  const getBannerByCatering = async () => {
    const res = await getBannerByCategoryName("Photoshoot");
    setBanner(res);
  };
  const fileBasicPath = "https://balloons-dezen.s3.ap-south-1.amazonaws.com/";
  const { setPageName, selectedLanguage, cityChanged } = useContext<any>(ParamContext);

  useEffect(() => {
    setPageName("Photoshoot")
    getBannerByCatering();
  }, [selectedLanguage, cityChanged]);

  return (
    <div className="container catering-container" >
      <div className="row g-2" style={{ marginTop: "23px" }}>
        <Slider
          {...SliderSettings}
          slidesToShow={1}
          slidesToScroll={1}
        >
          {banner.length && banner[0].bannerImageTop &&
            banner[0].bannerImageTop.length
            && banner[0].bannerImageTop.map((data: any, index: number) => (
              <div
                className="col-12 px-2"
                key={`offer-item-${index}`}
              >
                <div className="product_review_card_img2">
                  {
                    <img className="offer_img2" src={`${fileBasicPath}${data}`} alt="banner" style={{ height: "auto" }} />}
                </div>
              </div>
            ))}
        </Slider>
      </div>
    </div>
  )
}

export default function DefaultBanner() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const { name } = router.query;
  const [banner, setBanner] = useState<any>([]);
  const getBannerByCatering = async () => {
    if (typeof name === 'string' && name) {
      const res = await getBannerByCategoryName(name);
      setBanner(res);
    }
    else {
      const res = await getBannerByCategoryName("Dashboard");
      setBanner(res);
    }
  };
  const fileBasicPath = "https://balloons-dezen.s3.ap-south-1.amazonaws.com/";
  const { setPageName, selectedLanguage, cityChanged } = useContext<any>(ParamContext);

  useEffect(() => {
    setPageName("Photoshoot")
    getBannerByCatering();
  }, [selectedLanguage, cityChanged]);
  return (
    <>
      <div className="container catering-container">
        <div className="row g-2" style={{ marginTop: "23px" }}>
          <Slider
            {...SliderSettings}
            slidesToShow={1}
            slidesToScroll={1}
          >
            {banner.length && banner[0].bannerImageTop &&
              banner[0].bannerImageTop.length
              && banner[0].bannerImageTop.map((data: any, index: number) => (
                <div
                  className="col-12 px-2"
                  key={`offer-item-${index}`}
                >
                  <div className="product_review_card_img2">
                    {
                      <img className="offer_img2" src={`${fileBasicPath}${data}`} alt="banner" style={{ height: "auto" }} />}
                  </div>
                </div>
              ))}
          </Slider>
        </div>
      </div>
    </>
  )
}
