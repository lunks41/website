import React from 'react'
import "./index.scss"
import client from "../../../public/images/home/client.svg"
import Bookmark from "../../../public/images/home/Bookmark.svg"
import Planet from "../../../public/images/home/Planet.svg"
import barGraph from "../../../public/images/home/barGraph.svg"
import operational from "../../../public/images/home/operational.svg"

const index = () => {
  return (
<>
    <div className="visAndMis">
        <div className="visDiv">
            <h3 className="sdContent mt-2">
                Our Vision
            </h3>
        </div>
        <div className="visContent mt-2">
            <p>
                At Archipelago Middle East Shipping LLC, we aspire to be the premier company in the Arabian Gulf, setting the standard for excellence in the global maritime and oil industries. We envision ourselves as the go-to provider for one-stop services, particularly in de-slopping operations, offering competitive pricing coupled with an unwavering commitment to reliability and efficiency.
            </p>
            <p>
                Driven by our dedication to environmental stewardship and operational excellence, we aim to lead by example, demonstrating best practices in every aspect of our operations. Our vision encompasses not only meeting but exceeding the expectations of our clients, partners, and stakeholders, establishing Archipelago Middle East Shipping LLC as a trusted and respected leader in the maritime sector.
            </p>
            <p>
                Through innovation, continuous improvement, and a relentless pursuit of customer satisfaction, we endeavor to shape the future of shipping services in the region, contributing positively to the growth and sustainability of the maritime industry. With a focus on safety, quality, and environmental responsibility, we strive to create a brighter and more prosperous future for all those we serve.
            </p>
        </div>
    </div>

    <div className="visAndMisTwo">
        <div className="visDiv">
            <h3 className="sdContent2 mt-2">
                Mission
            </h3>
        </div>
        <div className="visContent mt-2">
            <p>
                At Archipelago Middle East Shipping LLC, we aspire to be the premier company in the Arabian Gulf, setting the standard for excellence in the global maritime and oil industries. We envision ourselves as the go-to provider for one-stop services, particularly in de-slopping operations, offering competitive pricing coupled with an unwavering commitment to reliability and efficiency.
            </p>

            <div className="visContentSub">
                <p>
                    Our mission encompasses several key principles:
                </p>
                <div className="visContentCards">
                    <div className="myCard2">
                    <div className="myCardhead2">
                        <div style={{ backgroundColor: '#F7B20026', marginRight: '10px' }}>
                            <img src={client.src} alt="" />
                        </div>
                        <p>Client-Centric Approach</p>
                    </div>
                        <div className="myCardContent">
                            <p>
                                We prioritize understanding the unique needs of each client and delivering tailored
                                solutions that exceed their expectations.
                            </p>
                        </div>
                    </div>

                    <div className="myCard2">
                    <div className="myCardhead2">
                        <div style={{ backgroundColor: '#F7B20026', marginRight: '10px' }}>
                            <img src={operational.src} alt="" />
                        </div>
                        <p>Operational Excellence</p>
                    </div>
                        <div className="myCardContent">
                            <p>
                                We maintain a relentless focus on operational excellence, ensuring the safe and efficient
                                operation of vessels under our care.
                            </p>
                        </div>
                    </div>

                    <div className="myCard2">
                    <div className="myCardhead2">
                        <div style={{ backgroundColor: '#F7B20026', marginRight: '10px' }}>
                            <img src={Planet.src} alt="" />
                        </div>
                        <p>Environmental Responsibility</p>
                    </div>
                        <div className="myCardContent">
                            <p>
                                We are committed to protecting the environment and minimizing our ecological footprint,
                                adhering to strict environmental standards in all our operations.
                            </p>
                        </div>
                    </div>

                    <div className="myCard2">
                    <div className="myCardhead2">
                        <div style={{ backgroundColor: '#F7B20026', marginRight: '10px' }}>
                            <img src={barGraph.src} alt="" />
                        </div>
                        <p>Continuous Improvement</p>
                    </div>
                        <div className="myCardContent">
                            <p>
                                We are dedicated to continuous improvement, constantly seeking ways to enhance our services,
                                processes, and capabilities to better serve our clients.
                            </p>
                        </div>
                    </div>

                    <div className="myCard2">
                    <div className="myCardhead2">
                        <div style={{ backgroundColor: '#F7B20026', marginRight: '10px' }}>
                            <img src={Bookmark.src} alt="" />
                        </div>
                        <p>Ethical Conduct</p>
                    </div>
                        <div className="myCardContent">
                            <p>
                                We promote an organizational culture that values ethical conduct and compliance with
                                maritime regulatory and industrial requirements, ensuring integrity in all our dealings.We promote an organizational culture that values ethical conduct and compliance with
                                maritime regulatory and industrial requirements, ensuring integrity in all our dealings.We promote an organizational culture that values ethical conduct and compliance with
                                maritime regulatory and industrial requirements, ensuring integrity in all our dealings.We promote an organizational culture that values ethical conduct and compliance with
                                maritime regulatory and industrial requirements, ensuring integrity in all our dealings.We promote an organizational culture that values ethical conduct and compliance with
                                maritime regulatory and industrial requirements, ensuring integrity in all our dealings.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</>

  )
}

export default index