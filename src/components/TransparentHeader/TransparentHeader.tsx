import React, {
  useRef,
  useState,
  useEffect,
  useContext,
  ChangeEvent,
} from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Badge,
  FormGroup,
  Input,
  Label,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap"; // Import the necessary components from your library

import type { JwtPayload } from "jsonwebtoken";
// import { Link as RouterLink } from 'react-router-dom';
import moment from "moment";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import SimpleReactValidator from "simple-react-validator";
import { toast } from "react-toastify";

import initializeFirebase from "@/config/firebase";

import { CartContext } from "@/contexts/CartContext";
import { AuthContext } from "@/contexts/AuthContext";
import { ParamContext } from "@/contexts/ParamContext";
import { googleAuth, facebookAuth, register, login } from "../../api/auth";
import { addToCart } from "@/api/cart";

import SearchBox from "../SearchBox/SearchBox";

import "./TransparentHeader.scss";
import { getCountries } from "@/api/address";
import {
  getAllUserNotifications,
  updateNotification,
} from "@/api/notification";
import axios from "axios";
import jwt from "jsonwebtoken";

const FORMDATA_KEY = {
  EMAIL: "email",
  PASSWORD: "password",
  PHONE: "mobileNumber",
  NAME: "name",
  COUNTRY_ID: "countryId",
};
interface formDataProps {
  email: string;
  password: string;
  mobileNumber: string;
  name: string;
  role: string;
  countryId: string;
}
interface apiFormDataProps {
  email: string;
  password: string;
  mobileNumber: string;
  name: string;
  role: string;
}

