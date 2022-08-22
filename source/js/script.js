'use strict';
// open/close menu
const menuButton = document.querySelector('#header-menu-toggle');
const menu = document.querySelector('#main-navigation');

const toggleMenu = () => {
  menuButton.classList.toggle('hamburger__button--show');
  menu.classList.toggle('navigation--show');

  const closeMenuIsClickWithout = (evt) => {
    const target = evt.target;
    let isMenu = target === menu || menu.contains(target);
    let hamburger = target === menuButton || menuButton.contains(target);
    let isMenuActive = menu.classList.contains('navigation--show');

    if (!isMenu && !hamburger && isMenuActive) {
      toggleMenu();
    }
  };

  document.addEventListener('click', closeMenuIsClickWithout);

  const isCloseMenu = !menu.classList.contains('navigation--show');
  if (isCloseMenu) {
    document.removeEventListener('click', closeMenuIsClickWithout);
  }
}

menuButton.addEventListener('click', toggleMenu);

// phone validation
// source: https://github.com/alexey-goloburdin/phoneinput/blob/main/phoneinput.js
document.addEventListener("DOMContentLoaded", function () {
  var phoneInputs = document.querySelectorAll('input[data-tel-input]');

  var getInputNumbersValue = function (input) {
    // Return stripped input value — just numbers
    return input.value.replace(/\D/g, '');
  }

  var onPhonePaste = function (e) {
    var input = e.target,
      inputNumbersValue = getInputNumbersValue(input);
    var pasted = e.clipboardData || window.clipboardData;
    if (pasted) {
      var pastedText = pasted.getData('Text');
      if (/\D/g.test(pastedText)) {
        // Attempt to paste non-numeric symbol — remove all non-numeric symbols,
        // formatting will be in onPhoneInput handler
        input.value = inputNumbersValue;
        return;
      }
    }
  }

  var onPhoneInput = function (e) {
    var input = e.target,
      inputNumbersValue = getInputNumbersValue(input),
      selectionStart = input.selectionStart,
      formattedInputValue = "";

    if (!inputNumbersValue) {
      return input.value = "";
    }

    if (input.value.length != selectionStart) {
      // Editing in the middle of input, not last symbol
      if (e.data && /\D/g.test(e.data)) {
        // Attempt to input non-numeric symbol
        input.value = inputNumbersValue;
      }
      return;
    }

    if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
      if (inputNumbersValue[0] == "9") inputNumbersValue = "7" + inputNumbersValue;
      var firstSymbols = (inputNumbersValue[0] == "8") ? "8" : "+7";
      formattedInputValue = input.value = firstSymbols + " ";
      if (inputNumbersValue.length > 1) {
        formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
      }
      if (inputNumbersValue.length >= 5) {
        formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
      }
      if (inputNumbersValue.length >= 8) {
        formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
      }
      if (inputNumbersValue.length >= 10) {
        formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
      }
    } else {
      formattedInputValue = '+' + inputNumbersValue.substring(0, 16);
    }
    input.value = formattedInputValue;

    // save to local storage
    try {
      localStorage.setItem('phone', input.value);
    } catch (err) {
      // PROVIDE FEEDBACK TO THE USER
    }
  }
  var onPhoneKeyDown = function (e) {
    // Clear input after remove last symbol
    var inputValue = e.target.value.replace(/\D/g, '');
    if (e.keyCode == 8 && inputValue.length == 1) {
      e.target.value = "";
    }
  }
  for (var phoneInput of phoneInputs) {
    // get from local storage
    try {
      if (localStorage.getItem('phone')) {
        phoneInput.value = localStorage.getItem('phone');
      }
    } catch (err) {
      // PROVIDE FEEDBACK TO THE USER
    }
    // get from local storage

    phoneInput.addEventListener('keydown', onPhoneKeyDown);
    phoneInput.addEventListener('input', onPhoneInput, false);
    phoneInput.addEventListener('paste', onPhonePaste, false);
  }
})


// hide contact default
// source https://codepen.io/kalaganov5/pen/gOedWWR
const hideContactText = (selector = ".contacts__link") => {
  // check localStorage if contain die function
  try {
    if (localStorage.getItem('hideContact', 'no')) {
      return false;
    }
  } catch (err) {
    // PROVIDE FEEDBACK TO THE USER
  }


  const contacts = document.querySelectorAll(selector);
  const originalText = [];

  contacts.forEach((item, index) => {
    const text = item.textContent.trim();
    const contactTexts = Array.from(text);
    const stepsOpacity = 100 / contactTexts.length;
    const newContactTexts = [];

    originalText.push(text);

    contactTexts.forEach((item, index, array) => {
      const opacityValue = 100 - index * stepsOpacity + 0;
      const newString = `<span style="opacity: ${opacityValue}%;">${item}</span>`;
      newContactTexts.push(newString);
    });

    const newText = newContactTexts.join("");

    item.innerHTML = newText;

    // add event listener
    item.addEventListener('click', () => {
      item.innerHTML = originalText[index];
      // write to localStorage if show
      try {
        localStorage.setItem('hideContact', 'no');
      } catch (err) {
        // PROVIDE FEEDBACK TO THE USER
      }

    });

    item.addEventListener('focus', (evt) => {
      evt.preventDefault();
      item.innerHTML = originalText[index];
      // write to localStorage if show
      try {
        localStorage.setItem('hideContact', 'no');
      } catch (err) {
        // PROVIDE FEEDBACK TO THE USER
      }

    });

    item.addEventListener('mouseover', (evt) => {
      evt.preventDefault();
      item.innerHTML = originalText[index];
      // write to localStorage if show
      try {
        localStorage.setItem('hideContact', 'no');
      } catch (err) {
        // PROVIDE FEEDBACK TO THE USER
      }

    });
  });
};

hideContactText(".contacts__link");

// modal
const showModal = (modalClass) => {
  const body = document.body;
  const modal = body.querySelector(`.${modalClass}`);

  const modalShowClass = `modal--show`;
  let scrollY = document.documentElement.style.getPropertyValue('--scroll-y');
  const closeButton = modal.querySelector(".modal__close-button");

  const closeModal = (evt) => {
    evt.preventDefault();
    let scrollY = body.style.top;
    body.style.position = '';
    body.style.top = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);

    setTimeout(() => {
      modal.classList.remove(modalShowClass);
    }, 300);
    closeButton.removeEventListener("click", closeModal);
  }

  // add event listener to close button
  closeButton.addEventListener("click", closeModal);

  modal.classList.add(modalShowClass);
  body.style.position = 'fixed';
  body.style.top = `-${scrollY}`;
};

window.addEventListener('scroll', () => {
  document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
});

// send form

const forms = document.querySelectorAll(".form");
console.log(forms)
forms.forEach((item) => {
  console.log(item);
  item.addEventListener('submit', (evt) => {
    evt.preventDefault();
    showModal('modal-success');
  });
});
