class MissionReport {
    constructor(missionReportData) {
        this.flightPath = missionReportData.flightPath;
        this.logs = missionReportData.logs;
        this.mappingsId = missionReportData.mappingsId;
        this.photosId = missionReportData.photosId;
        this.team = missionReportData.team;
        this.videosId = missionReportData.videosId;
        this.maxAltitude = missionReportData.maxAltitude;
        this.controlMode = missionReportData.controlMode;
        this.departure = missionReportData.departure;
        this.destination = missionReportData.destination;
        this.distanceTraveled = missionReportData.distanceTraveled;
        this.droneId = missionReportData.droneId;
        this.duration = missionReportData.duration;
        this.lidarReadings = missionReportData.lidarReadings;
        this.lowestAltitude = missionReportData.lowestAltitude;
        this.lowestSpeed = missionReportData.lowestSpeed;
        this.maxSpeed = missionReportData.maxSpeed;
        this.signalStrength = missionReportData.signalStrength;
        this.pilotId = missionReportData.pilotId;
    }

    // --------------- GETTERS

    get flightPath() {
        return this.flightPath;
    }

    get logs() {
        return this.logs;
    }

    get mappingsId() {
        return this.mappingsId;
    }

    get photosId() {
        return this.photosId;
    }

    get team() {
        return this.team;
    }

    get videosId() {
        return this.videosId;
    }

    get maxAltitude() {
        return this.maxAltitude;
    }

    get controlMode() {
        return this.controlMode;
    }

    get departure() {
        return this.departure;
    }

    get destination() {
        return this.destination;
    }

    get distanceTraveled() {
        return this.distanceTraveled;
    }

    get droneId() {
        return this.droneId;
    }

    get duration() {
        return this.duration;
    }

    get lidarReadings() {
        return this.lidarReadings;
    }

    get lowestAltitude() {
        return this.lowestAltitude;
    }

    get lowestSpeed() {
        return this.lowestSpeed;
    }

    get maxSpeed() {
        return this.maxSpeed;
    }

    get signalStrength() {
        return this.signalStrength;
    }

    get pilotId() {
        return this.pilotId;
    }

    // --------------- SETTERS

    set flightPath(value) {
        this.flightPath = value;
    }

    set logs(value) {
        this.logs = value;
    }

    set mappingsId(value) {
        this.mappingsId = value;
    }

    set photosId(value) {
        this.photosId = value;
    }

    set team(value) {
        this.team = value;
    }

    set videosId(value) {
        this.videosId = value;
    }

    set maxAltitude(value) {
        this.maxAltitude = value;
    }

    set controlMode(value) {
        this.controlMode = value;
    }

    set departure(value) {
        this.departure = value;
    }

    set destination(value) {
        this.destination = value;
    }

    set distanceTraveled(value) {
        this.distanceTraveled = value;
    }

    set droneId(value) {
        this.droneId = value;
    }

    set duration(value) {
        this.duration = value;
    }

    set lidarReadings(value) {
        this.lidarReadings = value;
    }

    set lowestAltitude(value) {
        this.lowestAltitude = value;
    }

    set lowestSpeed(value) {
        this.lowestSpeed = value;
    }

    set maxSpeed(value) {
        this.maxSpeed = value;
    }

    set signalStrength(value) {
        this.signalStrength = value;
    }

    set pilotId(value) {
        this.pilotId = value;
    }

}

