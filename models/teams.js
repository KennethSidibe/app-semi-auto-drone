import { db } from "./db-config.js";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, doc, getFirestore, setDoc, getDocs, getDoc, updateDoc, deleteDoc, documentId, query as queryFirestore, where } from 'firebase/firestore';
import { GeoPoint } from "firebase/firestore";


// TEAMS

export default class Team {
    constructor(teamData) {
        this._members = teamData.members;
        this._name = teamData.name;
    }

    // --------------- GETTERS

    get members() {
        return this._members;
    }

    get name() {
        return this._name;
    }

    // --------------- SETTERS

    set members(value) {
        this._members = value;
    }

    set name(value) {
        this._name = value;
    }


    addMember(newMember) {
        this._members.push(newMember);
    }

    removeMember(memberId) {
        this._members = this._members.filter(member => member.id !== memberId);
    }

    get teamLeader() {
        const leader = this._members.find(member => member.leader === true);
        return leader || null; 
    }
    get teamName() {
      return this._name
    }
    set teamLeader(memberId) {
        this._members.forEach(member => {
            if (member.id === memberId) {
                member.leader = true;
            } else {
                member.leader = false;
            }
        });
    }

}

export function teamGenerator() {

  const roles = ['Onsite Operationer', 'Rescue Agent', 'Disaster Operationer', 'Firefighter', 'Police', 'Medic Rescue'];
  const teamNames = ['Quest', 'Giants', 'Squad', 'Alpha', 'Peak'];
  const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  const getRandomTeamName = () => teamNames[getRandomNumber(0, teamNames.length - 1)];
  const getRandomRole = () => roles[getRandomNumber(0, roles.length - 1)];
  const teamSize = getRandomNumber(5, 10);
  
  let members = [];
  for (let i = 0; i < teamSize; i++) {
      members.push({
          id: `M-${getRandomNumber(1000, 9999)}`,
          leader: false, // Initially set all members as non-leaders
          name: `Member ${i + 1}`,
          role: getRandomRole(),
          startedAt: new Date(),
      });
  }

  // Randomly choose one member to be the leader
  const leaderIndex = getRandomNumber(0, teamSize - 1);
  members[leaderIndex].leader = true;

  const team = {
      name: getRandomTeamName(),
      members
  };

  return team;
}

// Example usage
// let myTeam = teamGenerator("Alpha Squad");
// console.log(myTeam);


    // WRITE
    export async function InsertTeam(teamData) {
        try {
          const docRef = await addDoc(collection(db, "teams"), teamData);
          console.log("Team added with ID: ", docRef.id);
          return docRef.id;
        } catch (error) {
          console.error("Error adding team: ", error.stack);
          return '';
        }
      }
    // WRITE
    
    // READ
    export async function GetTeamById(teamId) {
        try {
          const docRef = doc(db, "teams", teamId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            return docSnap.data();
          } else {
            console.log("No such team found!");
            return null;
          }
        } catch (error) {
          console.error("Error fetching team: ", error.stack);
          return null;
        }
    }
    // READ

    async function checkIfTeamExists(teamId) {
      const teamRef = doc(db, "teams", teamId);
      try {
        const teamSnap = await getDoc(teamRef);
        return teamSnap.exists();
      } catch (error) {
        console.error("Error checking team existence: ", error);
        throw error; // Or handle the error as needed for your application logic
      }
    }

    // UPDATE
    export async function UpdateTeam(teamId, updatedData) {
        try {
          if(! await checkIfTeamExists(teamId)) {
            console.log(`Team does not exist`);
            return false;
          }
          const teamRef = doc(db, "teams", teamId);
          await updateDoc(teamRef, updatedData);
          console.log("Team successfully updated");
          return true;
        } catch (error) {
          console.error("Error updating team: ", error.stack);
          return false;
        }
    }
    // UPDATE

    // DELETE
    export async function DeleteTeam(teamId) {
        try {
          if(! await checkIfTeamExists(teamId)) {
            console.log(`Team does not exist`);
            return false;
          }
          await deleteDoc(doc(db, "teams", teamId));
          console.log("Team successfully deleted");
          return true;
        } catch (error) {
          console.error("Error deleting team: ", error.stack);
          return false;
        }
    }
    // DELETE

/*

let teamObj = {
    members: [
        {
            id : '',
            leader: false,
            name : '',
            role: '',
            startedAt : ''
        }
    ],
    name: ''
}

let teams = {
    skdfjslkds: teamObj,
    dsjhfsdfsd: teamObj
}

*/

// TEAMS
