import { db } from "./db-config.js";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, updateDoc, deleteDoc,  doc, getFirestore, setDoc, getDocs, getDoc, documentId, query as queryFirestore, where } from 'firebase/firestore';
import { GeoPoint } from "firebase/firestore";

// MISSIONS

export default class Mission {
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
        this._active = missionData.active;
    }

    // --------------- GETTERS

    get droneId() {
        return this._droneId;
    }

    get endAt() {
        return this._endAt;
    }

    get endAtSeconds() {
        return parseInt(this._endAt.seconds) * 1000;
    }

    get location() {
        return this._location;
    }

    get locationString() {
        return `[${this._location.longitude}°, ${this._location.latitude}°]`;
    }

    get pilotId() {
        return this._pilotId;
    }

    get startedAt() {
        return this._startedAt;
    }

    get startedAtSeconds() {
        return parseInt(this._startedAt.seconds) * 1000;
    }

    get teamId() {
        return this._teamId;
    }

    get teamLeaderId() {
        return this._teamLeaderId;
    }

    get type() {
        return this._type;
    }

    get urgency() {
        return this._urgency;
    }

    get active() {
        return this._active;
    }

    // --------------- SETTERS

    set droneId(value) {
        this._droneId = value;
    }

    set endAt(value) {
        this._endAt = value;
    }

    set location(latitude) {
        // accepts a geopoint 
        this._location = value;
    }

    set pilotId(value) {
        this._pilotId = value;
    }

    set startedAt(value) {
        this._startedAt = value;
    }

    set teamId(value) {
        this._teamId = value;
    }

    set teamLeaderId(value) {
        this._teamLeaderId = value;
    }

    set type(value) {
        this._type = value;
    }

    set urgency(value) {
        this._urgency = value;
    }

    set active(value) {
        this._active = value;
    }

    // METHODS
    static generateRandomMission() {
        const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const missionTypes = ['Reconnaissance', 'Delivery', 'Surveillance', 'Rescue'];
        const urgencies = ['Low', 'Medium', 'High', 'Critical'];
        const active = Math.random() < 0.5;

        const mission = {
            droneId: `D-${getRandomNumber(1000, 9999)}`,
            endAt: new Date(new Date().getTime() + getRandomNumber(1, 24) * 60 * 60 * 1000),
            location: new GeoPoint(
                getRandomNumber(-90, 90),
                getRandomNumber(-180, 180)
            ),
            pilotId: `P-${getRandomNumber(1000, 9999)}`,
            startedAt: new Date(),
            teamId: `T-${getRandomNumber(100, 999)}`,
            teamLeaderId: `TL-${getRandomNumber(1000, 9999)}`,
            type: missionTypes[getRandomNumber(0, missionTypes.length - 1)],
            urgency: urgencies[getRandomNumber(0, urgencies.length - 1)],
            active:active
        };

        return mission;
    }
    // METHODS
}

// const randomMission = Mission.generateRandomMission();
// console.log(randomMission);


    // WRITE
    export async function InsertMission(missionData) {
        try {
          const docRef = await addDoc(collection(db, "missions"), missionData);
          console.log("Mission added with ID: ", docRef.id);
          return docRef.id;
        } catch (error) {
          console.error("Error adding mission: ", error.stack);
          return '';
        }
    } 
    // WRITE 

    // READ
    export async function GetMissionById(missionId) {
        try {
          const docRef = doc(db, "missions", missionId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            return docSnap.data();
          } else {
            console.log("No such mission found!");
            return null;
          }
        } catch (error) {
          console.error("Error fetching mission: ", error.stack);
          return null;
        }
    }
    export async function getAllMissions() {
        const missionsRef = collection(db, 'missions'); 
        const missionsSnapshot = await getDocs(missionsRef); 
    
        const missionsArray = []; 
    
        missionsSnapshot.forEach(doc => {
            const mission = {
                mission: new Mission(doc.data()),
                id: doc.id
            };
            missionsArray.push(mission);
        });
    
        return missionsArray; // Return the array of Mission objects
    }
    export async function GetActiveMissionLocations() {
        try {
          const missionsRef = collection(db, "missions");
          // Create a query against the collection, filtering for active missions
          const q = queryFirestore(missionsRef, where("active", "==", true));
      
          const querySnapshot = await getDocs(q);
          let activeMissionsLocations = [];
      
          querySnapshot.forEach((doc) => {
            // Assuming each mission has a 'location' field stored as a GeoPoint
            const missionData = doc.data();
            if (missionData.location) {
              // Convert Firestore GeoPoint to a more usable object if necessary
              const location = { lat: missionData.location.latitude, lng: missionData.location.longitude };
              activeMissionsLocations.push({
                missionId: doc.id,
                location: location,
                // Include other mission details as needed
              });
            }
          });
      
          return activeMissionsLocations;
        } catch (error) {
          console.error("Error fetching active mission locations: ", error);
          return [];
        }
      }
    // READ

    async function checkIfMissionExists(missionId) {
        try {
          const missionRef = doc(db, "missions", missionId);
      
          const missionSnapshot = await getDoc(missionRef);
      
          return missionSnapshot.exists() === true ? true : false;
        } catch (error) {
          console.error("Error checking for mission existence: ", error.stack);
          return false; // Handle the error as appropriate for your application
        }
      }

    // UPDATE 
    export async function UpdateMission(missionId, updatedData) {
        try {
            if(! await checkIfMissionExists(missionId)) {
                return false;
            }
          const missionRef = doc(db, "missions", missionId);
          await updateDoc(missionRef, updatedData);
          console.log("Mission successfully updated");
          return true;
        } catch (error) {
          console.error("Error updating mission: ", error.stack);
          return false;
        }
    }
    // UPDATE 

    // DELETE
    export async function DeleteMission(missionId) {
        try {
            if(! await checkIfMissionExists(missionId)) {
                return false;
            }
          await deleteDoc(doc(db, "missions", missionId));
          console.log("Mission successfully deleted");
          return true;
        } catch (error) {
          console.error("Error deleting mission: ", error.stack);
          return false;
        }
    }
    // DELETE

    // Get random city location
    function getRandomLocation() {
        // Define the cities and their lat/long coordinates
        const cities = [
            { name: "Ottawa", coords: { lat: 45.4215, lng: -75.6972 } },
            { name: "New York", coords: { lat: 40.7128, lng: -74.0060 } },
            { name: "Montreal", coords: { lat: 45.5017, lng: -73.5673 } },
            { name: "Toronto", coords: { lat: 43.6532, lng: -79.3832 } },
            { name: "Ouagadougou", coords: { lat: 12.3714, lng: -1.5197 } },
            { name: "Kinshasa", coords: { lat: -4.4419, lng: 15.2663 } },
            { name: "New Delhi", coords: { lat: 28.6139, lng: 77.2090 } },
            { name: "Abidjan", coords: { lat: 5.3599, lng: -4.0083 } },
            { name: "Baghdad", coords: { lat: 33.3152, lng: 44.3661 } }
        ];
    
        // Randomly select a city
        const randomCity = cities[Math.floor(Math.random() * cities.length)];
    
        // Return the name and coordinates of the randomly selected city
        return randomCity;
    }
    
    // // Example usage:
    // const location = getRandomLocation();
    // console.log(`Randomly selected location: ${location.name} at latitude ${location.coords.lat} and longitude ${location.coords.lng}.`);
    
    // Get random city location

/*
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
    active: false
}


let missions = {
    sjldfslfds: mission,
    ldskfsdew: mission,
    dlskfskd: mission
}

*/

// MISSIONS
