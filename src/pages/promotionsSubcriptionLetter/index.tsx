import { useEffect, useState, useContext } from "react"

import moment from "moment";
import { ParamContext } from "../../contexts/ParamContext";

import { getPromotionsSubcriptionLetter } from "@/api/content"

import SecondHeader from "@/components/SecondHeader/SecondHeader"
import "./index.scss"

export default function Terms() {
  const [content, setContent] = useState<any>({})
  const { selectedLanguage } = useContext<any>(ParamContext);

  const getPromotionsSubcriptionLetterData = async () => {
    const res = await getPromotionsSubcriptionLetter()
    setContent(res)
  }

  useEffect(() => {
    getPromotionsSubcriptionLetterData()
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
          dangerouslySetInnerHTML={{ __html: content?.content } }
        />
      </div>
    </div>
  )
}
