import React from 'react'
import './index.scss';
import director from "../../../public/images/about/michael.jpg"
import director1 from "../../../public/images/about/anatasia.jpg"
import director2 from "../../../public/images/about/suresh.jpg"
import director3 from "../../../public/images/about/george.jpg"
import director4 from "../../../public/images/about/nibu.jpg"
import director5 from "../../../public/images/about/paulNevin.jpg"
import flowChart from "../../../public/images/about/archiFlowDiaNew.svg"

const index = () => {
  return (
<>
    <div className="abtOne">
        <div className="abtUsDiv">
            <div className="sideTags">
                <p>
                    About Us
                </p>
            </div>
            <h3 className="sdContent mt-2">
                Archipelago Middle East Shipping LLC
            </h3>
        </div>
        <div className="abtUsContent mt-2">
            <p>
                The company is completely independent and one of the most reputed, leading and reliable shipping agencies in United Arab Emirates. It is primarily aimed to provide pure and complete ship agency services to shipowners, charterers and managers with high quality of service and expertise attuned to the reality which we live and work.
            </p>
            <p>
                With our strategic office locations close to the commercial ports and its terminals throughout United Arab Emirates, we are able to respond quickly and effectively to issues involving your crew and your cargo. Our offices are just minutes to go from port main gates and close to the office of Port Authorities.
            </p>
            <p>
                The company managed by an experienced team of qualified, dedicated shipping professionals and equipped
                with the latest information technology, is able to work around the clock to ensure that operations run
                smoothly at all ports in U.A.E.
            </p>
            <p>
                We are partners with you, Looking after shipping interests every minutes of the day and actively focused
                in bringing innovative and cost effective to your operations.
            </p>
            <p>
                Certainly! Here's a brief introduction for the content provided: Welcome to Archipelago Middle East Shipping LLC. a leading shipping agency based in Fujairah, UAE. Since our establishment in 2007, we have been dedicated to providing comprehensive shipping services to the maritime industry while ensuring safe environmental practices. Strategically located in one of the major oil tanker destinations in the world, our company offers a wide range of services including ship agency, marine services, ship supply, crew change, logistics and clearance, ship surveys, and inspection.
            </p>
            <p>
                At Archipelago Middle East Shipping LLC, we pride ourselves on our 24/7 service availability and commitment to meeting the needs of our clients. With our experienced staff and extensive facilities in ports across the UAE and Oman, we strive to ensure smooth operations for vessels entering and leaving port. Additionally, our company is pre-qualified for the Gulf Area, maintaining high standards of in-house resources, experience, and environmental compliance.
            </p>
            <p>
                Our website serves as a gateway to explore our services, vision, mission, core values, and contact information. We invite you to discover how Archipelago Middle East Shipping LLC can meet your shipping needs with efficiency, reliability, and professionalism.
            </p>
        </div>
    </div>

    <div className="abtTwo">
      <div className="sideTags">
        <p className='text-white'>Our Values</p>
      </div>
      <h2 className="guidingPrinciples">
        <b style={{ color: '#F7B200', fontFamily: 'Manrope' }}>Guiding Principles</b>
      </h2>
      <p style={{ color: 'white' }}>
        Through these values, we aim to build a strong and enduring foundation for Archipelago Middle East Shipping LLC, fostering a positive and inclusive work environment while delivering exceptional service and value to our clients and stakeholders.
      </p>

      <div className="abtTwoCards">
        <div className="abtTwoCardsOne">
          <div className="myCard2">
            <div className="myCardhead2">
              <p>Compliance</p>
            </div>
            <div className="myCardContent">
              <p>
                We are committed to promoting an organizational culture that encourages ethical conduct and compliance with maritime regulatory and industrial requirements. Integrity and transparency are at the core of everything we do.
              </p>
            </div>
          </div>
          <div className="myCard2">
            <div className="myCardhead2">
              <p>Entrepreneurship</p>
            </div>
            <div className="myCardContent">
              <p>
                We foster a culture of initiative and innovation, empowering our team members to think creatively, take calculated risks, and explore new opportunities. We systematically manage risks and encourage teamwork and collaboration to drive growth and success.
              </p>
            </div>
          </div>
          <div className="myCard2">
            <div className="myCardhead2">
              <p>Responsibility</p>
            </div>
            <div className="myCardContent">
              <p>
                We prioritize safety at sea, protect the environment, and uphold our social responsibility to the communities in which we operate. We recognize the importance of sustainable practices and strive to minimize our ecological footprint while maximizing positive impact.
              </p>
            </div>
          </div>
          <div className="myCard2">
            <div className="myCardhead2">
              <p>Fairness</p>
            </div>
            <div className="myCardContent">
              <p>
                We treat our clients, employees, and stakeholders with respect and fairness, keeping commitments and maintaining the good reputation of the company. We believe in open communication, honesty, and fairness in all our interactions.
              </p>
            </div>
          </div>
          <div className="myCard2">
            <div className="myCardhead2">
              <p>People-Centric Approach</p>
            </div>
            <div className="myCardContent">
              <p>
                We recognize that our people are essential to our success. We value diversity, reward good performance, and provide opportunities for continuous learning and development. We take pride in our cultural diversity and invest in the well-being and professional growth of our employees.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="abtThree w-100">
        <img src={flowChart.src} alt="" className="w-100" />
    </div>

    <div className="abtFour">
      <div className="abtFourSub">
        <div className="sideTags">
          <p>Our Team</p>
        </div>
        <h3 className="sdContent mt-2">
          <b style={{ color: 'black' }}>United in Expertise, Driven by Dedication:</b><br />
          Meet Our Exceptional Team
        </h3>
      </div>
      <div className="teamMembDiv">
        <div className="director">
          <div className="imgDiv">
            <img src={director4.src} alt="" />
          </div>
          <p className="mt-2 mb-0 fs-6">Mr. Michail Kritikakis</p>
          <p className="cader mt-1 mb-0">Managing Director</p>
        </div>
        <div className="director mt-5">
          <div className="imgDiv">
            <img src={director1.src} alt="" />
          </div>
          <p className="mt-2 mb-0 fs-6">Ms. Anastasia Kritikakis</p>
          <p className="cader mt-1 mb-0">Director</p>
        </div>
        <div className="teamGroup mt-5 d-flex w-100 justify-center align-items-center">
          <div className="director">
            <div className="imgDiv">
              <img src={director2.src} alt="" />
            </div>
            <p className="mt-2 mb-0 fs-6">Mr. Suresh Babu</p>
            <p className="cader mt-1 mb-0">Finance & Administration Manager</p>
          </div>

          <div className="director">
            <div className="imgDiv">
              <img src={director3.src} alt="" />
            </div>
            <p className="mt-2 mb-0 fs-6">Mr. George Thomas</p>
            <p className="cader mt-1 mb-0">Commercial Manager</p>
          </div>

          <div className="director">
            <div className="imgDiv">
              <img src={director.src} alt="" />
            </div>
            <p className="mt-2 mb-0 fs-6">Mr. Nibu Babu</p>
            <p className="cader mt-1 mb-0">Operation Manager</p>
          </div>
          
          <div className="director">
            <div className="imgDiv">
              <img src={director5.src} alt="" />
            </div>
            <p className="mt-2 mb-0 fs-6">Mr. Paul Nevin</p>
            <p className="cader mt-1 mb-0">Technical Manager</p>
          </div>
        </div>
      </div>
    </div>

   
</>
  )
}

export default index