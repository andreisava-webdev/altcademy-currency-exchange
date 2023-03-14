import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Converter from './components/Converter';
import Layout from './components/Layout';
import Rates from './components/Rates';
import LoadingSpinner from './components/Utils/LoadingSpinner';
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
      return <LoadingSpinner />;
    }

    return (
      <Router>
        <Layout>
          <Switch>
            <Route path="/" exact>
              <Rates currencies={this.state.currencies} />
            </Route>
            <Route path="/converter">
              <Converter currencies={this.state.currencies} />
            </Route>
          </Switch>
        </Layout>
      </Router>
    );
  }
}

export default App;
