var countDownDate = new Date("2024-11-09").getTime();
const laura = document.querySelector(".laura");
const radu = document.querySelector(".radu");
const btnRadu = document.querySelector(".btn-radu");
const btnLaura = document.querySelector(".btn-laura");
const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");
const mapEl = document.getElementById('map');

const translations = {
  ro: {
    welcome: "Esti invitat la nunta noastra!",
    date: "9 Noiembrie 2024",
    confirm: "Confirma prezenta",
    contact: "Contacteaza-ne",
    about: "Despre noi",
    gallery: "Galerie",
    location: "Locatie",
    rsvp: "Confirma prezenta",
  },
  en: {
    welcome: "You are invited to our wedding!",
    date: "November 9, 2024",
    confirm: "RSVP",
    contact: "Contact us",
    about: "About us",
    gallery: "Gallery",
    location: "Location",
    rsvp: "RSVP",
  }
};

function changeLanguage() {
  const selectedLanguage = document.getElementById('language-selector').value;
  // localStorage.setItem('preferredLanguage', selectedLanguage);
  applyTranslations(selectedLanguage);
}

function applyTranslations(lang) {
  document.querySelector('.heading-primary').textContent = translations[lang].welcome;
  document.querySelector('.date').textContent = translations[lang].date;
  document.querySelector('.btn--full').textContent = translations[lang].confirm;
  document.querySelector('[data-bs-target="#contactModal"]').textContent = translations[lang].contact;
  
  // Update navigation links
  document.querySelector('a[href="#despre-noi"]').textContent = translations[lang].about;
  document.querySelector('a[href="#gallery"]').textContent = translations[lang].gallery;
  document.querySelector('a[href="#map"]').textContent = translations[lang].location;
  document.querySelector('.nav-cta').textContent = translations[lang].rsvp;
}

// Load the saved language or default to Romanian on page load
// window.onload = function() {
//   const savedLanguage = localStorage.getItem('preferredLanguage') || 'ro';
//   document.getElementById('language-selector').value = savedLanguage;
//   applyTranslations(savedLanguage);
// };


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

//Smooth scrolling
//Needed for old browsers
const allLinks = document.querySelectorAll("a:link");

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = link.getAttribute("href");

    // Scroll back to top
    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    // Scroll to other links
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }

    // Close mobile naviagtion
    if (link.classList.contains("main-nav-link"))
      headerEl.classList.toggle("nav-open");
  });
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
