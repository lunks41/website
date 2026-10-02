import React from "react";
import "./index.scss";
import Link from "next/link";
import googleMaps from "../../../public/images/contactUs/googleMaps.svg";
import serviceRoot from "../../../public/images/contactUs/Content.png";
import whatsApp from "../../../public/images/home/whatsapp.svg";
import InteractiveMap from "@/components/InteractiveMap/InteractiveMap";

const index = () => {
  return (
    <>
      <div className="contactUs">
        <div className="contactDiv">
          <h1 className="sdContent mt-2">Contact Us</h1>
          <p className="sdContent mt-2">
            With Archipelago Middle East Shipping LLC, you can rest assured that
            your vessels will be handled with the utmost care and
            professionalism, minimizing delays and maximizing efficiency at every
            port of call.
          </p>
        </div>

        <div className="contactDiv w-100 mt-5 d-flex flex-column align-items-center justify-center">
          <div className="sideTags">
            <p>Our Branches</p>
          </div>
          <h2 className="sdContent mt-2">
            <b style={{ color: "black" }}>
              From Coast to Coast, Serving Your Shipping Needs:{" "}
            </b>
            Explore Our Branches
          </h2>
        </div>

        <div className="contactCards mt-5 mb-5">
          <div className="myCard p-0">
            <div className="myCardhead">
              <p>Dubai (Head Office)</p>
            </div>

            <div className="cardBody p-3 w-100 d-flex ">
              <div className="addressDiv">
                <div className="cardContentMain w-100 pt-2">
                  <div className="cardContent">
                    <p>
                      <b className="me-2">Address : </b>
                    </p>
                  </div>
                  <div className="myCardPara">
                    <p>
                      Al Zahra Techno Centre, 7th Floor, Office # O-704, Dubai
                    </p>
                  </div>
                </div>
                <br />
                <div className="myCardmiddle mt-0 w-100 d-flex">
                  <div className="cardContentMain" style={{width : "60%"}}>
                    <div className="cardContent">
                      <p>
                        <b className="me-2">Phone Number : </b>
                      </p>
                    </div>
                    <div className="myCardPara">
                      <p>+971 9 2282223 / +971 4 3595895</p>
                    </div>
                  </div>

                  <div className="cardContentMain ms-2" style={{width : "40%"}}>
                    <div className="cardContent">
                      <p>
                        <b className="me-2">Fax Number : </b>
                      </p>
                    </div>
                    <div className="myCardPara">
                      <p>+971 9 2282220</p>
                    </div>
                  </div>
                </div>

                <div className="cardContentMain mt-2 w-100">
                  <div className="cardContent">
                    <p>
                      <b className="me-2">Email Address : </b>
                    </p>
                  </div>
                  <div className="myCardPara">
                    <p>operations@archipelago.ae / archipelago@archipelago.ae</p>
                  </div>
                </div>
              </div>

              <Link
                href="https://www.google.com/maps/place/Scheherazade+Gulf+Gen+Trdg/@25.259457,55.2932521,20.55z/data=!4m9!1m2!2m1!1sAl+Fardan+Exchange+building!3m5!1s0x3e5f43170b63c1a1:0x55cf0dbebe977d6a!8m2!3d25.25932!4d55.29348!16s%2Fg%2F11h_ytx7b9?entry=ttu"
                target="_blank"
                className="locationMark"
              >
                <img src={googleMaps.src} alt="Open in Google Maps" className="w-100" />
              </Link>
            </div>
          </div>

          <div className="myCard p-0">
            <div className="myCardhead">
              <p>Fujairah</p>
            </div>

            <div className="cardBody p-3 w-100 d-flex ">
              <div className="addressDiv">
                <div className="cardContentMain w-100 pt-2">
                  <div className="cardContent">
                    <p>
                      <b className="me-2">Address : </b>
                    </p>
                  </div>
                  <div className="myCardPara">
                    <p>
                      Post Box No. 4878, Archipelago Building, Plot No. 10A -
                      Inside Port Of Fujairah, Fujairah
                    </p>
                  </div>
                </div>

                <div className="myCardmiddle mt-2 w-100 d-flex">
                  <div className="cardContentMain" style={{width : "60%"}}>
                    <div className="cardContent">
                      <p>
                        <b className="me-2">Phone Number : </b>
                      </p>
                    </div>
                    <div className="myCardPara">
                      <p>+971 9 2282223</p>
                    </div>
                  </div>

                  <div className="cardContentMain"  style={{width : "40%"}}>
                    <div className="cardContent">
                      <p>
                        <b className="me-2">Fax Number : </b>
                      </p>
                    </div>
                    <div className="myCardPara">
                      <p>+971 9 2282220</p>
                    </div>
                  </div>
                </div>

                <div className="cardContentMain mt-2 w-100">
                  <div className="cardContent">
                    <p>
                      <b className="me-2">Email Address : </b>
                    </p>
                  </div>
                  <div className="myCardPara">
                    <p>operations@archipelago.ae</p>
                  </div>
                </div>
              </div>

              <Link
                href="https://www.google.com/maps/place/Archipelago+Middle+East+Shipping+LLC/@25.1728756,56.3548302,19z/data=!3m1!4b1!4m14!1m7!3m6!1s0x3ef4318d2f535e2b:0xedf480092bfa007c!2sPort+of+Fujairah!8m2!3d25.1727756!4d56.3635322!16s%2Fg%2F1tdbv707!3m5!1s0x3ef457ee75e5f83d:0xd64b596c57491891!8m2!3d25.1728756!4d56.3554753!16s%2Fg%2F11v_3s8gbk?entry=ttu"
                target="_blank"
                className="locationMark"
              >
                <img src={googleMaps.src} alt="Open in Google Maps" className="w-100" />
              </Link>
            </div>
          </div>

          <div className="myCard p-0">
            <div className="myCardhead">
              <p>Sharjah</p>
            </div>

            <div className="cardBody p-3 w-100 d-flex ">
              <div className="addressDiv">
                <div className="cardContentMain w-100 pt-2">
                  <div className="cardContent">
                    <p>
                      <b className="me-2">Address : </b>
                    </p>
                  </div>
                  <div className="myCardPara">
                    <p>
                      The Khorfakkan Port Office Building Tower, Second Floor
                      Suite No: 206, Khorfakkan
                    </p>
                  </div>
                </div>

                <div className="myCardmiddle mt-2 w-100 d-flex">
                  <div className="cardContentMain" style={{width : "60%"}}>
                    <div className="cardContent">
                      <p>
                        <b className="me-2">Phone Number : </b>
                      </p>
                    </div>
                    <div className="myCardPara">
                      <p>+971 9 2386189</p>
                    </div>
                  </div>

                  <div className="cardContentMain" style={{width : "40%"}}>
                    <div className="cardContent">
                      <p>
                        <b className="me-2">Fax Number : </b>
                      </p>
                    </div>
                    <div className="myCardPara">
                      <p>+971 9 2386198</p>
                    </div>
                  </div>
                </div>

                <div className="cardContentMain mt-2 w-100">
                  <div className="cardContent">
                    <p>
                      <b className="me-2">Email Address : </b>
                    </p>
                  </div>
                  <div className="myCardPara">
                    <p>operations@archipelago.ae</p>
                  </div>
                </div>
              </div>

              <Link
                href="https://www.google.com/maps/search/Khor+Fakkan+port/@25.3463857,56.3649739,56m/data=!3m1!1e3?entry=ttu"
                target="_blank"
                className="locationMark"
              >
                <img src={googleMaps.src} alt="Open in Google Maps" className="w-100" />
              </Link>
            </div>
          </div>

          <div className="myCard p-0">
            <div className="myCardhead">
              <p>Oman</p>
            </div>

            <div className="cardBody p-3 w-100 d-flex ">
              <div className="addressDiv">
                <div className="cardContentMain w-100 pt-2">
                  <div className="cardContent">
                    <p>
                      <b className="me-2">Address : </b>
                    </p>
                  </div>
                  <div className="myCardPara">
                    <p>
                      PO Box 322, Postal Code 311, Office 3218, Port City Sohar
                      Port-Sultanate Of Oman
                    </p>
                  </div>
                </div>

                <div className="myCardmiddle mt-2 w-100 d-flex">
                  <div className="cardContentMain" style={{width : "60%"}}>
                    <div className="cardContent">
                      <p>
                        <b className="me-2">Phone Number : </b>
                      </p>
                    </div>
                    <div className="myCardPara">
                      <p>+966 2 2166940</p>
                    </div>
                  </div>

                  {/* <div className="cardContentMain" style={{width : "40%"}}>
                                <div className="cardContent">
                                    <p>
                                        <b className="me-2">Fax Number : </b>
                                    </p>
                                </div>
                                <div className="myCardPara">
                                    <p>
                                        +971 92282227
                                    </p>
                                </div>
                            </div> */}
                </div>

                <div className="cardContentMain mt-2 w-100">
                  <div className="cardContent">
                    <p>
                      <b className="me-2">Email Address : </b>
                    </p>
                  </div>
                  <div className="myCardPara">
                    <p>omanoperations@archipelago.ae</p>
                  </div>
                </div>
              </div>

              <Link
                href="https://www.google.com/maps/search/po+box+322,postal+code+311/@24.4979398,56.5928751,109m/data=!3m1!1e3?entry=ttu"
                target="_blank"
                className="locationMark"
              >
                <img src={googleMaps.src} alt="Open in Google Maps" className="w-100" />
              </Link>
            </div>
          </div>
        </div>

        <div className="contactDiv w-100 mt-5 d-flex flex-column align-items-center justify-center">
          <div className="sideTags">
            <p>Our Locations</p>
          </div>
          <h3 className="sdContent mt-2">
            <b style={{ color: "black" }}>our location with our </b>Service root
          </h3>
          <p className="w-100 m--2 fw-700 text-center">
            We are providing Our Services to all over the world.
          </p>
          <div className="serviceRoot w-100 mt-5">
            <img src={serviceRoot.src} alt="Archipelago shipping services network" className="w-100" />
            {/* <InteractiveMap /> */}
          </div>
        </div>
      </div>

      <div className="formMain d-flex justify-center align-items-center">
        <div className="formDiv">
          <h2>Inquiry Form:</h2>
          <p>
            Alternatively, you can fill out the inquiry form below, and one of
            our representatives will get back to you as soon as possible.
          </p>
          <div className="formElements">
            <div className="cName">
              <div>
                <p className="m-0">Company Name</p>
              </div>
              <div>
                <input type="text" placeholder="Enter" />
              </div>
            </div>
            <div className="cName">
              <div>
                <p className="m-0">Mobile Number</p>
              </div>
              <div>
                <input type="text" placeholder="+971 0 0000000" />
              </div>
            </div>
          </div>
          <div className="six2two">
            <div className="cName">
              <div>
                <p className="m-0">E mail</p>
              </div>
              <div>
                <input type="email" placeholder="Enter" />
              </div>
            </div>
            <div className="cName">
              <div>
                <p className="m-0">Subject</p>
              </div>
              <div>
                <input type="email" placeholder="Enter" />
              </div>
            </div>
          </div>
          <div className="textDiv w-100">
            <div className="cName">
              <div>
                <p className="m-0">Message</p>
              </div>
              <div className="w-100">
                <textarea
                  name=""
                  id=""
                  cols={30}
                  rows={5}
                  className="w-100"
                ></textarea>
              </div>
            </div>
            <div>
              <p className="m-0 mt-3">
                We look forward to hearing from you and serving your shipping
                needs with professionalism, reliability, and excellence.
              </p>
            </div>
            <Link
              href="https://wa.me/97150433783"
              target="_blank"
              className="w-100 text-decoration-none"
            >
              <div className="w-100 mt-2 whatsapp">
                <img src={whatsApp.src} alt="WhatsApp Icon" />
                <p className="m-0" style={{ color: "#4DC95C" }}>
                  Let's connect on WhatsApp
                </p>
              </div>
            </Link>
            <div className="submitDiv">
              <button className="mt-3">SUBMIT</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
