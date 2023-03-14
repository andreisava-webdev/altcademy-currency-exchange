import React from 'react';
import { withRouter } from 'react-router-dom';
import { checkStatus, json } from '../../lib';
import Card from '../Utils/Card';
import CurrencySelect from '../Utils/CurrencySelect';
import ExchangeResult from './ExchangeResult';
import ReverseButton from './ReverseButton';
import Chart from 'chart.js';

class Converter extends React.Component {
  constructor(props) {
    super(props);

    const params = new URLSearchParams(props.location.search);

    this.state = {
      fromCurrency: params.get('from') || 'USD',
      toCurrency: params.get('to') || 'EUR',
      baseValue: 1,
      convertedValue: 1,
      rate: 1,
    };

    this.chartRef = React.createRef();

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
      fetch(
        `https://api.frankfurter.app/latest?from=${this.state.fromCurrency}&to=${this.state.toCurrency}`
      )
        .then(checkStatus)
        .then(json)
        .then((data) => {
          this.setState({ rate: data.rates[this.state.toCurrency] }, () => {
            this.convert();
          });
        })
        .catch((error) => console.log(error));
    }
  }

  componentDidMount() {
    this.fetchRate();
    this.getHistoricalRates(this.state.fromCurrency, this.state.toCurrency);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value }, () => {
      this.fetchRate();
      this.getHistoricalRates(this.state.fromCurrency, this.state.toCurrency);
    });
  }

  getHistoricalRates = (fromCurrency, toCurrency) => {
    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0];

    fetch(
      `https://api.frankfurter.app/${startDate}..${endDate}?from=${fromCurrency}&to=${toCurrency}`
    )
      .then(checkStatus)
      .then(json)
      .then((data) => {
        if (data.error) {
          throw new Error(data.error);
        }
        const chartLabels = Object.keys(data.rates);
        const chartData = Object.values(data.rates).map(
          (rate) => rate[toCurrency]
        );
        const chartLabel = `${fromCurrency}/${toCurrency}`;
        this.buildChart(chartLabels, chartData, chartLabel);
      })
      .catch((error) => console.error(error.message));
  };

  buildChart = (labels, data, label) => {
    const chartRef = this.chartRef.current.getContext('2d');
    if (typeof this.chart !== 'undefined') {
      this.chart.destroy();
    }
    this.chart = new Chart(this.chartRef.current.getContext('2d'), {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: label,
            data,
            fill: false,
            tension: 0,
          },
        ],
      },
      options: {
        responsive: true,
      },
    });
  };

  render() {
    const { fromCurrency, toCurrency, baseValue, convertedValue, rate } =
      this.state;
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

        <ExchangeResult exchangeInfo={exchangeInfo} />

        <canvas ref={this.chartRef} />
      </Card>
    );
  }
}

export default withRouter(Converter);
