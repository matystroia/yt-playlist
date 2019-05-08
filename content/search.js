function addToQueue(e) {
    let video = e.target.parentNode;
    browser.runtime.sendMessage({
        message: 'addVideo',
        video: {
            id: video.getAttribute('data-context-item-id'),
            title: video.querySelector('.yt-lockup-title span').innerText
        }
    });
}

let videos = document.getElementsByClassName('yt-lockup-video');
for (const video of videos) {
    let button = document.createElement('button');
    button.innerHTML = 'Add to queue';
    button.style.color = '#767676';
    button.style.border = '1px solid black';
    button.style.padding = '2px';
    button.addEventListener('click', addToQueue);

    video.appendChild(button);
}