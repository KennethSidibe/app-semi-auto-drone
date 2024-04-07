import { db } from "./db-config.js";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, doc, getFirestore, setDoc, getDocs, getDoc, updateDoc, deleteDoc, documentId, query as queryFirestore, where } from 'firebase/firestore';
import { GeoPoint } from "firebase/firestore";

// DRONES

export default class Drone {
    constructor(droneData) {
        this._flight = droneData.flight;
        this._identification = droneData.identification;
        this._payload = droneData.payload;
        this._specifications = droneData.specifications;
    }

    // --------------- GETTERS

    // Flight Getters
    get Flight() {
        return this._flight;
    }

    get FlightAltitude() {
        return this._flight.altitude.value;
    }

    get BatteryLevel() {
        return this._flight.batteryLevel.value;
    }

    get flightEndAt() {
        return this._flight.endAt.date;
    }

    get flightLocation() {
        return this._flight.location;
    }

    get orientation() {
        return this._flight.orientation.value;
    }
    

    // Pilot 
    get pilot() {
        return this._flight.pilot;
    }
    get pilotName() {
        return this._flight.pilot.name;
    }
    get pilotId() {
        return this._flight.pilot.id;
    }
    // Pilot 

    // Sensors
    get sensors() {
        return this._flight.sensors;
    }
    get buzzer() {
        return this._flight.sensors.buzzer;
    }
    get isBuzzerOn() {
        return this._flight.sensors.buzzer.state;
    }
    get lidar() {
        return this._flight.sensors.lidar;
    }
    get ultrasonic() {
        return this._flight.sensors.ultrasonic;
    }
    // Sensors

    get speed() {
        return this._flight.speed.value;
    }

    get flightStartedAt() {
        return this._flight.startedAt.date;
    }
    // Flight Getters

    // Identification Getters
    get identification() {
        return this._identification;
    }

    get pilotInfo() {
        return this._identification.pilot;
    }

    get serialNumber() {
        return this._identification.serialNumber.value;
    }
    // Identification Getters


    // Payload Getters
    get payload() {
        return this._payload;
    }

    get cargo() {
        return this._payload.cargo;
    }
    get payloadDescription() {
        return this._payload.cargo.description;
    }
    get payloadDimensions() {
        return this._payload.cargo.dimensions;
    }
    get payloadName() {
        return this._payload.cargo.item;
    }
    get payloadWeight() {
        return this._payload.cargo.weight;
    }
    // Payload Getters


    // Specifications Getters
    get specifications() {
        return this._specifications;
    }
    get specsBatteryCapacity() {
        return this._specifications.battery.capacity;
    }
    get specsBatteryLevel() {
        return this._specifications.battery.level;
    }
    get specsFlightModes() {
        return this._specifications.flightModes; 
    }

    get specsMaxAltitude() {
        return this._specifications.maxAltitude;
    }

    get specsMaxSpeed() {
        return this._specifications.maxSpeed; 
    }

    get specsSensors() {
        return this._specifications.sensors;
    }

    get specsSoftVersion() {
        return this._specifications.softVersion;
    }
    // CAMERA SPECS
    get cameraResolution() {
        return `${this._specifications.sensors.camera.widthResolution}X${this._specifications.sensors.camera.heightResolution}`
    }
    get cameraHealth() {
        return this._specifications.sensors.camera.health;
    }
    // CAMERA SPECS

    // LIDAR SPECS
    get lidarFOV() {
        return this._specifications.sensors.lidar.FOV;
    }
    get lidarDetectionRange() {
        return this._specifications.sensors.lidar.detectionRange;
    }
    get lidarScanPattern() {
        return this._specifications.sensors.lidar.scanPattern;
    }
    get lidarHealth() {
        return this._specifications.sensors.lidar.health;
    }
    // LIDAR SPECS

    // ultrasonic SPECS
    get ultraSonicMaxDistance() {
        return this._specifications.sensors.ultrasonic.maxDistance;
    }
    get ultraSonicHealth() {
        return this._specifications.sensors.ultrasonic.health;
    }

