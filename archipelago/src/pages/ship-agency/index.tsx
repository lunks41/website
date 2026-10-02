import React from 'react'
import './index.scss'
import backError from "../../../public/images/news-events/backError.svg"
import shipagency from "../../../public/images/sub-services-imgs/LGshipAgency.svg"
import { useRouter } from 'next/router'


const index = () => {
    const router = useRouter();
  return (

<>
    <div className="agencyMain">
        <div className="backButton mb-5">
            <button className="w-100 bg-dark p-1" onClick={()=>router.back()}>
                <img src={backError.src} alt="Go back" className="w-100"/>
            </button>
        </div>
        <div className="careerDiv mb-4">
            <div className="sideTags w-100">
                <p>
                    Our Service
                </p>
            </div>
            <h1 className="sdContent mt-2">
                Shipping <b style={{ color: 'black' }}>Agency</b>
            </h1>
        </div>
        <div className="servicesImages w-100 mb-5">
            <img src={shipagency.src} alt="Archipelago ship agency services" className="w-100"/>
        </div>
        <div className="srvContent">
            <p>
                A shipping agency acts as a crucial link between ship operators and port authorities, ensuring the smooth flow of maritime operations. They handle a range of vital tasks, from coordinating port services like pilotage and tugboat assistance to managing customs procedures and crew welfare. These agencies play a pivotal role in logistics, orchestrating the movement of supplies and provisions, while also serving as a communication hub between ships and ports. Ultimately, shipping agencies are unsung heroes that keep the maritime industry running seamlessly and contribute to the efficiency of global trade.
            </p>
            <p>
                Shipping agencies serve as the essential bridge connecting ship operators and port authorities. They manage critical aspects such as port services, customs clearance, crew welfare, and logistics coordination. By facilitating communication and ensuring compliance, these agencies play a vital role in maintaining the smooth functioning of maritime operations and supporting international trade.
            </p>
        </div>
    </div>
</>
  )
}

export default index