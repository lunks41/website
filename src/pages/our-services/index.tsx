import React from 'react'
import './index.scss'
import Link from "next/link";
import s1 from "../../../public/images/our-services/s1.svg"
import s2 from "../../../public/images/our-services/s2.svg"
import s3 from "../../../public/images/our-services/s3.svg"
import s4 from "../../../public/images/our-services/s4.svg"
import s5 from "../../../public/images/our-services/s5.svg"
import s6 from "../../../public/images/our-services/s6.svg"
import s7 from "../../../public/images/our-services/s7.svg"
import s8 from "../../../public/images/our-services/s8.svg"
import s9 from "../../../public/images/our-services/s9.svg"
import s10 from "../../../public/images/our-services/s10.svg"
import s11 from "../../../public/images/our-services/s11.svg"
import s12 from "../../../public/images/our-services/s12.svg"
import s13 from "../../../public/images/our-services/s13.svg"
import shipAgency from "../../../public/images/our-services/shipAgency.svg"
import marineServices from "../../../public/images/our-services/marineServices.svg"
import shipSupply from "../../../public/images/our-services/shipSupply.svg"
import crewChanges from "../../../public/images/our-services/crewChanges.svg"
import logiClearence from "../../../public/images/our-services/logiClearence.svg"



const index = () => {
  return (
<>
    <div className="srvOne">
        <div className="srvDiv">
        <div className="sideTags">
            <p>Services</p>
        </div>
        <h3 className="sdContent mt-2">
            Our <b style={{ color: 'black' }}>Services</b>
        </h3>
        </div>
        <div className="srvContent mt-2">
            <p>
                Our customers benefit from fast, reliable, and accurate communication together with a cost-effective, professional service and the peace of mind of knowing their ships and cargo are in safe hands.
            </p>
        </div>
        <div className="srvCards">
            <Link className='text-decoration-none w-auto' href="/ship-agency">
                <div className="mycard card p-2 bg-dark" style={{ width: '18rem' }}>
                    <img src={shipAgency.src} className="card-img-top" alt="..." />
                    <div className="cardBody card-body">
                    <h5 className="cardTitle card-title">Ship Agency</h5>
                    <p className="cardText card-text mb-0">A shipping agency acts as a crucial link between ship operators and port authorities, ensuring the smooth flow of maritime operations.</p>
                    <p className="readMore text-white mt-2 mb-0">
                        <i>Click to read more</i>
                    </p>
                    </div>
                </div>
            </Link>

            <Link className='text-decoration-none w-auto' href="/marine-services">
                <div className="mycard card p-2 bg-dark" style={{ width: '18rem' }}>
                    <img src={marineServices.src} className="card-img-top" alt="..." />
                    <div className="cardBody card-body">
                    <h5 className="cardTitle card-title">Marine Services</h5>
                    <p className="cardText card-text mb-0">Marine services is a comprehensive word use to describe the services taken by a vessel for its construction, repairs, and operations.</p>
                    <p className="readMore text-white mt-2 mb-0">
                        <i>Click to read more</i>
                    </p>
                    </div>
                </div>
            </Link>

            <Link className='text-decoration-none w-auto' href="/ship-supply">
                <div className="mycard card p-2 bg-dark" style={{ width: '18rem' }}>
                    <img src={shipSupply.src} className="card-img-top" alt="..." />
                    <div className="cardBody card-body">
                    <h5 className="cardTitle card-title">Ship Supply</h5>
                    <p className="cardText card-text mb-0">We have a large warehouse with a total covered area of 800m2 and an open yard with a total area of 2000m2, adequate to provide...</p>
                    <p className="readMore text-white mt-2 mb-0">
                        <i>Click to read more</i>
                    </p>
                    </div>
                </div>
            </Link>

            <Link className='text-decoration-none w-auto' href="/crew-changes">
                <div className="mycard card p-2 bg-dark" style={{ width: '18rem' }}>
                    <img src={crewChanges.src} className="card-img-top" alt="..." />
                    <div className="cardBody card-body">
                    <h5 className="cardTitle card-title">Crew Changes</h5>
                    <p className="cardText card-text mb-0">Crew changes are an essential process that allow for the smooth operation and well-being of seafarers.</p>
                    <p className="readMore text-white mt-2 mb-0">
                        <i>Click to read more</i>
                    </p>
                    </div>
                </div>
            </Link>

            <Link className='text-decoration-none w-auto' href="/logistics">
                <div className="mycard card p-2 bg-dark" style={{ width: '18rem' }}>
                    <img src={logiClearence.src} className="card-img-top" alt="..." />
                    <div className="cardBody card-body">
                    <h5 className="cardTitle card-title">Logistics and Clearance</h5>
                    <p className="cardText card-text mb-0">Crew changes are an essential process that allow for the smooth operation and well-being of seafarers.</p>
                    <p className="readMore text-white mt-2 mb-0">
                        <i>Click to read more</i>
                    </p>
                    </div>
                </div>
            </Link>

            <Link className='text-decoration-none w-auto' href="/inspection">
                <div className="mycard card p-2 bg-dark" style={{ width: '18rem' }}>
                    <img src={s6.src} className="card-img-top" alt="..." />
                    <div className="cardBody card-body">
                    <h5 className="cardTitle card-title">Ship Surveys and Inspection</h5>
                    <p className="cardText card-text mb-0">we understand the critical importance of minimizing risk in the maritime industry.</p>
                    <p className="readMore text-white mt-2 mb-0">
                        <i>Click to read more</i>
                    </p>
                    </div>
                </div>
            </Link>

            <Link className='text-decoration-none w-auto' href="/medical-assistance">
                <div className="mycard card p-2 bg-dark" style={{ width: '18rem' }}>
                    <img src={s7.src} className="card-img-top" alt="..." />
                    <div className="cardBody card-body">
                    <h5 className="cardTitle card-title">Medical Assistance</h5>
                    <p className="cardText card-text mb-0">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <p className="readMore text-white mt-2 mb-0">
                        <i className="text-white">Click to read more</i>
                    </p>
                    </div>
                </div>
            </Link>

            {/* <Link className='text-decoration-none w-auto' href="/ship-agency">
                <div className="mycard card p-2 bg-dark" style={{ width: '18rem' }}>
                    <img src={s8.src} className="card-img-top" alt="..." />
                    <div className="cardBody card-body">
                    <h5 className="cardTitle card-title">Card title</h5>
                    <p className="cardText card-text mb-0">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <p className="readMore text-white mt-2 mb-0">
                        <i>Click to read more</i>
                    </p>
                    </div>
                </div>
            </Link>

            <Link className='text-decoration-none w-auto' href="/ship-agency">
                <div className="mycard card p-2 bg-dark" style={{ width: '18rem' }}>
                    <img src={s9.src} className="card-img-top" alt="..." />
                    <div className="cardBody card-body">
                    <h5 className="cardTitle card-title">Card title</h5>
                    <p className="cardText card-text mb-0">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <p className="readMore text-white mt-2 mb-0">
                        <i>Click to read more</i>
                    </p>
                    </div>
                </div>
            </Link>

            <Link className='text-decoration-none w-auto' href="/ship-agency">
                <div className="mycard card p-2 bg-dark" style={{ width: '18rem' }}>
                    <img src={s10.src} className="card-img-top" alt="..." />
                    <div className="cardBody card-body">
                    <h5 className="cardTitle card-title">Card title</h5>
                    <p className="cardText card-text mb-0">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <p className="readMore text-white mt-2 mb-0">
                        <i>Click to read more</i>
                    </p>
                    </div>
                </div>
            </Link>

            <Link className='text-decoration-none w-auto' href="/ship-agency">
                <div className="mycard card p-2 bg-dark" style={{ width: '18rem' }}>
                    <img src={s11.src} className="card-img-top" alt="..." />
                    <div className="cardBody card-body">
                    <h5 className="cardTitle card-title">Card title</h5>
                    <p className="cardText card-text mb-0">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <p className="readMore text-white mt-2 mb-0">
                        <i>Click to read more</i>
                    </p>
                    </div>
                </div>
            </Link>

            <Link className='text-decoration-none w-auto' href="/ship-agency">
                <div className="mycard card p-2 bg-dark" style={{ width: '18rem' }}>
                    <img src={s12.src} className="card-img-top" alt="..." />
                    <div className="cardBody card-body">
                    <h5 className="cardTitle card-title">Card title</h5>
                    <p className="cardText card-text mb-0">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <p className="readMore text-white mt-2 mb-0">
                        <i>Click to read more</i>
                    </p>
                    </div>
                </div>
            </Link>

            <Link className='text-decoration-none w-auto' href="/ship-agency">
                <div className="mycard card p-2 bg-dark" style={{ width: '18rem' }}>
                    <img src={s13.src} className="card-img-top" alt="..." />
                    <div className="cardBody card-body">
                    <h5 className="cardTitle card-title">Card title</h5>
                    <p className="cardText card-text mb-0">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <p className="readMore text-white mt-2 mb-0">
                        <i>Click to read more</i>
                    </p>
                    </div>
                </div>
            </Link> */}
            
        </div>
    </div>
</>
  )
}

export default index