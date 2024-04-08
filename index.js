import bodyParser from "body-parser";
import express, { query } from "express";
import { dirname } from "path";
import ejs from "ejs";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";
import { error, log } from "console";
import { initializeApp } from "firebase/app";
import { Timestamp, GeoPoint } from "firebase/firestore";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, doc, getFirestore, setDoc, getDocs, getDoc, documentId, query as queryFirestore, where } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { createServer } from "http";
import { Server } from "socket.io";

// MODELS IMPORT

import Drone from "./models/drones.js";
import { InsertDrone, deleteDrone, GetDroneById, UpdateDrone, getAllDrones } from "./models/drones.js";

import MissionReport from "./models/missions-report.js";
import { InsertMissionReport, GetMissionReportById, getAllMissionReports, UpdateMissionReport, DeleteMissionReport, MissionReportGenerator } from "./models/missions-report.js";

import Mission from "./models/missions.js";
import { InsertMission, GetMissionById, getAllMissions, UpdateMission, DeleteMission } from "./models/missions.js";

import Team from "./models/teams.js";
import { InsertTeam, GetTeamById, UpdateTeam, DeleteTeam, teamGenerator, getAllTeams } from "./models/teams.js";

import User from "./models/users.js";
import { InsertUser, GetUserById, DeleteUser, UpdateUser } from "./models/users.js";

// MODELS IMPORT

// let randomUser = User.generateRandomUser();
// console.log('random user: ', randomUser);

// let myTeam = teamGenerator();
// console.log('random Team :', myTeam);

// const randomMission = Mission.generateRandomMission();
// console.log('random Mission: ', randomMission);

// let randomMissionReport = MissionReportGenerator.generateRandomMissionReport();
// console.log('random Mission Report: ', randomMissionReport);

// let randomDrone = Drone.generateRandomDrone();
// console.log(`Random Drone obj : ${JSON.stringify(randomDrone, null, 2)}`);


const __dirname = dirname(fileURLToPath(import.meta.url));
const port = 3000;

