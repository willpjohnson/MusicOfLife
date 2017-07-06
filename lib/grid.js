import Game from './game';

const toggleActivationClick = (e) => {
  let cell = e.currentTarget;
  cell.classList.toggle("alive")
}

const advanceGeneration = () => {
  let cells = document.getElementsByClassName('grid-cell');
  cells = Array.prototype.slice.call(cells);

  cells.forEach( (cell) => {
    let id = parseInt(cell.id);
    let neighborIds = findNeighbors(id);
    let neighbors = 0;
    neighborIds.forEach( (neighborId) => {
      let neighbor = document.getElementById(neighborId);
      if (neighbor.classList.contains("alive")) {
        neighbors ++;
      }
    });
    cell.setAttribute("neighbors", neighbors);
  });

  cells.forEach( (cell) => {
    let neighbors = parseInt(cell.getAttribute("neighbors"));
    if (cell.classList.contains("alive")) {
      if (neighbors < 2) {
        cell.classList.toggle("alive");
      } else if (neighbors > 3) {
        cell.classList.toggle("alive");
      }
    } else {
      if (neighbors === 3) {
        cell.classList.toggle("alive");
      }
    }
  });
}

const findNeighbors = (id) => {
  let allNeighbors = [id-21,id-20,id-19,id-1,id+1,id+19,id+20,id+21];
  let neighbors = allNeighbors.filter( (n) => {
    return !(n < 0 || n > 399);
  });
  return neighbors;
};

document.addEventListener("DOMContentLoaded", () => {
  let grid = document.getElementById('grid');
  let game = new Game(grid);
  let intervalId;

  const runGame = () => {
    game.toggleRunning();
    if (game.running) {
      intervalId = setInterval( () => {
        advanceGeneration();
      }, 100);
    } else {
      clearInterval(intervalId);
    }
  }
  let startButton = document.getElementById('start');
  startButton.addEventListener("click", runGame);

  let cellId = 0;
  for (let i=0; i<20; i++) {
    let row = document.createElement('div');
    row.classList.add('grid-row');
    for (let j=0; j<20; j++) {
      let cell = document.createElement('div');
      cell.id=cellId;
      cell.classList.add('grid-cell');
      cell.addEventListener("click", toggleActivationClick);
      row.appendChild(cell);
      cellId += 1;
    }
    grid.appendChild(row);
  }
});
