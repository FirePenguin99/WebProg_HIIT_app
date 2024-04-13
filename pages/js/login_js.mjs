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
  for (let i = 0; i < userList.length; i++) {
    const userElem = document.createElement('div');
    const usernameElem = document.createElement('p');

    usernameElem.textContent = userList[i].username;

    userElem.append(usernameElem);

    document.body.append(userElem);

    userElem.addEventListener('click', () => { loginAsUser(userList[i].id); });
  }
}


function loginAsUser(id) {
  // setCurrentUserId(id); change to sessionstorage version
  console.log(id);

  window.location.href = 'homepage.html';
}

loadUserList();
