import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import "/node_modules/jquery/dist/jquery.min.js";
import "/node_modules/bootstrap/dist/js/bootstrap.min.js";
import "/node_modules/bootstrap/js/dist/collapse.js";
import Converter from './Converter';
import CurrencyTablePage from './CurrencyTablePage';
import Navbar from './NavBar';
import HomePage from './HomePage';


function App() {
  return (
    <Router basename="/currency-exchange">
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