const TransparentHeader = () => {
  const router = useRouter();
  const firebase = initializeFirebase();
  const [, forceUpdate] = useState<number>();
  const validator = useRef(
    new SimpleReactValidator({
      autoForceUpdate: { forceUpdate: () => forceUpdate(1) },
    })
  );
  const { t, i18n } = useTranslation();
  const [dir, setDir] = useState(i18n.dir());
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false);
  const [isCityLoading, setIsCityLoading] = useState<boolean>(false);
  const [isGoogleLogining, setIsGoogleLogining] = useState<boolean>(false);
  const [isFacebookLogining, setIsFacebookLogining] = useState<boolean>(false);
  const [selectedDialCode, setSelectedDialCode] = useState<string>("");
  const [userId, setUserId] = useState();
  const [notifications, setNotifications] = useState([]);
  const [readNotificationsList, setReadNotificationsList] = useState([]);
  const [unreadNotificationsList, setUnreadNotificationsList] = useState([]);
  const [totalCount, setTotalCount] = useState(3);
  const [notificationToggle, setNotificationToggle] = useState(false);

  const {
    doSetUser,
    isAuthenticated,
    logOut,
    me,
    loginOpen,
    setLoginOpen,
    messages,
    handleMessage,
  } = useContext<any>(AuthContext);
  const { count, carts, getAddress, updateCart } = useContext<any>(CartContext);
  const {
    setSelectedCountry,
    selectedCountry,
    selectedCity,
    selectedCountryId,
    setSelectedCity,
    setSelectedCountryId,
    setCityChanged,
    cityChanged,
    cities,
    languages,
    selectedLanguage,
    setSelectedLanguage,
  } = useContext<any>(ParamContext);
  const [isFetchingCountries, setIsFetchingCountries] =
    useState<boolean>(false);
  const loginCloseRef = useRef<any>(null);
  const loginOpenRef = useRef<any>(null);
  const buttonRef = useRef<any>(null);
  const registerCloseRef = useRef<HTMLButtonElement>(null);
  const [countries, setCountries] = useState<any>([]);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const [formData, setFormData] = useState<formDataProps>({
    email: "",
    password: "",
    mobileNumber: "",
    name: "",
    role: "user",
    countryId: "",
  });

  useEffect(() => {
    getAllCountries();
  }, []);
  useEffect(() => {
    getUserNotifications("");
    console.log("get notification called");
  }, [userId]);

  const getUserNotifications = async (token: string) => {
    const details = {
      token,
      pageSize: 50,
      pageNumber: 1,
      userId,
      sorting: [
        {
          key: "createdAt",
          direction: "desc",
        },
      ],
    };
    console.log("details", details);
    const res: any = await getAllUserNotifications(details);
    let notifications: any = res;
    let unreadNotificationsList: any = [];
    let readNotificationsList: any = [];

    notifications &&
      notifications.length > 0 &&
      notifications?.map((each: any) => {
        each?.readStatus === "notRead"
          ? unreadNotificationsList.push(each)
          : readNotificationsList.push(each);
      });
    let total: number = unreadNotificationsList?.length;
    setNotifications(notifications);
    setReadNotificationsList(readNotificationsList);
    setUnreadNotificationsList(unreadNotificationsList);
    setTotalCount(total);
  };

  useEffect(() => {
    if (buttonRef.current) {
      if (buttonRef.current.classList.contains("collapsed")) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    }
  }, [buttonRef.current]);

  const handleToggle = () => {
    if (buttonRef.current) {
      buttonRef.current.classList.toggle("collapsed");
      setIsCollapsed(!isCollapsed);
    }
  };
  const notificationToggleModal = () => {
    setNotificationToggle(!notificationToggle);
  };

  const getAllCountries = async () => {
    setIsFetchingCountries(true);
    const res: any = await getCountries();
    if (res) {
      setSelectedCountryId(
        res?.data && res?.data.length ? res.data[0]?.id : ""
      );
      setFormData((prev) => {
        return {
          ...prev,
          countryId: res?.data && res?.data.length ? res?.data[0].dialCode : "",
        };
      });
      setCountries(res?.data);
    }
    setIsFetchingCountries(false);
  };

  const googleSignIn = async () => {
    setIsGoogleLogining(true);
    setTimeout(() => {
      setIsGoogleLogining(false);
    }, 1000);

    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    signInWithPopup(auth, provider)
      .then(async (result) => {
        const credential: any = GoogleAuthProvider.credentialFromResult(result);

        const { data }: any = await googleAuth({
          userCredential: credential,
        });

        if (data.status === "OK") {
          doSetUser(data.result.user);
          if (!loginCloseRef.current) return;
          loginCloseRef.current.click();
          setLoginOpen(false);
          toast.success("Logged in Successfully!");
          return true;
        }
        toast.error(data.message);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // const email = error.customData.email
        // const credential = GoogleAuthProvider.credentialFromError(error)
        console.log("googleSignInError", errorCode, errorMessage);
      });
  };

  const facebookSignin = async () => {
    setIsFacebookLogining(true);
    setTimeout(() => {
      setIsFacebookLogining(false);
    }, 1000);

    const provider = new FacebookAuthProvider();
    const auth = getAuth();

    signInWithPopup(auth, provider)
      .then(async (result) => {
        const credential: any =
          FacebookAuthProvider.credentialFromResult(result);

        const { data }: any = await facebookAuth({
          userCredential: credential,
        });

        if (data.status === "OK") {
          doSetUser(data.result.user);
          if (!loginCloseRef.current) return;
          loginCloseRef.current.click();
          setLoginOpen(false);
          toast.success("Logged in Successfully!");
          return true;
        }
        toast.error(data.message);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // const email = error.customData.email
        // const credential = FacebookAuthProvider.credentialFromError(error)
        console.log("facebookSignIn Error", errorCode, errorMessage);
      });
  };

  const logout = () => {
    logOut();
    toast.success("Logged out successfully!");
  };

  const handleLanguageChange = (language: any, index: number) => {
    changeLanguage(language.code);
    localStorage.setItem("lang", language.code);
    setSelectedLanguage(languages[index]);
  };

  const handleCountryChange = (e: any, country: any) => {
    e.stopPropagation();
    if (country.id !== selectedCountryId) {
      setIsCityLoading(true);
    }
    setSelectedCountryId(country.id);
  };

  const handleCityChange = (city: any) => {
    if (selectedCity.id === city.id) return;
    setCityChanged(!cityChanged);
    setSelectedCity(city);
    const country = countries.find(
      (item: any) => item.id === selectedCountryId
    );
    setSelectedCountry(country);
    setSelectedDialCode(country?.dialCode);
    localStorage.setItem("city_id", city.id);
    localStorage.setItem("country_id", selectedCountryId);
  };

  const handleSeePassword = (event: any) => {
    const target = event.target.parentNode.parentNode.childNodes[0];
    const type = target.getAttribute("type");
    if (type === "password") {
      target.setAttribute("type", "text");
    } else {
      target.setAttribute("type", "password");
    }
  };

  const handleChangeModal = () => {
    setFormData({
      email: "",
      password: "",
      mobileNumber: "",
      name: "",
      role: "user",
      countryId: formData.countryId,
    });
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>, key: string) => {
    const value = event.target.value;
    if (key === FORMDATA_KEY.COUNTRY_ID) {
      // setSelectedCountryId(Number(value));
    }
    setFormData((prev) => {
      return { ...prev, [key]: value };
    });
  };

  const handleCheckout = () => {
    router.push("/order_delivery");
  };

  const changeLanguage = (locale: string) => {
    i18n.changeLanguage(locale);
    setDir(i18n.dir());
    document.body.dir = i18n.dir();
  };

  const signUp = async () => {
    if (!validator.current.allValid()) {
      return validator.current.showMessages();
    }
    // setIsLoading(true);
    console.log(formData);
    let apiDetails: any = {
      email: formData.email,
      password: formData.password,
      mobileNumber: formData.countryId + formData.mobileNumber,
      name: formData.name,
      role: formData.role,
    };
    const res = await register(apiDetails);
    if (res.status === 201) {
      toast.success("Registered successfully!");
      signIn();
      if (!registerCloseRef.current) return;
      registerCloseRef.current.click();
    } else if (res.response.data.type) {
      const errorMsg = res.response.data.details[0].message;
      if (errorMsg) {
        toast.error(errorMsg);
      }
    }
    setIsLoading(false);
  };

  const handleKeydown = (e: React.KeyboardEvent) => {
    if (e.keyCode === 13) signIn();
  };

  const signIn = async () => {
    if (
      !validator.current.fieldValid("email") ||
      !validator.current.fieldValid("password")
    ) {
      return validator.current.showMessages();
    }
    setIsSigningIn(true);
    const params = {
      email: formData.email,
      password: formData.password,
    };
    const res = await login(params);
    if (res.status === 200) {
      const data = {
        user: res.data,
        token: res.headers.token,
        refresh: res.headers.refresh,
        expires_in: res.headers.expires_in,
      };
      console.log("userinfooo", res?.data?.publicId);
      setUserId(res?.data?.publicId);

      doSetUser(data);
      if (!loginCloseRef.current) return;
      loginCloseRef.current.click();
      setLoginOpen(false);
      toast.success("Logged in Successfully!");
      getAddress();
    } else if (res.response.data.type) {
      const errorMsg = res.response.data.details[0].message;
      if (errorMsg) {
        toast.error(errorMsg);
      }
    }
    setIsSigningIn(false);
  };

  const handleCartRemove = async (cart: any) => {
    const params = {
      productId: cart?.public_id,
      quantity: 0,
    };
    const res: any = await addToCart(params);
    if (res.status === 200) {
      toast.success("Successfully removed!");
    }
    updateCart();
  };

  useEffect(() => {
    setIsCityLoading(false);
  }, [cities]);

  useEffect(() => {
    setDir(i18n.dir());
  }, [selectedLanguage]);

  useEffect(() => {
    if (loginOpen) {
      if (!loginOpenRef.current) return;
      loginOpenRef.current.click();
    }
  }, [loginOpen]);

  const onFacebookLogin = async () => {
    window.open(
      "https://identity-service-test.dezensolutions.com/auth/facebook2",
      "_self"
    );
  };

  const onGoogleLogin = async () => {
    window.open(
      "https://identity-service-test.dezensolutions.com/auth/google2",
      "_self"
    );
  };

  useEffect(() => {
    const { token, provider } = router.query;
    if (token) {
      getUserInfo(token, provider);
    }
  }, [router.query.token]);

  const getUserInfo = (token: any, provider: any) => {
    if (provider == "facebook") {
      setIsFacebookLogining(true);
      setTimeout(() => {
        setIsFacebookLogining(false);
      }, 1000);
    }

    if (provider == "google") {
      setIsGoogleLogining(true);
      setTimeout(() => {
        setIsGoogleLogining(false);
      }, 1000);
    }

    let headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    axios
      .get("https://identity-service-test.dezensolutions.com/user-profile", {
        headers,
      })
      .then((res) => {
        if (res.status == 200) {
          let userInfo = res.data || {};
          userInfo.token = token;
          const data = {
            token: token,
            user: userInfo,
          };
          doSetUser(data);
          getUserNotifications(data?.token);

          if (!loginCloseRef.current) return;
          loginCloseRef.current.click();
          setLoginOpen(false);
          router.push("/");
          toast.success("Logged in Successfully!");
          return true;
        }
        toast.error("Social auth");
      })
      .catch((err) => {
        const errorCode = err.code;
        const errorMessage = err.message;
        console.log("googleSignInError", errorCode, errorMessage);
      });
  };

  let tokenExpiration: any;

  function shouldRefreshToken() {
    const currentTime = new Date();
    return currentTime >= tokenExpiration;
  }

  async function refreshToken() {
    const loginData = localStorage.getItem("login_data");
    if (loginData) {
      const { refresh } = JSON.parse(loginData);
      if (refresh) {
        let headers = {
          "Content-Type": "application/json",
          refresh: refresh,
        };
        const response = await axios.get(
          "https://identity-service-test.dezensolutions.com/token-refresh",
          { headers }
        );

        if (response.status === 200) {
          const { idToken, refreshToken } = response.data;
          const expires_in = response.headers["expires_in"];
          const updatedUserData = {
            ...JSON.parse(loginData),
            token: idToken,
            refresh: refreshToken,
            expires_in: expires_in,
          };
          localStorage.setItem("login_data", JSON.stringify(updatedUserData));
          tokenExpiration = new Date(+expires_in * 1000);
        }
      }
    }
  }

  function initializeTokenExpiration() {
    if (typeof window !== "undefined") {
      const loginData = localStorage.getItem("login_data");
      if (loginData) {
        const { expires_in } = JSON.parse(loginData);
        if (expires_in) {
          tokenExpiration = new Date(+expires_in * 1000);
        }
      }
    }
  }

  initializeTokenExpiration();

  function checkTokenExpirationAndRefresh() {
    if (shouldRefreshToken()) {
      refreshToken();
    }
  }
  // setInterval(checkTokenExpirationAndRefresh, 300000);

  useEffect(() => {
    refreshToken();
    const intervalId = setInterval(refreshToken, 3600000);
    return () => clearInterval(intervalId);
  }, []);

  const handleChangeNotificationDetail = async (each: any) => {
    const details = {
      readStatus: "read",
    };
    // const details1 = {
    //  filters:[
    //   {
    //     key:'publicId',
    //     eq:`${each?.publicId}`
    //   }
    //  ]
    // };
    // const notification: any = await getAllUserNotifications(details1);

    await updateNotification(details, each.publicId, each.concurrencyStamp)
      .then((res: any) => {
        if (res) {
          getUserNotifications("");
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  return (
    <div className={`transparent-header ${dir} `}>
      <div
        className={`header-case1 header-case2 p-2  ${
          isCollapsed ? "open-class" : "closed-class"
        } `}
      >
        <div className=" header-div2">
          <Link className="navbar-brand link1-class" href="/">
            <img src="/images/icons/header_icons/logo.svg" alt="" />
          </Link>

          {/* Register Modal */}
          <div
            className="modal p-0 w-100"
            id="registerModal"
            tabIndex={-1}
            aria-labelledby="registerModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header border-0">
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    ref={registerCloseRef}
                  />
                </div>
                <div className="modal-body">
                  <div className="country_list_inner_div text-center">
                    <label
                      htmlFor="account-dropdown-header"
                      className="dropdown_header"
                    >
                      {t("Create Account")}
                    </label>
                  </div>
                  <div className="container register_section">
                    <div className="row p-3">
                      <div className="col-lg-6 col-sm-12">
                        <button
                          type="submit"
                          className="btn social-btn mb-3 text-start"
                        >
                          <img
                            src="/images/icons/header_icons/google_social_icon.svg"
                            alt=""
                          />
                          <span className="mx-1">{t("GOOGLE")} </span>
                        </button>
                      </div>
                      <div className="col-lg-6 col-s`m-12">
                        <button
                          type="submit"
                          className="btn facebook-btn mb-3 text-start"
                        >
                          <img
                            src="/images/icons/header_icons/facebook_social_icon.svg"
                            alt=""
                          />
                          <span className="mx-1">{t("FACEBOOK")}</span>
                        </button>
                      </div>
                      <div className="d-flex email_login justify-content-between">
                        <span>
                          <hr />
                        </span>
                        <span className="m-2 text-nowrap">{t("Or Email")}</span>
                        <span>
                          <hr />
                        </span>
                      </div>
                      <div className="col-12">
                        <div className="mb-3">
                          <input
                            type="email"
                            className="form-control"
                            value={formData.email}
                            onChange={(e) =>
                              handleChange(e, FORMDATA_KEY.EMAIL)
                            }
                            placeholder={t("Email")!}
                          />
                          {validator.current.message(
                            "email",
                            formData.email,
                            "required|email"
                          )}
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="mb-3">
                          <input
                            type="text"
                            className="form-control"
                            placeholder={t("Name")!}
                            value={formData.name}
                            onChange={(e) => handleChange(e, FORMDATA_KEY.NAME)}
                          />
                          {validator.current.message(
                            "name",
                            formData.name,
                            "required"
                          )}
                        </div>
                      </div>
                      <div className="input-group mb-3">
                        <select
                          id="addressType"
                          className="form-select w_10"
                          value={formData.countryId}
                          onChange={(e: any) =>
                            handleChange(e, FORMDATA_KEY.COUNTRY_ID)
                          }
                        >
                          {countries &&
                            countries.length > 0 &&
                            countries.map((country: any, index: number) => {
                              return (
                                <option
                                  value={country?.dialCode}
                                  key={`dial-item-${index}`}
                                >
                                  + {country?.dialCode}
                                </option>
                              );
                            })}
                        </select>
                        <div className="border-left" />
                        <input
                          type="text"
                          className="form-control w_80"
                          aria-placeholder="9890740354"
                          value={formData.mobileNumber}
                          placeholder={t("Phone Number")!}
                          onChange={(e) => handleChange(e, FORMDATA_KEY.PHONE)}
                        />
                        {validator.current.message(
                          "mobile number",
                          formData.mobileNumber,
                          "required"
                        )}
                      </div>
                      <div className="col-sm-12 col-md-6 col-lg-12 col-xl-12">
                        <div className="input-group mb-3">
                          <input
                            type="password"
                            className="form-control"
                            placeholder={t("Password")!}
                            value={formData.password}
                            onChange={(e) =>
                              handleChange(e, FORMDATA_KEY.PASSWORD)
                            }
                          />
                          <span
                            className="input-group-text password"
                            onClick={(e) => handleSeePassword(e)}
                          >
                            <img
                              src="/images/icons/CommonIcon/EyeIcon.svg"
                              alt="eye"
                              className="mx-auto"
                            />
                          </span>
                        </div>
                        {validator.current.message(
                          "password",
                          formData.password,
                          "required"
                        )}
                      </div>

                      <div className="col-12">
                        <div className="mb-2 text-center">
                          <button
                            type="submit"
                            className="btn create-btn mb-3"
                            disabled={isLoading}
                            onClick={() => signUp()}
                          >
                            {isLoading ? (
                              <div style={{ height: "100%" }}>
                                <img
                                  src="/images/icons/balloon-loading.gif"
                                  alt="loading"
                                  style={{
                                    height: "100%",
                                    margin: "auto",
                                  }}
                                />
                              </div>
                            ) : (
                              t("Create Account")
                            )}
                          </button>
                        </div>
                      </div>
                      <div className="col-12 text-center have-account">
                        <p>
                          {t("Already Have an account?")} &nbsp;
                          <span
                            data-bs-toggle="modal"
                            data-bs-target="#loginModal"
                            onClick={() => handleChangeModal()}
                          >
                            {t("Login")}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Register Modal */}
          {/* Login Modal */}
          <div
            className="modal p-0 w-100"
            id="loginModal"
            tabIndex={-1}
            aria-labelledby="loginModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header border-0">
                  <button
                    type="button"
                    className="btn-close"
                    ref={loginCloseRef}
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={() => setLoginOpen(false)}
                  />
                </div>
                <div className="modal-body">
                  <div className="country_list_inner_div text-center">
                    <label
                      htmlFor="login-dropdown-header"
                      className="dropdown_header"
                    >
                      {t("Login")}
                    </label>
                  </div>
                  <div className="container register_section">
                    <div className="row p-3">
                      <div className="col-lg-6 col-sm-12">
                        <button
                          className="btn social-btn mb-3 text-start"
                          disabled={isGoogleLogining}
                          onClick={onGoogleLogin}
                        >
                          <img
                            src="/images/icons/header_icons/google_social_icon.svg"
                            alt=""
                          />
                          <span className="mx-1"> {t("GOOGLE")} </span>
                        </button>
                      </div>
                      <div className="col-lg-6 col-sm-12">
                        <button
                          className="btn facebook-btn mb-3 text-start"
                          disabled={isFacebookLogining}
                          onClick={onFacebookLogin}
                        >
                          <img
                            src="/images/icons/header_icons/facebook_social_icon.svg"
                            alt=""
                          />
                          <span className="mx-1">{t("FACEBOOK")}</span>
                        </button>
                      </div>
                      <div className="d-flex email_login justify-content-between">
                        <span>
                          <hr />
                        </span>
                        <span className="m-2 text-nowrap">{t("Or Email")}</span>
                        <span>
                          <hr />
                        </span>
                      </div>
                      <div className="col-12">
                        <div className="mb-3">
                          <input
                            type="email"
                            className="form-control"
                            value={formData.email}
                            onKeyDown={(e: any) => handleKeydown(e)}
                            onChange={(e) =>
                              handleChange(e, FORMDATA_KEY.EMAIL)
                            }
                            placeholder={t("Email")!}
                          />
                          {validator.current.message(
                            "email",
                            formData.email,
                            "required|email"
                          )}
                        </div>
                      </div>
                      <div className="col-sm-12 col-md-6 col-lg-12 col-xl-12">
                        <div className="input-group mb-3">
                          <input
                            type="password"
                            className="form-control"
                            placeholder={t("Password")!}
                            onKeyDown={(e: any) => handleKeydown(e)}
                            value={formData.password}
                            onChange={(e) =>
                              handleChange(e, FORMDATA_KEY.PASSWORD)
                            }
                          />
                          <span
                            className="input-group-text password"
                            onClick={(e) => handleSeePassword(e)}
                          >
                            <img
                              src="/images/icons/CommonIcon/EyeIcon.svg"
                              alt="eye"
                              className="mx-auto"
                            />
                          </span>
                        </div>
                        {validator.current.message(
                          "password",
                          formData.password,
                          "required|min:6"
                        )}
                      </div>

                      <div className="remember-forgot d-flex justify-content-between mb-3">
                        <FormGroup check inline>
                          <Input type="checkbox" className="input-check" />
                          <Label check>{t("Remember")}</Label>
                        </FormGroup>

                        <a
                          href="/Forgotpassword"
                          className="forgot-pass-heading"
                        >
                          {t("Forgot Password?")}
                        </a>
                      </div>

                      <div className="col-12">
                        <div className="mb-2 text-center">
                          <button
                            type="submit"
                            className="btn create-btn mb-3"
                            disabled={isSigningIn}
                            onClick={() => signIn()}
                          >
                            {isSigningIn ? (
                              <div style={{ height: "100%" }}>
                                <img
                                  src="/images/icons/balloon-loading.gif"
                                  alt="loading"
                                  style={{
                                    height: "100%",
                                    margin: "auto",
                                  }}
                                />
                              </div>
                            ) : (
                              t("Login")
                            )}
                          </button>
                        </div>
                      </div>
                      <div className="col-12 text-center have-account">
                        <p>
                          {t("Don’t have account yet?")} &nbsp;
                          <span
                            data-bs-toggle="modal"
                            data-bs-target="#registerModal"
                            onClick={() => handleChangeModal()}
                          >
                            {t("Create Account")}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Login Modal */}
          <div className="d-flex align-items-center authenticated-icons-class">
            {isAuthenticated ? (
              <>
                <div className="dropdown-center mx-2 dropdown-white-toggle">
                  <button
                    className="btn p-0"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#staticBackdrop"
                    aria-controls="staticBackdrop"
                  >
                    <img
                      src="/images/icons/header_icons/Shopping_Bag_icon.svg"
                      alt=""
                    />
                    {count > 0 && (
                      <span className="cart-badge d-flex justify-content-center align-items-center">
                        {count}
                      </span>
                    )}
                  </button>
                </div>
                <Dropdown
                  className="notification"
                  isOpen={notificationToggle}
                  toggle={notificationToggleModal}
                >
                  <DropdownToggle className="notification-button">
                    <span className="notification-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="23"
                        height="23"
                        fill="currentColor"
                        className="bi bi-bell"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
                      </svg>
                      {unreadNotificationsList &&
                        unreadNotificationsList.length > 0 && (
                          <>
                            <span className="notification-count">
                              {totalCount ? totalCount : "0"}
                            </span>
                          </>
                        )}
                    </span>
                  </DropdownToggle>
                  <DropdownMenu>
                    <div className=" notification-main-seciton">
                      <div className="notification-header">
                        <div className="left-section">
                          <h6 className=" header-text">Notifications</h6>
                          <p className=" normal-text-header">
                            You have{" "}
                            {unreadNotificationsList &&
                              unreadNotificationsList.length}{" "}
                            unread messages
                          </p>
                        </div>
                        {notifications && notifications.length > 0 && (
                          <>
                            <div className=" right-section">
                              <button
                                className="check-double-fill-button "
                                type="button"
                                onClick={() => {
                                  //      this.vendorUpdateNotifiations();
                                }}
                              >
                                <img src="/images/icons/make_your_own_plan/arrowNext.svg" />
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                      <div>
                        <ul
                          className="notification-list"
                          style={{ padding: 2 }}
                        >
                          <li className="list-sub-header">NEW</li>
                          {unreadNotificationsList &&
                          unreadNotificationsList.length > 0 ? (
                            <>
                              {unreadNotificationsList &&
                                unreadNotificationsList.length > 0 &&
                                unreadNotificationsList.map(
                                  (eachNotification: any) => {
                                    return (
                                      <>
                                        <li
                                          className="notification-list-li-open "
                                          onClick={() => {
                                            handleChangeNotificationDetail(
                                              eachNotification
                                            );
                                            if (
                                              eachNotification?.notificationType ===
                                              "newOrder"
                                            ) {
                                              router.push(
                                                `/order-detail/${eachNotification?.notificationId}`
                                              );
                                              // navigate({
                                              //   pathname:
                                              //     user?.role === "supplier"
                                              //       ? "/chat"
                                              //       : "/settings",
                                              //   search: `?supplierId=${eachNotification?.notificationId}&status=Notifications`,
                                              // });
                                            }
                                            notificationToggleModal();
                                          }}
                                        >
                                          <div className=" notification-list-item ">
                                            <h6 className="list-item-h6">
                                              {eachNotification?.notificationType &&
                                                eachNotification?.notificationType}
                                              <span className=" normal-text">
                                                &nbsp;{" "}
                                                {eachNotification?.message}
                                              </span>
                                            </h6>
                                            {eachNotification.createdAt &&
                                              eachNotification.createdAt && (
                                                <span className="list-item-timeline">
                                                  {moment(
                                                    eachNotification.createdAt
                                                  ).format(
                                                    "MMMM Do YYYY, h:mm:ss a"
                                                  )}
                                                </span>
                                              )}
                                          </div>
                                        </li>
                                      </>
                                    );
                                  }
                                )}
                            </>
                          ) : (
                            <li className="notification-list-li ">
                              <div className=" notification-list-item ">
                                <h6 className="list-item-h6">
                                  Notification not available
                                </h6>
                              </div>
                            </li>
                          )}
                        </ul>
                        <ul
                          className=" notification-list"
                          style={{ padding: 2 }}
                        >
                          <li className="list-sub-header">BEFORE THAT</li>
                          {readNotificationsList &&
                          readNotificationsList.length > 0 ? (
                            <>
                              {readNotificationsList &&
                                readNotificationsList.length > 0 &&
                                readNotificationsList.map(
                                  (eachNotification: any) => {
                                    return (
                                      <>
                                        <li
                                          onClick={() => {
                                            handleChangeNotificationDetail(
                                              eachNotification
                                            );
                                            if (
                                              eachNotification?.notificationType ===
                                              "newOrder"
                                            ) {
                                              router.push(
                                                `/order-detail/${eachNotification?.notificationId}`
                                              );
                                              // navigate({
                                              //   pathname:
                                              //     user?.role === "supplier"
                                              //       ? "/chat"
                                              //       : "/settings",
                                              //   search: `?supplierId=${eachNotification?.notificationId}&status=Notifications`,
                                              // });
                                            }
                                            notificationToggleModal();
                                          }}
                                          className="notification-list-li "
                                        >
                                          {eachNotification &&
                                            console.log(
                                              "eachNot",
                                              eachNotification
                                            )}
                                          <div className=" notification-list-item ">
                                            <h6 className="list-item-h6">
                                              {eachNotification.notificationType &&
                                                eachNotification.notificationType}
                                              <span className=" normal-text">
                                                &nbsp;{" "}
                                                {eachNotification.message}
                                              </span>
                                            </h6>
                                            {eachNotification.createdAt &&
                                              eachNotification.createdAt && (
                                                <span className="list-item-timeline">
                                                  {moment(
                                                    eachNotification.createdAt
                                                  ).format(
                                                    "MMMM Do YYYY, h:mm:ss a"
                                                  )}
                                                </span>
                                              )}
                                          </div>
                                        </li>
                                      </>
                                    );
                                  }
                                )}
                            </>
                          ) : (
                            <li className="notification-list-li ">
                              <div className=" notification-list-item ">
                                <h6 className="list-item-h6">
                                  Notification not available
                                </h6>
                              </div>
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </DropdownMenu>
                </Dropdown>
                {/* <div className="btn-group bell-btn me-2 ">
                  <button
                    type="button"
                    className={`btn p-0 dropdown-toggle ${messages && messages.length > 0 && "ringing"
                      }`}
                    data-bs-toggle="dropdown"
                    data-bs-display="static"
                    aria-expanded="false"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="23"
                      height="23"
                      fill="currentColor"
                      className="bi bi-bell"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
                    </svg>
                    {notifications && notifications.length > 0}
                    <div className="new-msg d-flex justify-content-center align-items-center">
                      {notifications.length}
                    </div>


                  </button>
                  <div
                    className={`dropdown-menu mt-4 profile_menu`}
                  >
                    <li>
                      <label
                        htmlFor="user-profile"
                        className="user-profile-label ms-3"
                      >
                        {t("Hi,")}{" "}
                        {me.token ? me.user.name : me?.displayName}
                      </label>
                    </li>
                    <li>
                      <hr className="dropdown-divider w-70" />
                    </li>
                    {notifications &&
                      notifications.length > 0 &&
                      notifications.map((notification: any, index: number) => {
                        return (
                          <Link
                            onClick={(e: any) => e.stopPropagation()}
                            href="#"
                            key={`message-item-${index}`}
                            className="text-decoration-none cursor-pointer dropdown-item d-flex align-items-center justify-content-between"
                          >
                            <div>
                              <img
                                src="/images/icons/header_icons/User_icon.svg"
                                alt=""
                                style={{ cursor: "pointer" }}
                              />

                              <label
                                htmlFor="profile-label"
                                className="profile-label m-2"
                                style={{ cursor: "pointer" }}
                              >
                                {notification?.message}
                              </label>
                            </div>

                            <div className="align-items-center message-btn">
                              <button
                                onClick={() =>
                                  handleMessage(index, "delete")
                                }
                                className="btn p-0"
                                title="Delete"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  fill="currentColor"
                                  className="mt-1 mx-2 bi bi-trash"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                </svg>
                              </button>

                              <button
                                onClick={() =>
                                  handleMessage(index, "read")
                                }
                                className="btn p-0"
                                title="Mark as read"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  fill="currentColor"
                                  className="mx-1 bi bi-envelope-open"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M8.47 1.318a1 1 0 0 0-.94 0l-6 3.2A1 1 0 0 0 1 5.4v.817l5.75 3.45L8 8.917l1.25.75L15 6.217V5.4a1 1 0 0 0-.53-.882l-6-3.2ZM15 7.383l-4.778 2.867L15 13.117V7.383Zm-.035 6.88L8 10.082l-6.965 4.18A1 1 0 0 0 2 15h12a1 1 0 0 0 .965-.738ZM1 13.116l4.778-2.867L1 7.383v5.734ZM7.059.435a2 2 0 0 1 1.882 0l6 3.2A2 2 0 0 1 16 5.4V14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5.4a2 2 0 0 1 1.059-1.765l6-3.2Z" />
                                </svg>
                              </button>
                            </div>
                          </Link>
                        );
                      })}
                  </div>
                </div> */}
                <div className="btn-group">
                  <button
                    type="button"
                    className="btn p-0 dropdown-toggle dropdown-white-toggle"
                    data-bs-toggle="dropdown"
                    data-bs-display="static"
                    aria-expanded="false"
                  >
                    <img
                      src="/images/icons/header_icons/User_icon.svg"
                      alt=""
                    />
                    <img
                      src="/images/icons/dropdown.svg"
                      className="mx-1"
                      alt="dropdown"
                    />
                  </button>
                  <div
                    className={`dropdown-menu dropdown-menu-end mt-4 profile_menu`}
                  >
                    <li>
                      <label
                        htmlFor="user-profile-label"
                        className="user-profile-label ms-3"
                      >
                        {t("Hi,")}{" "}
                        {me?.token ? me?.user?.name : me?.displayName}
                      </label>
                    </li>
                    <li>
                      <hr className="dropdown-divider w-70" />
                    </li>
                    <li>
                      <Link
                        href="/account"
                        className="text-decoration-none cursor-pointer dropdown-item"
                      >
                        <img
                          src="/images/icons/header_icons/User_icon.svg"
                          alt=""
                          style={{ cursor: "pointer" }}
                        />
                        <label
                          htmlFor="profile-label"
                          className="profile-label m-2"
                          style={{ cursor: "pointer" }}
                        >
                          {t("My Account")}
                        </label>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/favorites"
                        className="text-decoration-none cursor-pointer dropdown-item"
                      >
                        <img
                          src="/images/icons/good/discription.svg"
                          alt=""
                          style={{ cursor: "pointer" }}
                        />
                        <label
                          htmlFor="profile-label"
                          className="profile-label m-2"
                          style={{ cursor: "pointer" }}
                        >
                          {t("My Favorites")}
                        </label>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/occasion"
                        className="text-decoration-none dropdown-item"
                      >
                        <img
                          src="/images/icons/header_icons/Ocasion.svg"
                          alt=""
                          style={{ cursor: "pointer" }}
                        />
                        <label
                          htmlFor="profile-label"
                          className="profile-label m-2"
                          style={{ cursor: "pointer" }}
                        >
                          {t("Occasions")}
                        </label>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/address"
                        className="text-decoration-none dropdown-item"
                      >
                        <img
                          src="/images/icons/header_icons/profile_map.svg"
                          alt=""
                          style={{ cursor: "pointer" }}
                        />
                        <label
                          htmlFor="profile-label"
                          className="profile-label m-2"
                          style={{ cursor: "pointer" }}
                        >
                          {t("Addresses")}
                        </label>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/order"
                        className="text-decoration-none dropdown-item"
                      >
                        <img
                          src="/images/icons/header_icons/box-tick.svg"
                          alt=""
                          style={{ cursor: "pointer" }}
                        />
                        <label
                          htmlFor="profile-label"
                          className="profile-label m-2"
                          style={{ cursor: "pointer" }}
                        >
                          {t("Orders")}
                        </label>
                      </Link>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        type="button"
                        onClick={logout}
                      >
                        <img
                          src="/images/icons/header_icons/logout.svg"
                          alt=""
                        />
                        <label className="profile-label m-2">
                          {t("Logout")}
                        </label>
                      </button>
                    </li>
                  </div>
                </div>
              </>
            ) : (
              <div className="dropdown-center mx-2 dropdown-white-toggle">
                <button
                  className="btn p-0"
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#loginModal"
                  ref={loginOpenRef}
                  id="open_modal"
                >
                  <img src="/images/icons/header_icons/User_icon.svg" alt="" />
                </button>
              </div>
            )}

            <nav className="navbar navbar-expand-lg navbar-width">
              <button
                ref={buttonRef}
                className="navbar-toggler  toggler-1"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
                onClick={handleToggle}
              >
                <span className="navbar-toggler-icon" />
              </button>
            </nav>
          </div>
        </div>
        <div
          className={`header-div1 d-flex justify-content-between align-items-center ${
            selectedLanguage?.code === "ar"
              ? "paddingRightClass"
              : "paddingLeftClass"
          }`}
        >
          <Link className="navbar-brand link2-class ps-5 ms-4" href="/">
            <img src="/images/icons/header_icons/logo.svg" alt="" />
          </Link>
          <div className="search-and-language-and-country">
            <nav className="navbar navbar-expand-lg navbar-width">
              <button
                ref={buttonRef}
                className="navbar-toggler toggler-2 "
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
                onClick={handleToggle}
              >
                <span className="navbar-toggler-icon" />
              </button>

              <div className="collapse navbar-collapse" id="navbarNav">
                <div className="px-4 header_search mt-4">
                  <div className="row gx-3 gy-3 align-items-center">
                    {/* <div className="col-lg-6 col-sm-12 search_section ms-lg-5 p-0">
                      <SearchBox />
                    </div> */}
                    <div className="col country_dropdown_section p-0">
                      <div className="p-1 d-flex flex-wrap gap-1 justify-content-center justify-content-lg-end justify-content-md-end  align-items-center justify-content-sm-center">
                        <label
                          htmlFor="dropdown_label"
                          className="dropdown_label dropdown-toggle color-white"
                          data-bs-toggle="dropdown"
                          data-bs-display="static"
                          aria-expanded="false"
                        >
                          {selectedLanguage.name}
                          <img
                            src="/images/icons/dropdown.svg"
                            className="mx-1"
                            alt="dropdown"
                          />
                          <div
                            className={`dropdown-menu dropdown-menu-end  mt-4 profile_menu language-menu`}
                          >
                            <li>
                              <label
                                htmlFor="select-language"
                                className="user-profile-label ms-3"
                              >
                                {t("Select language")}
                              </label>
                            </li>
                            <li>
                              <hr className="dropdown-divider w-70" />
                            </li>
                            {languages.map((language: any, index: number) => {
                              return (
                                <li
                                  className="px-3 py-1 language-item"
                                  style={{ cursor: "pointer" }}
                                  key={`language-item-${index}`}
                                  onClick={() =>
                                    handleLanguageChange(language, index)
                                  }
                                >
                                  {language.img}
                                  <label
                                    htmlFor="profile"
                                    className="profile-label m-2"
                                  >
                                    {language.name}
                                  </label>
                                </li>
                              );
                            })}
                          </div>
                        </label>
                        <label htmlFor="pipe">|</label>
                        <div className="dropdown-lg-center">
                          <button
                            className="btn p-0 dropdown-toggle country_transparent_name_label d-flex align-items-center gap-1 text-uppercase"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <img
                              className="usa-flag mx-1 rounded-circle"
                              src={selectedCountry.image}
                              alt=""
                            />
                            <span>{selectedCity?.name}</span>
                            <img
                              src="/images/icons/dropdown.svg"
                              alt="dropdown"
                              className="dropdown-white-image"
                            />
                          </button>
                          <div className="dropdown-menu dropdown-menu-sm-start dropdown-menu-lg-end country_list my-2 p-0">
                            <div className="d-flex justify-content-between country_list_inner_div">
                              <div>
                                <label
                                  htmlFor="country-dropdown"
                                  className="dropdown_header"
                                >
                                  {t("Choose Country")}
                                </label>
                                <p className="dropdown_question">
                                  {t(
                                    "Which country would you like to send a gift to?"
                                  )}
                                </p>
                              </div>
                              <div>
                                <img
                                  src="/images/icons/header_icons/dropdown_cross.svg"
                                  alt=""
                                />
                              </div>
                            </div>
                            <div
                              className="container text-center"
                              style={{ paddingInline: "40px" }}
                            >
                              <div className="row g-3">
                                {countries &&
                                  countries?.length > 0 &&
                                  countries.map(
                                    (country: any, index: number) => {
                                      return (
                                        <div
                                          className="col-lg-3 col-sm-6"
                                          key={`country-item-${index}`}
                                          onClick={(e: any) =>
                                            handleCountryChange(e, country)
                                          }
                                        >
                                          <div className="flag_icon country-flag">
                                            <img src={country.image} alt="" />
                                            <p className="m-0 text-uppercase">
                                              {country.name}
                                            </p>
                                          </div>
                                        </div>
                                      );
                                    }
                                  )}
                              </div>
                            </div>
                            <div className="country_list_inner_div choose-city">
                              <label
                                htmlFor="choose-city"
                                className="dropdown_header"
                              >
                                {t("Choose City for Delivery")}
                              </label>
                            </div>
                            <div className="container text-center mb-3 delivery-city">
                              <div className="row g-4">
                                {isCityLoading &&
                                  [...Array(8)].map((el, index) => (
                                    <div
                                      key={`skeleton-${index}`}
                                      className="text-center col-lg-3 col-sm-6 py-2"
                                    >
                                      <Skeleton height="86px" width="85px" />
                                      <Skeleton
                                        height="15px"
                                        width="85px"
                                        className="mt-3"
                                      />
                                    </div>
                                  ))}
                                {!isCityLoading &&
                                  cities.length > 0 &&
                                  cities.map((city: any, index: number) => {
                                    return (
                                      <div
                                        className="col-lg-3 col-sm-6"
                                        key={`city-item-${index}`}
                                        onClick={() => handleCityChange(city)}
                                      >
                                        <div className="flag_icon">
                                          <img
                                            src={
                                              city.image
                                                ? city.image
                                                : `/images/icons/header-icons/riyadh_img.png`
                                            }
                                            alt="city"
                                          />
                                          <p className="m-0">{city.name}</p>
                                        </div>
                                      </div>
                                    );
                                  })}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>

      <div
        className="offcanvas offcanvas-start"
        data-bs-backdrop="static"
        tabIndex={-1}
        id="staticBackdrop"
        aria-labelledby="staticBackdropLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="staticBackdropLabel">
            {t("Your Cart")}
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          />
        </div>
        <div className="offcanvas-body">
          <div>
            <label htmlFor="cart-length">
              {carts.length} {t("Items")}
            </label>
            <hr />
            {carts.map((cart: any, index: number) => {
              return (
                <div
                  className="d-flex justify-content-between align-items-center my-3"
                  key={`cart-item-${index}`}
                >
                  <div className="d-flex gap-2">
                    <img
                      className="img-fluid cart-item-img"
                      src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}/${cart.image}`}
                      style={{ minWidth: "40px", maxHeight: "40px" }}
                      alt="cart"
                    />
                    <div>
                      <label htmlFor="cart-title" className="cart_item_name">
                        {cart.title}
                      </label>
                      <p className="p-0 m-0 cart_item_price">
                        {cart.totalSellingPrice} {t("SAR")}
                      </p>
                    </div>
                  </div>
                  <button
                    className="btn-fresh bg-transparent"
                    onClick={() => handleCartRemove(cart)}
                  >
                    <img src="/images/icons/cart/delete.svg" alt="" />
                  </button>
                </div>
              );
            })}
          </div>
          <hr />
          <div className="d-flex gap-3">
            <button
              className="btn check_out_btn btn-close"
              data-bs-dismiss="offcanvas"
              disabled={carts.length === 0}
              aria-label="Close"
              onClick={() => handleCheckout()}
            >
              {t("Check out now")}
            </button>
            <button
              className="btn shopping_btn"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            >
              {t("Continue shopping")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransparentHeader;
