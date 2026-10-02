import { useEffect, useState, useContext } from "react"

import moment from "moment"

import { getReturnPolicy } from "@/api/content"
import { ParamContext } from "../../contexts/ParamContext";

import SecondHeader from "@/components/SecondHeader/SecondHeader"

import "./index.scss"

export default function ReturnPolicy() {
  const [content, setContent] = useState<any>({})
  const { selectedLanguage } = useContext<any>(ParamContext);
  const getContent = async () => {
    const res = await getReturnPolicy()
    setContent(res)
  }

  useEffect(() => {
    getContent()
  }, [selectedLanguage])

  return (
    <div className="page-return-policy-container">
      <SecondHeader />

      <img src="/images/about/badge.svg" alt="hero" className="badge-image" />

      <div className="page-return-policy container">
        <div className="policy-heading">
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
