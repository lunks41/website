import { useState, useEffect, useContext } from "react";

import { useRouter } from "next/router";

import { useTranslation } from "react-i18next";

import {
  productSearch,
  getCategoryFliter,
  getMinMaxPrice,
} from "@/api/product";

import { ParamContext } from "@/contexts/ParamContext";

import Good from "@/components/Good/Good";
import Banner from "@/components/Banner/Banner";

import Skeleton from "react-loading-skeleton";

import "./index.scss";
import TimingFunctions from "@/components/functions/TimingFunctions";

const gift = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const { i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [pageSize, setPageSize] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [filters, setFilters] = useState<any>([]);
  const [minMaxPrice, setMinMaxPrice] = useState<any>({});
  const [selectedMinPrice, setSelectedMinPrice] = useState<number>(0);
  const [selectedFilters, setSelectedFilters] = useState<any>({});
  const router = useRouter();
  const { selectedLanguage, cityChanged } = useContext<any>(ParamContext);
  const { key, brand, minPrice, maxPrice, priceSort } = router.query;
  const { deBounce } = TimingFunctions();
  const [selectedMaxPrice, setSelectedMaxPrice] = useState<number>(0);

  const setFliterItems = () => {
    let selected = {};
    filters.productTypeData.map((item: any) => {
      const value: any = router.query[item.labelvalue.trim()];
      if (value) {
        selected = {
          ...selected,
          [`${item.labelvalue}`]: JSON.parse(value),
        };
      }
    });
    setSelectedFilters(selected);
  };

  const handleChangeCheck = (key: string, value: string) => {
    const oldKey = selectedFilters[key] || [];
    const isValueSelected = oldKey.includes(value);

    let updatedKey;

    if (isValueSelected) {
      // If value is selected, remove it
      updatedKey = oldKey.filter((item: any) => item !== value);
    } else {
      // If value is not selected, add it
      updatedKey = [...oldKey, value];
    }

    // Update the URL
    const query = { ...router.query, [key]: JSON.stringify(updatedKey) };
    router.push({ pathname: router.pathname, query });

    // Update the selectedFilters state
    setSelectedFilters({ ...selectedFilters, [key]: updatedKey });
  };

  useEffect(() => {
    if (filters && filters.productTypeData) {
      setFliterItems();
    }
  }, [filters]);

  const getItems = async () => {
    setIsLoading(true);
    const params: any = {
      pageNumber: 1,
      pageSize: 20,
      search: key || "",
      country_id: localStorage.getItem("country_id"),
      state_id: localStorage.getItem("city_id"),
    };
    const keys = Object.keys(selectedFilters);
    let index = 0;
    if (keys) {
      for (let i = 0; i < keys.length; i++) {
        if (selectedFilters[keys[i]].length > 0) {
          params[`productFilters[${index}][key]`] = keys[i];
          params[`productFilters[${index}][value]`] = JSON.stringify(
            selectedFilters[keys[i]]
          );
          index++;
        }
      }
    }
    params.filters = [];
    params.sorting = [];
    if (brand) {
      // params.filters.push({
      //   key: "brand_id",
      //   eq: brand,
      // });
      // params["Filters[0][key]"] = "brand_id";
      // params["Filters[0][eq]"] = brand;
    }
    if (minPrice) {
      params.filters.push({
        key: "selling_price",
        gte: +minPrice,
      });
    }
    if (maxPrice) {
      params.filters.push({
        key: "selling_price",
        lte: +maxPrice,
      });
      // params["Filters[0][key]"] = "brand_id";
      // params["Filters[0][eq]"] = brand;
    }

    if (priceSort) {
      params.sorting.push({
        key: "sellingPrice",
        direction: priceSort,
      });
    }

    const res = await productSearch(params);
    setProducts(res);
    setIsLoading(false);
  };

  const getFliters = async () => {
    const params = {
      search: key,
      country_id: localStorage.getItem("country_id"),
      state_id: localStorage.getItem("city_id"),
    };
    const res = await getCategoryFliter(params);
    setFilters(res[0]);
  };

  const getMinMaxPriceFilter = async () => {
    const params = {};
    const res = await getMinMaxPrice(params);
    setSelectedMaxPrice(res?.maxSellingPrice || 0);
    setSelectedMinPrice(res?.minSellingPrice || 0);
    setMinMaxPrice(res);
  };
  const onPriceMaxChange = (price: string) => {
    let params: any = router.query || {};
    params.maxPrice = price;
    params.minPrice = minMaxPrice?.minSellingPrice || 0;
    router.push({
      query: params,
    });
  };

  useEffect(() => {
    if (key) {
      getFliters();
    }
  }, [key, selectedLanguage, cityChanged, minPrice, maxPrice]);
  useEffect(() => {
    if (key) {
      getMinMaxPriceFilter();
    }
  }, [key, cityChanged]);

  useEffect(() => {
    if (key || brand) {
      getItems();
    }
  }, [key, selectedFilters, selectedLanguage, cityChanged, brand, priceSort]);

  const onPriceChange = (price: string) => {
    let params: any = router.query || {};
    params.minPrice = price;
    params.maxPrice = minMaxPrice?.maxSellingPrice || 0;
    router.push({
      query: params,
    });
  };
  const onSortPrice = (sort: string) => {
    let params: any = router.query || {};
    params.priceSort = sort || "";
    router.push({
      query: params,
    });
  };

  const onclearFilter = () => {
    setSelectedFilters({});
    router.push({
      query: { key },
    });
    setSelectedFilters({});
  };

  return (
    <div className="search_result_main">
      <div className="container">
        <Banner />
        <div className="row mt-5">
          <div className="col-12 mb-5">
            <div className="sort_by_flex">
              <p>Sort By</p>
              <select
                className="select filter_select"
                value={priceSort}
                onChange={(e: any) => onSortPrice(e.target.value)}
              >
                <option value="">Relevancy</option>
                <option value="asc">Price:Low to High</option>
                <option value="desc">Price:High to Low </option>
              </select>
            </div>
          </div>
        </div>
        <div className="row mb-5">
          <div className="col-12 col-md-3 col-lg-3">
            {isLoading ? (
              <Skeleton height="1229px" />
            ) : (
              <div className="filter_main_div">
                <div className="filter_header_flex_main">
                  <p
                    className="filter_heading"
                    style={{ textTransform: "uppercase" }}
                  >
                    {t("FILTER")}
                  </p>
                  <p
                    className="filter_header_flex_red_content"
                    style={{ cursor: "pointer" }}
                    onClick={() => onclearFilter()}
                  >
                    {t("Clear All")}
                  </p>
                </div>
                <div className="filter_range_slidder">
                  <div>
                    <div>
                      <label htmlFor="filterRange" className="form-label">
                        {t("PRICE")}
                      </label>
                      <div className="filter_range_slidder_content">
                        <p className="mb-1">
                          <b>{t("Min")} :</b>{" "}
                          {minPrice
                            ? +minPrice
                            : +minMaxPrice?.minSellingPrice || 0}{" "}
                          {t("SAR")}
                        </p>
                        <p className="mb-1">
                          <b>{t("Max")} :</b>{" "}
                          {maxPrice
                            ? +maxPrice
                            : +minMaxPrice?.maxSellingPrice || 0}{" "}
                          {t("SAR")}
                        </p>
                      </div>
                    </div>
                    <div className="range-slider">
                      <div className="range-fill"></div>

                      <input
                        type="range"
                        className="min-price"
                        min={+minMaxPrice?.minSellingPrice || 0}
                        max={+minMaxPrice?.maxSellingPrice || 0}
                        value={selectedMinPrice}
                        id="filterRange"
                        defaultValue={+minMaxPrice?.minSellingPrice || 0}
                        onChange={(e: any) => {
                          console.log(e.target.value);
                          deBounce(() => onPriceChange(e.target.value), 500);
                          setSelectedMinPrice(e.target.value);
                        }}
                      />
                      <input
                        type="range"
                        className="max-price"
                        min={+minMaxPrice?.minSellingPrice || 0}
                        max={+minMaxPrice?.maxSellingPrice || 0}
                        value={selectedMaxPrice}
                        id="filterRange"
                        defaultValue={+minMaxPrice?.maxSellingPrice || 0}
                        onChange={(e: any) => {
                          deBounce(() => onPriceMaxChange(e.target.value), 500);
                          setSelectedMaxPrice(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="filter_range_slidder_content">
                    <p className="m-0">
                      {t("SAR")} {+minMaxPrice?.minSellingPrice || 0}
                    </p>
                    <p className="m-0">
                      {t("SAR")} {+minMaxPrice?.maxSellingPrice || 0}
                    </p>
                  </div>
                </div>
                {/* <div className="filter_checks_main"> */}
                <div className="mt-2">
                  {filters &&
                    filters.productTypeData &&
                    filters.productTypeData.map((data: any, i: number) => {
                      return (
                        <div
                          className="filter_checks_main"
                          key={`fliter-item-${i}`}
                        >
                          <p
                            className={`header_main m-0  ${
                              i18n.dir() === "rtl" ? "pe-2" : ""
                            }`}
                          >
                            {data.label}
                          </p>
                          <div className="mt-2">
                            {data.value.map((item: any, index: number) => {
                              return (
                                <div
                                  className={`form-check ${
                                    i18n.dir() === "rtl" ? "pe-3" : ""
                                  }`}
                                  key={`filter-catetory-item-${index}`}
                                >
                                  <input
                                    className={`form-check-input ${
                                      i18n.dir() === "rtl" ? "float-none" : ""
                                    }`}
                                    type="checkbox"
                                    id={`check-item-${index}`}
                                    checked={
                                      selectedFilters[`${data.labelvalue}`] &&
                                      selectedFilters[
                                        `${data.labelvalue}`
                                      ]?.indexOf(item.facet) > -1
                                        ? true
                                        : false
                                    }
                                    onChange={() =>
                                      handleChangeCheck(
                                        data.labelvalue,
                                        item.facet
                                      )
                                    }
                                  />
                                  <label
                                    className={`form_check_label text-truncate text-capitalize ${
                                      i18n.dir() === "rtl" ? "float-start" : ""
                                    }`}
                                    htmlFor={`check-item-${index}`}
                                  >
                                    {item?.facet}
                                    <span> {`(${item?.count})`} </span>
                                  </label>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                </div>
                {/* </div> */}
              </div>
            )}
          </div>
          <div className="col-12 col-md-9 col-lg-9">
            <div className="row product_review_main">
              {isLoading ? (
                <>
                  {[...Array(12)].map((el, index) => (
                    <div
                      className="col-12 col-md-6 col-lg-4 mb-2"
                      key={`skeleton-items-${index}`}
                    >
                      <div className="px-2">
                        <Skeleton height="350px" />
                        <Skeleton height="75px" className="mt-2" />
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <>
                  {products.map((item: any, index: number) => {
                    return (
                      <div
                        className="col-12 col-md-6 col-lg-4 mb-2"
                        key={`good-items-${index}`}
                      >
                        <Good key={index} item={item} />
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default gift;
