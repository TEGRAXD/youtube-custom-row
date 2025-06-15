// content.js
chrome.storage.sync.get(["itemsPerRow", "postsPerRow"], ({ itemsPerRow = 5, postsPerRow = 5 }) => {
    const styleId = "custom-row-style";
    let style = document.getElementById(styleId);
    if (!style) {
        style = document.createElement("style");
        style.id = styleId;
        document.head.appendChild(style);
    }

    style.textContent = `
        ytd-rich-grid-renderer {
            --ytd-rich-grid-items-per-row: ${itemsPerRow} !important;
            --ytd-rich-grid-posts-per-row: ${postsPerRow} !important;
        }
    `;
});
