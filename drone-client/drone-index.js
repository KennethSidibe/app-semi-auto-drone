import bodyParser from "body-parser";
import express, { query } from "express";
import { dirname } from "path";
import ejs from "ejs";
import { fileURLToPath } from "url";
import { io as clientIO } from "socket.io-client";
import fs from 'fs';
import { createReadStream } from 'fs';
import bcrypt from "bcrypt";
import { exec } from 'child_process';
import { error, log } from "console";
import { initializeApp } from "firebase/app";
import { Timestamp, GeoPoint } from "firebase/firestore";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, doc, getFirestore, setDoc, getDocs, getDoc, documentId, query as queryFirestore, where } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { createServer } from "http";
import { Server } from "socket.io";

const __dirname = dirname(fileURLToPath(import.meta.url));
const port = 3200;

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
const socket = clientIO('http://localhost:3000');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


server.listen(port, (req, res) => {
  console.log(`Listening on port : ${port}`);
});


// ---------------- ROUTES ---------------------

app.get('/live-drone', async(req, res) => {
  res.render('home-drone.ejs');
});

// ---------------- ROUTES ---------------------


// ---------------- SOCKET ---------------------

const filePath = 'lidarReading.txt';

// ---------------- SOCKET ---------------------


// **************** METHODS ****************

function armDroneWithScript() {

exec('python3 drone-client/drone-arm-script.py', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
});

}

function unArmDroneWithScript() {

    exec('python3 drone-client/unarm-drone-script.py', (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
    });
    
}

function reArmDroneWithScript() {
    exec('python3 drone-client/rearm-drone-script.py', (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
      });
}

armDroneWithScript();

function readLastLineOfFile(file, callback) {
  let stream = createReadStream(file, { flags: 'r', encoding: 'utf-8' });
  let data = '';
  let lastLine = '';
  
  stream.on('data', function(chunk) {
      data += chunk;
      let lines = data.split('\n');
      lastLine = lines[lines.length - 1]; // Get the second to last line, as the last line may be incomplete
  });
  
  stream.on('end', function() {
      callback(lastLine);
  });
}

fs.watch(filePath, (eventType, filename) => {
  if (eventType === 'change') {
      readLastLineOfFile(filePath, (lastLine) => {
          // Parse the last line to extract LIDAR reading values
          console.log(`new last line: ${lastLine}`);
          socket.emit('newLidarReading', lastLine);
          const parts = lastLine.match(/distance: ([^,]+), theta: ([^,]+), q: (\d+)/);
          if (parts) {
              const lidarReading = {
                  distance: parseFloat(parts[1]),
                  theta: parseFloat(parts[2]),
                  q: parseInt(parts[3], 10)
              };
              console.log(`lidarReading: ${JSON.stringify(lidarReading, null, 2)}`);
              socket.emit('newLidarReading', lidarReading);

              // Emit the LIDAR reading to all connected clients
              // console.log(`Emitting lidar reading: ${JSON.stringify(lidarReading)}`);
            }
            
      });
  }
});

// **************** METHODS ****************

// __________________ DATA _________________

// __________________ DATA _________________    




