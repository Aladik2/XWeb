const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');


app.use(express.static(__dirname));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'IDZ_2_2.html'));
});

io.on('connection', (socket) => {
    console.log('Новий користувач підключився:', socket.id);

    socket.on('drawing', (data) => {
        socket.broadcast.emit('drawing', data);
    });

    socket.on('disconnect', () => {
        console.log('Користувач відключився:', socket.id);
    });
});

const PORT = 3001;
http.listen(PORT, () => {
    console.log(`Сервер успішно запущено. Відкрий у браузері: http://localhost:${PORT}`);
});