class MissionReportGenerator {
    static generateRandomMissionReport() {
        const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const getRandomLatitude = () => getRandomNumber(-90, 90);
        const getRandomLongitude = () => getRandomNumber(-180, 180);
        const getRandomLogs = () => {
            const commands = ['print location', 'print state', 'capture photos', 'capture images'];
            let logs = {};
            for (let i = 0; i < 4; i++) {
                logs[`logId${i}`] = commands[getRandomNumber(0, commands.length - 1)];
            }
            return logs;
        };

        let flightPath = {
            path: {
                values: Array.from({ length: 4 }, () => ({
                    latitude: getRandomLatitude(),
                    longitude: getRandomLongitude(),
                })),
            },
        };

        let logs = getRandomLogs();

        // Similar to logs, you can randomize mappingsId, photosId, videosId, and team
        // Following is a simplified example for mappingsId:
        let mappingsId = {
            mapping1: 'mappingImageId1',
            mapping2: 'mappingImageId2',
            mapping3: 'mappingImageId3',
            mapping4: 'mappingImageId4',
        };

        // Skipping detailed random generation for photosId, videosId, team for brevity

        let missionReport = {
            flightPath,
            logs,
            mappingsId,
            // Skipping photosId, videosId, team for brevity
            maxAltitude: getRandomNumber(1, 5000),
            controlMode: getRandomNumber(0, 1) ? 'manual' : 'auto',
            departure: {
                latitude: getRandomLatitude(),
                longitude: getRandomLongitude(),
            },
            destination: {
                latitude: getRandomLatitude(),
                longitude: getRandomLongitude(),
            },
            distanceTraveled: getRandomNumber(1, 10000),
            droneId: `D-${getRandomNumber(1000, 9999)}`,
            duration: getRandomNumber(1000, 5000),
            lidarReadings: [getRandomNumber(1, 10) / 10, getRandomNumber(1, 10) / 10],
            lowestAltitude: getRandomNumber(1, 500),
            lowestSpeed: getRandomNumber(1, 50),
            mappingsId: `M-${getRandomNumber(100, 999)}`,
            maxSpeed: getRandomNumber(10, 100),
            signalStrength: `S-${getRandomNumber(1, 100)}`,
            pilotId: `P-${getRandomNumber(1000, 9999)}`
        };

        return missionReport;
    }
}

let randomMissionReport = MissionReportGenerator.generateRandomMissionReport();
console.log(JSON.stringify(randomMissionReport, null, 2));

    // WRITE
    async function Insert_missionReport(missionReportData) {
        try {
          const docRef = await addDoc(collection(db, "missionReports"), missionReportData);
          console.log("Mission Report written with ID: ", docRef.id);
        } catch (error) {
          console.error("Error adding mission report: ", error);
        }
    }
    // WRITE

    // READ 
    async function Get_missionReportById(reportId) {
        try {
          const docRef = doc(db, "missionReports", reportId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            console.log("Mission Report data:", docSnap.data());
            return docSnap.data();
          } else {
            console.log("No such mission report!");
            return null;
          }
        } catch (error) {
          console.error("Error fetching mission report: ", error);
          return null;
        }
    }
    // READ 

    // UPDATE
    async function Update_missionReport(reportId, updatedData) {
        try {
          const reportRef = doc(db, "missionReports", reportId);
          await updateDoc(reportRef, updatedData);
          console.log("Mission Report successfully updated");
        } catch (error) {
          console.error("Error updating mission report: ", error);
        }
    }
    // UPDATE

    // DELETE 
    async function Delete_missionReport(reportId) {
        try {
          await deleteDoc(doc(db, "missionReports", reportId));
          console.log("Mission Report successfully deleted");
        } catch (error) {
          console.error("Error deleting mission report: ", error);
        }
    }
    // DELETE 

let flightPath = {
    path : {
        values : [
            {latitude:0, longitude: 0},
            {latitude:0, longitude: 0},
            {latitude:0, longitude: 0},
            {latitude:0, longitude: 0}
        ]
    }
}
let logs = {
    skdjfhw83742 : 'print location',
    skdjf324ads2 : 'print state',
    jskn87432 : 'capture photos',
    ksjlkfs9283 : 'capture images',
}
let mappingsId = {
    sheflke9823 : 'mappingImageId',
    lsdjf8324 : 'mappingImageId2',
    klsjkf3948 : 'mappingImageId3',
    lsjhfdskl834 : 'mappingImageId4',
}
let photosId = {
    lsdfhsk8435 : 'imageId',
    sldnfk934 : 'ImageId2',
    slhf834 : 'imageId3',
    lksdfks3432 : 'imageId4',
}
let videosId = {
    sdlfsd : 'videoId',
    sldmfks3 : 'videoId2',
    sldfw0 : 'videoId3',
    klsdf912 : 'videoId4',
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

// MISSION-REPORTS
