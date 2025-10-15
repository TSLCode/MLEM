// Remove the import statement since we're making addLog global

// Use CDN version for browser compatibility
const SUPABASE_URL = 'https://wkjnfbamdxoozwmsamdx.supabase.co';

// For browser environment, you need to set the key directly or use a different approach
// Since process.env doesn't work in browsers:
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indram5mYmFtZHhvb3p3bXNhbWR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1MTE0NjEsImV4cCI6MjA3NjA4NzQ2MX0.ftSyW2BwSgCidY8RNg8vfzV2U63PSvEeogXaLmzm0FI'; // Replace with your actual anon key

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    addLog('DOM loaded, starting setup...', 'info');
    addLog('test error log', 'error');

    if (!SUPABASE_KEY || SUPABASE_KEY.includes('your-supabase-key')) {
        addLog('SUPABASE-KEY is not properly configured', 'error');
        addLog('Please set a valid Supabase anon key in setup.js', 'error');
        return;
    }

    addLog('Supabase key found', 'success');

    // Check if Supabase is already loaded
    if (typeof supabase === 'undefined') {
        addLog('Loading Supabase client from CDN...', 'info');
        // Load Supabase from CDN
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
        script.onload = () => {
            addLog('Supabase client loaded successfully', 'success');
            initializeSupabase();
        };
        script.onerror = () => {
            addLog('Failed to load Supabase client from CDN', 'error');
        };
        document.head.appendChild(script);
    } else {
        addLog('Supabase client already available', 'info');
        initializeSupabase();
    }
});

function initializeSupabase() {
    addLog('Initializing Supabase connection...', 'info');

    try {
        const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
        addLog('Supabase client initialized', 'success');
        loadLeaderboard(client);
    } catch (error) {
        addLog('Error initializing Supabase: ' + error.message, 'error');
    }
}

async function loadLeaderboard(client) {
    addLog('Fetching leaderboard data...', 'info');

    try {
        const { data, error } = await client
            .from('leaderboard')
            .select('*')
            .order('score', { ascending: false })
            .limit(10);

        if (error) {
            addLog('Error fetching leaderboard: ' + error.message, 'error');
            return;
        }

        addLog(`Successfully fetched ${data?.length || 0} leaderboard entries`, 'success');
        populateLeaderboard(data || []);

    } catch (error) {
        addLog('Unexpected error: ' + error.message, 'error');
    }
}

function populateLeaderboard(leaderboard) {
    const tableBody = document.querySelector('#leaderboard tbody');
    if (!tableBody) {
        addLog('Leaderboard table body not found', 'error');
        return;
    }

    tableBody.innerHTML = '';

    if (leaderboard.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="3" style="text-align: center;">No leaderboard data available</td>';
        tableBody.appendChild(row);
        addLog('No data to display in leaderboard', 'info');
        return;
    }

    leaderboard.forEach((entry, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    <td>${index + 1}</td>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                <td>${entry.username || 'Unknown'}</td>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            <td>${entry.score || 0}</td>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             `;
        tableBody.appendChild(row);
    });

    addLog('Leaderboard populated successfully', 'success');
}