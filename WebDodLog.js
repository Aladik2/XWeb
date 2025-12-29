const video = document.getElementById('webcam');
const canvas = document.getElementById('canvas');
const snapButton = document.getElementById('snap');

const context = canvas.getContext('2d');

async function initWebcam() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });

        video.srcObject = stream;
    } catch (err) {
        console.error("Помилка з доступом до камери: ", err);
        alert("Не вдалося отримати доступ до камери. Перевірте дозволи у браузері.");
    }
}

snapButton.addEventListener('click', () => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL('image/png');

    const link = document.createElement('a');
    link.href = imageData;
    link.download = 'photo_cameraa.png'; 
    link.click();
});

initWebcam();