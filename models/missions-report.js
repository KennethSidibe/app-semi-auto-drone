import { db } from "./db-config.js";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, doc, getFirestore, setDoc, getDocs, getDoc, updateDoc, deleteDoc, documentId, query as queryFirestore, where } from 'firebase/firestore';
import { GeoPoint } from "firebase/firestore";


export default class MissionReport {
    constructor(missionReportData) {
        this._flightPath = missionReportData.flightPath;
        this._logs = missionReportData.logs;
        this._mappingsId = missionReportData.mappingsId;
        this._photosId = missionReportData.photosId;
        this._videosId = missionReportData.videosId;
        this._maxAltitude = missionReportData.maxAltitude;
        this._controlMode = missionReportData.controlMode;
        this._departure = missionReportData.departure;
        this._destination = missionReportData.destination;
        this._distanceTraveled = missionReportData.distanceTraveled;
        this._droneId = missionReportData.droneId;
        this._duration = missionReportData.duration;
        this._lidarReadings = missionReportData.lidarReadings;
        this._lowestAltitude = missionReportData.lowestAltitude;
        this._lowestSpeed = missionReportData.lowestSpeed;
        this._maxSpeed = missionReportData.maxSpeed;
        this._signalStrength = missionReportData.signalStrength;
        this._pilotId = missionReportData.pilotId;
        this._teamId = missionReportData.teamId;
        this._missionId = missionReportData.missionId;
        this._missionType = missionReportData.missionType;
        this._missionUrgency = missionReportData.missionUrgency;
    }

    // --------------- GETTERS

    get flightPath() {
        return this._flightPath.path;
    }
    get flightPathString() {
        let pathString = '';
        this._flightPath.path.forEach((pathValue, index) => {
            pathString += `[${pathValue.latitude}°, ${pathValue.longitude}°]`;
            if (index !== this._flightPath.path.length - 1) {
                pathString += `, `;
            }
        });
        return pathString;
    }

    get logs() {
        return this._logs;
    }

    get mappingsId() {
        return this._mappingsId;
    }

    get photosId() {
        return this._photosId;
    }

    get missionId() {
        return this._missionId;
    }

    get teamId() {
        return this._teamId;
    }

    get missionType() {
        return this._missionType;
    }

    get missionUrgency() {
        return this._missionUrgency;
    }

    get videosId() {
        return this._videosId;
    }

    get maxAltitude() {
        return this._maxAltitude;
    }

    get controlMode() {
        return this._controlMode;
    }

    get departure() {
        return this._departure;
    }

    get destination() {
        return this._destination;
    }

    get distanceTraveled() {
        return this._distanceTraveled;
    }

    get droneId() {
        return this._droneId;
    }

    get duration() {
        return this._duration;
    }

    get lidarReadings() {
        return this._lidarReadings;
    }

    get lowestAltitude() {
        return this._lowestAltitude;
    }

    get lowestSpeed() {
        return this._lowestSpeed;
    }

    get maxSpeed() {
        return this._maxSpeed;
    }

    get signalStrength() {
        return this._signalStrength;
    }

    get pilotId() {
        return this._pilotId;
    }

    // --------------- SETTERS

    set flightPath(value) {
        this._flightPath.path = value;
    }

    set logs(value) {
        this._logs = value;
    }

    set mappingsId(value) {
        this._mappingsId = value;
    }

    set photosId(value) {
        this._photosId = value;
    }

    set missionType(value) {
        this._missionType = value;
    }

    set missionUrgency(value) {
        this._missionUrgency = value;
    }

    set teamId(value) {
        this._teamId = value;
    }

    set missionId(value) {
        this._missionId = value;
    }

    set videosId(value) {
        this._videosId = value;
    }

    set maxAltitude(value) {
        this._maxAltitude = value;
    }

    set controlMode(value) {
        this._controlMode = value;
    }

    set departure(value) {
        this._departure = value;
    }

    set destination(value) {
        this._destination = value;
    }

    set distanceTraveled(value) {
        this._distanceTraveled = value;
    }

    set droneId(value) {
        this._droneId = value;
    }

    set duration(value) {
        this._duration = value;
    }

