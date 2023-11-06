// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDpFeYEt1PD7Y-5Qq0AeJG-VNVX3dnLfm4",
    authDomain: "proyectofinalruanet.firebaseapp.com",
    projectId: "proyectofinalruanet",
    storageBucket: "proyectofinalruanet.appspot.com",
    messagingSenderId: "1074229098812",
    appId: "1:1074229098812:web:84140d12449ef00ab88639"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Referencias a los elementos del DOM
const emailInput = document.getElementById("txtCorreo");
const passwordInput = document.getElementById("txtContraseña");
const loginButton = document.getElementById("btnIngresar");

// Escuchar el evento de click en el botón de ingreso
loginButton.addEventListener("click", (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto de enviar el formulario

    const txtCorreo = emailInput.value;
    const txtContraseña = passwordInput.value;

    // Autenticar al usuario
    signInWithEmailAndPassword(auth, txtCorreo, txtContraseña)
        .then((userCredential) => {
            // Inicio de sesión exitoso
            console.log("¡Inicio de sesión exitoso!");
            // Redireccionar al usuario a la página principal o a donde necesites
            window.location.href = '/html/menu.html';
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(`Error ${errorCode}: ${errorMessage}`);
            // Mostrar mensaje de error al usuario
            const errors = document.querySelector('.error');
            errors.classList.add('errors')
            setTimeout(() => {
                errors.classList.remove('errors');
            }, 2000);
            document.querySelector(".error").textContent = "Los datos no son correctos";
        });
});

// Observar el estado de autenticación
onAuthStateChanged(auth, (user) => {
    if (user) {
        // Usuario está autenticado
        console.log("Usuario autenticado:", user);
        // Puedes redireccionar al usuario a otra página o cargar contenido exclusivo para usuarios autenticados
    } else {
        // Usuario no está autenticado
        console.log("Usuario no autenticado");
    }
});