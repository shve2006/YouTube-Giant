// ==UserScript==
// @name         No Ai Search
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Removes all suggestion sections: "People also watched", "Previously watched", "From related searches", "Channels new to you", and more.
// @author       You
// @match        https://www.youtube.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const UNWANTED_PHRASES = [
        'people also watched',
        'explore more',
        'previously watched',
        'channels new to you',
        'from related searches',
        'related searches',
        'recommended',
        'suggested',
        'for you',
        'popular',
        'featured'
    ].map(s => s.toLowerCase());

    function removeSuggestionSections() {
        // Check every element that could be a section heading or content
        document.querySelectorAll('ytd-shelf-renderer, ytd-rich-section-renderer, ytd-item-section-renderer, div[role="region"]').forEach(section => {
            const text = section.textContent.toLowerCase().trim();
            if (UNWANTED_PHRASES.some(phrase => text.includes(phrase))) {
                section.remove();
            }
        });
    }

    // Run now
    removeSuggestionSections();

    // Watch for dynamic content (SPA navigation, lazy load)
    const observer = new MutationObserver(removeSuggestionSections);
    observer.observe(document.body, { childList: true, subtree: true });
})();