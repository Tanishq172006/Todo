class Task {
    constructor(title, description, time, priority, date) {
        this.title = title;
        this.description = description;
        this.time = time;
        this.priority = priority;
        this.date = date;
        this.completed = false;
    }

    markCompleted() {
        this.completed = true;
    }
}

class TodayCalendar {
    constructor() {
        this.tasks = [];
        this.currentMonth = new Date().getMonth();
        this.currentYear = new Date().getFullYear();
        this.renderCalendar();
    }

    renderCalendar() {
        const calendarDays = document.getElementById('calendarDays');
        const monthAndYear = document.getElementById('monthAndYear');
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const firstDay = new Date(this.currentYear, this.currentMonth).getDay();
        const daysInMonth = 32 - new Date(this.currentYear, this.currentMonth, 32).getDate();

        calendarDays.innerHTML = "";
        monthAndYear.innerHTML = `${months[this.currentMonth]} ${this.currentYear}`;

        for (let i = 0; i < firstDay; i++) {
            const emptyCell = document.createElement('div');
            calendarDays.appendChild(emptyCell);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const dayCell = document.createElement('div');
            dayCell.innerText = i;
            dayCell.onclick = () => this.selectDate(i);
            calendarDays.appendChild(dayCell);
        }
    }

    selectDate(day) {
        const date = new Date(this.currentYear, this.currentMonth, day).toDateString();
        document.getElementById('taskDate').innerText = `Tasks for ${date}`;
        this.renderTasks(date);
    }

    renderTasks(date) {
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = '';
        this.tasks.filter(task => task.date === date).forEach(task => {
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

    addTask(title, description, time, priority, date) {
        const task = new Task(title, description, time, priority, date);
        this.tasks.push(task);
        this.renderTasks(date);
    }

    deleteTask(title) {
        const date = document.getElementById('taskDate').innerText.replace('Tasks for ', '');
        this.tasks = this.tasks.filter(task => task.title !== title);
        this.renderTasks(date);
    }

    completeTask(title) {
        const date = document.getElementById('taskDate').innerText.replace('Tasks for ', '');
        const task = this.tasks.find(task => task.title === title);
        if (task) {
            task.markCompleted();
            this.renderTasks(date);
        }
    }
}

const calendar = new TodayCalendar();

document.querySelector('.prev').onclick = () => {
    calendar.currentMonth = (calendar.currentMonth === 0) ? 11 : calendar.currentMonth - 1;
    calendar.currentYear = (calendar.currentMonth === 11) ? calendar.currentYear - 1 : calendar.currentYear;
    calendar.renderCalendar();
};

document.querySelector('.next').onclick = () => {
    calendar.currentMonth = (calendar.currentMonth === 11) ? 0 : calendar.currentMonth + 1;
    calendar.currentYear = (calendar.currentMonth === 0) ? calendar.currentYear + 1 : calendar.currentYear;
    calendar.renderCalendar();
};

function addTask() {
    const title = document.getElementById('taskTitle').value;
    const description = document.getElementById('taskDescription').value;
    const time = document.getElementById('taskTime').value;
    const priority = document.getElementById('taskPriority').value;
    const date = document.getElementById('taskDate').innerText.replace('Tasks for ', '');

    if (title && description && time && date) {
        calendar.addTask(title, description, time, priority, date);
    } else {
        alert('Please fill in all fields.');
    }
}

