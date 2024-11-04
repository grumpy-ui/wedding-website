import { db } from "/backend/firebase.js";
import { collection, query, where, orderBy, onSnapshot, updateDoc, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

// Function to load and listen for pending images in real-time
const loadPendingImages = () => {
  const moderationGallery = document.getElementById("moderationGallery");

  // Query Firestore for pending photos
  const q = query(
    collection(db, "photos"),
    where("status", "==", "pending"),
    orderBy("createdAt", "desc")
  );

  // Real-time listener for pending images
  onSnapshot(q, (snapshot) => {
    moderationGallery.innerHTML = "";

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

      // Create approve and reject buttons
      const approveBtn = document.createElement("button");
      approveBtn.textContent = "Approve";
      approveBtn.addEventListener("click", () => {
        approveImage(doc.id);
      });

      const rejectBtn = document.createElement("button");
      rejectBtn.textContent = "Reject";
      rejectBtn.addEventListener("click", () => {
        rejectImage(doc.id);
      });

      const btnContainer = document.createElement("div");
      btnContainer.classList.add("moderation-buttons");
      btnContainer.appendChild(approveBtn);
      btnContainer.appendChild(rejectBtn);

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

// Function to reject an image (delete it or update status)
const rejectImage = async (id) => {
  const confirmDelete = confirm("Are you sure you want to reject this image?");
  if (confirmDelete) {
    const photoRef = doc(db, "photos", id);
    await deleteDoc(photoRef);
    alert("Image rejected and deleted!");
  }
};

// Call the function to start listening for changes
loadPendingImages();
