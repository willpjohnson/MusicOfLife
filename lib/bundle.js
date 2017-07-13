/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__grid__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__controls__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tones__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__presets__ = __webpack_require__(4);





document.addEventListener("DOMContentLoaded", () => {
  class Game {
    constructor() {
      this.grid = new __WEBPACK_IMPORTED_MODULE_0__grid__["a" /* default */](document.getElementById('grid'));
      this.controls = new __WEBPACK_IMPORTED_MODULE_1__controls__["a" /* default */](grid);
      this.tones = new __WEBPACK_IMPORTED_MODULE_2__tones__["a" /* default */]();
      this.presets = new __WEBPACK_IMPORTED_MODULE_3__presets__["a" /* default */]();

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

    enableStartButton() {
      let that = this;
      this.startButton.addEventListener("click", () => {
        this.runGame(that);
      });
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


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Grid {
  constructor(grid) {
    this.grid = grid;
    this.livingCells = [];
    grid.addEventListener("mousedown", (e) => {
      this.toggleDragging(e);
    });
    grid.addEventListener("mouseup", (e) => {
      this.toggleDragging(e);
    });
    this.dragging = false;
    this.firstDraggedCell = null;
    this.toggleDragging = this.toggleDragging.bind(this);
  }

  advanceGeneration() {
    let cells = document.getElementsByClassName('grid-cell');
    cells = Array.prototype.slice.call(cells);
    this.livingCells = [];

    cells.forEach( (cell) => {
      let id = parseInt(cell.id);
      let neighborIds = this.findNeighbors(id);
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
          cell.classList.remove("alive");
        } else if (neighbors > 3) {
          cell.classList.remove("alive");
        } else if (neighbors === 2 || neighbors === 3) {
          this.livingCells.push(parseInt(cell.id));
        }
      } else {
        if (neighbors === 3) {
          cell.classList.add("alive");
          this.livingCells.push(parseInt(cell.id));
        }
      }
    });
  }

  findNeighbors(id) {
    let allNeighbors;
    if (id%20 === 0) {
      allNeighbors = [id-20,id-19,id+1,id+20,id+21];
    } else if (id%20 === 19) {
      allNeighbors = [id-21,id-20,id-1,id+19,id+20];
    } else {
      allNeighbors = [id-21,id-20,id-19,id-1,id+1,id+19,id+20,id+21];
    }
    let neighbors = allNeighbors.filter( (n) => {
      return !(n < 0 || n > 399);
    });
    return neighbors;
  };

  toggleDragging(e) {
    if (e.type === 'mousedown') {
      this.dragging = true;
      this.firstDraggedCell = e.target;
    } else if (e.type === 'mouseup') {
      this.dragging = false;
      this.firstDraggedCell = null;
    }
  }



}

/* harmony default export */ __webpack_exports__["a"] = (Grid);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Controls {
  constructor(grid) {
    this.running = false;
    this.preset = null;
  }

  toggleRunning() {
    this.running === true ? this.running = false : this.running = true;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Controls);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Tones {
  constructor() {
    this.reverb = new Pizzicato.Effects.Reverb({
      time: 2,
      decay: 0.8,
      reverse: false,
      mix: 0.8
    });

    this.tones = {10:{},9:{},8:{},7:{},6:{},5:{},4:{},3:{},2:{},1:{}};
    for (let i = 1; i <= 10; i++) {
      this.tones[i][0] = new Pizzicato.Sound({source: 'file', options: {path: `tones/short/QP${i}.mp3`, volume: 0.01}},  function() {this.tones[i][0].addEffect(this.reverb)}.bind(this));
      this.tones[i][1] = new Pizzicato.Sound({source: 'file', options: {path: `tones/short/SV${i}.mp3`, volume: 0.01}},  function() {this.tones[i][1].addEffect(this.reverb)}.bind(this));
      this.tones[i][2] = new Pizzicato.Sound({source: 'file', options: {path: `tones/short/SP${i}.mp3`, volume: 0.01}},  function() {this.tones[i][2].addEffect(this.reverb)}.bind(this));
      this.tones[i][3] = new Pizzicato.Sound({source: 'file', options: {path: `tones/short/PW${i}.mp3`, volume: 0.01}},  function() {this.tones[i][3].addEffect(this.reverb)}.bind(this));
    }

    this.toneCells = {};
    this.assignValues();
  }

  assignValues() {
    let cell=0;
    while (cell < 400) {
      let scaleDegree = 10 - (Math.floor((cell % 200) / 20));
      let instrumentId = cell % 4;
      this.toneCells[cell] = this.tones[scaleDegree][instrumentId];
      cell += 1;
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Tones);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Presets {
  constructor() {
    this.shapes = {
      singleGlider: [23,44,62,63,64],
      fourGliders: [23,44,62,63,64,36,55,75,76,77,322,323,324,344,363,335,336,337,355,376],
      supernova: [147,149,151,167,171,187,191,207,211,227,229,231],
      spaceship: [161,162,163,164,180,184,204,220,223],
      spaceships: [21,22,23,24,40,44,64,80,83,316,319,335,355,359,375,376,377,378],
      tumbler: [68,69,71,72,88,89,91,92,109,111,127,129,131,133,147,149,151,153,167,168,172,173],
    };
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Presets);


/***/ })
/******/ ]);