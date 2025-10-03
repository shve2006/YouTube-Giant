// ==UserScript==


// @name         Hide Right Sidebar


// @namespace    http://tampermonkey.net/


// @version      1.2


// @description  Remove right-side recommendations on video pages


// @match        https://www.youtube.com/watch*


// @grant        none


// ==/UserScript==





(function () {


    'use strict';





    function removeSidebar() {


        const secondary = document.getElementById('secondary');


        if (secondary) {


            secondary.style.display = 'none';


            // Optional: widen main content


            const primary = document.getElementById('primary');


            if (primary) primary.style.maxWidth = 'none';


        }


    }





    // Run on initial load and SPA navigation


    removeSidebar();


    document.addEventListener('yt-navigate-finish', removeSidebar);


})();