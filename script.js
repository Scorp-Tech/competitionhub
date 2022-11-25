import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import {
    getAuth,
    signInWithEmailAndPassword,
} from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


const email = document.getElementById('email');
const password = document.getElementById('password');
const passwordVisiblility = document.querySelector('.passwordVisiblility');
const visibility = document.querySelector('.visibility');
const loginBtn = document.querySelector('.loginBtn');
const loginForm = document.getElementById('login-form');

const pkg = {
    isVisible: false,
};

passwordVisiblility.addEventListener('click', (e) => {
    e.preventDefault();
    if (pkg.isVisible) {
        pkg.isVisible = false;
        password.type = 'password';
        visibility.classList.add('fa-eye');
        visibility.classList.remove('fa-eye-slash');
    } else {
        password.type = 'text';
        pkg.isVisible = true;
        visibility.classList.remove('fa-eye');
        visibility.classList.add('fa-eye-slash');
    }
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('Login Clicked');
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            window.location.href = './Assets/AfterLoginChapert/index_afterLogin.html';
            // ...
        })
        .catch((err) => {
            if (err.code === 'auth/wrong-password') {
                alert('Wrong Email/Password');
            } else if (err.code === 'auth/user-not-found') {
                alert('User Not Found...');
            }
        });
});