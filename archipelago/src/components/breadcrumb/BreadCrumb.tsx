import "./BreadCrumb.scss";
import { Breadcrumb } from "react-bootstrap";
import React from "react";
import { useRouter } from "next/router";

export default function CustomBreadcrumb(props: any) {
  const router = useRouter();
  const { type } = router.query;

  let title3 = "Restaurants";
  if (typeof type === "string" && type === "entertainments") {
    title3 = "Entertainments";
  } else if (typeof type === "string" && type === "play-areas") {
    title3 = "Play Areas";
  }

  return (
    <div
      {...props}
      className={`header-main ${props.className ? props.className : ""}`}
    >
      <div>
        <Breadcrumb {...props} className="primary-breadcrumb">
          <Breadcrumb.Item
            href={props.link}
            className="breadcrumb-title mb-0"
          >
            {props.title}
          </Breadcrumb.Item>
          <Breadcrumb.Item
            onClick={() => router.push(props.link2)}
            className="breadcrumb-title mb-0"
          >
            {props.title2}
          </Breadcrumb.Item>

          <Breadcrumb.Item
            href={props.link3}
            className="breadcrumb-title mb-0"
          >
            {title3}
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
    </div>
  );
}
