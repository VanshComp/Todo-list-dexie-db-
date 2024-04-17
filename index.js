// Initialize Dexie database
const db = new Dexie("TodoDB");
db.version(1).stores({ todos: "++id, todo" });

const form = document.querySelector("#new-task-form");
const input = document.querySelector("#new-task-input");
const listEl = document.querySelector("#tasks");

// Function to add a new todo
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const todoText = input.value.trim(); // Trim any leading or trailing whitespaces
  if (todoText) { // Check if the input value is not empty
    await db.todos.add({ todo: todoText });
    await getTodos();
    form.reset();
  }
});

// Function to display all todos
const getTodos = async () => {
  const allTodos = await db.todos.toArray();
  listEl.innerHTML = allTodos.map(todo => `
    <div class="task">
      <div class="content">
        <input class="text" readonly value="${todo.todo}">
      </div>
      <div class="actions">
        <button class="delete" onclick="deleteTodo(${todo.id})">Delete</button>
      </div>
    </div>
  `).join("");
};

// Call getTodos when the page loads
window.onload = getTodos;

// Function to delete a todo
const deleteTodo = async (id) => {
  await db.todos.delete(id);
  await getTodos();
};