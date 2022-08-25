import {showModal} from "./modal.js";

const contactsButton = document.querySelectorAll('a[data-contact]');
// example get data-contact
// console.log(contactsButton[0].dataset.contact);

const contactsToAuthor = () => {
  console.log('init')
  contactsButton.forEach((contactButton) => {
    contactButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      const referer = contactButton.dataset.contact;
      showModal('modal-form', referer);
    });
  });
}

export {contactsToAuthor};
