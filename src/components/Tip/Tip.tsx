import { useTranslation } from "react-i18next"

import "./Tip.scss"

export default function Tip({ iconURL, title, index }: any) {
  const { t } = useTranslation()
  return (
    <div className="hire-tip-container gap-3 col-12 col-lg-4 col-md-4 col-sm-6 px-2 pb-4">
      <div
        className={`${
          !iconURL
            ? "flex-column find-tip align-items-start justify-content-center"
            : "d-flex align-items-center gap-3"
        }`}
      >
        {iconURL ? (
          <img src={iconURL} alt="icon" />
        ) : (
          <div className="mb-3 step text-capitalize">{t("Step")}-{index}</div>
        )}
        <p className="m-0 text-start">{t(title)}</p>
      </div>
    </div>
  )
}
