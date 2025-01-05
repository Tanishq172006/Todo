// script.js
document.addEventListener('DOMContentLoaded', () => {
    const addTaskButtons = document.querySelectorAll('.addFileBtn');
    const inbox = document.getElementById('inbox');
    const inboxList = document.getElementById('inboxList');
    const inboxCount = document.getElementById('inboxCount');

    addTaskButtons.forEach(button => {
        button.addEventListener('click', () => {
            const folder = button.parentElement;
            const fileList = folder.querySelector('.file-list');
            let fileCount = fileList.children.length + 1;

            const file = document.createElement('div');
            file.className = 'file';
            file.textContent = `File ${fileCount}`;
            fileList.appendChild(file);
            fileList.scrollTop = fileList.scrollHeight; // Scroll to the bottom

            addToInbox(`File ${fileCount} added to ${folder.querySelector('h2').textContent}`);
        });
    });

    window.addTaskPrompt = function(bulletinId) {
        const task = prompt("Enter new task:");
        if (task) {
            addTask(bulletinId, task);
            addToInbox(`Task added: ${task}`);
        }
    }

    function addTask(bulletinId, task) {
        const bulletin = document.getElementById(bulletinId);
        const ul = bulletin.querySelector('ul');
        const li = document.createElement('li');
        li.innerHTML = `${task} <button onclick="deleteTask(this)">Delete</button> <button onclick="completeTask(this)">Complete</button>`;
        ul.appendChild(li);
    }

    window.completeTask = function(button) {
        const li = button.parentElement;
        li.classList.toggle('completed');
        addToInbox(`Task completed: ${li.textContent}`);
    }

    window.deleteTask = function(button) {
        const li = button.parentElement;
        li.remove();
        addToInbox(`Task deleted: ${li.textContent}`);
    }

    function addToInbox(message) {
        const li = document.createElement('li');
        li.textContent = message;
        inboxList.appendChild(li);
        inboxCount.textContent = inboxList.children.length;
    }

    window.showInbox = function() {
        const tasks = document.querySelector('.tasks');
        tasks.style.display = 'none';
        inbox.style.display = 'block';
    }
});


