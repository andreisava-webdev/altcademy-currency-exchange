import React from 'react';
import { fetchCurrencies } from '../../lib';
import Card from '../Utils/Card';
import CurrencySelect from '../Utils/CurrencySelect';
import RatesTable from './RatesTable';

class Rates extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currencies: {},
    };
  }

  componentDidMount() {
    fetchCurrencies().then((res) => {
      this.setState({ currencies: res });
    });
  }

  render() {
    return (
      <Card title="Rates">
        <CurrencySelect data={this.state.currencies} keyId="rates" />

        <RatesTable />
      </Card>
    );
  }
}

export default Rates;
