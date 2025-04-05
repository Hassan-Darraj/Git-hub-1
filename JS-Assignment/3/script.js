function validate() {
  const error1 = document.getElementById("errorMessage1");
  const error2 = document.getElementById("errorMessage2");
  const error3 = document.getElementById("errorMessage3");
  const error4 = document.getElementById("errorMessage4");
  const error5 = document.getElementById("errorMessage5");
  let isValid = true;
  const username = document.getElementById("username").value;
  if (username === "") {
    error1.textContent = "Username is empty";
    isValid = false;
  }
  const email = document.getElementById("mail").value;
  if (email === "") {
    error2.textContent = "Email is empty";
    isValid = false;
  }
  const password = document.getElementById("password").value.trim();
  if (password === "") {
    error3.textContent = "Password is empty";
    isValid = false;
  }
  const confirmPassword = document
    .getElementById("confirmPassword")
    .value.trim();
  if (confirmPassword === "") {
    error4.textContent = "Confirm Password is empty";
    isValid = false;
  }

  if (password !== confirmPassword) {
    error5.textContent = "Passwords do not match";
    isValid = false;
  }

  return isValid;
}
