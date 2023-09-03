const container = document.getElementById("container");
const resetButton = document.getElementById("reset-button");
const colorButton = document.getElementById("color-button");
const blackwhiteBtn = document.getElementById("black-white-button");
const maxIntensity = 10;

function createGrid(size) {
  // sets column & rows template for the grid.
  // specify how many columns you want {size} and how should be sized (1fr)
  container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  container.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    container.appendChild(cell);

    // this ensure all cell starts with initial intensity 0
    // important as without it, intensity is NaN (console.log)
    cell.dataset.intensity = 0;
  }
}

// clear GRID for reset purpose
function clearGrid() {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => container.removeChild(cell));
}

// hover effect to make it trailling and stick
function hoverEffect() {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    // key function for the mouseover event
    cell.addEventListener("mouseover", () => {
      let intensity = parseInt(cell.dataset.intensity);
      console.log(intensity);

      // Increase intensity up to max level
      if (intensity < maxIntensity) {
        intensity++;
        cell.dataset.intensity = intensity;
      }

      //cal background color based on intensity
      const backgroundColor = `rgba(0, 0, 0, ${intensity / maxIntensity})`;
      cell.style.backgroundColor = backgroundColor;
    });
  });
}

// COLORS w/ Intensity

function randomizeColors() {
  const cells = document.querySelectorAll(".cell"); // gather NodeList
  cells.forEach((cell) => {
    // add mouseover event inside here:
    cell.addEventListener("mouseover", () => {
      let intensity = parseInt(cell.dataset.intensity);
      console.log(`colors' intensity ${intensity}`);

      if (intensity < maxIntensity) {
        intensity++;
        cell.dataset.intensity = intensity;
      }

      // after updates on intensity, proceed to generate random color
      const randomColor =
        "#" + Math.floor(Math.random() * 16777215).toString(16);
      console.log(randomColor);

      // set background color to random color
      cell.style.backgroundColor = randomColor;
    });
  });
}

// overRIDE / remove "default" hover effect
function removeHover() {
  const cells = document.querySelectorAll(".cell"); // gather NodeList
  cells.forEach((cell) => {
    cell.removeEventListener("mouseover", () => {});
  });
}

function resetGridColor() {
  const cells = document.querySelectorAll(".cell"); // gather NodeList
  console.log("blackwhite press");
  cells.forEach((cell) => {
    cell.style.backgroundColor = "rgba(0, 0, 0, 0)";
    cell.dataset.intensity = 0;
  });
}

// sub COLOR btn
colorButton.addEventListener("click", () => {
  randomizeColors();
  removeHover();
  resetGridColor();
  console.log("color work work");
});

// back to black-white shades
blackwhiteBtn.addEventListener("click", () => {
  resetGridColor();
  hoverEffect();
});

// reset
resetButton.addEventListener("click", () => {
  let newSize = prompt("Enter number of squares per side (max 100)");
  newSize = Math.min(Math.max(parseInt(newSize), 1), 100);

  // if (newSize is a number and within 1 - 100)
  if (!isNaN(newSize) && newSize >= 1 && newSize <= 100) {
    // clear current grid and create stated grid size
    clearGrid();
    createGrid(newSize);
    hoverEffect();
  } else {
    alert("Please enter valid number between 1 and 100");
  }
});

createGrid(16); // initial 16 x 16 grid
hoverEffect();
