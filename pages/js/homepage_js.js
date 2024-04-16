function displayUsername() {
  const name = sessionStorage.getItem('userName');

  console.log(name);

  document.querySelector('#nameHeading').textContent = 'Hello, ' + name;
}

displayUsername();
