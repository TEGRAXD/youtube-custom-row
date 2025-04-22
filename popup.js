async function getFromStorage(key) {
    return new Promise((resolve) => {
        chrome.storage.sync.get(key, (result) => {
            resolve(result[key]);
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    (async () => {
        try {
            const itemsPerRow = await getFromStorage("itemsPerRow");
            const postsPerRow = await getFromStorage("postsPerRow");
        
            if (itemsPerRow) {
                document.getElementById("itemsInput").value = itemsPerRow;
            }
        
            if (postsPerRow) {
                document.getElementById("postsInput").value = postsPerRow;
            }
        
            await setCustomRow(itemsPerRow, postsPerRow);
        } catch (error) {
            // console.error("Error loading storage values:" );
        }
    })();

    document.getElementById("itemsInput").addEventListener("change", async () => {
        const itemsValue = parseInt(document.getElementById("itemsInput").value);
        const postsValue = parseInt(document.getElementById("postsInput").value);

        chrome.storage.sync.set({ itemsPerRow: itemsValue, postsPerRow: postsValue });

        await setCustomRow(itemsValue, postsValue);
    });
});

const setCustomRow = async (itemsValue, postsValue) => {
    try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

        if (tab?.url && tab?.url.includes("://www.youtube.com/")) {
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: (itemsValue, postsValue) => {
                    const styleId = "custom-row-style";
                    let style = document.getElementById(styleId);
                    if (!style) {
                        style = document.createElement("style");
                        style.id = styleId;
                        document.head.appendChild(style);
                    }
                    style.textContent = `
                        ytd-rich-grid-renderer {
                            --ytd-rich-grid-items-per-row: ${itemsValue} !important;\
                            --ytd-rich-grid-posts-per-row: ${postsValue} !important;

                        }
                    `;
                },
                args: [itemsValue, postsValue],
            });
        }
    } catch (error) {
        // console.warn("Could not inject custom row script:", error);
    }
}