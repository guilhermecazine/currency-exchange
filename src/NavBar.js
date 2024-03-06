import React from 'react';
import { Link } from "react-router-dom";
import "./NavBar.css";
import "/node_modules/jquery/dist/jquery.min.js";
import "/node_modules/bootstrap/dist/js/bootstrap.min.js";
import "/node_modules/bootstrap/js/dist/collapse.js";


function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">Currency Converter</Link>

        <div className='nav-items'>
          <Link className="nav-link" to="/Converter">Converter</Link>
          <Link className="nav-link" to="/CurrencyTablePage">Exchange Table</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
