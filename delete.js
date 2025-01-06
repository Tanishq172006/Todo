document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.addFileBtn').addEventListener('click', addFile);
    document.querySelector('.clearAllBtn').addEventListener('click', clearAllData);
    loadFiles();
});

function addFile() {
    const fileName = prompt('Enter the file name:');
    if (!fileName) return;

    const fileList = document.getElementById('fileList');
    const fileId = 'file-' + Date.now();
    
    const fileDiv = document.createElement('div');
    fileDiv.classList.add('file');
    fileDiv.innerHTML = `
        <h4 contenteditable="true">${fileName}</h4>
        <button onclick="openNotes('${fileId}')">Open Notes</button>
        <button onclick="deleteFile('${fileId}', this)">Delete File</button>
    `;
    
    fileDiv.querySelector('button[onclick^="openNotes"]').setAttribute('data-file-id', fileId);
    fileDiv.querySelector('button[onclick^="deleteFile"]').setAttribute('data-file-id', fileId);
    
    fileList.appendChild(fileDiv);
    saveFiles();
}

function saveFiles() {
    const fileList = document.getElementById('fileList').innerHTML;
    localStorage.setItem('fileList', fileList);
}

function loadFiles() {
    const savedFileList = localStorage.getItem('fileList');
    if (savedFileList) {
        document.getElementById('fileList').innerHTML = savedFileList;
        document.querySelectorAll('.file button').forEach(button => {
            if (button.textContent === 'Open Notes') {
                button.onclick = function() {
                    openNotes(button.getAttribute('data-file-id'));
                };
            }
            if (button.textContent === 'Delete File') {
                button.onclick = function() {
                    deleteFile(button.getAttribute('data-file-id'), button);
                };
            }
        });
    }
}

function openNotes(fileId) {
    window.location.href = `file.html?fileId=${fileId}`;
}

function deleteFile(fileId, button) {
    if (confirm('Are you sure you want to delete this file?')) {
        const fileDiv = button.parentElement;
        fileDiv.remove();
        localStorage.removeItem(fileId);
        saveFiles();
    }
}

function clearAllData() {
    if (confirm('Are you sure you want to clear all data?')) {
        localStorage.clear();
        document.getElementById('fileList').innerHTML = '';
    }
}

