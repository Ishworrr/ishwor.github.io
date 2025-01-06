const triggers = document.querySelectorAll(".cool>li");
const background = document.querySelector(".dropdownBackground");
const nav = document.querySelector(".top");

function handleEnter() {
  console.log("ENter");
  this.classList.add("trigger-enter");
  setTimeout(() => {
    //   this.classList.add("trigger-enter-active");
    if (this.classList.contains("trigger-enter")) {
      this.classList.add("trigger-enter-active");
    }
  }, 150);

  // 0r??
  // setTimeout(() => { this.classList.contains('trigger-enter')&& this.classList.add("trigger-enter-active"),150 }, timeout);

  background.classList.add("open");

  const dropdown = this.querySelector(".dropdown");
  const dropdownCoords = dropdown.getBoundingClientRect();
  const navCoords = nav.getBoundingClientRect();

  console.log(dropdown);
  console.log(dropdownCoords);
  console.log(navCoords);

  const coords = {
    height: dropdownCoords.height,
    width: dropdownCoords.width,
    top: dropdownCoords.top - navCoords.top,
    left: dropdownCoords.left - navCoords.left,
  };

  // background.style.height = `${coords.height}px`;
  // background.style.width = `${coords.width}px`;
  background.style.setProperty("height", `${coords.height}px`);
  background.style.setProperty("width", `${coords.width}px`);
  background.style.setProperty(
    "transform",
    `translate(${coords.left}px,${coords.top}px)`
  );
}
function handleLeave() {
  console.log("leave");
  this.classList.remove("trigger-enter", "trigger-enter-active");
  background.classList.remove("open");
}

triggers.forEach((trigger) =>
  trigger.addEventListener("mouseenter", handleEnter)
);
triggers.forEach((trigger) =>
  trigger.addEventListener("mouseleave", handleLeave)
);
