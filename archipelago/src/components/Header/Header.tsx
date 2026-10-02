import React, { useState, useRef } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import "./Header.scss";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";

const Header = () => {
  type NavItems = {
    home: boolean;
    aboutUs: boolean;
    ourService: boolean;
    visionMission: boolean;
    media: boolean;
    career: boolean;
    safetyProtocols: boolean;
    contactUs: boolean;
  };
  const [navItems, setNavItems] = useState<NavItems>({
    home: true,
    aboutUs: false,
    ourService: false,
    visionMission: false,
    media: false,
    career: false,
    safetyProtocols: false,
    contactUs: false
  });
  const [selectedNavItem, setSelectedNavItem] = useState("home");
  const { t } = useTranslation();
  const router = useRouter();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  const handleMouseEnter = () => {
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setDropdownOpen(false);
  };
  {console.log("nav-item", navItems)}


  return (
    <div>
      <nav className="navbar w-100 navbar-expand-lg navbar-light">
        <div className="container-fluid w-100 d-flex justify-content-between">
          <Link className="navbar-brand me-5" href="/">
            <img src="/images/icons/header_icons/logo.svg" alt="Archipelago Middle East Shipping LLC" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="myNavbar collapse navbar-collapse"
            id="navbarSupportedContent"
          >
            <ul className="myNavbarul navbar-nav ml-auto">
              <li className="nav-item">
                <Link className={ navItems.home === true ? "linkSelected nav-link" : "nav-link"} href="/home"  onClick={() => {
                setNavItems(prev => ({
                  ...prev,
                  home: true,
                  [selectedNavItem]: false
                }));
               }}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className={navItems.aboutUs === true ?  "linkSelected nav-link" : "nav-link"} href="/about" onClick={() => {
                setNavItems(prev => ({
                  ...prev,
                  aboutUs: true,
                  [selectedNavItem]: false
                }));
                setSelectedNavItem("aboutUs");
                }}>
                  About Us
                </Link>
              </li>
              <Dropdown
                className="myDropdown pt-3 pb-3"
                isOpen={dropdownOpen}
                toggle={toggleDropdown}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <DropdownToggle
                  className="myDropdownToggle"
                  caret
                  size="sm"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {t("Our Services")}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem
                    onClick={() => {
                      router.push("/our-services");
                    }}
                    className="myDropdownItem"
                  >
                    All Services
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      router.push("/ship-agency");
                    }}
                    className="myDropdownItem"
                  >
                    Ship Agency
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      router.push("/marine-services");
                    }}
                    className="myDropdownItem"
                  >
                    Marine Services
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      router.push("/ship-supply");
                    }}
                    className="myDropdownItem"
                  >
                    Ship Supply
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      router.push("/crew-changes");
                    }}
                    className="myDropdownItem"
                  >
                    Crew Changes
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      router.push("/logistics");
                    }}
                    className="myDropdownItem"
                  >
                    Logistics and Clearance
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      router.push("/inspection");
                    }}
                    className="myDropdownItem"
                  >
                    Ship Surveys and Inspection
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      router.push("/medical-assistance");
                    }}
                    className="myDropdownItem"
                  >
                    Medical Assistance
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <li className="nav-item">
                <Link className={navItems.visionMission === true ?  "linkSelected nav-link" : "nav-link"} href="/vission-mission" onClick={() => {
                setNavItems(prev => ({
                  ...prev,
                  visionMission: true,
                  [selectedNavItem]: false
                }));
                setSelectedNavItem("visionMission");
                }}>
                  Vision & Mission
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link className={navItems.media === true ?  "linkSelected nav-link" : "nav-link"} href="/media" onClick={() => {
                setNavItems(prev => ({
                  ...prev,
                  media: true,
                  [selectedNavItem]: false
                }));
                setSelectedNavItem("media");
                }}>
                  Media
                </Link>
              </li> */}
              <li className="nav-item">
                <Link className={navItems.career === true ?  "linkSelected nav-link" : "nav-link"} href="/career" onClick={() => {
                setNavItems(prev => ({
                  ...prev,
                  career: true,
                  [selectedNavItem]: false
                }));
                setSelectedNavItem("career");
                }}>
                  Career
                </Link>
              </li>
              <li className="nav-item">
                <Link className={navItems.safetyProtocols === true ?  "linkSelected nav-link" : "nav-link"} href="/safety-protocols" onClick={() => {
                setNavItems(prev => ({
                  ...prev,
                  safetyProtocols: true,
                  [selectedNavItem]: false
                }));
                setSelectedNavItem("safetyProtocols");
                }}>
                  Safety Protocols
                </Link>
              </li>
              <li className="nav-item">
                <Link className={navItems.contactUs === true ?  "linkSelected nav-link" : "nav-link"} href="/contact-us" onClick={() => {
                setNavItems(prev => ({
                  ...prev,
                  contactUs: true,
                  [selectedNavItem]: false
                }));
                setSelectedNavItem("contactUs");
                }}>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