// Firebase config 
const firebaseConfig = {
  apiKey: "AIzaSyA6Ds2kua4BEzekv2UxAIwGkN2T7wV4zcs",
  authDomain: "semi-autonomous-drone.firebaseapp.com",
  projectId: "semi-autonomous-drone",
  storageBucket: "semi-autonomous-drone.appspot.com",
  messagingSenderId: "878027561275",
  appId: "1:878027561275:web:2f23ba58a6cb0fcf9d3f1e",
  measurementId: "G-PBS9KJBEFB"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
// Firebase config 

const app = express();
const server = createServer(app); 
const io = new Server(server);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


server.listen(port, (req, res) => {
  console.log(`Listening on port : ${port}`);
});


// ---------------- ROUTES ---------------------

app.get("/", async (req, res) => {
  res.render("home.ejs");
});

// TEST MISSIONS REPORTS CRUD
app.get('/fake-mission-report', async (req, res) => {
  console.log('Inserting mission report into db');
  let randomMissionReport = MissionReportGenerator.generateRandomMissionReport();
  try {
    let docRef = await InsertMissionReport(randomMissionReport);
    console.log(`Doc ref : ${docRef}`);
    if(typeof docRef === 'string' && docRef.length > 0) {
      res.send('<h1>Mission Report inserted successfully with ID: ' + docRef + '</h1>');
      return;
    }
    res.send('<h1>Mission Report failed to insert!</h1>');
    return;
  } catch (error) {
    res.send('<h1>Mission Report failed to insert!</h1>');
    return;
  }
});

app.get('/read-fake-mission-report', async (req, res) => {
  let reportId = '0qyVt6xmAxWgOfi5egvQ'; // Use a real mission report ID here
  try {
    let missionReportData = await GetMissionReportById(reportId);
    if (missionReportData) {
      console.log(`Mission Report Data: ${JSON.stringify(missionReportData, null, 2)}`);
      res.send('<h1>Mission Report Read successfully</h1>');
    } else {
      res.send('<h1>Mission Report not found!</h1>');
    }
  } catch (error) {
    res.send('<h1>Error reading Mission Report</h1>');
  }
});

app.get('/update-fake-mission-report', async (req, res) => {
  let reportId = 'ntTg49t4u4qtLaBsdkg6';
  let updateData = MissionReportGenerator.generateRandomMissionReport();
  updateData.logs.push('Crash FAILURE');
  try {
    let didUpdateWork = await UpdateMissionReport(reportId, updateData);
    if(didUpdateWork) {
      res.send('<h1>Mission Report updated successfully</h1>');
      return;
    }
    res.send('<h1>Error updating Mission Report</h1>');
    return;
  } catch (error) {
    res.send('<h1>Error updating Mission Report</h1>');
  }
});

app.get('/delete-fake-mission-report', async (req, res) => {
  let reportId = 'ntTg49t4u4qtLaBsdkg6'; // Use a real mission report ID here
  try {
    let didDeletewWork = await DeleteMissionReport(reportId);
    if(didDeletewWork) {
      res.send('<h1>Mission Report deleted successfully</h1>');
      return;
    }
    res.send('<h1>Error deleting Mission Report</h1>');
    return;
  } catch (error) {
    res.send('<h1>Error deleting Mission Report</h1>');
  }
});
// TEST MISSIONS REPORTS CRUD

// TEST DRONES CRUD

app.get('/fake-drone', async(req, res) => {
  console.log(`Inserting drone into db`);
  let randomDrone = Drone.generateRandomDrone();
  let newDrone = await InsertDrone(randomDrone);
  if(typeof newDrone === 'string' && newDrone.length > 0) {
    res.send('<h1>Drone inserted successfully</h1>');
    return;
  }
  res.send('<h1>Drone failed to insert!</h1>');
  res.redirect('/');
  return;

}); 

app.get('/read-fake-drone', async(req, res) => {
  let droneId = 'PBn21gHNDnnzoGdJYou5';
  let drone = await GetDroneById(droneId);
  let droneObj = new Drone(drone);
  console.log(`Drone Altitude : ${JSON.stringify(droneObj.flightLocation, null, 2)}`);
  if(drone !== null) {
    res.send(`
    <h1>Drone Read successfully</h1>
    `);
    return;
  }
  res.send('<h1>Drone failed to read!</h1>');
  return;
}); 



app.get('/update-fake-drone', async(req, res) => {
  console.log(`Reading drone with id: `);
  let droneId = 'PBn21gHNDnnzoGdJYou5';
  let newDrone = Drone.generateRandomDrone();
  newDrone.identification.pilot.name = 'Updated Pilot Name';
  let didUpdateWork = await UpdateDrone(droneId, newDrone);
  if(didUpdateWork) {
    res.send(`
    <h1>Drone Update worked, updateValue : ${didUpdateWork}</h1>`);
    console.log(`Drone data: ${JSON.stringify(newDrone, null, 2)}`);
    console.log(`Drone boolean: ${JSON.stringify(didUpdateWork, null, 2)}`);

    return;
  }
  res.send('<h1>Drone failed to update!</h1>');
  res.redirect('/');
  return;
}); 

app.get('/delete-fake-drone', async(req, res) => {
  let droneId = 'HyLm3qX5NhxsfN9eotWO';
  let didDeletewWork = await deleteDrone(droneId);
  if(didDeletewWork) {
    res.send(`
    <h1>Drone delete worked, deleteFlag : ${didDeletewWork}</h1>`);
    return;
  }
  res.send('<h1>Drone failed to delete!</h1>');
  return;
}); 

// TEST DRONES CRUD

// TEST MISSIONS CRUD
app.get('/fake-mission', async (req, res) => {
  console.log('Inserting mission into db');
  let randomMission = Mission.generateRandomMission();
  try {
    let docRef = await InsertMission(randomMission);
    if(typeof docRef === 'string' && docRef.length > 0) {
      console.log(`Mission inserted with ID: ${docRef}`);
      res.send(`<h1>Mission inserted Successfully! ID: ${docRef}</h1>`);
      return;
    }
    res.send('<h1>Mission failed to insert!</h1>');
    return;
  } catch (error) {
    console.error('Error inserting mission: ', error);
    res.send('<h1>Mission failed to insert!</h1>');
  }
});

app.get('/read-fake-mission', async (req, res) => {
  let missionId = 'wzXY0f3XzxZa4nN3rwZ5'; // Use a real mission ID here
  try {
    let missionData = await GetMissionById(missionId);
    if (missionData) {
      console.log(`Mission data: ${JSON.stringify(missionData, null, 2)}`);
      res.send('<h1>Mission read successfully</h1>');
      return;
    } else {
      res.send('<h1>Mission not found!</h1>');
      return;
    }
  } catch (error) {
    console.error('Error reading mission: ', error);
    res.send('<h1>Error reading mission</h1>');
    return;
  }
});

app.get('/update-fake-mission', async (req, res) => {
  let missionId = 'wzXY0f3XzxZa4nN3rwZ5';
  let newMissionData = Mission.generateRandomMission();
  newMissionData.type = 'Updated Type';
  try {
    let didUpdateWork = await UpdateMission(missionId, newMissionData);
    if(didUpdateWork) {
      console.log(`Mission updated with data: ${JSON.stringify(newMissionData, null, 2)}`);
      res.send('<h1>Mission updated successfully</h1>');
      return;
    }
    res.send('<h1>Mission failed to update!</h1>');
    return;
  } catch (error) {
    res.send('<h1>Mission failed to update!</h1>');
    console.error('Error updating mission: ', error);
    return;
  }
});

app.get('/delete-fake-mission', async (req, res) => {
  let missionId = 'B3qtZ1aSHkeLNWYS3GAm';
  try {
    let didDeletewWork = await DeleteMission(missionId);
    if(didDeletewWork) {
      console.log('Mission deleted successfully');
      res.send('<h1>Mission deleted successfully</h1>');
      return;
    }
    console.error('Error deleting mission: ', error);
    res.send('<h1>Mission failed to delete!</h1>');
    return;
  } catch (error) {
    console.error('Error deleting mission: ', error);
    res.send('<h1>Mission failed to delete!</h1>');
    return;
  }
});

// TEST MISSIONS CRUD

// TEST TEAMS CRUD
app.get('/fake-team', async (req, res) => {
  console.log('Inserting team into db');
  let randomTeam = teamGenerator();
  try {
    let docRef = await InsertTeam(randomTeam);
    if(typeof docRef === 'string' && docRef.length > 0) {
      res.send(`<h1>Team inserted with ID: ${docRef}</h1>`)
      return;
    }

    res.send('<h1>Team failed to insert!</h1>');
    return;
  } catch (error) {
    console.error('Error inserting team: ', error.stack);
    res.send('<h1>Team failed to insert!</h1>');
  }
});

// Read a Team by ID
app.get('/read-fake-team', async (req, res) => {
  let teamId = 'sr0wCBMyyEXcLobGisj8'; // Replace with a real team ID
  try {
    let teamData = await GetTeamById(teamId);
    if (teamData !== null) {
      console.log(`Team data: ${JSON.stringify(teamData, null, 2)}`);
      res.send('<h1>Team read successfully</h1>');
    } else {
      res.send('<h1>Team not found!</h1>');
      return;
    }
  } catch (error) {
    console.error('Error reading team: ', error.stack);
    res.send('<h1>Error reading team</h1>');
    return;
  }
});

// Update a Team by ID
app.get('/update-fake-team', async (req, res) => {
  let teamId = 'sr0wCBMyyEXcLobGisj8'; // Replace with a real team ID
  let updatedTeamData = teamGenerator();
  updatedTeamData.members[0].name = 'update member name';
  try {
    let updateResult = await UpdateTeam(teamId, updatedTeamData);
    if (updateResult) {
      console.log(`Team updated successfully for ID: ${teamId}`);
      res.send('<h1>Team updated successfully</h1>');
      return;
    } else {
      res.send('<h1>Team failed to update!</h1>');
      return;
    }
  } catch (error) {
    console.error('Error updating team: ', error.stack);
    res.send('<h1>Team failed to update!</h1>');
    return;
  }
});

// Delete a Team by ID
app.get('/delete-fake-team', async (req, res) => {
  let teamId = 'sr0wCBMyyEXcLobGisj8'; // Replace with a real team ID
  try {
    let deleteResult = await DeleteTeam(teamId);
    if (deleteResult) {
      res.send('<h1>Team deleted successfully</h1>');
      return;
    } else {
      res.send('<h1>Team failed to delete!</h1>');
      return;
    }
  } catch (error) {
    console.error('Error deleting team: ', error.stack);
    res.send('<h1>Team failed to delete!</h1>');
    return;
  }
});

// TEST TEAMS CRUD

// TEST USERS CRUD
// Insert a random User into the database
app.get('/fake-user', async (req, res) => {
  console.log('Inserting user into db');
  // You need to define the `generateRandomUser` function or replace it with actual data
  let randomUser = User.generateRandomUser();
  try {
    let docRef = await InsertUser(randomUser);
    res.send(`<h1>User inserted with ID: ${docRef}</h1>`);
  } catch (error) {
    console.error('Error inserting user: ', error);
    res.send('<h1>User failed to insert!</h1>');
  }
});

// Read a User by ID
app.get('/read-fake-user', async (req, res) => {
  let userId = '2odjH8peFdwkCzlLBXU0'; // Replace with a real user ID
  try {
    let userData = await GetUserById(userId);
    if (userData) {
      console.log(`User data: ${JSON.stringify(userData, null, 2)}`);
      res.send('<h1>User read successfully</h1>');
    } else {
      res.send('<h1>User not found!</h1>');
    }
  } catch (error) {
    console.error('Error reading user: ', error);
    res.send('<h1>Error reading user</h1>');
  }
});

// Update a User by ID
app.get('/update-fake-user', async (req, res) => {
  let userId = '2odjH8peFdwkCzlLBXU0'; // Replace with a real user ID
  let newUserData = User.generateRandomUser();
  newUserData.firstName = 'modified uSer First NaMe';
  try {
    let didUpdateWork = await UpdateUser(userId, newUserData);
    if (didUpdateWork) {
      console.log(`User updated successfully for ID: ${userId}`);
      res.send('<h1>User updated successfully</h1>');
    } else {
      res.send('<h1>User does not exist!</h1>');
    }
  } catch (error) {
    console.error('Error updating user: ', error.stack);
    res.send('<h1>User failed to update!</h1>');
  }
});

// Delete a User by ID
app.get('/delete-fake-user', async (req, res) => {
  let userId = '2odjH8peFdwkCzlLBXU0'; // Replace with a real user ID
  try {
    let didDeleteWork = await DeleteUser(userId);
    if (didDeleteWork) {
      console.log('User deleted successfully');
      res.send('<h1>User deleted successfully</h1>');
    } else {
      res.send('<h1>User does not exist!</h1>');
    }
  } catch (error) {
    console.error('Error deleting user: ', error);
    res.send('<h1>User failed to delete!</h1>');
  }
});
// TEST USERS CRUD


app.get("/login", async (req, res) => {
  res.render("login.ejs");
});

app.get("/register", async (req, res) => {
  res.render("register.ejs");
});

app.post('/login', async(req, res) => {

  let email = (req.body.email).toLowerCase();
  let pwd = req.body.pwd;

  let loginData = {
    email:email,
    pwd:pwd
  };

  let user = await loginAppUser(loginData);
  
  if(user === 'error') {
    res.redirect('/login?failed');
    return;
  }

  res.send("<h1>Welcome!</h1>");
  return
});

app.get('/view-reports', async (req, res) => {
  const reports = await getAllMissionReports();
  let randomUser = new User(User.generateRandomUser());
  currentReportsData = reports;
  currentUserData = randomUser;

  console.log(`all reports ${JSON.stringify(reports, null, 2)}`);
  console.log(`User object type: ${randomUser.firstName}` );

  res.render('select-report.ejs', {
    reports: reports,
    user: currentUserData
  });
});

app.get('/report', async (req, res) => {

  let reportId = parseInt(req.query.id); // Get report ID from the query string
  reportId = reportId === -1 ? currentSelectedReportIndex === -1 ? -1 : currentSelectedReportIndex : reportId;

  console.log(`Report id ${reportId}`);
  if(reportId === -1) {
      res.redirect('/view-report?error'); // Redirect if no valid report ID is found
      return;
  }

  // Fetch the selected report data based on reportId
  currentSelectedReportData = currentReportsData[reportId];
  currentSelectedReportIndex = reportId;

  // Assuming the mission report data includes ids for the drone, team, and mission
  let droneId = currentSelectedReportData.report.droneId;
  let teamId = currentSelectedReportData.report.teamId;
  let missionId = currentSelectedReportData.report.missionId;

  console.log(`current report data: ${JSON.stringify(currentSelectedReportData.report, null, 2)}`);

  console.log(`team id: ${teamId}`);
  console.log(`droneId id: ${droneId}`);
  console.log(`mission id: ${missionId}`);

  // Fetch related data based on the ids
  currentSelectedDroneData = new Drone(await GetDroneById(droneId));
  currentSelectedTeamData = new Team(await GetTeamById(teamId));
  currentSelectedMissionData = new Mission(await GetMissionById(missionId));

  // console.log(`Selected report: ${JSON.stringify(currentSelectedReportData.missionReport, null, 2)}`);
  res.render('report-view.ejs', {
      report: currentSelectedReportData.report,
      drone: currentSelectedDroneData,
      team: currentSelectedTeamData,
      mission: currentSelectedMissionData,
      user: currentUserData,
      id: currentSelectedReportIndex
  });

});

app.get('/view-missions', async (req, res) => {
  const missions = await getAllMissions();
  let randomUser = new User(User.generateRandomUser());
  
  currentMissionsData = missions;
  currentUserData = randomUser;

  console.log(`all missions ${JSON.stringify(missions, null, 2)}`);
  console.log(`User object type: ${randomUser.firstName}` );
  res.render('select-mission.ejs', {
    missions: missions,
    user: currentUserData
  });
});


app.get('/view-drone', async(req, res) => {
  let drones = await getAllDrones();
  let randomUser = new User(User.generateRandomUser());
  currentDronesData = drones;
  currentUserData = randomUser;
  console.log(`all drones ${JSON.stringify(drones, null, 2)}`);
  console.log(`User object type: ${randomUser.firstName}` );
  res.render('select-drone.ejs', {
    drones:drones,
    user: randomUser
  });
});

app.get('/drone', async(req, res) => {
  
  let droneId = parseInt(req.query.id);
  droneId = droneId === -1 ? currentSelectedDroneIndex === -1 ? -1 : currentSelectedDroneIndex : droneId;
  console.log(`drone id ${droneId}`);
  if(droneId === -1) {
    res.redirect('/viewDrone?error');
    return;
  }

  currentSelectedDroneData = currentDronesData[droneId];
  currentSelectedDroneIndex = droneId;
  console.log(`selected drone: ${JSON.stringify(currentSelectedDroneData.drone, null, 2)}`);
  res.render('drone-view.ejs', {
    drone: currentSelectedDroneData.drone,
    user : currentUserData,
    id: currentSelectedDroneIndex
  });
});

// good
app.get('/mission', async(req, res) => {
  
  let missionId = parseInt(req.query.id);
  missionId = missionId === -1 ? currentSelectedMissionIndex === -1 ? -1 : currentSelectedMissionIndex : missionId;
  
  console.log(`Mission id ${missionId}`);
  if(missionId === -1) {
    res.redirect('/viewMission?error');
    return;
  }

  currentSelectedMissionData = currentMissionsData[missionId];
  currentSelectedMissionIndex = missionId;
  currentSelectedDroneData = new Drone(await GetDroneById(currentSelectedMissionData.mission.droneId));
  currentSelectedTeamData = new Team(await GetTeamById(currentSelectedMissionData.mission.teamId));

  res.render('mission-view.ejs', {
    mission: currentSelectedMissionData.mission,
    drone: currentSelectedDroneData,
    team:currentSelectedTeamData,
    user: currentUserData,
    id: currentSelectedMissionIndex
  });

});

app.get('/update-mission', async(req, res) => {

  let drones = await getAllDrones();
  currentDronesData = drones;

  let teams = await getAllTeams();
  currentTeamsData = teams;

  res.render('mission-edit.ejs',
  {
    mission: currentSelectedMissionData,
    drones: drones,
    teams:teams,
    user: currentUserData,
    id: 2
  });

});

app.post('/update-mission', async (req, res) => {

  let droneId = parseInt(req.body.droneArrIndex.trim());
  let teamId = parseInt(req.body.teamArrIndex.trim());
  let droneDbId = req.body.droneId;
  let teamDbId = req.body.teamId.trim();
  let missionUrgency = req.body.missionUrgency.trim();
  let missionType = req.body.missionType.trim();
  let missionActive = req.body.missionActive.trim() === 'true';

  // Parse indexes to integers
  let missionSelectedDroneIndex = parseInt(droneId, 10);
  let missionSelectedTeamIndex = parseInt(teamId, 10);

  let missionId = currentMissionsData[currentSelectedMissionIndex].id; 

  const updateData = {
    droneId: droneDbId,
    teamId: teamDbId,
    type: missionType,
    urgency: missionUrgency,
    active: missionActive
  };

  console.log(`Update data: ${JSON.stringify(updateData, null, 2)}`);

  try {
    // Update the mission document in Firestore
    let didUpdateWork = await UpdateMission(missionId, updateData);
    if (didUpdateWork) {
      // Update the mission document in the server's memory (if applicable)
      currentMissionsData[currentSelectedMissionIndex].mission.drone = currentDronesData[droneId].drone;
      currentMissionsData[currentSelectedMissionIndex].mission.team = currentTeamsData[teamId].team;
      currentMissionsData[currentSelectedMissionIndex].mission.type = missionType;
      currentMissionsData[currentSelectedMissionIndex].mission.urgency = missionUrgency;
      currentMissionsData[currentSelectedMissionIndex].mission.active = missionActive;
      currentMissionsData[currentSelectedMissionIndex].mission.teamId = teamDbId;
      currentMissionsData[currentSelectedMissionIndex].mission.droneId = droneDbId;
      currentSelectedMissionData = currentMissionsData[currentSelectedMissionIndex];

      res.redirect(`/mission?id=${currentSelectedMissionIndex}`); // Redirect to the updated mission view
    } else {
      throw new Error('Update failed');
    }
  } catch (error) {
    console.error('Error updating mission: ', error);
    res.redirect(`/mission?updateFailed&id=${currentSelectedMissionIndex}`); // Redirect with an error flag if update failed
  }
});



app.get('/edit-drone-id', async(req, res) => {

  res.render('drone-edit-id.ejs', {
    drone: currentSelectedDroneData.drone,
    user : currentUserData,
    id: currentSelectedDroneIndex
  });
});

app.post('/update-drone-id', async(req, res) => {

  let droneName = (req.body.droneName).trim();
  let pilotName = (req.body.pilotName).trim();
  let pilotId = (req.body.pilotId).trim();
  let serialNumber = (req.body.serialNumber).trim();

  // Construct an update object manually
  const updateData = {
    identification: {
      name: droneName,
      pilot:{
        name: pilotName,
        userId: pilotId
      },
      serialNumber: {value: serialNumber}
    }
  };

  console.log(`update data: ${JSON.stringify(updateData, null, 2)}`);

  let droneDocumentId = currentDronesData[currentSelectedDroneIndex].id;
  console.log(`Drone selected id: ${currentSelectedDroneIndex}`);

  let didUpdateWork = await UpdateDrone(droneDocumentId, updateData);
  
  if(didUpdateWork) {
    // current selected drone
    currentSelectedDroneData.drone.droneName = droneName;
    currentSelectedDroneData.drone.pilotName = pilotName;
    currentSelectedDroneData.drone.pilotId = pilotId;
    currentSelectedDroneData.drone.serialNumber = serialNumber;

    // current drones data
    currentDronesData[currentSelectedDroneIndex].drone.droneName = droneName;
    currentDronesData[currentSelectedDroneIndex].drone.pilotName = pilotName;
    currentDronesData[currentSelectedDroneIndex].drone.pilotId = pilotId;
    currentDronesData[currentSelectedDroneIndex].drone.serialNumber = serialNumber;
    
    res.redirect(`/drone?id=${currentSelectedDroneIndex}`);
    return;
  }
  res.redirect('/drone?updateFailed');
  return;
});

app.get('/edit-drone-cargo', async(req, res) => {

  res.render('drone-edit-cargo.ejs', {
    drone: currentSelectedDroneData.drone,
    user : currentUserData,
    id: currentSelectedDroneIndex
  });
});

app.post('/update-drone-cargo', async (req, res) => {

  let itemName = req.body.itemName.trim();
  let itemWidth = parseInt(req.body.itemWidth, 10);
  let itemHeight = parseInt(req.body.itemHeight, 10);
  let itemLength = parseInt(req.body.itemLength, 10);
  let itemWeight = parseFloat(req.body.itemWeight);
  let itemDescription = req.body.itemDescription.trim();

  let cargo = {
    dimensions: {
      width: itemWidth,
      height: itemHeight,
      length: itemLength
    },
    item: itemName,
    description: itemDescription,
    weight: itemWeight
  };

  const updateData = {
    payload: {
      cargo: cargo
    }
  };

  console.log(`Update data: ${JSON.stringify(updateData, null, 2)}`);

  let droneDocumentId = currentDronesData[currentSelectedDroneIndex].id;
  console.log(`Drone selected id: ${currentSelectedDroneIndex}`);

  try {
    let didUpdateWork = await UpdateDrone(droneDocumentId, updateData);
    if (didUpdateWork) {
      currentSelectedDroneData.cargo = cargo;
      currentDronesData[currentSelectedDroneIndex].drone.cargo = cargo;
      res.redirect(`/drone?id=${currentSelectedDroneIndex}`);
    } else {
      throw new Error('Update failed');
    }
  } catch (error) {
    console.error('Error updating drone: ', error);
    res.redirect('/drone?updateFailed');
  }

});

app.post('/register', async(req, res) => {

  let email = (req.body.email).toLowerCase();
  let pwd = req.body.pwd;
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let code = req.body.code;
  let userData = {
    firstName:firstName,
    lastName:lastName,
    email:email,
    pwd:pwd
  };

  if(!doesCodeExists(code)) {
    res.redirect('/register?incorrectCode');
    return;
  } 
  if(doesEmailExists(email)) {
    res.redirect('/register?emailExists');
    return;
  }

  let user = await registerUser(userData);

  console.log(`user : ${user}`);
  
  if (user === 'error') {
    res.redirect('/register?incorrectCode');
    return;
  }

  console.log(`User successfully registered!`);
  res.redirect('/');
});


// ---------------- ROUTES ---------------------


// ---------------- SOCKET ---------------------

io.on('connection', function(socket){
  console.log('User connected');

  socket.on('disconnect', function() {
    console.log('User disconnected');
  });
});

// ---------------- SOCKET ---------------------


// **************** METHODS ****************

async function doesEmailExists(email) {
  try {
      const queryEmailExist = queryFirestore(collection(db, 'users'), where('email', '==', email));
      const snapshots = await getDocs(queryEmailExist);
      if(snapshots.docs.length > 0 ){
        console.log(`Email exists`);
        return true;
      }
      console.log(`Email does not exist`);
      return false;
  } catch (error) {
    console.error(`Error while querying firebase users`);
  }
}

function simulateMission() {
  
}

async function loginAppUser(loginData) {
  signInWithEmailAndPassword(auth, (loginData.email).toLowerCase(), loginData.pwd)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(`User logged successfully!`);
      return user.uid;
    })
    .catch((error) => {
      console.log(`Error while login user: ${error.stack}`);
      return 'error';
    });
}


