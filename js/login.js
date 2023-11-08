import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDpFeYEt1PD7Y-5Qq0AeJG-VNVX3dnLfm4",
    authDomain: "proyectofinalruanet.firebaseapp.com",
    projectId: "proyectofinalruanet",
    storageBucket: "proyectofinalruanet.appspot.com",
    messagingSenderId: "1074229098812",
    appId: "1:1074229098812:web:84140d12449ef00ab88639"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const emailInput = document.getElementById("txtCorreo");
const passwordInput = document.getElementById("txtContraseña");
const loginButton = document.getElementById("btnIngresar");

loginButton.addEventListener("click", (e) => {
    e.preventDefault();

    const txtCorreo = emailInput.value;
    const txtContraseña = passwordInput.value;

    signInWithEmailAndPassword(auth, txtCorreo, txtContraseña)
        .then((userCredential) => {
            window.location.href = '/html/menu.html';
        })
        .catch((error) => {
            const errors = document.querySelector('.error');
            errors.classList.add('errors');
            setTimeout(() => {
                errors.classList.remove('errors');
            }, 2000);
            document.querySelector(".error").textContent = "Los datos no son correctos";
        });
});

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("Usuario autenticado:", user);
    } else {
        console.log("Usuario no autenticado");
    }
});
