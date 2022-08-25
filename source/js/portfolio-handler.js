import {showModal} from "./modal.js";
import {portfolioSlider} from "./portfolio-slider.js";

const portfolioClassName = "modal-portfolio";
const portfolioButtonsSelector = ".works__link";

const portfolioHandler = () => {
  const portfolioButtons = document.querySelectorAll(portfolioButtonsSelector);



  portfolioButtons.forEach((portfolioButton) => {
    portfolioButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      debugger;
      portfolioSlider;
      showModal(portfolioClassName);


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



        if (isClose && oldTextElement) {
          oldTextElement.classList.remove("modal-portfolio__text--show");
          try {
            buttonShow.classList.remove("modal-portfolio__toggle-text--show");
          } catch (error) {
            console.log('removing unsuccessful')
          }

          return;
        }

        textElement.classList.toggle("modal-portfolio__text--show");
        buttonShow.classList.toggle("modal-portfolio__toggle-text--show");
      }

      const setTogglePortfolioText = () => {
        console.log('установка обработчика показа текста')
        buttonShow.addEventListener('click', (evt) => {
          evt.preventDefault();
          console.log('показ текста, срабатывание')
          textShowPortfolio();
        });
      };

      setTogglePortfolioText();

      portfolioSlider.on('slideChange', function () {
        console.log('смена слайда произошла')
        textShowPortfolio(true);
      });
      });
  });


}

export {portfolioHandler};
