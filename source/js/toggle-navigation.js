const toggleNavigation = () => {
  const menuButton = document.querySelector('#header-menu-toggle');
  const menu = document.querySelector('#main-navigation');

  const toggleMenu = () => {
    menuButton.classList.toggle('hamburger__button--show');
    menu.classList.toggle('navigation--show');

    document.addEventListener('click', closeMenuIsClickWithout);

    const isCloseMenu = !menu.classList.contains('navigation--show');
    if (isCloseMenu) {
      document.removeEventListener('click', closeMenuIsClickWithout);
    }
  }

  const closeMenuIsClickWithout = (evt) => {
    const target = evt.target;
    let isMenu = target === menu || menu.contains(target);
    let hamburger = target === menuButton || menuButton.contains(target);
    let isMenuActive = menu.classList.contains('navigation--show');

    if (!isMenu && !hamburger && isMenuActive) {
      toggleMenu();
    }
  };

  menuButton.addEventListener('click', toggleMenu);
}

export {toggleNavigation};
