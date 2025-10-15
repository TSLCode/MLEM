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


function addScore() {
    addLog('Add Score button clicked', 'info');
    if (typeof supabase === 'undefined') {
        addLog('Supabase client not available. Cannot add score.', 'error');
    } else {
        const name = 'Player' + Math.floor(Math.random() * 1000);
        const score = Math.floor(Math.random() * 100);
        supabase
            .from('leaderboard')
            .insert([{name, score}])
            .then(({ data, error }) => {
                if (error) {
                    addLog('Error adding score: ' + error, 'error');
                } else {
                    addLog('Added score successfully: ' + JSON.stringify(data), 'success');
                    loadLeaderboard(supabase);
                }
            })
    }
}

document.addEventListener('DOMContentLoaded', () => {
    addLog('Getting event listeners...', 'info');
    const addScoreBtn = document.getElementById('add-score-btn');
    addScoreBtn.addEventListener('click', addScore());
})

addLog('Script loaded', 'error');

window.addLog = addLog;