    // LIDAR SPECS


    get specsWeight() {
        return this._specifications.weight; 
    }
    // Specifications Getters

    // --------------- GETTERS


    // --------------- SETTERS
    // Flight Setters
    setFlight(flightData) {
        this._flight = flightData;
    }

    setFlightAltitude(value) {
        this._flight.altitude.value = value;
    }

    setBatteryLevel(value) {
        this._flight.batteryLevel.value = value;
    }

    setFlightEndAt(date) {
        this._flight.endAt.date = date;
    }

    setFlightLocation(latitude, longitude) {
        this._flight.location.latitude = latitude;
        this._flight.location.longitude = longitude;
    }

    setOrientation(value) {
        this._flight.orientation.value = value;
    }

    setPilot(id, name) {
        this._flight.pilot.id = id;
        this._flight.pilot.name = name;
    }

    setSensors(sensors) {
        this._flight.sensors = sensors;
    }

    setSpeed(value) {
        this._flight.speed.value = value;
    }

    setFlightStartedAt(date) {
        this._flight.startedAt.date = date;
    }

    // Identification Setters
    setIdentification(identification) {
        this._identification = identification;
    }

    setPilotInfo(name, userId) {
        this._identification.pilot.name = name;
        this._identification.pilot.userId = userId;
    }
    set pilotName(value) {
        this._identification.pilot.name = value;
    }

    setSerialNumber(value) {
        this._identification.serialNumber.value = value;
    }

    // Payload Setters
    setPayload(payload) {
        this._payload = payload;
    }

    setCargo(cargo) {
        this._payload.cargo = cargo;
    }

    // Specifications Setters
    setSpecifications(specifications) {
        this._specifications = specifications;
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
            location: new GeoPoint(
                getRandomNumber(-90, 90),
                getRandomNumber(-180, 180)
            ),
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

// let randomDrone = Drone.generateRandomDrone();
// console.log(`Random Drone obj : ${JSON.stringify(randomDrone, null, 2)}`);

    // WRITE
    export async function InsertDrone(droneData) {
        try {
          const docRef = await addDoc(collection(db, "drones"), droneData);
          console.log("Document written with ID: ", docRef.id);
          return docRef.id;
        } catch (e) {
          console.error("Error adding document: ", e.stack);
          return '';
        }
      }
    //   WRITE

    // READ
    export async function GetDroneById(droneId) {
        const droneRef = doc(db, "drones", droneId);
        try {
          const docSnap = await getDoc(droneRef);
          if (docSnap.exists()) {
            return docSnap.data(); // Returns the drone data
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            return null;
          }
        } catch (e) {
          console.error("Error fetching document: ", e.stack);
          return null;
        }
    }
    // READ

    // DELETE
    export async function deleteDrone(droneId) {
        try {
          let droneExist = await doesDroneExists(droneId);
          if(!droneExist) {
            return false;
          }
          await deleteDoc(doc(db, "drones", droneId));
          console.log("Document successfully deleted!");
          return true;
        } catch (error) {
          console.error("Error removing document: ", error.stack);
          return false;
        }
    }
    async function doesDroneExists(droneId) {
        try {
          const dronesCollectionRef = collection(db, "drones");
      
          const q = queryFirestore(dronesCollectionRef, where("__name__", "==", droneId));
      
          const querySnapshot = await getDocs(q);
      
          // If the querySnapshot has any documents, the ID exists
          return !querySnapshot.empty;
        } catch (error) {
          console.error("Error checking document ID:", error.stack);
          return false; // In case of error, return false
        }
    }
    // DELETE

    // UPDATE
   export async function UpdateDrone(droneId, updatedData) {
        try {
            if(! await doesDroneExists(droneId)) {
                return false;
            }
          const droneRef = doc(db, "drones", droneId);
          await updateDoc(droneRef, updatedData);
          console.log("Document successfully updated!");
          return true;
        } catch (error) {
          console.error("Error updating document: ", error.stack);
          return false;
        }
    }
    // UPDATE


/* 

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

*/

// DRONES
