import React from 'react'
import './index.scss'
import backError from "../../../public/images/news-events/backError.svg"
import inspection from "../../../public/images/sub-services-imgs/inspection.svg"
import { useRouter } from 'next/router'

const index = () => {
    const router = useRouter();
  return (
    <div className="agencyMain">
    <div className="backButton mb-5">
        <button className="w-100 bg-dark p-1" onClick={()=>router.back()}>
            <img src={backError.src} alt="" className="w-100" />
        </button>
    </div>
    <div className="careerDiv mb-4">
        <div className="sideTags w-100">
            <p>
                Our Service
            </p>
        </div>
        <h3 className="sdContent mt-2">
            Ship Surveys <b style={{ color: 'black' }}>and Inspection</b>
        </h3>
    </div>
    <div className="servicesImages w-100 mb-5">
        <img src={inspection.src} alt="" className="w-100" />
    </div>
    <div className="srvContent">
        <p>
            we understand the critical importance of minimizing risk in the maritime industry. Our comprehensive survey and inspection services are meticulously designed to protect your assets, enhance operational efficiency, and ensure regulatory compliance. We offer a holistic approach that covers every aspect of your vessel’s operations, allowing you to focus on what you do best – growing your business.
        </p>
        <ul>
            <li>Annual</li>
            <li>Dry Dock</li>
            <li>Load Line</li>
            <li>Cargo Ship Safety Equipment</li>
        </ul>
    </div>
</div>
  )
}

export default index