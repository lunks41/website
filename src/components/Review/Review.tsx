import { useEffect, useState, useCallback, useRef } from "react";

import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";

const NewModalGateway: any = ModalGateway;

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
            <NewModalGateway>
              {viewerIsOpen ? (
                <Modal onClose={closeLightbox}>
                  <Carousel
                    currentIndex={currentImage}
                    views={photos.map((x: any) => ({
                      ...x,
                      srcset: x.srcSet,
                      caption: x.title,
                    }))}
                  />
                </Modal>
              ) : null}
            </NewModalGateway>
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
        {/* <div className="d-flex align-items-center gap-4">
          <div className="upvote d-flex align-items-center gap-2">
            <img src="/images/icons/upvote.svg" alt="upvote" />
            {props?.upvotes}
          </div>
          <div className="downvote d-flex align-items-center gap-2">
            <img src="/images/icons/downvote.svg" alt="downvote" />
            {props?.downvotes}
          </div>
        </div> */}
      </div>
    </div>
  );
}
