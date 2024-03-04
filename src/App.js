import React from 'react';
import Navbar from './NavBar'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import Converter from './Converter';


function App() {
  return (
    <div className="App">
      <Navbar />
      <Converter />
    </div>
  );
}

export default App;
