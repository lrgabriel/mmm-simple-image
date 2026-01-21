/* global Module */

/* Magic Mirror
 *
 * Module: Simple Image (formerly iFrame)
 *
 * Originally By Ben Williams http://desertblade.com
 * MIT Licensed.
 */

Module.register("mmm-simple-image", {
    // -----------------------------------------------------------------
    // Default configuration – you can override any of these in your
    // MagicMirror config file.
    // -----------------------------------------------------------------
    defaults: {
        // Desired size of the *container* that holds the image.
        // The image itself will be scaled to fit these dimensions.
        width:  "1080px",   // container width
        height: "auto",     // let the height adjust to preserve aspect ratio

        // Width/height of the outer <div>. Usually the same as the container.
        divwidth:  "1080px",
        divheight: "auto",

        // The image URL you want to display.
        url: "",            // e.g. "https://example.com/my‑photo.jpg"
    },

    // -----------------------------------------------------------------
    // DOM generation – we create a <div> that holds a single <img>.
    // -----------------------------------------------------------------
    getDom: function () {
        // ---- Container -------------------------------------------------
        const wrapper = document.createElement("div");
        wrapper.style.cssText = `
            width: ${this.config.divwidth};
            height: ${this.config.divheight};
            overflow: hidden;          /* hide any stray overflow */
            display: flex;
            justify-content: center;   /* centre horizontally */
            align-items: center;       /* centre vertically (if height > auto) */
        `;

        // ---- Image ----------------------------------------------------
        const img = document.createElement("img");
        img.src = this.config.url;

        // Force the image to never exceed the container width.
        // `max-width:100%` keeps the original aspect ratio.
        img.style.cssText = `
            max-width: 100%;
            height: auto;              /* preserve aspect ratio */
            border: none;
            display: block;
        `;

        // Append and return
        wrapper.appendChild(img);
        return wrapper;
    },
});
