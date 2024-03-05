import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Converter from './Converter';
import CurrencyTablePage from './CurrencyTablePage';
import Navbar from './NavBar';
import HomePage from './HomePage';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/Converter" component={Converter} />
          <Route path="/CurrencyTablePage" component={CurrencyTablePage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
