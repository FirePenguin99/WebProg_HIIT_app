const registerElem = document.querySelector('#newUser');
const usernameElem = document.querySelector('#usernameInput');

async function submitNewUser() {
  const payload = {
    name: usernameElem.textContent,
  };

  const response = await fetch('new_user', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    console.log('huzzar!');
  } else {
    console.log('failed to send message');
  }

  window.location.href = 'homepage.html'; // need to make POST response give back the new userId that was just created on the server
}

registerElem.addEventListener('click', submitNewUser);
