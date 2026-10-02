import { useEffect, useState, useContext } from "react"

import moment from "moment";

import { getTerms } from "@/api/content"
import { ParamContext } from "../../contexts/ParamContext";
import SecondHeader from "@/components/SecondHeader/SecondHeader"
import { useTranslation } from "react-i18next";

import "./index.scss"

export default function Terms() {
  const [content, setContent] = useState<any>({})

  const { selectedLanguage } =
    useContext<any>(ParamContext);
  const { t, i18n } = useTranslation();
  const getContent = async () => {
    const res = await getTerms()
    setContent(res)
  }

  useEffect(() => {
    getContent()
  }, [selectedLanguage])
  return (
    <div className="page-terms-container">
      <SecondHeader />

      <img src="/images/about/badge.svg" alt="hero" className="badge-image" />

      <div className="page-terms container">
        <div className="terms-heading">
          <h2 className="mb-2">{content?.name}</h2>
          <span>{selectedLanguage?.code === "ar" ?
            `تم التحديث في ${moment(content?.updatedAt).format("MMM DD YYYY")}` 
            : `Updated At ${moment(content?.updatedAt).format("MMM DD YYYY")}`}
            </span>
        </div>

        <div
          className="content-main"
          dangerouslySetInnerHTML={{ __html: content?.content }}
        />
      </div>
    </div>
  )
}
