import React from 'react';
import { checkStatus, json } from '../../lib';
import Card from '../Utils/Card';
import CurrencySelect from '../Utils/CurrencySelect';
import RatesTable from './RatesTable';

class Rates extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rates: {},
      baseCurrency: 'EUR',
    };

    this.handleChange = this.handleChange.bind(this);
    this.fetchRates = this.fetchRates.bind(this);
  }

  fetchRates() {
    fetch(`https://api.frankfurter.app/latest?from=${this.state.baseCurrency}`)
      .then(checkStatus)
      .then(json)
      .then((res) => {
        this.setState({ rates: res });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.fetchRates();
  }

  handleChange(event) {
    this.setState({ baseCurrency: event.target.value }, () => {
      this.fetchRates();
    });
  }

  render() {
    const { currencies } = this.props;
    return (
      <Card title="Rates">
        <CurrencySelect
          data={currencies}
          keyId="rates"
          value={this.state.baseCurrency}
          onChange={this.handleChange}
        />

        {this.state.rates.rates && (
          <RatesTable data={this.state.rates} currencies={currencies} />
        )}
      </Card>
    );
  }
}

export default Rates;
