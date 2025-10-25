// ======================================================
// 🧩 To-Do List App (CRUD + LocalStorage)
// Create | Read | Update | Delete
// Using Pure JavaScript (no frameworks)
// ======================================================

// ======================================
// 🟢 [1] SELECT ELEMENTS
// ======================================
let input = document.getElementById('task-input');
let addButton = document.getElementById('add-task-button');
let list = document.getElementById('task-list');

// ======================================
// 🟢 [2] INITIAL DATA
// Load tasks from localStorage (if any)
// ======================================
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// ======================================
// 🟢 [3] SAVE FUNCTION
// Save the current task list to localStorage
// ======================================
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// ======================================
// 🟢 [4] CREATE FUNCTION
// Add a new task
// ======================================
addButton.addEventListener('click', function () {
  let taskText = input.value.trim();
  if (taskText !== '') {
    const task = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };

    tasks.push(task);
    saveTasks();
    renderTasks();
    input.value = '';
  }
});

// ======================================
// 🟢 [5] READ FUNCTION
// Render tasks dynamically
// ======================================
function renderTasks() {
  list.innerHTML = '';

  tasks.forEach((task) => {
    const li = document.createElement('li');
    li.classList.toggle('completed', task.completed);

    li.innerHTML = `
      <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
      <div class="task-buttons">
        <button class="done">${task.completed ? 'Back to Incomplete' : 'Done'}</button>
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
      </div>
    `;

    // 🟩 Done button
    li.querySelector('.done').addEventListener('click', () => {
      task.completed = !task.completed;
      saveTasks();
      renderTasks();
    });

    // 🟦 Edit button
    li.querySelector('.edit').addEventListener('click', () => {
      let newText = prompt('Edit task:', task.text);
      if (newText !== null && newText.trim() !== '') {
        task.text = newText.trim();
        saveTasks();
        renderTasks();
      }
    });

    // 🟥 Delete button
    li.querySelector('.delete').addEventListener('click', () => {
      tasks = tasks.filter((t) => t.id !== task.id);
      saveTasks();
      renderTasks();
    });

    list.appendChild(li);
  });
}

// ======================================
// 🟢 [6] ENTER KEY EVENT
// Add task when pressing Enter
// ======================================
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    addButton.click();
  }
});

// ======================================
// 🟢 [7] INITIAL RENDER
// ======================================
renderTasks();
