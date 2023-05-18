const fadeDuration = 2000;
const audioUrl1 = 'RainSound.wav';
const audioUrl2 = 'RainSound.wav';
const audioContext = new(window.AudioContext || window.webkitAudioContext)();
const audioElement1 = new Audio();
audioElement1.src = audioUrl1;
audioElement1.loop = true;
const audioElement2 = new Audio();
audioElement2.src = audioUrl2;
audioElement2.loop = true;
const audioSource1 = audioContext.createMediaElementSource(audioElement1);
const audioSource2 = audioContext.createMediaElementSource(audioElement2);
const gainNode1 = audioContext.createGain();
gainNode1.gain.value = 0;
const gainNode2 = audioContext.createGain();
gainNode2.gain.value = 1;
audioSource1.connect(gainNode1);
audioSource2.connect(gainNode2);
gainNode1.connect(audioContext.destination);
gainNode2.connect(audioContext.destination);

let isPlaying = false;

function playAudio() {
    if (!isPlaying) {
        audioContext.resume().then(() => {
            audioElement1.play();
            audioElement2.play();
            crossfade();
            isPlaying = true;
        });
    }
}

function stopAudio() {
    if (isPlaying) {
        audioElement1.pause();
        audioElement2.pause();
        isPlaying = false;
    }
}

function crossfade() {
    const currentTime = audioContext.currentTime;
    gainNode1.gain.linearRampToValueAtTime(1, currentTime + fadeDuration / 1000);
    gainNode2.gain.linearRampToValueAtTime(0, currentTime + fadeDuration / 1000);

    setTimeout(crossfade, fadeDuration);
}

const playBgmButton = document.getElementById('playBgmButton');
playBgmButton.addEventListener('click', playAudio);

const stopBgmButton = document.getElementById('stopBgmButton');
stopBgmButton.addEventListener('click', stopAudio);

const resumeButton = document.getElementById('resumeButton');
resumeButton.addEventListener('click', function () {
    audioContext.resume().then(() => {
        console.log('Playback resumed successfully');
    });
});