import React from 'react'
import './index.scss'
import backError from "../../../public/images/news-events/backError.svg"
import logistics from "../../../public/images/sub-services-imgs/LGlogistics.svg"
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
            Logistics <b style={{ color: 'black' }}>And Clearance</b>
        </h3>
    </div>
    <div className="servicesImages w-100 mb-5">
        <img src={logistics.src} alt="" className="w-100" />
    </div>
    <div className="srvContent">
        <p>
        Logistics services refers to the management of goods movement from one point to another in an efficient manner. Logistics service providers can handle everything from warehousing and storage solutions to transportation management systems (TMS) that optimize shipment route planning. Logistics providers can also offer other value-added services, such as
        </p>
        <ul>
            <li>Order fulfillment</li>
            <li>Inventory management</li>
            <li>Returns processing</li>
            <li>Tracking/monitoring capabilities</li>
            <li>Customs clearance assistance</li>
            <li>Third-party l</li>
        </ul>
    </div>
</div>
  )
}

export default index