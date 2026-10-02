import { useRouter } from "next/router";
import DefaultBanner from "@/components/Banner/Banner";
import Link from "next/link";
import Slider from "react-slick";
import { useTranslation } from "react-i18next";
import Good from "@/components/Good/Good";
import { SliderSettings } from "@/contants/sliderSettings";
import { useContext, useEffect, useState } from "react";
import { getCategoryProducts } from "../../api/product";
import { ParamContext } from "@/contexts/ParamContext";
import "./index.scss";
import Skeleton from "react-loading-skeleton";
import SecondHeader from "@/components/SecondHeader/SecondHeader";


const productCategory = () => {
  const router = useRouter();
  const { id }: any = router.query;
  const { selectedLanguage, cityChanged } = useContext<any>(ParamContext);
  const { t } = useTranslation();
  const [items, setItems] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getCategoryProduct();
  }, [selectedLanguage, cityChanged,id]);

  //apis
  const getCategoryProduct = async () => {
    setIsLoading(true);
    const params = {
      pageSize: 10,
      pageNumber: 1,
      country_id: localStorage.getItem("country_id"),
      state_id: localStorage.getItem("city_id"),
      "filters[0][key]": "id",
      "filters[0][eq]": id,
    };
    const response = await getCategoryProducts(params);
    setItems(response);
    setIsLoading(false);
  };

  return (
    <>
      {isLoading ? (
        <>
          <div className="container px-5 pt-3">
            <Skeleton height="195px" className="mt-4" />
          </div>
          {[...Array(5)].map((el, index) => (
            <div
              key={`skeletion-item-${index}`}
              className="pt-1 product-skeleton justify-content-center"
            >
              <div
                className="d-flex justify-content-between"
                style={{ paddingTop: "64px" }}
              >
                <Skeleton height="30px" width="100px" className="mx-4" />
                <Skeleton height="30px" width="100px" className="mx-4" />
              </div>
              <div className="pt-3 px-4 row">
                <div className="col-lg-3 col-md-6 col-sm-12">
                  <Skeleton height="350px" />
                  <Skeleton height="75px" className="mt-2" />
                </div>
                <div className="col-lg-3 col-md-6 d-none col-sm-12 d-lg-block d-md-block">
                  <Skeleton height="350px" />
                  <Skeleton height="75px" className="mt-2" />
                </div>
                <div className="col-lg-3 col-md-6 d-none col-sm-12 d-lg-block">
                  <Skeleton height="350px" />
                  <Skeleton height="75px" className="mt-2" />
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12 d-none d-lg-block">
                  <Skeleton height="350px" />
                  <Skeleton height="75px" className="mt-2" />
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="home">
          <SecondHeader />
        <div className="container">
          <div className="product-category-main">
            <div className="container" style={{ paddingInline: "35px" }}>
              <DefaultBanner />
            
            </div>

            {items.map((item: any, index: any) => {
              return (
                <div
                  className="container baloons_slide_section"
                  key={`baloon-item-${index}`}
                >
                  {item?.products?.length > 0 && (
                    <>
                      <div
                        className="row px-4 justify-content-md-center"
                        style={{ paddingTop: "64px" }}
                      >
                        <div className="d-flex justify-content-between">
                          <label className="slide_label text-uppercase">
                            {item.name}
                          </label>
                          <Link
                            type="button"
                            href={`/products?id=${item.id}`}
                            className="btn seeMore_btn text-decoration-none d-flex align-items-center justify-content-center"
                          >
                            {t("See more")}
                          </Link>
                        </div>
                      </div>
                      <div className="px-3 pt-4 product_review_main">
                        {item.products.length > 0 && (
                          <Slider {...SliderSettings}>
                            {item.products.map((product: any, index: any) => {
                              return (
                                <Good
                                  key={`good-item-${index}`}
                                  item={product}
                                />
                              );
                            })}
                          </Slider>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        </div>
      )}
    </>
  );
};
export default productCategory;
