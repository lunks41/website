import React, { useState, useEffect } from "react";
import "./index.scss";
import boat from "../../../public/images/media-imgs/boat.svg";
import downloadBtn from "../../../public/images/media-imgs/downloadBtn.svg";
import launchServicesTable from "../../../launchServices.json";
import Pagination from "@/components/Pagination/Pagination";

const index = () => {
  const pdfArray = [
    "images/launch-pdfs/ANASTASIYA.pdf",
    "images/launch-pdfs/ANASTASIYA-II.pdf",
    "images/launch-pdfs/CRD-ALPHA.pdf",
    "images/launch-pdfs/CRD-DELTA.pdf",
    "images/launch-pdfs/CRD-ECO.pdf",
  ];
  const [selectTableData, setSelectedTableData] = useState(
    launchServicesTable?.anastasiya || {}
  );
  const [thePdf, setPdf] = useState("");
  const [selectedServiceName, setSelectedServiceName] = useState("anastasiya");

  function camelToCapitalCase(camelCaseString: string): string {
    const words = camelCaseString
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .split(/[\s_]+/);

    const capitalizedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );

    const capitalCaseString = capitalizedWords.join(" ");

    return capitalCaseString;
  }

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 4;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDownloadPDF = (thePdf: string) => {
    const pdfUrl = thePdf;
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = `${selectedServiceName}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const dummyArray = ["", "", "", ""];
  return (
    <>
      <div className="boatMain">
        <div className="boat">
          <h2 className="sdContent mt-2">
            <b style={{ color: "black" }}>Launch </b>Services
          </h2>
        </div>

        <div className="buttonsDiv mt-4 mb-5">
          {Object.keys(launchServicesTable).map((each, index: number) => (
            <button
              key={each}
              className={
                selectedServiceName === each
                  ? "selectedBtn text-uppercase"
                  : "text-uppercase"
              }
              onClick={() => {
                setSelectedTableData(
                  launchServicesTable[each as keyof typeof launchServicesTable]
                );
                setSelectedServiceName(each);
                setPdf(pdfArray[index]);
              }}
            >
              {camelToCapitalCase(each)}
            </button>
          ))}
        </div>

        <div className="cardsAndTable">
          <div className="shipCards">
            <div className="shipCardsDiv w-100">
              {dummyArray.map((d) => (
                <img src={boat.src} alt="" />
              ))}
            </div>

            {/* <div className="myPagination w-100 mt-3">
              <nav aria-label="mypageNav Page navigation example">
                <ul className="pagination">
                  <li className="page-item">
                    <a className="page-link text-black previous" href="#">
                      <img src="../leftArrow.svg" alt="" />
                      Previous
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link text-black" href="#">
                      1
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link text-black" href="#">
                      2
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link text-black" href="#">
                      3
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link text-white nextele" href="#">
                      Next
                      <img src="../rightArrow.svg" alt="" />
                    </a>
                  </li>
                </ul>
              </nav>
            </div> */}

            {/* <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            /> */}
          </div>
          <div className="w-50">
            <table className="w-100">
              <thead>
                <tr>
                  <td colSpan={2}>
                    <h3 className="text-uppercase border-0">
                      {camelToCapitalCase(selectedServiceName)}
                    </h3>
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ backgroundColor: "#E2F2FC", width : "45%" }}>
                    <b>Year Of Build</b>
                  </td>
                  <td>
                    {(selectTableData as Record<string, string>).yearOfBuild}
                  </td>
                </tr>
                <tr>
                  <td style={{ backgroundColor: "#E2F2FC", width : "45%" }}>
                    <b>Flag</b>
                  </td>
                  <td>{(selectTableData as Record<string, string>).flag}</td>
                </tr>
                <tr>
                  <td style={{ backgroundColor: "#E2F2FC", width : "45%" }}>
                    <b>Reg. Port/No</b>
                  </td>
                  <td>{(selectTableData as Record<string, string>).regPort}</td>
                </tr>
                <tr>
                  <td style={{ backgroundColor: "#E2F2FC", width : "45%" }}>
                    <b>Hull Structure</b>
                  </td>
                  <td>
                    {(selectTableData as Record<string, string>).hullStructure}
                  </td>
                </tr>
                <tr>
                  <td style={{ backgroundColor: "#E2F2FC", width : "45%" }}>
                    <b>GRT</b>
                  </td>
                  <td>{(selectTableData as Record<string, string>).grt}</td>
                </tr>
                <tr>
                  <td style={{ backgroundColor: "#E2F2FC", width : "45%" }}>
                    <b>LOA/Breadth/Draft</b>
                  </td>
                  <td>{(selectTableData as Record<string, string>).loa}</td>
                </tr>
                <tr>
                  <td style={{ backgroundColor: "#E2F2FC", width : "45%" }}>
                    <b>Light Ship</b>
                  </td>
                  <td>
                    {(selectTableData as Record<string, string>).lightShip}
                  </td>
                </tr>
                <tr>
                  <td style={{ backgroundColor: "#E2F2FC", width : "45%" }}>
                    <b>Deck Cargo</b>
                  </td>
                  <td>
                    {(selectTableData as Record<string, string>).deckCargo}
                  </td>
                </tr>
                <tr>
                  <td style={{ backgroundColor: "#E2F2FC", width : "45%" }}>
                    <b>Main Engine</b>
                  </td>
                  <td>
                    {(selectTableData as Record<string, string>).mainEngine}
                  </td>
                </tr>
                <tr>
                  <td style={{ backgroundColor: "#E2F2FC", width : "45%" }}>
                    <b>BHP</b>
                  </td>
                  <td>{(selectTableData as Record<string, string>).bhp}</td>
                </tr>
                <tr>
                  <td style={{ backgroundColor: "#E2F2FC", width : "45%" }}>
                    <b>Generators</b>
                  </td>
                  <td>
                    {(selectTableData as Record<string, string>).generators}
                  </td>
                </tr>
                <tr>
                  <td style={{ backgroundColor: "#E2F2FC", width : "45%" }}>
                    <b>Propeller</b>
                  </td>
                  <td>
                    {(selectTableData as Record<string, string>).propeller}
                  </td>
                </tr>
                <tr>
                  <td style={{ backgroundColor: "#E2F2FC", width : "45%" }}>
                    <b>Speed/Service Speed</b>
                  </td>
                  <td>
                    {(selectTableData as Record<string, string>).serviceSpeed}
                  </td>
                </tr>
                <tr>
                  <td style={{ backgroundColor: "#E2F2FC", width : "45%" }}>
                    <b>Passenger capacity</b>
                  </td>
                  <td>
                    {
                      (selectTableData as Record<string, string>)
                        .passengerCapacity
                    }
                  </td>
                </tr>
              </tbody>
            </table>
            <button
              className="mt-4 text-white d-flex justify-content-center align-items-center g-3 ps-3 pe-3 pt-2 pb-2"
              style={{
                backgroundColor: "#F7B200",
                borderRadius: "0.5rem",
                border: "none",
                fontSize: "small",
              }}
              onClick={() => handleDownloadPDF(thePdf)}
            >
              Download PDF
              <img src={downloadBtn.src} alt="" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
