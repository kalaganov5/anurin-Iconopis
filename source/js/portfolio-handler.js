import {showModal} from "./modal.js";
import {portfolioSlider} from "./portfolio-slider.js";

/**
 * Обработчик слайдера портфолио
 */
const portfolioHandler = () => {
  const portfolioClassName = "modal-portfolio";
  const portfolioButtonsSelector = ".works__link";
  const portfolioButtons = document.querySelectorAll(portfolioButtonsSelector);
  const closeButtonHandler = document.querySelector('.modal-portfolio__close-button');
  const toggleTextButton = document.querySelector('.modal-portfolio__toggle-text');

  const toggleTextHandler = (evt) => {
    evt.preventDefault();
    console.log('показ текста, срабатывание')
    textShowPortfolio();
  };

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
    console.log(toggleTextButton)

    if (isClose) {
      console.log(oldTextElement)
      try {
        console.log('удаляем')
        toggleTextButton.classList.remove("modal-portfolio__toggle-text--show");
      } catch (error) {
        console.log('removing unsuccessful')
      }
      return;
    }

    textElement.classList.toggle("modal-portfolio__text--show");
    toggleTextButton.classList.toggle("modal-portfolio__toggle-text--show");
  }

  portfolioSlider.on('slideChange', function () {
    console.log('смена слайда произошла')
    textShowPortfolio(true);
  });

  portfolioButtons.forEach((portfolioButton) => {
    portfolioButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      portfolioSlider;
      showModal(portfolioClassName);

      toggleTextButton.addEventListener('click', toggleTextHandler);
    });
  });

  closeButtonHandler.addEventListener('click', (evt) => {
    evt.preventDefault();
    toggleTextButton.removeEventListener('click', toggleTextHandler);
  });
}

export {portfolioHandler};
