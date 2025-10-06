📁 Repository Overview
This repository provides a suite of privacy-respecting, performance-friendly tools to customize and simplify the YouTube interface.
It includes:

9 Userscripts – JavaScript-based enhancements that run via Tampermonkey or Violentmonkey.
6 uBlock Origin Filter Lists – Declarative rules to hide or block unwanted UI elements without executing scripts.
All tools are designed to reduce distractions, improve focus, and restore control over your YouTube experience—without breaking core functionality.

🧠 Userscripts (9)
1. Shorts Blocker
Removes YouTube Shorts from the homepage, sidebar, and navigation by hiding all Shorts-related UI elements.

2. Shorts & News Banner Hider
Eliminates both Shorts shelves and breaking news banners that appear at the top of the YouTube feed.

3. Hide Shorts Button
Conceals the Shorts camera icon in the bottom navigation bar (mobile-style UI on desktop).

4. Hide Right Sidebar
Removes the right-hand recommendation sidebar on video pages and expands the main content area for a cleaner layout.

5. Classic Fullscreen Button
Restores the native browser fullscreen button (⤢) that YouTube hides in its custom player controls.

6. Skip End Screens
Automatically skips or hides end screens (cards, suggested videos) that appear in the last 10–15 seconds of a video.

7. Autoplay Stopper
Disables autoplay for both the next video and audio-only background playback.

8. Audio-Only Mode
Enables a lightweight audio-only playback mode (ideal for background listening with minimal resource usage).

9. Disable Next Video
Prevents YouTube from automatically loading or suggesting the next video after playback ends.

🛡️ uBlock Origin Filter Lists (6)
1. block-shorts.txt
Completely suppresses YouTube Shorts content: hides links, shelves, guide entries, and aria-labeled Shorts elements.

2. hide-sidebar.txt
Removes the #related recommendation sidebar on watch pages using efficient cosmetic filtering.

3. widen-player.txt
Injects custom CSS to remove page margins and expand the primary video column to full width.

4. no-hover-previews.txt
Blocks all thumbnail hover overlays (title, duration, progress bar) that appear when mousing over videos.

5. disable-hover-interaction.txt
Neutralizes hover-triggered behaviors by disabling pointer events on thumbnails while preserving link functionality.

6. hide-live-badges.txt
Conceals "LIVE" badges and removes links to live streams across feeds, search, and recommendations.

🟥Native YouTube Setting Official & Permanent (1)

1.Video previews
YouTube quietly added a built-in setting to permanently disable the annoying 3-second hover previews that autoplay when you move your mouse over videos.
This method works everywhere — Home, Search, Shorts, Subscriptions, Library, and all Explore tabs — and requires zero code, zero tools, and zero maintenance.

🚀 How to Use
For Userscripts:
Install Tampermonkey or Violentmonkey .
Open any .user.js file in this repo and click "Install".
Refresh YouTube to apply changes.
For uBlock Filters:
Install uBlock Origin .
Go to Dashboard → Filter lists → Import.
Paste the URL of any .txt file from this repo or import locally.
Force-update filter lists to activate.
✅ Philosophy
No telemetry – All code runs locally.
Minimal footprint – Lightweight and non-intrusive.
User-first – Designed for focus, not engagement metrics.
🎯 Goal: Give you back a clean, fast, and distraction-free YouTube—exactly how you want it. 
