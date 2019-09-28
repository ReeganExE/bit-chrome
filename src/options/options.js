import React, { useEffect, useCallback, useState } from 'react';

export default function Options() {
  const [interval, updateInterval] = useState('5m');
  const [cointList, setCointList] = useState([]);
  const [coin, setCoin] = useState('');

  useEffect(() => {
    chrome.storage.sync.get(['interval', 'coin'], ({ interval = '5m', coin }) => {
      updateInterval(interval);
      setCoin(coin);
    });

    fetch('https://api.coinmarketcap.com/v1/ticker/')
      .then(r => r.json())
      .then(setCointList);
  }, []);

  const onCoinChange = useCallback(e => {
    const coin = e.target.value;
    chrome.storage.sync.set({ coin }, () => setCoin(coin));
  }, []);

  const onIntervalChange = useCallback(e => {
    const interval = e.target.value;

    chrome.storage.sync.set({ interval }, () => updateInterval(interval));
  }, []);

  const coinLoaded = cointList.length !== 0;
  return (
    <table>
      <tbody>
        <tr>
          <td>Coin:</td>
          <td>
            <select value={coin} onChange={onCoinChange} disabled={!coinLoaded}>
              { coinLoaded || <option>Loading...</option> }
              { cointList.map(coin => (<option value={coin.id} key={coin.id}>{coin.name}</option>)) }
            </select>
          </td>
        </tr>
        <tr>
          <td>Interval:</td>
          <td>
            <select onChange={onIntervalChange} value={interval}>
              <option value="1m">1m</option>
              <option value="2m">2m</option>
              <option value="3m">3m</option>
              <option value="5m">5m</option>
              <option value="7m">7m</option>
              <option value="10m">10m</option>
            </select>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
