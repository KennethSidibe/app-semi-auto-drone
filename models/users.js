// USERS

    // WRITE
    async function Insert_user(userData) {
        try {
          const docRef = await addDoc(collection(db, "users"), userData);
          console.log("User added with ID: ", docRef.id);
        } catch (error) {
          console.error("Error adding user: ", error);
        }
    }
    // WRITE

    // READ
    async function Get_userById(userId) {
        try {
          const docRef = doc(db, "users", userId);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            console.log("User data:", docSnap.data());
            return docSnap.data();
          } else {
            console.log("No such user found!");
            return null;
          }
        } catch (error) {
          console.error("Error fetching user: ", error);
          return null;
        }
    }
    // READ

    // UPDATE
    async function Update_user(userId, updatedData) {
        try {
          const userRef = doc(db, "users", userId);
          await updateDoc(userRef, updatedData);
          console.log("User successfully updated");
        } catch (error) {
          console.error("Error updating user: ", error);
        }
    }
    // UPDATE

    // DELETE
    async function Delete_user(userId) {
        try {
          await deleteDoc(doc(db, "users", userId));
          console.log("User successfully deleted");
        } catch (error) {
          console.error("Error deleting user: ", error);
        }
    }
    // DELETE

class User {
    constructor(userData) {
        this.email = userData.email;
        this.firstName = userData.firstName;
        this.lastName = userData.lastName;
    }

    // Getters
    get email() {
        return this.email;
    }

    get firstName() {
        return this.firstName;
    }

    get lastName() {
        return this.lastName;
    }

    // Setters
    set email(value) {
        this.email = value;
    }

    set firstName(value) {
        this.firstName = value;
    }

    set lastName(value) {
        this.lastName = value;
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

let randomUser = User.generateRandomUser();
console.log(randomUser);
    

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

// USERS