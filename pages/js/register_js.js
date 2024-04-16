const registerElem = document.querySelector('#newUser');
const usernameElem = document.querySelector('#usernameInput');

async function submitNewUser() {
  const payload = {
    name: usernameElem.value,
  };

  const response = await fetch('new_user', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  console.log(payload);

  if (response.ok) {
    console.log('huzzar!');
    const newUserId = await response.json();

    sessionStorage.setItem('userId', newUserId);
    window.location.href = 'homepage.html'; // need to make POST response give back the new userId that was just created on the server
  } else {
    console.log('failed to send message');
  }
}

registerElem.addEventListener('click', submitNewUser);
