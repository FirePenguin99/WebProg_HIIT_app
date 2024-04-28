export function initHistoryStack() {
  sessionStorage.setItem('historyStack', JSON.stringify([]));
  console.log('history stack initialised');
}

export function pushHistoryStack(url) {
  const histStack = JSON.parse(sessionStorage.getItem('historyStack'));

  if (histStack[histStack.length - 1] === window.location.href) { // if current href already exists and the end of the array, don't add another one
    console.log('href already is at back of array');
    return;
  }

  histStack.push(url);
  sessionStorage.setItem('historyStack', JSON.stringify(histStack));
  console.log('hitStack:' + histStack);
}

export function getBackUrl() {
  const histStack = JSON.parse(sessionStorage.getItem('historyStack'));

  histStack.pop(); // needs to remove the just added href of the current page
  const href = histStack.pop();

  sessionStorage.setItem('historyStack', JSON.stringify(histStack));

  window.location.href = href;
}
