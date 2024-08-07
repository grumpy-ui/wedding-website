var countDownDate = new Date("2024-11-09").getTime();
const laura = document.querySelector(".laura");
const radu = document.querySelector(".radu");
const btnRadu = document.querySelector(".btn-radu");
const btnLaura = document.querySelector(".btn-laura");
const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");
const mapEl = document.getElementById('map');

var x = setInterval(function () {
  var now = new Date().getTime();
  var distance = countDownDate - now;
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("countdown").innerHTML =
    days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

  if (distance < 0) {
    clearInterval(x);
    document.getElementById("countdown").innerHTML = "It's our wedding day!";
  }
}, 1000);

btnRadu.addEventListener("click", () => {
  radu.classList.remove("hide");
  laura.classList.add("hide");
  btnRadu.classList.remove("active-btn");
  btnLaura.classList.add("active-btn");
});

btnLaura.addEventListener("click", () => {
  laura.classList.remove("hide");
  radu.classList.add("hide");
  btnLaura.classList.remove("active-btn");
  btnRadu.classList.add("active-btn");
});

//Mobile navigation

btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

function initMap() {
  const location = { lat: 47.4377691, lng: 23.2969981 };

  // Create the map
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 14,
    center: location,
  });

  const locatie = document.querySelector(".locatie");

  // Create a marker
  const marker = new google.maps.Marker({
    position: location,
    map: map,
  });

  // Add a click listener on the map
  function isMobileDevice() {
    return /Mobi|Android/i.test(navigator.userAgent);
  }

  function openGoogleMapsApp() {
    const location = { lat: 47.4377691, lng: 23.2969981 };

    const url = `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`;

    // Open Google Maps in a new tab or window
    window.open(url, "_blank");
  }

  mapEl.addEventListener("click", openGoogleMapsApp);
}


document.addEventListener('click', ()=> {

})

// document.addEventListener("DOMContentLoaded", function () {
//   const carousel = document.getElementById("carouselExampleIndicators");
//   const photoDescriptions = {
//     "./images/gallery/gallery-8.JPEG": "La inaltime pe Creasta Cocosului",
//     "./images/gallery/gallery-9.JPEG": "In natura",
//     "./images/gallery/gallery-11.JPEG": "Being silly",
//     "./images/gallery/gallery-13.JPEG": "La un ceai",
//   };

//   carousel.addEventListener("slid.bs.carousel", function () {
//     const activeItem = carousel.querySelector(".carousel-item.active");
//     const activeImage = activeItem.querySelector("img");
//     const imageSrc = activeImage.getAttribute("src");
//     const description = photoDescriptions[imageSrc];

//     const photoDescriptionElement = document.querySelector(
//       ".section-gallery .photo-description"
//     );
//     photoDescriptionElement.textContent = description;
//   });
// });

document.addEventListener("DOMContentLoaded", () => {
  const adultsInput = document.getElementById("adulti");
  const childrenInput = document.getElementById("copii");
  const attendeesContainer = document.getElementById("attendees-container");

  function createAttendeeInput(index, type) {
    const inputContainer = document.createElement("div");
    inputContainer.classList.add("input-container");

    const label = document.createElement("label");
    label.classList.add("label-text");
    label.setAttribute("for", `attendee-${type}-${index + 1}`);
    label.textContent = `Nume ${type} ${index + 1}`;

    const input = document.createElement("input");
    input.name = `${type}-name-${index + 1}`;
    input.id = `attendee-${type}-${index + 1}`;
    input.type = "text";
    input.placeholder = `Nume si prenume ${type}`;

    inputContainer.appendChild(label);
    inputContainer.appendChild(input);
    return inputContainer;
  }

  function updateAttendees() {
    attendeesContainer.innerHTML = "";

    const numAdults = parseInt(adultsInput.value) || 0;
    const numChildren = parseInt(childrenInput.value) || 0;

    for (let i = 0; i < numAdults; i++) {
      attendeesContainer.appendChild(createAttendeeInput(i, "adult"));
    }

    for (let i = 0; i < numChildren; i++) {
      attendeesContainer.appendChild(createAttendeeInput(i, "copil"));
    }
  }

  adultsInput.addEventListener("input", updateAttendees);
  childrenInput.addEventListener("input", updateAttendees);
});
