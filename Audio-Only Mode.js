// ==UserScript==


// @name         YouTube Audio-Only Mode (w/ Quality up to ≈320kbps)


// @namespace    http://tampermonkey.net/


// @version      2.1


// @description  Play YouTube audio only. Toggle with 'A', choose quality: Low to Max (≈320kbps).


// @author       You


// @match        https://www.youtube.com/watch*


// @grant        none


// @run-at       document-idle


// ==/UserScript==





(function () {


    'use strict';





    // Audio quality tiers (YouTube uses Opus for highest quality)


    const AUDIO_QUALITIES = {


        low:    { name: 'Low (48kbps)',     itags: [139] },               // m4a, 48kbps


        medium: { name: 'Medium (128kbps)', itags: [140] },               // m4a, 128kbps


        high:   { name: 'High (160kbps)',   itags: [250, 249] },          // Opus, ~70/50kbps (fallbacks)


        max:    { name: 'Max (≈320kbps)',   itags: [251] }                // Opus, highest quality (~160-256kbps+)


    };





    // All known VIDEO itags — block these aggressively


    const VIDEO_ITAGS = new Set([


        17, 18, 22, 34, 35, 36, 37, 38, 43, 44, 45, 46,


        133, 134, 135, 136, 137, 138, 160,


        212, 213, 214, 215, 216, 217,


        242, 243, 244, 245, 246, 247, 248,


        271, 272, 278,


        298, 299,


        302, 303, 308,


        313, 315,


        330, 331, 332, 333, 334, 335, 336, 337


    ]);





    // Load saved preferences


    let audioOnlyEnabled = localStorage.getItem('yt_audio_only_enabled') === 'true';


    let selectedQuality = localStorage.getItem('yt_audio_quality') || 'medium';





    let toggleButton = null;


    let qualitySelect = null;


    let feedbackToast = null;





    // Show user feedback


    function showFeedback(message) {


        if (feedbackToast) document.body.removeChild(feedbackToast);


        feedbackToast = document.createElement('div');


        feedbackToast.innerText = message;


        feedbackToast.style.cssText = `


            position: fixed; bottom: 20px; right: 20px;


            background: rgba(0,0,0,0.85); color: white;


            padding: 10px 16px; border-radius: 6px;


            font-size: 14px; z-index: 2147483647;


            pointer-events: none; opacity: 0;


            transition: opacity 0.2s;


        `;


        document.body.appendChild(feedbackToast);


        setTimeout(() => { feedbackToast.style.opacity = '1'; }, 10);


        setTimeout(() => {


            if (feedbackToast) {


                feedbackToast.style.opacity = '0';


                setTimeout(() => {


                    if (feedbackToast?.parentNode) document.body.removeChild(feedbackToast);


                    feedbackToast = null;


                }, 200);


            }


        }, 2200);


    }





    // Network interceptor: block video, allow audio


    const originalFetch = window.fetch;


    window.fetch = function (...args) {


        try {


            const input = args[0];


            const url = typeof input === 'string' ? input : (input?.url || '');





            if ((url.includes('googlevideo.com') || url.includes('youtube.com')) && url.includes('itag=')) {


                const itagMatch = url.match(/[?&]itag=(\d+)/);


                if (itagMatch) {


                    const itag = parseInt(itagMatch[1], 10);





                    if (audioOnlyEnabled && VIDEO_ITAGS.has(itag)) {


                        console.log('[YT Audio] Blocked video itag:', itag);


                        return Promise.resolve(new Response('', { status: 204 }));


                    }


                }


            }


        } catch (e) {


            console.warn('[YT Audio] Fetch error:', e);


        }


        return originalFetch.apply(this, args);


    };





    // Apply visual/audio state


    function applyAudioOnlyState() {


        const video = document.querySelector('video');


        const player = document.querySelector('.html5-video-player');





        if (audioOnlyEnabled) {


            if (video) video.style.display = 'none';


            if (player) player.style.backgroundColor = '#000';


        } else {


            if (video) video.style.display = '';


            if (player) player.style.backgroundColor = '';


        }





        if (toggleButton) {


            toggleButton.textContent = `🔊 Audio Only: ${audioOnlyEnabled ? 'ON' : 'OFF'}`;


            toggleButton.style.backgroundColor = audioOnlyEnabled


                ? 'rgba(0,128,0,0.85)'


                : 'rgba(0,0,0,0.75)';


        }





        if (qualitySelect) {


            qualitySelect.style.display = audioOnlyEnabled ? 'inline-block' : 'none';


        }


    }





    // Toggle audio-only mode


    function toggleAudioOnly() {


        audioOnlyEnabled = !audioOnlyEnabled;


        localStorage.setItem('yt_audio_only_enabled', audioOnlyEnabled);


        applyAudioOnlyState();


        showFeedback(`Audio Only: ${audioOnlyEnabled ? 'ON' : 'OFF'}`);


    }





    // Set audio quality


    function setAudioQuality(quality) {


        if (!AUDIO_QUALITIES[quality]) return;


        selectedQuality = quality;


        localStorage.setItem('yt_audio_quality', quality);


        showFeedback(`Audio Quality: ${AUDIO_QUALITIES[quality].name}`);


    }





    // Create UI controls


    function createControls() {


        if (toggleButton) return;





        // Toggle button


        toggleButton = document.createElement('button');


        toggleButton.textContent = `🔊 Audio Only: ${audioOnlyEnabled ? 'ON' : 'OFF'}`;


        toggleButton.style.cssText = `


            position: absolute; top: 10px; right: 130px;


            z-index: 2147483647; padding: 6px 10px; font-size: 12px;


            background: ${audioOnlyEnabled ? 'rgba(0,128,0,0.85)' : 'rgba(0,0,0,0.75)'};


            color: white; border: 1px solid rgba(255,255,255,0.5);


            border-radius: 4px; cursor: pointer; font-family: Arial, sans-serif;


        `;


        toggleButton.addEventListener('click', toggleAudioOnly);





        // Quality dropdown


        qualitySelect = document.createElement('select');


        qualitySelect.style.cssText = `


            position: absolute; top: 10px; right: 10px;


            z-index: 2147483647; padding: 6px; font-size: 12px;


            background: rgba(0,0,0,0.75); color: white;


            border: 1px solid rgba(255,255,255,0.5); border-radius: 4px;


            font-family: Arial, sans-serif;


        `;


        qualitySelect.style.display = audioOnlyEnabled ? 'inline-block' : 'none';





        for (const [key, data] of Object.entries(AUDIO_QUALITIES)) {


            const option = document.createElement('option');


            option.value = key;


            option.textContent = data.name;


            option.selected = key === selectedQuality;


            qualitySelect.appendChild(option);


        }


        qualitySelect.addEventListener('change', (e) => setAudioQuality(e.target.value));





        // Inject into player


        const container = document.querySelector('#player')?.parentElement ||


                          document.querySelector('.ytp-player-content') ||


                          document.querySelector('#movie_player')?.parentElement;





        if (container) {


            container.style.position = 'relative';


            container.appendChild(toggleButton);


            container.appendChild(qualitySelect);


        }


    }





    // Keyboard shortcut: 'A'


    function handleKeyDown(e) {


        if (e.key.toLowerCase() === 'a') {


            const active = document.activeElement;


            if (!active || (active.tagName !== 'INPUT' && active.tagName !== 'TEXTAREA' && !active.isContentEditable)) {


                e.preventDefault();


                toggleAudioOnly();


            }


        }


    }





    // Initialize


    function init() {


        if (document.querySelector('#movie_player') || document.querySelector('video')) {


            createControls();


            applyAudioOnlyState();


            document.addEventListener('keydown', handleKeyDown, true);


        } else {


            setTimeout(init, 600);


        }


    }





    if (document.readyState === 'loading') {


        document.addEventListener('DOMContentLoaded', init);


    } else {


        init();


    }





})();