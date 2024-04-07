import { log } from "console";

// DRONES

class Drone {
    constructor(droneData) {
        this.flight = droneData.flight;
        this.identification = droneData.identification;
        this.payload = droneData.payload;
        this.specifications = droneData.specifications;
    }

    // --------------- GETTERS

    // Flight Getters
    get Flight() {
        return this.flight;
    }

    get FlightAltitude() {
        return this.flight.altitude.value;
    }

    get BatteryLevel() {
        return this.flight.batteryLevel.value;
    }

    get flightEndAt() {
        return this.flight.endAt.date;
    }

    get flightLocation() {
        return this.flight.location;
    }

    get orientation() {
        return this.flight.orientation.value;
    }
    

    // Pilot 
    get pilot() {
        return this.flight.pilot;
    }
    get pilotName() {
        return this.flight.pilot.name;
    }
    get pilotId() {
        return this.flight.pilot.id;
    }
    // Pilot 

    // Sensors
    get sensors() {
        return this.flight.sensors;
    }
    get buzzer() {
        return this.flight.sensors.buzzer;
    }
    get isBuzzerOn() {
        return this.flight.sensors.buzzer.state;
    }
    get lidar() {
        return this.flight.sensors.lidar;
    }
    get ultrasonic() {
        return this.flight.sensors.ultrasonic;
    }
    // Sensors

    get speed() {
        return this.flight.speed.value;
    }

    get flightStartedAt() {
        return this.flight.startedAt.date;
    }
    // Flight Getters

    // Identification Getters
    get identification() {
        return this.identification;
    }

    get pilotInfo() {
        return this.identification.pilot;
    }

    get serialNumber() {
        return this.identification.serialNumber.value;
    }
    // Identification Getters


    // Payload Getters
    get payload() {
        return this.payload;
    }

    get cargo() {
        return this.payload.cargo;
    }
    get payloadDescription() {
        return this.payload.cargo.description;
    }
    get payloadDimensions() {
        return this.payload.cargo.dimensions;
    }
    get payloadName() {
        return this.payload.cargo.item;
    }
    get payloadWeight() {
        return this.payload.cargo.weight;
    }
    // Payload Getters


    // Specifications Getters
    get specifications() {
        return this.specifications;
    }
    get specsBatteryCapacity() {
        return this.specifications.battery.capacity;
    }
    get specsBatteryLevel() {
        return this.specifications.battery.level;
    }
    get specsFlightModes() {
        return this.specifications.flightModes; 
    }

    get specsMaxAltitude() {
        return this.specifications.maxAltitude;
    }

    get specsMaxSpeed() {
        return this.specifications.maxSpeed; 
    }

    get specsSensors() {
        return this.specifications.sensors;
    }

    get specsSoftVersion() {
        return this.specifications.softVersion;
    }
    // CAMERA SPECS
    get cameraResolution() {
        return `${this.specifications.sensors.camera.widthResolution}X${this.specifications.sensors.camera.heightResolution}`
    }
    get cameraHealth() {
        return this.specifications.sensors.camera.health;
    }
    // CAMERA SPECS

    // LIDAR SPECS
    get lidarFOV() {
        return this.specifications.sensors.lidar.FOV;
    }
    get lidarDetectionRange() {
        return this.specifications.sensors.lidar.detectionRange;
    }
    get lidarScanPattern() {
        return this.specifications.sensors.lidar.scanPattern;
    }
    get lidarHealth() {
        return this.specifications.sensors.lidar.health;
    }
    // LIDAR SPECS

    // ultrasonic SPECS
    get ultraSonicMaxDistance() {
        return this.specifications.sensors.ultrasonic.maxDistance;
    }
    get ultraSonicHealth() {
        return this.specifications.sensors.ultrasonic.health;
    }

    // LIDAR SPECS


    get specsWeight() {
        return this.specifications.weight; 
    }
    // Specifications Getters

    // --------------- GETTERS


    // --------------- SETTERS
    // Flight Setters
    setFlight(flightData) {
        this.flight = flightData;
    }

    setFlightAltitude(value) {
        this.flight.altitude.value = value;
    }

    setBatteryLevel(value) {
        this.flight.batteryLevel.value = value;
    }