    set lidarReadings(value) {
        this._lidarReadings = value;
    }

    set lowestAltitude(value) {
        this._lowestAltitude = value;
    }

    set lowestSpeed(value) {
        this._lowestSpeed = value;
    }

    set maxSpeed(value) {
        this._maxSpeed = value;
    }

    set signalStrength(value) {
        this._signalStrength = value;
    }

    set pilotId(value) {
        this._pilotId = value;
    }

}

export class MissionReportGenerator {
    static generateRandomMissionReport() {
        const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const getRandomLatitude = () => getRandomNumber(-90, 90);
        const getRandomLongitude = () => getRandomNumber(-180, 180);
        const getRandomLogs = () => {
            const commands = ['print location', 'print state', 'low battery', 'capture photos', 'capture images', 'buzzer triggered'];
            let logs = [];
            for (let i = 0; i < 4; i++) {
                logs.push(commands[getRandomNumber(0, commands.length - 1)]);
            }
            return logs;
        };
        const missionTypes = ['Reconnaissance', 'Delivery', 'Surveillance', 'Rescue'];
        const urgencies = ['Low', 'Medium', 'High', 'Critical'];

        let teamIdRandom = [
            'sdkfjs249',
            'sldfals324',
            'sdlkfssa23',
            'pqoreow1239'
        ];
        let missionIdRandom = [
            'sdkfjs249',
            'sldfals324',
            'sdlkfssa23',
            'pqoreow1239'
        ];


        let flightPath = {
            path: 
                Array.from({ length: 4 }, () => (new GeoPoint(
                    getRandomLatitude(),
                    getRandomLongitude(),
                )))
        };

        let logs = getRandomLogs();

        let mappingsId = [
            'mappingImageId1',
            'mappingImageId2',
            'mappingImageId3',
            'mappingImageId4'
        ];

        let photosId = [
            'imageId1',
            'imageId2',
            'imageId3',
            'imageId4'
        ];

        let videosId = [
            'videoId1',
            'videoId2',
            'videoId3',
            'videoId4'
        ];

        let missionReport = {
            flightPath,
            logs,
            mappingsId,
            // Skipping photosId, videosId, team for brevity
            maxAltitude: getRandomNumber(1, 5000),
            controlMode: getRandomNumber(0, 1) ? 'manual' : 'auto',
            departure: new GeoPoint(
                getRandomLatitude(),
                getRandomLongitude(),
            ),
            destination: new GeoPoint(
                getRandomLatitude(),
                getRandomLongitude(),
            ),
            distanceTraveled: getRandomNumber(1, 10000),
            videosId : videosId,
            photosId: photosId,
            teamId: `T-`+ teamIdRandom[getRandomNumber(0, teamIdRandom.length)],
            missionId: `M-`+ missionIdRandom[getRandomNumber(0, missionIdRandom.length)],
            droneId: `D-${getRandomNumber(1000, 9999)}`,
            duration: getRandomNumber(1000, 5000),
            lidarReadings: [getRandomNumber(1, 10) / 10, getRandomNumber(1, 10) / 10],
            lowestAltitude: getRandomNumber(1, 500),
            lowestSpeed: getRandomNumber(1, 50),
            maxSpeed: getRandomNumber(10, 100),
            missionType: missionTypes[getRandomNumber(0, missionTypes.length - 1)],
            missionUrgency: urgencies[getRandomNumber(0, urgencies.length - 1)],
            signalStrength: `S-${getRandomNumber(1, 100)}`,
            pilotId: `P-${getRandomNumber(1000, 9999)}`
        };

        return missionReport;
    }
}

