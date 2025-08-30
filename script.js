// Shared JavaScript functions

// Initialize Adexium Ads
let adexiumAds;

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Adexium widget
    adexiumAds = new AdexiumWidget({
        wid: '342684d7-64bd-4912-bfc4-1098566cf764', 
        adFormat: 'push-like', // Default format
        firstAdImpressionIntervalInSeconds: 5, // Ad will appear in 5 seconds after opening
        adImpressionIntervalInSeconds: 100, // Ad period interval is 100 seconds
        debug: true, // TEST mode - remove this in production
        isFullScreen: false // Not forcing full screen mode
    });
    
    // Enable auto mode for push-like ads
    adexiumAds.autoMode();
});

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
        
        // Use Adexium interstitial ad
        if (typeof adexiumAds !== 'undefined') {
            try {
                // Request interstitial ad
                adexiumAds.requestAd('interstitial');
                
                // Set up event listeners for interstitial
                adexiumAds.on('adReceived', (ad) => {
                    console.log("Interstitial ad received");
                    adexiumAds.displayAd(ad);
                });
                
                adexiumAds.on('noAdFound', () => {
                    console.log("No interstitial ad available, showing fallback");
                    this.showSimulatedInterstitial();
                });
                
                adexiumAds.on('adDisplayed', () => {
                    console.log("Interstitial ad displayed");
                });
                
                adexiumAds.on('adFailed', (error) => {
                    console.error("Interstitial ad failed:", error);
                    this.showSimulatedInterstitial();
                });
                
            } catch (error) {
                console.error('Adexium interstitial ad failed:', error);
                this.showSimulatedInterstitial();
            }
        } else {
            console.warn('Adexium widget not loaded, using simulated ad');
            this.showSimulatedInterstitial();
        }
    },
    
    // Fallback simulated interstitial ad
    showSimulatedInterstitial: function() {
        document.getElementById('interstitial-ad').classList.remove('hidden');
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
        
        // Note: Adexium doesn't seem to support rewarded ads based on the documentation
        // You might need to use a different ad network for rewarded ads
    },
    
    // Show push-like ad (this will be handled by autoMode)
    showPushLike: function() {
        console.log("Push-like ad displayed");
        // This is handled automatically by Adexium's autoMode
    },
    
    // Show pop ad
    showPop: function() {
        console.log("Pop ad displayed");
        
        // For pop ads, we can use push-like format or check if Adexium supports pop
        if (typeof adexiumAds !== 'undefined') {
            try {
                // Try using push-like format for pop ads
                adexiumAds.requestAd('push-like');
                
                // Set up event listeners
                adexiumAds.on('adReceived', (ad) => {
                    console.log("Pop ad received");
                    adexiumAds.displayAd(ad);
                });
                
                adexiumAds.on('noAdFound', () => {
                    console.log("No pop ad available, showing fallback");
                    this.showSimulatedPop();
                });
                
            } catch (error) {
                console.error('Adexium pop ad failed:', error);
                this.showSimulatedPop();
            }
        } else {
            console.warn('Adexium widget not loaded, using simulated ad');
            this.showSimulatedPop();
        }
    },
    
    // Fallback simulated pop ad
    showSimulatedPop: function() {
        document.getElementById('pop-ad').classList.remove('hidden');
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
    
    // Set up manual push-like ad button (if you want one)
    const pushLikeBtn = document.getElementById('push-like-btn');
    if (pushLikeBtn) {
        pushLikeBtn.addEventListener('click', function() {
            if (typeof adexiumAds !== 'undefined') {
                adexiumAds.requestAd('push-like');
                
                adexiumAds.on('adReceived', (ad) => {
                    adexiumAds.displayAd(ad);
                });
                
                adexiumAds.on('noAdFound', () => {
                    console.log("No push-like ad available");
                });
            }
        });
    }
});