const list = [
    'https://www.youtube.com/watch?v=RwUej-PafDA',
    'https://www.youtube.com/watch?v=Vrb8h8WLiMM',
];

let video = document.getElementsByClassName('video-stream html5-main-video')[0];

setInterval(function () {
    if (video.currentTime >= video.duration) {
        let index = list.indexOf(window.location.href);
        if (index > -1) {
            window.location.href = list[index + 1];
        }
    }
}, 1000);