import { renderCountries } from './renderCountry.js';

const btnContainer = document.querySelector('.pagination__btns');
const btnPrevious = document.querySelector('.pagination__previous-btn');
const btnnext = document.querySelector('.pagination__next-btn');

const itemPerPage = 20;
let currentPage = 1;

let currentData;

////////////////////////////
// Funtions

const createBtns = function () {
  const btnCount = Math.ceil(currentData.length / itemPerPage);

  btnContainer.innerHTML = '';

  for (let i = 0; i < btnCount; i++) {
    const btn = document.createElement('button');
    btn.classList.add('pagination__btn');
    btn.dataset.id = i + 1;
    btn.innerHTML = `${i + 1}`;

    btnContainer.append(btn);
  }
};

const activateBtn = function () {
  [...btnContainer.children].forEach(btn =>
    btn.classList.remove('pagination__btn--active')
  );

  btnContainer
    .querySelector(`[data-id = "${currentPage}"]`)
    .classList.add('pagination__btn--active');
};

const renderPage = function () {
  const startIndex = currentPage * itemPerPage - 20;
  const endIndex = currentPage * itemPerPage - 1;

  const data = currentData.slice(startIndex, endIndex);

  renderCountries(data);

  if (!currentData[0]) return;

  activateBtn();
};

const render = function (data) {
  currentData = data;

  createBtns();

  renderPage();
};

//////////////////////////
// Event

btnContainer.addEventListener('click', function (e) {
  const btn = e.target.closest('.pagination__btn');

  currentPage = btn.dataset.id;

  renderPage();
});

btnPrevious.addEventListener('click', function () {
  if (currentPage <= 1) return;

  currentPage--;
  renderPage();
});

btnnext.addEventListener('click', function () {
  const maxPageNumpers = Math.ceil(currentData.length / itemPerPage);

  if (currentPage >= maxPageNumpers) return;

  currentPage++;
  renderPage();
});

export default {
  render,
};
