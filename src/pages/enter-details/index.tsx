import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import * as yup from "yup";
import { CartContext } from "@/contexts/CartContext";
import { bookRestaurant, getBookingPrices } from "@/api/catering";
import { useTranslation } from "react-i18next";
import "./index.scss";
import { getUserProfile } from "@/api/auth";
import { getCarts } from "@/api/cart";
import TimingFunctions from "@/components/functions/TimingFunctions";
import {
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
} from "reactstrap";
import Map from "@/components/Map/Map";

interface FormDataTypes {
  name: string;
  emailId: string;
  contactNo: string;
  bookingDate: string;
  fullAddress: string;
  latitude: string;
  longitude: string;
  currentaddress: string;
  venue: string;
  event: string;
  numberOfMembers: number;
}

const FORM_DATA_KEY = {
  NAME: "name",
  EMAIL_ID: "emailId",
  CONTACT_NO: "contactNo",
  BOOKING_DATE: "bookingDate",
  FULL_ADDRESS: "fullAddress",
  LATITUDE: "latitude",
  LONGITUDE: "longitude",
  VENUE: "venue",
  EVENT: "event",
  NUMBER_OF_MEMBERS: "numberOfMembers",
};

const enter_details = (props: any) => {
  const [isFormValid, setIsFormValid] = useState(false);
  const router = useRouter();
  const { slug } = router.query;
  const [userProfile, setUserProfile] = useState<any>({});
  const [selectedName, setSelectedName] = useState<string>("");
  const [selectedEmail, setSelectedEmail] = useState<string>("");
  const [selectedMobile, setSelectedMobile] = useState<string>("");
  const [cateringDetails, setCateringDetails] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [prices, setPrices] = useState<any>({});
  const [details, setDetails] = useState<any>({});
  const [count, setCount] = useState(0);
  const [carts, setCarts] = useState<any>([]);
  const [tax, setTax] = useState<any>({});
  const [currentCoordinates, setCurrentCoordinates] = useState<any>({});
  const [locationDetectionAllowed, setLocationDetectionAllowed] =
    useState<any>();
  const [modal, setModal] = useState(false);
  const [temporaryHoldUserSelection, setTemporaryHoldUserSelection] =
    useState<any>(null);

  const [totalInfo, setTotalInfo] = useState<any>({
    totalMaxPrice: "",
    totalSellingPrice: "",
  });
  const { deBounce } = TimingFunctions();
  console.log(cateringDetails);
  const [formData, setFormData] = useState<FormDataTypes>({
    name: "",
    emailId: "",
    contactNo: "",
    bookingDate: "",
    fullAddress: "",
    latitude: "",
    currentaddress: "",
    longitude: "",
    venue: "",
    event: "",
    numberOfMembers: 0,
  });
  const { t } = useTranslation();
  const [selectedPackage, setSelectedPackage] = useState<any>(null);

  const formDataSchema = yup.object().shape({
    numberOfMembers: yup
      .number()
      .required("Number of Members Required")
      .min(
        +cateringDetails?.numberOfMembers || 0,
        "Number members should not be less than selected Package"
      ),
    // event: yup.string().required(),
    // venue: yup.string().required(),
    fullAddress: yup.string().required(),
    bookingDate: yup.string().required(),
    contactNo: yup.string().required(),
    emailId: yup.string().email().required(),
    name: yup.string().required(),
  });
  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    const oldOptions = JSON.parse(localStorage.getItem("catering") || "{}");
    setCateringDetails(oldOptions);
    setFormData((prev) => ({
      ...prev,
      numberOfMembers: Number(oldOptions.members) || 0,
    }));
  }, []);

  useEffect(() => {
    getPrices({
      restaurantId: +cateringDetails.restaurantId,
      menuIndex: +cateringDetails?.menuIndex,
      packageIndex: +cateringDetails?.packageIndex,
      numberOfMembers: +cateringDetails?.members,
    });
  }, [cateringDetails]);

  const getProfile = async () => {
    await getUserProfile()
      .then((res) => {
        if (res) {
          const resData: any = res;
          if (resData.status === 200) {
            let userProfile: any = resData.data ? resData.data : {};
            setSelectedEmail(userProfile?.email);
            setSelectedName(userProfile?.name);
            setSelectedMobile(userProfile?.mobileNumber);
            setUserProfile(userProfile);

            setFormData((prev) => ({
              ...prev,
              emailId: userProfile?.email || "",
              contactNo: userProfile?.mobileNumber || "",
              name: userProfile?.name || "",
            }));
          }
        }
      })
      .catch((error) => console.log(error));
  };
  const getPrices = async (params: any) => {
    const details: any = params;
    await getBookingPrices(details)
      .then((res) => {
        if (res) {
          const resData: any = res;
          console.log(resData);
          if (resData) {
            let prices: any = resData;
            setPrices(prices);
          }
        }
      })
      .catch((error) => console.log(error));
  };
  console.log(prices);
  const updateCart = async () => {
    const res: any = await getCarts();
    setCarts(res.data?.carts || []);
    setTax(res.data?.tax || {});
    setCount(res.data?.carts.length || 0);
    setTotalInfo({
      totalMaxPrice: res.data?.totalMaxPrice,
      totalSellingPrice: res.data?.totalSellingPrice,
    });
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (+formData.numberOfMembers < +cateringDetails.members) {
      toast.error("Number members should not be less than selected Package");
      return;
    }

    formDataSchema
      .validate(formData)
      .then(async (valid: any) => {
        setIsLoading(true);
        // setCateringDetails((prev: any) => {
        //   return { ...prev, ...formData };
        // });
        const params = {
          ...cateringDetails,
          ...formData,
          status: "active",
        };
        const res: any = await bookRestaurant(params);
        setIsLoading(false);
        if (res?.status === 200) {
          router.push(res?.data?.url);
        } else {
          toast.error("Whoops something went wrong!");
        }
      })
      .catch((err: any) => {
        toast.error(err.errors[0]);
      });
  };

  const handleChange = (e: any, key: string) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      [key]: key === FORM_DATA_KEY.NUMBER_OF_MEMBERS ? value : "",
    }));
  };
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowString = tomorrow.toISOString().split("T")[0];

  const onMembersChange = (members: number) => {
    if (+members < +cateringDetails.members) {
      toast.error("Number members should not be less than selected Package");
      return;
    }
    getPrices({
      restaurantId: +cateringDetails.restaurantId,
      menuIndex: +cateringDetails?.menuIndex,
      packageIndex: +cateringDetails?.packageIndex,
      numberOfMembers: +members,
    });
  };

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
    setFormData((prev) => ({
      ...prev,
      fullAddress: address.location,
      latitude: address.latitude,
      longitude: address.longitude,
    }));
  };

  return (
    <form action="">
      <div className="enter_details_main">
        <div className="container">
          <div>
            <h1 className="enter_details_header_main">
              {t("Please Fill up the form")}{" "}
            </h1>
          </div>
          <div className="row enter_details_flex_main">
            <div className="col-12 col-md-6 col-lg-6">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  {t("Name")}
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e: any) => handleChange(e, FORM_DATA_KEY.NAME)}
                  className="form-control"
                  id="name"
                  placeholder="|"
                />
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-6">
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  {t("Email ID")}
                </label>
                <input
                  type="email"
                  value={formData.emailId}
                  onChange={(e: any) => handleChange(e, FORM_DATA_KEY.EMAIL_ID)}
                  className="form-control"
                  placeholder="|"
                />
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-6">
              <div className="mb-3">
                <label htmlFor="contact_number" className="form-label">
                  {t("Contact Number")}
                </label>
                <input
                  type="number"
                  className="form-control"
                  value={formData.contactNo}
                  onChange={(e: any) =>
                    handleChange(e, FORM_DATA_KEY.CONTACT_NO)
                  }
                  placeholder="|"
                />
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-6">
              <div className="mb-3">
                <label htmlFor="contact_number" className="form-label">
                  {t("Date of Event")}
                </label>
                {/* <input
                type="date"
                className="form-control"
                value={formData.bookingDate}
                onChange={(e: any) =>
                  handleChange(e, FORM_DATA_KEY.BOOKING_DATE)
                }
                placeholder="|"
              /> */}
                <input
                  type="date"
                  className="form-control"
                  value={formData.bookingDate}
                  onChange={(e) => handleChange(e, "bookingDate")}
                  placeholder="|"
                  min={tomorrowString} // Set min attribute to tomorrow's date
                />
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-6">
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

              <div className="mb-3">
                <label htmlFor="fullAddress" className="form-label">
                  {t("Full address")}
                </label>
                <div className="full_address_flex">
                  <input
                    id="fullAddress"
                    name="fullAddress"
                    type="text"
                    className="form-control"
                    value={formData.fullAddress}
                    onChange={(e: any) => {
                      handleChange(e, FORM_DATA_KEY.LATITUDE);
                      handleChange(e, FORM_DATA_KEY.LONGITUDE);
                      handleChange(e, FORM_DATA_KEY.FULL_ADDRESS);
                    }}
                    placeholder="|"
                  />
                  <div
                    className="full_address_bg"
                    role="button"
                    onClick={openMap}
                  >
                    <div className="full_address_img_main">
                      <img
                        src="/images/icons/enter_details/routing-2.svg"
                        alt="icon ma"
                      />
                    </div>
                  </div>
                  <Input
                    id="latitude"
                    name="latitude"
                    type="text"
                    hidden
                    value={formData.latitude}
                    onChange={(e: any) =>
                      handleChange(e, FORM_DATA_KEY.LATITUDE)
                    }
                  />
                  <Input
                    id="longitude"
                    name="longitude"
                    type="text"
                    hidden
                    value={formData.longitude}
                    onChange={(e: any) =>
                      handleChange(e, FORM_DATA_KEY.LONGITUDE)
                    }
                  />
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-6">
              <div className="mb-3">
                <label htmlFor="venue" className="form-label">
                  {t("Venue")}
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.venue}
                  onChange={(e: any) => handleChange(e, FORM_DATA_KEY.VENUE)}
                  placeholder="|"
                />
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-6">
              <div className="mb-3">
                <label htmlFor="event" className="form-label">
                  {t("Event")}
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.event}
                  onChange={(e: any) => handleChange(e, FORM_DATA_KEY.EVENT)}
                  placeholder="|"
                />
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-6">
              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center">
                  <label htmlFor="event" className="form-label mt-1">
                    {t("No of members")}
                  </label>
                  {/* <label htmlFor="event" className="form-label m-0">
                  [min <span style={{ color: "#f92323" }}>30</span>]
                </label> */}
                </div>
                <input
                  className="form-select"
                  type="number"
                  value={formData.numberOfMembers}
                  onChange={(e: any) => {
                    handleChange(e, FORM_DATA_KEY.NUMBER_OF_MEMBERS);
                    deBounce(() => {
                      onMembersChange(e.target.value);
                    }, 1000);
                  }}
                  aria-label="Default select example"
                />
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-6"></div>
            <div className="col-12 col-md-6 col-lg-6 d-flex flex-column align-items-end mr-2">
              <div className="d-flex justify-content-between w-25">
                <p className="w-75">Items Price : </p>
                <p style={{ color: "red" }} className="w-25">
                  {(+prices.totalMaxPrice).toFixed(0)}
                </p>
              </div>
              {prices &&
                prices.tax &&
                typeof prices.tax === "object" &&
                Object.keys(prices.tax).map((eachKey) => (
                  <div className="d-flex justify-content-between w-25">
                    <p className="w-75">{eachKey} : </p>
                    <p style={{ color: "red" }} className="w-25">
                      {(+prices.tax[eachKey]).toFixed(0)}
                    </p>
                  </div>
                ))}
              <div className="d-flex justify-content-between w-25">
                <p className="w-75">Total Price : </p>
                <p style={{ color: "red" }} className="w-25">
                  {(+prices.totalSellingPrice).toFixed(0)}
                </p>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <button
              onClick={(e: any) => handleSubmit(e)}
              disabled={isLoading}
              className="text-decoration-none next_btn_main"
              style={{ height: "50px", width: "250px" }}
            >
              {isLoading ? (
                <div style={{ height: "100%" }}>
                  <img
                    src="/images/icons/balloon-loading.gif"
                    alt="loading"
                    style={{ height: "100%", margin: "auto" }}
                  />
                </div>
              ) : (
                `${t("Pay Now")}`
              )}
            </button>
          </div>
          <div className="enter_details_bottom_content_main">
            <p>
              {t(
                "Because we at Balloons Catering Service know you dont want to  regret saying"
              )}
            </p>
            <p>{t("‘Oh! I could have eaten a bit more...’")} </p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default enter_details;
