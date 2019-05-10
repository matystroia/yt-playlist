function getYoutubeVersion() {
    return 'modern';
}

function handleMessage(request, sender, sendResponse) {
    if (request.message === 'play') {
        document.getElementsByClassName('video-stream html5-main-video')[0].click();
    } else if (request.message === 'getVideo') {
        let videoId, videoTitle;

        if (ytVersion === 'classic') {
            videoId = document.getElementsByClassName('yt-uix-videoactionmenu')[0].getAttribute('data-video-id');
            videoTitle = document.getElementsByClassName('ytp-title-link')[0].innerHTML;
        } else if (ytVersion === 'modern') {
            videoId = document.getElementsByTagName('ytd-watch-flexy')[0].getAttribute('video-id');
            videoTitle = document.getElementsByClassName('ytp-title-link')[0].innerHTML;
        }

        return new Promise(resolve => resolve({
            video: {
                id: videoId,
                title: videoTitle
            }
        }));
    } else if (request.message === 'setVideo') {
        window.location.href = 'https://www.youtube.com/watch?v=' + request.video.id;
    }
}

const ytVersion = getYoutubeVersion();

browser.runtime.onMessage.addListener(handleMessage);

// video.onended = function () {
//     browser.runtime.sendMessage({message: 'getNext'}).then(response => {
//         window.location.href = 'https://www.youtube.com/watch?v=' + response.video.id;
//     });
// };