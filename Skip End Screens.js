// ==UserScript==


// @name         Skip End Screens


// @namespace    http://tampermonkey.net/


// @version      1.1


// @description  Remove right sidebar recommendations and endscreen suggestions without slowing YouTube


// @author       You


// @match        https://www.youtube.com/*


// @grant        none


// ==/UserScript==





(function () {


    'use strict';





    // MutationObserver to handle dynamically loaded content


    const observer = new MutationObserver(cleanYouTube);





    function cleanYouTube() {


        // Remove right sidebar


        const sidebar = document.getElementById('secondary');


        if (sidebar) sidebar.remove();





        // Remove endscreen suggestions


        const endscreenElements = document.querySelectorAll(


            '.ytp-endscreen-content, .ytp-ce-element, .ytp-endscreen'


        );


        endscreenElements.forEach(el => {


            if (el.parentNode) el.remove();


        });





        // Optional: Also hide "Suggested for you" in home feed


        // const suggestions = document.querySelectorAll('#items > ytd-rich-item-renderer, #items > ytd-video-renderer');


        // suggestions.forEach(el => {


        //     const label = el.querySelector('#title:contains("Suggested for you")');


        //     if (label) el.remove();


        // });


    }





    // Initial cleanup


    cleanYouTube();





    // Observe the entire document for changes (covers navigation and dynamic content)


    observer.observe(document.body, {


        childList: true,


        subtree: true


    });





    // Also listen for YouTube's custom navigation event (as a fallback)


    document.addEventListener('yt-navigate-finish', cleanYouTube);





    // Handle video ended event for endscreen cleanup


    const handleVideoEnd = () => {


        // Small delay to ensure endscreen is rendered before removing


        setTimeout(cleanYouTube, 500);


    };





    // Set up video listener (for current and future videos)


    const setupVideoListener = () => {


        const video = document.querySelector('video');


        if (video) {


            video.removeEventListener('ended', handleVideoEnd); // Avoid duplicate listeners


            video.addEventListener('ended', handleVideoEnd);


        }


    };





    // Initial setup


    setupVideoListener();





    // Re-setup video listener on page changes


    document.addEventListener('yt-navigate-finish', setupVideoListener);


})();