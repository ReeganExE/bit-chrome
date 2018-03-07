import ms from 'ms';

async function refresh() {
  const [bit] = await fetch('https://api.coinmarketcap.com/v1/ticker/bitcoin/?convert=vnd').then(res => res.json());
  const [text] = bit.price_usd.split('.');
  chrome.browserAction.setBadgeText({ text });
  chrome.browserAction.setTitle({ title: bit.price_usd });
}

let timer;

chrome.storage.sync.get('interval', ({ interval = '5m' }) => {
  timer = setInterval(refresh, ms(interval));
  refresh();
});

chrome.storage.onChanged.addListener(({ interval }) => {
  clearInterval(timer);
  timer = setInterval(refresh, ms(interval.newValue) || 5000);
});

chrome.browserAction.onClicked.addListener(() => window.open('https://coinmarketcap.com/'));
