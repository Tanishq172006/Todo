// script.js
document.addEventListener('DOMContentLoaded', () => {
    const addTaskButtons = document.querySelectorAll('.addFileBtn');
    const inboxList = document.getElementById('inboxList');
    const inboxCount = document.getElementById('inboxCount');
    let currentTaskElement = null;

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
        li.innerHTML = `${task} <button onclick="deleteTask(this)">Delete</button> <button onclick="openTimerOverlay(this)">Complete</button>`;
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

    window.openOverlay = function(overlayId) {
        document.getElementById(overlayId).style.display = "block";
    }

    window.closeOverlay = function(overlayId) {
        document.getElementById(overlayId).style.display = "none";
    }

    window.openTimerOverlay = function(button) {
        currentTaskElement = button.parentElement;
        openOverlay('timerOverlay');
    }

    document.getElementById('timerForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const timerInput = document.getElementById('timerInput').value;
        const taskText = currentTaskElement.textContent;

        if (timerInput && currentTaskElement) {
            setTimeout(() => {
                currentTaskElement.remove();
                addToInbox(`Task completed: ${taskText}`);
                closeOverlay('timerOverlay');
            }, timerInput * 1000);
        }
    });
});

