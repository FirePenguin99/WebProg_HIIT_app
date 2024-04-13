function displayUsername() {
  const name = sessionStorage.getItem('userId');

  console.log(name);

  document.querySelector('#nameHeading').textContent = 'Hello, ' + name;
}

displayUsername();
