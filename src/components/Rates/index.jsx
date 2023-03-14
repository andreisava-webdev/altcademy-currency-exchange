import React from 'react';
import { fetchCurrencies } from '../../lib';
import Card from '../Utils/Card';
import CurrencySelect from '../Utils/CurrencySelect';

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
        <div className="row">
          <div className="col">
            <CurrencySelect data={this.state.currencies} keyId="rates" />
          </div>
        </div>
      </Card>
    );
  }
}

export default Rates;
