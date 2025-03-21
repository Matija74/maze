const points = [234, 2, 234, 10, 122, 10, 122, 26, 202, 26, 202, 42, 170, 42, 170, 106, 154, 106, 154, 154, 170, 154, 170, 138, 186, 138, 186, 170, 138, 170, 138, 202, 90, 202, 90, 234, 58, 234, 58, 250, 90, 250, 90, 266, 74, 266, 74, 330, 106, 330, 106, 362, 122, 362, 122, 378, 106, 378, 106, 394, 74, 394, 74, 410, 106, 410, 106, 426, 122, 426, 122, 410, 138, 410, 138, 426, 154, 426, 154, 394, 138, 394, 138, 378, 154, 378, 154, 362, 138, 362, 138, 346, 170, 346, 170, 394, 186, 394, 186, 298, 202, 298, 202, 314, 218, 314, 218, 330, 202, 330, 202, 346, 218, 346, 218, 362, 202, 362, 202, 378, 234, 378, 234, 362, 266, 362, 266, 410, 250, 410, 250, 394, 202, 394, 202, 426, 218, 426, 218, 442, 250, 442, 250, 426, 282, 426, 282, 442, 298, 442, 298, 474, 266, 474, 266, 458, 234, 458, 234, 474, 250, 474, 250, 482];

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const x = [234, 234, 122, 122, 202, 202, 170, 170, 154, 154, 170, 170, 186, 186, 138, 138, 90, 90, 58, 58, 90, 90, 74, 74, 106, 106, 122, 122, 106, 106, 74, 74, 106, 106, 122, 122, 138, 138, 154, 154, 138, 138, 154, 154, 138, 138, 170, 170, 186, 186, 202, 202, 218, 218, 202, 202, 218, 218, 202, 202, 234, 234, 266, 266, 250, 250, 202, 202, 218, 218, 250, 250, 282, 282, 298, 298, 266, 266, 234, 234, 250, 250];
const y = [2, 10, 10, 26, 26, 42, 42, 106, 106, 154, 154, 138, 138, 170, 170, 202, 202, 234, 234, 250, 250, 266, 266, 330, 330, 362, 362, 378, 378, 394, 394, 410, 410, 426, 426, 410, 410, 426, 426, 394, 394, 378, 378, 362, 362, 346, 346, 394, 394, 298, 298, 314, 314, 330, 330, 346, 346, 362, 362, 378, 378, 362, 362, 410, 410, 394, 394, 426, 426, 442, 442, 426, 426, 442, 442, 474, 474, 458, 458, 474, 474, 482];
const gumb = document.getElementById('gumb');
const clearButton = document.getElementById('clearButton');

let currentX = x[0];
let currentY = y[0];
let targetX = x[1];
let targetY = y[1];
let speed = 4; 
let currentIndex = 1;
let interval;
let isDrawingComplete = false;
let isDrawingStarted = false;

function risi() {
  if (isDrawingStarted || isDrawingComplete) {
    return;
  }

  isDrawingStarted = true;

  gumb.disabled = true;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  currentX = x[0];
  currentY = y[0];
  targetX = x[1];
  targetY = y[1];
  currentIndex = 1;

  function draw() {
    ctx.beginPath();
    ctx.strokeStyle = '#ff0000';
    ctx.moveTo(currentX, currentY);

    if (currentX < targetX) {
      currentX += speed;
    } else if (currentX > targetX) {
      currentX -= speed;
    }

    if (currentY < targetY) {
      currentY += speed;
    } else if (currentY > targetY) {
      currentY -= speed;
    }

    ctx.lineTo(currentX, currentY);
    ctx.stroke();

    if (Math.abs(currentX - targetX) < speed && Math.abs(currentY - targetY) < speed) {
      currentIndex++;
      if (currentIndex < x.length) {
        targetX = x[currentIndex];
        targetY = y[currentIndex];
      } else {
        clearInterval(interval);
        isDrawingComplete = true;
        gumb.disabled = false;
      }
    }
  }

  interval = setInterval(draw, 10);
}

function clearLine() {
  clearInterval(interval);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  gumb.disabled = false;
  isDrawingStarted = false;
  isDrawingComplete = false;
  currentIndex = 1;
  currentX = x[0];
  currentY = y[0];
  targetX = x[1];
  targetY = y[1];
}

gumb.addEventListener('click', risi);
clearButton.addEventListener('click', clearLine);

var slider = document.getElementById("slider");
function updateSpeed() {
  console.log(slider.value);
  speed = document.querySelector('#slider').value;
}