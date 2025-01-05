// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Add New Task
    window.addTaskPrompt = function(bulletinId) {
        const task = prompt("Enter new task:");
        if (task) {
            addTask(bulletinId, task);
        }
    }

    function addTask(bulletinId, task) {
        const bulletin = document.getElementById(bulletinId);
        const ul = bulletin.querySelector('ul');
        const li = document.createElement('li');
        li.innerHTML = `${task} <button onclick="deleteTask(this)">Delete</button> <button onclick="completeTask(this)">Complete</button>`;
        ul.appendChild(li);
    }

    // Mark Task as Complete
    window.completeTask = function(button) {
        const li = button.parentElement;
        li.classList.toggle('completed');
    }

    // Delete Task
    window.deleteTask = function(button) {
        const li = button.parentElement;
        li.remove();
    }
});
