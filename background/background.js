let queue = [];
let currentVideo = null;
let activeTabId = null;

function getCurrentVideo() {
    browser.tabs.sendMessage(activeTabId, {message: 'getVideo'}).then(response => {
        currentVideo = response.video;
    });
}

function handleMessage(request, sender, sendResponse) {
    if (request.message === 'getCurrentVideo') {
        return new Promise(resolve => resolve({video: currentVideo}));
    } else if (request.message === 'addVideo') {
        queue.push(request.video);
    } else if (request.message === 'getQueue') {
        return new Promise(resolve => resolve({queue: queue}));
    } else if (request.message === 'setQueue') {
        queue = request.queue;
    } else if (request.message === 'setActiveTab') {
        // TODO: Check if tab is YouTube video
        activeTabId = request.tabId;
        getCurrentVideo();
        browser.tabs.onUpdated.addListener(getCurrentVideo, {tabId: activeTabId, properties: ['status']});
    } else if (request.message === 'play') {
        browser.tabs.sendMessage(activeTabId, {message: 'play'});
    } else if (request.message === 'skip') {
        browser.tabs.sendMessage(activeTabId, {message: 'setVideo', video: queue.shift()});
    }
}

browser.runtime.onMessage.addListener(handleMessage);