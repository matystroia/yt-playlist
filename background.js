let queue = [];
let activeTabId = null;

function handleMessage(request, sender, sendResponse) {
    if (request.message === 'addVideo') {
        queue.push(request.video);
    } else if (request.message === 'getNext') {
        queue.shift();
        sendResponse({video: queue[0]});
    } else if (request.message === 'getQueue') {
        sendResponse({queue: queue});
    } else if (request.message === 'setQueue') {
        queue = request.queue;
    } else if (request.message === 'setActiveTab') {
        activeTabId = request.tabId;
    } else if (request.message === 'play') {
        browser.tabs.sendMessage(activeTabId, {message: 'play'});
    } else if (request.message === 'skip') {
        queue.shift();
        browser.tabs.sendMessage(activeTabId, {message: 'setVideo', video: queue[0]})
    }
}

browser.runtime.onMessage.addListener(handleMessage);