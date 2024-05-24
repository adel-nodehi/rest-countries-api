const container = document.querySelector('.container');

const renderCountries = function (countries) {
  container.innerHTML = '';

  countries.forEach(country => {
    const html = `
              <div class="cart">
               <div class="cart__img-wrapper">
                  <img
                  src="${country.flags.png}"
                  alt="country flag"
                  class="cart__img"
                  />
                </div>
                
                <h2 class="cart__title">${country.name.common}</h2>
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

    container.insertAdjacentHTML('beforeend', html);
  });
};

export { renderCountries };
