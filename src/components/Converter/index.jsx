import React from 'react';
import { checkStatus, json } from '../../lib';
import Card from '../Utils/Card';
import CurrencySelect from '../Utils/CurrencySelect';
import LoadingSpinner from '../Utils/LoadingSpinner';
import ExchangeResult from './ExchangeResult';
import ReverseButton from './ReverseButton';

class Converter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fromCurrency: 'USD',
      toCurrency: 'EUR',
      baseValue: 1,
      convertedValue: 1,
      rate: 1,
      isLoading: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.reverseCurrencies = this.reverseCurrencies.bind(this);
    this.convert = this.convert.bind(this);
    this.fetchRate = this.fetchRate.bind(this);
  }

  reverseCurrencies() {
    this.setState(
      {
        fromCurrency: this.state.toCurrency,
        toCurrency: this.state.fromCurrency,
      },
      () => {
        this.fetchRate();
      }
    );
  }

  convert() {
    this.setState({ convertedValue: this.state.baseValue * this.state.rate });
  }

  fetchRate() {
    if (this.state.fromCurrency === this.state.toCurrency) {
      this.setState({ rate: 1 }, () => {
        this.convert();
      });
    } else {
      this.setState({ isLoading: true });
      fetch(
        `https://api.frankfurter.app/latest?from=${this.state.fromCurrency}&to=${this.state.toCurrency}`
      )
        .then(checkStatus)
        .then(json)
        .then((data) => {
          this.setState(
            { rate: data.rates[this.state.toCurrency], isLoading: false },
            () => {
              this.convert();
            }
          );
        })
        .catch((error) => console.log(error));
    }
  }

  componentDidMount() {
    this.fetchRate();
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value }, () => {
      this.fetchRate();
    });
  }

  render() {
    const {
      fromCurrency,
      toCurrency,
      baseValue,
      convertedValue,
      rate,
      isLoading,
    } = this.state;
    const { currencies } = this.props;
    const fromCurrencyName = currencies[fromCurrency];
    const toCurrencyName = currencies[toCurrency];

    const exchangeInfo = {
      fromCurrency,
      toCurrency,
      baseValue,
      convertedValue,
      rate,
      fromCurrencyName,
      toCurrencyName,
    };

    return (
      <Card title="Converter">
        <div className="row">
          <div className="col-12 col-md-5 mt-2">
            <CurrencySelect
              name="fromCurrency"
              data={this.props.currencies}
              keyId="fromCurrency"
              value={this.state.fromCurrency}
              onChange={this.handleChange}
            />
          </div>
          <div className="col-12 col-md-2 mt-2 d-flex justify-content-center align-items-center">
            <ReverseButton onClick={this.reverseCurrencies} />
          </div>
          <div className="col-12 col-md-5 mt-2">
            <CurrencySelect
              name="toCurrency"
              data={this.props.currencies}
              keyId="toCurrency"
              value={this.state.toCurrency}
              onChange={this.handleChange}
            />
          </div>
          <div className="col-12 mt-2">
            <input
              type="number"
              className="form-control"
              placeholder="Value to convert"
              value={this.state.baseValue}
              name="baseValue"
              onChange={this.handleChange}
            />
          </div>
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <ExchangeResult exchangeInfo={exchangeInfo} />
        )}
      </Card>
    );
  }
}

export default Converter;
