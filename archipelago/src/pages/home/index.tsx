import React from "react";
import "./index.scss";
import ship from "../../../public/images/home/ship.jpg";
import arrow from "../../../public/images/home/arrow.svg";
import arrow2 from "../../../public/images/home/arrow2.svg";
import client from "../../../public/images/home/client.svg";
import Bookmark from "../../../public/images/home/Bookmark.svg";
import Planet from "../../../public/images/home/Planet.svg";
import barGraph from "../../../public/images/home/barGraph.svg";
import download from "../../../public/images/home/download.svg";
import operational from "../../../public/images/home/operational.svg";
import whatsApp from "../../../public/images/home/whatsapp.svg";
import { useRouter } from "next/router";
import Link from "next/link";
import CorouselComponent from "../../components/archi-corousel/CorouselComp";

const index = () => {
  const router = useRouter();

  const handleBroucherDownload = () => {
    const link = document.createElement('a');
    link.href = '/archipelagoBroucher.pdf';
    link.download = 'Archipelago_Brochure.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <div className="container-fluid p-0 w-100">
        {/* <div className="firstDiv row">
          <div className="fdOne col-md-6">
            <h3 className="fdContent">
              “With a global footprint and a team of experienced professionals,
              <b style={{ color: "#498DAE" }}>
                Archipelago Middle East Shipping LLC
              </b>{" "}
              stands ready to coordinate and deliver spare parts efficiently, no
              matter where you are in the world.“
            </h3>
          </div>
          <div className="fdTwo col-md-6 d-flex justify-content-end">
            <button className="leftArrowBtn">
              <img src={arrow2.src} alt="" />
            </button>
            <button className="leftArrowBtn">
              <img src={arrow.src} alt="" />
            </button>
          </div>
        </div> */}
        <CorouselComponent />
      </div>

      <div className="secondDiv">
        <div className="sdOne w-100">
          <div className="sideTags">
            <p>Who We Are</p>
          </div>
          <h1 className="sdContent">Archipelago Middle East Shipping LLC</h1>
        </div>
        <div className="sdTwo">
          <p>
            The company is completely independent and one of the most reputed,
            leading, and reliable shipping agencies in the United Arab Emirates.
            It is primarily aimed to provide pure and complete ship agency
            services to shipowners, charterers, and managers with a high quality
            of service and expertise attuned to the reality in which we live and
            work.
          </p>
          <p>
            With our strategic office locations close to the commercial ports
            and their terminals throughout the United Arab Emirates, we are able
            to respond quickly and effectively to issues involving your crew and
            your cargo. Our offices are just minutes away from port main gates
            and close to the offices of Port Authorities.
          </p>
          <p>
            The company, managed by an experienced team of qualified, dedicated
            shipping professionals and equipped with the latest information
            technology, is able to work around the clock to ensure that
            operations run smoothly at all ports in the U.A.E.
          </p>
          <p>
            We are partners with you, looking after shipping interests every
            minute of the day and actively focused on bringing innovation and
            cost-effectiveness to your operations.
          </p>
        </div>
      </div>

      <div className="thirdDiv">
        <div className="tdOne">
          <img src={ship.src} alt="Archipelago vessel at sea" />
        </div>
        <div className="tdTwo">
          <div className="sideTags">
            <p>Services</p>
          </div>
          <h2 className="tdContent">
            <b style={{ color: "#F7B200", fontFamily: "Manrope" }}>
              Our Services
            </b>
          </h2>
          <p>
            Our customers benefit from fast, reliable, and accurate
            communication together with a cost-effective, professional service
            and the peace of mind of knowing their ships and cargo are in safe
            hands.
          </p>
          <div className="listParent">
            <div className="listChildOne">
              <ul>
                <li
                  onClick={() => {
                    router.push("/ship-agency");
                  }}
                >
                  Ship Agency
                </li>
                <li
                  onClick={() => {
                    router.push("/marine-services");
                  }}
                >
                  Marine Services
                </li>
                <li
                  onClick={() => {
                    router.push("/crew-changes");
                  }}
                >
                  Crew Change
                </li>
                <li
                  onClick={() => {
                    router.push("/logistics");
                  }}
                >
                  Logistics and Clearance
                </li>
                <li
                  onClick={() => {
                    router.push("/inspection");
                  }}
                >
                  Ship Surveys and Inspection
                </li>
                <li
                  onClick={() => {
                    router.push("/medical-assistance");
                  }}
                >
                  Medical Assistance
                </li>
              </ul>
            </div>
            <div className="listChildTwo">
              <ul>
                <li>Providing mooring masters</li>
                <li>Repairs & Drydocks services</li>
                <li>Salvaging of distressed vessels</li>
                <li>Delivery services</li>
                <li>Land transportation (Car Service)</li>
                <li>Sea transportation (Motor boat services)</li>
              </ul>
            </div>
          </div>
          <button
            onClick={() => {
              router.push("/our-services");
            }}
          >
            Explore More Services
          </button>
        </div>
      </div>

      <div className="fourthDiv">
        <div className="fourOne">
          <div className="sideTags">
            <p>Port Of Attendance</p>
          </div>
          <h2 className="sdContent">
            Our Services are available at but not limited to the following ports
            in U.A.E
          </h2>
        </div>
        <div className="fourTwo">
          <div className="four2one">
            <div className="myCard card">
              <div className="myCardhead card-title">
                <p>ABU DHABI</p>
              </div>
              <div className="myCardList">
                <ul>
                  <li>Abu Dhabi</li>
                  <li>Abu al bukhoosh</li>
                  <li>Das Island</li>
                  <li>Jebel dhanna / ruwais</li>
                  <li>Mina zayed</li>
                  <li>Mussafah</li>
                  <li>mubarras island</li>
                  <li>ruwais (refinery/gasco terminal)</li>
                  <li>ruwais (fertil terminal)</li>
                  <li>umm al nar petroleum port</li>
                  <li>zirku island</li>
                </ul>
              </div>
            </div>
            <div className="myCard card">
              <div className="myCardhead card-title">
                <p>Dubai</p>
              </div>
              <div className="myCardList card-text">
                <ul>
                  <li>Dubai Port</li>
                  <li>Dubai Maritime City Jetty</li>
                  <li>Dubai Maritime City (DMC)</li>
                  <li>Dubai Drydocks</li>
                  <li>Hamriya (Dubai)</li>
                  <li>Jebel Ali</li>
                  <li>Port Rashid</li>
                </ul>
              </div>
            </div>
            <div className="myCard card">
              <div className="myCardhead card-title">
                <p>Sharjah</p>
              </div>
              <div className="myCardList card-text">
                <ul>
                  <li>Hamriyah Port</li>
                  <li>Hamriyah Port & Anchorage</li>
                  <li>Khor Fakkan Port</li>
                  <li>Khor Fakkan Port & Anchorage</li>
                  <li>Port Khalid</li>
                  <li>Port Khalid & Anchorage</li>
                  <li>Sharjah Port</li>
                  <li>Sharjah Offshore Terminal</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="four2Two">
            <div className="myCard card">
              <div className="myCardhead card-title">
                <p>Mina Saqr</p>
              </div>
              <div className="myCardList card-text">
                <ul>
                  <li>Saqr Port</li>
                  <li>Buoy Services</li>
                  <li>RAK Maritime City</li>
                  <li>RAK-SPM</li>
                  <li>LNG Terminal</li>
                </ul>
              </div>
            </div>
            <div className="myCard card">
              <div className="myCardhead card-title">
                <p>Fujairah</p>
              </div>
              <div className="myCardList card-text">
                <ul>
                  <li>Fujairah Port</li>
                  <li>Fujairah Port & Anchorage</li>
                  <li>FOT Terminal</li>
                  <li>Fujairah Port Offshore Anchorage</li>
                  <li>Fujairah STS Operation</li>
                  <li>Vopak Oil Storage Terminal</li>
                  <li>Dibba Port</li>
                  <li>Fujairah Refinery</li>
                  <li>Banana Creek Fujalrah</li>
                </ul>
              </div>
            </div>
            <div className="myCard card">
              <div className="myCardhead card-title">
                <p>Oman</p>
              </div>
              <div className="myCardList card-text">
                <ul>
                  <li>Sohar Port</li>
                  <li>Sohar Port & Anchorage</li>
                  <li>Kasaba Port & Anchorage</li>
                  <li>Muscat Port</li>
                  <li>Sultan Qaboos Port</li>
                  <li>Duqm Port</li>
                  <li>Duqm Port & Anchorage</li>
                  <li>Salalah Port</li>
                  <li>Salalah Port & Anchorage</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fifthDiv">
        <div className="fiveOne">
          <div className="sideTags">
            <p>Our Commitments</p>
          </div>
          <h3 className="sdContent">
            Customer satisfaction is our top priority. We are dedicated to
            meeting and exceeding{" "}
            <b style={{ color: "#0F80B6" }}>our clients' expectations</b> by
            providing high-quality, value-added services tailored to their
            specific needs.
          </h3>
        </div>
        <div className="fiveTwo">
          <div className="five2one">
            <div className="myCard2">
              <div className="myCardhead2">
                <div
                  style={{ backgroundColor: "#F7B20026", marginRight: "10px" }}
                >
                  <img src={client.src} alt="Client-centric approach" />
                </div>
                <p>Client-Centric Approach</p>
              </div>
              <div className="myCardContent">
                <p>
                  We prioritize understanding the unique needs of each client
                  and delivering tailored solutions that exceed their
                  expectations.
                </p>
              </div>
            </div>
            <div className="myCard2">
              <div className="myCardhead2">
                <div
                  style={{ backgroundColor: "#F7B20026", marginRight: "10px" }}
                >
                  <img src={operational.src} alt="Operational excellence" />
                </div>
                <p>Operational Excellence</p>
              </div>
              <div className="myCardContent">
                <p>
                  We maintain a relentless focus on operational excellence,
                  ensuring the safe and efficient operation of vessels under our
                  care.
                </p>
              </div>
            </div>
            <div className="myCard2">
              <div className="myCardhead2">
                <div
                  style={{ backgroundColor: "#F7B20026", marginRight: "10px" }}
                >
                  <img src={Planet.src} alt="Environmental responsibility" />
                </div>
                <p>Environmental Responsibility</p>
              </div>
              <div className="myCardContent">
                <p>
                  We are committed to protecting the environment and minimizing
                  our ecological footprint, adhering to strict environmental
                  standards in all our operations.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="fiveThree">
          <div className="five3one">
            <div className="myCard2">
              <div className="myCardhead2">
                <div
                  style={{ backgroundColor: "#F7B20026", marginRight: "10px" }}
                >
                  <img src={barGraph.src} alt="Continuous improvement" />
                </div>
                <p>Continuous Improvement</p>
              </div>
              <div className="myCardContent">
                <p>
                  We are dedicated to continuous improvement, constantly seeking
                  ways to enhance our services, processes, and capabilities to
                  better serve our clients.
                </p>
              </div>
            </div>
            <div className="myCard2">
              <div className="myCardhead2">
                <div
                  style={{ backgroundColor: "#F7B20026", marginRight: "10px" }}
                >
                  <img src={Bookmark.src} alt="Ethical conduct" />
                </div>
                <p>Ethical Conduct</p>
              </div>
              <div className="myCardContent">
                <p>
                  We promote an organizational culture that values ethical
                  conduct and compliance with maritime regulatory and industrial
                  requirements, ensuring integrity in all our dealings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sixthDiv">
        <div className="sixOne">
          <div className="sideTags">
            <p>let's Connect</p>
          </div>
          <h2 className="sdContent">
            Archipelago{" "}
            <b style={{ color: "black" }}>Middle East Shipping LLC</b>
          </h2>
          <p>
            “We look forward to hearing from you and serving your shipping needs
            with professionalism, reliability, and excellence.”
          </p>
          <h4>Address:</h4>
          <p className="text-capitalize">
          Al Zahra Techno Centre, 7th Floor, Office # O-704, Dubai
          </p>
          <h4>Phone Number (24/7):</h4>
          <p>+971 9 2282223</p>
          <p>+971 4 3595895</p>
          <h4>Email Address:</h4>
          <p>operations@archipelago.ae</p>
          <button onClick={handleBroucherDownload}>
            <img src={download.src} alt="Download company brochure" />
            <p>Download Broucher</p>
          </button>
        </div>
        <div className="sixTwo">
          <h2>Inquiry Form:</h2>
          <p>
            Alternatively, you can fill out the inquiry form below, and one of
            our representatives will get back to you as soon as possible.
          </p>
          <div className="six2one">
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
                <textarea name="" id="" cols={30} rows={5} className="w-100" />
              </div>
            </div>
            <div>
              <p className="m-0 mt-4">
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
              <button className="mt-2">SUBMIT</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
