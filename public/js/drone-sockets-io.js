


console.log(`client IO script runned`);

const socket = io("http://localhost:3000");

socket.on('connect', () => {
    let latitudeTruncated = Math.floor((45.41117000 + getRandomNumberInRange(-0.5, 0.5)) * 1000) / 1000
    let longitudeTruncated = Math.floor((-75.69812000 + getRandomNumberInRange(-0.5, 0.5)) * 1000) / 1000
    let location = {
        latitude: latitudeTruncated,
        longitude: longitudeTruncated
    }
    let batteryLevel = 60
    let altitude = 0;
    let speed = 0;
    let connectionStatus = 'Connected';

    let droneData = {
        location: location,
        batteryLevel:batteryLevel,
        altitude:altitude,
        speed:speed,
        connectionStatus:connectionStatus
    }

    console.log('Connected to server');
    socket.emit('droneConnected', droneData);
});

socket.on('newLidarReading', (data) => {
    console.log(`new Lidar Reading: ${data}`);
    socket.emit('newLidarReading', data);
});

// socket.emit('droneConnected', 'Drone just connected');

function getRandomNumberInRange(min, max) {
    return Math.random() * (max - min) + min;
}

// setInterval(function() {
//     let randomNumber = getRandomNumberInRange(-100, 100);
//     console.log(`Emitting lidarAngle: ${randomNumber}`); // Log before emitting

//     socket.emit('lidarAngle', randomNumber);
// }, 20);