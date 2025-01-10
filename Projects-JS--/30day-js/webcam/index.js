const video = document.querySelector(".player");
const canvas = document.querySelector(".photo");
// const ctx = canvas.getContext("2d");
const ctx = canvas.getContext("2d", { willReadFrequently: true });

const strip = document.querySelector(".strip");
const snap = document.querySelector(".snap");

function getVideo() {
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then((localMediaStream) => {
      console.log(localMediaStream);
      video.srcObject = localMediaStream;
      // video.src = window.URL.createObjectURL(localMediaStream); //convert media stream into somthing the video can  understand
      video.play();
    })
    .catch((err) => {
      console.log(`OH no`, err);
    });
}

function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  console.log(width, height);
  canvas.width = width;
  canvas.height = height;

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height); //00 from top left hand corner of canvas, drawimage from  video

    //take the pixels out
    let pixels = ctx.getImageData(0, 0, width, height);
    // console.log(pixels); //pixels is large has array of RGB numbers, rgba with alpha too

    //mess with them

    // pixels = redEffect(pixels);
    // pixels = rgbSplit(pixels);
    // ctx.globalAlpha = 0.8; //add more layers make it like ghosting- 1,0.8 or any number
    pixels = greenScreen(pixels);
    // debugger;

    //put them back
    ctx.putImageData(pixels, 0, 0);
  }, 16);
}

function takePhoto() {
  //payed the sound
  snap.currentTime = 0;
  snap.play();

  //take the datta out of the canvas
  const data = canvas.toDataURL("image/jpeg");
  console.log(data);
  const link = document.createElement("a");
  link.href = data;
  // link.download = "img";
  // link.click()
  link.setAttribute("download", "handsome");
  // link.textContent = "Download Image";
  link.innerHTML = `<img src="${data}" alt="handsome Man" />`;
  strip.insertBefore(link, strip.firstChild);
}

function redEffect(pixels) {
  for (i = 0; i < pixels.data.length; i += 4) {
    //pixels.data.length is array not pixels.length only
    pixels.data[i + 0] = pixels.data[i + 0] + 100; //red //these are random  numbers
    pixels.data[i + 1] = pixels.data[i + 1] - 50; //green
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5; //blue
  }
  return pixels;
}
function rgbSplit(pixels) {
  for (i = 0; i < pixels.data.length; i += 4) {
    //just changed the numbers to mess with each individually
    pixels.data[i - 150] = pixels.data[i + 0]; //red //these are random  numbers
    pixels.data[i + 500] = pixels.data[i + 1]; //green
    pixels.data[i - 550] = pixels.data[i + 2]; //blue
  }
  return pixels;
}

function greenScreen(pixels) {
  const levels = {};
  [...document.querySelectorAll("input")].forEach((input) => {
    levels[input.name] = input.value;
    // levels[input.name] = parseInt(input.value, 10);
  });
  for (i = 0; i < pixels.data.length; i = i + 4) {
    red = pixels.data[i + 0];
    green = pixels.data[i + 1];
    blue = pixels.data[i + 2];
    alpha = pixels.data[i + 3];

    if (
      red >= levels.rmin &&
      green >= levels.gmin &&
      blue >= levels.bmin &&
      red <= levels.rmax &&
      green <= levels.gmax &&
      blue <= levels.bmax
      //inbetween 0-255
    ) {
      //take it out
      pixels.data[i + 3] = 0; //alpha-transparancey, in between that transparent
    }
  }
  return pixels;
}

getVideo();

video.addEventListener("canplay", paintToCanvas);
