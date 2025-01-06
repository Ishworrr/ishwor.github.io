const divs = document.querySelectorAll("div");
const button = document.querySelector("button");

function logText(e) {
  console.log(this.classList.value);
  e.stopPropagation(); //stops bubbling//like give me what i click not all, click on 3rd div u get three-not all
  // console.log(this);
}
//   document.body.addEventListener("click", logText); //bubling when u click a third div, it actually goes form top to bottom---bod,one,two and three
divs.forEach((div) =>
  div.addEventListener("click", logText, {
    capture: false, //run fn way down- means goes from one to three- so when u make it trueu and make stopPropagation goe sto one even while clicking three
    once: true, //just clicks once and runs--        div.removeEventListener('click',logText)
  })
);

//   for once click button
button.addEventListener(
  "click",
  () => {
    console.log("click");
  },
  {
    once: true,
  }
);
