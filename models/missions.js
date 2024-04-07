// MISSIONS

class Mission {
    constructor(missionData) {
        this._droneId = missionData.droneId;
        this._endAt = missionData.endAt;
        this._location = missionData.location;
        this._pilotId = missionData.pilotId;
        this._startedAt = missionData.startedAt;
        this._teamId = missionData.teamId;
        this._teamLeaderId = missionData.teamLeaderId;
        this._type = missionData.type;
        this._urgency = missionData.urgency;
    }

    // --------------- GETTERS

    get droneId() {
        return this.droneId;
    }

    get endAt() {
        return this.endAt;
    }

    get location() {
        return this.location;
    }

    get pilotId() {
        return this.pilotId;
    }

    get startedAt() {
        return this.startedAt;
    }

    get teamId() {
        return this.teamId;
    }

    get teamLeaderId() {
        return this.teamLeaderId;
    }

    get type() {
        return this.type;
    }

    get urgency() {
        return this.urgency;
    }

    // --------------- SETTERS

    set droneId(value) {
        this.droneId = value;
    }

    set endAt(value) {
        this.endAt = value;
    }

    set location(value) {
        this.location = value;
    }

    set pilotId(value) {
        this.pilotId = value;
    }

    set startedAt(value) {
        this.startedAt = value;
    }

    set teamId(value) {
        this.teamId = value;
    }

    set teamLeaderId(value) {
        this.teamLeaderId = value;
    }

    set type(value) {
        this.type = value;
    }

    set urgency(value) {
        this.urgency = value;
    }

    // METHODS
    static generateRandomMission() {
        const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const missionTypes = ['Reconnaissance', 'Delivery', 'Surveillance', 'Rescue'];
        const urgencies = ['Low', 'Medium', 'High', 'Critical'];

        const mission = {
            droneId: `D-${getRandomNumber(1000, 9999)}`,
            endAt: new Date(new Date().getTime() + getRandomNumber(1, 24) * 60 * 60 * 1000),
            location: {
                latitude: getRandomNumber(-90, 90),
                longitude: getRandomNumber(-180, 180),
            },
            pilotId: `P-${getRandomNumber(1000, 9999)}`,
            startedAt: new Date(),
            teamId: `T-${getRandomNumber(100, 999)}`,
            teamLeaderId: `TL-${getRandomNumber(1000, 9999)}`,
            type: missionTypes[getRandomNumber(0, missionTypes.length - 1)],
            urgency: urgencies[getRandomNumber(0, urgencies.length - 1)],
        };

        return new Mission(mission);
    }
    // METHODS
}

const randomMission = Mission.generateRandomMission();
console.log(randomMission);


    // WRITE
    async function Insert_mission(missionData) {
        try {
          const docRef = await addDoc(collection(db, "missions"), missionData);
          console.log("Mission added with ID: ", docRef.id);
        } catch (error) {
          console.error("Error adding mission: ", error);
        }
    } 
    // WRITE 

    // READ
    async function Get_missionById(missionId) {
        try {
          const docRef = doc(db, "missions", missionId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            console.log("Mission data:", docSnap.data());
            return docSnap.data();
          } else {
            console.log("No such mission found!");
            return null;
          }
        } catch (error) {
          console.error("Error fetching mission: ", error);
          return null;
        }
    }
    // READ

    // UPDATE 
    async function Update_mission(missionId, updatedData) {
        try {
          const missionRef = doc(db, "missions", missionId);
          await updateDoc(missionRef, updatedData);
          console.log("Mission successfully updated");
        } catch (error) {
          console.error("Error updating mission: ", error);
        }
    }
    // UPDATE 

    // DELETE
    async function Delete_mission(missionId) {
        try {
          await deleteDoc(doc(db, "missions", missionId));
          console.log("Mission successfully deleted");
        } catch (error) {
          console.error("Error deleting mission: ", error);
        }
    }
    // DELETE

let mission = {
    droneId : '',
    endAt : '',
    location : {latitude:0, longitude: 0},
    pilotId : '',
    startedAt : new Date(),
    teamId : '',
    teamLeaderId : '',
    type : '',
    urgency: ''
}


let missions = {
    sjldfslfds: mission,
    ldskfsdew: mission,
    dlskfskd: mission
}

// MISSIONS
