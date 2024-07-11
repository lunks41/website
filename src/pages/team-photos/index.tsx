import React from "react";
import "./index.scss";

const index = () => {

    // const images = [
    //     "images/media-imgs/ouTeam1.svg",
    //     "images/media-imgs/ourTeam2.svg",
    //     "images/media-imgs/ourTeam3.svg",
    //     "images/media-imgs/ourTeam4.svg",
    //     "images/media-imgs/ourTeam5.svg",
    //     "images/media-imgs/ourTeam6.svg"
    // ];
    const images = [
        "images/media-imgs/teamPhoto.png"
    ];

  return (
    <>
      <div className="ourTeam">
        <div className="sideTags mb-4">
          <p>Our Team</p>
        </div>
        <div className="team">
          <h3 className="teamContent mt-2">Meet Our Team</h3>
          <p className="m-0">
            Get to know the faces behind{" "}
            <span style={{ color: "#0F80B6" }}>
              Archipelago Middle East Shipping L.L.C.
            </span>{" "}
            Our dedicated team members bring a wealth of talent, experience, and
            passion to everything we do.
          </p>
        </div>
        <div className="teamImgsDiv mt-4">
            {images.map((image) => {
                return <img src={image} alt="" />
            })}
        </div>
      </div>
    </>
  );
};

export default index;
