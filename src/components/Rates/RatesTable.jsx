const RatesTable = ({ data, currencies }) => {
  return (
    <table className="table mt-3">
      <thead>
        <tr className="text-success">
          <th>Currency</th>
          <th>Rate</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(data.rates).map((val) => (
          <tr key={val} className="text-secondary">
            <td>
              {val} ({currencies[val]})
            </td>
            <td>{data.rates[val]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RatesTable;
