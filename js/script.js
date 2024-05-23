const container = document.querySelector('.container');
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

let data;

const renderCountry = function (country) {
  const html = `
        <div class="cart">
         <div class="cart__img-wrapper">
            <img
            src="${country.flags.png}"
            alt="country flag"
            class="cart__img"
            />
          </div>
          
          <h2 class="cart__title">${country.name.official}</h2>
          <ul class="cart__infos">
            <li class="cart__info">
              <strong>Capital:</strong>
              ${country.capital[0]}
            </li>
            <li class="cart__info">
              <strong>Region:</strong>
              ${country.region}
            </li>
            <li class="cart__info">
              <strong>Population:</strong>
              ${(country.population / 1_000_000).toFixed(1)}M
            </li>
          </ul>
        </div>`;

  container.insertAdjacentHTML('afterbegin', html);
};

const getData = async function () {
  try {
    if (JSON.parse(localStorage.getItem('data'))) {
      data = JSON.parse(localStorage.getItem('data'));
      return;
    }

    const respons = await fetch(
      'https://restcountries.com/v3.1/independent?status=true'
    );

    data = await respons.json();

    localStorage.setItem('data', JSON.stringify(data));
  } catch (err) {
    console.log('Problem in fetching data');
    console.log(err);
  }
};
getData();

data.forEach(country => renderCountry(country));
console.log(data);