    setFlightEndAt(date) {
        this.flight.endAt.date = date;
    }

    setFlightLocation(latitude, longitude) {
        this.flight.location.latitude = latitude;
        this.flight.location.longitude = longitude;
    }

    setOrientation(value) {
        this.flight.orientation.value = value;
    }

    setPilot(id, name) {
        this.flight.pilot.id = id;
        this.flight.pilot.name = name;
    }

    setSensors(sensors) {
        this.flight.sensors = sensors;
    }

    setSpeed(value) {
        this.flight.speed.value = value;
    }

    setFlightStartedAt(date) {
        this.flight.startedAt.date = date;
    }

    // Identification Setters
    setIdentification(identification) {
        this.identification = identification;
    }

    setPilotInfo(name, userId) {
        this.identification.pilot.name = name;
        this.identification.pilot.userId = userId;
    }

    setSerialNumber(value) {
        this.identification.serialNumber.value = value;
    }

    // Payload Setters
    setPayload(payload) {
        this.payload = payload;
    }

    setCargo(cargo) {
        this.payload.cargo = cargo;
    }

    // Specifications Setters
    setSpecifications(specifications) {
        this.specifications = specifications;
    }

    // ---------------- SETTERS

    // METHODS
    static generateRandomFlight() {
        const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const getRandomBoolean = () => Math.random() < 0.5;

        return {
            altitude: { value: getRandomNumber(0, 10000) },
            batteryLevel: { value: getRandomNumber(1, 100) },
            endAt: { 
                date: new Date(new Date().getTime() + 60 * 60 * 1000)
            },
            location: {
                latitude: getRandomNumber(-90, 90),
                longitude: getRandomNumber(-180, 180)
            },
            orientation: { value: getRandomNumber(0, 360) },
            pilot: {
                id: `P-${getRandomNumber(1000, 9999)}`,
                name: `Pilot-${getRandomNumber(1, 100)}`
            },
            sensors: {
                buzzer: { state: getRandomBoolean() },
                lidar: {
                    angle: getRandomNumber(0, 360),
                    distance: getRandomNumber(1, 1000),
                    mappingsId: `M-${getRandomNumber(100, 999)}`,
                    q: getRandomNumber(1, 10)
                },
                ultrasonic: { distance: getRandomNumber(1, 500) }
            },
            speed: { value: getRandomNumber(0, 300) },
            startedAt: { date: new Date() },
        };
    }

    static generateRandomIdentification() {
        const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const getRandomBoolean = () => Math.random() < 0.5;
        return {
            pilot: {
                name: `PilotName-${getRandomNumber(1, 100)}`,
                userId: `U-${getRandomNumber(1000, 9999)}`
            },
            serialNumber: { value: `SN-${getRandomNumber(10000, 99999)}` }
        };
    }

    static generateRandomPayload() {
        const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const getRandomBoolean = () => Math.random() < 0.5;
        return {
            cargo: {
                description: `Desc-${getRandomNumber(1, 100)}`,
                dimensions: {
                    width: getRandomNumber(1, 100),
                    height: getRandomNumber(1, 100),
                    length: getRandomNumber(1, 100)
                },
                item: `Item-${getRandomNumber(1, 100)}`,
                weight: getRandomNumber(1, 1000)
            }
        };
    }

    static generateRandomSpecifications() {
        const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const getRandomBoolean = () => Math.random() < 0.5;

        const scanPattern = ['laser', 'light', 'photo', 'IR'];
        const randomIndex = Math.floor(Math.random() * scanPattern.length);
        const getRandomScanPattern = scanPattern[randomIndex];

        const randomCameraResolution = [{width:1920, height:1080},  {width:3840, height:2160}, {width:960, height:540}];
        const randIndex = Math.floor(Math.random() * randomCameraResolution.length);
        const getRandomWidthResolution = randomCameraResolution[randIndex].width;
        const getRandomHeightResolution = randomCameraResolution[randIndex].height;


        return {
            battery: {
                capacity: getRandomNumber(1000, 5000),
                level: getRandomNumber(1, 100)
            },
            flightModes: {
                auto: getRandomBoolean(),
                semi: getRandomBoolean(),
                manual: getRandomBoolean(),
            },
            maxAltitude: { value: getRandomNumber(1, 5000) },
            maxSpeed: { value: getRandomNumber(1, 1000) },
            sensors: {
                camera: {
                    heightResolution: getRandomHeightResolution,
                    widthResolution: getRandomWidthResolution,
                    health: getRandomBoolean()
                },
                lidar: {
                    FOV: `${getRandomNumber(1, 180)}`,
                    detectionRange: [getRandomNumber(1, 50), getRandomNumber(51, 200)],
                    scanPattern: `${getRandomScanPattern}`,
                    health: getRandomBoolean()
                },
                ultrasonic: {
                    maxDistance: getRandomNumber(1, 100),
                    health: getRandomBoolean()
                }
            },
            softVersion: { value: `${getRandomNumber(1, 5)}.${getRandomNumber(0, 9)}` },
            weight: { value: getRandomNumber(1, 50) }
        };
    }

