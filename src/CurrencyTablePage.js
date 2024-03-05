import React, { useState, useEffect } from 'react';
import styles from './CurrencyTablePage.module.css';

function CurrencyTablePage() {
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [exchangeRates, setExchangeRates] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    fetch('https://api.frankfurter.app/currencies')
      .then(response => response.json())
      .then(data => {
        setCurrencies(Object.keys(data));
      })
      .catch(error => {
        console.error('Error fetching currencies:', error);
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://api.frankfurter.app/latest?base=${baseCurrency}`)
      .then(response => response.json())
      .then(data => {
        setExchangeRates(data.rates);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching exchange rates:', error);
        setIsLoading(false);
      });
  }, [baseCurrency]);

  const handleBaseCurrencyChange = event => {
    setBaseCurrency(event.target.value);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Exchange Rates</h1>
      <div className={styles.selectContainer}>
        <label htmlFor="baseCurrency" className={styles.label}>Select Base Currency:</label>
        <select id="baseCurrency" value={baseCurrency} onChange={handleBaseCurrencyChange} className={styles.select}>
          {currencies.map(currency => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.tableHeader}>Currency</th>
                <th className={styles.tableHeader}>Exchange Rate</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(exchangeRates).map((currency, index) => (
                <tr key={currency} className={index % 2 === 0 ? styles.tableRow : `${styles.tableRow} ${styles.odd}`}>
                  <td className={styles.tableData}>{currency}</td>
                  <td className={styles.tableData}>{exchangeRates[currency]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default CurrencyTablePage;
