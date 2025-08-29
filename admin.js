// Admin functionality

// Check if user is logged in
function checkAuth() {
    if (window.location.pathname.endsWith('admin-panel.html')) {
        const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
        if (!isLoggedIn) {
            window.location.href = 'admin.html';
        }
    }
}

// Login functionality
function setupLogin() {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // Simple authentication (in real app, use secure authentication)
            if (username === 'admin' && password === 'admin') {
                localStorage.setItem('adminLoggedIn', 'true');
                window.location.href = 'admin-panel.html';
            } else {
                document.getElementById('login-message').classList.remove('hidden');
            }
        });
    }
}

// Logout functionality
function setupLogout() {
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('adminLoggedIn');
            window.location.href = 'admin.html';
        });
    }
}

// Populate user data table
function populateUserData() {
    const userDataBody = document.getElementById('user-data-body');
    if (userDataBody) {
        // Simulated user data
        const users = [
            { id: 'user1', score: 45, adsWatched: 3, lastActive: '2023-05-15' },
            { id: 'user2', score: 120, adsWatched: 8, lastActive: '2023-05-16' },
            { id: 'user3', score: 78, adsWatched: 5, lastActive: '2023-05-14' },
            { id: 'user4', score: 32, adsWatched: 2, lastActive: '2023-05-16' },
            { id: 'user5', score: 95, adsWatched: 6, lastActive: '2023-05-15' }
        ];
        
        userDataBody.innerHTML = '';
        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.score}</td>
                <td>${user.adsWatched}</td>
                <td>${user.lastActive}</td>
            `;
            userDataBody.appendChild(row);
        });
    }
}

// Save admin settings
function setupSettingsSaving() {
    const saveSettingsBtn = document.getElementById('save-settings');
    if (saveSettingsBtn) {
        saveSettingsBtn.addEventListener('click', function() {
            const bannerAdsEnabled = document.getElementById('banner-ads-toggle').checked;
            const interstitialAdsEnabled = document.getElementById('interstitial-ads-toggle').checked;
            const rewardedAdsEnabled = document.getElementById('rewarded-ads-toggle').checked;
            const adFrequency = document.getElementById('ad-frequency').value;
            
            // Save settings to localStorage (in real app, would save to server)
            localStorage.setItem('bannerAdsEnabled', bannerAdsEnabled);
            localStorage.setItem('interstitialAdsEnabled', interstitialAdsEnabled);
            localStorage.setItem('rewardedAdsEnabled', rewardedAdsEnabled);
            localStorage.setItem('adFrequency', adFrequency);
            
            alert('Settings saved successfully!');
        });
    }
}

// Load saved settings
function loadSettings() {
    if (document.getElementById('banner-ads-toggle')) {
        document.getElementById('banner-ads-toggle').checked = 
            localStorage.getItem('bannerAdsEnabled') !== 'false'; // Default to true
        
        document.getElementById('interstitial-ads-toggle').checked = 
            localStorage.getItem('interstitialAdsEnabled') !== 'false'; // Default to true
            
        document.getElementById('rewarded-ads-toggle').checked = 
            localStorage.getItem('rewardedAdsEnabled') !== 'false'; // Default to true
            
        document.getElementById('ad-frequency').value = 
            localStorage.getItem('adFrequency') || '5';
    }
}

// Initialize admin functionality
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    setupLogin();
    setupLogout();
    populateUserData();
    setupSettingsSaving();
    loadSettings();
});