    static generateRandomDroneObject() {
        return {
            flight: this.generateRandomFlight(),
            identification: this.generateRandomIdentification(),
            payload: this.generateRandomPayload(),
            specifications: this.generateRandomSpecifications(),
        };
    }

    static generateRandomDrone() {
        const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const getRandomBoolean = () => Math.random() < 0.5;
    
        return this.generateRandomDroneObject();
    }
    
    // METHODS

}

let randomDrone = Drone.generateRandomDrone();
console.log(`Random Drone obj : ${JSON.stringify(randomDrone, null, 2)}`);

    // WRITE
    async function InsertDrone(droneData) {
        try {
          const docRef = await addDoc(collection(db, "drones"), droneData);
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      }
    //   WRITE

    // READ
    async function GetDroneById(droneId) {
        const droneRef = doc(db, "drones", droneId);
        try {
          const docSnap = await getDoc(droneRef);
          if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            return docSnap.data(); // Returns the drone data
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            return null;
          }
        } catch (e) {
          console.error("Error fetching document: ", e);
          return null;
        }
    }
    // READ

    // DELETE
    async function DeleteDrone(droneId) {
        try {
          await deleteDoc(doc(db, "drones", droneId));
          console.log("Document successfully deleted!");
        } catch (error) {
          console.error("Error removing document: ", error);
        }
    }
    // DELETE

    // UPDATE
    async function UpdateDrone(droneId, updatedData) {
        try {
          const droneRef = doc(db, "drones", droneId);
          await updateDoc(droneRef, updatedData);
          console.log("Document successfully updated!");
        } catch (error) {
          console.error("Error updating document: ", error);
        }
    }
    // UPDATE

let flight = {
    altitude: {value: 0},
    batteryLevel: {value: 0},
    endAt : {date: new Date()},
    location : {
        latitude: 0, 
        longitude: 0
    },
    orientation: {value: 0},
    pilot: {
        id: '',
        name: '' 
    },
    sensors : {
        buzzer: {
            state: true
        },
        lidar : {
            angle: 0,
            distance: 0,
            mappingsId: '',
            q: 0
        },
        ultrasonic: {
            distance: 0
        }
    },
    speed : {value: 0},
    startedAt : {date: new Date()},
}

let identification = {
    pilot: {
        name: '',
        userId : ''
    },
    serialNumber : { value: 0 }
}

let payload = {
    cargo: {
        description : '',
        dimensions : {
            width : 0,
            height : 0,
            length : 0
        },
        item : '',
        weight : 0
    }
}
let specifications = {
    battery: {
        capacity: 3600,
        level: 100
    },
    flightModes : {
        auto : true,
        semi : false,
        manual : false,
    },
    maxAltitude: {value: 100}, // meters
    maxSpeed : {value : 100}, // km/h
    sensors : {
        camera : {
            heightResolution : 1080,
            widthResolution : 1920,
            health : true
        },
        lidar : {
            FOV: "",
            detectionRange : [
                10,
                100
            ],
            scanPattern : '',
            health : true
        },
        ultrasonic : {
            maxDistance: 0,
            health : true
        }
    },
    softVersion : {value : '1.0'},
    weight : {value : 10}
}
    

let drone = {
    flight: flight,
    identification: identification,
    payload: payload,
    specifications: specifications
};

let drones = {
    sdlfsds: drone,
    ldsfskdfmdsk: drone,
};

// DRONES
