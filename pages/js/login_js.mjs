import * as users from '../users.mjs';

for (let i = 0; i < users.userList.length; i++) {
  const userElem = document.createElement('div');
  const usernameElem = document.createElement('p');

  usernameElem.textContent = users.userList[i].username;

  userElem.append(usernameElem);

  document.body.append(userElem);

  userElem.addEventListener('click', () => { loginAsUser(users.userList[i].id); });
}

function loginAsUser(id) {
  users.setCurrentUserId(id);

  window.location.href = 'homepage.html';
}
