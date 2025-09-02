// Shared JavaScript functions

// Initialize Adexium Ads - separate instances for different ad types
let adexiumInterstitialAds;
let adexiumPushLikeAds;

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Adexium Interstitial widget
    adexiumInterstitialAds = new AdexiumWidget({
        wid: '342684d7-64bd-4912-bfc4-1098566cf764', 
        adFormat: 'interstitial',
        firstAdImpressionIntervalInSeconds: 5,
        adImpressionIntervalInSeconds: 100,
        isFullScreen: false
    });
    
    // Initialize Adexium Push-like widget
    adexiumPushLikeAds = new AdexiumWidget({
        wid: '351d7007-296c-4a1b-93cf-dde312ea15d4', 
        adFormat: 'push-like',
        firstAdImpressionIntervalInSeconds: 5,
        adImpressionIntervalInSeconds: 100,
        isFullScreen: false
    });
    
    // Enable auto mode for push-like ads only
    adexiumPushLikeAds.autoMode();
});

// Simulate ad network functions
const adNetwork = {
    // Show banner ad (unchanged - for other ad networks)
    showBanner: function() {
        console.log("Banner ad displayed");
        // In a real implementation, this would call the ad network SDK
    },
    
    // Show interstitial ad (using Adexium)
    showInterstitial: function() {
        console.log("Interstitial ad displayed");
        
        // Use Adexium interstitial ad
        if (typeof adexiumInterstitialAds !== 'undefined') {
            try {
                // Request interstitial ad
                adexiumInterstitialAds.requestAd('interstitial');
                
                // Set up event listeners for interstitial
                adexiumInterstitialAds.on('adReceived', (ad) => {
                    console.log("Interstitial ad received");
                    adexiumInterstitialAds.displayAd(ad);
                });
                
                adexiumInterstitialAds.on('noAdFound', () => {
                    console.log("No interstitial ad available, showing fallback");
                    this.showSimulatedInterstitial();
                });
                
                adexiumInterstitialAds.on('adDisplayed', () => {
                    console.log("Interstitial ad displayed");
                });
                
                adexiumInterstitialAds.on('adFailed', (error) => {
                    console.error("Interstitial ad failed:", error);
                    this.showSimulatedInterstitial();
                });
                
            } catch (error) {
                console.error('Adexium interstitial ad failed:', error);
                this.showSimulatedInterstitial();
            }
        } else {
            console.warn('Adexium interstitial widget not loaded, using simulated ad');
            this.showSimulatedInterstitial();
        }
    },
    
    // Fallback simulated interstitial ad
    showSimulatedInterstitial: function() {
        document.getElementById('interstitial-ad').classList.remove('hidden');
    },
    
    // Show rewarded ad (unchanged - for other ad networks)
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
    },
    
    // Show push-like ad (using Adexium - handled by autoMode)
    showPushLike: function() {
        console.log("Push-like ad displayed");
        // This is handled automatically by Adexium's autoMode
        // If you want manual control, you can use:
        // adexiumPushLikeAds.requestAd('push-like');
    },
    
    // Show pop ad (unchanged - for other ad networks)
    showPop: function() {
        console.log("Pop ad displayed");
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
    
    // Set up manual push-like ad button (optional)
    const pushLikeBtn = document.getElementById('push-like-btn');
    if (pushLikeBtn) {
        pushLikeBtn.addEventListener('click', function() {
            if (typeof adexiumPushLikeAds !== 'undefined') {
                adexiumPushLikeAds.requestAd('push-like');
                
                adexiumPushLikeAds.on('adReceived', (ad) => {
                    adexiumPushLikeAds.displayAd(ad);
                });
                
                adexiumPushLikeAds.on('noAdFound', () => {
                    console.log("No push-like ad available");
                });
            }
        });
    }
});