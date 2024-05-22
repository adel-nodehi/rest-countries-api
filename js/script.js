const btnChangeTheme = document.querySelector('.header__theme-btn');

/**
 *
 */
const capilize = word => `${word[0].toUpperCase()}${word.slice(1)}`;

const theme = function () {
  const updateLocalStorageTheme = function (theme) {
    localStorage.setItem('theme', theme);
  };

  const updateThemeButtonText = function (theme = null) {
    const changeTo = theme ? theme : localStorage.getItem('theme');

    btnChangeTheme.lastElementChild.textContent = `${capilize(
      changeTo === 'dark' ? 'light' : 'dark'
    )} Mode`;
  };

  const getUserTheme = function () {
    const systemSettingDark = window.matchMedia('(prefers-color-scheme: dark)');
    return systemSettingDark.matches ? 'dark' : 'light';
  };

  const setTheme = function () {
    // check if we have theme in localStorage
    const hasLocalStorageTheme = localStorage.getItem('theme');
    const changeTo = hasLocalStorageTheme
      ? hasLocalStorageTheme
      : getUserTheme();

    if (!hasLocalStorageTheme) updateLocalStorageTheme(changeTo);

    document.querySelector('html').dataset.theme = changeTo;
    updateThemeButtonText(changeTo);
  };
  setTheme();

  btnChangeTheme.addEventListener('click', function () {
    const current = localStorage.getItem('theme');
    const changeToTheme = current === 'dark' ? 'light' : 'dark';

    updateLocalStorageTheme(changeToTheme);

    setTheme();
  });
};
theme();
