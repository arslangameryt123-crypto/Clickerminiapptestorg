// Shared JavaScript functions

// Simulate ad network functions
const adNetwork = {
    // Show banner ad
    showBanner: function() {
        console.log("Banner ad displayed");
        // In a real implementation, this would call the ad network SDK
    },
    
    // Show interstitial ad
    showInterstitial: function() {
        console.log("Interstitial ad displayed");
        document.getElementById('interstitial-ad').classList.remove('hidden');
        // In a real implementation, this would call the ad network SDK
    },
    
    // Show rewarded ad
    showRewarded: function() {
        console.log("Rewarded ad displayed");
        document.getElementById('rewarded-ad').classList.remove('hidden');
        
        // Simulate ad timer
        let timeLeft = 5;
        const timerElement = document.getElementById('timer');
        const timerInterval = setInterval(() => {
            timeLeft--;
            timerElement.textContent = timeLeft;
            
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                // Grant reward
                if (typeof game !== 'undefined') {
                    game.addScore(10);
                }
            }
        }, 1000);
        
        // In a real implementation, this would call the ad network SDK
    },
    
    // Show pop ad
    showPop: function() {
        console.log("Pop ad displayed");
        document.getElementById('pop-ad').classList.remove('hidden');
        // In a real implementation, this would call the ad network SDK
    }
};

// Initialize ads when document is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Show banner ad on load
    adNetwork.showBanner();
    
    // Set up interstitial ad button
    const interstitialBtn = document.getElementById('interstitial-btn');
    if (interstitialBtn) {
        interstitialBtn.addEventListener('click', function() {
            adNetwork.showInterstitial();
        });
    }
    
    // Set up pop ad button
    const popAdBtn = document.getElementById('pop-ad-btn');
    if (popAdBtn) {
        popAdBtn.addEventListener('click', function() {
            adNetwork.showPop();
        });
    }
    
    // Set up rewarded ad button
    const rewardedAdBtn = document.getElementById('rewarded-ad-btn');
    if (rewardedAdBtn) {
        rewardedAdBtn.addEventListener('click', function() {
            adNetwork.showRewarded();
        });
    }
    
    // Close interstitial ad
    const closeInterstitial = document.getElementById('close-interstitial');
    if (closeInterstitial) {
        closeInterstitial.addEventListener('click', function() {
            document.getElementById('interstitial-ad').classList.add('hidden');
        });
    }
    
    // Close pop ad
    const closePop = document.getElementById('close-pop');
    if (closePop) {
        closePop.addEventListener('click', function() {
            document.getElementById('pop-ad').classList.add('hidden');
        });
    }
    
    // Close rewarded ad
    const closeRewarded = document.getElementById('close-rewarded');
    if (closeRewarded) {
        closeRewarded.addEventListener('click', function() {
            document.getElementById('rewarded-ad').classList.add('hidden');
        });
    }
});