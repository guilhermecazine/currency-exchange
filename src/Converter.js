import React, { useState, useEffect } from 'react';
import './Converter.css'; 

const Converter = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [exchangeRate, setExchangeRate] = useState(null);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    const fetchCurrencies = async () => {
      const response = await fetch('https://api.frankfurter.app/currencies');
      const data = await response.json();
      setCurrencies(Object.keys(data));
      setFromCurrency('EUR');
      setToCurrency('USD');
    };

    fetchCurrencies();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (fromCurrency && toCurrency) {
        const response = await fetch(`https://api.frankfurter.app/latest?from=${fromCurrency}&to=${toCurrency}`);
        const data = await response.json();
        setExchangeRate(data.rates[toCurrency]);
      }
    };

    fetchData();
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    if (exchangeRate && amount) {
      const converted = (amount * exchangeRate).toFixed(2);
      setConvertedAmount(converted);
    }
  }, [exchangeRate, amount]);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleFromCurrencyChange = (e) => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value);
  };

  return (
    <div className="converter-container">
      <h2>Converter</h2>
      <div className="converter-form">
        <input type="number" style={{width: 150 + 'px'}} placeholder="Amount" value={amount} onChange={handleAmountChange} min="0"/>
        <select value={fromCurrency} onChange={handleFromCurrencyChange}>
          {currencies.map(currency => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
        <span>to</span>
        <select value={toCurrency} onChange={handleToCurrencyChange}>
          {currencies.map(currency => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
      </div>
      {convertedAmount && (
        <p className='result'>{amount} {fromCurrency} = {convertedAmount} {toCurrency}</p>
      )}
    </div>
  );
};

export default Converter;