import React from 'react'
import './index.scss'
import backError from "../../../public/images/news-events/backError.svg"
import shipSupply from "../../../public/images/sub-services-imgs/LGshipSupply.svg"
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
                    Ship <b style={{ color: 'black' }}>Supply</b>
                </h3>
            </div>
            <div className="servicesImages w-100 mb-5">
                <img src={shipSupply.src} alt="" className="w-100" />
            </div>
            <div className="srvContent">
                <p>
                    We have a large warehouse with a total covered area of 800m2 and an open yard with a total area of 2000m2, adequate to provide storage facilities for items landing from vessels.
                </p>
                <ul>
                    <li>supply of spares, stores and provisions – clearing and forwarding</li>
                    <li>coordination, forwarding and receiving mail and consignments</li>
                    <li>slop and sludge disposal services</li>
                    <li>A to Z ship operation</li>
                    <li>Fresh water supply services</li>
                    <li>survey and inspection services</li>
                    <li>medical assistance</li>
                    <li>offshore ship supply services</li>
                    <li>communication</li>
                    <li>storage services</li>
                    <li>logistical services</li>
                </ul>
                <p>
                    We organize the supply chain of the vessel and its servicing in the port: providing the vessel with fuel (bunkering), food and technical supplies, organization of vessel repairing. To do that on the highest required level, we have preliminarily concluded contracts with suppliers from all above-mentioned fields, which give a possibility to vessel manager to choose from many different suppliers.
                </p>
                <p>
                    Food is always fresh and specifically tuned to fit the requirements of long sea cruises, both for passengers, external workers, and crew. Packing of products is done in a way to preserve maximum freshness and provide the long-term usage, even up to several years.
                </p>
                <p>
                    As for technical supply, it also can be any: refuelling, oil, technical assistance, spare parts, and so on.
                </p>
                <p>
                    We believe that broad chain of our connections with suppliers and agencies that provide background documentation will result in having all technical, actual, and paperwork basis to support every legislative requirement to the quality of food, water, consumables, fuel, oil, clothes, uniforms, outfits, equipment, materials, kits, tools, machinery, and other essential items that may be required during the organization of ship supply.
                </p>
                <p>
                    All needed procurements to provide the ship with will be done in the fastest possible time in full accordance with the agreed sailing lists or other instructive documents.
                </p>
            </div>
        </div>
  )
}

export default index