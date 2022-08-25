import {showModal} from "./modal.js";

const formHandler = () => {
  const forms = document.querySelectorAll(".form");
  forms.forEach((item) => {
    item.addEventListener('submit', (evt) => {
      evt.preventDefault();
      showModal('modal-success');
    });
  });
}

export {formHandler};
