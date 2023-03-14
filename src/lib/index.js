export const checkStatus = (response) => {
  if (response.ok) {
    return response;
  }
  throw new Error('Request was either a 404 or 500');
};

export const json = (response) => response.json();

export const fetchCurrencies = () => {
  return fetch('https://api.frankfurter.app/currencies')
    .then(checkStatus)
    .then(json)
    .then((data) => data)
    .catch((error) => {
      console.log(error);
    });
};