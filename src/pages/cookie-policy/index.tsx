import { useEffect, useState, useContext } from "react"
import moment from "moment"
import { getCookiePolicy } from "@/api/content"
import SecondHeader from "@/components/SecondHeader/SecondHeader";
import { ParamContext } from "../../contexts/ParamContext";

import "./index.scss"
export default function CookiePolicy() {
  const [content, setContent] = useState<any>({})
  const { selectedLanguage } = useContext<any>(ParamContext);
  const getContent = async () => {
    const res = await getCookiePolicy()
    setContent(res)
  }
  useEffect(() => {
    getContent()
  }, [selectedLanguage])
  return (
    <div className="page-cookie-policy-container">
      <SecondHeader />
      <img src="/images/about/badge.svg" alt="hero" className="badge-image" />
      <div className="page-cookie-policy container">
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
