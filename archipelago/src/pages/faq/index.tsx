import { useEffect, useState, useContext } from "react";
import moment from "moment";
import { getFaq } from "@/api/content";
import SecondHeader from "@/components/SecondHeader/SecondHeader";
import { Accordion, Card, Button } from "react-bootstrap";
import { ParamContext } from "../../contexts/ParamContext";
import "./index.scss";
import { useTranslation } from "react-i18next";

export default function CookiePolicy() {
  const [faqContent, setFaqContent] = useState<any>({});
  const { selectedLanguage } = useContext<any>(ParamContext);
  const getFaqContent = async () => {
    const res = await getFaq();
    let arabicres=[];
    if(selectedLanguage?.code==='ar'){
    arabicres=res.map((resp:any)=>{
        return {
         
          title:resp?.faqsLanguages && resp?.faqsLanguages[0]?.title,
          description:resp?.faqsLanguages && resp?.faqsLanguages[0]?.description
        }
      })
     
      setFaqContent(arabicres);
      return
    }
    setFaqContent(res)
  };
  const { t } = useTranslation();

  useEffect(() => {
    getFaqContent();
  }, [selectedLanguage]);

  return (
    <div className="page-cookie-policy-container">
      <SecondHeader />
      <img src="/images/about/badge.svg" alt="hero" className="badge-image" />
      <div className="page-cookie-policy container">
        <div className="policy-heading">
          <h2 className="">{t("FAQ's")}</h2>
          {/* <span>
            Update {moment(content?.updatedAt).format("MMM DD YYYY")}
          </span> */}
        </div>

        {faqContent.length > 0 &&
          faqContent.map((content: any, index: number) => (
            <div className="custom-accordian-main" key={index}>
              <Accordion>
                <Accordion.Item eventKey={String(index)}>
                  <Accordion.Header>{content?.title}</Accordion.Header>
                  <Accordion.Body>{content?.description}</Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          ))}
      </div>
    </div>
  );
}
