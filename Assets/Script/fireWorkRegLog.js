import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js';
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


onAuthStateChanged(auth, (user) => {
  if (user) {
  } else {
    window.location.href = '../../index.html';
  }
});


const logoutBtn = document.getElementById('logout');

logoutBtn.addEventListener('click', () => {
  signOut(auth)
    .then(() => {
      console.log('clicked');
      localStorage.clear();
      localStorage.setItem('isLogin', false);
      location.href = '../../index.html';
    })
    .catch((error) => {
      alert(error.message);
    });
});

// try {
//   const docRef = await addDoc(collection(db, "users"), {
//     first: "Ada",
//     last: "Lovelace",
//     born: 1815
//   });
//   console.log("Document written with ID: ", docRef.id);
// } catch (e) {
//   console.error("Error adding document: ", e);
// }


