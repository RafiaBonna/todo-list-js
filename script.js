// Selecting DOM Elements
const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

// Function to save tasks to Local Storage
function saveTasks() {
    const tasks = [];
    
    // Loop through each task item in the UI
    todoList.querySelectorAll('li').forEach(li => {
        const taskSpan = li.querySelector('span');
        tasks.push({
            text: taskSpan.textContent,
            completed: taskSpan.classList.contains('completed')
        });
    });
    
    // Save the array as a text string in local storage
    localStorage.setItem('royalTasks', JSON.stringify(tasks));
}

// Function to load tasks from Local Storage
function loadTasks() {
    const savedTasks = localStorage.getItem('royalTasks');
    if (!savedTasks) return;
    
    const tasks = JSON.parse(savedTasks);
    
    tasks.forEach(task => {
        const li = document.createElement('li');
        
        const taskSpan = document.createElement('span');
        taskSpan.textContent = task.text;
        
        // Restore completed status if true
        if (task.completed) {
            taskSpan.classList.add('completed');
        }
        
        li.appendChild(taskSpan);
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        li.appendChild(deleteBtn);
        
        todoList.appendChild(li);
        
        // Add events to freshly loaded items
        taskSpan.addEventListener('click', function() {
            taskSpan.classList.toggle('completed');
            saveTasks();
        });
        
        deleteBtn.addEventListener('click', function() {
            todoList.removeChild(li);
            saveTasks();
        });
    });
}

// Function to add a new task
function addTask() {
    const taskText = todoInput.value.trim();

    if (taskText === '') {
        alert('Please write a valid task in your diary! ✨');
        return;
    }

    const li = document.createElement('li');

    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;
    li.appendChild(taskSpan);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    li.appendChild(deleteBtn);

    todoList.appendChild(li);
    todoInput.value = '';

    // Save to storage immediately after adding
    saveTasks();

    taskSpan.addEventListener('click', function() {
        taskSpan.classList.toggle('completed');
        saveTasks(); // Resave when status changes
    });

    deleteBtn.addEventListener('click', function() {
        todoList.removeChild(li);
        saveTasks(); // Resave when an item is deleted
    });
}

// Event Listeners
addBtn.addEventListener('click', addTask);

todoInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Load tasks from storage when the page opens
window.addEventListener('DOMContentLoaded', loadTasks);