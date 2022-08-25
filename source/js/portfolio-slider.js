import Swiper from './swiper.min.js';

/**
 * Экземпляр класса портфолио
 */
const portfolioSlider = new Swiper(".mySwiper", {
  keyboard: {
    enabled: true,
  },
  lazy: true,
  pagination: {
    el: ".modal-portfolio__progressbar",
    type: "progressbar",
    progressbarFillClass: 'modal-portfolio__progressbar-fill',
  },
  navigation: {
    nextEl: '.modal__button-pagination--next',
    prevEl: '.modal__button-pagination--prev',
  },
  hashNavigation: {
    watchState: true,
  },
  zoom: true,
  effect: "fade",
  loop: true,
  // autoplay: {
  //   delay: 5000,
  //   disableOnInteraction: true,
  // },
});

export {portfolioSlider};
