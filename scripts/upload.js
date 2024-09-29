import { storage, db } from "/backend/firebase.js";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-storage.js";
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const fileInput = document.getElementById("fileInput");
const uploadForm = document.getElementById("uploadForm");
const progressBar = document.getElementById("progressBar");

uploadForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const file = fileInput.files[0];
  if (!file) return alert("Te rog sa alegi o poza.");

  progressBar.style.display = "block";

  const storageRef = ref(storage, `uploads/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      progressBar.value = progress;
      console.log(`Upload is ${progress}% done`);
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

      alert("Poza incarcata cu succes!");
      progressBar.style.display = "none";
      progressBar.value = 0;
      fileInput.value = "";

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
