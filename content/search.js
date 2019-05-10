function getYoutubeVersion() {
    return 'modern';
}

function getResultElements() {
    if (ytVersion === 'classic') {
        return document.getElementsByClassName('yt-lockup-video');
    } else if (ytVersion === 'modern') {
        return document.getElementsByClassName('text-wrapper style-scope ytd-video-renderer');
    }
}

function addToQueue(e) {
    let videoId, videoTitle;

    if (ytVersion === 'classic') {
        let resultElement = e.target.parentNode;
        videoId = resultElement.getAttribute('data-context-item-id');
        videoTitle = resultElement.querySelector('.yt-lockup-title span').innerText
    } else if (ytVersion === 'modern') {
        let titleElement = e.target.parentNode.querySelector('#video-title');
        videoId = /watch\?v=(\w+)/.exec(titleElement.getAttribute('href'))[1];
        videoTitle = titleElement.getAttribute('title');
    }

    browser.runtime.sendMessage({
        message: 'addVideo',
        video: {
            id: videoId,
            title: videoTitle
        }
    });
}

const ytVersion = getYoutubeVersion();

let resultElements = [].slice.call(getResultElements());
for (const [index, resultElement] of resultElements.entries()) {
    let button = document.createElement('button');
    button.setAttribute('data-id', index.toString());
    button.innerHTML = 'Add to queue';
    button.style.color = '#767676';
    button.style.border = '1px solid black';
    button.style.padding = '2px';
    button.addEventListener('click', addToQueue);

    resultElement.appendChild(button);
}