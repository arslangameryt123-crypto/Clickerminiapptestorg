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

if (user) {
    userId = user.id;
    console.log("User ID:", userId);
    console.log("User data:", user);
    
    // You can display user info if needed
    // document.getElementById('user-info').innerText = `Hello, ${user.first_name || 'User'}!`;
}

// Send data to bot when needed
function sendDataToBot(data) {
    tg.sendData(JSON.stringify(data));
    // Alternatively, you can close the Web App after sending data
    // tg.close();
}

// Handle main button if needed
tg.MainButton.setText("SAVE SCORE");
tg.MainButton.onClick(() => {
    const score = document.getElementById('score').innerText;
    sendDataToBot({action: "save_score", score: score, userId: userId});
});

// Show main button when score changes
const originalAddScore = game.addScore;
game.addScore = function(points) {
    originalAddScore.call(this, points);
    tg.MainButton.show();
};

// Modify admin link to work in Telegram
document.getElementById('admin-link').addEventListener('click', function(e) {
    if (window.Telegram && window.Telegram.WebApp) {
        e.preventDefault();
        tg.showPopup({
            title: "Admin Panel",
            message: "Admin panel is not available in the mini app. Please use a web browser.",
            buttons: [{type: "ok"}]
        });
    }
});