let queue = [];
let currentVideo = null;
let activeTabId = null;

function handleMessage(request, sender, sendResponse) {
    if (request.message === 'getVideo') {
        sendResponse({video: currentVideo});
    } else if (request.message === 'addVideo') {
        queue.push(request.video);
    } else if (request.message === 'getQueue') {
        sendResponse({queue: queue});
    } else if (request.message === 'setQueue') {
        queue = request.queue;
    } else if (request.message === 'setActiveTab') {
        // TODO: Check if tab is YouTube video
        activeTabId = request.tabId;
    } else if (request.message === 'play') {
        browser.tabs.sendMessage(activeTabId, {message: 'play'});
    } else if (request.message === 'skip') {
        currentVideo = queue.shift();
        browser.tabs.sendMessage(activeTabId, {message: 'setVideo', video: currentVideo});
    }
}

browser.runtime.onMessage.addListener(handleMessage);