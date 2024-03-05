import React from 'react';
import { Link } from 'react-router-dom';
import "./HomePage.css";

function HomePage() {
  return (
    <div className="home-container">
      <h1>Welcome to Currency Converter App</h1>
      <p>Please select an option:</p>
      <ul>
        <li>
          <Link to="/Converter">Converter</Link>
        </li>
        <li>
          <Link to="/CurrencyTablePage">Exchange Table</Link>
        </li>
      </ul>
    </div>
  );
}

export default HomePage;
