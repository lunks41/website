import React from 'react'
import './index.scss'
import backError from "../../../public/images/news-events/backError.svg"
import crew from "../../../public/images/sub-services-imgs/LGcrewChanges.svg"
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
            Crew <b style={{ color: 'black' }}>Changes</b>
        </h1>
    </div>
    <div className="servicesImages w-100 mb-5">
        <img src={crew.src} alt="Archipelago crew change services" className="w-100" />
    </div>
    <div className="srvContent">
        <p>
            Crew changes are an essential process that allow for the smooth operation and well-being of seafarers. Maritime crew change services play a crucial role in facilitating the transition of crew members between vessels, enabling them to return home after a long period at sea or embark on a new voyage. This vital operation ensures the continuous availability of competent and motivated seafarers, promoting safety, efficiency, and the overall sustainability of the maritime industry.
        </p>
        <p>
            Crew change involves complex logistical arrangements, including travel arrangements, immigration procedures, and accommodation. One of the key challenges in crew change operations is coordinating the movements of various sailors and crew members. Maritime crew change services streamline this process by ensuring that travel arrangements are well-coordinated, minimizing transit times and providing assistance with visas and immigration procedures. These services often collaborate with travel agencies, immigration authorities, and transportation providers to create a seamless experience for seafarers.
        </p>
    </div>
</div>
  )
}

export default index