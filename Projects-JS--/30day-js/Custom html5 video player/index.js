/* Get Our Elements */

const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtonss = player.querySelectorAll("[data-skip");
const ranges = player.querySelectorAll(".player__slider");

/* Build out functions */
function togglePlay() {
  // if(video.paused){
  //     video.play();
  // }else{
  //     video.pause();
  // }
  //OR,
  const mett = video.paused ? "play" : "pause";
  video[mett]();
  //0r
  //   video[video.paused ? "play" : "pause"]();
}

function updateButton() {
  console.log("update the button");
  const icon = this.paused ? "►" : "❚ ❚";
  console.log(icon);
  toggle.textContent = icon;
}

function skip() {
  console.log(this.dataset.skip);
  video.currentTime += parseFloat(this.dataset.skip); //parseFloat changes it to number form string
}

function handleRangeUpdate() {
  video[this.name] = this.value; //playback rate or volume value is what we set
  console.log(this.value);
  console.log(this.name);
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
  console.log(e);
}
function handleProgress() {
  //of videbar
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

/* Hook up the event listeners */
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress);

toggle.addEventListener("click", togglePlay);
skipButtonss.forEach((button) => button.addEventListener("click", skip));
ranges.forEach((range) => range.addEventListener("change", handleRangeUpdate));
ranges.forEach((range) =>
  range.addEventListener("mousemove", handleRangeUpdate)
);

let mousedown = false; //when clicking true and take off fasle
progress.addEventListener("click", scrub);
// progress.addEventListener("mousemove", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false)); //if not this then computer wont know the mousehas been up just think its down or clicked all the time
