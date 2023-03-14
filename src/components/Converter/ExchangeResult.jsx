const ExchangeResult = ({ exchangeInfo }) => {
  const {
    fromCurrency,
    toCurrency,
    fromCurrencyName,
    toCurrencyName,
    baseValue,
    convertedValue,
    rate,
  } = exchangeInfo;
  const inverseRate = (1 / rate).toFixed(5);

  return (
    <div className="row mt-5">
      <div className="col-12 d-flex flex-column gap-0">
        <span>
          {baseValue} {fromCurrencyName} = {convertedValue} {toCurrencyName}
        </span>
        <span>
          1 {fromCurrency} = {rate} {toCurrency}
        </span>
        <span>
          1 {toCurrency} = {inverseRate} {fromCurrency}
        </span>
      </div>
    </div>
  );
};

export default ExchangeResult;
