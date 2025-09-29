    // ---- Utility functions ----
function getUserSet() {
  let userSetData = localStorage.getItem("userSet");
  return userSetData ? new Set(JSON.parse(userSetData)) : new Set();
}

function saveUserSet(userSet) {
  localStorage.setItem("userSet", JSON.stringify([...userSet]));
}

// ---- Signin ----
function signin(email, password) {
  // Validate inputs
  if (!email || !password) {
    console.log("Please fill in all fields.");
    return false;
  }

  let userSet = getUserSet();

  if (!userSet.has(email)) {
    console.log("User does not exist. Please sign up.");
    return false;
  }

  let storedPassword = localStorage.getItem("pass_" + email);

  if (storedPassword === password) {
    localStorage.setItem("currentUser", email);
    console.log("Login successful! Redirecting to dashboard...");
    
    // Redirect to dashboard page
    window.location.href = "dashboard.html";
    return true;
  } else {
    console.log("Wrong password.");
    return false;
  }
}

    // ---- Logout ----
    function logout() {
      localStorage.removeItem("currentUser");
      document.getElementById("todo-app").style.display = "none";
      document.getElementById("auth").style.display = "block";
    }