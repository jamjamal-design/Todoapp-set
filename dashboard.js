// ---- Utility functions ----
function getUserSet() {
  let userSetData = localStorage.getItem("userSet");
  return userSetData ? new Set(JSON.parse(userSetData)) : new Set();
}

function saveUserSet(userSet) {
  localStorage.setItem("userSet", JSON.stringify([...userSet]));
}

// ---- Logout ----
function logout() {
  localStorage.removeItem("currentUser");
  // Redirect to signin page
  window.location.href = "signin.html";
}

    // ---- Todo logic ----
    function addTodo() {
      let todoInput = document.getElementById("todo-input");
      let todoText = todoInput.value.trim();
      if (todoText === "") return;

      let currentUser = localStorage.getItem("currentUser");
      let todos = JSON.parse(localStorage.getItem("todos_" + currentUser)) || [];

      todos.push(todoText);
      localStorage.setItem("todos_" + currentUser, JSON.stringify(todos));

      todoInput.value = "";
      renderTodos();
    }

    function deleteTodo(index) {
      let currentUser = localStorage.getItem("currentUser");
      let todos = JSON.parse(localStorage.getItem("todos_" + currentUser)) || [];

      todos.splice(index, 1);
      localStorage.setItem("todos_" + currentUser, JSON.stringify(todos));

      renderTodos();
    }

    function editTodo(index) {
      let currentUser = localStorage.getItem("currentUser");
      let todos = JSON.parse(localStorage.getItem("todos_" + currentUser)) || [];

      let list = document.getElementById("todo-list");
      let li = list.children[index];

      // replace text with input field
      let textEl = li.querySelector(".todo-text");
      let oldText = textEl.innerText;
      textEl.innerHTML = `<input type="text" value="${oldText}" id="edit-input-${index}">`;

      // change actions to save + cancel
      let actions = li.querySelector(".actions");
      actions.innerHTML = `
        <button class="save" onclick="saveEdit(${index})">Save</button>
        <button onclick="renderTodos()">Cancel</button>
      `;
    }

    function saveEdit(index) {
      let currentUser = localStorage.getItem("currentUser");
      let todos = JSON.parse(localStorage.getItem("todos_" + currentUser)) || [];

      let input = document.getElementById("edit-input-" + index);
      todos[index] = input.value.trim();

      localStorage.setItem("todos_" + currentUser, JSON.stringify(todos));
      renderTodos();
    }

    function renderTodos() {
      let currentUser = localStorage.getItem("currentUser");
      let todos = JSON.parse(localStorage.getItem("todos_" + currentUser)) || [];

      let list = document.getElementById("todo-list");
      let emptyState = document.getElementById("empty-state");
      let todoCount = document.getElementById("todo-count");
      
      list.innerHTML = "";

      // Update todo count
      if (todoCount) {
        const count = todos.length;
        todoCount.textContent = count === 1 ? "1 task" : `${count} tasks`;
      }

      // Show/hide empty state
      if (todos.length === 0) {
        if (emptyState) emptyState.style.display = "block";
      } else {
        if (emptyState) emptyState.style.display = "none";
        
        todos.forEach((todo, index) => {
          let li = document.createElement("li");
          li.innerHTML = `
            <span class="todo-text">${todo}</span>
            <div class="actions">
              <button class="edit" onclick="editTodo(${index})">✏️ Edit</button>
              <button class="delete" onclick="deleteTodo(${index})">🗑️ Delete</button>
            </div>
          `;
          list.appendChild(li);
        });
      }
    }

    function showTodoApp() {
      let currentUser = localStorage.getItem("currentUser");
      if (!currentUser) {
        // If no user is logged in, redirect to signin
        window.location.href = "signin.html";
        return;
      }

      // Get user's first name for welcome message
      let firstName = localStorage.getItem("firstname_" + currentUser);
      let displayName = firstName || currentUser;

      document.getElementById("todo-app").style.display = "block";
      document.getElementById("welcome").innerText = "Welcome, " + displayName + "!";
      renderTodos();
    }

    // ---- Auto show todos if already logged in ----
    window.onload = function() {
      showTodoApp();
    };