import ms from 'ms';

const DEFAULT_COIN = 'bitcoin';

let coin = DEFAULT_COIN;

async function refresh() {
  const [bit] = await fetch(`https://api.coinmarketcap.com/v1/ticker/${coin}/?convert=vnd`).then(res => res.json());
  const [text] = bit.price_usd.split('.');
  chrome.browserAction.setBadgeText({ text: text === '0' ? bit.price_usd : text });
  chrome.browserAction.setTitle({ title: `${bit.name} - ${bit.price_usd}` });
}

let timer;

chrome.storage.sync.get(['interval', 'coin'], ({ interval = '5m', coin: newCoin = DEFAULT_COIN }) => {
  coin = newCoin;
  timer = setInterval(refresh, ms(interval));
  refresh();
});

chrome.storage.onChanged.addListener(({ interval, coin: newCoin = DEFAULT_COIN }) => {
  if (interval) {
    clearInterval(timer);
    timer = setInterval(refresh, ms(interval.newValue) || 5000);
  }

  coin = newCoin ? newCoin.newValue : coin;

  refresh();
});

chrome.browserAction.onClicked.addListener(() => window.open('https://coinmarketcap.com/'));
