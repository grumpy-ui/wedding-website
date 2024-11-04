import { db } from "/backend/firebase.js";
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc,
  where
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

// Password protection
const password = prompt("Enter the moderation password:");
if (password !== "sp101171") {
  alert("Incorrect password. Redirecting to the main page.");
  window.location.href = "/moderation";
}

// Function to load the last 20 images
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

      // Button container
      const btnContainer = document.createElement("div");
      btnContainer.classList.add("moderation-buttons");

      if (data.status === "pending") {
        // Create approve button
        const approveBtn = document.createElement("button");
        approveBtn.textContent = "Approve";
        approveBtn.addEventListener("click", () => {
          approveImage(doc.id);
        });
        btnContainer.appendChild(approveBtn);

        // Create reject button
        const rejectBtn = document.createElement("button");
        rejectBtn.textContent = "Reject";
        rejectBtn.addEventListener("click", () => {
          rejectImage(doc.id);
        });
        btnContainer.appendChild(rejectBtn);
      } else if (data.status === "approved") {
        // Create delete button for approved images
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", () => {
          deleteImage(doc.id);
        });
        btnContainer.appendChild(deleteBtn);
      }

      polaroid.appendChild(infoDiv);
      polaroid.appendChild(btnContainer);
      moderationGallery.appendChild(polaroid);
    });
  });
};

// Function to approve an image
const approveImage = async (id) => {
  const photoRef = doc(db, "photos", id);
  await updateDoc(photoRef, { status: "approved" });
  alert("Image approved!");
};

// Function to reject (delete) an image
const rejectImage = async (id) => {
  const confirmDelete = confirm("Are you sure you want to reject this image?");
  if (confirmDelete) {
    const photoRef = doc(db, "photos", id);
    await deleteDoc(photoRef);
    alert("Image rejected and deleted!");
  }
};

// Function to delete an approved image
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
