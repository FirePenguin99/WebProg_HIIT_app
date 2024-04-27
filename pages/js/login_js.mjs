let userList;

async function loadUserList() {
  const response = await fetch('users');
  if (response.ok) {
    userList = await response.json();

    console.log(userList);

    createUserElems();
  } else {
    userList = ['failed to load messages :-('];
  }
}

function createUserElems() {
  for (let i = 1; i < userList.length; i++) { // i = 1 as userlist[0] is the Guest login user
    const userElem = document.createElement('div');
    const usernameElem = document.createElement('p');

    usernameElem.textContent = userList[i].username;

    userElem.append(usernameElem);

    document.querySelector('#loginList').append(userElem);

    userElem.addEventListener('click', () => { loginAsUser(userList[i].id, userList[i].username); });
  }
}


function loginAsUser(id, username) {
  console.log(id);
  sessionStorage.setItem('userId', id);
  sessionStorage.setItem('userName', username);

  window.location.href = 'homepage.html';
}

loadUserList();
