import { db } from "/backend/firebase.js";
import { collection, query, orderBy, limit, onSnapshot, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

// Function to load and listen for the last 20 images in real-time
const loadLast20Images = () => {
  const moderationGallery = document.getElementById("moderationGallery");

  // Query to fetch the last 20 images
  const q = query(
    collection(db, "photos"),
    orderBy("createdAt", "desc"),
    limit(20)
  );

  // Real-time listener for the images
  onSnapshot(q, (snapshot) => {
    moderationGallery.innerHTML = ""; // Clear the gallery before adding new images

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

      // Create a delete button
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.addEventListener("click", () => {
        deleteImage(doc.id);
      });

      const btnContainer = document.createElement("div");
      btnContainer.classList.add("moderation-buttons");
      btnContainer.appendChild(deleteBtn);

      polaroid.appendChild(infoDiv);
      polaroid.appendChild(btnContainer);
      moderationGallery.appendChild(polaroid);
    });
  });
};

// Function to delete an image
const deleteImage = async (id) => {
  const confirmDelete = confirm("Are you sure you want to delete this image?");
  if (confirmDelete) {
    const photoRef = doc(db, "photos", id);
    await deleteDoc(photoRef);
    alert("Image deleted!");
  }
};

// Call the function to start listening for changes
loadLast20Images();
