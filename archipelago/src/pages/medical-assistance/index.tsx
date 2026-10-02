import React from 'react'
import { useRouter } from "next/router";
import './index.scss'
import backError from "../../../public/images/news-events/backError.svg"
import medical from "../../../public/images/sub-services-imgs/medical.svg"




const index = () => {
    const router = useRouter();

  return (
    <div className="agencyMain">
    <div className="backButton mb-5">
        <button className="w-100 bg-dark p-1" onClick={()=>router.back()}>
            <img src={backError.src} alt="Go back" className="w-100" />
        </button>
    </div>
    <div className="careerDiv mb-4">
        <div className="sideTags w-100">
            <p>
                Our Service
            </p>
        </div>
        <h1 className="sdContent mt-2">
        Medical <b style={{ color: 'black' }}>Assistance</b>
        </h1>
    </div>
    <div className="servicesImages w-100 mb-5">
        <img src={medical.src} alt="Archipelago medical assistance for crew" className="w-100" />
    </div>
    <div className="srvContent">
        <p>
            we understand the critical importance of minimizing risk in the maritime industry. Our comprehensive survey and inspection services are meticulously designed to protect your assets, enhance operational efficiency, and ensure regulatory compliance. We offer a holistic approach that covers every aspect of your vessel’s operations, allowing you to focus on what you do best – growing your business.
        </p>
        <ul>
            <li>Remote Medical Support 24/7</li>
            <li>Medical Advice at Sea</li>
            <li>Telemedicine</li>
            <li>Port & Harbour Medical Referral</li>
            <li>Customized Medical Network by the port</li>
            <li>Medical Evacuation & Repatriation (ICU Doctor Escort)</li>
            <li>Medical Case Management and payment of medical expenses</li>
            <li>Medical Specialists’ second opinion</li>
            <li>Medicine Dispatch</li>
            <li>Funeral Service & Repatriation</li>
            <li>Medical Cost Control</li>
        </ul>
    </div>
</div>
  )
}

export default index