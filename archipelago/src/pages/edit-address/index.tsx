import Link from "next/link";
import { useState, useEffect, ChangeEvent, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import SimpleReactValidator from "simple-react-validator";

import {
  addUserAddress,
  editUserAddress,
  getUserAddress,
  getCountries,
  getStates,
} from "@/api/address";

import "./index.scss";

const FORMDATA_KEY = {
  FIRSTNAME: "firstName",
  LASTNAME: "lastName",
  MOBILE_NUMBER: "mobileNumber",
  ADDRESS: "address",
  POSTAL_CODE: "postalCode",
  CITY: "city",
  TYPE: "addressType",
  COUNTRY_ID: "countryId",
  STATE_ID: "stateId",
  ADDRESS_TYPE: "addressType",
};
interface formDataProps {
  firstName: string;
  lastName: string;
  mobileNumber: string;
  address: string;
  postalCode: string;
  city: string;
  addressType: string;
  apartment: string;
  stateId: string;
  countryId: string;
  defaultAddress: boolean;
  phoneCode: string;
}

const EditAddress = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { id, stamp, index } = router.query;
  console.log(index, "index");
  const [, forceUpdate] = useState<number>();
  const validator = useRef(
    new SimpleReactValidator({
      autoForceUpdate: { forceUpdate: () => forceUpdate(1) },
    })
  );
  const [countries, setCountries] = useState<any>([]);
  const [selectedCountryId, setSelectedCountryId] = useState(-1);
  const [availableStates, setAvailableStates] = useState<any>([]);
  const [isFetchingCountries, setIsFetchingCountries] =
    useState<boolean>(false);
  const [isFetchingStates, setIsFetchingStates] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const [formData, setFormData] = useState<formDataProps>({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    address: "",
    postalCode: "",
    city: "",
    addressType: "shipping",
    apartment: "181",
    stateId: "",
    countryId: "",
    defaultAddress: true,
    phoneCode: "91",
  });

  const getAllCountries = async () => {
    setIsFetchingCountries(true);
    const res: any = await getCountries();
    setSelectedCountryId(res?.data[0].id);
    setCountries(res?.data);
    setIsFetchingCountries(false);
  };

  const getAvailabletates = async () => {
    if (selectedCountryId > -1) {
      setIsFetchingStates(true);
      const res: any = await getStates(selectedCountryId);
      setAvailableStates(res?.data);
      setIsFetchingStates(false);
    }
  };

  const getAddressDetail = async () => {
    const res: any = await getUserAddress();
    const data = res.data[Number(index)];
    setSelectedCountryId(data.countryId);
    setFormData({
      firstName: data.firstName,
      lastName: data.lastName,
      mobileNumber: data.mobileNumber,
      address: data.address,
      postalCode: data.postalCode,
      city: data.city,
      addressType: data.addressType,
      apartment: "181",
      stateId: data.stateId,
      countryId: data.countryId,
      defaultAddress: true,
      phoneCode: "91",
    });
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>, key: string) => {
    const value = event.target.value;
    if (key === FORMDATA_KEY.COUNTRY_ID) {
      setSelectedCountryId(Number(value));
    }
    setFormData((prev) => {
      return { ...prev, [key]: value };
    });
  };

  const editAddress = async () => {
    if (!validator.current.allValid()) {
      return validator.current.showMessages();
    }
    setIsSaving(true);
    const res: any = await editUserAddress(formData, id, stamp);
    console.log(res);
    if (res?.response?.data?.type) {
      switch (res?.response?.data?.details[0].name) {
        case "lastName":
          setErrorMsg("Please insert correct format of last name");
          break;
        case "mobileNumber":
          setErrorMsg("Please insert correct mobile number");
          break;
        case "postalCode":
          setErrorMsg("Please insert correct postal code");
          break;
        case "firstName":
          setErrorMsg("Please insert correct format of first name");
          break;
        default:
          setErrorMsg("");
          break;
      }
    } else {
      router.push("/address");
    }
    setIsSaving(false);
  };

  useEffect(() => {
    if (index) {
      getAddressDetail();
    }
  }, [index]);

  useEffect(() => {
    getAllCountries();
  }, []);

  useEffect(() => {
    getAvailabletates();
  }, [selectedCountryId]);

  return (
    <>
      <div className="address_page">
        <div className="container">
          <div className="address_header_seciton">
            <h3 className="heading_text">{t("Add New Address")}</h3>
            <div className="close_icon_section">
              <Link href="/address" className="text-decoration-none">
                <img src="/images/icons/CommonIcon/CloseIcon.svg" />
              </Link>
            </div>
          </div>
          <hr />
          <div className="card_section">
            <div className="card_header_section">
              <h4 className="card_header_text">{t("Add New Address")}</h4>
              <div className="btn_section">
                <div className="d-flex">
                  <button
                    className="save_btn btn px-3"
                    disabled={isSaving}
                    type="submit"
                    onClick={() => editAddress()}
                    style={{ height: "40px", width: "80px" }}
                  >
                    {isSaving ? (
                      <div style={{ height: "100%" }}>
                        <img
                          src="/images/icons/balloon-loading.gif"
                          alt="loading"
                          style={{ height: "100%", margin: "auto" }}
                        />
                      </div>
                    ) : (
                      "Save"
                    )}
                  </button>
                  <Link
                    href="/address"
                    className="text-decoration-none cancel_btn btn ms-3"
                  >
                    Cancel
                  </Link>
                </div>
              </div>
            </div>
            <div className="location_btn_section">
              <button className="use_location_btn">
                <img src="/images/icons/CommonIcon/LocationIcon.svg" />
                Use my current location
              </button>
            </div>
            <div className="form_section">
              {errorMsg && (
                <div
                  className="alert alert-danger fade show text-center"
                  role="alert"
                >
                  {errorMsg}
                </div>
              )}
              <div className="row g-3">
                <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    className="form-control custom_form_control"
                    placeholder="Enter first name here"
                    value={formData.firstName}
                    onChange={(e) => handleChange(e, FORMDATA_KEY.FIRSTNAME)}
                  />
                  {validator.current.message(
                    "",
                    formData.firstName,
                    "required"
                  )}
                </div>
                <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    className="form-control custom_form_control"
                    placeholder="Enter last name here"
                    value={formData.lastName}
                    onChange={(e) => handleChange(e, FORMDATA_KEY.LASTNAME)}
                  />
                  {validator.current.message("", formData.lastName, "required")}
                </div>
                <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                  <label className="form-label">Mobile Number</label>
                  <input
                    type="text"
                    className="form-control custom_form_control"
                    id="mobileNumber"
                    placeholder="10- Digit mobile number"
                    value={formData.mobileNumber}
                    onChange={(e) =>
                      handleChange(e, FORMDATA_KEY.MOBILE_NUMBER)
                    }
                  />
                  {validator.current.message(
                    "",
                    formData.mobileNumber,
                    "required"
                  )}
                </div>
                <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                  <label htmlFor="country" className="form-label">
                    Country
                  </label>
                  <select
                    id="country"
                    className="form-select custom_form_select"
                    value={formData.countryId}
                    onChange={(e: any) =>
                      handleChange(e, FORMDATA_KEY.COUNTRY_ID)
                    }
                    disabled={isFetchingCountries}
                  >
                    {countries.length > 0 &&
                      countries.map((country: any, index: number) => {
                        return (
                          <option
                            value={country.id}
                            key={`country-item-${index}`}
                          >
                            {country.name}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                  <label htmlFor="country" className="form-label">
                    State
                  </label>
                  <select
                    className="form-select custom_form_select"
                    value={formData.stateId}
                    onChange={(e: any) =>
                      handleChange(e, FORMDATA_KEY.STATE_ID)
                    }
                    disabled={isFetchingStates}
                  >
                    {availableStates.length > 0 &&
                      availableStates.map((state: any, index: number) => {
                        return (
                          <option value={state.id} key={`state-item-${index}`}>
                            {state.name}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                  <label className="form-label">{t("Address")}</label>
                  <input
                    type="text"
                    className="form-control custom_form_control"
                    placeholder="Enter address here"
                    value={formData.address}
                    onChange={(e) => handleChange(e, FORMDATA_KEY.ADDRESS)}
                  />
                  {validator.current.message("", formData.address, "required")}
                </div>
                <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                  <label className="form-label">Postal Code</label>
                  <input
                    type="text"
                    className="form-control custom_form_control"
                    value={formData.postalCode}
                    placeholder="Enter postal code here"
                    onChange={(e) => handleChange(e, FORMDATA_KEY.POSTAL_CODE)}
                  />
                  {validator.current.message(
                    "",
                    formData.postalCode,
                    "required"
                  )}
                </div>
                <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                  <label className="form-label">City</label>
                  <input
                    type="text"
                    className="form-control custom_form_control"
                    placeholder="Enter city here"
                    value={formData.city}
                    onChange={(e) => handleChange(e, FORMDATA_KEY.CITY)}
                  />
                  {validator.current.message("", formData.city, "required")}
                </div>
                <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                  <label className="form-label">{t("Address Type")}</label>
                  <select
                    className="form-select custom_form_select"
                    value={formData.addressType}
                    onChange={(e: any) =>
                      handleChange(e, FORMDATA_KEY.ADDRESS_TYPE)
                    }
                  >
                    <option value={`shipping`}>Shipping</option>
                    <option value={`billing`}>Billing</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditAddress;
