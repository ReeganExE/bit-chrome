document.getElementById('interval').addEventListener('change', e => {
  chrome.storage.sync.set({
    interval: e.target.value
  }, () => {
    const status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(() => {
      status.textContent = '';
    }, 750);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get('interval', ({ interval }) => {
    document.getElementById('interval').value = interval;
  });
});
