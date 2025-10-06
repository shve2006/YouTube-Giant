// ==UserScript==
// @name         No Ai Search
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Removes all YouTube AI suggestions without hiding real channel results.
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
        'featured',
        'latest from',
        'watch again'
    ].map(s => s.toLowerCase());

    function removeSuggestionSections() {
        // Target only sections with a HEADING that matches unwanted phrases
        const sections = document.querySelectorAll(`
            ytd-shelf-renderer,
            ytd-rich-section-renderer,
            ytd-item-section-renderer,
            div[role="region"]
        `);

        sections.forEach(section => {
            // Find the heading: usually in h2, #title, or yt-formatted-string inside header
            let headingText = '';
            const header = section.querySelector('h2, #title, yt-formatted-string');
            if (header) {
                headingText = header.textContent.trim().toLowerCase();
            }

            // Only remove if the HEADING contains an unwanted phrase
            if (UNWANTED_PHRASES.some(phrase => headingText.includes(phrase))) {
                section.remove();
            }
        });

        // Extra: remove any standalone "Previously watched" text (rare)
        document.querySelectorAll('yt-formatted-string, h2, #title').forEach(el => {
            if (el.textContent.trim() === 'Previously watched') {
                el.closest('ytd-item-section-renderer, ytd-shelf-renderer')?.remove();
            }
        });
    }

    setTimeout(removeSuggestionSections, 1000);

    const observer = new MutationObserver(() => {
        removeSuggestionSections();
    });
    observer.observe(document.body, { childList: true, subtree: true });
})();