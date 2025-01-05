// script.js
document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('input');
    const output = document.getElementById('output');

    input.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            const command = input.value;
            if (command.trim() !== '') {
                output.innerHTML += `<div class="command">> ${command}</div>`;
                handleCommand(command);
                input.value = '';
                output.scrollTop = output.scrollHeight;
            }
        }
    });

    function handleCommand(command) {
        let response;
        switch (command.toLowerCase()) {
            case 'help':
                response = 'Available commands: help, date, clear';
                break;
            case 'date':
                response = new Date().toString();
                break;
            case 'clear':
                output.innerHTML = '';
                return;
            default:
                response = `Command not found: ${command}`;
        }
        output.innerHTML += `<div class="response">${response}</div>`;
    }
});
