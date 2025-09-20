// Initialize Telegram Web App
let tg = window.Telegram.WebApp;

// Expand the app to full screen
tg.expand();

// Enable closing confirmation
tg.enableClosingConfirmation();

// Handle theme change
tg.onEvent('themeChanged', () => {
    document.documentElement.setAttribute('data-theme', tg.colorScheme);
});

// Set initial theme
document.documentElement.setAttribute('data-theme', tg.colorScheme);

// Get user data
const user = tg.initDataUnsafe.user;
let userId = null;

// Check if the app was launched with a /start command
function checkForStartCommand() {
    // Method 1: Check URL parameters (common way Telegram passes start data)
    const urlParams = new URLSearchParams(window.location.search);
    const startParam = urlParams.get('startapp');
    
    // Method 2: Check Telegram WebApp init data
    const tgStartParam = tg.initDataUnsafe.start_param;
    
    if (startParam || tgStartParam) {
        showWelcomeMessage();
        return true;
    }
    
    // Method 3: Check if we're launched from a /start command by looking at referrer
    if (document.referrer.includes('t.me') && !localStorage.getItem('welcomeShown')) {
        showWelcomeMessage();
        localStorage.setItem('welcomeShown', 'true');
        return true;
    }
    
    return false;
}

// Show welcome message function
function showWelcomeMessage() {
    // Create and show welcome message
    const welcomeHTML = `
        <div id="welcome-overlay" class="ad-overlay" style="display: flex;">
            <div class="ad-content">
                <h2>🎉 Welcome to Clicker App! 🎉</h2>
                <p>Get ready to tap your way to satisfaction! This is a simple, pure, and addictive game with one goal: Click the button as many times as you can!</p>
                
                <p>There's no leaderboard (yet!), no shop, just you versus the click. How high can you go?</p>
                
                <h3>🚀 How to play:</h3>
                <ul>
                    <li>Tap the "CLICK ME!" button below. Each tap adds +1 to your total.</li>
                    <li>Your score is saved just for you. Come back anytime to pick up where you left off!</li>
                    <li>Challenge yourself to beat your personal best!</li>
                </ul>
                
                <p>Ready to build your clicking legacy? Let's begin!</p>
                <p><strong>👉 Simply tap the button below to start clicking!</strong></p>
                
                <button id="close-welcome" class="btn-primary">Start Clicking!</button>
            </div>
        </div>
    `;
    
    // Add to document
    document.body.insertAdjacentHTML('beforeend', welcomeHTML);
    
    // Add event listener to close button
    document.getElementById('close-welcome').addEventListener('click', function() {
        document.getElementById('welcome-overlay').style.display = 'none';
    });
}

if (user) {
    userId = user.id;
    console.log("User ID:", userId);
    console.log("User data:", user);
}

// Check for start command when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Small delay to ensure everything is loaded
    setTimeout(() => {
        checkForStartCommand();
    }, 500);
});

// Send data to bot when needed
function sendDataToBot(data) {
    tg.sendData(JSON.stringify(data));
}

// Handle main button if needed
tg.MainButton.setText("SAVE SCORE");
tg.MainButton.onClick(() => {
    const score = document.getElementById('score').innerText;
    sendDataToBot({action: "save_score", score: score, userId: userId});
});

// Show main button when score changes
// We need to check if game exists first to avoid errors
if (typeof game !== 'undefined') {
    const originalAddScore = game.addScore;
    game.addScore = function(points) {
        originalAddScore.call(this, points);
        if (tg && tg.MainButton) {
            tg.MainButton.show();
        }
    };
}

// Modify admin link to work in Telegram
const adminLink = document.getElementById('admin-link');
if (adminLink) {
    adminLink.addEventListener('click', function(e) {
        if (window.Telegram && window.Telegram.WebApp) {
            e.preventDefault();
            tg.showPopup({
                title: "Admin Panel",
                message: "Admin panel is not available in the mini app. Please use a web browser.",
                buttons: [{type: "ok"}]
            });
        }
    });
}