const CurrencySelect = ({ data, keyId }) => {
  return (
    <select name="baseCurrency" id="" className="form-select">
      {Object.keys(data).map((val) => (
        <option key={`${keyId}-${val}`} value={val.toLowerCase()}>
          {val}
        </option>
      ))}
    </select>
  );
};

export default CurrencySelect;
