function addToQueue(url) {
    browser.runtime.sendMessage({message: 'add', url: url});
}

let videos = document.getElementsByClassName('yt-lockup-video');
for (const video of videos) {
    let button = document.createElement('button');
    button.innerHTML = 'Add to queue';
    button.style.color = '#767676';
    button.style.border = '1px solid black';
    button.style.padding = '2px';
    button.onclick = function () {
        addToQueue('https://www.youtube.com/watch?v=' + video.getAttribute('data-context-item-id'));
    };

    video.appendChild(button);
}