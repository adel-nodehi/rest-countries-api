let data;

try {
  if (JSON.parse(localStorage.getItem('data'))) {
    console.log('data is in the localstorage');
    data = JSON.parse(localStorage.getItem('data'));
  } else {
    console.log('fetching data');
    const respons = await fetch(
      'https://restcountries.com/v3.1/independent?status=true'
    );

    data = await respons.json();

    localStorage.setItem('data', JSON.stringify(data));
  }
} catch (err) {
  const html = `
  <div class="error">
    <h2>Something went wrong</h2>
    <p><strong>error massage:</strong> ${err.message}</p>

    turn on your vpn or change your server and try again.
  </div>`;

  document.querySelector('.main').insertAdjacentHTML('afterbegin', html);
  console.log('Something go wrong in fetching data');
  console.error(err.message);
}

export { data };
