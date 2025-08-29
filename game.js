// Game logic
const game = {
    score: 0,
    
    init: function() {
        // Try to get user ID from Telegram
        let userId = null;
        if (window.Telegram && window.Telegram.WebApp) {
            const user = window.Telegram.WebApp.initDataUnsafe.user;
            userId = user ? user.id : 'anonymous';
        }
        
        // Load saved score if available
        const storageKey = userId ? `gameScore_${userId}` : 'gameScore';
        const savedScore = localStorage.getItem(storageKey);
        if (savedScore) {
            this.score = parseInt(savedScore);
        }
        
        this.updateScore();
        
        // Set up click button
        const clickBtn = document.getElementById('click-btn');
        if (clickBtn) {
            clickBtn.addEventListener('click', () => {
                this.addScore(1);
            });
        }
    },
    
    addScore: function(points) {
        this.score += points;
        this.updateScore();
        
        // Save score with user ID if available
        let userId = null;
        if (window.Telegram && window.Telegram.WebApp) {
            const user = window.Telegram.WebApp.initDataUnsafe.user;
            userId = user ? user.id : 'anonymous';
        }
        
        const storageKey = userId ? `gameScore_${userId}` : 'gameScore';
        localStorage.setItem(storageKey, this.score);
    },
    
    updateScore: function() {
        const scoreElement = document.getElementById('score');
        if (scoreElement) {
            scoreElement.textContent = this.score;
        }
    }
};

// Initialize game when document is loaded
document.addEventListener('DOMContentLoaded', function() {
    game.init();
});