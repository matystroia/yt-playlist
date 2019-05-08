let queue = [];
let currentVideo = null;

function removeVideo(e) {
    queue.splice(parseInt(e.target.getAttribute('data-id')), 1);
    updateQueue();
}

function updateQueue() {
    browser.runtime.sendMessage({message: 'setQueue', queue: queue}).then(() => {
        refreshPopup();
    })
}

function getQueue() {
    let gettingQueue = browser.runtime.sendMessage({message: 'getQueue'});
    let gettingVideo = browser.runtime.sendMessage({message: 'getVideo'});
    Promise.all([gettingQueue, gettingVideo]).then(responses => {
        queue = responses[0].queue;
        currentVideo = responses[1].video;
        refreshPopup();
    });
}

function refreshPopup() {
    const queueElement = document.getElementById('queue');
    const nowPlayingElement = document.getElementById('now-playing');

    if (currentVideo)
        nowPlayingElement.innerText = currentVideo.title;

    queueElement.innerHTML = '';

    let i = 0;
    for (const video of queue) {
        let item = document.createElement('div');
        item.innerText = video.title;

        let button = document.createElement('button');
        button.setAttribute('data-id', i.toString());
        button.innerHTML = 'Remove';
        button.addEventListener('click', removeVideo);

        item.appendChild(button);
        queueElement.appendChild(item);

        i++;
    }
}

function setActiveTab() {
    browser.tabs.query({active: true, currentWindow: true}).then(tabs => {
        browser.runtime.sendMessage({message: 'setActiveTab', tabId: tabs[0].id});
    });
}

function playVideo() {
    browser.runtime.sendMessage({message: 'play'});
}

function skipVideo() {
    browser.runtime.sendMessage({message: 'skip'}).then(() => {
        getQueue();
    });
}

document.getElementById('set-active').addEventListener('click', setActiveTab);
document.getElementById('play').addEventListener('click', playVideo);
document.getElementById('skip').addEventListener('click', skipVideo);

getQueue();
