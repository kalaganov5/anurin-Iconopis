const mainHTML = document.documentElement;
const body = document.body;

let modals = [];
/**
 *
 * @param {*} modalClass класс текущего попап
 * @param {*} modalShowClass класс показа попап
 */
const closeOldModal = (modalClass, modalShowClass, closeModal, closeModalIsEscCb) => {
  const newModal = document.querySelectorAll(`.${modalClass}`);
  modals.push(newModal);

  if (modals.length === 2) {
    const oldModal = modals[0][0];
    //remove old event listener
    const closeButton = oldModal.querySelector(".modal__close-button");
    closeButton.removeEventListener("click", closeModal);

    document.removeEventListener('keydown', closeModalIsEscCb);

    oldModal.classList.remove(modalShowClass);
    modals.splice(0, 1);


  }
};

const showModal = (modalClass, referer = null) => {
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

    // remove event listener
    closeButton.removeEventListener("click", closeModal);
    document.removeEventListener('keydown', closeModalIsEsc);
    modals = []
  }

  const closeModalIsEsc = function (evt) {
    if (evt.key === 'Esc' || evt.key === 'Escape') {
      evt.preventDefault();
      closeModal(evt);
    }
  }



  closeOldModal(modalClass, modalShowClass, closeModal, closeModalIsEsc);

  modal.classList.add(modalShowClass);
  body.style.position = 'fixed';
  body.style.top = `-${scrollY}`;
  mainHTML.style.scrollBehavior = 'auto';

  // add event listener
  document.addEventListener('keydown', closeModalIsEsc);
  closeButton.addEventListener("click", closeModal);
};

window.addEventListener('scroll', () => {
  mainHTML.style.setProperty('--scroll-y', `${window.scrollY}px`);
});

export {showModal};
