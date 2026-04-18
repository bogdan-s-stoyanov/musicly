const mockUser = {
  username: "admin",
  password: "1234"
};

function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (username === mockUser.username && password === mockUser.password) {
    alert("Login successful!");
    window.location.href = "app.html";
  } else {
    alert("Invalid username or password!");
  }
}

function registerUser() {
  const username = document.getElementById("registerUsername").value.trim();
  const password = document.getElementById("registerPassword").value.trim();
  const confirmPassword = document.getElementById("confirmPassword").value.trim();

  if (!username || !password || !confirmPassword) {
    alert("Please fill in all fields.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  alert("Account created successfully!");
  window.location.href = "login.html";
}