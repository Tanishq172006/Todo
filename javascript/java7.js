// java6.js
document.addEventListener('DOMContentLoaded', () => {
    const addTaskButtons = document.querySelectorAll('.addFileBtn');
    const inboxList = document.getElementById('inboxList');
    const inboxCount = document.getElementById('inboxCount');
    
    let currentTaskElement = null;
    let timerInterval;

    /* addTaskButtons.forEach(button => {
        button.addEventListener('click', () => {
            const folder = button.parentElement;
            const fileList = folder.querySelector('.file-list');
            let fileCount = fileList.children.length + 1;
    
            const file = document.createElement('div');
            const link = document.createElement('a');
            link.href = 'file.html';
            link.textContent = `File ${fileCount}`;
            file.appendChild(link);
            fileList.appendChild(file);
            fileList.scrollTop = fileList.scrollHeight;
    
            addToInbox(`File ${fileCount} added to ${folder.querySelector('h2').textContent}`);
        });
    }); */
    

    window.addTaskPrompt = function (bulletinId) {
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
        li.innerHTML = `${task} <img src="../icons/TIMER-removebg-preview.png" id="clock" onclick="openTimerOverlay(this)"/><img src="../icons/bin-removebg-preview.png" id="delete" onclick="deleteTask(this)"/><img src="../icons/tick-removebg-preview.png" id="tick" onclick="completeTask(this)"/>`;
        ul.appendChild(li);
    }

    window.completeTask = function(button) {
        const li = button.parentElement;
        li.classList.toggle('completed');
        li.remove();
        addToInbox(`Task completed: ${li.textContent}`);
    }

    window.deleteTask = function (button) {
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

    window.openOverlay = function (overlayId) {
        document.getElementById(overlayId).style.display = "block";
    }

    window.closeOverlay = function (overlayId) {
        document.getElementById(overlayId).style.display = "none";
        const timerForm = document.getElementById('timerForm');
        const timerControls = document.getElementById('timerControls');
        if (overlayId === 'timerOverlay') {
            timerForm.style.display = 'block';
            timerControls.style.display = 'none';
            clearInterval(timerInterval);
        }
    }

    let currentTaskElement2; 
    let interval; 

    window.openTimerOverlay = function (button) { 
        document.getElementById('timerOverlay').style.display="block";
        currentTaskElement2 = button.parentElement; 
        openOverlay('timerOverlay'); 
    } 
    
    window.openOverlay = function (overlayId) { 
        document.getElementById(overlayId).style.display = "block"; 
    } 
    
    window.closeOverlay = function (overlayId) {
        document.getElementById(overlayId).style.display = "none"; 
        clearInterval(interval); // Stop the timer when the overlay is closed 
    }

    document.getElementById('timerForm').addEventListener('submit', function (event) {
        event.preventDefault();
        const timerInput = parseInt(document.getElementById('timerInput').value);
        if (isNaN(timerInput) || timerInput <= 0) {
            alert('Please enter a valid number');
            return;
        }
        closeOverlay('timerOverlay');
        openTimerOverlay2('timerOverlay2', timerInput);
    });

    function openTimerOverlay2(overlayId, timerInput) {

        document.getElementById(overlayId).style.display = "block";
        let time = timerInput;
        const timerElement = document.getElementById('timer');
        const updateTimer = () => {
            const minutes = Math.floor(time / 60); 
            const seconds = time % 60; 
            timerElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`; 
            if (time >= 0) { time--; } 
            else { 
                timerElement.textContent = '00:00'; 
                clearInterval(interval); 
                alert('Timer Ended'); 
            }
        }; 
        interval = setInterval(updateTimer, 1000); 
        updateTimer(); // initial call to set the timer display immediately 
    } 
    
    document.getElementById('deleteTaskButton').addEventListener('click', function () { 
        if (currentTaskElement2) 
        { 
            currentTaskElement2.remove(); 
            addToInbox(`Task completed and deleted: ${currentTaskElement2.textContent}`); 
            closeOverlay('timerOverlay2'); 
        } 
    }); 
    
    document.getElementById('keepTaskButton').addEventListener('click', function () { 
        if (currentTaskElement2) 
        { 
            addToInbox(`Task completed: ${currentTaskElement2.textContent}`); 
            closeOverlay('timerOverlay2'); 
        } 
    });

    window.openToDoOverlay = function(overlayId) {
        document.getElementById(overlayId).style.display = "block";
    }

});
