import React from 'react'
import './index.scss'
import backError from "../../../public/images/news-events/backError.svg"
import marineServices from "../../../public/images/sub-services-imgs/LGmarine.svg"
import { useRouter } from 'next/router'


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
            Marine <b style={{ color: 'black' }}>Services</b>
        </h1>
    </div>
    <div className="servicesImages w-100 mb-5">
        <img src={marineServices.src} alt="Archipelago marine services" className="w-100" />
    </div>
    <div className="srvContent">
        <p>
            Marine services is a comprehensive word use to describe the services taken by a vessel for its construction, repairs, and operations. At the same time, we could describe Marine Services as port-related services provided to the watercraft to ensure safe maneuvering and safe berthing. However, the purpose of all the marine services is to facilitate the ship’s operation.
        </p>
        <p>
            The main purpose of port-related marine services are to ensure the safety of the vessel as well as the seaport. Also to assist faster vessel turnaround time. These maritime services include pilotage, tug services, towing facilities, light housing and vessel traffic management.
        </p>
        <p>
            Other Mariner Services are crucial for a watercraft to maintain her seaworthiness. These varieties of maritime services include but are not limited to vessel inspections and boat engine repairs and maintenance, or vessel hull repairs. The hull repairs include the facilities taken for chipping, popping dents, hole repairs, and buffing scratches. ship provisions were taken and bunkering.
        </p>
        <p>
            Seafarer transportation, ship supplies, ship stores, ship provisions and ferrying also consider under the Marine Services.
        </p>
        <p>
            There is no internationally agreed regulation on the marine services provided by a port. As per the capacity of the port, they have the right to decide which marine services they will be rendered. Thus, the basic maritime services for vessel berthing are a must to maintain port operations.
        </p>
    </div>
</div>
  )
}

export default index