let data;

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

export { data };
