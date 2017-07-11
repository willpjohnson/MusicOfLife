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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__game__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tones__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__presets__ = __webpack_require__(4);





document.addEventListener("DOMContentLoaded", () => {
  let grid = new __WEBPACK_IMPORTED_MODULE_0__grid__["a" /* default */](document.getElementById('grid'));
  let game = new __WEBPACK_IMPORTED_MODULE_1__game__["a" /* default */](grid);
  let tones = new __WEBPACK_IMPORTED_MODULE_2__tones__["a" /* default */]();
  let presets = new __WEBPACK_IMPORTED_MODULE_3__presets__["a" /* default */]();

  let instructions = document.getElementsByClassName('instructions')
  instructions = Array.prototype.slice.call(instructions);
  let questionMark = document.getElementById('question-mark');
  questionMark.addEventListener("mouseover", () => {
    instructions.forEach( (ins) => {ins.classList.remove('hidden')});
  });
  questionMark.addEventListener("mouseout", () => {
    instructions.forEach( (ins) => {ins.classList.add('hidden')});
  })

  let intervalId;
  let startButton = document.getElementById('start');
  const runGame = () => {
    game.toggleRunning();

    let speedSelector = document.getElementById("speed");
    let speed = parseInt(speedSelector.options[speedSelector.selectedIndex].value);
    if (game.running) {
      startButton.innerHTML = "Stop";
      intervalId = setInterval( () => {
        grid.advanceGeneration();
        grid.livingCells.forEach( (cellId) => {
          let tone = tones.toneCells[cellId];
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

  let presetSelector = document.getElementById("presets");
  presetSelector.addEventListener("change", (e) => {
    let presetOption = e.currentTarget.options[presetSelector.selectedIndex].value;
    let presetValues = presets.shapes[presetOption];
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
      cell.classList.add(`grid-cell`,`col-${j%4}`);
      cell.addEventListener("click", grid.toggleActivationClick);
      row.appendChild(cell);
      cellId += 1;
    }
    grid.grid.appendChild(row);
  }


});


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Grid {
  constructor(grid) {
    this.grid = grid;
    this.livingCells = [];
  }

  toggleActivationClick(e) {
    let cell = e.currentTarget;
    cell.classList.toggle("alive")
  }

  toggleActivationDrag(e) {
    if (e.type === 'mousedown') {
      e.currentTarget.addEventListener("mouseover")
    } else if (e.type === 'mouseup') {

    }
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

}

/* harmony default export */ __webpack_exports__["a"] = (Grid);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Game {
  constructor(grid) {
    this.running = false;
    this.preset = null;
  }

  toggleRunning() {
    if (this.running) {
      this.running = false;
    } else {
      this.running = true;
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Game);


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

    this.tones = {};
    for (let i = 1; i <= 10; i++) {
      this.tones[`a${i}`] = new Pizzicato.Sound({source: 'file', options: {path: `tones/short/QP${i}.mp3`, volume: 0.01}},  function() {this.tones[`a${i}`].addEffect(this.reverb)}.bind(this));
      this.tones[`b${i}`] = new Pizzicato.Sound({source: 'file', options: {path: `tones/short/SV${i}.mp3`, volume: 0.01}},  function() {this.tones[`b${i}`].addEffect(this.reverb)}.bind(this));
      this.tones[`c${i}`] = new Pizzicato.Sound({source: 'file', options: {path: `tones/short/SP${i}.mp3`, volume: 0.01}},  function() {this.tones[`c${i}`].addEffect(this.reverb)}.bind(this));
      this.tones[`d${i}`] = new Pizzicato.Sound({source: 'file', options: {path: `tones/short/PW${i}.mp3`, volume: 0.01}},  function() {this.tones[`d${i}`].addEffect(this.reverb)}.bind(this));
    }

    this.toneCells = {};

    this.assignValues();
  }


  assignValues() {
    let i = 0;
    while (i < 400) {
      if ((0 <= i && i < 20) || (200 <= i && i < 220)) {
        if (i % 4 === 0) {
          this.toneCells[i] = this.tones['a10'];
        } else if (i % 4 === 1) {
          this.toneCells[i] = this.tones['b10'];
        } else if (i % 4 === 2) {
          this.toneCells[i] = this.tones['c10'];
        } else if (i % 4 === 3) {
          this.toneCells[i] = this.tones['d10'];
        }
      } else if ((20 <= i && i < 40) || (220 <= i && i < 240)) {
        if (i % 4 === 0) {
          this.toneCells[i] = this.tones['a9'];
        } else if (i % 4 === 1) {
          this.toneCells[i] = this.tones['b9'];
        } else if (i % 4 === 2) {
          this.toneCells[i] = this.tones['c9'];
        } else if (i % 4 === 3) {
          this.toneCells[i] = this.tones['d9'];
        }
      } else if ((40 <= i && i < 60) || (240 <= i && i < 260)) {
        if (i % 4 === 0) {
          this.toneCells[i] = this.tones['a8'];
        } else if (i % 4 === 1) {
          this.toneCells[i] = this.tones['b8'];
        } else if (i % 4 === 2) {
          this.toneCells[i] = this.tones['c8'];
        } else if (i % 4 === 3) {
          this.toneCells[i] = this.tones['d8'];
        }
      } else if ((60 <= i && i < 80) || (260 <= i && i < 280)) {
        if (i % 4 === 0) {
          this.toneCells[i] = this.tones['a7'];
        } else if (i % 4 === 1) {
          this.toneCells[i] = this.tones['b7'];
        } else if (i % 4 === 2) {
          this.toneCells[i] = this.tones['c7'];
        } else if (i % 4 === 3) {
          this.toneCells[i] = this.tones['d7'];
        }
      } else if ((80 <= i && i < 100) || (280 <= i && i < 300)) {
        if (i % 4 === 0) {
          this.toneCells[i] = this.tones['a6'];
        } else if (i % 4 === 1) {
          this.toneCells[i] = this.tones['b6'];
        } else if (i % 4 === 2) {
          this.toneCells[i] = this.tones['c6'];
        } else if (i % 4 === 3) {
          this.toneCells[i] = this.tones['d6'];
        }
      } else if ((100 <= i && i < 120) || (300 <= i && i < 320)) {
        if (i % 4 === 0) {
          this.toneCells[i] = this.tones['a5'];
        } else if (i % 4 === 1) {
          this.toneCells[i] = this.tones['b5'];
        } else if (i % 4 === 2) {
          this.toneCells[i] = this.tones['c5'];
        } else if (i % 4 === 3) {
          this.toneCells[i] = this.tones['d5'];
        }
      } else if ((120 <= i && i < 140) || (320 <= i && i < 340)) {
        if (i % 4 === 0) {
          this.toneCells[i] = this.tones['a4'];
        } else if (i % 4 === 1) {
          this.toneCells[i] = this.tones['b4'];
        } else if (i % 4 === 2) {
          this.toneCells[i] = this.tones['c4'];
        } else if (i % 4 === 3) {
          this.toneCells[i] = this.tones['d4'];
        }
      } else if ((140 <= i && i < 160) || (340 <= i && i < 360)) {
        if (i % 4 === 0) {
          this.toneCells[i] = this.tones['a3'];
        } else if (i % 4 === 1) {
          this.toneCells[i] = this.tones['b3'];
        } else if (i % 4 === 2) {
          this.toneCells[i] = this.tones['c3'];
        } else if (i % 4 === 3) {
          this.toneCells[i] = this.tones['d3'];
        }
      } else if ((160 <= i && i < 180) || (360 <= i && i < 380)) {
        if (i % 4 === 0) {
          this.toneCells[i] = this.tones['a2'];
        } else if (i % 4 === 1) {
          this.toneCells[i] = this.tones['b2'];
        } else if (i % 4 === 2) {
          this.toneCells[i] = this.tones['c2'];
        } else if (i % 4 === 3) {
          this.toneCells[i] = this.tones['d2'];
        }
      } else if ((180 <= i && i < 200) || (380 <= i && i < 400)) {
        if (i % 4 === 0) {
          this.toneCells[i] = this.tones['a1'];
        } else if (i % 4 === 1) {
          this.toneCells[i] = this.tones['b1'];
        } else if (i % 4 === 2) {
          this.toneCells[i] = this.tones['c1'];
        } else if (i % 4 === 3) {
          this.toneCells[i] = this.tones['d1'];
        }
      }

      i += 1;
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