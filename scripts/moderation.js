import { db, storage } from '/backend/firebase.js';
import { collection, query, where, orderBy, limit, getDocs, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
import { ref, deleteObject } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-storage.js";

// Function to load images for moderation
const loadImagesForModeration = async () => {
  const moderationGallery = document.getElementById("moderationGallery");
  moderationGallery.innerHTML = "";

  // Query the last 10 uploaded images
  const q = query(
    collection(db, "photos"),
    orderBy("createdAt", "desc"),
    limit(10)
  );

  const snapshot = await getDocs(q);

  snapshot.forEach((docSnapshot) => {
    const data = docSnapshot.data();
    const imgContainer = document.createElement("div");
    imgContainer.className = "image-container";

    const img = document.createElement("img");
    img.src = data.url;

    if (data.status === "pending") {
      // Create Approve and Reject buttons for pending pictures
      const approveButton = document.createElement("button");
      approveButton.textContent = "Approve";
      approveButton.onclick = () => approveImage(docSnapshot.id);

      const rejectButton = document.createElement("button");
      rejectButton.textContent = "Reject";
      rejectButton.onclick = () => rejectImage(docSnapshot.id);

      imgContainer.appendChild(img);
      imgContainer.appendChild(approveButton);
      imgContainer.appendChild(rejectButton);
    } else if (data.status === "approved") {
      // Create Delete button for approved pictures
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.onclick = () => deleteImage(docSnapshot.id, data.filename);

      imgContainer.appendChild(img);
      imgContainer.appendChild(deleteButton);
    }

    moderationGallery.appendChild(imgContainer);
  });
};

// Function to approve an image
const approveImage = async (docId) => {
  try {
    const docRef = doc(db, "photos", docId);
    await updateDoc(docRef, { status: "approved" });
    console.log("Image approved successfully");

    // Reload the moderation gallery after approving
    loadImagesForModeration();
  } catch (error) {
    console.error("Error approving image: ", error);
  }
};

// Function to reject an image
const rejectImage = async (docId) => {
  try {
    const docRef = doc(db, "photos", docId);
    await updateDoc(docRef, { status: "rejected" });
    console.log("Image rejected successfully");

    // Reload the moderation gallery after rejecting
    loadImagesForModeration();
  } catch (error) {
    console.error("Error rejecting image: ", error);
  }
};

// Function to delete the image from both Firestore and Firebase Storage
const deleteImage = async (docId, fileName) => {
  try {
    // Delete the file from Firebase Storage
    const fileRef = ref(storage, `uploads/${fileName}`);
    await deleteObject(fileRef).catch((error) => {
      console.error("Error deleting file from storage:", error);
    });

    // Delete the document from Firestore
    await deleteDoc(doc(db, "photos", docId)).catch((error) => {
      console.error("Error deleting document from Firestore:", error);
    });

    // Refresh the gallery after deletion
    loadImagesForModeration();
  } catch (error) {
    console.error("Error deleting image: ", error);
  }
};

// Load the images for moderation when the page loads
loadImagesForModeration();
