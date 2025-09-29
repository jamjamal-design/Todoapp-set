    // ---- Utility functions ----
function getUserSet() {
  let userSetData = localStorage.getItem("userSet");
  return userSetData ? new Set(JSON.parse(userSetData)) : new Set();
}

function saveUserSet(userSet) {
  localStorage.setItem("userSet", JSON.stringify([...userSet]));
}

// ---- Signup ----
function signup(firstname, lastname, email, password) {
  // Trim whitespace from inputs
  firstname = firstname?.trim();
  lastname = lastname?.trim();
  email = email?.trim();
  password = password?.trim();
  
  // Validate inputs
  if (!firstname || !lastname || !email || !password) {
    console.log("Please fill in all fields.");
    return false;
  }

  // Email validation with regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    console.log("Please enter a valid email address.");
    return false;
  }

  let userSet = getUserSet();

  if (userSet.has(email)) {
    console.log("User already exists! Please sign in.");
    return false;
  }

  // Store user data
  userSet.add(email);
  saveUserSet(userSet);
  localStorage.setItem("pass_" + email, password);
  localStorage.setItem("firstname_" + email, firstname);
  localStorage.setItem("lastname_" + email, lastname);
  
  console.log("Account created successfully! Redirecting to sign in...");
  
  // Delay and timeout before redirect
  setTimeout(() => {
    window.location.href = "signin.html";
  }, 1500);
  
  return true;
}

// Form submission handler
function handleSignup(event) {
  if (event) {
    event.preventDefault();
  }
  
  const firstname = document.getElementById('signup-firstname').value;
  const lastname = document.getElementById('signup-lastname').value;
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  
  return signup(firstname, lastname, email, password);
}

// Event listeners setup
document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('.auth-form');
  const button = document.querySelector('.auth-btn');
  
  // Form submission event listener
  if (form) {
    // Convert div back to form for proper form handling
    const formElement = document.createElement('form');
    formElement.className = form.className;
    formElement.innerHTML = form.innerHTML;
    form.parentNode.replaceChild(formElement, form);
    
    formElement.addEventListener('submit', function(event) {
      event.preventDefault();
      handleSignup(event);
      return false;
    });
  }
  
  // Button click event listener
  if (button) {
    button.addEventListener('click', function(event) {
      event.preventDefault();
      handleSignup(event);
      return false;
    });
  }
  
  // Enter key press event listeners for inputs
  const inputs = document.querySelectorAll('input');
  inputs.forEach(input => {
    input.addEventListener('keypress', function(event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        handleSignup(event);
      }
    });
  });
});