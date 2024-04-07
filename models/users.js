import { db } from "./db-config.js";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, doc, getFirestore, setDoc, getDocs, getDoc, updateDoc, deleteDoc, documentId, query as queryFirestore, where } from 'firebase/firestore';
import { GeoPoint } from "firebase/firestore";


// USERS

    // WRITE
    export async function InsertUser(userData) {
      try {
        const docRef = await addDoc(collection(db, "users"), userData);
        console.log("User added with ID: ", docRef.id);
        return docRef.id;
      } catch (error) {
        console.error("Error adding user: ", error);
        return '';
      }
    }
    // WRITE

    // READ
    export async function GetUserById(userId) {
      try {
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? docSnap.data() : null;
      } catch (error) {
        console.error("Error fetching user: ", error);
        return null;
      }
    }
    // READ

    async function checkIfUserExists(userId) {
      const userRef = doc(db, "users", userId);
      try {
        const userSnap = await getDoc(userRef);
        return userSnap.exists();
      } catch (error) {
        console.error("Error checking user existence: ", error);
        return false;
      }
    }

    // UPDATE
    export async function UpdateUser(userId, updatedData) {
      try {
        if (!await checkIfUserExists(userId)) {
          console.log(`User does not exist`);
          return false;
        }
        const userRef = doc(db, "users", userId);
        await updateDoc(userRef, updatedData);
        return true;
      } catch (error) {
        console.error("Error updating user: ", error);
        return false;
      }
    }
    // UPDATE

    // DELETE
    export async function DeleteUser(userId) {
      try {
        if (!await checkIfUserExists(userId)) {
          console.log(`User does not exist`);
          return false;
        }
        await deleteDoc(doc(db, "users", userId));
        return true;
      } catch (error) {
        console.error("Error deleting user: ", error);
        return false;
      }
    }
    // DELETE


export default class User {
    constructor(userData) {
        this._email = userData.email;
        this._firstName = userData.firstName;
        this._lastName = userData.lastName;
    }

    // Getters
    get email() {
        return this._email;
    }

    get firstName() {
        return this._firstName;
    }

    get lastName() {
        return this._lastName;
    }

    // Setters
    set email(value) {
        this._email = value;
    }

    set firstName(value) {
        this._firstName = value;
    }

    set lastName(value) {
        this._lastName = value;
    }


  
  static generateRandomUser() {

    function getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const firstNames = ['Kenneth', 'Avneesh', 'Zinah', 'Marc', 'Moise', 'Moussa', 'James', 'Linda', 'Barbara', 'Michael', 'Elizabeth', 'David', 'Jennifer', 'Charles', 'Patricia'];
    const lastNames = ['Sidibe', 'Al-Saadi', 'Chaudhary', 'Kouame', 'Baleke', 'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez'];
    const emailProviders = ['ken.com', 'example.com', 'mail.com', 'inbox.com', 'email.com'];

    const firstName = firstNames[getRandomNumber(0, firstNames.length - 1)];
    const lastName = lastNames[getRandomNumber(0, lastNames.length - 1)];
    const emailProvider = emailProviders[getRandomNumber(0, emailProviders.length - 1)];

    // Generate a random email
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${emailProvider}`;

    return {
        email,
        firstName,
        lastName
    };
  }
}

// let randomUser = User.generateRandomUser();
// console.log(randomUser);
    
/*

let user = {
    email: 'ken@ken.com',
    firstName : 'Kenneth',
    lastName : 'Sidibe'
};

let users = {
    dslfndsl324kfn: user,
    dslfnskd21342: user,
    dskjfsld: user
}
*/

// USERS