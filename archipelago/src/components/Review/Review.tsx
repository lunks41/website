import { useEffect, useState, useCallback, useRef } from "react";

import Gallery from "react-photo-gallery";

import "./Review.scss";

export default function Review(props: any) {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [photos, setPhotos] = useState<any>([]);
  const [videos, setVideos] = useState<any>([]);
  const attachments = props.attachments;
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleOpenVideo = () => {
    if (!videoRef.current) return;
    videoRef.current.requestFullscreen();
  };

  const openLightbox = useCallback((event: any, { photo, index }: any) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  useEffect(() => {
    setPhotos([]);
    setVideos([]);
    attachments.forEach((attachment: any) => {
      if (attachment.type === "image") {
        setPhotos((prev: any) => [...prev, { src: attachment.asset }]);
      } else if (attachment.type === "video") {
        setVideos((prev: any) => [...prev, attachment.asset]);
      }
    });
  }, [attachments]);

  return (
    <div className="review-container p-4">
      <div className="review-heading d-flex align-items-center gap-2">
        <div className="review-rate d-flex align-items-center justify-content-center gap-1 p-2">
          {props?.rate}
          <img src="/images/icons/star-white.svg" alt="not found" />
        </div>
        <h3 className="text-uppercase user-name m-0">{props?.userName}</h3>
      </div>
      <p className="review-content">{props?.reviewContent}</p>
      {props?.readMore && (
        <button className="text-uppercase btn-read p-0 mb-3">Read More</button>
      )}
      <div className="product-imgs mb-3 d-flex align-items-center gap-3">
        {photos.length > 0 && (
          <>
            <Gallery photos={photos} onClick={openLightbox} />
            {viewerIsOpen && photos[currentImage] && (
              <div
                className="review-lightbox"
                role="dialog"
                aria-modal="true"
                onClick={closeLightbox}
                style={{
                  position: "fixed",
                  inset: 0,
                  zIndex: 9999,
                  background: "rgba(0,0,0,0.85)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "zoom-out",
                }}
              >
                <img
                  src={photos[currentImage].src}
                  alt=""
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    maxWidth: "90vw",
                    maxHeight: "90vh",
                    objectFit: "contain",
                  }}
                />
              </div>
            )}
          </>
        )}
        {videos.length > 0 &&
          videos.map((video: any, index: number) => (
            <video
              width="96"
              height="96"
              autoPlay={true}
              onClick={handleOpenVideo}
              ref={videoRef}
              key={`selected-video-${index}`}
            >
              <source src={video} type={`video/mp4`} />
              Your browser does not support the video tag.
            </video>
          ))}
      </div>
      <div className="review-footer d-flex align-items-center justify-content-between">
        <span className="review-date">{props?.reviewDate}</span>
      </div>
    </div>
  );
}
