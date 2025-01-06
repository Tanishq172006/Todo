document.addEventListener('DOMContentLoaded', () => {
    updateTaskCounts();
});

function updateTaskCounts() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const todayCount = tasks.length; // Assuming all tasks are for today

    document.getElementById('todayCount').innerText = todayCount;
}
