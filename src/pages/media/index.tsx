import React from "react";
import "./index.scss";
import economy from "../../../public/images/media-imgs/newsEventsNew.svg";
import handShip from "../../../public/images/media-imgs/launchNew.svg";
import people from "../../../public/images/media-imgs/teamNew.svg";
import trophy from "../../../public/images/media-imgs/trophyNew.svg";
import { useRouter } from "next/router";

const index = () => {
  const router = useRouter();
  return (
    <>
      <div className="mediaMain">
        <div className="mediaDiv">
          <div className="sideTags">
            <p>Our Gallery</p>
          </div>
          <h3 className="sdContent mt-2 text-center">
            <b style={{ color: "black" }}>
              "Through the Lens of the Sea: Discover
            </b>{" "}
            the Beauty of Our Maritime Gallery"
          </h3>
        </div>

        <div className="mediaCards">
          <div
            className="mycard card"
            onClick={() => {
              router.push({
                pathname: "/media-awards",
              });
            }}
          >
            <img src={trophy.src} className="card-img-top" alt="..." />
            <button>Awards</button>
          </div>

          <div
            className="mycard card"
            onClick={() => {
              router.push({
                pathname: "team-photos",
              });
            }}
          >
            <img src={people.src} className="card-img-top" alt="..." />
            <button>Team Photos</button>
          </div>

          <div
            className="mycard card"
            onClick={() => {
              router.push({
                pathname: "/new-events",
              });
            }}
          >
            <img src={economy.src} className="card-img-top" alt="..." />
            <button>News & Event</button>
          </div>

          <div
            className="mycard card"
            onClick={() => {
              router.push({
                pathname: "/launch-services",
              });
            }}
          >
            <img src={handShip.src} className="card-img-top" alt="..." />
            <button>Our Launch Services</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
