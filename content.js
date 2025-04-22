chrome.storage.sync.get("itemsPerRow", ({ itemsPerRow }) => {
    if (itemsPerRow) {
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
            }
        `;
    }
});

chrome.storage.sync.get("postsPerRow", ({ postsPerRow }) => {
    if (postsPerRow) {
        const styleId = "custom-row-style";
        let style = document.getElementById(styleId);
        if (!style) {
                style = document.createElement("style");
                style.id = styleId;
                document.head.appendChild(style);
        }
        style.textContent = `
            ytd-rich-grid-renderer {
                --ytd-rich-grid-posts-per-row: ${postsPerRow} !important;
            }
        `;
    }
});
