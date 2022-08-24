const mainHTML = document.documentElement;
const showModal = (modalClass, referer = null) => {

  const body = document.body;
  const modal = body.querySelector(`.${modalClass}`);

  const modalShowClass = `modal--show`;
  let scrollY = document.documentElement.style.getPropertyValue('--scroll-y');
  const closeButton = modal.querySelector(".modal__close-button");

  // VIP set referer screen to form
  if (referer !== null) {
    console.log(referer);
  }

  const closeModal = (evt) => {
    evt.preventDefault();
    let scrollY = body.style.top;
    body.style.position = '';
    body.style.top = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
    mainHTML.style.scrollBehavior = '';

    setTimeout(() => {
      modal.classList.remove(modalShowClass);
    }, 300);
    closeButton.removeEventListener("click", closeModal);
    document.removeEventListener('keydown', closeModalIsEsc);
  }

  // add event listener to close button
  closeButton.addEventListener("click", closeModal);

  modal.classList.add(modalShowClass);
  body.style.position = 'fixed';
  body.style.top = `-${scrollY}`;
  mainHTML.style.scrollBehavior = 'auto';

  const closeModalIsEsc = function (evt) {
    if (evt.keyCode === 27) {
      closeModal(evt);
    }
  }
  document.addEventListener('keydown', closeModalIsEsc);
};

window.addEventListener('scroll', () => {
  mainHTML.style.setProperty('--scroll-y', `${window.scrollY}px`);
});

export {showModal};
