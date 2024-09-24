var countDownDate = new Date("2024-11-09").getTime();
const laura = document.querySelector(".laura");
const radu = document.querySelector(".radu");
const btnRadu = document.querySelector(".btn-radu");
const btnLaura = document.querySelector(".btn-laura");
const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");
const mapEl = document.getElementById("map");
const churchBtn = document.getElementById("btn-church");
const partyBtn = document.getElementById("btn-party");
const salsigLocTxt = document.querySelector(".salsig");
const ticauLocTxt = document.querySelector(".ticau");

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
  btnRadu.classList.add("btn-active");
  btnLaura.classList.remove("btn-active");
});

btnLaura.addEventListener("click", () => {
  laura.classList.remove("hide");
  radu.classList.add("hide");
  btnLaura.classList.add("btn-active");
  btnRadu.classList.remove("btn-active");
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
  // Define coordinates for each location
  const churchLocation = { lat: 47.521416, lng: 23.294013 };
  const partyLocation = { lat: 47.4377505, lng: 23.2944917 };

  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 14,
    center: churchLocation,
  });

  let marker = new google.maps.Marker({
    position: churchLocation,
    map: map,
    title: "Religious Ceremony",
  });

  function updateMap(location, title) {
    // Remove the current marker
    marker.setMap(null);

    // Create a new marker at the new location
    marker = new google.maps.Marker({
      position: location,
      map: map,
      title: title,
    });

    // Center the map on the new location
    map.setCenter(location);
  }

  // Add event listeners to switch between locations when buttons are clicked
  document.getElementById("btn-church").addEventListener("click", function () {
    salsigLocTxt.classList.remove("hide");
    ticauLocTxt.classList.add("hide");
    churchBtn.classList.add('btn-active')
    partyBtn.classList.remove('btn-active')
    updateMap(churchLocation, "Religious Ceremony");
  });

  document.getElementById("btn-party").addEventListener("click", function () {
    ticauLocTxt.classList.remove("hide");
    salsigLocTxt.classList.add("hide");
    partyBtn.classList.add('btn-active');
    churchBtn.classList.remove('btn-active');
    updateMap(partyLocation, "Party Venue");
  });

  // Function to open Google Maps with the current location
  function openGoogleMapsApp(location) {
    const url = `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`;
    window.open(url, "_blank");
  }

  // Attach a click listener to the map that opens Google Maps
  mapEl.addEventListener("click", function () {
    const currentLocation = marker.getPosition();
    openGoogleMapsApp({
      lat: currentLocation.lat(),
      lng: currentLocation.lng(),
    });
  });
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
