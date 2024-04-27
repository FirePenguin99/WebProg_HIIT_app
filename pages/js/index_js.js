const guestLoginElem = document.querySelector('#guest_login');

function guestLogin() {
  sessionStorage.setItem('userId', '0000');
  sessionStorage.setItem('userName', 'Guest');

  window.location.href = 'homepage.html';
}

guestLoginElem.addEventListener('click', guestLogin);
