// ==UserScript==


// @name         Disable AutoPlay Next Video


// @namespace    https://github.com/user/disable-autoplay-next-video


// @version      1.2


// @description  Permanently disables "Up next" autoplay on YouTube


// @author       You


// @match        https://www.youtube.com/*


// @grant        none


// @run-at       document-idle


// ==/UserScript==





(function () {


    'use strict';





    // Method 1: Force autoplay off via YouTube's own player API (most reliable)


    const disableAutoplay = () => {


        // Wait for player to exist


        const checkPlayer = setInterval(() => {


            if (typeof document.querySelector('#movie_player')?.getPlayerState === 'function') {


                clearInterval(checkPlayer);


                // YouTube's internal method to disable autoplay


                const player = document.getElementById('movie_player');


                if (player && player.setAutonavState) {


                    player.setAutonavState(false); // Disables "Up next" autoplay


                }


            }


        }, 1000);


    };





    // Method 2: Hide and disable the autoplay toggle UI (optional but user-friendly)


    const hideAutoplayUI = () => {


        const style = document.createElement('style');


        style.textContent = `


            /* Hide autoplay toggle in player */


            .ytp-autonav-endscreen-upnext-button,


            .ytp-autonav-toggle-button {


                display: none !important;


            }


            /* Prevent "Up next" sidebar from appearing */


            #movie_player .ytp-autonav-endscreen {


                display: none !important;


            }


        `;


        document.head.appendChild(style);


    };





    // Method 3: MutationObserver to handle dynamic page loads (SPA)


    let lastUrl = location.href;


    const observer = new MutationObserver(() => {


        if (location.href !== lastUrl) {


            lastUrl = location.href;


            if (location.pathname === '/watch') {


                setTimeout(() => {


                    disableAutoplay();


                    hideAutoplayUI();


                }, 1500);


            }


        }


    });





    // Start


    if (location.pathname === '/watch') {


        disableAutoplay();


        hideAutoplayUI();


    }





    observer.observe(document.body, { childList: true, subtree: true });


})();