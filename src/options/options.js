import React from 'react';

export default class Options extends React.Component {
  state = { interval: '5m', cointList: [], coin: '' }

  componentDidMount() {
    chrome.storage.sync.get(['interval', 'coin'], ({ interval = '5m', coin }) => {
      this.setState({ interval, coin });
    });

    fetch('https://api.coinmarketcap.com/v1/ticker/')
      .then(r => r.json())
      .then(cointList => this.setState({ cointList }));
  }

  onCoinChange = e => {
    const coin = e.target.value;
    chrome.storage.sync.set({ coin }, () => this.setState({ coin }));
  }

  onIntervalChange = e => {
    const interval = e.target.value;

    chrome.storage.sync.set({ interval }, () => this.setState({ interval }));
  }

  render() {
    return (
      <table>
        <tbody>
          <tr>
            <td>Coin:</td>
            <td>
              <select value={this.state.coin} onChange={this.onCoinChange}>
                { this.state.cointList.map(coin => (<option value={coin.id} key={coin.id}>{coin.name}</option>)) }
              </select>
            </td>
          </tr>
          <tr>
            <td>Interval:</td>
            <td>
              <select onChange={this.onIntervalChange} value={this.state.interval}>
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
}