// let randomMissionReport = MissionReportGenerator.generateRandomMissionReport();
// console.log(JSON.stringify(randomMissionReport, null, 2));

    // WRITE
    export async function InsertMissionReport(missionReportData) {
        try {
          const docRef = await addDoc(collection(db, "missionReports"), missionReportData);
          console.log("Mission Report written with ID: ", docRef.id);
          return docRef.id;
        } catch (error) {
          console.error("Error adding mission report: ", error.stack);
          return '';
        }
    }
    // WRITE

    // READ 
    export async function GetMissionReportById(reportId) {
        try {
          const docRef = doc(db, "missionReports", reportId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            return docSnap.data();
          } else {
            console.log("No such mission report!");
            return null;
          }
        } catch (error) {
          console.error("Error fetching mission report: ", error.stack);
          return null;
        }
    }

    export async function getAllMissionReports() {
        const missionReportsRef = collection(db, 'missionReports'); // Reference to the missionReports collection
        const missionReportsSnapshot = await getDocs(missionReportsRef); // Get a snapshot of all documents in the collection
    
        const missionReportsArray = []; // Initialize an empty array to store the MissionReport objects
    
        missionReportsSnapshot.forEach(doc => {
            console.log(`teamId loop object : ${JSON.stringify(doc.data().teamId, null, 2)}`);
            console.log(`missionId loop object : ${JSON.stringify(doc.data().missionId, null, 2)}`);
            console.log(`DroneId loop object : ${JSON.stringify(doc.data().droneId, null, 2)}`);

            // For each document, create a new MissionReport object and add it to the array
            const missionReport = {
                report: new MissionReport(doc.data()), // Assuming the constructor of MissionReport can take the Firestore document data directly
                id: doc.id
            };
            missionReportsArray.push(missionReport);
        });
    
        return missionReportsArray; // Return the array of MissionReport objects
    }
    // READ 

    async function doesMissionReportExists(reportId) {
        try {
          const missionReportRef = doc(db, "missionReports", reportId);
      
          const missionReportSnapshot = await getDoc(missionReportRef);
      
          return missionReportSnapshot.exists();
        } catch (error) {
          console.error("Error checking for mission report existence: ", error.stack);
          return false;
        }
      }

    // UPDATE
    export async function UpdateMissionReport(reportId, updatedData) {
        try {
            if(!await doesMissionReportExists(reportId)) {
                console.log(`Report id provided does not exist`);
                return false;
            }
          const reportRef = doc(db, "missionReports", reportId);
          await updateDoc(reportRef, updatedData);
          console.log("Mission Report successfully updated");
          return true;
        } catch (error) {
          console.error("Error updating mission report: ", error.stack);
          return false;
        }
    }
    // UPDATE

    // DELETE 
    export async function DeleteMissionReport(reportId) {
        try {
            if(! await doesMissionReportExists(reportId)) {
                console.log(`Report id provided does not exist`);
                return false;
            }
          await deleteDoc(doc(db, "missionReports", reportId));
          console.log("Mission Report successfully deleted");
          return true;
        } catch (error) {
          console.error("Error deleting mission report: ", error.stack);
          return false;
        }
    }
    // DELETE 

/*

let flightPath = {
    path : [
            new Geopoint(0, 0),
            new Geopoint(0, 0),
            new Geopoint(0, 0),
            new Geopoint(0, 0),
        ]
    }
}




let logs = [
    'print location',
    'print state',
    'capture photos',
    'capture images'
]

}
let mappingsId = [
    'mappingImageId',
    'mappingImageId2',
    'mappingImageId3',
    'mappingImageId4',
]
let photosId = [
    'imageId',
    'ImageId2',
    'imageId3',
    'imageId4',
]
let videosId = [
    'videoId',
    'videoId2',
    'videoId3',
    'videoId4',
}
let team = {
    sldfsdfsd: {
        id: '',
        name: '',
        role: "",
    }
} 

let droneReports = {
    flightPath: flightPath,
    logs: logs,
    mappingsId: mappingsId,
    photosId: photosId,
    team: team,
    videosId: videosId,
    maxAltitude: 10, // in meters
    controlMode : 'manual',
    departure: {
        latitude:0, 
        longitude:0
    },
    destination: {
        latitude:0, 
        longitude:0
    },
    distanceTraveled : 100, // in meters
    dorneId : '',
    duration : 500, // in ms 
    lidarReadings : [
        0.1,
        0.4
    ],
    lowestAltitude: 100,
    lowestSpeed : 8,
    mappingsId : '',
    maxSpeed: 30,
    signalStrength : '',
    pilotId : ''
}

*/

// MISSION-REPORTS
