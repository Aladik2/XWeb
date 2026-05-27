const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/IDZ_1_2.html');
});

let taxis = [
    { number: 'AX1111AA', brand: 'Toyota Camry', driver: 'Коваленко О.В.', lat: 50.005, lng: 36.230 },
    { number: 'AX2222BB', brand: 'Renault Logan', driver: 'Шевченко І.М.', lat: 49.995, lng: 36.250 }
];

io.on('connection', (socket) => {
    console.log('Новий клієнт підключився');
    
    socket.emit('updateTaxis', taxis);

    socket.on('addTaxi', (newTaxi) => {
        newTaxi.lat = 50.000 + (Math.random() - 0.5) * 0.08;
        newTaxi.lng = 36.230 + (Math.random() - 0.5) * 0.08;
        
        taxis.push(newTaxi);
        console.log(`Додано нове авто: ${newTaxi.number}`);
        
        io.emit('updateTaxis', taxis);
    });

    socket.on('deleteTaxi', (numberToRemove) => {
        taxis = taxis.filter(taxi => taxi.number !== numberToRemove);
        console.log(`Авто видалено: ${numberToRemove}`);
        
        io.emit('updateTaxis', taxis);
    });

    socket.on('disconnect', () => {
        console.log('Клієнт відключився');
    });
});

setInterval(() => {
    taxis.forEach(taxi => {
        taxi.lat += (Math.random() - 0.5) * 0.001;
        taxi.lng += (Math.random() - 0.5) * 0.001;
    });
    
    io.emit('updateTaxis', taxis);
}, 2000);

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Сервер працює: http://localhost:${PORT}`);
});