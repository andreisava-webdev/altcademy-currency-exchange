import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Converter from './components/Converter';
import Layout from './components/Layout';
import Rates from './components/Rates';
import { checkStatus, json } from './lib';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currencies: {},
      isLoading: false,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    fetch('https://api.frankfurter.app/currencies')
      .then(checkStatus)
      .then(json)
      .then((data) => this.setState({ currencies: data, isLoading: false }))
      .catch((error) => console.log(error));
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div className="container p-5">
          <div className="row">
            <div className="col-12 d-flex flex-column align-items-center">
              <div className="spinner-border">
                <span className="visually-hidden">Loading...</span>
              </div>
              <h1 className="fs-4">Loading...</h1>
            </div>
          </div>
        </div>
      );
    }

    return (
      <Router>
        <Layout>
          <Switch>
            <Route path="/" exact>
              <Rates currencies={this.state.currencies} />
            </Route>
            <Route path="/converter" component={Converter} />
          </Switch>
        </Layout>
      </Router>
    );
  }
}

export default App;
