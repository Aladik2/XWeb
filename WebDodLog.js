const video = document.getElementById('webcam');
const canvas = document.getElementById('canvas');
const snapButton = document.getElementById('snap');

// Контекст для малювання на канвасі (необхідний для створення фото)
const context = canvas.getContext('2d');

/**
 * 2. Запит на доступ до камери
 */
async function initWebcam() {
    try {
        // Запитуємо у браузера доступ до відео (камери)
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });

        // Передаємо потік з камери в наш тег <video>
        video.srcObject = stream;
    } catch (err) {
        console.error("Помилка доступу до камери: ", err);
        alert("Не вдалося отримати доступ до камери. Перевірте дозволи у браузері.");
    }
}

/**
 * 3. Функція для створення знімка та його збереження
 */
snapButton.addEventListener('click', () => {
    // Встановлюємо розмір канвасу таким же, як і відео
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Малюємо поточний кадр з відео на канвас
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Перетворюємо вміст канвасу в формат зображення (PNG)
    const imageData = canvas.toDataURL('image/png');

    // Створюємо тимчасове посилання для скачування
    const link = document.createElement('a');
    link.href = imageData;
    link.download = 'photo_capture.png'; // Назва файлу, який отримає користувач

    // "Натискаємо" на посилання програмно, щоб почалося завантаження
    link.click();
});

// Запускаємо камеру при завантаженні сторінки
initWebcam();