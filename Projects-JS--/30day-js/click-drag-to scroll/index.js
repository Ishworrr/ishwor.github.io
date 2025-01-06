const slider = document.querySelector(".items");
let isDown = false;
let startX; //find where clicked before going right or left
let scrollLeft;

slider.addEventListener("mousedown", (e) => {
  isDown = true;
  slider.classList.add("active");
  console.log(e.pageX);
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});
slider.addEventListener("mouseleave", () => {
  isDown = false;
  slider.classList.remove("active");
  console.log("left");
});
slider.addEventListener("mouseup", () => {
  isDown = false;
  slider.classList.remove("active");
});
slider.addEventListener("mousemove", (e) => {
  if (!isDown) return; //if isnot down (the mouseclick), stop fn from running
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 3;
  slider.scrollLeft = scrollLeft - walk;

  console.log(isDown);
  console.log("Do work");
  console.log(x, startX);
  console.log(walk);
});
