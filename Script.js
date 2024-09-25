document.addEventListener("DOMContentLoaded", loadTasks);
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

taskForm.addEventListener('submit', addTask);

function addTask(e) {
    e.preventDefault();

    const taskValue = taskInput.value;
    if (taskValue === '') return;

    // Create a new task item
    const li = document.createElement('li');
    li.className = 'task-item';
    li.innerHTML = `
        ${taskValue}
        <button class="delete-btn">Delete</button>
    `;
    
    // Append to the task list
    taskList.appendChild(li);

    // Save task in local storage
    saveTaskInLocalStorage(taskValue);

    // Clear input
    taskInput.value = '';
}

function saveTaskInLocalStorage(task) {
    let tasks = getTasksFromLocalStorage();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = getTasksFromLocalStorage();
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'task-item';
        li.innerHTML = `
            ${task}
            <button class="delete-btn">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

function getTasksFromLocalStorage() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    return tasks;
}

// Delete task
taskList.addEventListener('click', removeTask);

function removeTask(e) {
    if (e.target.classList.contains('delete-btn')) {
        e.target.parentElement.remove();

        // Remove from local storage
        removeTaskFromLocalStorage(e.target.parentElement.textContent.trim());
    }
}

function removeTaskFromLocalStorage(taskToRemove) {
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.filter(task => task !== taskToRemove);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
