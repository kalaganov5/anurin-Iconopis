import {portfolioSlider} from './portfolio.js';

portfolioSlider;

/**
 * Кнопка скрыть/показать текст
 */
const buttonShow = document.querySelector('.modal-portfolio__toggle-text');
/**
 *
 * @param {boolean} isClose признак, нужно ли закрыть текст
 * @returns
 */
const textShowPortfolio = (isClose = false) => {
  const currentSlider = portfolioSlider.el.querySelector(".swiper-slide-active");
  const textElement = currentSlider.querySelector(".modal-portfolio__text");
  // проходимся и находим открытые текст
  const oldTextElement = portfolioSlider.el.querySelector(".modal-portfolio__text--show");

  if (isClose && oldTextElement !== null) {
    oldTextElement.classList.remove("modal-portfolio__text--show");
    return;
  }

  textElement.classList.toggle("modal-portfolio__text--show");
  buttonShow.classList.toggle("modal-portfolio__toggle-text--show");
}

const setTogglePortfolioText = () => {
  buttonShow.addEventListener('click', (evt) => {
    evt.preventDefault();
    textShowPortfolio();
  });
}

portfolioSlider.on('slideChange', function () {
  textShowPortfolio(true);
});
