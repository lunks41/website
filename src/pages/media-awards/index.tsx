import React from "react";
import "./index.scss";
import client from "../../../public/images/home/client.svg";
import Bookmark from "../../../public/images/home/Bookmark.svg";
import Planet from "../../../public/images/home/Planet.svg";
import barGraph from "../../../public/images/home/barGraph.svg";
import operational from "../../../public/images/home/operational.svg";
import trophyIcon from "../../../public/images/home/trophyIcon.svg";

const index = () => {
    const awardArray = ["", "", "", "", "", ""]
  return (
    <>
      <div className="visAndMis">
        <div className="sideTags mb-4">
          <p>Awards</p>
        </div>
        <div className="visDiv">
          <h3 className="sdContent mt-2">
            At{" "}
            <b style={{ color: "#0F80B6" }}>
              Archipelago Middle East Shipping L.L.C
            </b>{" "}
            , we believe in recognizing and celebrating excellence. We are proud
            to showcase the awards and accolades we have received, highlighting
            our commitment to innovation, quality, and customer satisfaction.
          </h3>
        </div>
      </div>

      <div className="visAndMisTwo">
        <div className="visDiv">
          <h3 className="sdContent2 mt-2">Our Achievements</h3>
        </div>
        <div className="visContent mt-2">

          <div className="visContentSub">
            <div className="visContentCards">
                {awardArray.map(()=> {
                    return <div className="myCard2 bg-white">
                    <div className="myCardhead2">
                      <div
                        style={{
                          backgroundColor: "#F7B20026",
                          marginRight: "10px",
                        }}
                      >
                        <img src={trophyIcon.src} alt="" />
                      </div>
                      <p>Award Name</p>
                    </div>
                    <div className="myCardContent">
                      <p>
                      Description of the award and its significance.
                      </p>
                    </div>
                  </div>;
                })}
              

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
