import "./ProgressBar.scss"

export default function ProgressBar(props: any) {
  return (
    <div className="progress-bar-container d-flex align-items-center justify-content-center gap-2 my-3">
      <div className="rates d-flex align-items-center justify-content-between gap-1">
        {props.rate}
        <img src="/images/icons/star.svg" alt="not found" />
      </div>
      <div className="progress-bar">
        <div
          className="progress-bar-inner"
          style={{
            width: `${props.percent}%`,
            background: `${props?.color}`,
          }}
        ></div>
      </div>
      <span className="count text-end">{props.count}</span>
    </div>
  )
}
