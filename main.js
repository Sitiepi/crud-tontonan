// Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

// GANTI DENGAN FIREBASE CONFIG ANDA
const firebaseConfig = {
  apiKey: "AIzaSyDgGanI0xfwbMbF2Q20eftio7Hc6iyPVgI",
  authDomain: "insancemerlang-e9c87.firebaseapp.com",
  projectId: "insancemerlang-e9c87",
  storageBucket: "insancemerlang-e9c87.firebasestorage.app",
  messagingSenderId: "1009245252263",
  appId: "1:1009245252263:web:637bfe528eddfc0dc18982"
};

  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app)
  const filmCollection = collection(db, "film")
  
  //fungsi untuk menampilkan daftar film dan drama
  export async function daftarFilm() {
  }
  
  //fungsi untuk menambah film atau drama baru
  export async function tambahFilm() {
    // ambil nilai dari form
  const judul = document.getElementById('judul').value
  const sinopsis = document.getElementById('sinopsis').value
  const aktor = document.getElementById('aktor').value

  // tambahkan data ke firestore
  await addDoc(filmCollection, {
    judul: judul,
    sinopsis: sinopsis,
    aktor: aktor
  })

  // alihkan ke halaman daftar film
  window.location.href = 'daftar.html'
  }