const CurrencySelect = ({ data, keyId, value, onChange }) => {
  return (
    <select
      name="baseCurrency"
      id=""
      className="form-select"
      value={value}
      onChange={onChange}
    >
      {Object.keys(data).map((val) => (
        <option key={`${keyId}-${val}`} value={val}>
          {val}
        </option>
      ))}
    </select>
  );
};

export default CurrencySelect;
