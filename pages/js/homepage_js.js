import * as hist from './history_mjs.mjs';

function displayUsername() {
  const name = sessionStorage.getItem('userName');

  console.log(name);

  document.querySelector('#nameHeading').textContent = 'Hello, ' + name;
}

hist.initHistoryStack();
hist.pushHistoryStack(window.location.href);

displayUsername();
