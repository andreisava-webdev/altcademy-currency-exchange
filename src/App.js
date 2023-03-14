import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/">
            <div>
              <h1>Currency Exchange</h1>
            </div>
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
