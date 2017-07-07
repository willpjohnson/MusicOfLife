import Grid from './grid';
import Game from './game';
import Tones from './tones';

document.addEventListener("DOMContentLoaded", () => {
  let grid = new Grid(document.getElementById('grid'));
  let game = new Game(grid);
  let tones = new Tones();
  let intervalId;

  let startButton = document.getElementById('start');
  const runGame = () => {
    game.toggleRunning();
    let selector = document.getElementById("speed");
    let speed = parseInt(selector.options[selector.selectedIndex].value);
    if (game.running) {
      startButton.innerHTML = "Stop";
      intervalId = setInterval( () => {
        grid.advanceGeneration();
        grid.livingCells.forEach( (cellId) => {
          let tone = tones.tones1[cellId];
          tone.currentTime = 0;
          tone.play();
        });
      }, speed);
    } else {
      startButton.innerHTML = "Start";
      clearInterval(intervalId);
    }
  }
  startButton.addEventListener("click", runGame);

  let resetButton = document.getElementById('reset');
  resetButton.addEventListener("click", (e) => {
    e.preventDefault();
    for (let i=0; i<400; i++) {
      let cell = document.getElementById(i);
      cell.classList.remove('alive');
    }
  });

  let cellId = 0;
  for (let i=0; i<20; i++) {
    let row = document.createElement('div');
    row.classList.add('grid-row');
    for (let j=0; j<20; j++) {
      let cell = document.createElement('div');
      cell.id=cellId;
      cell.classList.add('grid-cell');
      cell.addEventListener("click", grid.toggleActivationClick);
      cell.addEventListener("mousedown", grid.toggleActivationDrag);
      cell.addEventListener("mouseup", grid.toggleActivationDrag);
      row.appendChild(cell);
      cellId += 1;
    }
    grid.grid.appendChild(row);
  }
});
