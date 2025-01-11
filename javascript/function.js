class Task {
    constructor(title, description, time, priority, completed, dateInput = false) {
        this.title = title;
        this.description = description;
        this.time = time;
        this.dateInput = dateInput;
        this.priority = priority;
        this.completed = completed;
    }

    markCompleted() {
        this.completed = true;
    }
}

class TodayCalendar {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        this.renderTasks();
    }

    addTask(title, description, time, priority) {
        const task = new Task(title, description, time, priority);
        this.tasks.push(task);
        this.saveTasks();
        this.renderTasks();
        updateTaskCounts(); // Update task counts
    }

    renderTasks() {
        const taskList = document.getElementById('taskList');
        const taskCount = document.getElementById('taskCount');
        taskList.innerHTML = '';
        taskCount.innerHTML = `Total Tasks: ${this.tasks.length}`;

        this.tasks.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.className = 'task';
            //const ul = bulletin.querySelector('ul');
            //const li = document.createElement('li');
            //taskItem.innerHTML = `${title} <img src="../icons/TIMER-removebg-preview.png" id="clock" onclick="openTimerOverlay(this)"/><img src="../icons/bin-removebg-preview.png" id="delete" onclick="deleteTask(this)"/><img src="../icons/tick-removebg-preview.png" id="tick" onclick="completeTask(this)"/>`;
            //ul.appendChild(li);
            taskItem.innerHTML = `
            <div class="task">
                <div class="task-header">
                    <h3>${task.title}</h3>
                <div class="task-actions">
                    <img src="../icons/TIMER-removebg-preview.png" id="clock" onclick="openTimerOverlay(this)" alt="Timer"/>
                    <img src="../icons/bin-removebg-preview.png" id="delete" onclick="calendar.deleteTask('${task.title}','${task.time}')" alt="Delete"/>
                    <img src="../icons/tick-removebg-preview.png" id="tick" onclick="calendar.completeTask('${task.title}')" alt="Complete"/>
                </div>
            </div>
                <div class="task-details">
                    <p><strong>Description:</strong> ${task.description}</p>
                    <p><strong>Time:</strong> ${task.time}</p>
                    <p><strong>Date:</strong> ${task.dateInput}</p>
                    <p><strong>Priority:</strong> ${task.priority}</p>
                    <p><strong>Status:</strong> ${task.completed ? 'Completed' : 'Pending'}</p>
                </div>
            </div>`;
taskList.appendChild(taskItem);

        });
    }

    deleteTask(title , time) {
        this.tasks = this.tasks.filter(task => !(task.title === title && task.time === time));

        this.saveTasks();
        this.renderTasks();
        updateTaskCounts(); // Update task counts
    }

    completeTask(title) {
        const task = this.tasks.find(task => task.title === title);
        if (task) {
            task.markCompleted();
            this.saveTasks();
            this.renderTasks();
            updateTaskCounts(); // Update task counts
        }
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
        
    }
}

const calendar = new TodayCalendar();

function addTask(bulletinId) {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const time = document.getElementById('time').value;
    const dateInput = document.getElementById('date-input').value;
    const priority = document.getElementById('priority').value;
    const bulletin = document.getElementById(bulletinId);


    if (title && description && time) {
        calendar.addTask(title, description, time, priority);
    } else {
        alert('Please fill in all fields.');
    }
}

function displayTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = ''; // Clear existing tasks

    const today = new Date().toISOString().split('T')[0]; // Get today's date in 'YYYY-MM-DD' format
    const currentTime = new Date().toTimeString().split(' ')[0].substring(0, 5); // Get current time in 'HH:MM' format

    tasks.forEach(task => {
        if (task.dateInput === today && task.time >= currentTime) {
            const taskItem = document.createElement('li');
            taskItem.className = 'task';
            taskItem.innerHTML = `
                <div class="task">
                    
                    
                    <div class="task-details">
                        <p><strong>Description:</strong> ${task.description}</p>
                        <p><strong>Time:</strong> ${task.time}</p>
                        <p><strong>Date:</strong> ${task.dateInput}</p>
                        <p><strong>Priority:</strong> ${task.priority}</p>
                        <p><strong>Status:</strong> ${task.completed ? 'Completed' : 'Pending'}</p>
                    </div>
                </div>
            `;
            taskList.appendChild(taskItem);
        }
    });

    document.getElementById('taskCount').innerText = `Total Tasks: ${tasks.filter(task => task.dateInput === today && task.time >= currentTime).length}`;
}

// Call displayTasks periodically every minute
setInterval(displayTasks, 60000);

function goHome() {
    window.location.href = 'index.html';
}

function setAlert() {
    const dateInput = document.getElementById('date-input').value;
    if (!dateInput) {
        alert('Please select a date.');
        return;
    }

    const selectedDate = new Date(dateInput);
    const now = new Date();
    const difference = selectedDate - now;
    const eighteenHoursInMs = 18 * 60 * 60 * 1000;

    if (difference <= eighteenHoursInMs) {
        alert('The selected date is less than 18 hours away.');
        return;
    }

    const alertTime = difference - eighteenHoursInMs;

    setTimeout(() => {
        alert('The selected date is less than 18 hours away.');
    }, alertTime);

    alert('Alert set successfully!');
}
