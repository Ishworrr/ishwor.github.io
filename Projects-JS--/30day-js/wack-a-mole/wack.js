const holes = document.querySelectorAll(".hole");
const scoreboard = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");
let lastHole;
let timeUp = false;
let score = 0;

function randTime(min, max) {
  // return Math.random() * (max - min) + min;
  return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
  console.log(holes.length);
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  console.log(hole);

  if (hole === lastHole) {
    console.log("thats the same one!!!! oh no");
    return randomHole(holes);
  }

  lastHole = hole;
  return hole;
}

function peep() {
  const time = randTime(200, 1000);
  console.log(time);
  const hole = randomHole(holes);
  console.log(time, hole);
  hole.classList.add("up");
  setTimeout(() => {
    hole.classList.remove("up");
    if (!timeUp) peep();
  }, time);
}

function startGame() {
  scoreboard.textContent = 0;
  timeUp = false;
  score = 0;
  peep();
  setTimeout(() => (timeUp = true), 10000);
}

function bonk(e) {
  console.log(e);
  if (!e.isTrusted) return; //cheater
  score++;
  this.classList.remove("up");
  scoreboard.textContent = score;
}
moles.forEach((mole) => mole.addEventListener("click", bonk));
