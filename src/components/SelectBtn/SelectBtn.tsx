import { useRef, useContext, useState, useEffect } from "react";
import { CartContext } from "@/contexts/CartContext";
import "./SelectBtn.scss";
import { useTranslation } from "react-i18next";

export default function SelectBtn(props: any) {
  const { t } = useTranslation();
  const btnRef = useRef<HTMLButtonElement>(null);
  const { cateringDetails, setCateringDetails } = useContext<any>(CartContext);
  const [selectedPackages, setSelectedPackages] = useState<number>(0);
  const [isChanged, setIsChanged] = useState<number>(0);
  const handleClick = () => {
    document.querySelectorAll(".select-btn button").forEach((btn) => {
      btn.classList.remove("selected");
    });
    if (btnRef.current) {
      btnRef.current.classList.toggle("selected");
      const selectedPackageIndex = props?.index;
      setSelectedPackages(selectedPackageIndex);
      setIsChanged(Math.random()*100)
    }
  };

  useEffect(() => {
    setCateringDetails({
      ...cateringDetails,
      selectedPackages: selectedPackages,
      members: props?.members,
    });
  }, [selectedPackages,isChanged]);

  return (
    <div className="select-btn">
      <button onClick={handleClick} ref={btnRef}>
        <img src="/images/icons/CommonIcon/tickSquareIcon.svg" alt="check" />
        <h6 className="capacity-heading">{t('FOR')}  {props?.members} {t('MEMBERS')} </h6>
        <span className="capacity-price">{props?.price} {t('SAR')}</span>
      </button>
    </div>
  );
}
