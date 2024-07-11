import React from 'react'
import './index.scss'
import marineSafety from "../../../public/images/home/marineSafety.jpeg"


const index = () => {
  return (
<>
    <div className="fdOne p-0 col-md-6">
        <img src={marineSafety.src} alt="" className="w-100 z-index-0"/>
        <div className="gradient-overlay"></div>
        <h3 className="fdContent ms-5 z-index-2">
            Archipelago Middle East Shipping LLC is committed to providing a safe environment.
        </h3>
    </div>
    
    <div className="safetyMain">
        <div className="safetyDiv">
            <div className="sideTags w-100">
                <p>
                    Safety Protocols
                </p>
            </div>
            <h3 className="sdContent mt-2">
                Safety Protocols
            </h3>
        </div>
        <div className="safetyContent mt-2">
            <p>
                Archipelago Middle East Shipping LLC is committed to providing a safe environment for our employees and others within its premises and other areas of activity, by minimizing the risk of any potential hazard that could cause personal injury, affect occupational hazard, or cause damage to its properties and maintaining safety of the property of the Client and its contractors.
            </p>
            <p>
                Strategies to achieve the objectives are to:
            </p>
            <ul>
                <li>Comply with the relevant national and international health, safety, and environmental regulations and legislations.</li>
                <li>Ensure that the Company has an effective Health and Safety Management system which covers good safety practices.</li>
                <li>Review the Safety Management system periodically to check its effectiveness for continuous improvement and address any non-conformity. </li>
                <li>Provide training and communicate information on Health, Fire, and Safety to all our employees with the protection of the environment as the priority in every operation.
                    Monitor and review the impact of activities to eliminate any potential and actual hazard to the environment. </li>
                <li>Wearing Protective Clothing.It is imperative to wear comfortable and well-fitted clothes on board a ship as loose clothes can get caught in the machinery and cause injuries. Proper footwear with slip-resistant soles helps minimize the risks of slipping and must be worn at all times on the ship. Apart from these, wearing the appropriate gloves to protect the skin from exposure to heat, chemicals, sharp edges, etc., is a must.</li>
                <li>Personal protective equipment includes safety helmets, shoes, goggles, ear-muffs, safety harnesses, life jackets, life rafts, etc., which are used to safeguard the individual seafarer from any harm. This equipment is mandatory for ships to ensure that there are no fatalities due to a lack of life-saving appliances. The crew also needs to be aware of where the equipment is kept and trained to know how all appliances are to be used. Dust masks are an additional, essential requirement while working in a toxic atmosphere or during the servicing of the ship. All this equipment needs to be checked at regular intervals to ensure that it is functioning properly and should be replaced if it is not.</li>
                <li>Safety Equipment for the Crew. Apart from personal life-saving devices used aboard ships, there are safety equipment for the entire crew, including lifeboats, fire extinguishers, fire suits and breathing devices, emergency medical equipment, and distress signals for summoning help. The operating crew must be well-trained in using the communication equipment with due awareness of all necessary protocols. In addition, the communication equipment must be checked regularly to ensure that it is working without a hitch.</li>
                <li>Movement About the Ship. On ships carrying heavy cargo, the containers should be securely tied at all times. Sudden lurching of the ships may cause these to dislocate if not tied properly, which can result in major bodily harm. It is necessary to be constantly on alert for slippery patches, unguarded railings, or open hatches through which people may fall. While walking around the ship in rough weather, the mantra ‘one hand to the ship’ must be mandatorily followed to prevent being thrown overboard.</li>
                <li>Appropriate Use and Placement of Tools. Portable tools and equipment must be carried with both hands. In case of climbing or descending a staircase, the equipment should be carried in a tool belt (if handy) or across the body, leaving the hands free for a firm grip. Portable power tools such as drills and welding equipment should be checked before operation and must be used only by professionals.</li>
                <li>
                    Steady Handling of Dangerous Cargo. Cargo often consists of highly flammable fuels and other such dangerous materials. Such cargoes must be stored away from the passengers. Safety instructions must be followed and the cargo must be labeled and segregated according to its nature. The containers must regularly be checked for any spills or leaks as they can prove to be hazardous. Goods on the ship, if not kept properly, are at risk of moving and falling. This can cause passengers to get hurt. Such cargoes must be stashed low and tied securely to avoid any mishaps.
                </li>
            </ul>
        </div>

    </div>


</>

  )
}

export default index