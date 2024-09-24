import { db } from '/backend/firebase.js';
import { collection, query, where, orderBy, getDocs, doc, updateDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const loadPendingImages = async () => {
  const moderationGallery = document.getElementById("moderationGallery");
  moderationGallery.innerHTML = "";

  const q = query(
    collection(db, "photos"),
    where("status", "==", "pending"),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  snapshot.forEach((doc) => {
    const imgContainer = document.createElement("div");
    imgContainer.className = "image-container";

    const img = document.createElement("img");
    img.src = doc.data().url;

    const approveButton = document.createElement("button");
    approveButton.textContent = "Approve";
    approveButton.onclick = () => moderateImage(doc.id, "approved");

    const rejectButton = document.createElement("button");
    rejectButton.textContent = "Reject";
    rejectButton.onclick = () => moderateImage(doc.id, "rejected");

    imgContainer.appendChild(img);
    imgContainer.appendChild(approveButton);
    imgContainer.appendChild(rejectButton);
    moderationGallery.appendChild(imgContainer);
  });
};

const moderateImage = async (docId, status) => {
  const docRef = doc(db, "photos", docId);
  await updateDoc(docRef, {
    status: status,
    moderatedAt: serverTimestamp(),
  });
  loadPendingImages(); // Refresh the gallery
};

loadPendingImages();
