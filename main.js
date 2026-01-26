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
    // ambil snapshot data dari koleksi film
  const snapshot = await getDocs(filmCollection)

  // ambil elemen tabel data
  const tabel = document.getElementById('tabelData')

  // kosongkan isi tabel nya
  tabel.innerHTML = ""

  // loop setiap dokumen dalam snapshot
  snapshot.forEach((doc) => {
    // variabel untuk menyimpan data
    const data = doc.data()
    const id = doc.id

    // buat elemen baris baru
    const baris = document.createElement("tr")

    // buat elemen kolom untuk judul
    const kolomJudul = document.createElement("td")
    kolomJudul.textContent = data.judul

    // buat elemen untuk kolom sinopsis 
    const kolomSinopsis = document.createElement("td")
    kolomSinopsis.textContent = data.sinopsis

    // buat elemen kolom untuk aktor 
    const kolomAktor = document.createElement('td')
    kolomAktor.textContent = data.aktor
    
    const kolomAksi = document.createElement('td')
    kolomAksi.textContent = data.aksi


    // tombol edit
    const tombolEdit = document.createElement('a')
    tombolEdit.textContent = 'Edit'
    tombolEdit.href = 'edit.html?id=' + id
    tombolEdit.className = 'button edit'

    // tombol hapus
    const tombolHapus = document.createElement('button')
    tombolHapus.textContent = 'Hapus'
    tombolHapus.className = 'button delete'
    tombolHapus.onclick = async () => {
      await hapusfilm(id)
    }

    // tambahkan elemen ke dalam kolom aksi
    kolomAksi.appendChild(tombolEdit)
    kolomAksi.appendChild(tombolHapus)

    // tambahkan kolom ke dalam baris
    baris.appendChild(kolomJudul)
    baris.appendChild(kolomSinopsis)
    baris.appendChild(kolomAktor)
    baris.appendChild(kolomAksi)

    // tambahkan baris ke aalam tabel
    tabel.appendChild(baris)

  })
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
  
export async function hapusfilm(id) {
if (!confirm("yakin ingin menghapus data ini?")) return
  
  // menghapus dokuemen film berdasarkan id
  await deleteDoc(doc(db,"film",id))
  
  //refresh data film
  await daftarFilm()

}

//fungsi untuk menampilkan data siswa berdasarkan id
export async function ambilDataFilm(id) {
  const docRef = doc(db, "film", id)
  const docSnap = await getDoc(docRef)
  
  return await docSnap.data()
}





//fiungsi untuk mengubah data siswa
export async function ubahDataFilm(id, judul, sinopsis, aktor) {
  await updateDoc(doc(db, "film", id), {
    judul: judul,
    sinopsis: sinopsis,
    aktor: aktor
  })
  
  //alihlkan ke halaman daftar siswa
  window.location.href = 'daftar.html'
  // Tab to edit
}


  