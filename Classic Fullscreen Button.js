// ==UserScript==


// @name         YouTube Native Fullscreen Button Restore


// @namespace    http://tampermonkey.net/


// @version      1.1


// @description  Restore YouTube fullscreen button next to subtitles without breaking style


// @match        https://www.youtube.com/*


// @grant        none


// ==/UserScript==





(function() {


    'use strict';





    function addFullscreenButton() {


        const controls = document.querySelector('.ytp-right-controls');


        if (!controls) return;





        // Avoid adding duplicate button


        if (document.querySelector('#custom-fullscreen-btn')) return;





        const fullscreenBtn = document.createElement('button');


        fullscreenBtn.id = 'custom-fullscreen-btn';


        fullscreenBtn.className = 'ytp-button';


        fullscreenBtn.title = 'Fullscreen (F)';





        // Use YouTube's actual fullscreen SVG


        fullscreenBtn.innerHTML = `


    <svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%">


        <path fill="white" d="M12 12h4v-2H10v6h2v-4zm12 0v4h2v-6h-6v2h4zm0 12h-4v2h6v-6h-2v4zm-12 0v-4H10v6h6v-2h-4z"></path>


    </svg>


`;








        // Toggle fullscreen on click


        fullscreenBtn.onclick = () => {


            const player = document.querySelector('.html5-video-player');


            if (player) player.toggleFullscreen();


        };





        // Insert before subtitles button if exists, else append at the end


        const captionsBtn = controls.querySelector('.ytp-subtitles-button');


        if (captionsBtn) controls.insertBefore(fullscreenBtn, captionsBtn);


        else controls.appendChild(fullscreenBtn);


    }





    // Run every 500ms in case YouTube reloads controls dynamically


    setInterval(addFullscreenButton, 500);


})();