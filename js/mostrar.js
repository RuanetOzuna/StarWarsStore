import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getDatabase, ref, set, onChildAdded, onChildRemoved, remove, update } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js';
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-storage.js';

const firebaseConfig = {
    apiKey: "AIzaSyDpFeYEt1PD7Y-5Qq0AeJG-VNVX3dnLfm4",
    authDomain: "proyectofinalruanet.firebaseapp.com",
    projectId: "proyectofinalruanet",
    storageBucket: "proyectofinalruanet.appspot.com",
    messagingSenderId: "1074229098812",
    appId: "1:1074229098812:web:84140d12449ef00ab88639"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const storage = getStorage(app);
