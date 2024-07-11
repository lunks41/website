import React from "react";
import "./index.scss";
import backError from "../../../public/images/news-events/backError.svg";
import img1 from "../../../public/images/sub-news-imgs/img1.svg";
import img2 from "../../../public/images/sub-news-imgs/img2.svg";
import img3 from "../../../public/images/sub-news-imgs/img3.svg";
import img4 from "../../../public/images/sub-news-imgs/img4.svg";
import subNewsContent from "../../../subNews.json";

import { useRouter } from "next/router";

const index = () => {
  const router = useRouter();
  const { index }: { index?: string | string[] } = router.query;
  const indexNumber: number =
    typeof index === "string" ? parseInt(index, 10) : -1;

  return (
    <div className="agencyMain">
      <div className="backButton mb-5">
        <button
          className="w-100 bg-dark p-1"
          onClick={() => router.push("/new-events")}
        >
          <img src={backError.src} alt="" className="w-100" />
        </button>
      </div>

      <div className="careerDiv">
        {subNewsContent &&
          subNewsContent.length > 0 &&
          indexNumber !== null && (
            <>
              <h3 className="sdContent mt-2">
                <b style={{ color: "black" }}>
                  {indexNumber === 0
                    ? subNewsContent[0]?.headLine || "Headline"
                    : subNewsContent[indexNumber]?.headLine || "Headline"}
                </b>
              </h3>
              <p style={{ fontSize: "xx-small" }}>
                {indexNumber === 0
                  ? subNewsContent[0]?.date || "12/10/23"
                  : subNewsContent[indexNumber]?.date || "12/10/23"}
              </p>
            </>
          )}
      </div>

      <div className="srvContent mt-2">
        {subNewsContent &&
          subNewsContent.length > 0 &&
          indexNumber !== null && (
            <>
              <p>
                {indexNumber === 0
                  ? subNewsContent[0]?.paraOne
                  : subNewsContent[indexNumber]?.paraOne}
              </p>
              <p>
                {indexNumber === 0
                  ? subNewsContent[0]?.paraTwo
                  : subNewsContent[indexNumber]?.paraTwo}
              </p>
              <p>
                {indexNumber === 0
                  ? subNewsContent[0]?.paraThree
                  : subNewsContent[indexNumber]?.paraThree}
              </p>
            </>
          )}
      </div>

      <div className="servicesImages w-100 mb-5 mt-5">
        <img src={img1.src} alt="" />
        <img src={img2.src} alt="" />
        <img src={img3.src} alt="" />
        <img src={img4.src} alt="" />
      </div>
    </div>
  );
};

export default index;
