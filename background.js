let playlist = [];
let index = 0;

function handleMessage(request, sender, sendResponse) {
    if (request.message === 'add') {
        playlist.push(request.url);
    }
    else if (request.message === 'get') {
        index = (index + 1) % playlist.length;
        console.log(playlist[index]);
        sendResponse({url: playlist[index]});
    }
}

browser.runtime.onMessage.addListener(handleMessage);