// hide contact default
// source https://codepen.io/kalaganov5/pen/gOedWWR
const hideContacts = (selector = ".contacts__link") => {
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

export {hideContacts};
