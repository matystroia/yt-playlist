let video = document.getElementsByClassName('video-stream html5-main-video')[0];

function handleMessage(request, sender, sendResponse) {
    if (request.message === 'play') {
        console.log('play');
        video.click();
    } else if (request.message === 'setVideo') {
        window.location.href = 'https://www.youtube.com/watch?v=' + request.video.id;
    }
}


// video.onended = function () {
//     browser.runtime.sendMessage({message: 'getNext'}).then(response => {
//         window.location.href = 'https://www.youtube.com/watch?v=' + response.video.id;
//     });
// };

browser.runtime.onMessage.addListener(handleMessage);