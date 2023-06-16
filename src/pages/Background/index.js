console.log('This is the background page.');
console.log('Put the background scripts here.');

// listen for messages from other parts of the extension
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // check if the message is requesting URL processing
    if (message.type === 'processUrl') {
        // process the URL (replace this with your own URL processing logic)
        const processedUrl = message.url.toUpperCase();

        // send the processed URL back to the pop-up
        sendResponse({ processedUrl });
    }
});