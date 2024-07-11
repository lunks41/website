import "./ClientCard.scss";

export default function ClientCard({ item }: any) {
  return (
    <div className="client-card mx-2">
      <p>{item?.description}</p>

      <div className="d-flex align-items-center gap-1">
        {item?.image ? (
          <img src={item?.image} className="client-img" alt="client" />
        ) : (
          <img
            src="/images/icons/catering_icons/default-user.png"
            className="client-img"
            alt="client"
          />
        )}
        <div>
          <div className="client-name">{item?.name}</div>
          <span>{item?.designation}</span>
        </div>
      </div>
    </div>
  );
}
