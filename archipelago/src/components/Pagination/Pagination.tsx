import React from "react";
import "./Pagination.scss";
import pageLeftArrow from "../../../public/images/media-imgs/pageLeftArrow.svg";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handleClick = (page: number) => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="pagination w-100 mt-3">
      <button
        className={`pagination-button ${currentPage === 1 ? "disabled" : ""}`}
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <img
          src={pageLeftArrow.src}
          alt=""
          className="d-flex justify-content-center align-items-center"
        />
      </button>
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index + 1}
          className={`pagination-number ${
            currentPage === index + 1 ? "active" : ""
          }`}
          onClick={() => handleClick(index + 1)}
        >
          {index + 1}
        </button>
      ))}
      <button
        className={`pagination-button ${
          currentPage === totalPages ? "disabled" : ""
        }`}
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <img
          src={pageLeftArrow.src}
          alt=""
          className="d-flex justify-content-center align-items-center"
          style={{ transform: "rotateZ(180deg)" }}
        />
      </button>
    </div>
  );
};

export default Pagination;
