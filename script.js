const container = document.getElementById('container');
const resizeBtn = document.getElementById('resizeBtn');
const resetBtn = document.getElementById('resetBtn');
const eraserBtn = document.getElementById('eraserBtn');

let isEraser = false;
let isRandomColor = false; // Extra: random color mode
let isDarkenMode = false;  // Extra: progressive darkening

// Create grid using flex + aspect-ratio
function createGrid(squaresPerSide) {
  container.innerHTML = '';
  const totalSquares = squaresPerSide * squaresPerSide;

  for (let i = 0; i < totalSquares; i++) {
    const square = document.createElement('div');
    square.classList.add('grid-square');
    // Add data attribute for darkening
    square.dataset.opacity = '0';
    container.appendChild(square);
  }

  addHoverEffect();
}

// Enhanced hover effect with modes
function addHoverEffect() {
  const squares = document.querySelectorAll('.grid-square');

  squares.forEach(square => {
    square.addEventListener('mouseenter', () => {
      if (isEraser) {
        square.style.backgroundColor = 'white';
        square.style.opacity = '1'; // reset visual opacity
        square.dataset.opacity = '0'; // reset tracking
      } else if (isDarkenMode) {
        // Progressive darkening: 10% darker per interaction
        let currentOpacity = parseFloat(square.dataset.opacity);
        if (currentOpacity < 1) {
          currentOpacity += 0.1;
          square.dataset.opacity = currentOpacity;
          square.style.backgroundColor = 'black';
          square.style.opacity = currentOpacity;
        }
      } else {
        // Default or random color
        const color = isRandomColor
          ? getRandomColor()
          : 'black';
        square.style.backgroundColor = color;
        square.style.opacity = '1'; // full opacity
      }
    });
  });
}

// Generate random RGB color
function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

// Resize grid
resizeBtn.addEventListener('click', () => {
  let input = prompt('Enter number of squares per side (max 100):');
  let size = parseInt(input);

  if (isNaN(size) || size <= 0) {
    alert('Please enter a valid number!');
    return;
  }

  if (size > 100) {
    alert('Too many! Max is 100.');
    return;
  }

  createGrid(size);
});

// Reset button
resetBtn.addEventListener('click', () => {
  const squares = document.querySelectorAll('.grid-square');
  squares.forEach(square => {
    square.style.backgroundColor = 'white';
    square.style.opacity = '1';
    square.dataset.opacity = '0';
  });
  isEraser = false;
  eraserBtn.textContent = 'Eraser Mode';
});

// Toggle eraser mode
eraserBtn.addEventListener('click', () => {
  isEraser = !isEraser;
  eraserBtn.textContent = isEraser ? 'Drawing Mode' : 'Eraser Mode';
});

// Add buttons for extra features
const colorModeBtn = document.createElement('button');
colorModeBtn.id = 'colorModeBtn';
colorModeBtn.textContent = 'Random Color Mode';
colorModeBtn.style.backgroundColor = '#2196F3';
colorModeBtn.style.color = 'white';
colorModeBtn.style.border = 'none';
colorModeBtn.style.borderRadius = '4px';
colorModeBtn.style.margin = '10px';
colorModeBtn.style.padding = '10px 15px';
colorModeBtn.onclick = () => {
  isRandomColor = !isRandomColor;
  isDarkenMode = false;
  colorModeBtn.textContent = isRandomColor ? 'Solid Color Mode' : 'Random Color Mode';
  darkenModeBtn.textContent = 'Darken Mode';
};

const darkenModeBtn = document.createElement('button');
darkenModeBtn.id = 'darkenModeBtn';
darkenModeBtn.textContent = 'Darken Mode';
darkenModeBtn.style.backgroundColor = '#9C27B0';
darkenModeBtn.style.color = 'white';
darkenModeBtn.style.border = 'none';
darkenModeBtn.style.borderRadius = '4px';
darkenModeBtn.style.margin = '10px';
darkenModeBtn.style.padding = '10px 15px';
darkenModeBtn.onclick = () => {
  isDarkenMode = !isDarkenMode;
  isRandomColor = false;
  darkenModeBtn.textContent = isDarkenMode ? 'Solid Color Mode' : 'Darken Mode';
  colorModeBtn.textContent = 'Random Color Mode';
};

// Insert buttons into DOM
document.body.insertBefore(darkenModeBtn, container);
document.body.insertBefore(colorModeBtn, container);

// Initial grid
createGrid(7);