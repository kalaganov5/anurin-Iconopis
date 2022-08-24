import {toggleNavigation} from './toggle-navigation.js';
import {validationPhone} from './phone-validation.js';
import {hideContacts} from './hide-contacts.js';
import {formHandler} from './form-handler.js';
import {portfolioHandler} from './portfolio-handler.js';
import {contactsToAuthor} from './contact-button-handler.js';

const contactsLinkClass = ".contacts__link";

// init navigation
toggleNavigation();
// init phone validation
validationPhone();
// init hide contacts
hideContacts(contactsLinkClass);
// init hide contacts
formHandler();

// portfolioSlider;
portfolioHandler();

contactsToAuthor();
