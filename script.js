//Countdown

var countDownDate = new Date("2024-11-09").getTime();
const laura = document.querySelector(".laura")
const radu = document.querySelector(".radu")
const btnRadu = document.querySelector(".btn-radu")
const btnLaura = document.querySelector(".btn-laura")

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

btnRadu.addEventListener('click', () => {
  radu.classList.remove('hide');
  laura.classList.add('hide');
  btnRadu.classList.add('active');
  btnLaura.classList.remove('active')
})

btnLaura.addEventListener('click', () => {
  laura.classList.remove('hide');
  radu.classList.add('hide')
  btnLaura.classList.add('active');
  btnRadu.classList.remove('active')
})