import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import {getDatabase, ref, set, update, onChildAdded, onChildRemoved, remove, onChildChanged} from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js';
import {getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL} from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-storage.js';

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

function uploadImage(file, callback) {
  const sRef = storageRef(storage, 'img/' + Date.now() + '-' + file.name);
  const uploadTask = uploadBytesResumable(sRef, file);

  uploadTask.on('state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    },
    (error) => {
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        callback(downloadURL);
      });
    }
  );
}

function resetearFormulario() {
  document.getElementById('txtnombre').value = '';
  document.getElementById('txtprecio').value = '';
  document.getElementById('txtdescripcion').value = '';
  document.getElementById('flimagen').value = '';
}

document.getElementById('formcoleccionable').addEventListener('submit', function (event) {
  event.preventDefault();

  const distribuidor = document.getElementById('slctdistribuidor').value;
  const nombre = document.getElementById('txtnombre').value;
  const precio = document.getElementById('txtprecio').value;
  const descripcion = document.getElementById('txtdescripcion').value;
  const archivoimagen = document.getElementById('flimagen').files[0];
  const id = document.getElementById('hdid').value;

  guardarColeccionable(distribuidor, nombre, precio, descripcion, archivoimagen, id);

  resetearFormulario();
});

function guardarColeccionable(distribuidor, nombre, precio, descripcion, imageFile, id) {
  if (!nombre || !precio || !descripcion) {
    return;
  }

  function storeData(imageUrl) {
    const data = {
      nombre: nombre,
      precio: precio,
      descripcion: descripcion,
      imageUrl: imageUrl
    };

    if (id) {
      const coleccionableRef = ref(db, `coleccionables/${distribuidor}/` + id);
      update(coleccionableRef, data);
    } else {
      const newColeccionableRef = ref(db, `coleccionables/${distribuidor}/` + Date.now());
      set(newColeccionableRef, data);
    }
  }

  if (imageFile) {
    uploadImage(imageFile, (imageUrl) => {
      storeData(imageUrl);
    });
  } else {
    storeData(null);
  }
}

document.getElementById('editarformcoleccionable').addEventListener('submit', function (event) {
  event.preventDefault();

  const edicionDistribuidor = document.getElementById('editarslctdistribuidor').value;
  const nombre = document.getElementById('editartxtnombre').value;
  const precio = document.getElementById('editartxtprecio').value;
  const descripcion = document.getElementById('editartxtdescripcion').value;
  const archivoimagen = document.getElementById('editarflimagen').files[0];
  const id = document.getElementById('editarhdid').value;

  guardarColeccionable(edicionDistribuidor, nombre, precio, descripcion, archivoimagen, id);

  cancelarEdicion();
});

function borrarColeccionable(distribuidor, hdid) {
  const coleccionableRef = ref(db, `coleccionables/${distribuidor}/` + hdid);
  remove(coleccionableRef);
}

document.addEventListener('DOMContentLoaded', (event) => {
  const cancelButton = document.querySelector('[data-cancel-button]');
  if (cancelButton) {
    cancelButton.addEventListener('click', cancelarEdicion);
  }
});

function cancelarEdicion() {
  document.getElementById('editarformcoleccionable').style.display = 'none';

  document.getElementById('editartxtnombre').value = '';
  document.getElementById('editartxtprecio').value = '';
  document.getElementById('editartxtdescripcion').value = '';
  document.getElementById('editarhdid').value = '';
}

function editarColeccionable(distribuidor, id, data) {
  document.getElementById('editarformcoleccionable').style.display = 'block';

  document.getElementById('editarslctdistribuidor').value = distribuidor;
  document.getElementById('editartxtnombre').value = data.nombre;
  document.getElementById('editartxtprecio').value = data.precio;
  document.getElementById('editartxtdescripcion').value = data.descripcion;
  document.getElementById('editarhdid').value = id;
}

function mostrarColeccionables() {
  const distribuidores = ["hottoys", "sideshow"];

  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");
  table.appendChild(thead);
  table.appendChild(tbody);
  document.getElementById('listaColeccionables').appendChild(table);

  const trHeader = document.createElement("tr");
  ["Distribuidor", "Nombre", "Precio", "Descripción", "Imagen", "Acciones"].forEach(headerText => {
    const th = document.createElement("th");
    th.textContent = headerText;
    trHeader.appendChild(th);
  });
  thead.appendChild(trHeader);

  distribuidores.forEach(distribuidor => {
    const coleccionableRef = ref(db, `coleccionables/${distribuidor}`);

    onChildAdded(coleccionableRef, snapshot => {
      console.log(`Añadiendo coleccionables con ID ${snapshot.key} del distribuidor ${distribuidor}`);

      const data = snapshot.val();
      const tr = document.createElement("tr");
      tr.id = `${distribuidor}-${snapshot.key}`;

      const tdDistribuidor = document.createElement("td");
      tdDistribuidor.textContent = distribuidor;
      tr.appendChild(tdDistribuidor);

      const tdNombre = document.createElement("td");
      tdNombre.textContent = data.nombre;
      tr.appendChild(tdNombre);

      const tdPrecio = document.createElement("td");
      tdPrecio.textContent = data.precio;
      tr.appendChild(tdPrecio);

      const tdDescripcion = document.createElement("td");
      tdDescripcion.textContent = data.descripcion;
      tr.appendChild(tdDescripcion);

      const tdImagen = document.createElement("td");
      const img = document.createElement("img");
      img.src = data.imageUrl;
      img.alt = data.nombre;
      img.width = 100;
      tdImagen.appendChild(img);
      tr.appendChild(tdImagen);

      const tdAcciones = document.createElement("td");
      const btnBorrar = document.createElement("button");
      btnBorrar.innerText = "Borrar";
      btnBorrar.onclick = () => borrarColeccionable(distribuidor, snapshot.key);
      tdAcciones.appendChild(btnBorrar);

      const btnEditar = document.createElement("button");
      btnEditar.innerText = "Editar";
      btnEditar.onclick = () => editarColeccionable(distribuidor, snapshot.key, data);
      tdAcciones.appendChild(btnEditar);

      tr.appendChild(tdAcciones);
      tbody.appendChild(tr);
    });

    onChildChanged(coleccionableRef, snapshot => {
      console.log(`Actualizando coleccionable con ID ${snapshot.key}`);
      const data = snapshot.val();
      actualizarTabla(`${distribuidor}-${snapshot.key}`, data);
    });

    onChildRemoved(coleccionableRef, (snapshot) => {
      const trToRemove = document.getElementById(`${distribuidor}-${snapshot.key}`);
      if (trToRemove) {
        trToRemove.remove();
      }
    });
  });
}

function actualizarTabla(hdid, data) {
  const tr = document.getElementById(hdid);
  if (tr) {
    tr.children[1].textContent = data.nombre;
    tr.children[2].textContent = data.precio;
    tr.children[3].textContent = data.descripcion;
    const img = tr.querySelector("img");
    img.src = data.imageUrl;
    img.alt = data.nombre;
  }
}

mostrarColeccionables();
