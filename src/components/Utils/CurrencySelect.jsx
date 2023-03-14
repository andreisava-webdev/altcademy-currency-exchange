const CurrencySelect = ({ data, keyId, value, onChange, name }) => {
  return (
    <select
      name={name}
      id={name}
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

CurrencySelect.defaultProps = {
  name: 'currency',
};

export default CurrencySelect;
