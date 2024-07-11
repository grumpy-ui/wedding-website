var countDownDate = new Date("2024-11-09").getTime();
const laura = document.querySelector(".laura");
const radu = document.querySelector(".radu");
const btnRadu = document.querySelector(".btn-radu");
const btnLaura = document.querySelector(".btn-laura");
const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

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

//Sticky navigation

// const sectionHeroEl = document.querySelector(".section-hero");

// const observer = new IntersectionObserver(
//   function (entries) {
//     const ent = entries[0];
//     if (!ent.isIntersecting) {
//       document.body.classList.add("sticky");
//     } else {
//       document.body.classList.remove("sticky");
//     }
//   },
//   {
//     root: null,
//     threshold: 0,
//     rootMargin: "-80px",
//   }
// );

// observer.observe(sectionHeroEl);

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

  locatie.addEventListener("click", openGoogleMapsApp);
}
