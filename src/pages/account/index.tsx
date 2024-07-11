import {
  useEffect,
  useState,
  useContext,
  ChangeEvent,
  useRef,
  RefObject,
} from "react";
import { AuthContext } from "@/contexts/AuthContext";
import {
  getUserProfile,
  handlePasswordUpdate,
  updateProfile,
} from "@/api/auth";
import { useTranslation } from "react-i18next";

import { uploadFiles } from "@/api/product";
import Link from "next/link";
import { Formik, ErrorMessage } from "formik";
import "./index.scss";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { ParamContext } from "../../contexts/ParamContext";

export default function Account() {
  const { t } = useTranslation();
  const { isAuthenticated } = useContext<any>(AuthContext);
  const [userProfile, setUserProfile] = useState<any>({});
  const [selectedName, setSelectedName] = useState<string>("");
  const [selectedEmail, setSelectedEmail] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | undefined>(undefined);
  const imageUploader: RefObject<HTMLInputElement> = useRef(null);
  const [currentType, setCurrentType] = useState<string>("password");
  const [newType, setNewType] = useState<string>("password");
  const [confirmType, setConfirmType] = useState<string>("password");
  const { updateTransparentHeader } = useContext<any>(ParamContext);

  const passwordSchema = Yup.object().shape({
    currentPassword: Yup.string()
      .min(5, "Password must be at least of 5 characters")
      .required("Password is required"),
    newPassword: Yup.string()
      .min(5, "Password must be at least of 5 characters")
      .required("New password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const onChangeTypeCurrentPassword = () => {
    setCurrentType((prevType) =>
      prevType === "password" ? "text" : "password"
    );
  };

  const onChangeTypeNewPassword = () => {
    setNewType((prevType) => (prevType === "password" ? "text" : "password"));
  };

  const onChangeTypeConfirmPassword = () => {
    setConfirmType((prevType) =>
      prevType === "password" ? "text" : "password"
    );
  };

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedName(e.target.value);
  };

  const handleImageUploadClick = () => {
    imageUploader.current?.click();
  };

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      setImageFile(files[0]);
    } else {
      console.error("No file selected");
      setImageFile(undefined);
    }
  };

  interface passwordReset {
    newPassword: string;
    currentPassword: string;
    confirmPassword: string;
  }
  interface ResData {
    profile: string;
    name: string;
  }

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    updateTransparentHeader(false);
  }, []);

  const getProfile = async () => {
    await getUserProfile()
      .then((res) => {
        if (res) {
          const resData: any = res;
          if (resData.status === 200) {
            let userProfile: any = resData.data ? resData.data : {};
            setSelectedEmail(userProfile?.email);
            setSelectedName(userProfile?.name);
            setUserProfile(userProfile);
          }
        }
      })
      .catch((error) => console.log(error));
  };

  const passwordUpdate = async (values: passwordReset, resetForm: any) => {
    console.log(userProfile.email);
    const details = {
      email: selectedEmail,
      currentPassword: values?.currentPassword,
      newPassword: values?.newPassword,
    };
    await handlePasswordUpdate(details)
      .then((res) => {
        if (res) {
          const resData: any = res;
          if (resData.status === 200) {
            let userProfile: any = resData.data ? resData.data : {};
            if (userProfile?.status === "error") {
              if (userProfile?.message?.code === "auth/wrong-password") {
                toast.error("Password is wrong, pls try again!");
              }
            } else {
              toast.success("Password changed successfully");
            }
            resetForm();
          }
        }
      })
      .catch((error) => console.log(error));
  };

  const uploadFile = async (file: File) => {
    return uploadFiles(file);
  };

  const updateUser = async () => {
    let imageRes: any = {};
    try {
      if (imageFile) {
        const resData: any = await uploadFile(imageFile);
        imageRes.fileName =
          resData?.headers["file-name"] && resData?.headers["file-name"];
      }

      const details = {
        profile: imageRes.fileName,
        name: selectedName,
      };

      const concurrencyStamp = userProfile.concurrencyStamp;

      const res = await updateProfile(details, concurrencyStamp);
      if (res) {
        const resData: any = res;

        if (userProfile?.status === "error") {
          if (userProfile?.message?.code === "profile") {
            toast.error("Profile not upload Successfull");
          }
        } else {
          toast.success("profile updated successfully");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating profile");
    }
  };

  return (
    <div className="my_account_page">
      <div className="container">
        <div className="my_account_header_seciton">
          <h3 className="heading_text">{t('Your Account')} </h3>
          <div className="close_icon_section">
            <Link href="/">
              <img src="/images/icons/CommonIcon/CloseIcon.svg" />
            </Link>
          </div>
        </div>
        <Formik
          initialValues={{
            profile: "",
            name: userProfile?.name || "",
          }}
          onSubmit={updateUser}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <form className="form" onSubmit={handleSubmit}>
              <div className="profile_section">
                <div
                 
                  className="custom_file_profile"
                >
                  <div className="profile_image_div">
                    <div className="profile_image_section">
                      <img
                        src={
                          imageFile
                            ? URL.createObjectURL(imageFile)
                            : userProfile.profileImage
                        }
                      //  alt="profile"
                        className="mx-auto profile_image"
                      />

                      <div className="icon_overlay">
                        <img
                          src="/images/icons/CommonIcon/CameraIcon.svg"
                          alt="profile"
                          className="mx-auto"
                          onClick={handleImageUploadClick}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <input
                  type="file"
                  ref={imageUploader}
                  onChange={handleChangeImage}
                  accept="image/*"
                  hidden
                />
                <h4 className="profile_image_text">{t('Profile Image')} </h4>
                <p className="text">
                 {t('Drag and drop a photo to change the Profile image.')} 
                </p>
              </div>
              <div className="card_section">
                <div className="card_header_section">
                  <h4 className="card_header_text">{t('Personal Information')} </h4>
                  <div className="btn_section">
                    <div id="edit_section">
                      <button className="save_btn btn">{t('Update')} </button>
                    </div>
                    <div id="save_changes_section" style={{ display: "none" }}>
                      <div className="d-flex">
                        <button className="save_btn btn" type="submit">
                         {t('Save changes')} 
                        </button>
                        <button className="cancel_btn btn ms-3">{t('cancel')} </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form_section">
                  <div className="row">
                    <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                      <label htmlFor="email" className="form-label">
                       {t('Email Address')} {" "}
                      </label>
                      <input
                        type="email"
                        className="form-control custom_form_control"
                        id="email"
                        defaultValue="altaf@gmail.com"
                        value={userProfile?.email}
                        disabled
                      />
                    </div>
                    {/* <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3">
                  <label htmlFor="firstName" className="form-label">
                    First name{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control custom_form_control"
                    id="firstName"
                    defaultValue="Shaikh"
                  />
                </div> */}
                    <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                      <label htmlFor="lastName" className="form-label">
                       {t('Name')} 
                      </label>
                      <input
                        type="text"
                        className="form-control custom_form_control"
                        id="name"
                        value={selectedName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          onNameChange(e);
                        }}
                      />
                    </div>
                    <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                      <label htmlFor="phoneNumber" className="form-label">
                       {t('Phone number')} 
                      </label>
                      <input
                        type="text"
                        className="form-control custom_form_control"
                        id="phoneNumber"
                        defaultValue={9890740354}
                        value={userProfile?.mobileNumber}
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          )}
        </Formik>

        <Formik
          initialValues={{
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          }}
          validationSchema={passwordSchema}
          onSubmit={(pValues, { resetForm }) =>
            passwordUpdate(pValues, resetForm)
          }
        >
          {({
            values: pValues,
            errors: pErrors,
            touched,
            handleChange: pHandleChange,
            handleBlur,
            handleSubmit: pHandleSubmit,
          }) => (
            <form className="form" onSubmit={pHandleSubmit}>
              <div className="card_section mt-5">
                <div className="card_header_section">
                  <h4 className="card_header_text">{t('Change password')} </h4>
                  <div className="btn_section">
                    <button className="save_btn btn" type="submit">
                     {t('Change Password')} 
                    </button>
                  </div>
                </div>
                <div className="form_section">
                  <div className="row">
                    <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                      <label htmlFor="currentPassword" className="form-label">
                       {t('Current password')}
                      </label>
                      <div className="input-group">
                        <input
                          type={currentType}
                          className="form-control custom_form_control"
                          aria-label="currentPassword"
                          id="currentPassword"
                          defaultValue={12345}
                          value={pValues.currentPassword}
                          onChange={pHandleChange}
                        />
                        <span className="input-group-text password">
                          {currentType === "password" ? (
                            <AiOutlineEye
                              onClick={onChangeTypeCurrentPassword}
                            />
                          ) : (
                            <AiOutlineEyeInvisible
                              onClick={onChangeTypeCurrentPassword}
                            />
                          )}
                        </span>
                      </div>
                      <div className="errors">{pErrors.currentPassword}</div>
                    </div>
                    <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                      <label htmlFor="newPassword" className="form-label">
                       {t('New password')} 
                      </label>
                      <div className="input-group">
                        <input
                          type={newType}
                          className="form-control custom_form_control"
                          aria-label="newPassword"
                          id="newPassword"
                          defaultValue={12345}
                          value={pValues.newPassword}
                          onChange={pHandleChange}
                        />
                        <span className="input-group-text password">
                          {newType === "password" ? (
                            <AiOutlineEye onClick={onChangeTypeNewPassword} />
                          ) : (
                            <AiOutlineEyeInvisible
                              onClick={onChangeTypeNewPassword}
                            />
                          )}
                        </span>
                      </div>
                      <div className="errors">{pErrors.newPassword}</div>
                    </div>
                    <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4">
                      <label htmlFor="confirmPassword" className="form-label">
                        {t('Confirm password')} 
                      </label>
                      <div className="input-group">
                        <input
                          type={confirmType}
                          className="form-control custom_form_control"
                          id="confirmPassword"
                          aria-label="confirmPassword"
                          defaultValue={12345}
                          value={pValues.confirmPassword}
                          onChange={pHandleChange}
                        />
                        <span className="input-group-text password">
                          {confirmType === "password" ? (
                            <AiOutlineEye
                              onClick={onChangeTypeConfirmPassword}
                            />
                          ) : (
                            <AiOutlineEyeInvisible
                              onClick={onChangeTypeConfirmPassword}
                            />
                          )}
                        </span>
                      </div>
                      <div className="errors">{pErrors.confirmPassword}</div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}
