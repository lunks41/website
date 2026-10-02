import React from "react";
import type { GetServerSideProps } from "next";
import "./index.scss";
import backError from "../../../public/images/news-events/backError.svg";
import img1 from "../../../public/images/sub-news-imgs/img1.svg";
import img2 from "../../../public/images/sub-news-imgs/img2.svg";
import img3 from "../../../public/images/sub-news-imgs/img3.svg";
import img4 from "../../../public/images/sub-news-imgs/img4.svg";
import subNewsContent from "../../../subNews.json";
import { useRouter } from "next/router";
import {
  SITE_NAME,
  SITE_URL,
  truncateMeta,
  type DynamicSeoProps,
} from "@/contants/seo";

type Article = {
  headLine: string;
  date: string;
  paraOne: string;
  paraTwo: string;
  paraThree: string;
};

type Props = {
  article: Article | null;
  articleIndex: number;
};

const SubNewsPage = ({ article, articleIndex }: Props) => {
  const router = useRouter();
  const headline = article?.headLine || "News";
  const date = article?.date || "";

  return (
    <div className="agencyMain">
      <div className="backButton mb-5">
        <button
          className="w-100 bg-dark p-1"
          onClick={() => router.push("/new-events")}
        >
          <img src={backError.src} alt="Back to news and events" className="w-100" />
        </button>
      </div>

      <div className="careerDiv">
        <h1 className="sdContent mt-2">
          <b style={{ color: "black" }}>{headline}</b>
        </h1>
        {date ? <p style={{ fontSize: "xx-small" }}>{date}</p> : null}
      </div>

      <div className="srvContent mt-2">
        {article ? (
          <>
            <p>{article.paraOne}</p>
            <p>{article.paraTwo}</p>
            <p>{article.paraThree}</p>
          </>
        ) : (
          <p>News article not found.</p>
        )}
      </div>

      <div className="servicesImages w-100 mb-5 mt-5">
        <img src={img1.src} alt={`${headline} image 1`} />
        <img src={img2.src} alt={`${headline} image 2`} />
        <img src={img3.src} alt={`${headline} image 3`} />
        <img src={img4.src} alt={`${headline} image 4`} />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const raw = context.query.index;
  const indexValue = Array.isArray(raw) ? raw[0] : raw;
  const articleIndex = indexValue != null ? parseInt(String(indexValue), 10) : -1;
  const articles = subNewsContent as Article[];
  const article =
    Number.isFinite(articleIndex) &&
    articleIndex >= 0 &&
    articleIndex < articles.length
      ? articles[articleIndex]
      : null;

  const headline = article?.headLine || "News Article";
  const description = truncateMeta(
    [article?.paraOne, article?.paraTwo].filter(Boolean).join(" ") ||
      "Latest news from Archipelago Middle East Shipping LLC."
  );
  const path =
    articleIndex >= 0 ? `/sub-news?index=${articleIndex}` : "/sub-news";

  const seo: DynamicSeoProps = {
    title: `${headline} | ${SITE_NAME}`,
    description,
    path,
    noindex: !article,
    ogType: "article",
    jsonLd: article
      ? {
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          headline,
          datePublished: article.date,
          description,
          author: {
            "@type": "Organization",
            name: SITE_NAME,
          },
          publisher: {
            "@type": "Organization",
            name: SITE_NAME,
            url: SITE_URL,
          },
          mainEntityOfPage: `${SITE_URL}${path}`,
        }
      : undefined,
  };

  return {
    props: {
      article,
      articleIndex,
      seo,
    },
  };
};

export default SubNewsPage;
