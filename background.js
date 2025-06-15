// Required to register a service worker in manifest v3

chrome.runtime.onInstalled.addListener(() => { // add listener is error
    // Set default values for itemsPerRow and postsPerRow
    chrome.storage.sync.set({ itemsPerRow: 5, postsPerRow: 5 }, () => {
        // console.log("Default values set for itemsPerRow and postsPerRow.");
    });
});