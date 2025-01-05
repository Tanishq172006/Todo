// script.js
document.addEventListener('DOMContentLoaded', () => {
    const addTaskButtons = document.querySelectorAll('.addFileBtn'); //for adding files in sidebar
    const inboxList = document.getElementById('inboxList'); //for adding the changes done to the page
    const inboxCount = document.getElementById('inboxCount'); //for no. of changes made
    

    //to add files in the sidebar on clicking 'Add File'
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
        li.innerHTML = `${task} <button onclick="openTimerOverlay(this)"><img src="./TIMER.png" id="clock"/></button><button onclick="deleteTask(this)"><img src="./bin.png" id="delete"/></button><button onclick="completeTask(this)"><img src="./tick.png" id="tick"/></button>`;
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

    window.openTimerOverlay = function(button) {
        currentTaskElement = button.parentElement;
        openOverlay('timerOverlay2');
    }

    document.getElementById('timerForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const timerInput = parseInt(document.getElementById('timerInput').value);
        if (isNaN(timerInput) || timerInput <= 0) {
            alert('Please enter a valid number');
            return;
        }

        closeOverlay('timerOverlay2');
        const timerDisplay = document.getElementById('timerDisplay');
        timerDisplay.textContent = `Time left: ${timerInput}s`;
        document.getElementById('timerForm').style.display = 'none';
        document.getElementById('timerControls').style.display = 'block';

        let timeRemaining = timerInput;
        timerInterval = setInterval(() => {
            if (timeRemaining <= 0) {
                clearInterval(timerInterval);
                timerDisplay.textContent = `Time's up!`;
                openOverlay('timerOverlay2');
            } else {
                timeRemaining--;
                timerDisplay.textContent = `Time left: ${timeRemaining}s`;
            }
        }, 1000);
    });

    window.openOverlay = function(overlayId) {
        document.getElementById(overlayId).style.display = "block";
    }

    window.closeOverlay = function(overlayId) {
        document.getElementById(overlayId).style.display = "none";
    }

    window.openToDoOverlay = function(overlayId) {
        document.getElementById(overlayId).style.display = "block";
    }

});
