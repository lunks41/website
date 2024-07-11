export const SliderSettings = {
  dots: false,
  arrows: true,
  slidesToShow: 4,
  slidesToScroll: 4,
  adaptiveHeight: true,
  autoplay: true,
  swipe: true,
  speed: 600,
  autoplaySpeed: 4000,
  responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
        dots: false,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 552,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
