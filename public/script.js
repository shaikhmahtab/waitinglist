const userForm = document.getElementById('userForm');
const userTableBody = document.getElementById('userTableBody');

userForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const age = document.getElementById('age').value;
  const city = document.getElementById('city').value;
  console.log(name);


  const response = await fetch('/addUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, age, city }),
  });

  if (response.ok) {
    console.log("successful reponse from node")
    const newUser = await response.json();
    addUserToTable(newUser);
    userForm.reset();
  }
});

function addUserToTable(user) {
  const newRow = userTableBody.insertRow();
  const cell1 = newRow.insertCell(0);
  const cell2 = newRow.insertCell(1);
  const cell3 = newRow.insertCell(2);

  cell1.innerHTML = user.name;
  cell2.innerHTML = user.age;
  cell3.innerHTML = user.city;
}
