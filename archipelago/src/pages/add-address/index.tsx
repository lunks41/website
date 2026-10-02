import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect, ChangeEvent, useRef, useContext } from "react";
import SimpleReactValidator from "simple-react-validator";
import {
  addUserAddress,
  getCountries,
  getMyLocation,
  getStates,
} from "@/api/address";
import "./add_address.scss";
import { useTranslation } from "react-i18next";
import {
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
} from "reactstrap";
import Map from "@/components/Map/Map";
import { toast } from "react-toastify";
import { ParamContext } from "../../contexts/ParamContext";

const FORMDATA_KEY = {
  FIRSTNAME: "firstName",
  LASTNAME: "lastName",
  MOBILE_NUMBER: "mobileNumber",
  ADDRESS: "address",
  LATITUDE: "latitude",
  LONGITUDE: "longitude",
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
  latitude: string;
  longitude: string;
  currentaddress: string;
  postalCode: string;
  city: string;
  addressType: string;
  apartment: string;
  stateId: string;
  countryId: string;
  defaultAddress: boolean;
  phoneCode: string;
}

const AddAddress = () => {
  const router = useRouter();
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
  const [isModalShow, setIsModalShow] = useState<boolean>(false);
  const [lat, setLat] = useState<number>(0);
  const [lng, setLng] = useState<number>(0);
  const { t } = useTranslation();
  const [currentCoordinates, setCurrentCoordinates] = useState<any>({});
  const [locationDetectionAllowed, setLocationDetectionAllowed] =
    useState<any>();
  const { updateTransparentHeader } = useContext<any>(ParamContext);
  const [modal, setModal] = useState(false);
  const [temporaryHoldUserSelection, setTemporaryHoldUserSelection] =
    useState<any>(null);

  const [formData, setFormData] = useState<formDataProps>({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    address: "",
    latitude: "",
    currentaddress: "",
    longitude: "",
    postalCode: "",
    city: "",
    addressType: "shipping",
    apartment: "181",
    stateId: "",
    countryId: "",
    defaultAddress: true,
    phoneCode: "91",
  });

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    const { latitude, longitude } = await getMyLocation();
    setLat(latitude);
    setLng(longitude);
  };

  const getAllCountries = async () => {
    setIsFetchingCountries(true);
    const res: any = await getCountries();
    if (res) {
      setSelectedCountryId(res?.data[0].id);
      setCountries(res?.data);
    }
    setIsFetchingCountries(false);
  };

  const getAvailabletates = async () => {
    if (selectedCountryId > -1) {
      setIsFetchingStates(true);
      const res: any = await getStates(selectedCountryId);
      if (res) {
        setAvailableStates(res?.data);
      }
      setIsFetchingStates(false);
    }
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

  const addAddress = async () => {
    if (!validator.current.allValid()) {
      return validator.current.showMessages();
    }
    setIsSaving(true);
    const res: any = await addUserAddress({
      firstName: formData.firstName,
      lastName: formData.lastName,
      mobileNumber: formData.mobileNumber,
      address: formData.address,
      postalCode: formData.postalCode,
      city: formData.city,
      addressType: formData.addressType,
      apartment: formData.apartment,
      stateId: formData.stateId,
      countryId: formData.countryId,
      defaultAddress: formData.defaultAddress,
      phoneCode: formData.phoneCode,
    });
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
    setIsSaving(true);
  };

  useEffect(() => {
    getAllCountries();
  }, []);

  useEffect(() => {
    getAvailabletates();
  }, [selectedCountryId]);

  useEffect(() => {
    updateTransparentHeader(false);
  }, []);

  const toggleMapWindow = () => {
    setModal(!modal);
  };

  const openMap = () => {
    getAndSetCurrentLocationCoordinates();
  };

  const getAndSetCurrentLocationCoordinates = async () => {
    let lat;
    let lng;
    function success(pos: any) {
      const crd = pos.coords;
      lat = crd.latitude;
      lng = crd.longitude;
      setCurrentCoordinates({ lat, lng });
      setLocationDetectionAllowed(true);
      toggleMapWindow();
    }
    function error() {
      toast.error("Please allow location permission in browser settings!");
      setLocationDetectionAllowed(false);
    }
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    navigator.geolocation.getCurrentPosition(success, error, options);
  };

  const setFullAddress = async (address: any) => {
    console.log(address);
    let allCountries = countries || [];
    let selectedCountry = allCountries.find(
      (each: any) => each.name == address.country
    );

    let allStates = availableStates || [];
    let selectedState = allStates.find(
      (eachState: any) => eachState.name == address.state
    );
    setFormData((prev) => ({
      ...prev,
      address: address.location,
      postalCode: address.postalcode,
      city: address.city,
      countryId: selectedCountry ? selectedCountry.publicId : "",
      stateId: selectedState ? selectedState.id : "",
    }));
  };

  return (
    <>
      {isModalShow && (
        <>
          {/* <div className="backdrop"></div>
          <Map
            lat={lat}
            lng={lng}
            onApply={() => setIsModalShow(false)}
            onCancel={() => setIsModalShow(false)}
          /> */}
        </>
      )}
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
                    onClick={() => addAddress()}
                    style={{ width: "80px", height: "40px" }}
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
            <div className="location_btn_section" onClick={openMap}>
              <button className="use_location_btn">
                <img src="/images/icons/CommonIcon/LocationIcon.svg" />
                Use my current location
              </button>
            </div>
            <Input
              id="latitude"
              name="latitude"
              type="text"
              hidden
              value={formData.latitude}
              onChange={(e: any) => handleChange(e, FORMDATA_KEY.LATITUDE)}
            />
            <Input
              id="longitude"
              name="longitude"
              type="text"
              hidden
              value={formData.longitude}
              onChange={(e: any) => handleChange(e, FORMDATA_KEY.LONGITUDE)}
            />
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
                    <option value="">Select Country</option>
                    {countries.length > 0 &&
                      countries.map((country: any, index: number) => {
                        return (
                          <option
                            value={country.publicId}
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
                    <option value="">Select State</option>
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
                  {locationDetectionAllowed ? (
                    <Modal isOpen={modal} toggle={toggleMapWindow}>
                      <ModalHeader toggle={toggleMapWindow}>
                        Choose a location
                      </ModalHeader>
                      <ModalBody>
                        <Map
                          isVisible={true}
                          zoom={15}
                          setTemporaryHoldUserSelection={
                            setTemporaryHoldUserSelection
                          }
                          latLngCoordinatesObject={currentCoordinates}
                          onChange={setFullAddress}
                        />
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          color="primary"
                          onClick={() => {
                            toggleMapWindow();
                          }}
                        >
                          Ok
                        </Button>
                        <Button
                          color="secondary"
                          onClick={() => {
                            toggleMapWindow();
                          }}
                        >
                          Cancel
                        </Button>
                      </ModalFooter>
                    </Modal>
                  ) : (
                    ""
                  )}

                  <div>
                    <label className="form-label">{t("Address")}</label>
                    <input
                      id="address"
                      name="address"
                      type="text"
                      className="form-control custom_form_control"
                      placeholder="Enter address here"
                      value={formData.address}
                      onChange={(e: any) => {
                        handleChange(e, FORMDATA_KEY.ADDRESS);
                      }}
                    />
                    {validator.current.message(
                      "",
                      formData.address,
                      "required"
                    )}
                  </div>
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
          {/* <div className="card_section mt-4">
            <div className="card_header_section">
              <div className="selected_address">
                <h4 className="address_heading_text m-0">Home</h4>
              </div>
              <div className="btn_section">
                <div className="d-flex">
                  <Link href="/address"
                    className="cancel_btn btn text-decoration-none"
                    type="submit"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            </div>
            <div className="address_section">
              <h4 className="address_heading_text">Shaikh Altaf</h4>
              <h4 className="address_heading_text">9890740354</h4>
              <p className="address_text">
                1st floor, xyz building, xyz colony, near xyz shop, Riyadh, Saudi
                Arabia-12211
              </p>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default AddAddress;
