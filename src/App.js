import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Rates from './components/Rates';

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/" component={Rates} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
