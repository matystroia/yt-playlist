let video = document.getElementsByClassName('video-stream html5-main-video')[0];

video.onended = function () {
    console.log('video ended');
    browser.runtime.sendMessage({message: 'get'}).then((response) => {
        console.log(response);
        window.location.href = response.url;
    }, (error) => {
        console.log('error');
        console.log(error);
    });
};