async function registerUser(userData) {

  createUserWithEmailAndPassword(auth, userData.email, userData.pwd)
    .then( async (userCredential) => {
      const user = userCredential.user;
      let userUId = user.uid;
      let newUser = {
        firstName:userData.firstName,
        lastName:userData.lastName,
        email:userData.email
      };
      const document = await setDoc(doc(db, "users", userUId), newUser);
      console.log(`User registered!`);
      return userUId;

    })
    .catch((error) => {
      console.error(`Error while Creating user with fireauth ${error.stack}`);
      return 'error';
    });

}

async function doesCodeExists(code) {
  
  try {
    const snapshots = await getDocs(collection(db, 'codes'));
    for(let snapshot of snapshots.docs) {
      let snapshotCode = snapshot.data().code;
      let userId = snapshot.data().userId;
      if(snapshotCode === code) {
        console.log(`Code is correct`);
        return userId; 
      }
    }

    console.log(`Code is incorrect`);
    return '';

    // console.log('User creating successfully, ID: ', document.id);
  } catch (error) {
    console.error('Error while creating user: ', error.stack);
  }
  
}

function generateCode() {
  let code = uuidv4();
  let userId = uuidv4();
  console.log(`Code : ${code}`);
  console.log(`UserId : ${userId}`);
  return {code:code, userId:userId};
}

// **************** METHODS ****************

// __________________ DATA _________________

// DRONES
let currentDronesData = [];
let currentSelectedDroneData = {};
let currentSelectedDroneIndex = -1;
// DRONES

// MISSIONS
let currentMissionsData = [];
let currentSelectedMissionData = {};
let currentSelectedMissionIndex = -1;
// MISSIONS

// MISSIONS reports
let currentReportsData = [];
let currentSelectedReportData = {};
let currentSelectedReportIndex = -1;
// MISSIONS

// TEAMS
let currentTeamsData = [];
let currentSelectedTeamData = {};
let currentSelectedTeamIndex = -1;
// TEAMS

// USERS
let currentUserData = {};
// USERS

// __________________ DATA _________________    




