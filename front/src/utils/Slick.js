export const settings = {
  dots: false,
  arrows: true,
  slidesToShow: 6,
  infinite: true,
  vertical: false,
  adaptiveHeight: true,
  autoplay: true,
  autoplaySpeed: 4000,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 4,
        arrows: false
      }
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        arrows: false
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        arrows: false
      }
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1,
        arrows: false
      }
    }
  ]
};
