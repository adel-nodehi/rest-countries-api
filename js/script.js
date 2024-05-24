import './theme.js';
import { data } from './fetch.js';

const container = document.querySelector('.container');
const sortByOptions = document.querySelector('#sort-by__options');
const filterByOptions = document.querySelector('#filter-by__options');
const layout = document.querySelector('.layout');

const btnSortBy = document.querySelector('#sort-by__btn');
const btnFilterBy = document.querySelector('#filter-by__btn');

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

data.forEach(country => renderCountry(country));
