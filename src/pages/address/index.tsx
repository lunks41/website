import { useContext, useEffect, useState } from "react";
import { getUserAddress } from "@/api/address";
import Skeleton from "react-loading-skeleton";
import Link from "next/link";
import "./address.scss";
import { useTranslation } from "react-i18next";
import { ParamContext } from "@/contexts/ParamContext";

const address = () => {
  const [address, setAddress] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();
  const { updateTransparentHeader } = useContext<any>(ParamContext);

  const getAddress = async () => {
    const res: any = await getUserAddress();
    setIsLoading(true);
    setAddress(res.data || []);
    setIsLoading(false);
  };

  useEffect(() => {
    getAddress();
  }, []);

  useEffect(() => {
    updateTransparentHeader(false);
  }, []);

  return (
    <>
      <div className="address_page">
        <div className="container">
          <div className="address_header_seciton">
            <h3 className="heading_text">{t("Address")}</h3>
            <div className="close_icon_section">
              <Link href="/">
                <img src="/images/icons/CommonIcon/CloseIcon.svg" />
              </Link>
            </div>
          </div>
          <hr />

          {isLoading ? (
            <>
              {[...Array(5)].map((el, index) => (
                <Skeleton
                  height="213px"
                  key={`skeleton-${index}`}
                  style={{
                    marginTop: "25px",
                    marginBottom: "20px",
                    borderRadius: "16px",
                  }}
                />
              ))}
            </>
          ) : (
            <>
              {address.length > 0 &&
                address.map((item: any, index: any) => {
                  return (
                    <div className="card_section" key={`address-item-${index}`}>
                      <div className="card_header_section">
                        <h4 className="address_heading_text">
                          {item.addressType.toUpperCase()}
                        </h4>
                        <div className="btn_section">
                          <div className="d-flex">
                            <Link
                              href={`/edit-address?id=${item.publicId}&stamp=${item.concurrencyStamp}&index=${index}`}
                              className="text-decoration-none save_btn btn"
                              type="submit"
                            >
                              Edit
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="address_section">
                        <h4 className="address_heading_text">
                          {item.firstName} {item.lastName}
                        </h4>

                        <h4 className="address_heading_text">
                          {item.mobileNumber}
                        </h4>

                        <div className="address-each-row">
                          <p>{item.address}</p>
                        </div>
                        {/* <div className="address-each-row">
                          <p>Postal Code :-</p>
                          <p style={{ fontWeight: "500" }}>{item.postalCode}</p>
                        </div> */}
                        {/* <div className="address-each-row">
                          <p>City :-</p>
                          <p style={{ fontWeight: "500" }}>{item.city}</p>
                        </div>
                        <div className="address-each-row">
                          <p>State :-</p>
                          <p style={{ fontWeight: "500" }}>{item.state}</p>
                        </div>
                        <div className="address-each-row">
                          <p>Country:-</p>
                          <p style={{ fontWeight: "500" }}>{item.country}</p>
                        </div> */}
                      </div>
                    </div>
                  );
                })}
            </>
          )}
          <div className="add_address_btn_section">
            <Link
              href="/add-address"
              className="text-decoration-none add_address_btn"
            >
              <img src="/images/icons/CommonIcon/PlusIcon.svg" />{" "}
              {t("Add New Address")}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default address;
