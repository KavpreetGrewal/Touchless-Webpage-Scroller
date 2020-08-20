var script = document.createElement('script');
script.src = 'hand_tracker.min.js';
document.getElementsByTagName('body')[0].appendChild(script);


script.onload = function () {

    var vid = document.createElement("video");
    vid.setAttribute("id", "video");
    document.body.insertBefore(vid, document.body.firstChild);
    var can = document.createElement("canvas");
    can.setAttribute("id", "canvas");
    document.body.insertBefore(can, document.body.firstChild);


    //do stuff with the script
    const modelParams = {
        flipHorizontal: true,   // flip e.g for video
        imageScaleFactor: 0.7,  // reduce input image size for gains in speed.
        maxNumBoxes: 20,        // maximum number of boxes to detect
        iouThreshold: 0.5,      // ioU threshold for non-max suppression
        scoreThreshold: 0.79,    // confidence threshold for predictions.
    }

    const video = document.querySelector('#video');
    const canvas = document.querySelector('#canvas');
    const context = canvas.getContext('2d');
    let model;

    handTrack.startVideo(video).then(status => {
        if(status) {
            navigator.getUserMedia({video: {}}, stream => {
                    video.srcObject = stream;
                    setInterval(runDetection, 200);
                }, err => console.log(err)
            );
        }
    });

    function runDetection() {
        model.detect(video).then(predictions => {
            console.log(predictions);
            // model.renderPredictions(predictions, canvas, context, video);
            if (predictions.length == 1) {
                window.scrollBy(0, 20);
            } else if (predictions.length == 2) {
                window.scrollBy(-0, -20);
            }
        });
    }

    handTrack.load(modelParams).then(lmodel => {model = lmodel;});
};