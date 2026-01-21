/* global Module */

/* Magic Mirror
 *
 * Module: Simple Image (auto‑refresh)
 *
 * Originally by Ben Williams http://desertblade.com
 * MIT Licensed.
 */

Module.register("mmm-simple-image", {
    // -----------------------------------------------------------------
    // Default configuration – you can override any of these in your
    // MagicMirror config file.
    // -----------------------------------------------------------------
    defaults: {
        // Desired size of the container that holds the image.
        width:  "1080px",   // container width
        height: "auto",     // let the height adjust to preserve aspect ratio

        // Outer <div> dimensions (normally the same as the container).
        divwidth:  "1080px",
        divheight: "auto",

        // The image URL you want to display.
        url: "",            // e.g. "https://example.com/photo.jpg"

        // How often (in seconds) the image should be refreshed.
        // Set to 0 or omit to disable automatic refreshing.
        refreshInterval: 60   // default = 60 seconds
    },

    // -----------------------------------------------------------------
    // Called once when the module is loaded – we start the timer here.
    // -----------------------------------------------------------------
    start: function () {
        // If the user asked for a refresh interval > 0, start the timer.
        if (this.config.refreshInterval && this.config.refreshInterval > 0) {
            const ms = this.config.refreshInterval * 1000;
            // Save the timer ID so we could clear it later if needed.
            this.refreshTimer = setInterval(() => {
                this.updateImage();   // <-- our custom refresh routine
            }, ms);
        }
    },

    // -----------------------------------------------------------------
    // Helper: force the <img> to reload by adding a cache‑busting query.
    // -----------------------------------------------------------------
    updateImage: function () {
        if (!this.imgElement) return;               // safety check
        // Append a dummy query string (timestamp) to bust the browser cache.
        const base = this.config.url.split('?')[0];
        const bust = `?t=${Date.now()}`;
        this.imgElement.src = base + bust;
    },

    // -----------------------------------------------------------------
    // DOM generation – we keep a reference to the <img> so we can
    // change its src later without rebuilding the whole DOM.
    // -----------------------------------------------------------------
    getDom: function () {
        // ---- Container -------------------------------------------------
        const wrapper = document.createElement("div");
        wrapper.style.cssText = `
            width: ${this.config.divwidth};
            height: ${this.config.divheight};
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
        `;

        // ---- Image ----------------------------------------------------
        const img = document.createElement("img");
        img.src = this.config.url;                     // initial load
        img.style.cssText = `
            max-width: 100%;
            height: auto;
            border: none;
            display: block;
        `;

        // Keep a reference so `updateImage()` can modify it later.
        this.imgElement = img;

        wrapper.appendChild(img);
        return wrapper;
    },

    // -----------------------------------------------------------------
    // Clean‑up – stop the timer when the module is hidden/destroyed.
    // -----------------------------------------------------------------
    socketNotificationReceived: function (notification, payload) {
        // Not used here, but left as a placeholder if you ever need it.
    },

    // Called when the module is removed (e.g., on shutdown)
    stop: function () {
        if (this.refreshTimer) {
            clearInterval(this.refreshTimer);
        }
    }
});
