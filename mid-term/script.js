function login() {
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;
  const loginError = document.getElementById("loginError");

  if (username === "admin" && password === "1234") {
    document.getElementById("loginPage").style.display = "none";
    document.getElementById("mainContent").style.display = "block";
    loginError.style.display = "none";
  } else {
    loginError.style.display = "block";
  }
}

var users = [];
var form = document.getElementById("addUserForm");
var userTable = document.getElementById("userTable");
var userCards = document.getElementById("userCards");
var successMessage = document.getElementById("successMessage");

window.addUser = function (e) {
  e.preventDefault();
  clearErrors();

  var email = document.getElementById("email").value;
  var name = document.getElementById("name").value;
  var phone = document.getElementById("phone").value;
  var gender = document.getElementById("gender").value;
  var address = document.getElementById("address").value;

  var isValid = true;

  if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email)) {
    setError(
      document.getElementById("email"),
      "emailError",
      "Please enter a valid email address."
    );
    isValid = false;
  }

  if (!/^[A-Za-z\s]+$/.test(name)) {
    setError(
      document.getElementById("name"),
      "nameError",
      "Please enter a valid name."
    );
    isValid = false;
  }

  if (!/^\d{10}$/.test(phone)) {
    setError(
      document.getElementById("phone"),
      "phoneError",
      "Please enter a valid phone number."
    );
    isValid = false;
  }

  if (gender === "Select Gender") {
    setError(
      document.getElementById("gender"),
      "genderError",
      "Please select a gender."
    );
    isValid = false;
  }

  if (address.trim() === "") {
    setError(
      document.getElementById("address"),
      "addressError",
      "Please enter an address."
    );
    isValid = false;
  }

  if (!isValid) return;

  const editingIndex = form.dataset.editingIndex;

  if (editingIndex !== undefined) {
    users[editingIndex] = { email, name, phone, gender, address };
    delete form.dataset.editingIndex;
  } else {
    users.push({ email, name, phone, gender, address });
  }

  successMessage.style.display = "block";
  form.reset();
  showUsers();
};

function setError(element, error, message) {
  element.classList.add("is-invalid");
  document.getElementById(error).innerText = message;
  document.getElementById(error).style.display = "block";
}

function clearErrors() {
  successMessage.style.display = "none";

  const fields = ["email", "name", "phone", "gender", "address"];
  fields.forEach((field) => {
    const input = document.getElementById(field);
    const errorDiv = document.getElementById(field + "Error");
    input.classList.remove("is-invalid");
    errorDiv.innerText = "";
    errorDiv.style.display = "none";
  });
}

function showUsers() {
  userTable.innerHTML = "";
  userCards.innerHTML = "";

  if (users.length > 0) {
    let table = `
      <table class="table table-bordered table-striped">
        <thead class="table-dark">
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Gender</th>
            <th>Address</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
    `;

    users.forEach((user, index) => {
      table += `
        <tr>
          <td>${user.email}</td>
          <td>${user.name}</td>
          <td>${user.phone}</td>
          <td>${user.gender}</td>
          <td>${user.address}</td>
          <td><button class="btn btn-sm btn-warning me-2" onclick="editUser(${index})">Update</button></td>
          <td><button class="btn btn-sm btn-danger" onclick="deleteUser(${index})">Delete</button></td>
        </tr>
      `;
    });

    table += `</tbody></table>`;
    userTable.innerHTML = table;

    users.forEach((user) => {
      const card = document.createElement("div");
      card.className = "col-md-4";
      card.innerHTML = `
        <div class="card text-dark bg-light mb-3">
          <div class="card-body">
            <h5 class="card-title">${user.name}</h5>
            <p class="card-text">Email: ${user.email}</p>
            <p class="card-text">Phone: ${user.phone}</p>
            <p class="card-text">Gender: ${user.gender}</p>
            <p class="card-text">Address: ${user.address}</p>
          </div>
        </div>
      `;
      userCards.appendChild(card);
    });
  }
}

window.editUser = function (index) {
  const user = users[index];
  document.getElementById("email").value = user.email;
  document.getElementById("name").value = user.name;
  document.getElementById("phone").value = user.phone;
  document.getElementById("gender").value = user.gender;
  document.getElementById("address").value = user.address;

  form.dataset.editingIndex = index;
  document.getElementById("tab1").click();
};

window.deleteUser = function (index) {
  if (confirm("Are you sure you want to delete this user?")) {
    users.splice(index, 1);
    showUsers();
  }
};

window.showTab = function (event) {
  document
    .querySelectorAll(".btn")
    .forEach((btn) => btn.classList.remove("active"));
  event.target.classList.add("active");

  document
    .querySelectorAll(".tab-pane")
    .forEach((tab) => tab.classList.remove("show", "active"));

  const tabId = event.target.id + "-contant";
  const content = document.getElementById(tabId);
  if (content) content.classList.add("show", "active");
};
