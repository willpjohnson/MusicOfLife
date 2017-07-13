import Grid from './grid';
import Controls from './controls';
import Tones from './tones';
import Presets from './presets';

document.addEventListener("DOMContentLoaded", () => {
  class Game {
    constructor() {
      this.grid = new Grid(document.getElementById('grid'));
      this.controls = new Controls(grid);
      this.tones = new Tones();
      this.presets = new Presets();

      this.introExiters = Array.prototype.slice.call(document.getElementsByClassName('intro-exiter'));
      this.introItems = Array.prototype.slice.call(document.getElementsByClassName('intro'));
      this.instructions = Array.prototype.slice.call(document.getElementsByClassName('instructions'));
      this.questionMark = document.getElementById('question-mark');
      this.intervalId = undefined;
      this.startButton = document.getElementById('start');
      this.resetButton = document.getElementById('reset');
      this.presetSelector = document.getElementById("presets");
      this.speedSelector = document.getElementById("speed");

      this.buildGrid();
      this.allowIntroExit();
      this.enableQuestionMark();
      this.enableStartButton();
      this.enableResetButton();
      this.enablePresets();

      this.buildGrid = this.buildGrid.bind(this);
      this.selector = this.selector.bind(this);
      this.clicker = this.clicker.bind(this);
    }


    buildGrid() {
      let that = this;
      let cellId = 0;
      for (let i=0; i<20; i++) {
        let row = document.createElement('div');
        row.classList.add('grid-row');
        for (let j=0; j<20; j++) {
          let cell = document.createElement('div');
          cell.id=cellId;
          cell.classList.add(`grid-cell`,`col-${j%4}`);
          cell.addEventListener("mousedown", this.clicker);
          cell.addEventListener("mouseover", (e) => {
            this.selector(e, that);
          });
          row.appendChild(cell);
          cellId += 1;
        }
        this.grid.grid.appendChild(row);
      }
    }

    allowIntroExit() {
      this.introExiters.forEach( (exiter) => {
        exiter.addEventListener("click", () => {
          this.introItems.forEach( (item) => {
            item.classList.add('hidden');
          });
        });
      });
    }

    enableQuestionMark() {
      this.questionMark.addEventListener("mouseover", () => {
        this.instructions.forEach( (ins) => {ins.classList.remove('hidden')});
      });
      this.questionMark.addEventListener("mouseout", () => {
        this.instructions.forEach( (ins) => {ins.classList.add('hidden')});
      })
    }
<<<<<<< HEAD
  });

  let selector = (e) => {
    if (grid.dragging) {
      console.log(e);
      let cell = e.target;
      let firstCellClasses = Array.prototype.slice.call(grid.firstDraggedCell.classList);
      if (firstCellClasses.includes('alive')) {
        cell.classList.add('alive');
      } else {
        cell.classList.remove('alive');
      }
    }
  }

  let clicker = (e) => {
    e.target.classList.toggle('alive');
  }

  let cellId = 0;
  for (let i=0; i<20; i++) {
    let row = document.createElement('div');
    row.classList.add('grid-row');
    for (let j=0; j<20; j++) {
      let cell = document.createElement('div');
      cell.id=cellId;
      cell.classList.add(`grid-cell`,`col-${j%4}`);
      cell.addEventListener("mousedown", clicker);
      cell.addEventListener("mouseover", selector);
      row.appendChild(cell);
      cellId += 1;
=======

    enableStartButton() {
      let that = this;
      this.startButton.addEventListener("click", () => {
        this.runGame(that);
      });
>>>>>>> gh-pages
    }

    enableResetButton() {
      this.resetButton.addEventListener("click", (e) => {
        e.preventDefault();
        for (let i=0; i<400; i++) {
          let cell = document.getElementById(i);
          cell.classList.remove('alive');
        }
      });
    }

    enablePresets() {
      this.presetSelector.addEventListener("change", (e) => {
        let presetOption = e.currentTarget.options[this.presetSelector.selectedIndex].value;
        let presetValues = this.presets.shapes[presetOption];
        if (presetValues.length > 0) {
          // RESETS
          for (let i=0; i<400; i++) {
            let cell = document.getElementById(i);
            cell.classList.remove('alive');
          }
          // PRESETS
          presetValues.forEach( (value) => {
            document.getElementById(value).classList.add('alive');
          });
        }
      });
    }

    runGame(that) {
      that.controls.toggleRunning();

      let speed = parseInt(that.speedSelector.options[that.speedSelector.selectedIndex].value);
      if (that.controls.running) {
        that.startButton.innerHTML = "Stop";
        that.intervalId = setInterval( () => {
          that.grid.advanceGeneration();
          that.grid.livingCells.forEach( (cellId) => {
            let tone = that.tones.toneCells[cellId];
            tone.currentTime = 0;
            tone.play();
          });
        }, speed);
      } else {
        that.startButton.innerHTML = "Start";
        clearInterval(that.intervalId);
      }
    }

    selector(e, that) {
      if (that.grid.dragging) {
        let cell = e.target;
        let firstCellClasses = Array.prototype.slice.call(that.grid.firstDraggedCell.classList);
        if (firstCellClasses.includes('alive')) {
          cell.classList.add('alive');
        } else {
          cell.classList.remove('alive');
        }
      }
    }

    clicker(e) {
      e.target.classList.toggle('alive');
    }
  };

  new Game();
});
