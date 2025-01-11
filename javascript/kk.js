const tasks = [
    // Example task objects
    { title: 'Task 1', description: 'Description 1', time: '12:00', dateInput: '2025-01-10', priority: 'High', completed: false },
    { title: 'Task 2', description: 'Description 2', time: '15:00', dateInput: '2025-01-10', priority: 'Medium', completed: false }
];

function addTask() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const time = document.getElementById('time').value;
    const dateInput = new Date().toISOString().split('T')[0]; // Get today's date in 'YYYY-MM-DD' format
    const priority = document.getElementById('priority').value;

    const task = { title, description, time, dateInput, priority, completed: false };
    tasks.push(task);
    displayTasks();
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

// Initial call to display today's tasks
document.addEventListener('DOMContentLoaded', displayTasks);

/*function goHome() {
    window.location.href = '../index.html';
}*/

