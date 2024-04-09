import { db } from "./db-config.js";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, doc, getFirestore, setDoc, getDocs, getDoc, updateDoc, deleteDoc, documentId, query as queryFirestore, where } from 'firebase/firestore';
import { GeoPoint, Timestamp } from "firebase/firestore";


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
    set teamName(value) {
      this._name = value;
    }

    addMember(newMember) {
        this._members.push(newMember);
    }

    getMemberStartedAtString(member) {
      if(!member || !member.startedAt) {
        return 'Unknown';
      }
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      let memberStartedAt = new Date(member.startedAt.seconds * 1000);
      return `${monthNames[memberStartedAt.getMonth()]} ${memberStartedAt.getFullYear()}`;
    }

    removeMember(memberId) {
        this._members = this._members.filter(member => member.id !== memberId);
    }

    get teamLeader() {
        const leader = this._members.find(member => member.leader === true);
        return leader || null; 
    }
    get leaderName() {
        const leader = this._members.find(member => member.leader === true);
        return leader.name || ''; 
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
// let myTeam = new Team(teamGenerator());
// console.log(myTeam);

// console.log(`team leader name: ${JSON.stringify(myTeam.leaderName)}`);


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

    export async function getAllTeams() {
      const teamsRef = collection(db, 'teams'); 
      const teamsSnapshot = await getDocs(teamsRef);
  
      const teamsArray = []; 
  
      teamsSnapshot.forEach(doc => {
          const team = {
              team: new Team(doc.data()), 
              id: doc.id 
          };
          teamsArray.push(team);
      });
  
      return teamsArray; 
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

    export function createMembersFromFormData(formData) {
      let tempMembers = {};
      let leaderFlags = {};
      let currentDate = new Date();
  
      // Loop through each property in the formData
      for (let key in formData) {
          if (formData.hasOwnProperty(key)) {
              // Extract the member index and type (name, role, leader) from the key
              let match = key.match(/member(Name|Role|Leader|StartedAt|Id)(\d+)/);
              if (match) {
                  let type = match[1];
                  let index = parseInt(match[2], 10);
  
                  // Initialize the member object at the correct index if it doesn't exist
                  if (!tempMembers[index]) tempMembers[index] = {};
  
                  if (type === 'Name') {
                      tempMembers[index].name = formData[key];
                  } else if (type === 'Role') {
                      tempMembers[index].role = formData[key];
                  } else if (type === 'Leader') {
                      // Directly assign the leader flag
                      tempMembers[index].leader = true;
                  } else if (type === 'StartedAt') {

                    if (parseInt(formData[key]) === 0 || !formData[key]) {
                      tempMembers[index].startedAt = Timestamp.fromDate(currentDate);
                    } else {
                        tempMembers[index].startedAt = Timestamp.fromDate(new Date(parseInt(formData[key])));
                    }
                    
                  } else if (type === 'Id') {
                    tempMembers[index].id = formData[key];
                  }
              }
          }
      }
  
      // Convert tempMembers object to array
      let team = { members: [] };
      for (let index in tempMembers) {
          if (tempMembers.hasOwnProperty(index)) {
              team.members.push(tempMembers[index]);
          }
      }
  
      // Ensure all members have a leader flag set to false if not already true
      team.members = team.members.map(member => ({
          ...member,
          leader: member.leader || false
      }));
  
      return team.members;
    }
  
  // // Example usage:
  // const formData = {
  //   "memberName1": "Member 2",
  //   "memberRole1": "Police",
  //   "memberStartedAt1": '1712637896666',
  //   "memberId1": 'M-AF89',
  //   "memberName2": "Member 3",
  //   "memberRole2": "Medic Rescue",
  //   "memberStartedAt2": '1712637896670',
  //   "memberId2": 'M-PF924',
  //   "memberName4": "Member 5",
  //   "memberRole4": "Police",
  //   "memberLeader4": "on",
  //   "memberStartedAt4": '1712637896680',
  //   "memberId4": 'M-ZS9242',
  //   "memberName5": "Member 6",
  //   "memberRole5": "Firefighter",
  //   "memberStartedAt5": '1712637896690',
  //   "memberId5": 'M-RE029',
  // };

  // let formData = {
  //   "memberName0": "Rosie",
  //   "memberRole0": "Firefighter",
  //   "memberId0": "M-TY922",
  //   "memberStartedAt0": "1711950584000",
  //   "memberName1": "Mallory",
  //   "memberRole1": "Onsite Operationer",
  //   "memberId1": "M-TY922",
  //   "memberStartedAt1": "1711947188000",
  //   "memberName2": "Romaric",
  //   "memberRole2": "Police",
  //   "memberId2": "M-TY922",
  //   "memberStartedAt2": "1711944000000",
  //   "memberName3": "Dalila",
  //   "memberRole3": "Medic Rescue",
  //   "memberId3": "M-TY922",
  //   "memberStartedAt3": "1712033622000",
  //   "memberName4": "Abdoul",
  //   "memberRole4": "Rescue Agent",
  //   "memberId4": "M-TY922",
  //   "memberStartedAt4": "1712116800000",
  //   "memberName5": "King",
  //   "memberRole5": "Operational director",
  //   "memberLeader5": "on",
  //   "memberId5": "M-TY922",
  //   "memberStartedAt5": "1712040743000",
  //   "memberName6": "Poda",
  //   "memberRole6": "Disaster Operationer",
  //   "memberId6": "M-TY922",
  //   "memberStartedAt6": "1712037166000",
  //   "memberName7": "Aziz",
  //   "memberRole7": "Assistant",
  //   "memberId7": "",
  //   "memberStartedAt7": "0",
  //   "memberName8": "Farid",
  //   "memberRole8": "Assistant",
  //   "memberId8": "",
  //   "memberStartedAt8": "0"
  // }
  
  // let team = createMembersFromFormData(formData);
  // console.log(team);

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
