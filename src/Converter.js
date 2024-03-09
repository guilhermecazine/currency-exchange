import React, { useState, useEffect } from 'react';
import './Converter.css';
import { Chart } from 'chart.js';

const Converter = () => {
  // Existing state variables
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [exchangeRate, setExchangeRate] = useState(null);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [currencies, setCurrencies] = useState([]);
  const [historicalRates, setHistoricalRates] = useState(null);
  const [historicalChart, setHistoricalChart] = useState(null);

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

  const getHistoricalRates = async () => {
    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date((new Date()).getTime() - (30 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];
    const response = await fetch(`https://api.frankfurter.app/${startDate}..${endDate}?from=${fromCurrency}&to=${toCurrency}`);
    const data = await response.json();
    setHistoricalRates(data.rates);
  };

  useEffect(() => {
    getHistoricalRates();
  }, [fromCurrency, toCurrency]);

  const buildHistoricalChart = () => {
    if (!historicalRates) return;

    const chartLabels = Object.keys(historicalRates);
    const chartData = chartLabels.map(date => historicalRates[date][toCurrency]);

    const ctx = document.getElementById('chart').getContext('2d');
  
    if (historicalChart) {
      historicalChart.destroy(); // Destroy the previous chart instance
    }

    const newChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: chartLabels,
        datasets: [{
          label: `Historical Rates (${fromCurrency}/${toCurrency})`,
          data: chartData,
          borderColor: 'blue',
          borderWidth: 1,
          fill: false
        }]
      }
    });

    setHistoricalChart(newChart);
  };

  useEffect(() => {
    buildHistoricalChart();
  }, [historicalRates]);

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
      <canvas id="chart"></canvas>
    </div>
  );
};

export default Converter;
