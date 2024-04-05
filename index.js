import bodyParser from "body-parser";
import express, { query } from "express";
import { dirname } from "path";
import ejs from "ejs";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";
import { error } from "console";
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, doc, getFirestore, setDoc, getDocs, getDoc, documentId, query as queryFirestore, where } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { createServer } from "http";
import { Server } from "socket.io";


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

const server = createServer(app); 
const socket = new Server(server);

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

http.listen(port, (req, res) => {
  console.log(`Listening on port : ${port}`);
});



// ---------------- SOCKET ---------------------

const httpServer = createServer();

io.on('connection', function(socket) {
  console.log('User conencted');

  socket.on('disconnect', function() {
    console.log('User disconnected');
  });
});

// ---------------- SOCKET ---------------------



// ---------------- ROUTES ---------------------

app.get("/", async (req, res) => {
  res.render("home.ejs");
});

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



// __________________ DATA _________________    




