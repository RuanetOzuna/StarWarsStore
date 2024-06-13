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

function mostarHotToys() {
    const distribuidor = "hottoys";
    const hotToysContenedor = document.getElementById('hottoys-contenedor');

    const coleccionableRef = ref(db, 'coleccionables/' + distribuidor);

    onChildAdded(coleccionableRef, snapshot => {
        const data = snapshot.val();
        const coleccionableDiv = document.createElement("div");
        coleccionableDiv.className = "coleccionable";
        coleccionableDiv.id = `${distribuidor}-${snapshot.key}`;

        const image = document.createElement("img");
        image.src = data.imageUrl;
        image.alt = data.nombre;
        image.width = 100;
        image.classList.add('img');
        coleccionableDiv.appendChild(image);

        const nombreColeccionable = document.createElement("p");
        nombreColeccionable.textContent = data.nombre;
        coleccionableDiv.appendChild(nombreColeccionable);

        const tituloPrecioColeccionable = document.createElement("h3");
        tituloPrecioColeccionable.textContent = `Precio`;
        coleccionableDiv.appendChild(tituloPrecioColeccionable);

        const precioColeccionable = document.createElement("h4");
        precioColeccionable.textContent = `${data.precio}`;
        coleccionableDiv.appendChild(precioColeccionable);

        hotToysContenedor.appendChild(coleccionableDiv);
    });
}

mostarHotToys();

function mostrarSideShow() {
    const distribuidor = "sideshow";
    const sideshowContenedor = document.getElementById('sideshow-contenedor');

    const coleccionableRef = ref(db, 'coleccionables/' + distribuidor);

    onChildAdded(coleccionableRef, snapshot => {
        const data = snapshot.val();
        const coleccionableDiv = document.createElement("div");
        coleccionableDiv.className = "coleccionable";
        coleccionableDiv.id = `${distribuidor}-${snapshot.key}`;

        const image = document.createElement("img");
        image.src = data.imageUrl;
        image.alt = data.nombre;
        image.width = 100;
        image.classList.add('img');
        coleccionableDiv.appendChild(image);

        const nombreColeccionable = document.createElement("p");
        nombreColeccionable.textContent = data.nombre;
        coleccionableDiv.appendChild(nombreColeccionable);

        const tituloPrecioColeccionable = document.createElement("h3");
        tituloPrecioColeccionable.textContent = `Precio`;
        coleccionableDiv.appendChild(tituloPrecioColeccionable);

        const precioColeccionable = document.createElement("h4");
        precioColeccionable.textContent = `${data.precio}`;
        coleccionableDiv.appendChild(precioColeccionable);

        sideshowContenedor.appendChild(coleccionableDiv);
    });
}

mostrarSideShow();

function mostrarFunko() {
    const distribuidor = "funko";
    const funkoContenedor = document.getElementById('funko-contenedor');

    const coleccionableRef = ref(db, 'coleccionables/' + distribuidor);

    onChildAdded(coleccionableRef, snapshot => {
        const data = snapshot.val();
        const coleccionableDiv = document.createElement("div");
        coleccionableDiv.className = "coleccionable";
        coleccionableDiv.id = `${distribuidor}-${snapshot.key}`;

        const image = document.createElement("img");
        image.src = data.imageUrl;
        image.alt = data.nombre;
        image.width = 100;
        image.classList.add('img');
        coleccionableDiv.appendChild(image);

        const nombreColeccionable = document.createElement("p");
        nombreColeccionable.textContent = data.nombre;
        coleccionableDiv.appendChild(nombreColeccionable);

        const tituloPrecioColeccionable = document.createElement("h3");
        tituloPrecioColeccionable.textContent = `Precio`;
        coleccionableDiv.appendChild(tituloPrecioColeccionable);

        const precioColeccionable = document.createElement("h4");
        precioColeccionable.textContent = `${data.precio}`;
        coleccionableDiv.appendChild(precioColeccionable);

        funkoContenedor.appendChild(coleccionableDiv);
    });
}

mostrarFunko();
