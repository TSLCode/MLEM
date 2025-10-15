function addLog(message, type) {
    const LogContainer = document.getElementById('console');
    const logEntry = document.createElement('div');
    logEntry.className = 'log-entry ' + type;
    logEntry.textContent = message;
    LogContainer.appendChild(logEntry);
    LogContainer.scrollTop = LogContainer.scrollHeight;
}

function clearConsole() {
    const logContainer = document.getElementById('console');
    // Keep the header, remove only log entries
    const header = logContainer.querySelector('.console-header');
    logContainer.innerHTML = '';
    if (header) {
        logContainer.appendChild(header);
    }
    addLog('Console cleared', 'info');
}

addLog('Script loaded', 'error');

window.addLog = addLog;