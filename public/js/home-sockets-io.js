var socket = io();

socket.on('message', function(data){
    $('#alerts').text(data);
});

socket.on('droneConnected', function(data){
    $('#alerts').text('Drone just connected');
    const formattedLocation = `[${data.location.latitude}°, ${data.location.longitude}°]`;

    $('#connection-status').text(data.connectionStatus);
    $('#battery-level').text(data.batteryLevel+'%');
    $('#altitude').text(data.altitude);
    $('#gps-coordinates').text(formattedLocation);
    $('#speed').text(data.speed);
    $('#lidarDistance').text('0');
    $('#lidarAngle').text('0');

});

socket.on('updateLidarReading', function (data) {
    console.log(`update Data`, data);
    let distance = data.distance;
    let angle = data.theta;
    $('#lidarDistance').text(distance);
    $('#lidarAngle').text(angle);
    $('#alerts').text(`newLine : ${JSON.stringify(data, null, 2)}`);
});
