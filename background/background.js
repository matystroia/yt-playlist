let queue = [];
let activeTabId;

function getCurrentVideo() {
    return browser.tabs.sendMessage(activeTabId, {message: 'getVideo'});
}

function handleMessage(request, sender, sendResponse) {
    if (request.message === 'getCurrentVideo') {
        return getCurrentVideo();
    } else if (request.message === 'addVideo') {
        queue.push(request.video);
    } else if (request.message === 'getQueue') {
        return new Promise(resolve => resolve({queue: queue}));
    } else if (request.message === 'setQueue') {
        queue = request.queue;
    } else if (request.message === 'setActiveTab') {
        // TODO: Check if tab is YouTube video
        activeTabId = request.tabId;
    } else if (request.message === 'play') {
        browser.tabs.sendMessage(activeTabId, {message: 'play'});
    } else if (request.message === 'skip') {
        browser.tabs.sendMessage(activeTabId, {message: 'setVideo', video: queue.shift()});
    }
}

browser.runtime.onMessage.addListener(handleMessage);