import { storage, db } from '/backend/firebase.js';
import { ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-storage.js";
import { collection, addDoc, query, where, orderBy, limit, getDocs, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const fileInput = document.getElementById("fileInput");
const uploadForm = document.getElementById("uploadForm");

uploadForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const file = fileInput.files[0];
  if (!file) return alert("Please select a file.");

  const storageRef = ref(storage, `uploads/${file.name}`); // Corrected ref syntax
  const uploadTask = uploadBytesResumable(storageRef, file); // Corrected for modular syntax

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Handle progress
    },
    (error) => {
      alert("Error uploading file");
    },
    async () => {
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
  
      // Store image metadata in Firestore with the public download URL
      await addDoc(collection(db, "photos"), {
        url: downloadURL,  
        status: "pending",
        createdAt: serverTimestamp(),
      });
  
      alert("File uploaded successfully!");
      loadLast10Images();
    }
  );
  
});

const loadLast10Images = async () => {
  const gallery = document.getElementById("gallery");
  gallery.innerHTML = "";

  const q = query(
    collection(db, "photos"),
    where("status", "==", "approved"),
    orderBy("createdAt", "desc"),
    limit(10)
  );

  const snapshot = await getDocs(q);

  snapshot.forEach((doc) => {
    const img = document.createElement("img");
    img.src = doc.data().url;
    gallery.appendChild(img);
  });
};

loadLast10Images();
