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
  serverTimestamp,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const fileInput = document.getElementById("fileInput");
const nameInput = document.getElementById("nameInput");
const descriptionInput = document.getElementById("descriptionInput");
const uploadForm = document.getElementById("uploadForm");
const progressBar = document.getElementById("progressBar");
const chooseFileBtn = document.querySelector('.btn-choose-file');
const successText = document.querySelector(".success");

fileInput.addEventListener('change', () => {
  if (fileInput.files.length > 0) {
    chooseFileBtn.classList.add('selected');
    chooseFileBtn.textContent = "Poza selectata";
  } else {
    chooseFileBtn.classList.remove('selected');
  }
});

uploadForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const file = fileInput.files[0];
  const name = nameInput.value;
  const description = descriptionInput.value || "";

  if (!file || !name) {
    return alert("Please upload a picture and enter your name.");
  }

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

      // Store image metadata in Firestore with the public download URL, name, and description
      await addDoc(collection(db, "photos"), {
        url: downloadURL,
        name: name,
        description: description,
        status: "pending",
        createdAt: serverTimestamp(),
      });

      successText.classList.remove('hide');
      chooseFileBtn.classList.remove('selected');
      chooseFileBtn.textContent = "Alege o poza";
      progressBar.style.display = "none";
      progressBar.value = 0;
      fileInput.value = "";
      nameInput.value = "";
      descriptionInput.value = "";
    }
  );
});


const loadLast10Images = () => {
  const gallery = document.getElementById("gallery");

  // Query to fetch approved photos
  const q = query(
    collection(db, "photos"),
    where("status", "==", "approved"),
    orderBy("createdAt", "desc"),
    limit(10)
  );

  // Real-time listener for approved images
  onSnapshot(q, (snapshot) => {
    gallery.innerHTML = "";

    snapshot.forEach((doc) => {
      const data = doc.data();
      const polaroid = document.createElement("div");
      polaroid.classList.add("polaroid");

      const img = document.createElement("img");
      img.src = data.url;
      polaroid.appendChild(img);

      const infoDiv = document.createElement("div");
      infoDiv.classList.add("info");

      const nameDiv = document.createElement("div");
      nameDiv.classList.add("name");
      nameDiv.textContent = data.name;
      infoDiv.appendChild(nameDiv);

      if (data.description) {
        const descriptionDiv = document.createElement("div");
        descriptionDiv.classList.add("description");
        descriptionDiv.textContent = data.description;
        infoDiv.appendChild(descriptionDiv);
      }

      polaroid.appendChild(infoDiv);
      gallery.appendChild(polaroid);
    });
  });
};


loadLast10Images();
