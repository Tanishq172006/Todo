class Task {
    constructor(title, description, time, priority, completed = false) {
        this.title = title;
        this.description = description;
        this.time = time;
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
            taskItem.innerHTML = `
                <strong>${task.title}</strong> - ${task.description} <br>
                Time: ${task.time} <br>
                Priority: ${task.priority} <br>
                Status: ${task.completed ? 'Completed' : 'Pending'} <br>
                <button onclick="calendar.completeTask('${task.title}')">Complete</button>
                <button onclick="calendar.deleteTask('${task.title}')">Delete</button>
            `;
            taskList.appendChild(taskItem);
        });
    }

    deleteTask(title) {
        this.tasks = this.tasks.filter(task => task.title !== title);
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

function addTask() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const time = document.getElementById('time').value;
    const priority = document.getElementById('priority').value;
    
    if (title && description && time) {
        calendar.addTask(title, description, time, priority);
    } else {
        alert('Please fill in all fields.');
    }
}

function goHome() {
    window.location.href = '../index.html';
}
