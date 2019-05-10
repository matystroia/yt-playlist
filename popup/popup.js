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
    Promise.all([
        browser.runtime.sendMessage({message: 'getQueue'}),
        browser.runtime.sendMessage({message: 'getCurrentVideo'})
    ]).then(responses => {
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

    for (const [index, video] of queue.entries()) {
        let queueItem = document.createElement('div');
        queueItem.classList.add('queue-item');

        let title = document.createElement('div');
        title.innerText = video.title;

        let removeButton = document.createElement('a');
        removeButton.setAttribute('data-id', index.toString());
        removeButton.innerHTML = 'X';
        removeButton.addEventListener('click', removeVideo);

        queueItem.appendChild(title);
        queueItem.appendChild(removeButton);

        queueElement.appendChild(queueItem);
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